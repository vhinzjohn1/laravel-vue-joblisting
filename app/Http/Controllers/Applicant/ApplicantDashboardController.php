<?php

namespace App\Http\Controllers\Applicant;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\User;
use App\Models\JobListing;
use App\Models\Schedule;
use App\Models\ScheduleParticipant;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ApplicantDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        // Get application statistics
        $stats = [
            'total_applications' => Application::where('user_id', $user->user_id)->count(),
            'pending_applications' => Application::where('user_id', $user->user_id)
                ->where('status', 'pending')
                ->count(),
            'successful_applications' => Application::where('user_id', $user->user_id)
                ->where('status', 'accepted')
                ->count(),
            'upcoming_interviews' => ScheduleParticipant::where('user_id', $user->user_id)
                ->whereHas('schedule', function ($query) {
                    $query->where('schedule_date', '>=', now());
                })
                ->count(),
        ];

        // Get recent applications
        $recentApplications = Application::with('jobListing')
            ->where('user_id', $user->user_id)
            ->latest()
            ->take(5)
            ->get();

        // Get upcoming interviews
        $upcomingInterviews = ScheduleParticipant::where('user_id', $user->user_id)
            ->whereHas('schedule', function ($query) {
                $query->where('schedule_date', '>=', now());
            })
            ->with('application.jobListing' , 'schedule')
            ->take(5)
            ->get();

        // Get recommended jobs based on user's previous applications
        $recommendedJobs = JobListing::where('status', 'active')
            ->whereNotIn('job_listing_id', function ($query) use ($user) {
                $query->select('job_listing_id')
                    ->from('applications')
                    ->where('user_id', $user->user_id);
            })
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Applicant/ApplicantDashboard', [
            'stats' => $stats,
            'recentApplications' => $recentApplications,
            'upcomingInterviews' => $upcomingInterviews,
            'recommendedJobs' => $recommendedJobs,
        ]);
    }

    // Other methods remain unchanged
}
