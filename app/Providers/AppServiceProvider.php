<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Carbon\Carbon;

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
        // Set the application timezone
        date_default_timezone_set(config('app.timezone'));

        // Configure Carbon to use the application timezone
        Carbon::setLocale(config('app.locale'));
        Carbon::setTestNow(null);
    }
}
