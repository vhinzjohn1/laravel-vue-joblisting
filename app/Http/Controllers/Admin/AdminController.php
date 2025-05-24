<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

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
        $users = User::select('user_id', 'username', 'email', 'role_name')->paginate(10);
        return Inertia::render('Admin/AdminDashboard', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validate and automatically retrieve only the validated fields
            $data = $request->validate([
                'username' => 'required|string|unique:users',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:6|max:20',
                'role_name' => 'required|string',
            ]);

            // Create a new User instance using mass assignment
            $createUser = User::create($data);
            $users = User::select('user_id', 'username', 'email', 'role_name')
                ->paginate(10, ['*'], 'page', $request->input('page', 1));

            return response()->json($users, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $query = User::select('user_id', 'username', 'email', 'role_name');

        // Apply search if search term is provided
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('username', 'like', "%{$searchTerm}%")
                  ->orWhere('email', 'like', "%{$searchTerm}%")
                  ->orWhere('role_name', 'like', "%{$searchTerm}%");
            });
        }

        // Get paginated results
        $users = $query->paginate(10, ['*'], 'page', $request->input('page', 1));

        return response()->json($users);
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
        try {
            // Get data without password first
            $data = $request->validate([
                'username' => 'required',
                'email' => 'required|email',
                'role_name' => 'required|string',
                // other fields...
            ]);

            // Only add password to update data if it's provided
            if ($request->filled('password')) {
                $data['password'] = bcrypt($request->password);
            }

            // Find the user by ID
            $user = User::findOrFail($id);

            // Update the user
            $user->update($data);

            $users = User::select('user_id', 'username', 'email', 'role_name')
                ->paginate(10, ['*'], 'page', $request->input('page', 1));

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
    public function destroy(Request $request, string $id)
    {
        try {
            // Find the user by ID
            $user = User::findOrFail($id);

            // Delete the user
            $user->delete();

            $users = User::select('user_id', 'username', 'email', 'role_name')
                ->paginate(10, ['*'], 'page', $request->input('page', 1));

            return response()->json($users, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting the user',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
