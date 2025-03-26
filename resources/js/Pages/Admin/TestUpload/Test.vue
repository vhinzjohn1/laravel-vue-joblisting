<template>
    <Head title="Test Upload" />
    <AdminLayout>
        <template #header>
            <Header title="Test Google Drive Upload" />
        </template>

        <!-- Add Storage Info Section -->
        <div class="max-w-2xl mx-auto mb-6">
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-lg font-semibold mb-4">Google Drive Storage</h2>

                <!-- Storage Progress Bar -->
                <div class="mb-6">
                    <div class="flex justify-between mb-1">
                        <span class="text-sm font-medium text-gray-700"
                            >Storage Used</span
                        >
                        <span class="text-sm font-medium text-gray-700">
                            {{ storageQuota.percentage }}%
                        </span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            class="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                            :style="{ width: `${storageQuota.percentage}%` }"
                            :class="{
                                'bg-yellow-500': storageQuota.percentage > 70,
                                'bg-red-500': storageQuota.percentage > 90,
                            }"
                        ></div>
                    </div>
                </div>

                <!-- Storage Details Grid -->
                <div class="grid grid-cols-2 gap-4">
                    <!-- Total Storage -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="text-sm text-gray-500">Total Storage</div>
                        <div class="text-lg font-semibold text-gray-900">
                            {{ storageQuota.total.formatted }}
                        </div>
                    </div>

                     <!-- Available Storage -->
                     <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="text-sm text-gray-500">
                            Available Storage
                        </div>
                        <div class="text-lg font-semibold text-gray-900">
                            {{ storageQuota.available.formatted }}
                        </div>
                    </div>

                    <!-- Used Storage -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="text-sm text-gray-500">Used Storage</div>
                        <div class="text-lg font-semibold text-gray-900">
                            {{ storageQuota.used.formatted }}
                        </div>
                    </div>



                    <!-- Drive Usage -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="text-sm text-gray-500">Drive Usage</div>
                        <div class="text-lg font-semibold text-gray-900">
                            {{ storageQuota.usageInDrive.formatted }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-2xl mx-auto p-6">
            <div class="bg-white rounded-lg shadow-md p-6">
                <!-- Upload Section -->
                <div class="space-y-4">
                    <div
                        class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
                    >
                        <input
                            type="file"
                            @change="handleFileUpload"
                            ref="fileInput"
                            class="hidden"
                            id="fileInput"
                        />
                        <label
                            for="fileInput"
                            class="cursor-pointer flex flex-col items-center justify-center"
                        >
                            <svg
                                class="w-12 h-12 text-gray-400 mb-3"
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
                            <span class="text-gray-600"
                                >Click to select a file or drag and drop</span
                            >
                            <span class="text-sm text-gray-500 mt-1"
                                >Maximum file size: 20MB</span
                            >
                        </label>
                    </div>

                    <!-- Selected File Info -->
                    <div
                        v-if="file"
                        class="flex items-center justify-between bg-gray-50 p-3 rounded"
                    >
                        <div class="flex items-center">
                            <svg
                                class="w-6 h-6 text-gray-400 mr-2"
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
                            <span class="text-sm text-gray-600">{{
                                file.name
                            }}</span>
                        </div>
                        <button
                            @click="clearFile"
                            class="text-red-500 hover:text-red-700"
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

                    <!-- Upload Button -->
                    <button
                        @click="submitFile"
                        :disabled="!file || isUploading"
                        class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
                    >
                        <span v-if="!isUploading">Upload File</span>
                        <span v-else class="flex items-center justify-center">
                            <svg
                                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                />
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Uploading...
                        </span>
                    </button>
                </div>

                <!-- Progress Bar -->
                <div v-if="isUploading" class="mt-4">
                    <div class="flex justify-between mb-1">
                        <span class="text-sm font-medium text-blue-700"
                            >Uploading...</span
                        >
                        <span class="text-sm font-medium text-blue-700"
                            >{{ uploadProgress }}%</span
                        >
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            class="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                            :style="{ width: `${uploadProgress}%` }"
                        ></div>
                    </div>
                </div>

                <!-- Response Messages -->
                <div v-if="responseData.message || error" class="mt-6">
                    <!-- Success Message -->
                    <div
                        v-if="responseData.message"
                        class="bg-green-50 border-l-4 border-green-400 p-4"
                    >
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <svg
                                    class="h-5 w-5 text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <div class="ml-3">
                                <p class="text-sm text-green-700">
                                    {{ responseData.message }}
                                </p>
                                <p
                                    v-if="responseData.file_url"
                                    class="text-sm text-green-600 mt-2"
                                >
                                    File URL:
                                    <a
                                        :href="responseData.file_url"
                                        target="_blank"
                                        class="underline"
                                        >View File</a
                                    >
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div
                        v-if="error"
                        class="bg-red-50 border-l-4 border-red-400 p-4"
                    >
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <svg
                                    class="h-5 w-5 text-red-400"
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
                            </div>
                            <div class="ml-3">
                                <p class="text-sm text-red-700">{{ error }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref } from "vue";
import AdminLayout from "@/Layouts/Admin/AdminLayout.vue";
import { Head } from "@inertiajs/vue3";
import Header from "@/Components/Header/Header.vue";

const props = defineProps({
    storageQuota: {
        type: Object,
        required: true,
        default: () => ({
            limit: "Unknown",
            usage: "Unknown",
            usageInDrive: "Unknown",
            percentage: 0,
        }),
    },
});

const file = ref(null);
const responseData = ref({});
const isUploading = ref(false);
const error = ref(null);
const uploadProgress = ref(0);

const handleFileUpload = (event) => {
    file.value = event.target.files[0];
    error.value = null;
    responseData.value = {};
};

const clearFile = () => {
    file.value = null;
    error.value = null;
    responseData.value = {};
};

const submitFile = async () => {
    if (!file.value) {
        error.value = "Please select a file first.";
        return;
    }

    const formData = new FormData();
    formData.append("file", file.value);
    isUploading.value = true;
    error.value = null;
    responseData.value = {};
    uploadProgress.value = 0;

    try {
        // Initial progress - Starting upload
        uploadProgress.value = 10;

        const response = await axios.post("/test", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                // File is fully uploaded to server
                if (progressEvent.loaded === progressEvent.total) {
                    uploadProgress.value = 20;

                    // Simulate Google Drive upload steps
                    setTimeout(() => {
                        uploadProgress.value = 50;
                        setTimeout(() => {
                            uploadProgress.value = 75;
                            setTimeout(() => {
                                uploadProgress.value = 100;
                            }, 500);
                        }, 500);
                    }, 500);
                }
            },
        });

        // Wait for the response and ensure progress is complete
        await new Promise((resolve) => {
            const checkProgress = setInterval(() => {
                if (uploadProgress.value === 100) {
                    clearInterval(checkProgress);
                    resolve();
                }
            }, 100);
        });

        // Set response data after progress is complete
        responseData.value = response.data;
    } catch (err) {
        error.value =
            err.response?.data?.message ||
            "An error occurred while uploading the file.";
    } finally {
        // Keep the progress visible for a moment before resetting
        if (!error.value) {
            setTimeout(() => {
                isUploading.value = false;
                uploadProgress.value = 0;
            }, 1000);
        } else {
            isUploading.value = false;
            uploadProgress.value = 0;
        }
    }
};
</script>

<style scoped>
.file-upload {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 300px;
    margin: auto;
}
</style>
