<?php

namespace App\Http\Controllers;

use App\Models\Position;
use App\Models\SalaryGrade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PositionController extends Controller
{
    public function index()
    {
        $positions = Position::with('salaryGrade')
            ->orderBy('position_name')
            ->get();
        return response()->json($positions);
    }

    public function store(Request $request)
    {
        // First create the salary grade
        $salaryValidator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:0',
            'years_experience' => 'required|integer|min:0',
        ]);

        if ($salaryValidator->fails()) {
            return response()->json([
                'message' => 'Salary grade validation failed',
                'errors' => $salaryValidator->errors()
            ], 422);
        }

        $salaryGrade = SalaryGrade::create([
            'amount' => $request->amount,
            'years_experience' => $request->years_experience
        ]);

        // Then create the position with the new salary grade
        $positionValidator = Validator::make($request->all(), [
            'position_name' => 'required|string|max:255',
            'item_number' => 'required|string|max:255',
            'minimum_requirements' => 'required|string'
        ]);

        if ($positionValidator->fails()) {
            // If position validation fails, delete the created salary grade
            $salaryGrade->delete();

            return response()->json([
                'message' => 'Position validation failed',
                'errors' => $positionValidator->errors()
            ], 422);
        }

        $position = Position::create([
            'position_name' => $request->position_name,
            'item_number' => $request->item_number,
            'minimum_requirements' => $request->minimum_requirements,
            'salary_grade_id' => $salaryGrade->salary_grade_id
        ]);

        return response()->json([
            'message' => 'Position with salary grade created successfully',
            'data' => $position->load('salaryGrade')
        ], 201);
    }

    public function show(Position $position)
    {
        return response()->json([
            'data' => $position->load('salaryGrade')
        ]);
    }

    public function update(Request $request, Position $position)
    {
        $validator = Validator::make($request->all(), [
            'position_name' => 'string|max:255',
            'item_number' => 'string|max:255',
            'minimum_requirements' => 'string',
            'amount' => 'numeric|min:0',
            'years_experience' => 'integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Update salary grade if amount or years_experience is provided
        if ($request->has('amount') || $request->has('years_experience')) {
            $position->salaryGrade->update([
                'amount' => $request->amount ?? $position->salaryGrade->amount,
                'years_experience' => $request->years_experience ?? $position->salaryGrade->years_experience
            ]);
        }

        // Update position
        $position->update([
            'position_name' => $request->position_name ?? $position->position_name,
            'item_number' => $request->item_number ?? $position->item_number,
            'minimum_requirements' => $request->minimum_requirements ?? $position->minimum_requirements
        ]);

        return response()->json([
            'message' => 'Position and salary grade updated successfully',
            'data' => $position->fresh('salaryGrade')
        ]);
    }

    public function destroy(Position $position)
    {
        // Get the salary grade ID before deleting the position
        $salaryGradeId = $position->salary_grade_id;

        // Delete the position
        $position->delete();

        // Delete the associated salary grade
        SalaryGrade::where('salary_grade_id', $salaryGradeId)->delete();

        return response()->json([
            'message' => 'Position and salary grade deleted successfully'
        ]);
    }
}
