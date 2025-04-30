<?php

namespace App\Traits;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\NotificationEmail;
use App\Jobs\SendEmailJob;

trait NotificationTrait
{
    public function notifyHRNewApplication($application)
    {
        // Get all HR users
        $hrUsers = User::where('role_name', 'hr')->get();

        foreach ($hrUsers as $hrUser) {
            $notification = Notification::create([
                'user_id' => $hrUser->user_id,
                'type' => 'new_application',
                'message' => "New application received for {$application->jobListing->title}",
                'is_read' => false,
                'data' => [
                    'application_id' => $application->application_id,
                    'job_listing_id' => $application->job_listing_id,
                    'applicant_name' => $application->user->userDetail->firstname . ' ' . $application->user->userDetail->lastname
                ]
            ]);

            // Note: No email to HR users, as per requirements
        }
    }

    public function notifyApplicantStatusChange($application)
    {
        // Ensure we have the full user model
        $user = User::findOrFail($application->user_id);

        // Create notification in database
        $notification = Notification::create([
            'user_id' => $user->user_id,
            'type' => 'status_change',
            'message' => "Your application for {$application->jobListing->title} status has been updated to {$application->status}",
            'is_read' => false,
            'data' => [
                'application_id' => $application->application_id,
                'job_listing_id' => $application->job_listing_id,
                'status' => $application->status
            ]
        ]);

        // Send email in background
        $this->sendEmailInBackground($notification, $user);
    }

    public function notifyApplicantScheduled($schedule, $application, $isUpdate = false)
    {
        // Ensure we have the full application model
        if (is_numeric($application)) {
            $application = \App\Models\Application::findOrFail($application);
        } elseif (!$application instanceof \App\Models\Application) {
            // Not an Application instance and not an ID, can't proceed
            return;
        }

        // Ensure we have the full user model
        $user = User::findOrFail($application->user_id);

        $message = $isUpdate
            ? "Your schedule for {$schedule->title} has been updated"
            : "You have been scheduled for {$schedule->title}";

        // Create notification in database
        $notification = Notification::create([
            'user_id' => $user->user_id,
            'type' => 'scheduled',
            'message' => $message,
            'is_read' => false,
            'data' => [
                'schedule_id' => $schedule->schedule_id,
                'application_id' => $application->application_id,
                'schedule_date' => $schedule->schedule_date,
                'location' => $schedule->location
            ]
        ]);

        // Send email in background
        $this->sendEmailInBackground($notification, $user);
    }

    /**
     * Send a direct notification with email to an applicant
     */
    public function notifyApplicantWithEmail($userId, $type, $message, $data = [])
    {
        // Ensure we have the full user model
        $user = User::findOrFail($userId);

        // Only proceed if user is an applicant (not HR)
        if ($user->role_name !== 'applicant') {
            return;
        }

        // Create notification in database
        $notification = Notification::create([
            'user_id' => $user->user_id,
            'type' => $type,
            'message' => $message,
            'is_read' => false,
            'data' => $data
        ]);

        // Send email in background
        $this->sendEmailInBackground($notification, $user);
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
}
