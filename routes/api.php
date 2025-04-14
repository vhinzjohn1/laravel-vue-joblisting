<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CaptchaController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// CAPTCHA routes
Route::controller(CaptchaController::class)->group(function () {
    Route::post('/captcha/generate', 'generate');
    Route::post('/captcha/verify', 'verify');
});
