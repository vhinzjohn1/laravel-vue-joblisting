<?php

namespace App\Http\Controllers;

use App\Models\Test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Render the new Inertia page
        return Inertia::render('Admin/TestUpload/Test');
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request ensuring a file is provided and is not too large (max 20MB)
        $request->validate([
            'file' => 'required|file|max:20480', // 20MB limit
        ]);

        try {
            // Get the file from the request
            $file = $request->file('file');

            // Create a unique filename in the public storage
            $filename = time() . '_' . $file->getClientOriginalName();

            // Store the file in the public disk (storage/app/public/JobListingUpload)
            $path = $file->storeAs('JobListingUpload', $filename, 'public');

            // Get the public file URL
            $url = Storage::disk('public')->url($path);

            return response()->json([
                'message' => 'File uploaded successfully to public storage.',
                'file_url' => $url,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to upload file: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Test $test)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Test $test)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Test $test)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Test $test)
    {
        try {
            $test->delete();
            return response()->json('Test deleted successfully');
        } catch (\Exception $e) {
            return response()->json('Failed to delete test', 500);
        }
    }
}
