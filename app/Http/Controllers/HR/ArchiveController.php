<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\JobListing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ArchiveController extends Controller
{
    public function index()
    {
        $jobListings = JobListing::with([
            'position' => function ($query) {
                $query->with(['salaryGrade', 'minimumRequirement']);
            },
            'creator',
            'applications'
        ])
            ->where('status', 'Archived')
            ->get();

        return Inertia::render('HR/Archive/ManageArchive', [
            'jobListings' => $jobListings
        ]);
    }

    public function store(Request $request) {
        // Check if request method is archiveJoblisting or updateStatus
        if ($request->method === 'archiveJoblisting') {
            return $this->archiveJoblisting($request, $request->id);
        } elseif ($request->method === 'updateStatus') {
            return $this->updateStatus($request, $request->id);
        }
    }

    public function archiveJoblisting(Request $request, string $id)
    {
        try {
            // Find the job listing or fail
            $jobListing = JobListing::findOrFail($id);

            // Validate that only closed job listings can be archived
            if ($jobListing->status !== 'Closed') {
                return response()->json([
                    'message' => 'Only closed job listings can be archived.'
                ], 400);
            }

            // Update the job listing status to archived
            $jobListing->update([
                'status' => 'Archived'
            ]);

            // Return a success response
            return response()->json([
                'message' => 'Job listing successfully archived.',
                'jobListing' => $jobListing
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to archive job listing.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateStatus(Request $request, string $id)
    {
        try {
            // Find the job listing or fail
            $jobListing = JobListing::findOrFail($id);

            // Update the job listing status
            $updated = $jobListing->update([
                'status' => $request->status
            ]);

            // Get fresh data with relationships
            $jobListings = JobListing::with([
                'position' => function ($query) {
                    $query->with(['salaryGrade', 'minimumRequirement']);
                },
                'creator',
                'applications'
            ])
            ->where('status', 'Archived')
            ->get();

            return Inertia::render('HR/Archive/ManageArchive', [
                'jobListings' => $jobListings,
                'flash' => [
                    'message' => 'Job listing status updated successfully.'
                ]
            ]);

        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update job listing status: ' . $e->getMessage());
        }
    }
}
