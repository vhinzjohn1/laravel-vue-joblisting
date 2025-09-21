<?php

namespace App\Http\Controllers;

use App\Models\SelectionLineup;
use App\Models\JobListing;
use App\Models\JobApplication;
use App\Models\UserDetail;
use App\Models\EducationalBackground;
use App\Models\WorkExperience;
use App\Models\Training;
use App\Models\UserEligibility;
use App\Models\Eligibility;
use Illuminate\Http\Request;
use Inertia\Inertia;
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
            ->withCount('applications') // Add this line to count applications
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

        // Get all applications for this job listing
        $applications = JobApplication::where('job_listing_id', $id)->get();

        // Get all user eligibilities for the applicants
        $userEligibilities = UserEligibility::whereIn('user_id', $applications->pluck('user_id'))
            ->with('eligibility')
            ->get()
            ->groupBy('user_id');

        // Get selection lineup data for these applications
        $selectionLineups = SelectionLineup::whereIn('application_id', $applications->pluck('application_id'))
            ->get()
            ->map(function($lineup) use ($applications, $userEligibilities) {
                $application = $applications->firstWhere('application_id', $lineup->application_id);
                $eligibilityNames = $userEligibilities->get($application->user_id)
                    ?->pluck('eligibility.eligibility_name')
                    ->implode(', ');

                return [
                    'selection_id' => $lineup->selection_id,
                    'application_id' => $lineup->application_id,
                    'name' => $lineup->name,
                    'education' => $lineup->education,
                    'training' => $lineup->training,
                    'experience' => $lineup->experience,
                    'eligibility' => $eligibilityNames ?: 'N/A',
                    'status' => $application ? $application->status : 'Pending'
                ];
            });

        return Inertia::render('HR/Reports/SelectionLineup', [
            'jobListing' => $jobListing,
            'applicants' => $selectionLineups
        ]);
    }

    public function store(Request $request) {}

    public function update(Request $request)
    {
        $request->validate([
            'selection_id' => 'required|exists:selection_lineups,selection_id',
            'name' => 'required|string',
            'education' => 'required|string',
            'training' => 'required|string',
            'experience' => 'required|string',
        ]);

        try {
            $selectionLineup = SelectionLineup::findOrFail($request->selection_id);

            // Update the selection lineup with the new data
            $selectionLineup->update([
                'name' => $request->name,
                'education' => $request->education,
                'training' => $request->training,
                'experience' => $request->experience,
            ]);

            return response()->json([
                'message' => 'Selection lineup updated successfully',
                'selection_lineup' => $selectionLineup
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating selection lineup',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $selectionLineup = SelectionLineup::findOrFail($id);
            $selectionLineup->delete();

            return response()->json([
                'message' => 'Selection lineup deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting selection lineup',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
