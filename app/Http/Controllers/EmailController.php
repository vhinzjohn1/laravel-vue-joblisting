<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendEmail;
use App\Models\User;

class EmailController extends Controller
{
    /**
     * Send an email to the given address.
     */
    public function index()
    {
        $data = [
            'name' => "John Doe",
            'email' => "vhinzjohn43@gmail.com",
            'message' => "This is a test message."
        ];
    
        Mail::to($data['email'])->send(new SendEmail($data));
    
        return response()->json(['message' => 'Email sent successfully']);
    }
}
