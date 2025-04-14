<?php

namespace App\Http\Controllers;

use App\Services\CaptchaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

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
        try {
            $captcha = $this->captchaService->generate();
            return response()->json($captcha);
        } catch (\RuntimeException $e) {
            Log::error('CAPTCHA generation failed: ' . $e->getMessage(), [
                'ip' => request()->ip(),
                'user_agent' => request()->userAgent()
            ]);

            return response()->json([
                'error' => 'CAPTCHA Generation Failed',
                'message' => $e->getMessage(),
                'debug' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        } catch (\Exception $e) {
            Log::error('Unexpected error in CAPTCHA generation: ' . $e->getMessage(), [
                'ip' => request()->ip(),
                'user_agent' => request()->userAgent()
            ]);

            return response()->json([
                'error' => 'CAPTCHA Generation Failed',
                'message' => 'An unexpected error occurred while generating the CAPTCHA.',
                'debug' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Verify a CAPTCHA attempt
     *
     * @return JsonResponse
     */
    public function verify(): JsonResponse
    {
        $validated = request()->validate([
            'code' => 'required|string|size:6',
            'token' => 'required|string|size:32',
        ]);

        try {
            $isValid = $this->captchaService->validate(
                $validated['token'],
                $validated['code']
            );

            if ($isValid) {
                return response()->json([
                    'success' => true,
                    'message' => 'CAPTCHA verified successfully.'
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Invalid CAPTCHA code. Please try again.'
            ], 422);
        } catch (\Exception $e) {
            Log::error('CAPTCHA verification failed: ' . $e->getMessage(), [
                'ip' => request()->ip(),
                'user_agent' => request()->userAgent()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to verify CAPTCHA. Please try again.',
                'debug' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}
