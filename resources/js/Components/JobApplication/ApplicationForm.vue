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
                <div class="mb-8 border-l-4 border-green-800 pl-4">
                    <h3 class="text-xl font-semibold text-gray-800">
                        {{ job.title }} - {{ job.position.position_name }}
                    </h3>
                    <p class="text-sm text-gray-600">
                        {{ job.category.name }} | Closes on
                        {{ new Date(job.closing_date).toLocaleDateString() }}
                    </p>
                </div>

                <!-- Education Section -->
                <div
                    class="mb-8 bg-white rounded-xl shadow-sm p-6 border border-green-100"
                >
                    <div class="flex justify-between items-center mb-4">
                        <h6
                            class="text-lg font-semibold text-gray-800 flex items-center"
                        >
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
                                    d="M12 14l9-5-9-5-9 5 9 5z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 14l9-5-9-5-9 5 9 5z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 14v7"
                                />
                            </svg>
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
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Education Level</label
                            >
                            <input
                                type="text"
                                v-model="form.education[0].level"
                                :disabled="!!form.education[0].education_id"
                                class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                            />
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >School/University</label
                            >
                            <input
                                type="text"
                                v-model="form.education[0].school_name"
                                :disabled="!!form.education[0].education_id"
                                class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                            />
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Degree/Course</label
                            >
                            <input
                                type="text"
                                v-model="form.education[0].degree_course"
                                :disabled="!!form.education[0].education_id"
                                class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                            />
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Year Graduated</label
                            >
                            <input
                                type="text"
                                v-model="form.education[0].year_graduated"
                                :disabled="!!form.education[0].education_id"
                                class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                            />
                        </div>
                    </div>

                    <div
                        v-if="form.education[0].education_id"
                        class="mt-3 flex justify-end"
                    >
                        <button
                            @click="clearEducation"
                            type="button"
                            class="text-xs text-gray-600 hover:text-gray-800 flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            Clear selection
                        </button>
                    </div>
                </div>

                <!-- Training Section -->
                <div
                    class="mb-8 bg-white rounded-xl shadow-sm p-6 border border-green-100"
                >
                    <div class="flex justify-between items-center mb-4">
                        <h6
                            class="text-lg font-semibold text-gray-800 flex items-center"
                        >
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
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
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
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Training Title</label
                            >
                            <input
                                type="text"
                                v-model="form.trainings[0].title"
                                :disabled="!!form.trainings[0].training_id"
                                class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                            />
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Institution/Provider</label
                            >
                            <input
                                type="text"
                                v-model="form.trainings[0].institution"
                                :disabled="!!form.trainings[0].training_id"
                                class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                            />
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Duration (Hours)</label
                            >
                            <input
                                type="number"
                                v-model="form.trainings[0].duration_hours"
                                :disabled="!!form.trainings[0].training_id"
                                class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                            />
                        </div>
                    </div>

                    <div
                        v-if="form.trainings[0].training_id"
                        class="mt-3 flex justify-end"
                    >
                        <button
                            @click="clearTraining"
                            type="button"
                            class="text-xs text-gray-600 hover:text-gray-800 flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            Clear selection
                        </button>
                    </div>
                </div>

                <!-- Experience Section -->
                <div
                    class="mb-8 bg-white rounded-xl shadow-sm p-6 border border-green-100"
                >
                    <div class="flex justify-between items-center mb-4">
                        <h6
                            class="text-lg font-semibold text-gray-800 flex items-center"
                        >
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
                                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            Work Experience
                        </h6>
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
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Position</label
                            >
                            <input
                                type="text"
                                v-model="form.experiences[0].position"
                                :disabled="!!form.experiences[0].experience_id"
                                class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                            />
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Company</label
                            >
                            <input
                                type="text"
                                v-model="form.experiences[0].company_name"
                                :disabled="!!form.experiences[0].experience_id"
                                class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                            />
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Start Date</label
                            >
                            <input
                                type="date"
                                v-model="form.experiences[0].start_date"
                                :disabled="!!form.experiences[0].experience_id"
                                class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                            />
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >End Date</label
                            >
                            <input
                                type="date"
                                v-model="form.experiences[0].end_date"
                                :disabled="
                                    !!form.experiences[0].experience_id ||
                                    form.experiences[0].is_current_job
                                "
                                class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                            />
                        </div>
                        <div>
                            <label class="flex items-center space-x-2 mt-2">
                                <input
                                    type="checkbox"
                                    v-model="form.experiences[0].is_current_job"
                                    :disabled="
                                        !!form.experiences[0].experience_id
                                    "
                                    class="rounded-sm text-green-600 focus:ring-green-500"
                                />
                                <span class="text-sm text-gray-700"
                                    >Current Job</span
                                >
                            </label>
                        </div>
                    </div>

                    <div class="mt-4">
                        <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Responsibilities</label
                        >
                        <textarea
                            v-model="form.experiences[0].responsibilities"
                            :disabled="!!form.experiences[0].experience_id"
                            rows="3"
                            class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                        ></textarea>
                    </div>

                    <div
                        v-if="form.experiences[0].experience_id"
                        class="mt-3 flex justify-end"
                    >
                        <button
                            @click="clearExperience"
                            type="button"
                            class="text-xs text-gray-600 hover:text-gray-800 flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            Clear selection
                        </button>
                    </div>
                </div>

                <!-- Application Document -->
                <div
                    class="bg-white rounded-xl shadow-sm p-6 mb-8 border border-green-100"
                >
                    <h6
                        class="text-lg font-semibold text-gray-800 flex items-center mb-4"
                    >
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
                    <div
                        class="border-2 border-dashed border-green-200 rounded-lg p-6 bg-green-50 transition duration-300 hover:bg-green-100"
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
                                class="mx-auto h-12 w-12 text-green-500"
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
                                class="mt-2 block text-sm font-medium text-gray-700"
                            >
                                Drop your resume here or click to upload
                            </span>
                            <span class="mt-1 text-xs text-gray-600">
                                Supported formats: PDF, DOC, DOCX
                            </span>
                        </label>

                        <!-- Show this when a file is selected -->
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
                                    <span
                                        class="text-sm font-medium text-gray-800"
                                    >
                                        {{ form.application_document.name }}
                                    </span>
                                    <span class="text-xs text-gray-600">
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
                </div>

                <div class="flex justify-end space-x-4">
                    <button
                        type="button"
                        @click="closeModal"
                        class="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="px-6 py-2.5 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium shadow-sm"
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

// Clear selection functions
const clearEducation = () => {
    form.education[0] = {
        education_id: "",
        level: "",
        school_name: "",
        degree_course: "",
        year_graduated: "",
    };
};

const clearTraining = () => {
    form.trainings[0] = {
        training_id: "",
        title: "",
        institution: "",
        duration_hours: "",
    };
};

const clearExperience = () => {
    form.experiences[0] = {
        experience_id: "",
        position: "",
        company_name: "",
        start_date: "",
        end_date: "",
        is_current_job: false,
        responsibilities: "",
    };
};

// Date formatter function for experience dates
const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
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
            showToast("Application Submitted Successfully");
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
const showToast = (message) => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        iconColor: "#ffffff",
        showConfirmButton: false,
        timer: 4000, // Toast will disappear after 4 seconds
        toast: true, // Enable toast mode
        color: "#ffffff",
        background: "#22c55e",
    });a
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
