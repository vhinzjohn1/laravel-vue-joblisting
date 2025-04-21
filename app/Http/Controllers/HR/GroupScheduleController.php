<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\GroupSchedule;
use App\Models\JobListing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupScheduleController extends Controller
{
    public function index()
    {
        $groups = GroupSchedule::with([
            'jobListing.position',
            'members.user.userDetail',
            'schedule',
            'creator'
        ])->get();

        // Get job listings with their applications and users
        $jobListings = JobListing::with([
            'position',
            'applications' => function ($query) {
                $query->with('user.userDetail');
            }
        ])->get();

        return Inertia::render('HR/ApplicationGroup/GroupManagement', [
            'groups' => $groups,
            'jobListings' => $jobListings
        ]);
    }


    // Function for creating a new group
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'job_listing_id' => 'required|exists:job_listings,job_listing_id',
        ]);

        $group = GroupSchedule::create([
            'name' => $validated['name'],
            'notes' => $validated['notes'],
            'job_listing_id' => $validated['job_listing_id'],
            'created_by' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Group created successfully');
    }

    // Function for updating an existing group
    public function update(Request $request, GroupSchedule $group)
    {
        // Check the action type from the request
        $action = $request->input('action');

        switch ($action) {
            case 'addMembers':
                return $this->handleAddMembers($request, $group);
            case 'removeMembers':
                return $this->handleRemoveMembers($request, $group);
            case 'updateDetails':
                return $this->handleUpdateDetails($request, $group);
            case 'createSchedule':
                return $this->handleCreateSchedule($request, $group);
            default:
                return $this->handleUpdateDetails($request, $group);
        }
    }

    private function handleAddMembers(Request $request, GroupSchedule $group)
    {
        $validated = $request->validate([
            'application_ids' => 'required|array',
            'application_ids.*' => 'exists:applications,application_id'
        ]);

        foreach ($validated['application_ids'] as $applicationId) {
            $group->members()->firstOrCreate([
                'application_id' => $applicationId
            ]);
        }

        return redirect()->back()->with('success', 'Members added successfully');
    }

    private function handleRemoveMembers(Request $request, GroupSchedule $group)
    {
        $validated = $request->validate([
            'application_ids' => 'required|array',
            'application_ids.*' => 'exists:applications,application_id'
        ]);

        $group->members()
            ->whereIn('application_id', $validated['application_ids'])
            ->delete();

        return redirect()->back()->with('success', 'Members removed successfully');
    }

    private function handleUpdateDetails(Request $request, GroupSchedule $group)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $group->update($validated);

        return redirect()->back()->with('success', 'Group updated successfully');
    }

    /**
     * Handle creating a schedule for the group by redirecting to schedule creation
     */
    private function handleCreateSchedule(Request $request, GroupSchedule $group)
    {
        return redirect()->route('schedules.create', ['group' => $group->group_id]);
    }

    public function destroy(GroupSchedule $group)
    {
        $group->delete();
        return redirect()->back()->with('success', 'Group deleted successfully');
    }
}
