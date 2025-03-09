<template>
    <Head :title="job.title" />

    <ApplicantLayout>
        <template #header>
            <Header :title="job.title" />
        </template>

        <div class="py-5">
            <div class="container-fluid px-4">
                <!-- Add Breadcrumbs here -->
                <Breadcrumbs
                    :items="[
                        { name: 'Home', href: route('applicant.index') },
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

                <div class="card shadow-sm rounded-lg overflow-hidden bg-white">
                    <!-- Back Button -->
                    <div class="p-4 border-b">
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

                    <div class="p-6">
                        <!-- Job Header -->
                        <div class="flex items-start gap-4 mb-6">
                            <div
                                class="flex-shrink-0 bg-blue-50 rounded-lg p-4 flex items-center justify-center"
                                style="width: 64px; height: 64px"
                            >
                                <span class="text-blue-600 font-medium text-xl">
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
                                                    job.category?.name || "N/A"
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Apply Button -->
                                <button
                                    @click="showApplicationModal"
                                    class="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                                >
                                    <i class="far fa-paper-plane mr-2"></i>
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Application Form Modal -->
        <ApplicationForm :job="job" modalId="applicationModal" />
    </ApplicantLayout>
</template>

<script setup>
import { Head } from "@inertiajs/vue3";
import ApplicantLayout from "@/Layouts/Applicant/ApplicantLayout.vue";
import Header from "@/Components/Header/Header.vue";
import axios from "axios";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs.vue";
import ApplicationForm from "@/Components/JobApplication/ApplicationForm.vue";

const props = defineProps({
    job: {
        type: Object,
        required: true,
    },
});

const showApplicationModal = () => {
    $("#applicationModal").modal("show");
};
</script>
