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
                                class="bg-white rounded-xl border hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full cursor-pointer relative"
                                :class="[
                                    hasAppliedToJob(job)
                                        ? 'border-green-200 bg-green-50/30'
                                        : 'border-gray-100',
                                ]"
                                @click="showJobDetails(job)"
                            >
                                <div class="p-6 flex flex-col h-full">
                                    <!-- Applied Badge (Top-Right Corner) -->
                                    <div
                                        v-if="hasAppliedToJob(job)"
                                        class="absolute top-0 right-0 bg-[#ffc001] text-black text-sm font-bold px-3 py-1 rounded-bl-lg"
                                    >
                                        Applied
                                    </div>

                                    <!-- Header Section -->
                                    <div class="flex items-start gap-4 mb-3">
                                        <!-- Position Icon -->
                                        <div
                                            class="flex-shrink-0 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                                            style="width: 56px; height: 56px"
                                        >
                                            <span
                                                class="text-green-600 font-semibold text-lg"
                                            >
                                                {{
                                                    job.position.position_name.substring(
                                                        0,
                                                        2,
                                                    )
                                                }}
                                            </span>
                                        </div>

                                        <!-- Title and Position -->
                                        <div class="flex-1">
                                            <h5
                                                class="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors"
                                            >
                                                {{ job.title }}
                                            </h5>
                                            <div
                                                class="flex items-center gap-2 text-sm"
                                            >
                                                <span class="text-gray-600">{{
                                                    job.position.position_name
                                                }}</span>
                                                <span class="text-gray-300"
                                                    >•</span
                                                >
                                                <span
                                                    class="inline-flex items-center gap-1.5"
                                                >
                                                    <span
                                                        class="inline-block w-2.5 h-2.5 rounded-full"
                                                        :class="{
                                                            'bg-green-500':
                                                                job.status ===
                                                                'Active',
                                                            'bg-yellow-500':
                                                                job.status ===
                                                                'Draft',
                                                            'bg-red-500':
                                                                job.status ===
                                                                'Closed',
                                                        }"
                                                    ></span>
                                                    <span
                                                        :class="{
                                                            'text-green-600':
                                                                job.status ===
                                                                'Active',
                                                            'text-yellow-600':
                                                                job.status ===
                                                                'Draft',
                                                            'text-red-600':
                                                                job.status ===
                                                                'Closed',
                                                        }"
                                                        >{{ job.status }}</span
                                                    >
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Content Section -->
                                    <div class="flex-grow">
                                        <!-- Minimum Requirements -->
                                        <div
                                            v-if="
                                                job.position.minimum_requirement
                                            "
                                            class="mb-4"
                                        >
                                            <h6
                                                class="text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Minimum Requirements:
                                            </h6>
                                            <ul
                                                class="list-disc list-inside text-sm text-gray-600 space-y-1"
                                            >
                                                <li
                                                    v-if="
                                                        job.position
                                                            .minimum_requirement
                                                            .education_level
                                                    "
                                                >
                                                    <i
                                                        class="fas fa-graduation-cap mr-1 text-gray-500"
                                                    ></i>
                                                    {{
                                                        job.position
                                                            .minimum_requirement
                                                            .education_level
                                                    }}
                                                </li>
                                                <li
                                                    v-if="
                                                        job.position
                                                            .minimum_requirement
                                                            .eligibility
                                                    "
                                                >
                                                    <i
                                                        class="fas fa-certificate mr-1 text-gray-500"
                                                    ></i>
                                                    {{
                                                        job.position
                                                            .minimum_requirement
                                                            .eligibility
                                                    }}
                                                </li>
                                                <li
                                                    v-if="
                                                        job.position
                                                            .minimum_requirement
                                                            .training_hours
                                                    "
                                                >
                                                    <i
                                                        class="fas fa-chalkboard-teacher mr-1 text-gray-500"
                                                    ></i>
                                                    {{
                                                        job.position
                                                            .minimum_requirement
                                                            .training_hours
                                                    }}
                                                    hours training
                                                </li>
                                                <li
                                                    v-if="
                                                        job.position
                                                            .minimum_requirement
                                                            .years_experience
                                                    "
                                                >
                                                    <i
                                                        class="fas fa-briefcase mr-1 text-gray-500"
                                                    ></i>
                                                    {{
                                                        job.position
                                                            .minimum_requirement
                                                            .years_experience
                                                    }}
                                                    year(s) experience
                                                </li>
                                            </ul>
                                        </div>

                                        <!-- Description -->
                                        <p
                                            class="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4"
                                        >
                                            {{ job.description }}
                                        </p>
                                    </div>

                                    <!-- Footer Section -->
                                    <div
                                        class="mt-6 pt-4 border-t border-gray-50"
                                    >
                                        <div
                                            class="flex items-center justify-between"
                                        >
                                            <div
                                                class="flex items-center gap-2"
                                            >
                                                <span
                                                    class="text-sm text-gray-500"
                                                >
                                                    Posted
                                                    {{
                                                        formatDate(
                                                            job.created_at,
                                                        )
                                                    }}
                                                </span>
                                            </div>
                                            <div
                                                class="flex items-center gap-2"
                                            >
                                                <button
                                                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-800 rounded-lg hover:bg-green-700 transition-all duration-200"
                                                >
                                                    <i
                                                        class="fas fa-arrow-right mr-2"
                                                    ></i>
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

console.log("This is the props ", usePage().props);
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

// Check if user has applied to a specific job
const hasAppliedToJob = (job) => {
    return job.applications && job.applications.length > 0;
};

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
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
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
