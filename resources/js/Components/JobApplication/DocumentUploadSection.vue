<template>
    <div class="bg-white rounded-xl shadow-sm p-6 mb-8 border border-green-100">
        <h6 class="text-lg font-semibold text-gray-800 flex items-center mb-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-green-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
            Supporting Documents
        </h6>

        <div class="mb-5 bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <h3 class="text-amber-800 font-medium">
                Guidelines for Document Uploads
            </h3>
            <ul class="list-disc text-sm text-amber-700 mt-1 ml-6">
                <li>All documents must be in PDF format.</li>
                <li>For multi-page documents, combine all pages into a single PDF file.</li>
                <li>Each file has a maximum size limit of 10MB.</li>
                <li>If not applicable, please upload a blank PDF file.</li>
            </ul>
        </div>

        <!-- Document Sections: Now use DB-driven description -->
        <document-section
            v-for="doc in requiredDocuments"
            :key="doc.required_document_id"
            :data-required-document="doc.required_document_id"
            :title="doc.document_name.toUpperCase()"
            :description="doc.description"
            :document-type="doc.required_document_id"
            :document="documents[doc.required_document_id]"
            :is-loading="documentUploadLoading[doc.required_document_id]"
            @update:document="file => $emit('update:document', doc.required_document_id, file)"
            @remove="$emit('remove:document', doc.required_document_id)"
            @upload-complete="$emit('upload-complete', doc.required_document_id, $event)"
        />
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted } from "vue";
import DocumentSection from "./DocumentSection.vue";

const props = defineProps({
    documents: {
        type: Object,
        required: true,
    },
    documentUploadLoading: {
        type: Object,
        required: true,
    },
    jobListingId: {
        type: Number,
        required: true,
    },
});

const requiredDocuments = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get(route('required-documents.index'), {
            params: {
                jobListingId: props.jobListingId
            },
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        requiredDocuments.value = response.data;
    } catch (error) {
        console.error('Error fetching required documents:', error);
    }
});

defineEmits(["update:document", "remove:document", "upload-complete"]);
</script>
