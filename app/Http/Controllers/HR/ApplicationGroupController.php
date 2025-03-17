<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\ApplicationGroup;
use App\Models\Application;
use App\Models\JobListing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationGroupController extends Controller
{
    public function index()
    {
        $groups = ApplicationGroup::with([
            'jobListing.position',
            'applications.user',
            'schedule',
            'creator'
        ])->get();

        // Get job listings with their applications and users
        $jobListings = JobListing::with([
            'position',
            'applications' => function ($query) {
                $query->with('user');
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

        $group = ApplicationGroup::create([
            'name' => $validated['name'],
            'notes' => $validated['notes'],
            'job_listing_id' => $validated['job_listing_id'],
            'created_by' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Group created successfully');
    }

    // Function for updating an existing group
    public function update(Request $request, ApplicationGroup $group)
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
            default:
                return $this->handleUpdateDetails($request, $group);
        }
    }

    private function handleAddMembers(Request $request, ApplicationGroup $group)
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

    private function handleRemoveMembers(Request $request, ApplicationGroup $group)
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

    private function handleUpdateDetails(Request $request, ApplicationGroup $group)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $group->update($validated);

        return redirect()->back()->with('success', 'Group updated successfully');
    }

    public function destroy(ApplicationGroup $group)
    {
        $group->delete();
        return redirect()->back()->with('success', 'Group deleted successfully');
    }
}
