<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Auth\Events\Registered;

class ProfileCompletionController extends Controller
{
    /**
     * Display the profile completion page.
     */
    public function index()
    {
        $user = auth()->user();

        // if user completed profile, redirect to dashboard
        if ($user->profile_completed) {
            return redirect()->route('job-application.index');
        }
        // else if user is not an applicant, redirect to root
        if ($user->role_name !== 'applicant') {
            return redirect()->route('/');
        }

        return Inertia::render('Profile/CompleteProfile');
    }

    /**
     * Mark the user's profile as complete.
     */
    public function update(Request $request)
    {
        try {
            $user = $request->user();

            // Update user's profile status
            $user->profile_completed = true;
            $user->save();

            // Send email verification notification if not already verified
            if (!$user->hasVerifiedEmail()) {
                event(new Registered($user));
            }

            // Return a successful json response
            return response()->json(['success' => true, 'message' => 'Profile completed successfully!'], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Something went wrong. Please try again later.'], 500);
        }
    }

    public function store(Request $request){
        try {
            $user = $request->user();

            // Update user's tour status
            $user->tour_completed = true;
            $user->save();

            // Return a successful json response
            return response()->json(['success' => true, 'message' => 'Tour completed successfully!'], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Something went wrong. Please try again later.'], 500);
        }
    }
}
