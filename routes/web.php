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
use App\Http\Controllers\SelectionLineupController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProfileCompletionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfileDetailsController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\BatchController;
use App\Http\Controllers\HR\ArchiveController;
use App\Http\Controllers\HR\GroupScheduleController;
use App\Http\Controllers\RequiredDocumentController;
use App\Http\Controllers\ViewJobListingController;
use App\Http\Controllers\HR\EligibilityController;
use App\Http\Controllers\UserEligibilityController;

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

    // PROFILE & PROFILE DETAILS ROUTES
    // =======================
    Route::middleware(['auth'])->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::middleware(['auth'])->group(function () {
        Route::post('/profile/store-details', [ProfileController::class, 'storeUserDetails'])->name('profile.store-details');
        Route::get('profile-details/{type}', [ProfileDetailsController::class, 'index'])->name('profile-details.index');
        Route::post('profile-details/{type}', [ProfileDetailsController::class, 'store'])->name('profile-details.store');
        Route::put('profile-details/{type}/{id}', [ProfileDetailsController::class, 'update'])->name('profile-details.update');
        Route::delete('profile-details/{type}/{id}', [ProfileDetailsController::class, 'destroy'])->name('profile-details.destroy');
        Route::get('/profile/user-details', [ProfileController::class, 'getUserDetails'])->name('profile.user-details');

        Route::get('eligibility/all', [EligibilityController::class, 'getAllEligibilities'])->name('eligibility.all');
        Route::resource('user-eligibility', UserEligibilityController::class)->only(['index', 'store', 'destroy']);
    });

// =======================
// HR ROUTES
// =======================
Route::middleware(['auth', 'role:hr,admin'])->group(function () {
    Route::resource('hr', HRController::class);
    Route::put('job-listing/bulk-update', [ManageJobListingController::class, 'bulkUpdate'])->name('job-listing.bulk-update');
    Route::resource('job-listing', ManageJobListingController::class);
    Route::resource('applications', ManageApplicationController::class);
    Route::get('applications/job/{jobListingId}', [ManageApplicationController::class, 'showJobApplications'])->name('applications.job');
    Route::resource('job-position', JobPositionController::class);
    Route::resource('groups', GroupScheduleController::class);
    Route::resource('selection-lineup', SelectionLineupController::class);
    Route::resource('archive', ArchiveController::class);

    // Page route for batches management view (place BEFORE resource to avoid conflict with batches/{batch})
    Route::get('batches/manage', [BatchController::class, 'page'])->name('batches.page');
    Route::resource('batches', BatchController::class);

    Route::resource('required-documents', RequiredDocumentController::class);
    Route::post('/batches/archive', [BatchController::class, 'archive'])->name('batches.archive');
    Route::resource('eligibility', EligibilityController::class);
});

// =======================
// APPLICANT ROUTES
// =======================
Route::middleware(['web.complete', 'auth', 'role:applicant'])->group(function () {
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

    // Required Documents route - accessible to all authenticated users
    Route::get('required-documents', [RequiredDocumentController::class, 'index'])->name('required-documents.index');
});

// =======================
// PROFILE & POSITION ROUTES
// =======================
Route::middleware(['auth'])->group(function () {
    Route::resource('position', PositionController::class);
});

Route::middleware(['auth'])->group(function () {
    Route::get('complete-profile', [ProfileCompletionController::class, 'index'])->name('complete-profile');
    Route::put('complete-profile', [ProfileCompletionController::class, 'update'])->name('complete-profile.update');
    Route::post('complete-profile/store', [ProfileCompletionController::class, 'store'])->name('complete-profile.store');
});

// =======================
// ADMIN ROUTES
// =======================
Route::middleware(['auth', 'admin', 'role:admin'])->group(function () {
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

Route::post('custom-verification/send', [EmailController::class, 'sendVerificationEmail'])->name('custom-verification.send');

// Verification route should be accessible without auth
Route::get('verify-custom-email/{id}/{hash}', [EmailController::class, 'verifyCustomEmail'])
    ->name('custom-verification.verify')
    ->middleware('signed');

// =======================
// SCHEDULE ROUTES
// =======================
Route::middleware(['auth'])->group(function () {
    Route::resource('schedules', ScheduleController::class);
    Route::post('schedules/{schedule}/participants', [ScheduleController::class, 'addParticipant'])->name('schedules.add-participant');
    Route::put('schedules/{schedule}/participants/{participant}', [ScheduleController::class, 'updateParticipant'])->name('schedules.update-participant');
    Route::delete('schedules/{schedule}/participants/{participant}', [ScheduleController::class, 'removeParticipant'])->name('schedules.remove-participant');
});

// =======================
// TEST & UTILITY ROUTES
// =======================
Route::get('/php-info', function () {
    return phpinfo();
});

// =======================
// View Job Listing Routes
// =======================
Route::middleware(['auth'])->resource('view-job-listing', ViewJobListingController::class);

require __DIR__ . '/auth.php';
