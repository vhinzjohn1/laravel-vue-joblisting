<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Applicant\ApplicantController;
use App\Http\Controllers\Applicant\JobApplicationController;
use App\Http\Controllers\Applicant\MyApplicationsController;
use App\Http\Controllers\HR\HRController;
use App\Http\Controllers\HR\JobListingController;
use App\Http\Controllers\HR\ApplicationsController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // If the user is authenticated, redirect based on role
    if (Auth::check()) {
        $user = Auth::user();
        $role = $user->role_name ?? null;

        switch ($role) {
            case 'admin':
                return redirect()->route('admin.index');
            case 'hr':
                return redirect()->route('hr.index');
            case 'applicant':
                return redirect()->route('applicant.index');
            default:
                return redirect()->route('dashboard');
        }
    }

    // Otherwise, show the welcome page for guests
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['admin'])->group(function () {
    Route::resource('admin', AdminController::class);
});

Route::middleware(['hr'])->group(function () {
    Route::resource('hr', HRController::class);
    Route::resource('job-listing', JobListingController::class);
    Route::resource('applications', ApplicationsController::class);
});

Route::middleware(['applicant'])->group(function () {
    Route::resource('applicant', ApplicantController::class);
    Route::resource('job-application', JobApplicationController::class);
    Route::resource('my-applications', MyApplicationsController::class);
});

Route::resource('test', TestController::class);
Route::resource('position', PositionController::class);

require __DIR__ . '/auth.php';
