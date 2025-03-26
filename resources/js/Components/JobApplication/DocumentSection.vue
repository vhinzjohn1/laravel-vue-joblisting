<template>
    <div class="mb-6 border border-gray-200 rounded-lg p-4">
        <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-gray-800 flex items-center">
                {{ title }}
                <span class="text-red-500 ml-1">*</span>
            </h3>
        </div>
        <p class="text-sm text-gray-600 mb-3">
            {{ description }}
        </p>
        <document-uploader
            :key="`uploader-${documentType}`"
            :document="document"
            :is-loading="isLoading"
            :document-type="documentType"
            @update:document="(file) => $emit('update:document', file)"
            @remove="$emit('remove')"
        />
    </div>
</template>

<script setup>
import DocumentUploader from "@/Components/DocumentUploader.vue";

defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    documentType: {
        type: String,
        required: true,
    },
    document: {
        type: Object,
        default: null,
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
});

defineEmits(["update:document", "remove"]);
</script>
