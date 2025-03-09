<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\ApplicationStatusHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all applications with related data
        $applications = Application::with([
            'jobListing' => function ($query) {
                $query->with(['position', 'category']);
            },
            'user',
            'documents',
            'statusHistory'
        ])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('HR/Applications', [
            'applications' => $applications,
            'statuses' => [
                'Pending',
                'Qualified',
                'Disqualified',
                'Competency Exam',
                'Rejected',
                'Interview',
                'Accepted'
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Get the specific application with related data
        $application = Application::with([
            'jobListing' => function ($query) {
                $query->with(['position', 'category', 'creator']);
            },
            'user',
            'documents',
            'statusHistory' => function ($query) {
                $query->with('updater');
                $query->orderBy('created_at', 'desc');
            }
        ])
            ->findOrFail($id);

        return Inertia::render('HR/ApplicationDetails', [
            'application' => $application,
            'statuses' => [
                'Pending',
                'Qualified',
                'Disqualified',
                'Competency Exam',
                'Rejected',
                'Interview',
                'Accepted'
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'status' => 'required|string',
            'remarks' => 'nullable|string',
        ]);

        $application = Application::findOrFail($id);
        $previousStatus = $application->status;

        // Update the application status
        $application->status = $request->status;
        $application->save();

        // Create status history record
        ApplicationStatusHistory::create([
            'application_id' => $application->application_id,
            'previous_status' => $previousStatus,
            'new_status' => $request->status,
            'remarks' => $request->remarks,
            'updated_by' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Application status updated successfully');
    }
}
