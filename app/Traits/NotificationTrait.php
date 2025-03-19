<?php

namespace App\Traits;

use App\Models\Notification;
use App\Models\User;

trait NotificationTrait
{
    public function notifyHRNewApplication($application)
    {
        // Get all HR users
        $hrUsers = User::where('role_name', 'hr')->get();

        foreach ($hrUsers as $hrUser) {
            Notification::create([
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
        }
    }

    public function notifyApplicantStatusChange($application)
    {
        Notification::create([
            'user_id' => $application->user_id,
            'type' => 'status_change',
            'message' => "Your application for {$application->jobListing->title} status has been updated to {$application->status}",
            'is_read' => false,
            'data' => [
                'application_id' => $application->application_id,
                'job_listing_id' => $application->job_listing_id,
                'status' => $application->status
            ]
        ]);
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

        $message = $isUpdate
            ? "Your schedule for {$schedule->title} has been updated"
            : "You have been scheduled for {$schedule->title}";

        Notification::create([
            'user_id' => $application->user_id,
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
    }
}
