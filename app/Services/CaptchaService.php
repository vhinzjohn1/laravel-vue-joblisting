<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CaptchaService
{
    private const CACHE_PREFIX = 'captcha_';
    private const VERIFIED_PREFIX = 'captcha_verified_';
    private const EXPIRY_MINUTES = 10;
    private const WIDTH = 180;
    private const HEIGHT = 50;
    private const LENGTH = 6;
    private const FONT_SIZE = 24;

    /**
     * Generate a new CAPTCHA
     *
     * @return array{token: string, image_data: string}
     */
    public function generate(): array
    {
        // Generate random code with mix of numbers and uppercase letters
        $code = Str::upper(Str::random(self::LENGTH));

        // Create unique token
        $token = Str::random(32);

        // Store in cache with expiry
        Cache::put(
            self::CACHE_PREFIX . $token,
            $this->hashCode($code),
            now()->addMinutes(self::EXPIRY_MINUTES)
        );

        // Generate image
        $image = $this->generateImage($code);

        return [
            'token' => $token,
            'image_data' => $image,
        ];
    }

    /**
     * Validate a CAPTCHA attempt
     *
     * @param string $token
     * @param string $attempt
     * @return bool
     */
    public function validate(string $token, string $attempt): bool
    {
        // First check if this token was already verified recently
        $verifiedKey = self::VERIFIED_PREFIX . $token;
        if (Cache::has($verifiedKey)) {
            $verifiedAttempt = Cache::get($verifiedKey);
            // Only accept the exact same attempt that was previously verified
            return $verifiedAttempt === $attempt;
        }

        $cacheKey = self::CACHE_PREFIX . $token;

        // Get stored hash
        $hash = Cache::get($cacheKey);

        // Log validation attempt for debugging
        Log::info('CAPTCHA validation attempt', [
            'token' => $token,
            'attempt' => $attempt,
            'hash_exists' => !is_null($hash),
            'cache_key' => $cacheKey
        ]);

        if (!$hash) {
            Log::warning('CAPTCHA validation failed: No hash found for token', [
                'token' => $token,
                'cache_key' => $cacheKey
            ]);
            return false;
        }

        // Compare hashed attempt with stored hash
        $attemptHash = $this->hashCode($attempt);
        $isValid = hash_equals($hash, $attemptHash);

        // Log validation result
        Log::info('CAPTCHA validation result', [
            'is_valid' => $isValid,
            'token' => $token,
            'attempt' => $attempt
        ]);

        if ($isValid) {
            // Store the successful validation temporarily
            Cache::put($verifiedKey, $attempt, now()->addMinutes(2));
            // Clean up the original token
            Cache::forget($cacheKey);
        }

        return $isValid;
    }

    /**
     * Generate CAPTCHA image
     *
     * @param string $code
     * @return string Base64 encoded image data
     */
    private function generateImage(string $code): string
    {
        try {
            // Create image
            $image = imagecreatetruecolor(self::WIDTH, self::HEIGHT);
            if ($image === false) {
                throw new \RuntimeException('Failed to create image resource');
            }

            // Set background
            $bg = imagecolorallocate($image, 255, 255, 255);
            if ($bg === false) {
                throw new \RuntimeException('Failed to allocate background color');
            }
            imagefill($image, 0, 0, $bg);

            // Add noise (random dots)
            for ($i = 0; $i < 500; $i++) {
                $color = imagecolorallocate(
                    $image,
                    mt_rand(0, 255),
                    mt_rand(0, 255),
                    mt_rand(0, 255)
                );
                imagesetpixel($image, mt_rand(0, self::WIDTH), mt_rand(0, self::HEIGHT), $color);
            }

            // Add random lines
            for ($i = 0; $i < 5; $i++) {
                $color = imagecolorallocate(
                    $image,
                    mt_rand(0, 255),
                    mt_rand(0, 255),
                    mt_rand(0, 255)
                );
                imageline(
                    $image,
                    mt_rand(0, self::WIDTH),
                    mt_rand(0, self::HEIGHT),
                    mt_rand(0, self::WIDTH),
                    mt_rand(0, self::HEIGHT),
                    $color
                );
            }

            // Check if font file exists
            $fontPath = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';
            if (!file_exists($fontPath)) {
                throw new \RuntimeException("Font file not found at: {$fontPath}");
            }

            // Add text
            $length = strlen($code);
            $spacing = self::WIDTH / ($length + 1);

            for ($i = 0; $i < $length; $i++) {
                $color = imagecolorallocate(
                    $image,
                    mt_rand(0, 100),
                    mt_rand(0, 100),
                    mt_rand(0, 100)
                );

                $angle = mt_rand(-15, 15);
                $x = ($i + 1) * $spacing - mt_rand(5, 10);
                $y = self::HEIGHT / 2 + mt_rand(-5, 5);

                $result = imagettftext(
                    $image,
                    self::FONT_SIZE,
                    $angle,
                    $x,
                    $y,
                    $color,
                    $fontPath,
                    $code[$i]
                );

                if ($result === false) {
                    throw new \RuntimeException('Failed to add text to image');
                }
            }

            // Convert to base64
            ob_start();
            $success = imagepng($image);
            if (!$success) {
                throw new \RuntimeException('Failed to generate PNG image');
            }
            $imageData = ob_get_clean();
            imagedestroy($image);

            if (empty($imageData)) {
                throw new \RuntimeException('Generated image data is empty');
            }

            return 'data:image/png;base64,' . base64_encode($imageData);
        } catch (\Exception $e) {
            // Log the specific error for debugging
            \Log::error('CAPTCHA generation failed: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Hash a CAPTCHA code
     *
     * @param string $code
     * @return string
     */
    private function hashCode(string $code): string
    {
        // Normalize the code by converting to uppercase
        $code = Str::upper($code);
        return hash_hmac('sha256', $code, config('app.key'));
    }
}
