<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\File;

class ViteHelper
{
    /**
     * Get the path to a Vite asset.
     *
     * @param string $asset
     * @return string
     */
    public static function asset(string $asset): string
    {
        try {
            return Vite::asset($asset);
        } catch (\Exception $e) {
            // Fallback for production or if Vite is not serving
            return asset('build/' . $asset);
        }
    }

    /**
     * Get the current app.js chunk path from the manifest
     *
     * @return string|null
     */
    public static function getAppJsPath(): ?string
    {
        $manifestPath = public_path('build/manifest.json');

        if (!File::exists($manifestPath)) {
            return null;
        }

        $manifest = json_decode(File::get($manifestPath), true);

        // Look for the app.js entry in the manifest
        foreach ($manifest as $key => $entry) {
            if (str_contains($key, 'resources/js/app.js') || str_contains($key, 'app.js')) {
                if (isset($entry['file'])) {
                    return 'build/' . $entry['file'];
                }
            }
        }

        // Fallback to look for any file containing 'app-' in the name
        foreach ($manifest as $entry) {
            if (isset($entry['file']) && str_contains($entry['file'], 'app-')) {
                return 'build/' . $entry['file'];
            }
        }

        return null;
    }
}
