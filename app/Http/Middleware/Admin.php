<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class Admin
{
    public function handle(Request $request, Closure $next)
    {
        $role = $request->user()->role_name ?? null;

        if ($role !== 'admin') {
            return redirect()->back()->with('error', 'Access denied. You are not authorized to access this page.');
        }
        // If you want to add role-checking logic later, you can do it here.
        // For now, just pass the request to the next middleware/controller.
        return $next($request);
    }
}
