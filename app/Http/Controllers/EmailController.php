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

        Mail::to($data['email'])->send(new SendEmail($data));

        return response()->json(['message' => 'Email sent successfully']);
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

        // Send notification email
        Mail::to($user->email)->send(new NotificationEmail($notification, $user));

        return response()->json(['message' => 'Test notification email sent successfully']);
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
}
