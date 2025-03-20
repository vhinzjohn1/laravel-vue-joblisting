<?php

namespace App\Http\Controllers\HR;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;


class JobCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobCategories = Category::all();
        return Inertia::render('HR/ManageJobDetails/JobCategory', ['jobCategories' => $jobCategories]);
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
                'name' => 'required|string|max:255|unique:categories,name',
                'description' => 'nullable|string',
            ]);
            Category::create($validated);

            // return as the whole category as json
            return response()->json([
                'success' => true,
                'message' => 'Job Category created successfully',
                'data' => Category::all(),
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
        $jobCategory = Category::findOrFail($id);
        return Inertia::render('HR/ManageJobDetails/JobCategory', ['jobCategory' => $jobCategory]);
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
            // Validate the request
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:categories,name,' . $id . ',category_id',
                'description' => 'nullable|string',
            ]);

            // Find the category by its primary key (category_id)
            $jobCategory = Category::findOrFail($id);

            // Update the category with validated data
            $jobCategory->update($validated);

            // return as the whole category as json
            return response()->json([
                'success' => true,
                'message' => 'Job Category updated successfully',
                'data' => Category::all(),
            ], 201);
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
        try {
            $jobCategory = Category::findOrFail($id);
            $jobCategory->delete();

            // return as the whole category as json
            return response()->json([
                'success' => true,
                'message' => 'Job Category deleted successfully',
                'data' => Category::all(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
