<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
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
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        // Retrieve the authenticated user and ensure the roles relationship is loaded
        $user = $request->user();

        // Retrieve the user's role; assuming each user has one role attached:
        $role = $user->role_name ?? null;

        Log::info('User authenticated.', ['role' => $role]);

        // Determine redirection based on the user's role
        switch ($role) {
            case 'admin':
                $redirectTo = route('admin.index');
                break;
            case 'hr':
                $redirectTo = route('hr.index');
                break;
           case 'applicant':
                $redirectTo = route('applicant.index');
                break;
            default:
                $redirectTo = RouteServiceProvider::HOME;
                break;
        }

        return redirect()->intended($redirectTo);
    }



    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
