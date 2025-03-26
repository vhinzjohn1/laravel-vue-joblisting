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
        try {
            // Get the Google Drive client correctly
            $client = new Google_Client();
            $client->setClientId(config('filesystems.disks.google.clientId'));
            $client->setClientSecret(config('filesystems.disks.google.clientSecret'));
            $client->refreshToken(config('filesystems.disks.google.refreshToken'));

            // Create Google Drive service
            $service = new Google_Service_Drive($client);

            // Get About information which includes storage quota
            $about = $service->about->get(['fields' => 'storageQuota']);
            $quota = $about->getStorageQuota();

            // Calculate available storage
            $total = $quota->getLimit();
            $used = $quota->getUsage();
            $available = $total - $used;

            // Get storage quota details with raw bytes and formatted values
            $storageQuota = [
                'total' => [
                    'bytes' => $total,
                    'formatted' => $this->formatBytes($total)
                ],
                'used' => [
                    'bytes' => $used,
                    'formatted' => $this->formatBytes($used)
                ],
                'available' => [
                    'bytes' => $available,
                    'formatted' => $this->formatBytes($available)
                ],
                'usageInDrive' => [
                    'bytes' => $quota->getUsageInDrive(),
                    'formatted' => $this->formatBytes($quota->getUsageInDrive())
                ],
                'percentage' => round(($used / $total) * 100, 2)
            ];

            return Inertia::render('Admin/TestUpload/Test', [
                'storageQuota' => $storageQuota
            ]);
        } catch (\Exception $e) {
            // If we can't get storage info, return default values
            return Inertia::render('Admin/TestUpload/Test', [
                'storageQuota' => [
                    'total' => ['bytes' => 0, 'formatted' => 'Unknown'],
                    'used' => ['bytes' => 0, 'formatted' => 'Unknown'],
                    'available' => ['bytes' => 0, 'formatted' => 'Unknown'],
                    'usageInDrive' => ['bytes' => 0, 'formatted' => 'Unknown'],
                    'percentage' => 0
                ],
                'error' => 'Could not fetch storage information: ' . $e->getMessage()
            ]);
        }
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

            // Create a unique filename
            $filename = 'JobListingUpload/' . time() . '_' . $file->getClientOriginalName();

            // Stream the file directly to Google Drive using a resource handle
            // This is more memory efficient than loading the entire file into memory
            $stream = fopen($file->getRealPath(), 'r');
            Storage::disk('google')->put($filename, $stream);
            if (is_resource($stream)) {
                fclose($stream);
            }

            // Get the file's URL
            $url = Storage::disk('google')->url($filename);

            return response()->json([
                'message' => 'File uploaded successfully to Google Drive.',
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
