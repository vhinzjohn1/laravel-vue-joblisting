<template>
    <Head title="View Job Listings" />

    <ApplicantLayout>
        <template #header>
            <Header title="View Job Listings" />
        </template>

        <div class="py-5">
            <div class="container-fluid px-4">
                <Breadcrumbs
                    :items="[
                        { name: 'Home', href: route('job-application.index') },
                        {
                            name: 'Job Listings',
                            href: route('job-application.index'),
                            active: true,
                        },
                    ]"
                />

                <div
                    class="card shadow-sm rounded-lg overflow-hidden bg-white mb-6"
                >
                    <div class="card-header bg-white py-4 px-4 border-b">
                        <div
                            class="flex flex-col md:flex-row justify-center items-center gap-3"
                        >
                            <div class="relative w-full md:w-1/2 max-w-xl">
                                <div class="flex">
                                    <input
                                        type="text"
                                        class="form-control block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search job listings..."
                                        v-model="searchQuery"
                                    />
                                    <button
                                        class="px-4 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"
                                    >
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-4">
                        <div
                            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                        >
                            <!-- Job Listing Preview Cards -->
                            <div
                                v-for="(job, index) in filteredJobs"
                                :key="index"
                                class="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full cursor-pointer"
                                @click="showJobDetails(job)"
                            >
                                <div class="p-6 flex flex-col h-full">
                                    <!-- Header Section -->
                                    <div class="flex items-start gap-4 mb-5">
                                        <!-- Position Icon -->
                                        <div
                                            class="flex-shrink-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                                            style="width: 56px; height: 56px"
                                        >
                                            <span class="text-blue-600 font-semibold text-lg">
                                                {{ job.position.position_name.substring(0, 2) }}
                                            </span>
                                        </div>

                                        <!-- Title and Department -->
                                        <div class="flex-1">
                                            <h5 class="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                                                {{ job.title }}
                                            </h5>
                                            <div class="flex flex-col gap-1">
                                                <span class="text-gray-600 text-sm">
                                                    {{ job.position.position_name }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Content Section -->
                                    <div class="flex-grow">
                                        <!-- Key Details -->
                                        <div class="flex flex-wrap gap-2 mb-4">
                                            <!-- Salary -->
                                            <span
                                                class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700"
                                            >
                                                <i class="fas fa-money-bill-wave mr-1.5"></i>
                                                ₱{{ job.position.salary_grade.amount.toLocaleString() }}
                                            </span>
                                            <!-- Experience -->
                                            <span
                                                class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700"
                                            >
                                                <i class="fas fa-briefcase mr-1.5"></i>
                                                {{ job.position.salary_grade.years_experience }}+ years
                                            </span>
                                            <!-- Deadline -->
                                            <span
                                                class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-50 text-purple-700"
                                            >
                                                <i class="fas fa-calendar-alt mr-1.5"></i>
                                                {{ formatDate(job.deadline) }}
                                            </span>
                                        </div>

                                        <!-- Description -->
                                        <p class="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                                            {{ job.description }}
                                        </p>

                                        <!-- Requirements Preview -->
                                        <div class="space-y-2">
                                            <h6 class="text-sm font-semibold text-gray-700">Key Requirements:</h6>
                                            <ul class="text-sm text-gray-600 space-y-1">
                                                <li v-for="(req, idx) in job.minimum_requirements.slice(0, 2)" :key="idx"
                                                    class="flex items-center">
                                                    <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                                    {{ req.title }}
                                                </li>
                                                <li v-if="job.minimum_requirements.length > 2"
                                                    class="text-blue-600 italic">
                                                    + {{ job.minimum_requirements.length - 2 }} more requirements...
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <!-- Footer Section -->
                                    <div class="mt-6 pt-4 border-t border-gray-50">
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center gap-2">
                                                <span class="text-sm text-gray-500">
                                                    Posted {{ formatDate(job.created_at) }}
                                                </span>
                                            </div>
                                            <button
                                                class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200"
                                            >
                                                <i class="fas fa-arrow-right mr-2"></i>
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ApplicantLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePage, Head, router } from "@inertiajs/vue3";
import ApplicantLayout from "@/Layouts/Applicant/ApplicantLayout.vue";
import Header from "@/Components/Header/Header.vue";
import axios from "axios";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs.vue";

// Fetching Props that was sent by controller
const jobs = ref(usePage().props.jobListings);

// Search functionality
const searchQuery = ref("");
const filteredJobs = computed(() => {
    if (!searchQuery.value) return jobs.value;

    const query = searchQuery.value.toLowerCase();
    return jobs.value.filter(
        (job) =>
            job.title.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            job.position.position_name.toLowerCase().includes(query),
    );
});

// Methods
const applyForJob = (jobId) => {
    axios
        .post(`job-application/${jobId}`)
        .then((response) => {
            console.log("Application successful:", response.data);
            // Handle successful application (e.g., show a success message)
        })
        .catch((error) => {
            console.error("Error applying for job:", error.response.data);
            // Handle error (e.g., show an error message)
        });
};

const showJobDetails = (job) => {
    router.get(route("job-application.show", job.job_listing_id));
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};
</script>

<style>
/* Adding utility classes */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
