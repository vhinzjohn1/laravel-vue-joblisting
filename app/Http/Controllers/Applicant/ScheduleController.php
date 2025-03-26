<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use App\Models\ScheduleParticipant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    /**
     * Display a listing of schedules for the authenticated applicant.
     */
    public function index()
    {
        $user = Auth::user();

        // Get all schedules where the current user is a participant
        $schedules = Schedule::with([
            'creator.userDetail',
            'participants' => function ($query) use ($user) {
                $query->where('user_id', $user->user_id);
            },
            'participants.application.jobListing.position'
        ])
            ->whereHas('participants', function ($query) use ($user) {
                $query->where('user_id', $user->user_id);
            })
            ->orderBy('schedule_date', 'desc')
            ->get();

        return Inertia::render('Applicant/Schedule/ScheduleCalendar', [
            'schedules' => $schedules
        ]);
    }

    /**
     * Display the specified schedule.
     */
    public function show(Schedule $schedule)
    {
        $user = Auth::user();

        // Check if the user is a participant in this schedule
        $isParticipant = $schedule->participants()
            ->where('user_id', $user->user_id)
            ->exists();

        if (!$isParticipant) {
            return redirect()->route('my-schedules.index')
                ->with('error', 'You are not authorized to view this schedule.');
        }

        $schedule->load([
            'creator.userDetail',
            'participants' => function ($query) use ($user) {
                $query->where('user_id', $user->user_id);
            },
            'participants.application.jobListing.position'
        ]);

        return Inertia::render('Applicant/Schedule/ScheduleDetail', [
            'schedule' => $schedule
        ]);
    }

    /**
     * Update participant status (e.g., confirm attendance).
     */
    public function updateStatus(Request $request, Schedule $schedule)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:Confirmed,Declined',
        ]);

        $user = Auth::user();

        // Find the participant record
        $participant = ScheduleParticipant::where('schedule_id', $schedule->schedule_id)
            ->where('user_id', $user->user_id)
            ->firstOrFail();

        $participant->update([
            'status' => $validated['status']
        ]);

        return redirect()->back()->with('success', 'Your attendance status has been updated.');
    }
}
