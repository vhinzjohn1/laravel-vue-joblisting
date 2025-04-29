<?php

namespace App\Http\Controllers\HR;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\User;
use App\Models\JobListing;
use App\Models\JobApplication;
use App\Models\Schedule;
use App\Models\ScheduleParticipant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HRController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        // Get statistics
        $stats = [
            'total_jobs' => JobListing::count(),
            'total_applicants' => Application::distinct('user_id')->count(),
            'scheduled_interviews' => Schedule::where('schedule_date', '>=', now())->count(),
        ];

        // Get recent job listings
        $recentJobs = JobListing::with('position')
            ->latest()
            ->take(5)
            ->get();

        // Get upcoming interviews
        $upcomingInterviews = ScheduleParticipant::with(['schedule', 'application.jobListing'])
    ->whereHas('schedule', function($query) {
        $query->where('schedule_date', '>=', now());
    })
    ->take(5)
    ->get();

        // Get recent applications
        $recentApplications = Application::with(['user', 'jobListing', 'user.userDetail'])
            ->latest()
            ->take(5)
            ->get();

        // Get application status distribution for chart
        $applicationStats = Application::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status')
            ->toArray();

        // Get applications over time for chart
        $applicationsOverTime = Application::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->date,
                    'count' => $item->count
                ];
            })
            ->toArray();

        // Get job listings by category for chart
        $jobListingStats = JobListing::join('positions', 'job_listings.position_id', '=', 'positions.position_id')
            ->select('positions.category', DB::raw('count(*) as count'))
            ->groupBy('positions.category')
            ->get()
            ->pluck('count', 'category')
            ->toArray();

        return Inertia::render('HR/HRDashboard', [
            'stats' => $stats,
            'recentJobs' => $recentJobs,
            'upcomingInterviews' => $upcomingInterviews,
            'recentApplications' => $recentApplications,
            'applicationStats' => $applicationStats,
            'applicationsOverTime' => $applicationsOverTime,
            'jobListingStats' => $jobListingStats,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
