<?php

namespace App\Http\Controllers\Applicant;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\JobListing;
use Inertia\Inertia;
use App\Models\Application;
use App\Models\ApplicantDocument;
use App\Models\EducationalBackground;
use App\Models\Training;
use App\Models\WorkExperience;
use App\Traits\NotificationTrait;

class JobApplicationController extends Controller
{
    use NotificationTrait;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobListings = JobListing::with([
            'position' => function ($query) {
                $query->with('salaryGrade');
            },
            'creator',
            'minimumRequirements',
            'applications'
        ])
        ->where('status', 'Active')
        ->get();

        return Inertia::render('Applicant/ViewJobs/ViewJobListings', [
            'jobListings' => $jobListings
        ]);
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
            'creator',
            'minimumRequirements',
            'applications'
        ])->findOrFail($id);

        // Get user's existing data
        $userData = [
            'education' => EducationalBackground::where('user_id', auth()->id())->get(),
            'trainings' => Training::where('user_id', auth()->id())->get(),
            'experiences' => WorkExperience::where('user_id', auth()->id())->get(),
        ];

        return Inertia::render('Applicant/ViewJobs/JobDetails', [
            'job' => $job,
            'userData' => $userData,
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
            'application_document' => 'required|file|mimes:pdf,doc,docx|max:2048',
            // Validate education
            'education.*.education_id' => 'nullable|exists:educational_backgrounds,education_id',
            'education.*.level' => 'required_without:education.*.education_id|string',
            'education.*.school_name' => 'required_without:education.*.education_id|string',
            'education.*.degree_course' => 'required_without:education.*.education_id|string',
            'education.*.year_graduated' => 'nullable|numeric',
            // Validate training
            'trainings.*.training_id' => 'nullable|exists:trainings,training_id',
            'trainings.*.title' => 'required_without:trainings.*.training_id|string',
            'trainings.*.institution' => 'required_without:trainings.*.training_id|string',
            'trainings.*.duration_hours' => 'required_without:trainings.*.training_id|integer|min:1',
            // Validate experience
            'experiences.*.experience_id' => 'nullable|exists:work_experiences,experience_id',
            'experiences.*.position' => 'required_without:experiences.*.experience_id|string',
            'experiences.*.company_name' => 'required_without:experiences.*.experience_id|string',
            'experiences.*.start_date' => 'required_without:experiences.*.experience_id|date',
            'experiences.*.end_date' => 'nullable|date|after:experiences.*.start_date',
        ]);

        // Create the application
        $application = Application::create([
            'job_listing_id' => $request->job_listing_id,
            'user_id' => auth()->id(),
            'status' => 'Pending',
        ]);

        // Store educational backgrounds
        foreach ($request->education as $education) {
            if (isset($education['education_id'])) {
                // If education_id exists, just associate it
                EducationalBackground::where('education_id', $education['education_id'])
                    ->update(['user_id' => auth()->id()]);
            } else {
                // Create new educational background
                EducationalBackground::create([
                    'user_id' => auth()->id(),
                    'level' => $education['level'],
                    'school_name' => $education['school_name'],
                    'degree_course' => $education['degree_course'],
                    'year_graduated' => $education['year_graduated'] ?? null,
                ]);
            }
        }

        // Store trainings
        foreach ($request->trainings as $training) {
            if (isset($training['training_id'])) {
                // If training_id exists, just associate it
                Training::where('training_id', $training['training_id'])
                    ->update(['user_id' => auth()->id()]);
            } else {
                // Create new training
                Training::create([
                    'user_id' => auth()->id(),
                    'title' => $training['title'],
                    'institution' => $training['institution'],
                    'duration_hours' => $training['duration_hours'] ?? null,
                ]);
            }
        }

        // Store work experiences
        foreach ($request->experiences as $experience) {
            if (isset($experience['experience_id'])) {
                // If experience_id exists, just associate it
                WorkExperience::where('experience_id', $experience['experience_id'])
                    ->update(['user_id' => auth()->id()]);
            } else {
                // Create new work experience
                WorkExperience::create([
                    'user_id' => auth()->id(),
                    'position' => $experience['position'],
                    'company_name' => $experience['company_name'],
                    'start_date' => $experience['start_date'],
                    'end_date' => $experience['end_date'] ?? null,
                    'is_current_job' => $experience['is_current_job'] ?? false,
                    'responsibilities' => $experience['responsibilities'] ?? null,
                ]);
            }
        }

        // Handle document upload with document name
        $documentName = $request->file('application_document')->getClientOriginalName();
        $file = $request->file('application_document');
        $documentPath = $file->store('application_documents', 'public');

        ApplicantDocument::create([
            'user_id' => auth()->id(),
            'application_id' => $application->application_id,
            'document_name' => $documentName,
            'document_type' => pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION),
            'file_path' => $documentPath,
            'is_verified' => false,
        ]);

        // Notify HR about new application
        $this->notifyHRNewApplication($application);

        return redirect()->route('my-applications.index')
            ->with('message', 'Application submitted successfully');
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
