<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->user_id,
                    'name' => $request->user()->username,
                    'email' => $request->user()->email,
                    'username' => $request->user()->username,
                    'role_name' => $request->user()->role_name,
                    'tour_completed' => $request->user()->tour_completed,
                    'first_name' => $request->user()->userDetail?->firstname,
                    'last_name' => $request->user()->userDetail?->lastname,
                    'middle_name' => $request->user()->userDetail?->middle_name,
                    'phone_number' => $request->user()->userDetail?->phone_number,
                    'eligibility' => $request->user()->userDetail?->eligibility,
                    'email_verified_at' => $request->user()->email_verified_at,
                ] : null,
            ],
            'notifications' => $request->user() ? $request->user()->notifications()->latest()->take(5)->get() : [],
            // ... other shared data ...
        ]);
    }
}
