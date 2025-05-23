<template>
    <Modal
        :title="job.title"
        :show="isOpen"
        @close="closeModal"
        :max-width="'7xl'"
    >
        <div class="p-8 bg-gradient-to-br from-green-50 to-white">
            <form @submit.prevent="submitApplication">
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
</template>

<script setup>
import { ref, computed } from "vue";
import { useForm, router } from "@inertiajs/vue3";
import Modal from "@/Components/Modal.vue";

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

const submitApplication = async () => {
    console.log('Starting application submission');

    if (!validateForm()) {
        console.log('Form validation failed:', validationErrors.value);
        return;
    }

    console.log('Form validation passed, proceeding with submission');

    try {
        // Set form submission loading state
        formSubmitting.value = true;

        // Create FormData to handle file uploads
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
                // Prefer using serverFile.id, fallback to hash if needed
                formData.append(`documents[${docType}]`, doc.serverFile.id || doc.serverFile.hash);
            }
        });

        console.log('Submitting form data:', {
            job_listing_id: form.job_listing_id,
            education: form.education,
            trainings: form.trainings,
            experiences: form.experiences,
            documents: form.documents
        });

        // Submit the form using axios with FormData
        const response = await axios.post(route("job-application.store"), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        });

        console.log('Response:', response.data);

        formSubmitting.value = false;
        closeModal();
        router.visit(route("job-application.show", props.job.job_listing_id));
        showToast("Application Submitted Successfully");
    } catch (error) {
        formSubmitting.value = false;
        console.error('Error submitting application:', error);

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response:', error.response.data);
            showErrorToast(error.response.data.message || "There was an error submitting your application. Please try again.");
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            showErrorToast("No response received from server. Please check your connection and try again.");
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up request:', error.message);
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
</style>
