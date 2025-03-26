<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureProfileIsComplete
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user has completed their profile
        // This is a simple example - you should adapt based on your user model and requirements
        if ($request->user() && !$request->user()->profile_completed && $request->user()->role_name === 'applicant') {
            return redirect()->route('complete-profile');
        }

        return $next($request);
    }
}
