import { AdvancedLoadingProgress } from "./AdvancedLoadingProgress";

// Helper to track loading chunks for Vite
export class ViteLoadingTracker {
    constructor() {
        this.loadingProgress = null;
        this.totalChunks = 0;
        this.loadedChunks = 0;
        this.isFirstLoad = true;
        this.initialLoadComplete = false;
    }

    init() {
        // Only show loading indicator on first page load, not during HMR
        if (!this.isFirstLoad) return;

        // Create loading indicator
        this.loadingProgress = new AdvancedLoadingProgress({
            width: "450px",
            showActions: false,
            loadingMessage: "Client building in progress, please wait...",
        });

        // Start with a default estimate of chunks (will be adjusted)
        this.totalChunks = 10;
        this.loadingProgress.start(this.totalChunks);

        // Add event listeners for Vite's loading process
        this.addViteLoadingListeners();
    }

    addViteLoadingListeners() {
        // Track script loading events
        const originalCreateElement = document.createElement.bind(document);
        document.createElement = (tagName, options) => {
            const element = originalCreateElement(tagName, options);

            if (tagName.toLowerCase() === "script") {
                // Increment total chunks when a new script is created
                this.totalChunks++;
                this.loadingProgress.updateProgress(this.loadedChunks);

                // Listen for load events
                element.addEventListener("load", () => {
                    this.loadedChunks++;
                    this.loadingProgress.updateProgress(this.loadedChunks);
                });
            }

            return element;
        };

        // Listen for DOMContentLoaded to mark initial load as complete
        window.addEventListener("DOMContentLoaded", () => {
            this.initialLoadComplete = true;
            this.isFirstLoad = false;

            // Force completion after a delay to ensure all resources have loaded
            setTimeout(() => {
                if (this.loadingProgress) {
                    this.loadingProgress.complete();
                }
            }, 500);
        });

        // For browsers that don't support import.meta.hot
        if (typeof window !== "undefined") {
            window.addEventListener("load", () => {
                if (this.loadingProgress && !this.initialLoadComplete) {
                    this.loadingProgress.complete();
                    this.initialLoadComplete = true;
                    this.isFirstLoad = false;
                }
            });
        }
    }
}

// Create and export a singleton instance
export const viteLoadingTracker = new ViteLoadingTracker();
