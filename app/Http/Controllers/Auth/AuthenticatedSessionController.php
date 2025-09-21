<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => Session::get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $user = $request->user();

        // If the user is an applicant, check their profile completion and email verification status
        if ($user && $user->role_name === 'applicant') {
            if ($user->profile_completed && is_null($user->email_verified_at)) {
                // If profile is complete but email is not verified, log out and redirect with an error
                Auth::guard('web')->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                throw ValidationException::withMessages([
                    'login' => 'Your email address is not verified. Please check your email for a verification link.',
                ]);
            } elseif (!$user->profile_completed) {
                // If profile is not complete, redirect to the complete profile page
                $request->session()->regenerate();
                return redirect()->route('complete-profile');
            }
        }

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Validate login credentials without performing actual login.
     */
    public function validateCredentials(Request $request): JsonResponse
    {
        // Store input values to avoid repeated method calls
        $login = $request->input('login');
        $password = $request->input('password');

        // Fast validation
        if (!is_string($login) || !is_string($password) || empty($login) || empty($password)) {
            throw ValidationException::withMessages([
                'login' => __('validation.required', ['attribute' => 'login']),
                'password' => __('validation.required', ['attribute' => 'password'])
            ]);
        }

        // Efficient user lookup: use raw query for performance
        $user = DB::table('users')
            ->select('user_id', 'password', 'email', 'username', 'email_verified_at')
            ->where('email', $login)
            ->orWhere('username', $login)
            ->first();

        if (!$user) {
            $loginType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
            throw ValidationException::withMessages([
                'login' => 'No account found with this ' . $loginType . '. Please check your information or register.',
            ]);
        }

        // Hash check
        if (!Hash::check($password, $user->password)) {
            throw ValidationException::withMessages([
                'password' => 'The password is incorrect.',
            ]);
        }

        return response()->json(['message' => 'Credentials valid']);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        // Use Inertia::location to force a full page reload to the root (welcome blade)
        return Inertia::location('/login');
    }
}
