<?php

namespace App\Http\Controllers;

use App\Models\JobListing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class JobListingController extends Controller
{
    public function index()
    {
        $jobListings = JobListing::with(['position', 'creator'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($jobListings);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'position_id' => 'required|exists:positions,position_id',
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'posting_date' => 'required|date',
                'closing_date' => 'required|date|after:posting_date',
                'status' => 'required|string|in:draft,published,closed',
                'applicant_limit' => 'required|integer|min:1'
            ]);

            $jobListing = JobListing::create([
                'position_id' => $validatedData['position_id'],
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'posting_date' => $validatedData['posting_date'],
                'closing_date' => $validatedData['closing_date'],
                'status' => $validatedData['status'],
                'applicant_limit' => $validatedData['applicant_limit'],
                'created_by' => Auth::id()
            ]);

            return response()->json([
                'message' => 'Job listing created successfully',
                'data' => $jobListing->load(['position', 'creator'])
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create job listing',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(JobListing $jobListing)
    {
        return response()->json([
            'data' => $jobListing->load(['position', 'creator'])
        ]);
    }

    public function update(Request $request, JobListing $jobListing)
    {
        $validator = Validator::make($request->all(), [
            'position_id' => 'exists:positions,position_id',
            'title' => 'string|max:255',
            'description' => 'string',
            'posting_date' => 'date',
            'closing_date' => 'date|after:posting_date',
            'status' => 'string|in:draft,published,closed',
            'applicant_limit' => 'integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $jobListing->update($request->all());

        return response()->json([
            'message' => 'Job listing updated successfully',
            'data' => $jobListing->fresh(['position', 'creator'])
        ]);
    }

    public function destroy(JobListing $jobListing)
    {
        $jobListing->delete();

        return response()->json([
            'message' => 'Job listing deleted successfully'
        ]);
    }
}
