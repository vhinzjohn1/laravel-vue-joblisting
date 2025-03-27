export class AdvancedLoadingProgress {
    constructor(options = {}) {
        const {
            parentElement = document.body,
            width = "450px",
            onCancel = () => {},
            onPause = () => {},
            onResume = () => {},
            showActions = false,
            loadingMessage = "Client building in progress, please wait...",
        } = options;

        // Create elements
        this.overlay = this._createElement("div", "ant-loading-overlay");
        this.wrapper = this._createElement("div", "ant-progress-wrapper");

        // Progress details section
        this.detailsContainer = this._createElement(
            "div",
            "ant-progress-details",
        );
        this.progressText = this._createElement("div", "ant-progress-text");
        this.statusText = this._createElement("div", "ant-progress-status");
        this.etaText = this._createElement("div", "ant-progress-eta");

        // Progress container
        this.progressContainer = this._createElement(
            "div",
            "ant-progress-container",
        );
        this.progressBar = this._createElement("div", "ant-progress-bar");

        // Loading message instead of action buttons
        this.loadingMessageElement = this._createElement(
            "div",
            "ant-progress-message",
            loadingMessage,
        );

        // Action buttons - only create if showActions is true
        this.actionsContainer = this._createElement(
            "div",
            "ant-progress-actions",
        );

        if (showActions) {
            this.cancelBtn = this._createElement(
                "button",
                "ant-progress-btn ant-progress-cancel",
                "Cancel",
            );
            this.pauseBtn = this._createElement(
                "button",
                "ant-progress-btn ant-progress-pause",
                "Pause",
            );

            // Event listeners
            this.cancelBtn.addEventListener("click", () => this.cancel());
            this.pauseBtn.addEventListener("click", () => this.togglePause());

            // Add buttons to actions container
            this.actionsContainer.append(this.cancelBtn, this.pauseBtn);
        }

        // State management
        this.state = {
            totalItems: 0,
            completedItems: 0,
            startTime: 0,
            isPaused: false,
            isCanceled: false,
        };

        // Callbacks
        this.callbacks = { onCancel, onPause, onResume };

        // Compose elements
        this.detailsContainer.append(this.progressText, this.statusText);
        this.progressContainer.appendChild(this.progressBar);

        this.wrapper.append(
            this.detailsContainer,
            this.etaText,
            this.progressContainer,
            showActions ? this.actionsContainer : this.loadingMessageElement,
        );

        this.overlay.appendChild(this.wrapper);

        // Styling
        this.wrapper.style.width = width;

        // Append to parent
        parentElement.appendChild(this.overlay);
    }

    _createElement(tag, className, textContent = "") {
        const element = document.createElement(tag);
        element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    start(totalItems) {
        // Reset state
        this.state = {
            totalItems,
            completedItems: 0,
            startTime: Date.now(),
            isPaused: false,
            isCanceled: false,
        };

        // Show overlay
        this.overlay.classList.add("visible");
        this.updateProgress(0);

        return this;
    }

    updateProgress(completedItems) {
        if (this.state.isCanceled || this.state.isPaused) return this;

        // Calculate progress
        this.state.completedItems = Math.min(
            completedItems,
            this.state.totalItems,
        );
        const percentage =
            (this.state.completedItems / this.state.totalItems) * 100;

        // Update progress bar
        this.progressBar.style.width = `${percentage}%`;
        this.progressText.textContent = `${Math.round(percentage)}%`;

        // Calculate ETA
        const elapsedTime = Date.now() - this.state.startTime;
        const itemsPerMillisecond = this.state.completedItems / elapsedTime;
        const remainingItems =
            this.state.totalItems - this.state.completedItems;
        const etaMilliseconds = remainingItems / itemsPerMillisecond;

        // Update status and ETA
        this.statusText.textContent = `${this.state.completedItems} / ${this.state.totalItems} items`;
        this.etaText.textContent = this._formatETA(etaMilliseconds);

        // Auto-complete if finished
        if (this.state.completedItems >= this.state.totalItems) {
            this.complete();
        }

        return this;
    }

    _formatETA(milliseconds) {
        if (!isFinite(milliseconds) || milliseconds <= 0)
            return "Calculating...";

        const seconds = Math.round(milliseconds / 1000);
        if (seconds < 60) return `ETA: ${seconds} sec`;

        const minutes = Math.round(seconds / 60);
        return `ETA: ${minutes} min`;
    }

    togglePause() {
        this.state.isPaused = !this.state.isPaused;
        this.pauseBtn.textContent = this.state.isPaused ? "Resume" : "Pause";

        if (this.state.isPaused) {
            this.callbacks.onPause?.(this.state);
        } else {
            this.callbacks.onResume?.(this.state);
        }

        return this;
    }

    cancel() {
        this.state.isCanceled = true;
        this.overlay.classList.remove("visible");
        this.callbacks.onCancel?.(this.state);
        return this;
    }

    complete() {
        this.progressBar.style.width = "100%";
        this.progressText.textContent = "100%";
        this.statusText.textContent = "Completed";
        this.etaText.textContent = "Done!";

        setTimeout(() => {
            this.overlay.classList.remove("visible");
        }, 1000);

        return this;
    }

    destroy() {
        this.overlay.remove();
        return this;
    }
}
