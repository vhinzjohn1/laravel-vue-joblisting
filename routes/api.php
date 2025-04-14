<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// CAPTCHA routes
Route::post('/captcha/generate', [App\Http\Controllers\CaptchaController::class, 'generate']);
