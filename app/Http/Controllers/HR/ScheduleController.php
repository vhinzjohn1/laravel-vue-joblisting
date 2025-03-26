<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use App\Models\Application;
use App\Models\JobListing;
use App\Models\ApplicationGroup;
use App\Models\ScheduleParticipant;
use App\Traits\NotificationTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    use NotificationTrait;

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

        // Create participants and send notifications in a single loop
        if ($request->has('participants')) {
            foreach ($request->participants as $participant) {
                // Get the application to retrieve the user_id
                $application = Application::findOrFail($participant['application_id']);

                // Create the participant
                $scheduleParticipant = ScheduleParticipant::create([
                    'schedule_id' => $schedule->schedule_id,
                    'user_id' => $application->user_id,
                    'application_id' => $application->application_id,
                    'status' => 'Pending'
                ]);

                // Notify the applicant
                $this->notifyApplicantScheduled($schedule, $application);
            }
        }

        return redirect()->route('schedules.index')
            ->with('success', 'Schedule created successfully');
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

        // If participants are updated, notify them
        if ($request->has('participants')) {
            // Remove old participants
            $schedule->participants()->delete();

            // Keep track of which users we've already notified to prevent duplicates
            $notifiedUsers = [];

            // Add new participants and notify them
            foreach ($request->participants as $participant) {
                // Get the application to retrieve the user_id
                $application = Application::findOrFail($participant['application_id']);

                $scheduleParticipant = ScheduleParticipant::create([
                    'schedule_id' => $schedule->schedule_id,
                    'user_id' => $application->user_id,
                    'application_id' => $application->application_id,
                    'status' => 'Pending'
                ]);

                // Only send notification if we haven't notified this user yet
                if (!in_array($application->user_id, $notifiedUsers)) {
                    $this->notifyApplicantScheduled($schedule, $application, true);
                    // Add user to notified list so we don't send duplicate notifications
                    $notifiedUsers[] = $application->user_id;
                }
            }
        }

        return redirect()->route('schedules.index')
            ->with('success', 'Schedule updated successfully');
    }

    public function destroy(Schedule $schedule)
    {
        $schedule->delete();
        return redirect()->back()->with('success', 'Schedule deleted successfully');
    }

    public function createFromGroup($groupId)
    {
        $group = ApplicationGroup::with([
            'applications.user',
            'jobListing.position'
        ])->findOrFail($groupId);

        return Inertia::render('HR/Schedule/CreateSchedule', [
            'group' => $group
        ]);
    }

    public function storeFromGroup(Request $request, $groupId)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'schedule_date' => 'required|date',
            'location' => 'required|string|max:255',
            'notes' => 'nullable|string'
        ]);

        $group = ApplicationGroup::with('applications')->findOrFail($groupId);

        $schedule = Schedule::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'schedule_date' => $validated['schedule_date'],
            'location' => $validated['location'],
            'status' => 'Scheduled',
            'notes' => $validated['notes'],
            'created_by' => auth()->id(),
            'group_id' => $groupId
        ]);

        // Keep track of which users we've already notified to prevent duplicates
        $notifiedUsers = [];

        foreach ($group->applications as $application) {
            $schedule->participants()->create([
                'user_id' => $application->user_id,
                'application_id' => $application->application_id,
                'status' => 'Pending'
            ]);

            // Only send notification if we haven't notified this user yet
            if (!in_array($application->user_id, $notifiedUsers)) {
                $this->notifyApplicantScheduled($schedule, $application);
                // Add user to notified list so we don't send duplicate notifications
                $notifiedUsers[] = $application->user_id;
            }
        }

        $group->update(['status' => 'Scheduled']);

        return redirect()->route('schedules.index')->with('success', 'Schedule created successfully');
    }
}
