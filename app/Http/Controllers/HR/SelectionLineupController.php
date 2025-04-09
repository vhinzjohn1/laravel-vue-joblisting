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

            // Get ALL educational backgrounds instead of just the first one
            $educations = EducationalBackground::where('user_id', $user->user_id)
                ->orderByDesc('year_graduated')
                ->get()
                ->map(function($education) {
                    return [
                        'level' => $education->level,
                        'course' => $education->degree_course,
                        'school' => $education->school_name,
                        'year' => $education->year_graduated
                    ];
                })
                ->toArray();

            // Calculate work experience correctly using date differences
            $workExperiences = WorkExperience::where('user_id', $user->user_id)->get();
            $totalYears = 0;

            // Create an array of all work experiences with details
            $experienceDetails = [];

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

                // Add this experience to the details array
                $experienceDetails[] = [
                    'years' => $years . ' year(s)',
                    'details' => $experience->position . ' at ' . $experience->company_name,
                    'start_date' => $experience->start_date,
                    'end_date' => $experience->is_current_job ? 'Present' : $experience->end_date
                ];
            }

            // Sort experiences by end date (most recent first)
            usort($experienceDetails, function($a, $b) {
                // If 'Present', it should come first
                if ($a['end_date'] === 'Present') return -1;
                if ($b['end_date'] === 'Present') return 1;
                return strtotime($b['end_date']) - strtotime($a['end_date']);
            });

            // Get ALL trainings with details
            $trainings = Training::where('user_id', $user->user_id)->get();
            $totalTrainingHours = $trainings->sum('duration_hours');

            // Create an array of all trainings with details
            $trainingDetails = $trainings->map(function($training) {
                return [
                    'hours' => $training->duration_hours,
                    'details' => $training->title . ' at ' . $training->institution,
                    'date' => $training->date
                ];
            })->toArray();

            // Sort trainings by date (most recent first)
            usort($trainingDetails, function($a, $b) {
                return strtotime($b['date'] ?? 0) - strtotime($a['date'] ?? 0);
            });

            // Get eligibility info - use the eligibility field from user_details table
            $eligibility = $userDetail ? $userDetail->eligibility : null;

            // If eligibility contains commas, split into array
            if ($eligibility && strpos($eligibility, ',') !== false) {
                $eligibility = array_map('trim', explode(',', $eligibility));
            }

            // Create applicant info
            $applicantInfo = [
                'application_id' => $application->application_id,
                'applicant_name' => $userDetail ?
                    trim($userDetail->firstname . ' ' . ($userDetail->middle_initial ? $userDetail->middle_initial . '. ' : '') . $userDetail->lastname) :
                    $user->name ?? 'Unknown',
                'education' => !empty($educations) ? $educations : null,
                'training' => !empty($trainingDetails) ? $trainingDetails : [
                    'hours' => $totalTrainingHours . ' hours',
                    'details' => 'No training details available'
                ],
                'experience' => !empty($experienceDetails) ? $experienceDetails : [
                    'years' => $totalYears . ' year(s)',
                    'details' => 'No experience details available'
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
