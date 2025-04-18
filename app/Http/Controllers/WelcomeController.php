<?php

namespace App\Http\Controllers;

use App\Models\JobListing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class WelcomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobListings = JobListing::with([
            'position'
        ])->latest()->limit(3)->get();

        return $jobListings;
    }

    public function showBlade()
    {
        if (auth()->check()) {
            return redirect()->route(auth()->user()->role_name . '.index');
        }
        $jobListings = $this->index();
        return view('welcome', [
            'canLogin'    => Route::has('login'),
            'canRegister' => Route::has('register'),
            'jobListings' => $jobListings
        ]);
    }

    public function showInertia()
    {
        $jobListings = $this->index();
        return \Inertia\Inertia::render('Welcome', [
            'canLogin'    => Route::has('login'),
            'canRegister' => Route::has('register'),
            'jobListings' => $jobListings
        ]);
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
        //
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
