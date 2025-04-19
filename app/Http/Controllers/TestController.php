<?php

namespace App\Http\Controllers;

use App\Models\Test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Google_Client;
use Google_Service_Drive;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return json response
        return response()->json([
            'message' => 'Test controller index'
        ]);
    }

    /**
     * Format bytes to human readable format
     */
    private function formatBytes($bytes, $precision = 2)
    {
        if ($bytes === null) {
            return 'Unknown';
        }

        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);

        $bytes /= pow(1024, $pow);

        return round($bytes, $precision) . ' ' . $units[$pow];
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
