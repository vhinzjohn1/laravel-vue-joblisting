<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProfileCompletionController extends Controller
{
    /**
     * Display the profile completion page.
     */
    public function show(): Response
    {
        return Inertia::render('Profile/CompleteProfile');
    }

    /**
     * Mark the user's profile as complete.
     */
    public function complete(Request $request): RedirectResponse
    {
        $user = $request->user();

        // Update user's profile status
        $user->profile_completed = true;
        $user->save();

        // Redirect to job listing page index
        return redirect()->route('job-listing.index')->with('success', 'Profile completed successfully!');
    }
}
