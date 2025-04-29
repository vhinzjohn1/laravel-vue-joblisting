<?php

namespace App\Http\Controllers\HR;

use App\Models\JobListing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Position;

class ManageJobListingController extends Controller
{
    public function index()
    {
        $jobListings = JobListing::with([
            'position' => function ($query) {
                $query->with(['salaryGrade', 'minimumRequirement']);
            },
            'creator',
            'applications'
        ])->get();

        $positions = Position::with(['salaryGrade', 'minimumRequirement'])->get();

        return Inertia::render('HR/ManageJobListing/ManageJobListing', [
            'jobListings' => $jobListings,
            'positions' => $positions,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'position_id' => 'required|exists:positions,position_id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'closing_date' => 'required|date|after_or_equal:today',
            'status' => 'required|string|in:Active,Draft,Closed'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $jobListing = JobListing::create([
            'position_id' => $request->position_id,
            'title' => $request->title,
            'description' => $request->description,
            'closing_date' => $request->closing_date,
            'status' => $request->status,
            'created_by' => Auth::id(),
        ]);

        $jobListings = JobListing::with([
            'position' => function ($query) {
                $query->with(['salaryGrade', 'minimumRequirement']);
            },
            'creator',
            'applications'
        ])->get();

        return response()->json($jobListings, 201);
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
            'status' => 'required|string|in:Active,Draft,Closed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $jobListing = JobListing::findOrFail($id);

        $jobListing->update([
            'position_id' => $request->position_id,
            'title' => $request->title,
            'description' => $request->description,
            'closing_date' => $request->closing_date,
            'status' => $request->status,
        ]);

        $jobListings = JobListing::with([
            'position' => function ($query) {
                $query->with(['salaryGrade', 'minimumRequirement']);
            },
            'creator',
            'applications'
        ])->get();

        return response()->json($jobListings, 201);
    }

    public function destroy(JobListing $jobListing)
    {
        $jobListing->delete();
        return response()->json(null, 204);
    }
}
