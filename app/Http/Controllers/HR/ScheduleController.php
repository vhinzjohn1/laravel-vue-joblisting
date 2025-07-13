<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use App\Models\Application;
use App\Models\JobListing;
use App\Models\ApplicationGroup;
use App\Models\GroupSchedule;
use App\Models\ScheduleParticipant;
use App\Traits\NotificationTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    use NotificationTrait;

    public function index()
    {
        $schedules = Schedule::with([
            'creator',
            'participants.user.userDetail',
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
        // Determine if we're using group status
        $useGroupStatus = $request->has('use_group_status') && $request->use_group_status === true;

        // Set up validation rules based on whether we're using group status
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'schedule_date' => 'required|date',
            'location' => 'required|string|max:255',
            'application_status' => 'required|string',
        ];

        if ($useGroupStatus) {
            $rules['group_status'] = 'required|string';
            $rules['job_listing_id'] = 'required|exists:job_listings,job_listing_id';
        } else {
            $rules['participants'] = 'required|array';
            $rules['participants.*.application_id'] = 'required|exists:applications,application_id';
        }

        $validated = $request->validate($rules);

        // Additional validation: Check if schedule date is after any job listing's closing date
        $scheduleDate = new \DateTime($validated['schedule_date']);

        if ($useGroupStatus) {
            // For group status, check the specific job listing
            $jobListing = JobListing::find($validated['job_listing_id']);
            if ($jobListing && $jobListing->closing_date) {
                $closingDate = new \DateTime($jobListing->closing_date);
                if ($scheduleDate > $closingDate) {
                    return back()->withErrors([
                        'schedule_date' => "Schedule date cannot be after the job closing date ({$jobListing->closing_date})"
                    ])->withInput();
                }
            }
        } else {
            // For individual participants, check all their job listings
            $participantApplicationIds = collect($request->participants)->pluck('application_id');
            $applications = Application::with('jobListing')->whereIn('application_id', $participantApplicationIds)->get();

            foreach ($applications as $application) {
                if ($application->jobListing && $application->jobListing->closing_date) {
                    $closingDate = new \DateTime($application->jobListing->closing_date);
                    if ($scheduleDate > $closingDate) {
                        return back()->withErrors([
                            'schedule_date' => "Schedule date cannot be after the job closing date ({$application->jobListing->closing_date}) for {$application->jobListing->title}"
                        ])->withInput();
                    }
                }
            }
        }

        $schedule = Schedule::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'schedule_date' => $validated['schedule_date'],
            'location' => $validated['location'],
            'status' => 'Scheduled',
            'created_by' => auth()->id()
        ]);

        // Handle group status selection
        if ($useGroupStatus) {
            // Get all applications for the selected job listing with the specified status
            $applications = Application::where('job_listing_id', $validated['job_listing_id'])
                ->where('status', $validated['group_status'])
                ->get();

            // Log the number of applications found
            Log::info("Found {$applications->count()} applications with status {$validated['group_status']} for job listing {$validated['job_listing_id']}");

            // Create participants for all applications
            foreach ($applications as $application) {
                // Check if participant already exists
                $existingParticipant = ScheduleParticipant::where('schedule_id', $schedule->schedule_id)
                    ->where('application_id', $application->application_id)
                    ->first();

                if (!$existingParticipant) {
                    // Create the participant
                    $scheduleParticipant = ScheduleParticipant::create([
                        'schedule_id' => $schedule->schedule_id,
                        'user_id' => $application->user_id,
                        'application_id' => $application->application_id,
                        'status' => 'Pending'
                    ]);

                    // Update the application status to the provided status
                    $application->update(['status' => $validated['application_status']]);

                    // Notify the applicant
                    $this->notifyApplicantScheduled($schedule, $application);
                }
            }
        } else {
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

                    // Update the application status to the provided status
                    $application->update(['status' => $validated['application_status']]);

                    // Notify the applicant
                    $this->notifyApplicantScheduled($schedule, $application);
                }
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
            'participants' => 'sometimes|array',
            'participants.*.application_id' => 'sometimes|exists:applications,application_id'
        ]);

        $schedule->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'schedule_date' => $validated['schedule_date'],
            'location' => $validated['location'],
            'status' => $validated['status']
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
        $group = GroupSchedule::with([
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
            'location' => 'required|string|max:255'
        ]);

        $group = GroupSchedule::with('applications')->findOrFail($groupId);

        $schedule = Schedule::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'schedule_date' => $validated['schedule_date'],
            'location' => $validated['location'],
            'status' => 'Scheduled',
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

    /**
     * Add a new participant to a schedule
     */
    public function addParticipant(Request $request, Schedule $schedule)
    {
        $validated = $request->validate([
            'application_id' => 'required|exists:applications,application_id',
            'status' => 'sometimes|string'
        ]);

        // Get the application to retrieve the user_id
        $application = Application::findOrFail($validated['application_id']);

        // Check if participant already exists
        $existingParticipant = ScheduleParticipant::where('schedule_id', $schedule->schedule_id)
            ->where('application_id', $validated['application_id'])
            ->first();

        if ($existingParticipant) {
            return response()->json([
                'message' => 'Participant already exists in this schedule',
                'success' => false
            ], 422);
        }

        // Create the participant with default status if not provided
        $scheduleParticipant = ScheduleParticipant::create([
            'schedule_id' => $schedule->schedule_id,
            'user_id' => $application->user_id,
            'application_id' => $application->application_id,
            'status' => $validated['status'] ?? 'Pending'
        ]);

        // Notify the applicant
        $this->notifyApplicantScheduled($schedule, $application);

        // Reload the schedule with participants
        $schedule->load([
            'creator',
            'participants.user.userDetail',
            'participants.application.jobListing.position'
        ]);

        return response()->json([
            'message' => 'Participant added successfully',
            'schedule' => $schedule,
            'success' => true
        ]);
    }

    /**
     * Update a participant's status
     */
    public function updateParticipant(Request $request, Schedule $schedule, ScheduleParticipant $participant)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:Pending,Confirmed,Declined,Attended,Cancelled'
        ]);

        // Ensure the participant belongs to the schedule
        if ($participant->schedule_id !== $schedule->schedule_id) {
            return response()->json([
                'message' => 'Participant does not belong to this schedule',
                'success' => false
            ], 422);
        }

        $participant->update([
            'status' => $validated['status']
        ]);

        // Reload the schedule with participants
        $schedule->load([
            'creator',
            'participants.user.userDetail',
            'participants.application.jobListing.position'
        ]);

        return response()->json([
            'message' => 'Participant status updated successfully',
            'schedule' => $schedule,
            'success' => true
        ]);
    }

    /**
     * Remove a participant from a schedule
     */
    public function removeParticipant(Schedule $schedule, ScheduleParticipant $participant)
    {
        // Ensure the participant belongs to the schedule
        if ($participant->schedule_id !== $schedule->schedule_id) {
            return response()->json([
                'message' => 'Participant does not belong to this schedule',
                'success' => false
            ], 422);
        }

        $participant->delete();

        // Reload the schedule with participants
        $schedule->load([
            'creator',
            'participants.user.userDetail',
            'participants.application.jobListing.position'
        ]);

        return response()->json([
            'message' => 'Participant removed successfully',
            'schedule' => $schedule,
            'success' => true
        ]);
    }
}
