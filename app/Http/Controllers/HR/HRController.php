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
            'active_applications' => Application::where('status', 'pending')->count(),
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

        return Inertia::render('HR/HRDashboard', [
            'stats' => $stats,
            'recentJobs' => $recentJobs,
            'upcomingInterviews' => $upcomingInterviews,
            'recentApplications' => $recentApplications,
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
