<?php

namespace App\Http\Controllers\HR;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Position;
use App\Models\SalaryGrade;
use App\Models\MinimumRequirement;
use Inertia\Inertia;

class JobPositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // get position with salary grade and minimum requirements sort by latest
        $positions = Position::with(['salaryGrade', 'minimumRequirement'])->orderBy('created_at', 'asc')->get();
        return Inertia::render('HR/ManageJobDetails/JobPositionDetails', ['positions' => $positions]);
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
        // Validate request and try catch method
        try {
            $validated = $request->validate([
                'position_name' => 'required|string|max:255',
                'item_number' => 'required|string|max:255|unique:positions,item_number',
                'years_experience' => 'required|numeric',
                'amount' => 'required|numeric',
                'education_level' => 'required|string',
                'training_hours' => 'required|numeric',
                'eligibility' => 'required|string',
            ]);

            // Create the minimum requirement
            $minimumRequirement = MinimumRequirement::create([
                'education_level' => $validated['education_level'],
                'training_hours' => $validated['training_hours'],
                'eligibility' => $validated['eligibility'],
                'years_experience' => $validated['years_experience'],
                'is_required' => true,
            ]);

            // Create the salary grade
            $salaryGrade = SalaryGrade::create([
                'amount' => $validated['amount']
            ]);

            // Create the position
            $position = Position::create([
                'position_name' => $validated['position_name'],
                'item_number' => $validated['item_number'],
                'salary_grade_id' => $salaryGrade->salary_grade_id,
                'minimum_requirement_id' => $minimumRequirement->minimum_requirement_id
            ]);

            // return as the whole position as json
            return response()->json([
                'success' => true,
                'message' => 'Job Position created successfully',
                'data' => Position::with(['salaryGrade', 'minimumRequirement'])->orderBy('created_at', 'desc')->get(),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
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
        // Validate request and try catch method
        try {
            $validated = $request->validate([
                'position_name' => 'required|string|max:255|unique:positions,position_name,' . $id . ',position_id',
                'item_number' => 'required|string|max:255|unique:positions,item_number,' . $id . ',position_id',
                'years_experience' => 'required|numeric',
                'amount' => 'required|numeric',
                'salary_grade_id' => 'required|numeric',
                'position_id' => 'required|numeric',
                'education_level' => 'required|string',
                'training_hours' => 'required|numeric',
                'eligibility' => 'required|string',
                'minimum_requirement_id' => 'nullable|numeric',
            ]);

            // Update the salary grade
            $salaryGrade = SalaryGrade::findOrFail($validated['salary_grade_id']);
            $salaryGrade->amount = $validated['amount'];
            $salaryGrade->save();

            // Update or create the minimum requirement
            if (!empty($validated['minimum_requirement_id'])) {
                $minimumRequirement = MinimumRequirement::findOrFail($validated['minimum_requirement_id']);
                $minimumRequirement->education_level = $validated['education_level'];
                $minimumRequirement->training_hours = $validated['training_hours'];
                $minimumRequirement->eligibility = $validated['eligibility'];
                $minimumRequirement->years_experience = $validated['years_experience'];
                $minimumRequirement->save();
            } else {
                $minimumRequirement = MinimumRequirement::create([
                    'education_level' => $validated['education_level'],
                    'training_hours' => $validated['training_hours'],
                    'eligibility' => $validated['eligibility'],
                    'years_experience' => $validated['years_experience'],
                    'is_required' => true,
                ]);
            }

            // Update the position
            $position = Position::findOrFail($validated['position_id']);
            $position->position_name = $validated['position_name'];
            $position->item_number = $validated['item_number'];
            $position->salary_grade_id = $salaryGrade->salary_grade_id;
            $position->minimum_requirement_id = $minimumRequirement->minimum_requirement_id;
            $position->save();

            // return as the whole position as json
            return response()->json([
                'success' => true,
                'message' => 'Job Position updated successfully',
                'data' => Position::with(['salaryGrade', 'minimumRequirement'])->orderBy('created_at', 'desc')->get(),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // try catch method
        try {
            $position = Position::findOrFail($id);
            $position->delete();
            return response()->json([
                'success' => true,
                'message' => 'Job Position deleted successfully',
                'data' => Position::with(['salaryGrade', 'minimumRequirement'])->orderBy('created_at', 'desc')->get(),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
