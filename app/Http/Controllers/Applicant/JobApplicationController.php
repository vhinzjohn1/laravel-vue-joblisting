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
use App\Models\TemporaryFile;
use App\Models\UserDetail;
use App\Models\SelectionLineup;

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
                $query->with(['salaryGrade', 'minimumRequirement']);
            },
            'creator',
            'applications' => function ($query) {
                $query->where('user_id', auth()->id());
            }
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
                $query->with(['salaryGrade', 'minimumRequirement']);
            },
            'creator',
            'applications' => function ($query) {
                $query->where('user_id', auth()->id());
            }
        ])->findOrFail($id);

        // Get user's existing data
        $userData = [
            'education' => EducationalBackground::where('user_id', auth()->id())->get(),
            'trainings' => Training::where('user_id', auth()->id())->get(),
            'experiences' => WorkExperience::where('user_id', auth()->id())->get(),
        ];

        // Check if user meets minimum requirements
        $meetsRequirements = $this->checkRequirementsMet($job, $userData);

        return Inertia::render('Applicant/ViewJobs/JobDetails', [
            'job' => $job,
            'userData' => $userData,
            'meetsRequirements' => $meetsRequirements
        ]);
    }

    /**
     * Check if user meets the minimum requirements for the job
     */
    private function checkRequirementsMet($job, $userData)
    {
        // Only proceed if job has minimum requirements
        if (!$job->position->minimumRequirement) {
            return true;
        }

        $minimumReq = $job->position->minimumRequirement;
        $requirements = [
            'education' => [
                'met' => false,
                'required' => $minimumReq->education_level,
                'user_has' => 'None',
                'details' => 'Education requirement not met'
            ],
            'experience' => [
                'met' => false,
                'required' => $minimumReq->years_experience . ' year(s)',
                'user_has' => '0 years',
                'details' => 'Experience requirement not met'
            ],
            'training' => [
                'met' => false,
                'required' => $minimumReq->training_hours . ' hours',
                'user_has' => '0 hours',
                'details' => 'Training requirement not met'
            ],
            'eligibility' => [
                'met' => false,
                'required' => $minimumReq->eligibility,
                'user_has' => 'None',
                'details' => 'Eligibility verification not available'
            ]
        ];

        // Check education - look for education level that matches or exceeds requirement
        $educationLevels = [
            'high school' => 1,
            'associate\'s degree' => 2,
            'bachelor\'s degree' => 3,
            'master\'s degree' => 4,
            'doctorate degree' => 5
        ];

        $requiredEduLevel = $educationLevels[strtolower($minimumReq->education_level)] ?? 0;
        $highestUserEduLevel = 0;
        $highestUserEduName = 'None';

        foreach ($userData['education'] as $education) {
            $userEduLevel = $educationLevels[strtolower($education->level)] ?? 0;
            if ($userEduLevel > $highestUserEduLevel) {
                $highestUserEduLevel = $userEduLevel;
                $highestUserEduName = $education->level;
            }

            if ($userEduLevel >= $requiredEduLevel) {
                $requirements['education']['met'] = true;
                $requirements['education']['user_has'] = $education->level;
                $requirements['education']['details'] = 'You have ' . $education->level . ' which meets or exceeds the required ' . $minimumReq->education_level;
                break;
            }
        }

        // If education requirement not met, provide detailed explanation
        if (!$requirements['education']['met']) {
            $requirements['education']['user_has'] = $highestUserEduName;
            $requirements['education']['details'] = 'You have ' . $highestUserEduName . ' but the position requires ' . $minimumReq->education_level;
        }

        // Check experience
        $requiredYears = $minimumReq->years_experience;
        $totalYears = 0;

        foreach ($userData['experiences'] as $experience) {
            // Calculate years between start and end dates
            $startDate = new \DateTime($experience->start_date);

            if ($experience->is_current_job) {
                $endDate = new \DateTime();
            } else if ($experience->end_date) {
                $endDate = new \DateTime($experience->end_date);
            } else {
                continue; // Skip if no end date and not current job
            }

            $interval = $startDate->diff($endDate);
            $years = $interval->y;
            $totalYears += $years;
        }

        $requirements['experience']['met'] = $totalYears >= $requiredYears;
        $requirements['experience']['user_has'] = $totalYears . ' year(s)';

        if ($requirements['experience']['met']) {
            $requirements['experience']['details'] = 'You have ' . $totalYears . ' year(s) of experience, which meets the required ' . $requiredYears . ' year(s)';
        } else {
            $requirements['experience']['details'] = 'You have ' . $totalYears . ' year(s) of experience, but the position requires ' . $requiredYears . ' year(s)';
        }

        // Check training hours
        $requiredHours = $minimumReq->training_hours;
        $totalHours = 0;

        foreach ($userData['trainings'] as $training) {
            $totalHours += $training->duration_hours ?? 0;
        }

        $requirements['training']['met'] = $totalHours >= $requiredHours;
        $requirements['training']['user_has'] = $totalHours . ' hours';

        if ($requirements['training']['met']) {
            $requirements['training']['details'] = 'You have ' . $totalHours . ' hours of training, which meets the required ' . $requiredHours . ' hours';
        } else {
            $requirements['training']['details'] = 'You have ' . $totalHours . ' hours of training, but the position requires ' . $requiredHours . ' hours';
        }

        // Calculate overall requirement status
        // Check if user meets minimum requirements (considering only education, experience, and training)
        $criticalRequirements = [
            'education' => $requirements['education']['met'],
            'experience' => $requirements['experience']['met'],
            'training' => $requirements['training']['met']
        ];

        // Check if all critical requirements are met
        $allCriticalMet = !in_array(false, $criticalRequirements);

        // Or at least a majority (2 out of 3) when not all are met
        $majorityMet = array_sum(array_values($criticalRequirements)) >= 2;

        return [
            'overall' => $allCriticalMet || $majorityMet,
            'details' => $requirements,
            'counts' => [
                'total' => count($criticalRequirements),
                'met' => array_sum(array_values($criticalRequirements))
            ]
        ];
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
        // Increase memory limit and execution time for this request
        ini_set('memory_limit', '256M');
        ini_set('max_execution_time', 300);

        try {
            // First validate non-file inputs
            $request->validate([
                'job_listing_id' => 'required|exists:job_listings,job_listing_id',
                'education' => 'required|array|min:1',
                'trainings' => 'array',
                'experiences' => 'array',
            ]);

            // Get the job listing and its required documents
            $jobListing = JobListing::with('requiredDocuments')->findOrFail($request->job_listing_id);
            $requiredDocuments = $jobListing->requiredDocuments;

            // Map document names to their corresponding keys
            $documentNameToKey = [
                'Letter of Intent/Application Letter' => 'application_letter',
                'Personal Data Sheet (PDS)' => 'personal_data_sheet',
                'Work Experience Sheet (WES)' => 'work_experience_sheet',
                'Transcript of Records (TOR) and Diploma' => 'transcript_and_diploma',
                'Authenticated Proof of Eligibility' => 'eligibility_proof',
                'Latest Performance Rating (DPCR/IPCR)' => 'performance_rating',
                'Certificate of Trainings, Special Orders, etc.' => 'training_certificates',
                'Certificate of Employment' => 'employment_certificate'
            ];

            $documentRefs = $request->input('documents', []);
            $documentsToAttach = [];

            // Validate only the required documents
            foreach ($requiredDocuments as $requiredDoc) {
                $docKey = $documentNameToKey[$requiredDoc->document_name] ?? null;

                if (!$docKey) {
                    continue; // Skip if document name doesn't match our mapping
                }

                if (empty($documentRefs[$docKey])) {
                    return response()->json([
                        'message' => 'File Upload Error',
                        'errors' => [
                            'document_name' => $requiredDoc->document_name,
                            'error' => $requiredDoc->document_name . ' is required'
                        ]
                    ], 422);
                }

                // Accept either a numeric ID or a hash string
                $ref = $documentRefs[$docKey];
                $tempFile = null;
                if (is_numeric($ref)) {
                    $tempFile = TemporaryFile::find($ref);
                } else {
                    $tempFile = TemporaryFile::where('hash', $ref)->first();
                }

                if (!$tempFile) {
                    return response()->json([
                        'message' => 'File Reference Error',
                        'errors' => [
                            'document_name' => $requiredDoc->document_name,
                            'error' => $requiredDoc->document_name . ' file reference is invalid or expired'
                        ]
                    ], 422);
                }

                $documentsToAttach[$docKey] = $tempFile;
            }

            // Validate remaining fields (education, trainings, experiences)
            $request->validate([
                'education.*.education_id' => 'nullable|exists:educational_backgrounds,education_id',
                'education.*.level' => 'required_without:education.*.education_id|string',
                'education.*.school_name' => 'required_without:education.*.education_id|string',
                'education.*.degree_course' => 'required_without:education.*.education_id|string',
                'education.*.year_graduated' => 'nullable|numeric',
                'trainings.*.training_id' => 'nullable|exists:trainings,training_id',
                'trainings.*.title' => 'required_without:trainings.*.training_id|string',
                'trainings.*.institution' => 'required_without:trainings.*.training_id|string',
                'trainings.*.duration_hours' => 'required_without:trainings.*.training_id|integer|min:1',
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
            foreach (($request->trainings ?? []) as $training) {
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
                        'duration_hours' => $training['duration_hours'],
                    ]);
                }
            }

            // Store experiences
            foreach (($request->experiences ?? []) as $experience) {
                if (isset($experience['experience_id'])) {
                    WorkExperience::where('experience_id', $experience['experience_id'])
                        ->update(['user_id' => auth()->id()]);
                } else {
                    WorkExperience::create([
                        'user_id' => auth()->id(),
                        'position' => $experience['position'],
                        'company_name' => $experience['company_name'],
                        'start_date' => $experience['start_date'],
                        'end_date' => $experience['end_date'] ?? null,
                    ]);
                }
            }

            // Attach only the required documents to application
            foreach ($documentsToAttach as $docType => $tempFile) {
                // Store file_path as relative to public storage
                $filePathForDb = $tempFile->path;
                ApplicantDocument::create([
                    'user_id' => auth()->id(),
                    'application_id' => $application->application_id,
                    'document_name' => $tempFile->filename,
                    'document_type' => $docType,
                    'file_path' => $filePathForDb,
                    'is_verified' => false,
                ]);
            }

            // Notify HR about new application
            $this->notifyHRNewApplication($application);

            // Get user details for selection lineup
            $userDetail = UserDetail::where('user_id', auth()->id())->first();

            // Get educational background
            $education = EducationalBackground::where('user_id', auth()->id())
                ->orderByDesc('year_graduated')
                ->get()
                ->map(function($edu) {
                    return $edu->degree_course . "\n" . $edu->school_name;
                })
                ->join("\n");

            // Get work experience
            $experiences = WorkExperience::where('user_id', auth()->id())->get();
            $totalYears = 0;
            foreach ($experiences as $exp) {
                $startDate = new \DateTime($exp->start_date);
                $endDate = $exp->is_current_job ? new \DateTime() : new \DateTime($exp->end_date);
                $interval = $startDate->diff($endDate);
                $totalYears += $interval->y;
            }
            $experienceDetails = $totalYears . ' year(s) relevant experience';

            // Get trainings
            $trainings = Training::where('user_id', auth()->id())->get();
            $trainingDetails = $trainings->map(function($training) {
                return $training->duration_hours . ' hours' . "\n" . $training->title . ' at ' . $training->institution;
            })
            ->join("\n");

            // Create selection lineup entry
            SelectionLineup::create([
                'application_id' => $application->application_id,
                'name' => $userDetail ?
                    trim($userDetail->firstname . ' ' . ($userDetail->middle_name ? $userDetail->middle_name . ' ' : '') . $userDetail->lastname) :
                    'Unknown',
                'education' => $education,
                'training' => $trainingDetails,
                'experience' => $experienceDetails,
                'eligibility' => $userDetail ? $userDetail->eligibility : 'N/A'
            ]);

            return response()->json([
                'message' => 'Application submitted successfully',
                'application_id' => $application->application_id,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'There was an error submitting your application. Please try again.',
                'error' => $e->getMessage(),
            ], 500);
        }
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
