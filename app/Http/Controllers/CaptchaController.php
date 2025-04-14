<?php

namespace App\Http\Controllers;

use App\Services\CaptchaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class CaptchaController extends Controller
{
    private CaptchaService $captchaService;
    
    public function __construct(CaptchaService $captchaService)
    {
        $this->captchaService = $captchaService;
    }
    
    /**
     * Generate a new CAPTCHA
     *
     * @return JsonResponse
     */
    public function generate(): JsonResponse
    {
        // Rate limit CAPTCHA generation
        $key = 'captcha_gen:' . request()->ip();
        
        if (RateLimiter::tooManyAttempts($key, 10)) { // 10 attempts per minute
            return response()->json([
                'error' => 'Too many CAPTCHA requests. Please wait a moment.'
            ], 429);
        }
        
        RateLimiter::hit($key);
        
        try {
            $captcha = $this->captchaService->generate();
            return response()->json($captcha);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                'error' => 'Failed to generate CAPTCHA'
            ], 500);
        }
    }
}
