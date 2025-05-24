<?php

namespace App\Http\Controllers\HR;

use App\Models\JobListing;
use App\Models\Batch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Position;
use App\Models\RequiredDocument;

class ManageJobListingController extends Controller
{
    public function index()
    {
        // Get batches with their job listings
        $batches = Batch::with(['jobListings' => function ($query) {
            $query->with([
                'position' => function ($query) {
                    $query->with(['salaryGrade', 'minimumRequirement']);
                },
                'creator',
                'applications',
                'requiredDocuments'
            ])
            ->where('status', '!=', 'Archived');
        }])
        ->where('status', '!=', 'Archived')
        ->get();

        // Get all positions for the job creation form
        $positions = Position::with(['salaryGrade', 'minimumRequirement'])->get();


        // Get all required documents
        $requiredDocuments = RequiredDocument::all();

        return Inertia::render('HR/ManageJobListing/ManageJobListing', [
            'batches' => $batches,
            'positions' => $positions,
            'requiredDocuments' => $requiredDocuments,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'position_id' => 'required|exists:positions,position_id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'closing_date' => 'required|date|after_or_equal:today',
            'status' => 'required|string|in:Active,Draft,Closed,Archived',
            'batch_id' => 'required|exists:job_listing_batches,batch_id',
            'required_documents' => 'array',
            'required_documents.*' => 'exists:required_documents,required_document_id',
            'place_assigned' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Get the batch to check its deadline
        $batch = Batch::findOrFail($request->batch_id);

        // Only validate closing date against batch deadline for plantilla batches
        if ($batch->is_plantilla && strtotime($request->closing_date) > strtotime($batch->deadline)) {
            return response()->json([
                'errors' => [
                    'closing_date' => ['Job listing closing date cannot be later than the batch deadline.']
                ]
            ], 422);
        }

        $jobListing = JobListing::create([
            'position_id' => $request->position_id,
            'title' => $request->title,
            'description' => $request->description,
            'closing_date' => $request->closing_date,
            'status' => $request->status,
            'created_by' => Auth::id(),
            'batch_id' => $request->batch_id,
            'place_assigned' => $request->place_assigned,
        ]);

        // Attach required documents if any
        if ($request->has('required_documents')) {
            $jobListing->requiredDocuments()->attach($request->required_documents);
        }

        // Get batches with their job listings and required documents
        $batches = Batch::with(['jobListings' => function ($query) {
            $query->with([
                'position' => function ($query) {
                    $query->with(['salaryGrade', 'minimumRequirement']);
                },
                'creator',
                'applications',
                'requiredDocuments'
            ])
            ->where('status', '!=', 'Archived');
        }])
        ->where('status', '!=', 'Archived')
        ->get();

        // Get all positions for the job creation form
        $positions = Position::with(['salaryGrade', 'minimumRequirement'])->get();

        // Get all required documents
        $requiredDocuments = RequiredDocument::all();

        return response()->json([
            'batches' => $batches,
            'positions' => $positions,
            'requiredDocuments' => $requiredDocuments,
        ], 201);
    }

    public function show(JobListing $jobListing)
    {
        return response()->json($jobListing->load([
            'position' => function ($query) {
                $query->with(['salaryGrade', 'minimumRequirement']);
            },
            'creator',
            'applications'
        ]));
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'position_id' => 'required|exists:positions,position_id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'closing_date' => 'required|date|after_or_equal:today',
            'status' => 'required|string|in:Active,Draft,Closed,Archived',
            'required_documents' => 'array',
            'required_documents.*' => 'exists:required_documents,required_document_id',
            'place_assigned' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $jobListing = JobListing::findOrFail($id);

        // Get the batch to check its deadline
        $batch = Batch::findOrFail($jobListing->batch_id);

        // Only validate closing date against batch deadline for plantilla batches
        if ($batch->is_plantilla && strtotime($request->closing_date) > strtotime($batch->deadline)) {
            return response()->json([
                'errors' => [
                    'closing_date' => ['Job listing closing date cannot be later than the batch deadline.']
                ]
            ], 422);
        }

        // Validate archive status change
        if ($request->status === 'Archived') {
            if ($jobListing->status !== 'Closed') {
                return response()->json([
                    'message' => 'Job listing can only be archived from Closed status.'
                ], 400);
            }
        }

        $jobListing->update([
            'position_id' => $request->position_id,
            'title' => $request->title,
            'description' => $request->description,
            'closing_date' => $request->closing_date,
            'status' => $request->status,
            'place_assigned' => $request->place_assigned,
        ]);

        // Sync required documents
        if ($request->has('required_documents')) {
            $jobListing->requiredDocuments()->sync($request->required_documents);
        }

        // Get batches with their job listings and required documents
        $batches = Batch::with(['jobListings' => function ($query) {
            $query->with([
                'position' => function ($query) {
                    $query->with(['salaryGrade', 'minimumRequirement']);
                },
                'creator',
                'applications',
                'requiredDocuments'
            ])
            ->where('status', '!=', 'Archived');
        }])
        ->where('status', '!=', 'Archived')
        ->get();

        // Get all required documents
        $requiredDocuments = RequiredDocument::all();

        return response()->json([
            'batches' => $batches,
            'requiredDocuments' => $requiredDocuments,
        ], 200);
    }

    public function destroy(Request $request, $id = null)
    {
        // If items array is provided in the request, handle multiple deletion
        if ($request->has('items')) {
            $validated = $request->validate([
                'items' => 'required|array',
                'items.*' => 'exists:job_listings,job_listing_id'
            ]);

            // Check for job listings with applications
            $jobListingsWithApplications = JobListing::whereIn('job_listing_id', $validated['items'])
                ->whereHas('applications')
                ->get();

            if ($jobListingsWithApplications->isNotEmpty()) {
                return response()->json([
                    'message' => 'Cannot delete job listings that have applications.',
                    'jobListings' => $jobListingsWithApplications->pluck('title')
                ], 422);
            }

            JobListing::whereIn('job_listing_id', $validated['items'])->delete();
        } else {
            // Handle single job listing deletion
            $jobListing = JobListing::findOrFail($id);

            // Check if job listing has applications
            if ($jobListing->applications()->exists()) {
                return response()->json([
                    'message' => 'Cannot delete job listing that has applications.',
                    'jobListing' => $jobListing->title
                ], 422);
            }

            $jobListing->delete();
        }

        // Get updated batches with their job listings
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

        // Get all required documents
        $requiredDocuments = RequiredDocument::all();

        return response()->json([
            'batches' => $batches,
            'requiredDocuments' => $requiredDocuments,
        ], 200);
    }

    /**
     * Bulk update job listings status
     */
    public function bulkUpdate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'job_listing_ids' => 'required|array',
            'job_listing_ids.*' => 'exists:job_listings,job_listing_id',
            'status' => 'required|string|in:Active,Draft,Closed,Archived',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Update all specified job listings
        JobListing::whereIn('job_listing_id', $request->job_listing_ids)
            ->update(['status' => $request->status]);

        // Get updated batches with their job listings and required documents
        $batches = Batch::with(['jobListings' => function ($query) {
            $query->with([
                'position' => function ($query) {
                    $query->with(['salaryGrade', 'minimumRequirement']);
                },
                'creator',
                'applications',
                'requiredDocuments'
            ])
            ->where('status', '!=', 'Archived');
        }])
        ->where('status', '!=', 'Archived')
        ->get();

        $requiredDocuments = RequiredDocument::all();

        return response()->json([
            'batches' => $batches,
            'requiredDocuments' => $requiredDocuments,
        ], 200);
    }
}
