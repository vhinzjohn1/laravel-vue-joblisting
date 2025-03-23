<template>
    <ApplicantLayout>
        <Head :title="job.title" />
        <template #header>
            <Header :title="job.title" />
        </template>

        <div class="py-5">
            <div class="container-fluid px-4">
                <!-- Breadcrumbs -->
                <Breadcrumbs
                    :items="[
                        { name: 'Home', href: route('job-application.index') },
                        {
                            name: 'Job Listings',
                            href: route('job-application.index'),
                        },
                        {
                            name: job.title,
                            href: route(
                                'job-application.show',
                                job.job_listing_id,
                            ),
                            active: true,
                        },
                    ]"
                />

                <!-- Success Message -->
                <div
                    v-if="$page.props.flash && $page.props.flash.success"
                    class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                >
                    <span class="block sm:inline">{{
                        $page.props.flash.success
                    }}</span>
                </div>

                <!-- Job Details -->
                <div
                    class="card shadow-sm rounded-lg overflow-hidden bg-white mb-6 flex flex-col"
                >
                    <!-- Back Button and Application Status -->
                    <div class="p-4 border-b flex items-center">
                        <div class="flex items-center">
                            <button
                                @click="
                                    $inertia.get(route('job-application.index'))
                                "
                                class="flex items-center text-gray-600 hover:text-gray-900"
                            >
                                <i class="fas fa-arrow-left mr-2"></i>
                                Back to Listings
                            </button>
                        </div>
                        <div v-if="hasApplied" class="flex-1 ml-4 text-center">
                            <div
                                class="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-center"
                            >
                                <i
                                    class="fas fa-info-circle text-green-500 mr-2"
                                ></i>
                                <h6 class="font-semibold text-green-900 mr-2">
                                    Application Status
                                </h6>
                                <p class="text-green-800">
                                    You have already applied for this position.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="p-6">
                        <!-- Job Header -->
                        <div class="flex items-start gap-4 mb-6">
                            <div
                                class="flex-shrink-0 bg-green-50 rounded-lg p-4 flex items-center justify-center"
                                style="width: 64px; height: 64px"
                            >
                                <span class="text-green-600 font-medium text-xl">
                                    {{
                                        job.position.position_name.substring(
                                            0,
                                            2,
                                        )
                                    }}
                                </span>
                            </div>
                            <div>
                                <h1
                                    class="text-2xl font-bold text-gray-900 mb-2"
                                >
                                    {{ job.title }}
                                </h1>
                                <div
                                    class="flex items-center gap-3 text-gray-600"
                                >
                                    <span>{{
                                        job.position.position_name
                                    }}</span>
                                    <span class="text-gray-400">•</span>
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

                        <!-- Job Details -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="md:col-span-2">
                                <!-- Description -->
                                <div class="mb-6">
                                    <h2 class="text-lg font-semibold mb-3">
                                        Job Description
                                    </h2>
                                    <p
                                        class="text-gray-600 whitespace-pre-line"
                                    >
                                        {{ job.description }}
                                    </p>
                                </div>

                                <!-- Minimum Requirements -->
                                <div
                                    class="mb-6"
                                    v-if="job.minimumRequirements?.length"
                                >
                                    <h2 class="text-lg font-semibold mb-3">
                                        Minimum Requirements
                                    </h2>
                                    <ul
                                        class="list-disc list-inside text-gray-600"
                                    >
                                        <li
                                            v-for="req in job.minimumRequirements"
                                            :key="req.requirement_id"
                                        >
                                            {{ req.title }}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Sidebar -->
                            <div class="space-y-6">
                                <!-- Job Info Card -->
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h3 class="font-semibold mb-4">
                                        Job Information
                                    </h3>
                                    <div class="space-y-3">
                                        <div>
                                            <label class="text-sm text-gray-500"
                                                >Salary</label
                                            >
                                            <p class="font-medium">
                                                ${{
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
                                                    job.position.salary_grade
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
                                                {{
                                                    job.category || "N/A"
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Apply Button -->
                                <button
                                    @click="openApplicationModal"
                                    :disabled="hasApplied"
                                    :class="[
                                        'w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-center',
                                        hasApplied
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-green-600 hover:bg-green-700 text-white',
                                    ]"
                                >
                                    <i class="far fa-paper-plane mr-2"></i>
                                    {{
                                        hasApplied
                                            ? "Already Applied"
                                            : "Apply Now"
                                    }}
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
import { Head, usePage } from "@inertiajs/vue3";
import ApplicantLayout from "@/Layouts/Applicant/ApplicantLayout.vue";
import Header from "@/Components/Header/Header.vue";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs.vue";
import ApplicationForm from "@/Components/JobApplication/ApplicationForm.vue";

const page = usePage();
const job = ref(page.props.job);
const userApplications = ref(page.props.applications || []);

const hasApplied = computed(() => {
    return job.value.applications.some(
        (app) => app.job_listing_id === job.value.job_listing_id,
    );
});

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
    job.value = responseData.props.job;

};
</script>
