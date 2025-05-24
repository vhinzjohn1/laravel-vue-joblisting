<?php

namespace App\Http\Controllers;

use App\Models\EducationalBackground;
use App\Models\Training;
use App\Models\WorkExperience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileDetailsController extends Controller
{
    /**
     * Get all profile details for the authenticated user
     */
    public function index($type)
    {
        $data = match ($type) {
            'education' => EducationalBackground::where('user_id', auth()->id())->get(),
            'training' => Training::where('user_id', auth()->id())->get(),
            'experience' => WorkExperience::where('user_id', auth()->id())
                ->orderBy('start_date', 'desc')
                ->get(),
            default => abort(404),
        };

        return response()->json($data);
    }

    /**
     * Store a new profile detail entry
     */
    public function store(Request $request, $type)
    {
        $validated = $this->validateRequest($request, $type);
        $validated['user_id'] = auth()->id();

        // Handle file upload for training certificates
        if ($type === 'training' && $request->hasFile('certificate_url')) {
            $path = $request->file('certificate_url')->store('certificates', 'public');
            $validated['certificate_url'] = $path;
        }

        $model = match ($type) {
            'education' => new EducationalBackground(),
            'training' => new Training(),
            'experience' => new WorkExperience(),
            default => abort(404),
        };

        $entry = $model->create($validated);

        // Return the created entry as a JSON response
        return response()->json($entry);
    }

    /**
     * Delete a profile detail entry
     */
    public function destroy($type, $id)
    {
        $model = match ($type) {
            'education' => EducationalBackground::where('education_id', $id),
            'training' => Training::where('training_id', $id),
            'experience' => WorkExperience::where('experience_id', $id),
            default => abort(404),
        };

        $entry = $model->where('user_id', auth()->id())->firstOrFail();

        // Delete certificate file if it exists
        if ($type === 'training' && $entry->certificate_url) {
            Storage::disk('public')->delete($entry->certificate_url);
        }

        $entry->delete();
        return response()->noContent();
    }

    /**
     * Validate the request based on detail type
     */
    private function validateRequest(Request $request, $type): array
    {
        return match ($type) {
            'education' => $request->validate([
                'level' => 'required|string',
                'school_name' => 'required|string',
                'degree_course' => 'required|string',
                'year_graduated' => 'required|numeric',
                'honors_received' => 'nullable|string'
            ]),
            'training' => $request->validate([
                'title' => 'required|string',
                'institution' => 'required|string',
                'duration_hours' => 'required|integer',
                'certificate_url' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048'
            ]),
            'experience' => $request->validate([
                'position' => 'required|string',
                'company_name' => 'required|string',
                'start_date' => 'required|date',
                'end_date' => 'required_if:is_current_job,false|nullable|date|after:start_date',
                'is_current_job' => 'boolean',
                'responsibilities' => 'nullable|string'
            ]),
            default => abort(404),
        };
    }
}
