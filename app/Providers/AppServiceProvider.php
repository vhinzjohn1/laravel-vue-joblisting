<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Enable SSR
        Inertia::version(function () {
            return md5_file(public_path('build/manifest.json'));
        });

        // Enable SSR for specific routes if needed
        // Inertia::ssr('resources/js/ssr.js');
    }
}
