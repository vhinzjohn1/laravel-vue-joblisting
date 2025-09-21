<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Eligibility;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EligibilityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $eligibilities = Eligibility::orderByDesc('created_at')->paginate(10);
        return Inertia::render('HR/ManageEligibility/ManageEligibility', ['eligibilities' => $eligibilities]);
    }

    /**
     * Get all eligibilities.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllEligibilities()
    {
        $eligibilities = Eligibility::all();
        return response()->json($eligibilities);
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
        $validatedData = $request->validate([
            'eligibility_name' => 'required|string|max:255|unique:eligibility,eligibility_name',
            'eligibility_description' => 'nullable|string|max:255',
            'eligibility_type' => 'nullable|string|max:255',
        ]);

        Eligibility::create($validatedData);

        $eligibilities = Eligibility::orderByDesc('created_at')->paginate(10);
        return response()->json($eligibilities);
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
    public function update(Request $request, Eligibility $eligibility)
    {
        $validatedData = $request->validate([
            'eligibility_name' => 'required|string|max:255|unique:eligibility,eligibility_name,' . $eligibility->eligibility_id . ',eligibility_id',
            'eligibility_description' => 'nullable|string|max:255',
            'eligibility_type' => 'nullable|string|max:255',
        ]);

        $eligibility->update($validatedData);

        $eligibilities = Eligibility::orderByDesc('created_at')->paginate(10);
        return response()->json($eligibilities);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Eligibility $eligibility)
    {
        $eligibility->delete();

        $eligibilities = Eligibility::orderByDesc('created_at')->paginate(10);
        return response()->json($eligibilities);
    }
}
