<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Applicant\ApplicantDashboardController;
use App\Http\Controllers\Applicant\JobApplicationController;
use App\Http\Controllers\Applicant\MyApplicationsController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\HR\ApplicationGroupController;
use App\Http\Controllers\HR\HRController;
use App\Http\Controllers\HR\ManageJobListingController;
use App\Http\Controllers\HR\ManageApplicationController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\ProfileDetailsController;
use App\Http\Controllers\HR\ScheduleController;
use App\Http\Controllers\NotificationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Mail\SendEmail;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Http\Controllers\Applicant\ScheduleController as ApplicantScheduleController;

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
    Route::get('profile-details/{type}', [ProfileDetailsController::class, 'index'])->name('profile-details.index');
    Route::post('profile-details/{type}', [ProfileDetailsController::class, 'store'])->name('profile-details.store');
    Route::delete('profile-details/{type}/{id}', [ProfileDetailsController::class, 'destroy'])->name('profile-details.destroy');
});

Route::middleware(['admin'])->group(function () {
    Route::resource('admin', AdminController::class);
    Route::resource('test', TestController::class);
});

Route::middleware(['hr'])->group(function () {
    Route::resource('hr', HRController::class);
    Route::resource('job-listing', ManageJobListingController::class);
    Route::resource('applications', ManageApplicationController::class);

    // Application Groups
    Route::resource('groups', ApplicationGroupController::class);
});

Route::middleware(['applicant'])->group(function () {
    Route::resource('applicant', ApplicantDashboardController::class);
    Route::resource('job-application', JobApplicationController::class);
    Route::resource('my-applications', MyApplicationsController::class);

    // Applicant schedules
    Route::resource('my-schedules', ApplicantScheduleController::class);
    // Add a custom route for updating status that doesn't fit the resource pattern
    Route::post('my-schedules/{schedule}/status', [ApplicantScheduleController::class, 'updateStatus'])->name('my-schedules.update-status');
});

Route::resource('position', PositionController::class);

Route::get('/php-info', function () {
    return [
        'upload_max_filesize' => ini_get('upload_max_filesize'),
        'post_max_size'      => ini_get('post_max_size'),
    ];
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('send-email', EmailController::class);
    Route::resource('schedules', ScheduleController::class);
});

Route::middleware(['auth'])->group(function () {
    // Notification routes
    Route::resource('notifications', NotificationController::class)->only(['index']);
    Route::post('notifications/{notification}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.mark-as-read');
    Route::post('notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.mark-all-as-read');
    Route::get('notifications/unread-count', [NotificationController::class, 'getUnreadCount'])->name('notifications.unread-count');
});

require __DIR__ . '/auth.php';
