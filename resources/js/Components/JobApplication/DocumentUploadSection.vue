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

        <!-- Application Letter -->
        <document-section
            v-if="isDocumentRequired('application letter')"
            title="LETTER OF INTENT/APPLICATION LETTER"
            description="Application Letter should specify the POSITION
                    APPLIED FOR and the PLACE OF ASSIGNMENT. File should
                    be in Portable Document Format (PDF)."
            document-type="application_letter"
            :document="documents.application_letter"
            :is-loading="documentUploadLoading.application_letter"
            @update:document="
                (file) => $emit('update:document', 'application_letter', file)
            "
            @remove="() => $emit('remove:document', 'application_letter')"
            @upload-complete="$emit('upload-complete', 'application_letter', $event)"
        />

        <!-- Personal Data Sheet -->
        <document-section
            v-if="isDocumentRequired('personal data sheet')"
            title="PERSONAL DATA SHEET"
            description="The CS Form No. 212, Revised 2017 (Personal Data
                    Sheet) shall be duly accomplished. Ensure that all 4
                    pages of the PDS is filled-out."
            document-type="personal_data_sheet"
            :document="documents.personal_data_sheet"
            :is-loading="documentUploadLoading.personal_data_sheet"
            @update:document="
                (file) => $emit('update:document', 'personal_data_sheet', file)
            "
            @remove="() => $emit('remove:document', 'personal_data_sheet')"
            @upload-complete="$emit('upload-complete', 'personal_data_sheet', $event)"
        />

        <!-- Work Experience Sheet -->
        <document-section
            v-if="isDocumentRequired('work experience sheet')"
            title="WORK EXPERIENCE SHEET"
            description="The Work Experience Sheet shall be duly
                    accomplished. The Work Experience Sheet shall
                    coincide with the Personal Data Sheet and Service
                    Record."
            document-type="work_experience_sheet"
            :document="documents.work_experience_sheet"
            :is-loading="documentUploadLoading.work_experience_sheet"
            @update:document="
                (file) => $emit('update:document', 'work_experience_sheet', file)
            "
            @remove="() => $emit('remove:document', 'work_experience_sheet')"
            @upload-complete="$emit('upload-complete', 'work_experience_sheet', $event)"
        />

        <!-- Transcript & Diploma -->
        <document-section
            v-if="isDocumentRequired('transcript of records')"
            title="TRANSCRIPT OF RECORDS AND DIPLOMA"
            description="Include copies of your educational credentials.
                    Combine all pages into a single PDF file."
            document-type="transcript_and_diploma"
            :document="documents.transcript_and_diploma"
            :is-loading="documentUploadLoading.transcript_and_diploma"
            @update:document="
                (file) => $emit('update:document', 'transcript_and_diploma', file)
            "
            @remove="() => $emit('remove:document', 'transcript_and_diploma')"
            @upload-complete="$emit('upload-complete', 'transcript_and_diploma', $event)"
        />

        <!-- Eligibility -->
        <document-section
            v-if="isDocumentRequired('authenticated proof of eligibility')"
            title="AUTHENTICATED PROOF OF ELIGIBILITY"
            description="Authenticated Civil Service Commission (CSC)
                    Eligibility or Professional Regulation Commission
                    (PRC) License showing that the LICENSE IS NOT
                    EXPIRED."
            document-type="eligibility_proof"
            :document="documents.eligibility_proof"
            :is-loading="documentUploadLoading.eligibility_proof"
            @update:document="
                (file) => $emit('update:document', 'eligibility_proof', file)
            "
            @remove="() => $emit('remove:document', 'eligibility_proof')"
            @upload-complete="$emit('upload-complete', 'eligibility_proof', $event)"
        />

        <!-- Performance Rating -->
        <document-section
            v-if="isDocumentRequired('latest performance rating')"
            title="LATEST PERFORMANCE RATING (DPCR/IPCR)"
            description="The latest Office/Division/Individual Performance
                    Commitment and Review Form. For external applicants
                    with no Performance Ratings, please upload a
                    document specifying that Performance Rating is Not
                    Applicable."
            document-type="performance_rating"
            :document="documents.performance_rating"
            :is-loading="documentUploadLoading.performance_rating"
            @update:document="
                (file) => $emit('update:document', 'performance_rating', file)
            "
            @remove="() => $emit('remove:document', 'performance_rating')"
            @upload-complete="$emit('upload-complete', 'performance_rating', $event)"
        />

        <!-- Training Certificates -->
        <document-section
            v-if="isDocumentRequired('certificate of trainings')"
            title="CERTIFICATES OF TRAININGS, SPECIAL ORDERS, ETC."
            description="The Certificate of Trainings Attended must be
                    arranged according to its presentation in the
                    Personal Data Sheet (Page 3: Descending Order). The
                    Special Orders must be arranged in descending order."
            document-type="training_certificates"
            :document="documents.training_certificates"
            :is-loading="documentUploadLoading.training_certificates"
            @update:document="
                (file) => $emit('update:document', 'training_certificates', file)
            "
            @remove="() => $emit('remove:document', 'training_certificates')"
            @upload-complete="$emit('upload-complete', 'training_certificates', $event)"
        />

        <!-- Employment Certificate -->
        <document-section
            v-if="isDocumentRequired('certificate of employment')"
            title="CERTIFICATE OF EMPLOYMENT"
            description="Provide certificates from your current and previous
                    employers."
            document-type="employment_certificate"
            :document="documents.employment_certificate"
            :is-loading="documentUploadLoading.employment_certificate"
            @update:document="
                (file) => $emit('update:document', 'employment_certificate', file)
            "
            @remove="() => $emit('remove:document', 'employment_certificate')"
            @upload-complete="$emit('upload-complete', 'employment_certificate', $event)"
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
        console.log('This is the response', response);
        requiredDocuments.value = response.data;
    } catch (error) {
        console.error('Error fetching required documents:', error);
    }
});

// Add a computed property to check if a document is required
const isDocumentRequired = (documentType) => {
    return requiredDocuments.value.some(doc =>
        doc.document_name.toLowerCase().includes(documentType.toLowerCase())
    );
};

defineEmits(["update:document", "remove:document", "upload-complete"]);
</script>
