<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Models\User;
use Illuminate\Foundation\Auth\User as AuthUser;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all Users with their roles
        $users = User::with('roles')->get();
        return Inertia::render('Admin/AdminDashboard', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validate and automatically retrieve only the validated fields
            $data = $request->validate([
                'username' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|string',
                'role_id' => 'required|exists:roles,role_id',
            ]);

            // Create a new Test instance using mass assignment
            $createUser = User::create($data);
            $users = User::with('roles')->get();

            return response()->json($users, 201);
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
        try {
            // Validate and automatically retrieve only the validated fields
            $data = $request->validate([
                'username' => 'required|string',
                'email' => 'required|email',
                'password' => 'string|nullable',
                'role_id' => 'required|exists:roles,role_id',
            ]);

            // Find the user by ID
            $user = User::findOrFail($id);

            // Update the user
            $user->update($data);

            $users = User::with('roles')->get();

            return response()->json($users, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            // Find the user by ID
            $user = User::findOrFail($id);

            // Delete the user
            $user->delete();

            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting the user',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
