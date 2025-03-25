<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Notification;
use App\Models\User;

class NotificationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;
    private $notification;
    private $user;

    /**
     * Create a new message instance.
     */
    public function __construct(Notification $notification, User $user)
    {
        $this->notification = $notification;
        $this->user = $user;

        // Prepare data for the email template
        $this->data = [
            'name' => $user->name ?? $user->username,
            'message' => $notification->message,
            'subject' => $this->getSubjectFromType($notification->type),
            'data' => $notification->data,
        ];

        // Add action URL if applicable
        if (!empty($notification->data)) {
            $this->data['action_url'] = $this->getActionUrl($notification);
        }
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject($this->data['subject'])
            ->view('emails.example')
            ->with('data', $this->data);
    }

    /**
     * Get an appropriate subject line based on notification type
     */
    private function getSubjectFromType(string $type): string
    {
        return match ($type) {
            'new_application' => 'New Job Application Received',
            'status_change' => 'Application Status Update',
            'scheduled' => 'Interview Schedule Notification',
            default => 'CMU Job Listings - Notification',
        };
    }

    /**
     * Get appropriate action URL based on notification data
     */
    private function getActionUrl(Notification $notification): ?string
    {
        if (empty($notification->data)) {
            return null;
        }

        return match ($notification->type) {
            'status_change' => route('applications.show', $notification->data['application_id'] ?? ''),
            'scheduled' => route('schedules.show', $notification->data['schedule_id'] ?? ''),
            default => route('notifications.index'),
        };
    }
}
