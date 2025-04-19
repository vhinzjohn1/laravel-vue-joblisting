<?php
// =======================
// IMPORTS
// =======================
// Core Framework Imports
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Applicant\ApplicantDashboardController;
use App\Http\Controllers\Applicant\JobApplicationController;
use App\Http\Controllers\Applicant\MyApplicationsController;
use App\Http\Controllers\Applicant\ScheduleController as ApplicantScheduleController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\HR\ApplicationGroupController;
use App\Http\Controllers\HR\HRController;
use App\Http\Controllers\HR\JobPositionController;
use App\Http\Controllers\HR\ManageApplicationController;
use App\Http\Controllers\HR\ManageJobListingController;
use App\Http\Controllers\HR\ScheduleController;
use App\Http\Controllers\HR\SelectionLineupController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProfileCompletionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfileDetailsController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;

// =======================
// WELCOME & LANDING ROUTES
// =======================
// Server Side Welcome Page (Blade)
Route::get('/', [WelcomeController::class, 'showBlade'])->name('/');
// Client Side Welcome Page (Inertia)
Route::get('welcome', [WelcomeController::class, 'showInertia'])->name('welcome');
// Fallback to root if route is not found
Route::fallback(function () {
    return redirect('/');
});

// =======================
// VALIDATE CREDENTIALS ROUTES
// =======================
Route::post('login/validate', [AuthenticatedSessionController::class, 'validateCredentials'])
    ->name('login.validate');
Route::post('register/validate', [RegisteredUserController::class, 'validateRegistration'])
    ->name('register.validate');

// =======================
// PROFILE & PROFILE DETAILS ROUTES
// =======================
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/profile/user-details', [ProfileController::class, 'getUserDetails'])->name('profile.user-details');
    Route::post('/profile/store-details', [ProfileController::class, 'storeUserDetails'])->name('profile.store-details');
    Route::get('profile-details/{type}', [ProfileDetailsController::class, 'index'])->name('profile-details.index');
    Route::post('profile-details/{type}', [ProfileDetailsController::class, 'store'])->name('profile-details.store');
    Route::delete('profile-details/{type}/{id}', [ProfileDetailsController::class, 'destroy'])->name('profile-details.destroy');
});

// =======================
// HR ROUTES
// =======================
Route::middleware(['auth', 'role:hr'])->group(function () {
    Route::resource('hr', HRController::class);
    Route::resource('job-listing', ManageJobListingController::class);
    Route::resource('applications', ManageApplicationController::class);
    Route::resource('job-position', JobPositionController::class);
    Route::resource('groups', ApplicationGroupController::class);
    Route::resource('selection-lineup', SelectionLineupController::class);
});

// =======================
// APPLICANT ROUTES
// =======================
Route::middleware(['auth', 'role:applicant'])->group(function () {
    Route::resource('applicant', ApplicantDashboardController::class)->except(['show']);
    Route::resource('job-application', JobApplicationController::class);
    Route::resource('my-applications', MyApplicationsController::class);
    Route::resource('my-schedules', ApplicantScheduleController::class);
    Route::post('my-schedules/{schedule}/status', [ApplicantScheduleController::class, 'updateStatus'])->name('my-schedules.update-status');
});

// =======================
// NOTIFICATION ROUTES
// =======================
Route::middleware(['auth'])->group(function () {
    // Notification routes
    Route::resource('notifications', NotificationController::class)->only(['index']);
    Route::post('notifications/{notification}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.mark-as-read');
    Route::post('notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.mark-all-as-read');
    Route::get('notifications/unread-count', [NotificationController::class, 'getUnreadCount'])->name('notifications.unread-count');
});

// =======================
// PROFILE & POSITION ROUTES
// =======================
Route::middleware(['auth'])->group(function () {
    Route::resource('position', PositionController::class);
    Route::resource('complete-profile', ProfileCompletionController::class);
});

// =======================
// ADMIN ROUTES
// =======================
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('admin', AdminController::class);
});

// =======================
// EMAIL ROUTES
// =======================
Route::middleware(['auth'])->group(function () {
    Route::resource('send-email', EmailController::class);
    Route::get('test-notification-email', [EmailController::class, 'sendTestNotification'])->name('email.test-notification');
    Route::post('notify-applicant', [EmailController::class, 'notifyApplicant'])->name('email.notify-applicant');
});

// =======================
// SCHEDULE ROUTES
// =======================
Route::middleware(['auth'])->group(function () {
    Route::resource('schedules', ScheduleController::class);
});

// =======================
// TEST & UTILITY ROUTES
// =======================
Route::get('/php-info', function () {
    return phpinfo();
});
require __DIR__ . '/auth.php';
