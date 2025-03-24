<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\JobListing;
use App\Models\JobApplication;
use App\Models\UserDetail;
use App\Models\EducationalBackground;
use App\Models\WorkExperience;
use App\Models\Training;
use Illuminate\Support\Facades\DB;

class SelectionLineupController extends Controller
{
    /**
     * Display a listing of the job listings for selection lineup.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $jobListings = JobListing::with(['position', 'position.salaryGrade'])
            ->where('status', 'Active')
            ->get();

        return Inertia::render('HR/Reports/SelectionLineup', [
            'jobListings' => $jobListings
        ]);
    }

    /**
     * Display the specified job listing's selection lineup.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        // Get job listing details
        $jobListing = JobListing::with([
            'position',
            'position.salaryGrade',
            'position.minimumRequirement'
        ])->findOrFail($id);

        // Get all applications for this job listing (no status filter)
        $applications = JobApplication::where('job_listing_id', $id)
            ->get();

        // Manually gather and transform data for applicants
        $applicants = [];

        foreach ($applications as $application) {
            // Get user details
            $user = $application->user;
            if (!$user) continue; // Skip if no user found

            $userDetail = UserDetail::where('user_id', $user->user_id)->first();

            // Get educational background
            $education = EducationalBackground::where('user_id', $user->user_id)
                ->orderByDesc('year_graduated')
                ->first();

            // Calculate work experience correctly using date differences
            $workExperiences = WorkExperience::where('user_id', $user->user_id)->get();
            $totalYears = 0;

            foreach ($workExperiences as $experience) {
                // Calculate years between start and end dates
                $startDate = new \DateTime($experience->start_date);

                if ($experience->is_current_job) {
                    $endDate = new \DateTime(); // Today for current jobs
                } else if ($experience->end_date) {
                    $endDate = new \DateTime($experience->end_date);
                } else {
                    continue; // Skip if no end date and not current job
                }

                $interval = $startDate->diff($endDate);
                $years = $interval->y;
                $totalYears += $years;
            }

            // Get latest work experience for position details
            $latestExperience = $workExperiences->sortByDesc('end_date')->first();
            $experienceDetails = $latestExperience ?
                $latestExperience->position . ' at ' . $latestExperience->company_name : '';

            // Get training details with specific training information
            $trainings = Training::where('user_id', $user->user_id)->get();
            $totalTrainingHours = $trainings->sum('duration_hours');

            // Get latest training for details
            $latestTraining = $trainings->sortByDesc('created_at')->first();
            $trainingDetails = $latestTraining ?
                $latestTraining->title . ' at ' . $latestTraining->institution : '';

            // Get eligibility info - use the eligibility field from user_details table
            $eligibility = $userDetail ? $userDetail->eligibility : null;

            // Create applicant info
            $applicantInfo = [
                'application_id' => $application->application_id,
                'applicant_name' => $userDetail ?
                    trim($userDetail->firstname . ' ' . ($userDetail->middle_initial ? $userDetail->middle_initial . '. ' : '') . $userDetail->lastname) :
                    $user->name ?? 'Unknown',
                'education' => $education ? [
                    'level' => $education->level,
                    'course' => $education->degree_course,
                    'school' => $education->school_name,
                    'year' => $education->year_graduated
                ] : null,
                'training' => [
                    'hours' => $totalTrainingHours . ' hours',
                    'details' => $trainingDetails
                ],
                'experience' => [
                    'years' => $totalYears . ' year(s)',
                    'details' => $experienceDetails
                ],
                'eligibility' => $eligibility ?: 'N/A',
                'application_date' => $application->created_at->format('M d, Y'),
                'status' => $application->status,
            ];

            $applicants[] = $applicantInfo;
        }

        return Inertia::render('HR/Reports/SelectionLineup', [
            'jobListing' => $jobListing,
            'applicants' => $applicants
        ]);
    }

    public function store(Request $request) {}

    public function update(Request $request)
    {
        return Inertia::render('HR/Reports/SelectionLineup');
    }

    public function destroy($id) {}
}
