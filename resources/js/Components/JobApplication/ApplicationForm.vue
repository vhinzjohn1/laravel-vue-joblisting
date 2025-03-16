<template>
    <Modal :show="isOpen" @close="closeModal" :max-width="'7xl'">
        <div class="p-6">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <h5 class="text-xl font-semibold text-gray-800">
                    {{ job.title }}
                </h5>
                <button
                    type="button"
                    @click="closeModal"
                    class="text-gray-500 hover:text-gray-700"
                >
                    <svg
                        class="w-6 h-6"
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

            <form @submit.prevent="submitApplication">
                <!-- Education Section -->
                <div class="mb-6">
                    <div class="flex justify-between items-center mb-4">
                        <h6 class="text-lg font-semibold">
                            Educational Background
                        </h6>
                        <div class="flex space-x-4">
                            <CustomSelect
                                class="w-64"
                                placeholder="Select from existing education"
                                :options="educationOptions"
                                :displayFormat="
                                    (option) =>
                                        `${option.degree_course} - ${option.school_name}`
                                "
                                valueKey="education_id"
                                @select="onEducationSelect"
                            />
                            <button
                                type="button"
                                @click="addEducation"
                                class="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                            >
                                Add New
                            </button>
                        </div>
                    </div>
                    <!-- Education form fields here -->
                </div>

                <!-- Training Section -->
                <div class="mb-6">
                    <div class="flex justify-between items-center mb-4">
                        <h6 class="text-lg font-semibold">
                            Training & Certifications
                        </h6>
                        <div class="flex space-x-4">
                            <CustomSelect
                                class="w-64"
                                placeholder="Select from existing training"
                                :options="trainingOptions"
                                :displayFormat="
                                    (option) =>
                                        `${option.title} - ${option.institution}`
                                "
                                valueKey="training_id"
                                @select="onTrainingSelect"
                            />
                            <button
                                type="button"
                                @click="addTraining"
                                class="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                            >
                                Add New
                            </button>
                        </div>
                    </div>
                    <!-- Training form fields here -->
                </div>

                <!-- Experience Section -->
                <div class="mb-6">
                    <div class="flex justify-between items-center mb-4">
                        <h6 class="text-lg font-semibold">Work Experience</h6>
                        <div class="flex space-x-4">
                            <CustomSelect
                                class="w-64"
                                placeholder="Select from existing experience"
                                :options="experienceOptions"
                                :displayFormat="
                                    (option) =>
                                        `${option.position} at ${option.company_name}`
                                "
                                valueKey="experience_id"
                                @select="onExperienceSelect"
                            />
                            <button
                                type="button"
                                @click="addExperience"
                                class="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                            >
                                Add New
                            </button>
                        </div>
                    </div>
                    <!-- Experience form fields here -->
                </div>

                <!-- Application Document -->
                <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h6 class="text-xl font-semibold text-gray-800 mb-4">
                        Supporting Documents
                    </h6>
                    <div
                        class="border-2 border-dashed border-gray-300 rounded-lg p-6"
                    >
                        <input
                            type="file"
                            @change="handleFileUpload"
                            class="hidden"
                            id="file-upload"
                            accept=".pdf,.doc,.docx"
                        />

                        <!-- Show this when no file is selected -->
                        <label
                            v-if="!form.application_document"
                            for="file-upload"
                            class="cursor-pointer text-center block"
                        >
                            <svg
                                class="mx-auto h-12 w-12 text-gray-400"
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
                            <span
                                class="mt-2 block text-sm font-medium text-gray-600"
                            >
                                Drop your resume here or click to upload
                            </span>
                            <span class="mt-1 text-xs text-gray-500">
                                Supported formats: PDF, DOC, DOCX
                            </span>
                        </label>

                        <!-- Show this when a file is selected -->
                        <div v-else class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <svg
                                    class="w-8 h-8 text-blue-500"
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
                                    <span
                                        class="text-sm font-medium text-gray-900"
                                    >
                                        {{ form.application_document.name }}
                                    </span>
                                    <span class="text-xs text-gray-500">
                                        {{
                                            formatFileSize(
                                                form.application_document.size,
                                            )
                                        }}
                                    </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                @click="removeFile"
                                class="text-red-500 hover:text-red-700 transition-colors"
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
                </div>

                <div class="flex justify-end space-x-4">
                    <button
                        type="button"
                        @click="closeModal"
                        class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Submit Application
                    </button>
                </div>
            </form>
        </div>
    </Modal>
</template>

<script setup>
import { ref, computed } from "vue";
import { useForm } from "@inertiajs/vue3";
import Modal from "@/Components/Modal.vue";
import CustomSelect from "@/Components/CustomSelect.vue";

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

const form = useForm({
    job_listing_id: props.job.job_listing_id,
    education: [
        {
            education_id: "",
            level: "",
            school_name: "",
            degree_course: "",
            year_graduated: "",
        },
    ],
    trainings: [
        { training_id: "", title: "", institution: "", duration_hours: "" },
    ],
    experiences: [
        {
            experience_id: "",
            position: "",
            company_name: "",
            start_date: "",
            end_date: "",
            is_current_job: false,
            responsibilities: "",
        },
    ],
    application_document: null,
});

// Add methods for handling form sections
const addEducation = () => {
    form.education.push({
        level: "",
        school_name: "",
        degree_course: "",
        year_graduated: "",
    });
};

const addTraining = () => {
    form.trainings.push({
        title: "",
        institution: "",
        duration_hours: "",
    });
};

const addExperience = () => {
    form.experiences.push({
        position: "",
        company_name: "",
        start_date: "",
        end_date: "",
        is_current_job: false,
        responsibilities: "",
    });
};

const removeEducation = (index) => {
    form.education.splice(index, 1);
};

const removeTraining = (index) => {
    form.trainings.splice(index, 1);
};

const removeExperience = (index) => {
    form.experiences.splice(index, 1);
};

// Selection handlers
const onEducationSelect = (selected) => {
    const lastIndex = form.education.length - 1;
    form.education[lastIndex] = {
        education_id: selected.education_id,
        level: selected.level,
        school_name: selected.school_name,
        degree_course: selected.degree_course,
        year_graduated: selected.year_graduated,
    };
};

const onTrainingSelect = (selected) => {
    const lastIndex = form.trainings.length - 1;
    form.trainings[lastIndex] = {
        training_id: selected.training_id,
        title: selected.title,
        institution: selected.institution,
        duration_hours: selected.duration_hours,
    };
};

const onExperienceSelect = (selected) => {
    const lastIndex = form.experiences.length - 1;
    form.experiences[lastIndex] = {
        experience_id: selected.experience_id,
        position: selected.position,
        company_name: selected.company_name,
        start_date: selected.start_date,
        end_date: selected.end_date,
        is_current_job: selected.is_current_job,
        responsibilities: selected.responsibilities,
    };
};

// Simplified computed properties
const educationOptions = computed(() => props.existingEducation);
const trainingOptions = computed(() => props.existingTrainings);
const experienceOptions = computed(() => props.existingExperiences);

const closeModal = () => {
    emit("close");
};

const submitApplication = () => {
    form.post(route("job-application.store"), {
        onSuccess: (response) => {
            emit("submitted", response);
            showSuccessAlert("Application Submitted Sucessfully");
        },
        onError: (errors) => {
            console.error("Form submission error: ", errors);
        },
    });
};

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.application_document = file;
    }
};

// Show success alert function
const showSuccessAlert = (message) => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Success!",
        text: message,
        iconColor: "#ffffff",
        showConfirmButton: false,
        timer: 4000, // Toast will disappear after 4 seconds
        toast: true, // Enable toast mode
        customClass: {
            popup: "bg-green-500 text-white",
        },
    });
};

const formatFileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const removeFile = () => {
    form.application_document = null;
};
</script>
