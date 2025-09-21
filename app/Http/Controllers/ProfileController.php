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
use Illuminate\Support\Facades\Log;

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
        $user = Auth::user();

        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        UserDetail::updateOrCreate(
            ['user_id' => $user->user_id],
            $request->safe()->only(['firstname', 'lastname', 'middle_name', 'phone_number'])
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
        Log::info('storeUserDetails: Incoming request data', $request->all());

        $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'phone_number' => 'nullable|max:25',
            'email' => 'required|string|email|max:255',
        ]);

        $user = auth()->user();
        Log::info('storeUserDetails: Authenticated user', $user->toArray());

        // Update email in the users table if it has changed
        if ($request->filled('email') && $request->email !== $user->email) {
            $user->email = $request->email;
            $user->email_verified_at = null; // Reset email verification if email changed
            $user->save();
            Log::info('storeUserDetails: User email updated', $user->toArray());
        }

        // Find or create user details
        $userDetails = UserDetail::firstOrNew(['user_id' => $user->user_id]);
        Log::info('storeUserDetails: UserDetail before update', $userDetails->toArray());

        // Update details
        $userDetails->firstname = $request->firstname;
        $userDetails->lastname = $request->lastname;
        $userDetails->middle_name = $request->middle_name;
        $userDetails->phone_number = $request->phone_number;

        $userDetails->save();
        Log::info('storeUserDetails: UserDetail after update', $userDetails->toArray());

        return response()->json([
            'success' => true,
            'message' => 'Profile details saved successfully!',
            'data' => $userDetails
        ]);
    }
}
