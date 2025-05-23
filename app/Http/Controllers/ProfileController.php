<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\UserDetail;
use Illuminate\Http\JsonResponse;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $userDetails = UserDetail::where('user_id', $user->user_id)->first();

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'userDetails' => $userDetails,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        // Update user table data (only username and email)
        $user->fill([
            'username' => $request->username,
            'email' => $request->email,
        ]);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        // Validate the request
        $request->validate([
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->save();

        // Update or create user details (all other fields)
        UserDetail::updateOrCreate(
            ['user_id' => $user->user_id],
            [
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'middle_name' => $request->middle_name,
                'phone_number' => $request->phone_number,
                'eligibility' => $request->eligibility,
            ]
        );

        return Redirect::route('profile.edit');
    }

    public function tour(Request $request)
    {
        try {
            $user = $request->user();

            // Update user's profile status
            $user->tour_completed = true;
            $user->save();

            return response()->json(['tour_completed' => true], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Get the user details.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserDetails()
    {
        $user = auth()->user();
        $userDetails = \App\Models\UserDetail::where('user_id', $user->user_id)->get();
        $userCredentials = User::select('email', 'email_verified_at')->where('user_id', $user->user_id)->first();

        return response()->json([
            'userDetails' => $userDetails,
            'userCredentials' => $userCredentials
        ]);
    }

    /**
     * Store user details.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeUserDetails(Request $request)
    {
        $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'phone_number' => 'nullable|max:25',
            'eligibility' => 'nullable|string|max:255',
        ]);

        $user = auth()->user();

        // Update email in the users table if it has changed
        if ($request->filled('email') && $request->email !== $user->email) {
            $user->email = $request->email;
            $user->email_verified_at = null; // Reset email verification if email changed
            $user->save();
        }

        // Find or create user details
        $userDetails = \App\Models\UserDetail::firstOrNew(['user_id' => $user->user_id]);

        // Update details
        $userDetails->firstname = $request->firstname;
        $userDetails->lastname = $request->lastname;
        $userDetails->middle_name = $request->middle_name;
        $userDetails->phone_number = $request->phone_number;
        $userDetails->eligibility = $request->eligibility;

        $userDetails->save();

        return response()->json([
            'success' => true,
            'message' => 'Profile details saved successfully!',
            'data' => $userDetails
        ]);
    }
}
