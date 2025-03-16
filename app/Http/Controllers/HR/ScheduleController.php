<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use App\Models\Application;
use App\Models\JobListing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index()
    {
        $schedules = Schedule::with([
            'creator',
            'participants.user',
            'participants.application.jobListing.position'
        ])
            ->orderBy('schedule_date', 'desc')
            ->get();

        // Get all job listings with their applications and user details
        $jobListings = JobListing::with([
            'position',
            'applications' => function ($query) {
                $query->with(['user.userDetail']); // Include user details
            }
        ])->get();

        return Inertia::render('HR/Schedule/ScheduleManagement', [
            'schedules' => $schedules,
            'jobListings' => $jobListings
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'schedule_date' => 'required|date',
            'location' => 'required|string|max:255',
            'participants' => 'required|array',
            'participants.*.application_id' => 'required|exists:applications,application_id',
            'notes' => 'nullable|string'
        ]);

        $schedule = Schedule::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'schedule_date' => $validated['schedule_date'],
            'location' => $validated['location'],
            'status' => 'Scheduled',
            'notes' => $validated['notes'],
            'created_by' => auth()->id()
        ]);

        foreach ($validated['participants'] as $participant) {
            $application = Application::find($participant['application_id']);
            $schedule->participants()->create([
                'user_id' => $application->user_id,
                'application_id' => $application->application_id,
                'status' => 'Pending'
            ]);
        }

        return redirect()->back()->with('success', 'Schedule created successfully');
    }

    public function update(Request $request, Schedule $schedule)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'schedule_date' => 'required|date',
            'location' => 'required|string|max:255',
            'status' => 'required|string',
            'notes' => 'nullable|string',
            'participants' => 'sometimes|array',
            'participants.*.application_id' => 'sometimes|exists:applications,application_id'
        ]);

        $schedule->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'schedule_date' => $validated['schedule_date'],
            'location' => $validated['location'],
            'status' => $validated['status'],
            'notes' => $validated['notes']
        ]);

        // Update participant statuses based on schedule status
        if ($validated['status'] === 'Completed') {
            $schedule->participants()->update(['status' => 'Attended']);
        } elseif ($validated['status'] === 'Cancelled') {
            $schedule->participants()->update(['status' => 'Cancelled']);
        }

        // Update participants if provided
        if (isset($validated['participants'])) {
            // Remove existing participants
            $schedule->participants()->delete();

            // Add new participants
            foreach ($validated['participants'] as $participant) {
                $application = Application::find($participant['application_id']);
                $schedule->participants()->create([
                    'user_id' => $application->user_id,
                    'application_id' => $application->application_id,
                    'status' => 'Pending'
                ]);
            }
        }

        return redirect()->back()->with('success', 'Schedule updated successfully');
    }

    public function destroy(Schedule $schedule)
    {
        $schedule->delete();
        return redirect()->back()->with('success', 'Schedule deleted successfully');
    }
}
