<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $data; // Store multiple values in an array

    /**
     * Create a new message instance.
     */
    public function __construct($data)
    {
        $this->data = $data; 
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Welcome to Our Service')
                    ->view('emails.example')
                    ->with('data', $this->data);
    }
}
