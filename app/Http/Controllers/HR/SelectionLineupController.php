<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SelectionLineupController extends Controller
{

    public function index()
    {
       return Inertia::render('HR/Reports/SelectionLineup');
    }

    public function store(Request $request)
    {
        
    }

    public function update(Request $request)
    {
       return Inertia::render('HR/Reports/SelectionLineup');
    }

    public function destroy($id)
    {
       
    }

   
}
