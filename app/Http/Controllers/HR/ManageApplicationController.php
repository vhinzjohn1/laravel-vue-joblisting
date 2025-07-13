<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\ApplicationStatusHistory;
use App\Models\JobListing;
use App\Traits\NotificationTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManageApplicationController extends Controller
{
    use NotificationTrait;

    /**
     * List of application statuses
     *
     * @var array
     */
    protected $statuses = [
        'Pending',
        'Qualified',
        'Disqualified',
        'Competency Exam',
        'Not Selected',
        'Lack Requirements',
        'Interview',
        'Accepted'
    ];

    /**
     * Display a listing of job listings with applicant counts.
     */
    public function index()
    {
        // Get all job listings with applicant counts and related data
        $jobListings = JobListing::with([
            'position',
            'creator',
            'applications' => function ($query) {
                $query->select('job_listing_id', 'status');
            }
        ])
            ->where('status', '!=', 'Archived')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($jobListing) {
                // Add applicant count and status breakdown
                $applications = $jobListing->applications;
                $jobListing->applicant_count = $applications->count();
                $jobListing->status_breakdown = $applications->groupBy('status')->map->count();

                return $jobListing;
            });

        return Inertia::render('HR/ManageApplication/ManageApplications', [
            'jobListings' => $jobListings,
            'statuses' => $this->statuses
        ]);
    }

    /**
     * Display applications for a specific job listing.
     */
    public function showJobApplications(string $jobListingId)
    {
        // Get the job listing with applications
        $jobListing = JobListing::with([
            'position',
            'creator',
            'applications' => function ($query) {
                $query->with([
                    'user' => function ($query) {
                        $query->with('userDetail');
                    }
                ]);
            }
        ])
            ->findOrFail($jobListingId);

        // Get applications for this job listing
        $applications = $jobListing->applications;

        return Inertia::render('HR/ManageApplication/JobApplications', [
            'jobListing' => $jobListing,
            'applications' => $applications,
            'statuses' => $this->statuses
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
                $query->with(['position', 'creator']);
            },
            'user' => function ($query) {
                $query->with('userDetail');

                // Load user's educational backgrounds
                $query->with('userDetail.educationalBackgrounds');

                // Load user's trainings
                $query->with('userDetail.trainings');

                // Load user's work experiences
                $query->with('userDetail.workExperiences');
            },
            'documents',
            'statusHistory' => function ($query) {
                $query->with('updater');
                $query->orderBy('created_at', 'desc');
            }
        ])
            ->findOrFail($id);

        return Inertia::render('HR/ManageApplication/ApplicationDetails', [
            'application' => $application,
            'statuses' => $this->statuses
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

        // Notify applicant about status change
        $this->notifyApplicantStatusChange($application);

        // Get fresh applications data with relationships
        $application = Application::with([
            'jobListing' => function ($query) {
                $query->with(['position', 'creator']);
            },
            'user' => function ($query) {
                $query->with('userDetail');

                // Load user's educational backgrounds
                $query->with('userDetail.educationalBackgrounds');

                // Load user's trainings
                $query->with('userDetail.trainings');

                // Load user's work experiences
                $query->with('userDetail.workExperiences');
            },
            'documents',
            'statusHistory' => function ($query) {
                $query->with('updater');
                $query->orderBy('created_at', 'desc');
            }
        ])
            ->where('application_id', $id)
            ->first();

        return response()->json([
            'message' => 'Application status updated successfully',
            'applications' => $application,
            'statuses' => $this->statuses
        ], 200);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'job_listing_id' => 'required|exists:job_listings,job_listing_id',
            'user_id' => 'required|exists:users,user_id',
            'status' => 'required|string',
        ]);

        $application = Application::create($validated);

        // Notify HR about new application
        $this->notifyHRNewApplication($application);

        return redirect()->route('applications.index')
            ->with('message', 'Application created successfully');
    }
}
