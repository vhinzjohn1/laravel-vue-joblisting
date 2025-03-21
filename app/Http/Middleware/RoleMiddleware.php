<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  mixed ...$roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $userRole = $request->user()->role_name ?? null;

         // if profile is not completed, redirect to complete profile
        if ($request->user()->profile_completed === false && in_array('applicant', $roles)) {
            return redirect()->route('complete-profile');
        }
        // Check if the user's role is in the allowed roles
        if (!in_array($userRole, $roles)) {
            return redirect()->back()->with('error', 'Access denied. You are not authorized to access this page.');
        }

        return $next($request);
    }
}
