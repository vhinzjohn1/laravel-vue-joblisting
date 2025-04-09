<template>
    <ApplicantLayout>
        <Head :title="job.title" />
        <template #header>
            <Header :title="job.title" />
        </template>

        <div class="py-5">
            <div class="container-fluid px-4">
                <!-- Mobile Application Status Banner -->
                <div v-if="hasApplied" class="lg:hidden mb-4">
                    <div
                        class="bg-green-50 border border-green-200 rounded-lg p-4"
                    >
                        <div class="flex flex-col items-center text-center">
                            <div class="flex items-center mb-3">
                                <i
                                    class="fas fa-check-circle text-green-500 mr-2 text-xl"
                                ></i>
                                <h6 class="font-semibold text-green-900">
                                    Application Submitted
                                </h6>
                            </div>
                            <button
                                @click="viewApplicationDetails"
                                class="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center justify-center"
                            >
                                <i class="fas fa-eye mr-2"></i>
                                View My Application
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Navigation and Desktop Application Status -->
                <div
                    class="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4"
                >
                    <!-- Back Button -->
                    <div class="flex items-center mb-4 lg:mb-0">
                        <button
                            @click="
                                $inertia.get(route('job-application.index'))
                            "
                            class="inline-flex items-center text-gray-600 hover:text-gray-900"
                        >
                            <i class="fas fa-arrow-left mr-2"></i>
                            Back to Listings
                        </button>
                    </div>

                    <!-- Desktop Application Status -->
                    <div v-if="hasApplied" class="hidden lg:block">
                        <div
                            class="bg-green-50 border border-green-200 rounded-lg px-6 py-3 flex items-center space-x-4"
                        >
                            <div class="flex items-center">
                                <i
                                    class="fas fa-info-circle text-green-500 mr-2"
                                ></i>
                                <span class="text-green-800"
                                    >You have already applied for this
                                    position</span
                                >
                            </div>
                            <button
                                @click="viewApplicationDetails"
                                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center"
                            >
                                <i class="fas fa-eye mr-2"></i>
                                View My Application
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Job Details Card -->
                <div class="bg-white rounded-lg shadow-sm overflow-hidden">
                    <!-- Job Header -->
                    <div class="p-6 border-b">
                        <div
                            class="flex flex-col md:flex-row md:items-start gap-4"
                        >
                            <div
                                class="flex-shrink-0 bg-green-50 rounded-lg p-4 flex items-center justify-center w-16 h-16"
                            >
                                <span
                                    class="text-green-600 font-medium text-xl"
                                >
                                    {{
                                        job.position.position_name.substring(
                                            0,
                                            2,
                                        )
                                    }}
                                </span>
                            </div>
                            <div class="flex-grow">
                                <h1
                                    class="text-2xl font-bold text-gray-900 mb-2"
                                >
                                    {{ job.title }}
                                </h1>
                                <div
                                    class="flex flex-wrap items-center gap-2 text-gray-600"
                                >
                                    <span class="inline-block">{{
                                        job.position.position_name
                                    }}</span>
                                    <span class="hidden md:inline text-gray-400"
                                        >•</span
                                    >
                                    <span class="inline-flex items-center">
                                        <span
                                            class="inline-block w-2 h-2 rounded-full mr-1"
                                            :class="{
                                                'bg-green-500':
                                                    job.status === 'Active',
                                                'bg-yellow-500':
                                                    job.status === 'Draft',
                                                'bg-red-500':
                                                    job.status === 'Closed',
                                            }"
                                        ></span>
                                        {{ job.status }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Job Content -->
                    <div class="p-6">
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <!-- Main Content -->
                            <div class="lg:col-span-2 space-y-8">
                                <!-- Description -->
                                <div>
                                    <h2 class="text-lg font-semibold mb-3">
                                        Job Description
                                    </h2>
                                    <p
                                        class="text-gray-600 whitespace-pre-line"
                                    >
                                        {{ job.description }}
                                    </p>
                                </div>

                                <!-- Requirements -->
                                <div>
                                    <h2 class="text-lg font-semibold mb-3">
                                        Minimum Requirements
                                    </h2>
                                    <div
                                        v-if="job.position.minimum_requirement"
                                        class="space-y-4"
                                    >
                                        <ul
                                            class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                        >
                                            <li
                                                v-if="
                                                    job.position
                                                        .minimum_requirement
                                                        .education_level
                                                "
                                                class="bg-gray-50 p-4 rounded-lg"
                                            >
                                                <span
                                                    class="block text-sm text-gray-500"
                                                    >Education</span
                                                >
                                                <span class="font-medium">
                                                    {{
                                                        job.position
                                                            .minimum_requirement
                                                            .education_level
                                                    }}
                                                </span>
                                            </li>
                                            <li
                                                v-if="
                                                    job.position
                                                        .minimum_requirement
                                                        .eligibility
                                                "
                                                class="bg-gray-50 p-4 rounded-lg"
                                            >
                                                <span
                                                    class="block text-sm text-gray-500"
                                                    >Eligibility</span
                                                >
                                                <span class="font-medium">
                                                    {{
                                                        job.position
                                                            .minimum_requirement
                                                            .eligibility
                                                    }}
                                                </span>
                                            </li>
                                            <li
                                                v-if="
                                                    job.position
                                                        .minimum_requirement
                                                        .training_hours
                                                "
                                                class="bg-gray-50 p-4 rounded-lg"
                                            >
                                                <span
                                                    class="block text-sm text-gray-500"
                                                    >Training Required</span
                                                >
                                                <span class="font-medium">
                                                    {{
                                                        job.position
                                                            .minimum_requirement
                                                            .training_hours
                                                    }}
                                                    hours
                                                </span>
                                            </li>
                                            <li
                                                v-if="
                                                    job.position
                                                        .minimum_requirement
                                                        .years_experience
                                                "
                                                class="bg-gray-50 p-4 rounded-lg"
                                            >
                                                <span
                                                    class="block text-sm text-gray-500"
                                                    >Experience Required</span
                                                >
                                                <span class="font-medium">
                                                    {{
                                                        job.position
                                                            .minimum_requirement
                                                            .years_experience
                                                    }}
                                                    year(s)
                                                </span>
                                            </li>
                                        </ul>

                                        <!-- Requirements Check Status -->
                                        <div
                                            v-if="
                                                page.props.auth.user &&
                                                $page.props.meetsRequirements
                                            "
                                            class="mt-6 p-4 rounded-lg"
                                            :class="[
                                                $page.props.meetsRequirements
                                                    .overall
                                                    ? 'bg-green-50'
                                                    : 'bg-yellow-50',
                                            ]"
                                        >
                                            <h3
                                                class="font-semibold mb-3"
                                                :class="[
                                                    $page.props
                                                        .meetsRequirements
                                                        .overall
                                                        ? 'text-green-800'
                                                        : 'text-yellow-800',
                                                ]"
                                            >
                                                {{
                                                    $page.props
                                                        .meetsRequirements
                                                        .overall
                                                        ? "You meet the minimum requirements!"
                                                        : "Some requirements not met"
                                                }}
                                            </h3>

                                            <div class="space-y-4">
                                                <div
                                                    class="text-sm"
                                                    :class="[
                                                        $page.props
                                                            .meetsRequirements
                                                            .overall
                                                            ? 'text-green-600'
                                                            : 'text-yellow-600',
                                                    ]"
                                                >
                                                    {{
                                                        $page.props
                                                            .meetsRequirements
                                                            .counts.met
                                                    }}
                                                    of
                                                    {{
                                                        $page.props
                                                            .meetsRequirements
                                                            .counts.total
                                                    }}
                                                    critical requirements met
                                                </div>

                                                <div
                                                    class="grid grid-cols-1 md:grid-cols-3 gap-4"
                                                >
                                                    <!-- Education Status -->
                                                    <div
                                                        class="bg-white bg-opacity-50 rounded-lg p-3"
                                                    >
                                                        <div
                                                            class="flex items-center mb-2"
                                                        >
                                                            <i
                                                                :class="[
                                                                    $page.props
                                                                        .meetsRequirements
                                                                        .details
                                                                        .education
                                                                        .met
                                                                        ? 'fas fa-check-circle text-green-500'
                                                                        : 'fas fa-exclamation-circle text-yellow-500',
                                                                    'mr-2',
                                                                ]"
                                                            ></i>
                                                            <span
                                                                class="font-medium"
                                                                >Education</span
                                                            >
                                                        </div>
                                                        <p
                                                            class="text-sm text-gray-600"
                                                        >
                                                            {{
                                                                $page.props
                                                                    .meetsRequirements
                                                                    .details
                                                                    .education
                                                                    .details
                                                            }}
                                                        </p>
                                                    </div>

                                                    <!-- Experience Status -->
                                                    <div
                                                        class="bg-white bg-opacity-50 rounded-lg p-3"
                                                    >
                                                        <div
                                                            class="flex items-center mb-2"
                                                        >
                                                            <i
                                                                :class="[
                                                                    $page.props
                                                                        .meetsRequirements
                                                                        .details
                                                                        .experience
                                                                        .met
                                                                        ? 'fas fa-check-circle text-green-500'
                                                                        : 'fas fa-exclamation-circle text-yellow-500',
                                                                    'mr-2',
                                                                ]"
                                                            ></i>
                                                            <span
                                                                class="font-medium"
                                                                >Experience</span
                                                            >
                                                        </div>
                                                        <p
                                                            class="text-sm text-gray-600"
                                                        >
                                                            {{
                                                                $page.props
                                                                    .meetsRequirements
                                                                    .details
                                                                    .experience
                                                                    .details
                                                            }}
                                                        </p>
                                                    </div>

                                                    <!-- Training Status -->
                                                    <div
                                                        class="bg-white bg-opacity-50 rounded-lg p-3"
                                                    >
                                                        <div
                                                            class="flex items-center mb-2"
                                                        >
                                                            <i
                                                                :class="[
                                                                    $page.props
                                                                        .meetsRequirements
                                                                        .details
                                                                        .training
                                                                        .met
                                                                        ? 'fas fa-check-circle text-green-500'
                                                                        : 'fas fa-exclamation-circle text-yellow-500',
                                                                    'mr-2',
                                                                ]"
                                                            ></i>
                                                            <span
                                                                class="font-medium"
                                                                >Training</span
                                                            >
                                                        </div>
                                                        <p
                                                            class="text-sm text-gray-600"
                                                        >
                                                            {{
                                                                $page.props
                                                                    .meetsRequirements
                                                                    .details
                                                                    .training
                                                                    .details
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <p
                                                v-if="
                                                    !$page.props
                                                        .meetsRequirements
                                                        .overall
                                                "
                                                class="mt-4 text-sm text-yellow-700"
                                            >
                                                Note: You can still apply, but
                                                meeting all requirements
                                                increases your chances.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Sidebar -->
                            <div class="space-y-6">
                                <!-- Job Info Card -->
                                <div class="bg-gray-50 rounded-lg p-6">
                                    <h3 class="font-semibold mb-4">
                                        Job Information
                                    </h3>
                                    <div class="space-y-4">
                                        <div>
                                            <label class="text-sm text-gray-500"
                                                >Salary</label
                                            >
                                            <p class="font-medium text-lg">
                                                ₱{{
                                                    job.position.salary_grade.amount.toLocaleString()
                                                }}
                                            </p>
                                        </div>
                                        <div>
                                            <label class="text-sm text-gray-500"
                                                >Experience Required</label
                                            >
                                            <p class="font-medium">
                                                {{
                                                    job.position
                                                        .minimum_requirement
                                                        .years_experience
                                                }}+ years
                                            </p>
                                        </div>
                                        <div>
                                            <label class="text-sm text-gray-500"
                                                >Closing Date</label
                                            >
                                            <p class="font-medium">
                                                {{
                                                    new Date(
                                                        job.closing_date,
                                                    ).toLocaleDateString()
                                                }}
                                            </p>
                                        </div>
                                        <div>
                                            <label class="text-sm text-gray-500"
                                                >Category</label
                                            >
                                            <p class="font-medium">
                                                {{ job.category }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Apply Button -->
                                <button
                                    v-if="!hasApplied"
                                    @click="openApplicationModal"
                                    class="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center font-medium"
                                >
                                    <i class="far fa-paper-plane mr-2"></i>
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Application Form Modal -->
                <ApplicationForm
                    v-if="!hasApplied"
                    :job="job"
                    :is-open="showApplicationModal"
                    :existing-education="page.props.userData?.education || []"
                    :existing-trainings="page.props.userData?.trainings || []"
                    :existing-experiences="
                        page.props.userData?.experiences || []
                    "
                    @close="closeApplicationModal"
                    @submitted="handleApplicationSubmitted"
                />
            </div>
        </div>
    </ApplicantLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { Head, usePage, router } from "@inertiajs/vue3";
import ApplicantLayout from "@/Layouts/Applicant/ApplicantLayout.vue";
import Header from "@/Components/Header/Header.vue";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs.vue";
import ApplicationForm from "@/Components/JobApplication/ApplicationForm.vue";

const page = usePage();
const job = ref(page.props.job);
const userApplications = ref(page.props.applications || []);

console.log("This is the page props: ", page.props);

const hasApplied = computed(() => {
    return job.value.applications.some(
        (app) => app.job_listing_id === job.value.job_listing_id,
    );
});

const userApplicationId = computed(() => {
    if (!job.value.applications || job.value.applications.length === 0)
        return null;
    const application = job.value.applications.find(
        (app) => app.job_listing_id === job.value.job_listing_id,
    );
    return application ? application.application_id : null;
});

const viewApplicationDetails = () => {
    if (userApplicationId.value) {
        router.visit(route("my-applications.show", userApplicationId.value));
    }
};

const showApplicationModal = ref(false);

const openApplicationModal = () => {
    if (hasApplied.value) {
        return;
    }
    showApplicationModal.value = true;
};

const closeApplicationModal = () => {
    showApplicationModal.value = false;
};

const handleApplicationSubmitted = (responseData) => {
    closeApplicationModal();
    job.value = responseData.job;
};
</script>
