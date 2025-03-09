<template>
    <Head title="Job Application" />

    <ApplicantLayout>
        <template #header>
            <Header title="Job Application" />
        </template>

        <div class="py-5">
            <div class="container-fluid px-4">
                <Breadcrumbs
                    :items="[
                        { name: 'Home', href: route('applicant.index') },
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
                            class="flex flex-col md:flex-row justify-between gap-3"
                        >
                            <div class="relative w-full md:w-1/2">
                                <div class="flex">
                                    <input
                                        type="text"
                                        class="form-control block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search job listings..."
                                        v-model="searchQuery"
                                    />
                                    <button
                                        class="px-4 py-2.5 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"
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
                                class="rounded-lg border border-gray-200 hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                                @click="showJobDetails(job)"
                            >
                                <div class="p-4">
                                    <div class="flex items-start gap-3 mb-4">
                                        <div
                                            class="flex-shrink-0 bg-blue-50 rounded-md p-3 flex items-center justify-center"
                                            style="width: 48px; height: 48px"
                                        >
                                            <span
                                                class="text-blue-600 font-medium"
                                            >
                                                {{
                                                    job.position.position_name.substring(
                                                        0,
                                                        2,
                                                    )
                                                }}
                                            </span>
                                        </div>
                                        <div>
                                            <h5
                                                class="font-semibold text-gray-900 mb-1"
                                            >
                                                {{ job.title }}
                                            </h5>
                                            <div
                                                class="text-gray-500 text-sm flex items-center gap-1"
                                            >
                                                <span>{{
                                                    job.position.position_name
                                                }}</span>
                                                <span class="mx-1">•</span>
                                                <span
                                                    class="inline-flex items-center"
                                                >
                                                    <span
                                                        class="inline-block w-2 h-2 rounded-full mr-1"
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
                                                    {{ job.status }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-wrap gap-2 mb-3">
                                        <span
                                            class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                        >
                                            ${{
                                                job.position.salary_grade.amount.toLocaleString()
                                            }}
                                        </span>
                                        <span
                                            class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                        >
                                            {{
                                                job.position.salary_grade
                                                    .years_experience
                                            }}+ years experience
                                        </span>
                                    </div>

                                    <p
                                        class="text-gray-600 text-sm mb-3 line-clamp-3"
                                    >
                                        {{ job.description }}
                                    </p>
                                </div>
                                <div
                                    class="flex justify-between border-t px-4 py-3 bg-gray-50"
                                >
                                    <button
                                        class="btn text-sm py-1.5 px-3 border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors"
                                        @click="applyForJob(job.job_listing_id)"
                                    >
                                        <i class="far fa-paper-plane mr-1"></i>
                                        Apply
                                    </button>
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
</script>

<style>
/* Adding utility classes */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
