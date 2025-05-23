<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Batch;
class ViewJobListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get batches with their job listings
        $batches = Batch::with(['jobListings' => function ($query) {
            $query->with([
                'position' => function ($query) {
                    $query->with(['salaryGrade', 'minimumRequirement']);
                },
                'creator',
                'applications'
            ])
            ->where('status', '!=', 'Archived');
        }])
        ->where('status', '!=', 'Archived')
        ->get();

        return Inertia::render('ViewJobListing', [
            'batches' => $batches,
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
