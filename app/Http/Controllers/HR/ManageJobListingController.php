<?php

namespace App\Http\Controllers\HR;

use App\Models\JobListing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Position;
use App\Models\Category;
use App\Models\SalaryGrade;

class ManageJobListingController extends Controller
{
    public function index()
    {
        $jobListings = JobListing::with([
            'position' => function ($query) {
                $query->with('salaryGrade');
            },
            'category',
            'creator',
            'minimumRequirements',
            'applications'
        ])->get();

        $positions = Position::all();
        $categories = Category::all();
        $salaryGrades = SalaryGrade::all();

        return Inertia::render('HR/ManageJobListing/JobListing', [
            'jobListings' => $jobListings,
            'positions' => $positions,
            'categories' => $categories,
            'salaryGrades' => $salaryGrades,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'position_id' => 'required|exists:positions,position_id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'closing_date' => 'required|date|after_or_equal:today',
            'status' => 'required|string|in:Active,Draft,Closed',
            'applicant_limit' => 'required|integer|min:1',
            'category_id' => 'nullable|exists:categories,category_id',
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
            'applicant_limit' => $request->applicant_limit,
            'created_by' => Auth::id(),
            'category_id' => $request->category_id,
        ]);

        $jobListings = JobListing::with([
            'position' => function ($query) {
                $query->with('salaryGrade');
            },
            'category',
            'creator',
            'minimumRequirements',
            'applications'
        ])->get();

        return response()->json($jobListings, 201);
    }

    public function show(JobListing $jobListing)
    {
        return response()->json($jobListing);
    }

    public function update(Request $request, JobListing $jobListing)
    {
        $validator = Validator::make($request->all(), [
            'position_id' => 'required|exists:positions,position_id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'closing_date' => 'required|date|after_or_equal:today',
            'status' => 'required|string|in:Active,Draft,Closed',
            'applicant_limit' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $jobListing->update([
            'position_id' => $request->position_id,
            'title' => $request->title,
            'description' => $request->description,
            'closing_date' => $request->closing_date,
            'status' => $request->status,
            'applicant_limit' => $request->applicant_limit,
        ]);

        return response()->json($jobListing);
    }

    public function destroy(JobListing $jobListing)
    {
        $jobListing->delete();
        return response()->json(null, 204);
    }
}
