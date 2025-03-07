<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tests = Test::all();
        return Inertia::render('Admin/AdminDashboard', ['tests' => $tests]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response()->json(User::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validate and automatically retrieve only the validated fields
            $data = $request->validate([
                'name' => 'required',
                'status' => 'required',
            ]);

            // Create a new Test instance using mass assignment
            $test = Test::create($data);

            return response()->json($test, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the test',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show() {}

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
