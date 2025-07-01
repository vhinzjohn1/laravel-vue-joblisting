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
            ->select('user_id', 'password', 'email', 'username')
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
        return Inertia::location('/');
    }
}
