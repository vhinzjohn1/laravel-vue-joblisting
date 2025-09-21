<?php

namespace App\Http\Controllers;

use App\Models\UserEligibility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserEligibilityController extends Controller
{
    /**
     * Display a listing of the user's eligibilities.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        $userEligibilities = UserEligibility::with('eligibility')
                                ->where('user_id', $user->user_id)
                                ->get();
        return response()->json($userEligibilities);
    }

    /**
     * Store a newly created user eligibility in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'eligibility_id' => [
                'required',
                'exists:eligibility,eligibility_id',
                function ($attribute, $value, $fail) use ($user) {
                    if (UserEligibility::where('user_id', $user->user_id)
                                        ->where('eligibility_id', $value)
                                        ->exists()) {
                        $fail('You have already added this eligibility.');
                    }
                },
            ],
        ]);

        $userEligibility = UserEligibility::create([
            'user_id' => $user->user_id,
            'eligibility_id' => $request->eligibility_id,
        ]);

        return response()->json($userEligibility->load('eligibility'), 201);
    }

    /**
     * Remove the specified user eligibility from storage.
     *
     * @param  int  $userEligibilityId
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($userEligibilityId)
    {
        $user = Auth::user();

        $userEligibility = UserEligibility::where('user_id', $user->user_id)
                                        ->where('user_eligibility_id', $userEligibilityId)
                                        ->firstOrFail();

        $userEligibility->delete();

        return response()->json(['message' => 'Eligibility removed successfully.'], 200);
    }
}
