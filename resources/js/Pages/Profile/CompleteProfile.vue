<script setup>
import { Head, usePage, router } from "@inertiajs/vue3";
import { ref, computed, onMounted } from "vue";
import ProfileDetailsForm from "./Partials/ProfileDetailsForm.vue";
import EducationalBackgroundForm from "./Partials/EducationalBackgroundForm.vue";
import TrainingCertificationsForm from "./Partials/TrainingCertificationsForm.vue";
import WorkExperienceForm from "./Partials/WorkExperienceForm.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";

const user = usePage().props.auth.user;
const currentStep = ref(1);
const totalSteps = 4;
const isLoading = ref(true);
const showLogoutModal = ref(false);

const asset = (path) => {
    return `/${path}`;
};

// Step information
const steps = [
    {
        number: 1,
        title: "Profile Details",
        description: "Add your personal information",
        component: ProfileDetailsForm,
    },
    {
        number: 2,
        title: "Educational Background",
        description: "Add your educational qualifications",
        component: EducationalBackgroundForm,
    },
    {
        number: 3,
        title: "Work Experience",
        description: "Add your professional work history",
        component: WorkExperienceForm,
    },
    {
        number: 4,
        title: "Training & Certifications",
        description: "Add your trainings and certifications",
        component: TrainingCertificationsForm,
    },
];

// Navigation functions
const nextStep = () => {
    if (currentStep.value < totalSteps) {
        currentStep.value++;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
};

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
};

const skipToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
        currentStep.value = step;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
};

// Check if all steps are complete - in a real implementation, you might check
// if the user has at least one entry for each section
const isStepComplete = ref({
    1: false, // Profile Details
    2: false, // Educational Background
    3: false, // Work Experience
    4: false, // Training & Certifications
});

// Handle completion of a step
const markStepAsComplete = (step) => {
    isStepComplete.value[step] = true;
    console.log(isStepComplete.value);
};

// Current step component
const currentComponent = computed(() => {
    return steps[currentStep.value - 1].component;
});

// Check if profile is complete - this would connect to your backend
const completeProfile = () => {
    console.log("this is the user:", user);
    // Make API call to mark profile as complete
    axios
        .put(route("complete-profile.update", user.id))
        .then(() => {
            Swal.fire({
                title: "Profile Completed!",
                text: "Your profile has been successfully completed.",
                icon: "success",
                color: "#000000",
                confirmButtonColor: "#22c55e",
                confirmButtonText: "Apply for Job",
                allowOutsideClick: () => false,
            }).then((result) => {
                if (result.isConfirmed) {
                    // Check if there's a job_listing_id in localStorage
                    const jobData = localStorage.getItem('job_listing_id');
                    if (jobData) {
                        try {
                            const jobs = JSON.parse(jobData);
                            if (jobs.length > 0) {
                                // Redirect to the most recent job application
                                const latestJob = jobs[jobs.length - 1];
                                window.location.href = `/job-application/${latestJob.job_listing_id}`;
                            } else {
                                // Fallback to job listings if no specific job
                                window.location.href = route("job-application.index");
                            }
                        } catch (e) {
                            console.error('Error parsing job data from localStorage:', e);
                            // Fallback to job listings if error
                            window.location.href = route("job-application.index");
                        }
                    } else {
                        // Fallback to job listings if no job data
                        window.location.href = route("job-application.index");
                    }
                }
            });
        })
        .catch((error) => {
            console.error("Error completing profile:", error);
            Swal.fire({
                title: "Error",
                text: "There was an error completing your profile. Please try again.",
                icon: "error",
                confirmButtonColor: "#ef4444",
            });
        });
};

// Function to check which step needs to be shown
const determineInitialStep = async () => {
    try {
        // Fetch all profile data in parallel
        const [
            userDetailsResponse,
            educationResponse,
            experienceResponse,
            trainingResponse,
        ] = await Promise.all([
            axios.get(route("profile.user-details")),
            axios.get(route("profile-details.index", "education")),
            axios.get(route("profile-details.index", "experience")),
            axios.get(route("profile-details.index", "training")),
        ]);

        // Check data and set completion status
        // Profile Details
        if (
            !userDetailsResponse.data ||
            !userDetailsResponse.data.firstname ||
            !userDetailsResponse.data.lastname
        ) {
            currentStep.value = 1;
        }
        // Educational Background
        else if (educationResponse.data.length === 0) {
            currentStep.value = 2;
            isStepComplete.value[1] = true;
        }
        // Work Experience
        else if (experienceResponse.data.length === 0) {
            currentStep.value = 3;
            isStepComplete.value[1] = true;
            isStepComplete.value[2] = true;
        }
        // Training & Certifications
        else if (trainingResponse.data.length === 0) {
            currentStep.value = 4;
            isStepComplete.value[1] = true;
            isStepComplete.value[2] = true;
            isStepComplete.value[3] = true;
        } else {
            // All steps have data
            currentStep.value = 4;
            isStepComplete.value[1] = true;
            isStepComplete.value[2] = true;
            isStepComplete.value[3] = true;
            isStepComplete.value[4] = true;
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
    } finally {
        isLoading.value = false;
    }
};

const handleLogout = () => {
    router.post(route("logout"));
};

// Call this on component mount
onMounted(() => {
    determineInitialStep();
});
</script>

<template>
    <Head title="Complete Profile" />

    <header class="fixed w-full bg-white shadow-md z-50 mb-10">
        <nav class="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div class="flex justify-between items-center">
                <a href="/" class="flex items-center space-x-3">
                    <img
                        :src="asset('img/cmulogo.png')"
                        alt="CMU Logo"
                        class="w-10 h-10 sm:w-12 sm:h-12"
                    />
                    <span
                        class="font-semibold text-green-800 text-sm sm:text-base lg:text-xl"
                    >
                        Central Mindanao University
                    </span>
                </a>
                <div>
                    <button
                        @click="showLogoutModal = true"
                        class="group rounded-lg p-1.5 text-black transition-colors duration-200"
                    >
                        <span
                            class="text-sm font-medium leading-none text-gray-600"
                        >
                            {{ $page.props.auth.user.email }}
                        </span>
                        <i
                            class="fas fa-sign-out-alt p-1 border rounded-md transition-colors duration-200 group-hover:bg-green-500"
                        ></i>
                    </button>
                </div>
            </div>
        </nav>
    </header>

    <!-- Logout Modal -->
    <div
        v-if="showLogoutModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity"
    >
        <div
            class="relative w-full max-w-sm rounded-lg bg-white p-6 text-center"
        >
            <h3 class="mb-1 text-lg font-semibold text-black">
                Are you sure you want to log out?
            </h3>
            <p class="mb-4 text-gray-800">
                Log out of
                <span class="text-black">{{ user.email }}?</span>
            </p>
            <div class="flex flex-col space-y-2">
                <button
                    @click="handleLogout"
                    class="w-full rounded-lg logout px-4 py-2 text-sm font-semibold bg-green-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    Log out
                </button>
                <button
                    @click="showLogoutModal = false"
                    class="w-full rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>

    <!-- Add this loading indicator -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
        <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"
        ></div>
    </div>

    <div v-else class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-10">
            <!-- Progress Tracker -->
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                <div class="p-4 sm:p-6 md:p-8">
                    <h3 class="text-xl font-bold text-center mb-6">
                        Profile Completion
                    </h3>

                    <!-- Mobile Step Indicator (visible on small screens) -->
                    <div class="block sm:hidden text-center">
                        <p class="text-lg font-medium mb-2">
                            Step {{ currentStep }} of {{ totalSteps }}
                        </p>
                        <p class="text-sm text-gray-600">
                            {{ steps[currentStep - 1].title }}
                        </p>
                    </div>

                    <!-- Desktop Progress Steps (hidden on small screens) -->
                    <div
                        class="hidden sm:flex items-center justify-between max-w-4xl mx-auto"
                    >
                        <template v-for="(step, index) in steps" :key="index">
                            <!-- Step Item -->
                            <div class="flex flex-col items-center">
                                <!-- Step Circle -->
                                <div
                                    :class="[
                                        'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors',
                                        currentStep > step.number ||
                                        isStepComplete[step.number]
                                            ? 'bg-green-600 text-white'
                                            : currentStep === step.number
                                              ? 'bg-green-100 text-green-800 ring-2 ring-green-600'
                                              : 'bg-gray-100 text-gray-600',
                                    ]"
                                >
                                    <span
                                        v-if="
                                            currentStep > step.number ||
                                            isStepComplete[step.number]
                                        "
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                    <span v-else>{{ step.number }}</span>
                                </div>

                                <!-- Step Title -->
                                <p
                                    :class="[
                                        'mt-2 text-sm font-medium',
                                        currentStep === step.number
                                            ? 'text-green-800'
                                            : 'text-gray-600',
                                    ]"
                                >
                                    {{ step.title }}
                                </p>
                            </div>

                            <!-- Connector (not for the last item) -->
                            <div
                                v-if="index < steps.length - 1"
                                class="flex-1 h-1 mx-2 bg-gray-200"
                            >
                                <div
                                    :class="[
                                        'h-full bg-green-600 transition-all duration-500',
                                        currentStep > step.number
                                            ? 'w-full'
                                            : 'w-0',
                                    ]"
                                ></div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>

            <!-- Step Content -->
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                <div class="p-4 sm:p-6 md:p-8">
                    <!-- show only when currentStep is 1 -->
                    <div v-if="currentStep === 1">
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">
                            {{ steps[currentStep - 1].title }}
                        </h3>
                    </div>

                    <!-- Dynamic Component Based on Current Step -->
                    <component
                        :is="currentComponent"
                        @step-completed="markStepAsComplete(currentStep)"
                    />
                </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="mt-8">
                <!-- Instruction text - Responsive for all screen sizes -->
                <div class="text-center mb-4">
                    <span
                        class="text-green-900 text-sm md:text-base font-medium"
                    >
                        When you're done, please click Next.
                    </span>
                </div>

                <!-- Single responsive layout for all screen sizes -->
                <div class="flex flex-wrap gap-2 justify-between items-center">
                    <!-- Previous button -->
                    <button
                        v-if="currentStep > 1"
                        @click="prevStep"
                        class="px-4 sm:px-6 py-2 border-2 border-gray-300 rounded-lg hover:border-green-700 hover:text-green-700 transition-colors font-medium flex items-center text-sm md:text-base"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 md:h-5 md:w-5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        Previous
                    </button>
                    <div v-else class="w-0 md:w-24"></div>
                    <!-- Placeholder for spacing -->

                    <div class="flex flex-wrap gap-2 justify-end">
                        <!-- Skip for now button - Hidden for first step -->
                        <button
                            v-if="currentStep > 1 && currentStep < totalSteps"
                            @click="nextStep"
                            class="px-4 sm:px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm md:text-base"
                        >
                            Skip for now
                        </button>

                        <!-- Next button - For steps before the last one -->
                        <button
                            v-if="currentStep < totalSteps"
                            @click="nextStep"
                            :disabled="currentStep === 1 && !isStepComplete[1]"
                            :class="[
                                'px-4 sm:px-6 py-2 text-white rounded-lg transition-colors font-medium flex items-center text-sm md:text-base',
                                currentStep === 1 && !isStepComplete[1]
                                    ? 'bg-green-300 cursor-not-allowed'
                                    : 'bg-green-700 hover:bg-green-800',
                            ]"
                        >
                            Next
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 md:h-5 md:w-5 ml-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>

                        <!-- Complete Profile button - For the last step -->
                        <PrimaryButton
                            v-if="currentStep === totalSteps"
                            @click="completeProfile"
                            class="px-4 sm:px-6 py-2 bg-green-700 hover:bg-green-800 text-sm md:text-base"
                        >
                            Complete Profile
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
button.swal2-confirm.swal2-styled.swal2-default-outline {
    color: #000000 !important;
}
</style>
