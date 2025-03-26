<?php

use App\Helpers\ViteHelper;

if (!function_exists('vite_asset')) {
    /**
     * Get the path to a Vite asset.
     *
     * @param string $asset
     * @return string
     */
    function vite_asset(string $asset): string
    {
        return ViteHelper::asset($asset);
    }
}

if (!function_exists('vite_app_js')) {
    /**
     * Get the path to the main app.js file.
     *
     * @return string|null
     */
    function vite_app_js(): ?string
    {
        return ViteHelper::getAppJsPath();
    }
}
