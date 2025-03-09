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
use App\Models\ApplicantDocument;

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


        return Inertia::render('Applicant/ViewJobs/ViewJobListings', [
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
            'application_document' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        // Create the application first
        $application = Application::create([
            'job_listing_id' => $request->job_listing_id,
            'user_id' => auth()->id(),
            'status' => 'Pending',
            'applied_at' => now(),
        ]);

        // Get the original filename without extension
        $file = $request->file('application_document');
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

        // Store the document file
        $documentPath = $file->store('application_documents', 'public');

        // Create the document record with the original filename as document_type
        ApplicantDocument::create([
            'user_id' => auth()->id(),
            'application_id' => $application->application_id,
            'document_type' => $originalName,
            'file_path' => $documentPath,
            'is_verified' => false,
            'uploaded_at' => now(),
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

        return Inertia::render('Applicant/ViewJobs/JobDetails', [
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
