<template>
    <div class="p-6 mx-auto mt-10 max-w-lg bg-white rounded shadow">
        <h2 class="mb-4 text-xl font-semibold">Test File Upload (Inertia)</h2>
        <form @submit.prevent="submitFile">
            <input type="file" @change="handleFile" class="mb-4" />
            <button
                type="submit"
                class="px-4 py-2 text-white bg-green-700 rounded"
                :disabled="isUploading"
            >
                <span v-if="isUploading">Uploading...</span>
                <span v-else>Upload</span>
            </button>
        </form>
        <div v-if="result" class="p-2 mt-4 text-green-700 bg-green-50 rounded">
            {{ result.message }}
            <div v-if="result.file_url">
                <a :href="result.file_url" target="_blank" class="underline">View Uploaded File</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const file = ref(null);
const isUploading = ref(false);
const result = ref(null);

function handleFile(e) {
    file.value = e.target.files[0];
}

function submitFile() {
    if (!file.value) return;
    isUploading.value = true;
    const formData = new FormData();
    formData.append("file", file.value);

    axios.post(route("test.store"), formData)
        .then((res) => {
            result.value = res.data;
        })
        .catch((error) => {
            console.error('Error uploading file:', error);
        })
        .finally(() => {
            isUploading.value = false;
        });
}
</script>