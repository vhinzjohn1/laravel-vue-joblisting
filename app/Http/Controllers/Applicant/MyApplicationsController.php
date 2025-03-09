<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyApplicationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all applications for the current user with related data
        $applications = Application::with([
            'jobListing' => function ($query) {
                $query->with(['position', 'category']);
            },
            'documents',
            'statusHistory'
        ])
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Applicant/MyApplications/MyApplications', [
            'applications' => $applications
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
                $query->with(['position', 'category', 'creator']);
            },
            'documents',
            'statusHistory' => function ($query) {
                $query->with('updater');
                $query->orderBy('created_at', 'desc');
            }
        ])
            ->where('user_id', auth()->id())
            ->findOrFail($id);

        return Inertia::render('Applicant/MyApplications/MyApplicationDetails', [
            'application' => $application
        ]);
    }
}
