<?php

namespace App\Http\Controllers;

use App\Models\RequiredDocument;
use App\Models\JobListing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RequiredDocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if ($request->expectsJson()) {
                if ($request->has('jobListingId')) {
                    $jobListing = JobListing::with('requiredDocuments')
                        ->findOrFail($request->jobListingId);
                    return response()->json($jobListing->requiredDocuments);
                }

                // If no job listing ID provided, return all documents
                $requiredDocuments = RequiredDocument::all();
                return response()->json($requiredDocuments);
            }

            return Inertia::render('HR/RequiredDocuments/RequiredDocuments', [
                'requiredDocuments' => RequiredDocument::all()
            ]);
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
            throw $e;
        }
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
        $validated = $request->validate([
            'document_name' => 'required|string|max:255|unique:required_documents,document_name',
        ]);
        $requiredDocument = RequiredDocument::create($validated);

        $requiredDocuments = RequiredDocument::all();
        return response()->json($requiredDocuments);
    }

    /**
     * Display the specified resource.
     */
    public function show(RequiredDocument $requiredDocument)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RequiredDocument $requiredDocument)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RequiredDocument $requiredDocument)
    {
        $validated = $request->validate([
            'required_document_id' => 'required',
            'document_name' => 'required|string|max:255|unique:required_documents,document_name,' . $requiredDocument->id . ',required_document_id',
        ]);
        $requiredDocument->update([
            'document_name' => $validated['document_name'],
        ]);

        $requiredDocuments = RequiredDocument::all();
        return response()->json($requiredDocuments);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RequiredDocument $requiredDocument)
    {
        $requiredDocument->delete();
        $requiredDocuments = RequiredDocument::all();
        return response()->json($requiredDocuments);
    }
}
