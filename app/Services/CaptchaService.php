<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class CaptchaService
{
    private const CACHE_PREFIX = 'captcha_';
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
        $cacheKey = self::CACHE_PREFIX . $token;
        
        // Get stored hash
        $hash = Cache::get($cacheKey);
        if (!$hash) {
            return false;
        }
        
        // Clean up used token immediately for security
        Cache::forget($cacheKey);
        
        // Compare hashed attempt with stored hash
        return hash_equals($hash, $this->hashCode($attempt));
    }
    
    /**
     * Generate CAPTCHA image
     *
     * @param string $code
     * @return string Base64 encoded image data
     */
    private function generateImage(string $code): string
    {
        // Create image
        $image = imagecreatetruecolor(self::WIDTH, self::HEIGHT);
        
        // Set background
        $bg = imagecolorallocate($image, 255, 255, 255);
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
            
            imagettftext(
                $image,
                self::FONT_SIZE,
                $angle,
                $x,
                $y,
                $color,
                '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
                $code[$i]
            );
        }
        
        // Convert to base64
        ob_start();
        imagepng($image);
        $imageData = ob_get_clean();
        imagedestroy($image);
        
        return 'data:image/png;base64,' . base64_encode($imageData);
    }
    
    /**
     * Hash a CAPTCHA code
     *
     * @param string $code
     * @return string
     */
    private function hashCode(string $code): string
    {
        return hash_hmac('sha256', Str::upper($code), config('app.key'));
    }
}
