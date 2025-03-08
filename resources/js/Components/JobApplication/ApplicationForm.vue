<template>
    <div class="modal fade" :id="modalId" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Apply for {{ job.title }}</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitApplication" class="space-y-6">
                        <!-- Personal Information (Read-only) -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700"
                                    >Name</label
                                >
                                <p class="mt-1 p-2 bg-gray-50 rounded">
                                    {{ userDetails?.firstname }}
                                    {{ userDetails?.middle_initial }}.
                                    {{ userDetails?.lastname }}
                                </p>
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700"
                                    >Email</label
                                >
                                <p class="mt-1 p-2 bg-gray-50 rounded">
                                    {{ user.email }}
                                </p>
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700"
                                    >Phone Number</label
                                >
                                <p class="mt-1 p-2 bg-gray-50 rounded">
                                    {{ userDetails?.phone_number }}
                                </p>
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700"
                                    >Education</label
                                >
                                <p class="mt-1 p-2 bg-gray-50 rounded">
                                    {{ userDetails?.education_attainment }}
                                </p>
                            </div>
                        </div>

                        <!-- Application Specific Information -->
                        <div class="space-y-4">
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700"
                                    >Years of Experience</label
                                >
                                <input
                                    type="number"
                                    v-model="form.years_experience"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                    min="0"
                                />
                                <div
                                    v-if="form.errors.years_experience"
                                    class="text-red-500 text-sm mt-1"
                                >
                                    {{ form.errors.years_experience }}
                                </div>
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700"
                                    >Relevant Training</label
                                >
                                <textarea
                                    v-model="form.relevant_training"
                                    rows="3"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                ></textarea>
                                <div
                                    v-if="form.errors.relevant_training"
                                    class="text-red-500 text-sm mt-1"
                                >
                                    {{ form.errors.relevant_training }}
                                </div>
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700"
                                    >Resume/CV</label
                                >
                                <input
                                    type="file"
                                    @change="handleFileUpload"
                                    class="mt-1 block w-full"
                                    accept=".pdf,.doc,.docx"
                                    required
                                />
                                <p class="mt-1 text-sm text-gray-500">
                                    Accepted formats: PDF, DOC, DOCX
                                </p>
                                <div
                                    v-if="form.errors.resume"
                                    class="text-red-500 text-sm mt-1"
                                >
                                    {{ form.errors.resume }}
                                </div>
                            </div>
                        </div>

                        <!-- Add general error message area -->
                        <div
                            v-if="form.errors.error"
                            class="bg-red-50 border-l-4 border-red-400 p-4"
                        >
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <svg
                                        class="h-5 w-5 text-red-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <p class="text-sm text-red-700">
                                        {{ form.errors.error }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="form.processing"
                        @click="submitApplication"
                    >
                        <span v-if="form.processing">Submitting...</span>
                        <span v-else>Submit Application</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useForm, usePage } from "@inertiajs/vue3";

const props = defineProps({
    job: {
        type: Object,
        required: true,
    },
    modalId: {
        type: String,
        required: true,
    },
});

const user = usePage().props.auth.user;
const userDetails = usePage().props.auth.userDetails;

console.log("This is the auth detaisl: ", userDetails);

const form = useForm({
    job_listing_id: props.job.job_listing_id,
    years_experience: "",
    relevant_training: "",
    resume: null,
});

const handleFileUpload = (e) => {
    form.resume = e.target.files[0];
};

const submitApplication = () => {
    // Create FormData object to properly handle file upload
    const formData = new FormData();
    formData.append("job_listing_id", form.job_listing_id);
    formData.append("years_experience", form.years_experience);
    formData.append("relevant_training", form.relevant_training);
    if (form.resume) {
        formData.append("resume", form.resume);
    }

    form.post(route("job-application.store"), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            $(`#${props.modalId}`).modal("hide");
            form.reset();
        },
        onError: (errors) => {
            console.log("Validation errors:", errors);
        },
    });
};
</script>
