<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\NotificationEmail;
use App\Models\Notification;
use App\Models\User;

class SendEmailCommand extends Command
{
    protected $signature = 'email:send {notification_id} {user_id}';
    protected $description = 'Send an email in the background';

    public function handle()
    {
        Log::info('Starting email send command', [
            'notification_id' => $this->argument('notification_id'),
            'user_id' => $this->argument('user_id')
        ]);

        $notification = Notification::where('notification_id', $this->argument('notification_id'))->first();
        $user = User::where('user_id', $this->argument('user_id'))->first();

        if (!$notification || !$user) {
            Log::error('Notification or User not found', [
                'notification' => $notification,
                'user' => $user,
                'notification_id' => $this->argument('notification_id'),
                'user_id' => $this->argument('user_id')
            ]);
            $this->error('Notification or User not found');
            return 1;
        }

        try {
            Log::info('Attempting to send email', [
                'to' => $user->email,
                'notification_id' => $notification->notification_id
            ]);

            Mail::to($user->email)->send(new NotificationEmail($notification, $user));

            Log::info('Email sent successfully');
            $this->info('Email sent successfully');
            return 0;
        } catch (\Exception $e) {
            Log::error('Failed to send email: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString()
            ]);
            $this->error('Failed to send email: ' . $e->getMessage());
            return 1;
        }
    }
}
