<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendEmail;
use App\Mail\NotificationEmail;
use App\Models\User;
use App\Models\Notification;
use App\Traits\NotificationTrait;
use App\Jobs\SendEmailJob;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;

class EmailController extends Controller
{
    use NotificationTrait;

    /**
     * Send a basic email using the general SendEmail class.
     */
    public function index()
    {
        $data = [
            'name' => "John Doe",
            'email' => "vhinzjohn43@gmail.com",
            'message' => "This is a test message.",
            'subject' => "Test Email from CMU Job Listings"
        ];

        // Create a notification
        $notification = Notification::create([
            'user_id' => auth()->id(),
            'type' => 'test',
            'message' => $data['message'],
            'is_read' => false,
            'data' => $data
        ]);

        // Send email in background
        $this->sendEmailInBackground($notification, auth()->user());

        return response()->json(['message' => 'Email will be sent in the background']);
    }

    /**
     * Send a test notification email to the authenticated user.
     * This demonstrates how the notification system with email works.
     */
    public function sendTestNotification()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        // Only send to applicants
        if ($user->role_name !== 'applicant') {
            return response()->json(['error' => 'Notification emails are only sent to applicants'], 403);
        }

        // Create a test notification
        $notification = Notification::create([
            'user_id' => $user->user_id,
            'type' => 'test',
            'message' => "This is a test notification message with email integration.",
            'is_read' => false,
            'data' => [
                'test_id' => 123,
                'test_value' => 'Sample data'
            ]
        ]);

        // Send email in background
        $this->sendEmailInBackground($notification, $user);

        return response()->json(['message' => 'Test notification email will be sent in the background']);
    }

    /**
     * Send email in background using exec
     */
    private function sendEmailInBackground(Notification $notification, User $user)
    {
        try {
            // Make sure we have valid IDs
            if (!$notification->notification_id || !$user->user_id) {
                Log::error('Invalid notification or user ID', [
                    'notification' => $notification->toArray(),
                    'user' => $user->toArray()
                ]);
                return;
            }

            $command = sprintf(
                'cd %s && php artisan email:send %d %d >> %s/storage/logs/email.log 2>&1 &',
                base_path(),
                $notification->notification_id,
                $user->user_id,
                base_path()
            );

            Log::info('Executing email command', [
                'command' => $command,
                'notification_id' => $notification->notification_id,
                'user_id' => $user->user_id
            ]);

            $output = [];
            $returnVar = 0;
            exec($command, $output, $returnVar);

            if ($returnVar !== 0) {
                Log::error('Failed to execute email command', [
                    'return_var' => $returnVar,
                    'output' => $output
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error in sendEmailInBackground: ' . $e->getMessage(), [
                'exception' => $e,
                'notification_id' => $notification->notification_id,
                'user_id' => $user->user_id
            ]);
        }
    }

    /**
     * Example using the trait to send a notification with email
     */
    public function notifyApplicant(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,user_id',
            'message' => 'required|string',
        ]);

        $user = User::findOrFail($request->user_id);

        // Check if user is an applicant
        if ($user->role_name !== 'applicant') {
            return response()->json(['error' => 'Can only send notification emails to applicants'], 403);
        }

        // Use the NotificationTrait method
        $this->notifyApplicantWithEmail(
            $user->user_id,
            'custom',
            $request->message,
            ['custom_data' => $request->input('data', [])]
        );

        return response()->json(['message' => 'Notification with email sent successfully']);
    }

    /**
     * Send a custom verification email using the notification system.
     */
    public function sendVerificationEmail(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        try {
            Log::info('sendVerificationEmail: User', $user->toArray());

            // Generate a signed verification URL
            $verificationUrl = URL::temporarySignedRoute(
                'custom-verification.verify',
                now()->addMinutes(60),
                ['id' => $user->user_id, 'hash' => sha1($user->email)]
            );

            // Create a notification for verification
            $notification = Notification::create([
                'user_id' => $user->user_id,
                'type' => 'email_verification',
                'message' => 'Please verify your email address by clicking the link below.',
                'is_read' => false,
                'data' => [
                    'verification_url' => $verificationUrl
                ]
            ]);

            // Send email in background
            $this->sendEmailInBackground($notification, $user);
            Log::info('Verification email dispatched successfully.', ['user_id' => $user->user_id]);
            return response()->json(['message' => 'Verification email will be sent in the background']);
        } catch (\Exception $e) {
            Log::error('Error sending verification email: ' . $e->getMessage(), ['user_id' => $user->user_id, 'exception' => $e]);
            return response()->json(['error' => 'Failed to send verification email.'], 500);
        }
    }

    /**
     * Handle the verification link and update email_verified_at.
     */
    public function verifyCustomEmail(Request $request, $id, $hash)
    {
        $user = User::where('user_id', $id)->firstOrFail();
        if (! hash_equals((string) $hash, sha1($user->email))) {
            abort(403, 'Invalid verification link.');
        }
        if ($user->email_verified_at) {
            return redirect()->route('complete-profile.index')->with('status', 'Email already verified.');
        }
        $user->email_verified_at = now();
        $user->save();
        // Optionally, mark all email_verification notifications as read
        Notification::where('user_id', $user->user_id)
            ->where('type', 'email_verification')
            ->update(['is_read' => true]);

        // If user is not logged in, log them in
        if (!auth()->check()) {
            auth()->login($user);
        }

        return redirect()->route('complete-profile.index')->with('status', 'Email verified successfully!');
    }
}
