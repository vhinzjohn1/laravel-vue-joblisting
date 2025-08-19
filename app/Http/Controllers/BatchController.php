<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use App\Models\Position;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class BatchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get batches with their job listings
        $batches = Batch::with(['jobListings' => function ($query) {
            $query->with([
                'position' => function ($query) {
                    $query->with(['salaryGrade', 'minimumRequirement']);
                },
                'creator',
                'applications'
            ])
            ->where('status', '!=', 'Archived');
        }])
        ->where('status', '!=', 'Archived')
        ->get();

        // Get all positions for the job creation form
        $positions = Position::with(['salaryGrade', 'minimumRequirement'])->get();

        return response()->json($batches);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('HR/ManageJobListing/CreateBatch');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'batch_name' => 'required|string|max:255',
            'batch_code' => 'required|string|max:255|unique:job_listing_batches,batch_code',
            'post_date' => 'required|date',
            'deadline' => 'required|date|after:post_date',
            'status' => 'required|in:Active,Draft,Closed',
            'is_plantilla' => 'required|boolean'
        ]);

        $batch = Batch::create($validated);

        $batches = Batch::with(['jobListings' => function ($query) {
            $query->with([
                'position' => function ($query) {
                    $query->with(['salaryGrade', 'minimumRequirement']);
                },
                'creator',
                'applications'
            ])
            ->where('status', '!=', 'Archived');
        }])
        ->where('status', '!=', 'Archived')
        ->get();

        return response()->json($batches);
    }

    /**
     * Display the specified resource.
     */
    public function show(Batch $batch)
    {
        $batch->load(['jobListings' => function ($query) {
            $query->with(['position.salary_grade', 'position.minimum_requirement']);
        }]);

        return Inertia::render('HR/ManageJobListing/ShowBatch', [
            'batch' => $batch
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Batch $batch)
    {
        return Inertia::render('HR/ManageJobListing/EditBatch', [
            'batch' => $batch
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Batch $batch)
    {
        $validated = $request->validate([
            'batch_name' => 'required|string|max:255',
            'batch_code' => ['required', 'string', 'max:255', Rule::unique('job_listing_batches')->ignore($batch->batch_id, 'batch_id')],
            'post_date' => 'required|date',
            'deadline' => 'required|date|after:post_date',
            'status' => 'required|in:Active,Draft,Closed,Archived'
        ]);

        $batch->update($validated);

        $batches = Batch::with(['jobListings' => function ($query) {
            $query->with([
                'position' => function ($query) {
                    $query->with(['salaryGrade', 'minimumRequirement']);
                },
                'creator',
                'applications'
            ])
            ->where('status', '!=', 'Archived');
        }])
        ->where('status', '!=', 'Archived')
        ->get();

        return response()->json($batches);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id = null)
    {
        // If batch_ids is provided in the request, handle multiple deletion
        if ($request->has('batch_ids')) {
            $validated = $request->validate([
                'batch_ids' => 'required|array',
                'batch_ids.*' => 'exists:job_listing_batches,batch_id'
            ]);

            Batch::whereIn('batch_id', $validated['batch_ids'])->delete();
        } else {
            // Handle single batch deletion
            $batch = Batch::findOrFail($id);
            $batch->delete();
        }

        // Get updated batches
        $batches = Batch::with(['jobListings' => function ($query) {
            $query->with([
                'position' => function ($query) {
                    $query->with(['salaryGrade', 'minimumRequirement']);
                },
                'creator',
                'applications'
            ])
            ->where('status', '!=', 'Archived');
        }])
        ->where('status', '!=', 'Archived')
        ->get();

        return response()->json($batches);
    }

    /**
     * Archive the specified batch.
     */
    public function archive(Request $request)
    {
        $validated = $request->validate([
            'batch_ids' => 'required|array',
            'batch_ids.*' => 'exists:job_listing_batches,batch_id'
        ]);

        Batch::whereIn('batch_id', $validated['batch_ids'])
            ->update(['status' => 'Archived']);

        // Get updated batches
        $batches = Batch::with(['jobListings' => function ($query) {
            $query->with([
                'position' => function ($query) {
                    $query->with(['salaryGrade', 'minimumRequirement']);
                },
                'creator',
                'applications'
            ])
            ->where('status', '!=', 'Archived');
        }])
        ->where('status', '!=', 'Archived')
        ->get();

        return response()->json([
            'message' => 'Batches archived successfully',
            'batches' => $batches
        ]);
    }

    public function page()
    {
        // Get batches with their job listings
        $batches = Batch::with(['jobListings' => function ($query) {
            $query->with([
                'position' => function ($query) {
                    $query->with(['salaryGrade', 'minimumRequirement']);
                },
                'creator',
                'applications'
            ])
            ->where('status', '!=', 'Archived');
        }])
        ->where('status', '!=', 'Archived')
        ->get();

        return Inertia::render('HR/ManageBatches/ManageBatches', [
            'batches' => $batches,
        ]);
    }
}
