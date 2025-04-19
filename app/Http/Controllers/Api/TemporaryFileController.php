<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\TemporaryFile;

class TemporaryFileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file',
            'hash' => 'required|string',
        ]);

        // Check for duplicate by hash
        $existing = TemporaryFile::where('hash', $request->hash)->first();
        if ($existing) {
            return response()->json([
                'message' => 'File already uploaded',
                'file' => $existing,
                'duplicate' => true
            ], 200);
        }

        $file = $request->file('file');
        $filename = $file->getClientOriginalName();
        // Store directly in public storage
        $path = $file->store('application_documents', 'public');
        $size = $file->getSize();

        $tempFile = TemporaryFile::create([
            'hash' => $request->hash,
            'filename' => $filename,
            'path' => $path,
            'size' => $size,
        ]);

        return response()->json([
            'message' => 'File uploaded',
            'file' => $tempFile,
            'duplicate' => false
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
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
