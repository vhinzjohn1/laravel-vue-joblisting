<?php

namespace App\Traits;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\NotificationEmail;

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

        // Send email to applicant
        try {
            Mail::to($user->email)->send(new NotificationEmail($notification, $user));
        } catch (\Exception $e) {
            // Log email sending failure but don't break the flow
            Log::error("Failed to send notification email to {$user->email}: " . $e->getMessage());
        }
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

        // Send email to applicant
        try {
            Mail::to($user->email)->send(new NotificationEmail($notification, $user));
        } catch (\Exception $e) {
            // Log email sending failure but don't break the flow
            Log::error("Failed to send schedule notification email to {$user->email}: " . $e->getMessage());
        }
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

        // Send email to applicant
        try {
            Mail::to($user->email)->send(new NotificationEmail($notification, $user));
        } catch (\Exception $e) {
            // Log email sending failure but don't break the flow
            Log::error("Failed to send custom notification email to {$user->email}: " . $e->getMessage());
        }
    }
}
