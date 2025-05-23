<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\JobListing;
use App\Models\JobListingBatch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\Batch;

class ArchiveController extends Controller
{
    public function index()
    {
        // Get archived batches
        $archivedBatches = Batch::with(['jobListings' => function ($query) {
            $query->with([
                'position' => function ($query) {
                    $query->with(['salaryGrade', 'minimumRequirement']);
                },
                'creator',
                'applications'
            ])
            ->where('status', '=', 'Archived');
        }])
        ->where('status', '=', 'Archived')
        ->get();


        // Get archived non-plantilla job listings
        $archivedNonPlantilla = JobListing::with([
            'position' => function ($query) {
                $query->with(['salaryGrade', 'minimumRequirement']);
            },
            'creator',
            'applications'
        ])
        ->where('status', '=', 'Archived')
        ->whereHas('batch', function($query) {
            $query->where('is_plantilla', false);
        })
        ->get();

        return Inertia::render('HR/Archive/ManageArchive', [
            'archivedBatches' => $archivedBatches,
            'archivedNonPlantilla' => $archivedNonPlantilla
        ]);
    }

    public function store(Request $request) {
        if ($request->method === 'archiveJoblisting') {
            return $this->archiveJoblisting($request, $request->id);
        } elseif ($request->method === 'updateStatus') {
            return $this->updateStatus($request, $request->id);
        } elseif ($request->method === 'updateBatchStatus') {
            return $this->updateBatchStatus($request, $request->id);
        }
    }

    public function archiveJoblisting(Request $request, string $id)
    {
        try {
            $jobListing = JobListing::findOrFail($id);

            if ($jobListing->status !== 'Closed') {
                return response()->json([
                    'message' => 'Only closed job listings can be archived.'
                ], 400);
            }

            $jobListing->update([
                'status' => 'Archived'
            ]);

            return response()->json([
                'message' => 'Job listing successfully archived.',
                'jobListing' => $jobListing
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to archive job listing.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateStatus(Request $request, string $id)
    {
        try {
            $jobListing = JobListing::findOrFail($id);

            $jobListing->update([
                'status' => $request->status
            ]);

            // Get fresh data
            $archivedBatches = Batch::with(['jobListings' => function ($query) {
                $query->with([
                    'position' => function ($query) {
                        $query->with(['salaryGrade', 'minimumRequirement']);
                    },
                    'creator',
                    'applications'
                ])
                ->where('status', '=', 'Archived');
            }])
            ->where('status', '=', 'Archived')
            ->get();

            $archivedNonPlantilla = JobListing::with([
                'position' => function ($query) {
                    $query->with(['salaryGrade', 'minimumRequirement']);
                },
                'creator',
                'applications'
            ])
            ->where('status', 'Archived')
            ->whereHas('batch', function($query) {
                $query->where('is_plantilla', false);
            })
            ->get();

            return response()->json([
                'message' => 'Job listing status updated successfully.',
                'archivedBatches' => $archivedBatches,
                'archivedNonPlantilla' => $archivedNonPlantilla
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update job listing status.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateBatchStatus(Request $request, string $id)
    {
        try {
            $batch = Batch::findOrFail($id);

            $batch->update([
                'status' => $request->status
            ]);

            // Get fresh data
            $archivedBatches = Batch::with(['jobListings' => function ($query) {
                $query->with([
                    'position' => function ($query) {
                        $query->with(['salaryGrade', 'minimumRequirement']);
                    },
                    'creator',
                    'applications'
                ])
                ->where('status', '=', 'Archived');
            }])
            ->where('status', '=', 'Archived')
            ->get();

            return response()->json([
                'message' => 'Batch status updated successfully.',
                'archivedBatches' => $archivedBatches
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update batch status.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
