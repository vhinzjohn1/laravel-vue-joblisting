<template>
    <div
        class="border-2 border-dashed border-green-200 rounded-lg p-4 bg-green-50 transition duration-300 hover:bg-green-100"
    >
        <input
            type="file"
            @change="handleFileSelect"
            class="hidden"
            :id="'file-upload-' + uniqueId"
            accept=".pdf"
        />

        <!-- Show loading state -->
        <div
            v-if="isLoading"
            class="flex flex-col items-center justify-center py-2"
        >
            <div
                class="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-2"
            ></div>
            <span class="text-sm text-green-700">Uploading...</span>
        </div>

        <!-- Show this when no file is selected and not loading -->
        <label
            v-else-if="!document"
            :for="'file-upload-' + uniqueId"
            class="cursor-pointer text-center block"
        >
            <svg
                class="mx-auto h-10 w-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
            </svg>
            <span class="mt-2 block text-sm font-medium text-gray-700">
                Upload PDF (max 10MB)
            </span>
            <span class="mt-1 text-xs text-gray-600">
                Click to browse files
            </span>
        </label>

        <!-- Show this when a file is selected and not loading -->
        <div v-else class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <svg
                    class="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
                <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-800">
                        {{ document.name }}
                    </span>
                    <span class="text-xs text-gray-600">
                        {{ formatFileSize(document.size) }}
                    </span>
                </div>
            </div>
            <button
                type="button"
                @click="removeFile"
                class="text-green-500 hover:text-green-700 transition-colors"
            >
                <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    document: {
        type: Object,
        default: null,
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
    documentType: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["update:document", "remove"]);

// Generate a unique ID for this uploader to prevent input conflicts
const uniqueId = ref(
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
);

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Reset the input field to ensure the change event fires even if the same file is selected again
        event.target.value = "";
        emit("update:document", file);
    }
};

const removeFile = () => {
    emit("remove");
};

const formatFileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
</script>
