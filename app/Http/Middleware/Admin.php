<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check() && auth()->user()->role_name === 'admin') {
            return $next($request);
        }

        // Only redirect if trying to access admin routes
        if (strpos($request->path(), 'admin') === 0) {
            return redirect('/')->with('error', 'You do not have admin access.');
        }

        // For other routes, just abort with 403
        abort(403, 'Unauthorized access.');
    }
}
