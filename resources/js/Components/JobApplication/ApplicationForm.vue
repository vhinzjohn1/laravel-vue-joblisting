<template>
    <Modal
        :title="job.title"
        :show="isOpen"
        @close="closeModal"
        :max-width="'7xl'"
    >
        <div class="p-8 bg-gradient-to-br from-green-50 to-white">
            <form @submit.prevent="showConfirmation">
                <!-- Header Information -->
                <div class="pl-4 mb-8 border-l-4 border-green-800">
                    <h3 class="text-xl font-semibold text-gray-800">
                        {{ job.title }} - {{ job.position.position_name }}
                    </h3>
                    <p class="text-sm text-gray-600">
                        {{ job.position.category }} | Closes on
                        {{ new Date(job.closing_date).toLocaleDateString() }}
                    </p>
                </div>

                <!-- Education Section -->
                <education-section
                    :education-options="educationOptions"
                    :selected-educations="form.education"
                    @update:selected-educations="updateEducations"
                    @select="onEducationSelect"
                />
                <p
                    v-if="showValidation && validationErrors.education"
                    class="mt-1 text-sm text-red-500"
                >
                    Please select at least one education record
                </p>

                <!-- Training Section -->
                <training-section
                    :training-options="trainingOptions"
                    :selected-trainings="form.trainings"
                    @update:selected-trainings="updateTrainings"
                    @select="onTrainingSelect"
                />

                <!-- Experience Section -->
                <experience-section
                    :experience-options="experienceOptions"
                    :selected-experiences="form.experiences"
                    @update:selected-experiences="updateExperiences"
                    @select="onExperienceSelect"
                />

                <!-- Document Upload Section -->
                <document-upload-section
                    :documents="form.documents"
                    :document-upload-loading="documentUploadLoading"
                    :job-listing-id="job.job_listing_id"
                    @update:document="handleDocumentUpdate"
                    @remove:document="handleDocumentRemove"
                    @upload-complete="handleDocumentUploadComplete"
                />

                <div class="flex gap-2 justify-end">
                    <!-- Document Validation Error -->
                    <div
                        v-if="showValidation && validationErrors.documents"
                        class="flex-1 text-right"
                    >
                        <p class="font-bold text-red-500 text-md">
                            Please upload all required documents:
                        </p>
                        <ul class="text-sm text-red-500 mt-1">
                            <li v-for="(error, docType) in validationErrors.missingDocuments" :key="docType">
                                {{ getDocumentDisplayName(docType) }}
                            </li>
                        </ul>
                    </div>

                    <button
                        type="button"
                        @click="closeModal"
                        :disabled="formSubmitting"
                        class="px-6 py-2.5 font-medium text-gray-700 rounded-lg border border-gray-300 transition hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        :disabled="formSubmitting"
                        class="px-6 py-2.5 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium shadow-sm disabled:opacity-75 disabled:cursor-wait flex items-center justify-center min-w-[120px]"
                    >
                        <span v-if="formSubmitting" class="mr-2">
                            <svg
                                class="mr-2 -ml-1 w-5 h-5 text-white animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
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
                                ></circle>
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </span>
                        {{
                            formSubmitting
                                ? "Submitting..."
                                : "Submit Application"
                        }}
                    </button>
                </div>
            </form>
        </div>
    </Modal>

    <!-- Confirmation Modal -->
    <Modal
        title="Confirm Application Details"
        :show="showConfirmationModal"
        @close="closeConfirmationModal"
        :max-width="'7xl'"
    >
        <div class="p-8 bg-white">
            <div class="space-y-6">
                <!-- Education Section -->
                <div>
                    <h3 class="text-lg font-semibold mb-3 text-gray-800">Education</h3>
                    <div class="space-y-3">
                        <div v-for="(edu, index) in form.education" :key="index" class="bg-gray-50 p-4 rounded-lg">
                            <p class="font-medium">{{ edu.level }}</p>
                            <p class="text-gray-600">{{ edu.school_name }}</p>
                            <p class="text-gray-600">{{ edu.degree_course }}</p>
                            <p v-if="edu.year_graduated" class="text-gray-600">Graduated: {{ edu.year_graduated }}</p>
                        </div>
                    </div>
                </div>

                <!-- Training Section -->
                <div v-if="form.trainings.length > 0">
                    <h3 class="text-lg font-semibold mb-3 text-gray-800">Trainings</h3>
                    <div class="space-y-3">
                        <div v-for="(training, index) in form.trainings" :key="index" class="bg-gray-50 p-4 rounded-lg">
                            <p class="font-medium">{{ training.title }}</p>
                            <p class="text-gray-600">{{ training.institution }}</p>
                            <p class="text-gray-600">{{ training.duration_hours }} hours</p>
                        </div>
                    </div>
                </div>

                <!-- Experience Section -->
                <div v-if="form.experiences.length > 0">
                    <h3 class="text-lg font-semibold mb-3 text-gray-800">Work Experience</h3>
                    <div class="space-y-3">
                        <div v-for="(exp, index) in form.experiences" :key="index" class="bg-gray-50 p-4 rounded-lg">
                            <p class="font-medium">{{ exp.position }}</p>
                            <p class="text-gray-600">{{ exp.company_name }}</p>
                            <p class="text-gray-600">
                                {{ new Date(exp.start_date).toLocaleDateString() }} -
                                {{ exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present' }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Documents Section -->
                <div>
                    <h3 class="text-lg font-semibold mb-3 text-gray-800">Documents</h3>
                    <div class="space-y-4">
                        <div v-for="(doc, docType) in form.documents" :key="docType">
                            <template v-if="doc">
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <div class="flex items-start justify-between">
                                        <div>
                                            <p class="font-medium">{{ getDocumentDisplayName(docType) }}</p>
                                            <p class="text-gray-600">{{ doc.name }}</p>
                                        </div>
                                        <div class="flex gap-2">
                                            <button
                                                type="button"
                                                @click="showDocumentPreview(doc)"
                                                class="text-blue-600 hover:text-blue-800"
                                            >
                                                <i class="fas fa-eye"></i> Preview
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        @click="closeConfirmationModal"
                        class="px-6 py-2.5 font-medium text-gray-700 rounded-lg border border-gray-300 transition hover:bg-gray-50"
                    >
                        Back to Edit
                    </button>
                    <button
                        type="button"
                        @click="submitApplication"
                        :disabled="formSubmitting"
                        class="px-6 py-2.5 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium shadow-sm disabled:opacity-75 disabled:cursor-wait flex items-center justify-center min-w-[120px]"
                    >
                        <span v-if="formSubmitting" class="mr-2">
                            <svg class="mr-2 -ml-1 w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </span>
                        {{ formSubmitting ? "Submitting..." : "Confirm & Submit" }}
                    </button>
                </div>
            </div>
        </div>
    </Modal>

    <!-- Document Preview Modal -->
    <Modal
        title="Document Preview"
        :show="showDocumentPreviewModal"
        @close="closeDocumentPreview"
        :max-width="'4xl'"
    >
        <div class="p-4">
            <div v-if="currentPreviewDocument" class="aspect-[3/4] w-full">
                <iframe
                    :src="previewDocumentUrl"
                    class="w-full h-full border-0"
                    type="application/pdf"
                ></iframe>
            </div>
        </div>
    </Modal>
</template>

<script setup>
import { ref, computed } from "vue";
import { useForm, router } from "@inertiajs/vue3";
import Modal from "@/Components/Modal.vue";
import axios from "axios";

// Import our new components
import EducationSection from "./EducationSection.vue";
import TrainingSection from "./TrainingSection.vue";
import ExperienceSection from "./ExperienceSection.vue";
import DocumentUploadSection from "./DocumentUploadSection.vue";

const props = defineProps({
    job: {
        type: Object,
        required: true,
    },
    isOpen: {
        type: Boolean,
        required: true,
    },
    existingEducation: {
        type: Array,
        default: () => [],
    },
    existingTrainings: {
        type: Array,
        default: () => [],
    },
    existingExperiences: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(["close", "submitted"]);

// Document name mapping for display
const documentDisplayNames = {
    application_letter: 'Letter of Intent/Application Letter',
    personal_data_sheet: 'Personal Data Sheet (PDS)',
    work_experience_sheet: 'Work Experience Sheet (WES)',
    transcript_and_diploma: 'Transcript of Records (TOR) and Diploma',
    eligibility_proof: 'Authenticated Proof of Eligibility',
    performance_rating: 'Latest Performance Rating (DPCR/IPCR)',
    training_certificates: 'Certificate of Trainings, Special Orders, etc.',
    employment_certificate: 'Certificate of Employment'
};

// Simplified computed properties
const educationOptions = computed(() => props.existingEducation);
const trainingOptions = computed(() => props.existingTrainings);
const experienceOptions = computed(() => props.existingExperiences);

// Form state
const form = useForm({
    job_listing_id: props.job.job_listing_id,
    education: [],
    trainings: [],
    experiences: [],
    documents: {
        application_letter: null,
        personal_data_sheet: null,
        work_experience_sheet: null,
        transcript_and_diploma: null,
        eligibility_proof: null,
        performance_rating: null,
        training_certificates: null,
        employment_certificate: null,
    },
});

// Loading states for individual document uploads and form submission
const documentUploadLoading = ref({
    application_letter: false,
    personal_data_sheet: false,
    work_experience_sheet: false,
    transcript_and_diploma: false,
    eligibility_proof: false,
    performance_rating: false,
    training_certificates: false,
    employment_certificate: false,
});
const formSubmitting = ref(false);

// Add validation state
const validationErrors = ref({
    education: false,
    documents: false,
    missingDocuments: {}
});

const showValidation = ref(false);

// Add new refs for confirmation modal and document preview
const showConfirmationModal = ref(false);
const showDocumentPreviewModal = ref(false);
const previewDocumentUrl = ref(null);
const currentPreviewDocument = ref(null);

// Helper function to get document display name
const getDocumentDisplayName = (docType) => {
    return documentDisplayNames[docType] || docType;
};

// Update handlers for child components
const updateEducations = (educations) => {
    form.education = educations;
};

const updateTrainings = (trainings) => {
    form.trainings = trainings;
};

const updateExperiences = (experiences) => {
    form.experiences = experiences;
};

// Selection handlers
const onEducationSelect = (selected) => {
    // Now handled in the EducationSection component
};

const onTrainingSelect = (selected) => {
    // Now handled in the TrainingSection component
};

const onExperienceSelect = (selected) => {
    // Now handled in the ExperienceSection component
};

const closeModal = () => {
    emit("close");
};

const handleDocumentUpdate = (docType, file) => {
    // Clear validation error for this document type when a new file is uploaded
    if (validationErrors.value.missingDocuments[docType]) {
        delete validationErrors.value.missingDocuments[docType];
    }

    // Set loading state for this specific document type
    documentUploadLoading.value[docType] = true;

    // Verify the document type is valid
    if (!Object.keys(form.documents).includes(docType)) {
        console.error(`Invalid document type: ${docType}`);
        documentUploadLoading.value[docType] = false;
        return;
    }

    // Update only the specific document type
    form.documents[docType] = file;

    // Log for debugging to confirm which document is being updated
    console.log(`Document updated: ${docType}`, file.name);

    // Set loading to false after upload (upload is now handled in DocumentUploader)
    documentUploadLoading.value[docType] = false;
};

const handleDocumentRemove = (docType) => {
    console.log(`Starting removal for document type: ${docType}`);

    // Create a clean copy of the current documents
    const updatedDocuments = { ...form.documents };

    // Remove only the specific document
    updatedDocuments[docType] = null;

    // Update the entire documents object to ensure reactivity
    form.documents = updatedDocuments;

    // Log for debugging
    console.log(`Document removed: ${docType}`);
};

const handleDocumentUploadComplete = (docType, fileInfo) => {
    // Optionally, you can show a toast or mark the document as uploaded
    console.log(`Upload complete for ${docType}`, fileInfo);
    // You could update state here if needed for further UX improvement
};

// Validation functions
const validateEducation = () => {
    const isValid = form.education.length > 0;
    console.log('Education validation:', { isValid, education: form.education });
    return isValid;
};

const validateDocuments = () => {
    console.log('Starting document validation');
    // Get required documents from the DocumentUploadSection component
    const requiredDocuments = document.querySelectorAll('[data-required-document]');
    console.log('Required documents found:', requiredDocuments.length);

    const missingDocuments = {};
    let isValid = true;

    requiredDocuments.forEach(doc => {
        const docType = doc.getAttribute('data-required-document');
        console.log('Checking document:', docType, form.documents[docType]);

        if (!form.documents[docType] || !form.documents[docType].serverFile) {
            console.log('Missing document:', docType);
            missingDocuments[docType] = true;
            isValid = false;
        }
    });

    console.log('Document validation result:', { isValid, missingDocuments });
    validationErrors.value.missingDocuments = missingDocuments;
    return isValid;
};

const validateForm = () => {
    console.log('Starting form validation');
    showValidation.value = true;

    const educationValid = validateEducation();
    const documentsValid = validateDocuments();

    validationErrors.value = {
        education: !educationValid,
        documents: !documentsValid,
        missingDocuments: validationErrors.value.missingDocuments
    };

    console.log('Form validation result:', {
        educationValid,
        documentsValid,
        validationErrors: validationErrors.value
    });

    return educationValid && documentsValid;
};

// Modify the form submission flow
const showConfirmation = () => {
    if (!validateForm()) {
        return;
    }
    showConfirmationModal.value = true;
};

const closeConfirmationModal = () => {
    showConfirmationModal.value = false;
};

const showDocumentPreview = (doc) => {
    let fileUrl = null;
    if (doc.serverFile && doc.serverFile.url) {
        fileUrl = doc.serverFile.url;
    } else if (doc.url) {
        fileUrl = doc.url;
    } else if (doc.serverFile && doc.serverFile.path) {
        // Fallback if you store the path and can build a URL
        fileUrl = `/storage/${doc.serverFile.path}`;
    }
    if (fileUrl) {
        previewDocumentUrl.value = fileUrl;
        currentPreviewDocument.value = doc;
        showDocumentPreviewModal.value = true;
    } else {
        // Optionally show an error toast here
        showErrorToast('No preview available for this document.');
    }
};

const closeDocumentPreview = () => {
    showDocumentPreviewModal.value = false;
    if (previewDocumentUrl.value) {
        URL.revokeObjectURL(previewDocumentUrl.value);
        previewDocumentUrl.value = null;
    }
    currentPreviewDocument.value = null;
};

// Modify the existing submitApplication function
const submitApplication = async () => {
    try {
        formSubmitting.value = true;

        // Build FormData and send request (same as your original logic)
        const formData = new FormData();
        formData.append("job_listing_id", form.job_listing_id);

        // Add education data
        form.education.forEach((edu, index) => {
            Object.keys(edu).forEach((key) => {
                formData.append(`education[${index}][${key}]`, edu[key] || "");
            });
        });

        // Add training data
        form.trainings.forEach((training, index) => {
            Object.keys(training).forEach((key) => {
                formData.append(`trainings[${index}][${key}]`, training[key] || "");
            });
        });

        // Add experience data
        form.experiences.forEach((exp, index) => {
            Object.keys(exp).forEach((key) => {
                formData.append(`experiences[${index}][${key}]`, exp[key] || "");
            });
        });

        // Add document references (send serverFile.id or serverFile.hash, not the file itself)
        Object.keys(form.documents).forEach((docType) => {
            const doc = form.documents[docType];
            if (doc && doc.serverFile) {
                formData.append(`documents[${docType}]`, doc.serverFile.id || doc.serverFile.hash);
            }
        });

        const response = await axios.post(route("job-application.store"), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        });

        formSubmitting.value = false;
        closeConfirmationModal();
        closeModal();
        router.visit(route("job-application.show", props.job.job_listing_id));
        showToast("Application Submitted Successfully");
    } catch (error) {
        formSubmitting.value = false;
        if (error.response) {
            showErrorToast(error.response.data.message || "There was an error submitting your application. Please try again.");
        } else if (error.request) {
            showErrorToast("No response received from server. Please check your connection and try again.");
        } else {
            showErrorToast("There was an error submitting your application. Please try again.");
        }
    }
};

// Show success alert function
const showToast = (message) => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        iconColor: "#ffffff",
        showConfirmButton: false,
        timer: 4000,
        toast: true,
        color: "#ffffff",
        background: "#22c55e",
    });
};

const showErrorToast = (message) => {
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: message,
        iconColor: "#ffffff",
        showConfirmButton: false,
        timer: 4000,
        toast: true,
        color: "#ffffff",
        background: "#ef4444",
    });
};
</script>

<style>
.validation-toast {
    max-width: 400px !important;
}

.validation-toast ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.validation-toast ul li {
    margin: 4px 0;
    font-size: 0.875rem;
}

/* Add new styles for the preview modal */
.document-preview {
    width: 100%;
    height: 80vh;
    border: none;
}
</style>
