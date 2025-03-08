<?php

namespace App\Http\Controllers\Applicant;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\JobListing;
use Inertia\Inertia;
use App\Models\Position;
use App\Models\Category;
use App\Models\SalaryGrade;
use Illuminate\Support\Facades\Storage;
use App\Models\Application;

class JobApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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


        return Inertia::render('Applicant/JobApplication', [
            'jobListings' => $jobListings
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'job_listing_id' => 'required|exists:job_listings,job_listing_id',
            'years_experience' => 'required|numeric|min:0',
            'relevant_training' => 'required|string',
            'resume' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        // Store the resume file
        $resumePath = $request->file('resume')->store('resumes', 'public');

        // Create the application
        $application = Application::create([
            'job_listing_id' => $request->job_listing_id,
            'user_id' => auth()->id(),
            'years_experience' => $request->years_experience,
            'relevant_training' => $request->relevant_training,
            'resume_path' => $resumePath,
            'status' => 'Pending',
            'applied_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Application submitted successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $job = JobListing::with([
            'position' => function ($query) {
                $query->with('salaryGrade');
            },
            'category',
            'creator',
            'minimumRequirements',
            'applications'
        ])->findOrFail($id);

        return Inertia::render('Applicant/JobDetails', [
            'job' => $job
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
