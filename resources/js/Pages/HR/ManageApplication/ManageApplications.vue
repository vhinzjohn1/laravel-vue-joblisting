<template>
    <Head title="Manage Applications" />

    <HRLayout>
        <template #header>
            <Header title="Manage Applications" />
        </template>

        <div class="py-5">
            <div class="container-fluid px-4">
                <div class="card shadow-sm rounded-lg overflow-hidden bg-white">
                    <div class="card-header bg-white py-2 px-4 border-b">
                        <div
                            class="flex flex-col md:flex-row justify-center items-center gap-3"
                        >
                            <div
                                class="w-full flex flex-col md:flex-row items-center justify-between"
                            >
                                <div class="px-2">
                                    <h1
                                        class="text-2xl font-bold uppercase tracking-wider sm:mb-0"
                                    >
                                        Manage Applications
                                    </h1>
                                </div>
                                <div
                                    class="flex gap-3 items-center justify-center"
                                >
                                    <!-- Reset Icon -->
                                    <i
                                        @click="resetFilters"
                                        class="fas fa-sync-alt text-gray-500 cursor-pointer hover:text-green-500"
                                    ></i>

                                    <!-- Search Input -->
                                    <div class="relative">
                                        <input
                                            v-model="searchQuery"
                                            type="text"
                                            placeholder="Search job listings..."
                                            class="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <i class="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    </div>

                                    <CustomSelect
                                        v-model="statusFilter"
                                        :options="statuses"
                                        :displayFormat="(option) => option"
                                        placeholder="All Statuses"
                                        class="w-full sm:w-72"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-4">
                        <div
                            v-if="jobListings.length === 0"
                            class="text-center py-8"
                        >
                            <div class="text-gray-400 mb-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-12 w-12 mx-auto"
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
                            </div>
                            <h3 class="text-lg font-medium text-gray-900">
                                No job listings found
                            </h3>
                            <p class="text-gray-500 mt-1">
                                There are no job listings in the system yet.
                            </p>
                        </div>

                        <div v-else>
                            <div class="overflow-x-auto">
                                <table class="min-w-full border-collapse">
                                    <thead class="bg-gray-100">
                                        <tr>
                                            <th class="px-4 py-2 border-b border-gray-200 text-gray-700 font-medium text-left">
                                                Job Title
                                            </th>
                                            <th class="px-4 py-2 border-b border-gray-200 text-gray-700 font-medium text-left">
                                                Position Name
                                            </th>
                                            <th class="px-4 py-2 border-b border-gray-200 text-gray-700 font-medium text-left">
                                                Total Applicants
                                            </th>
                                            <th class="px-4 py-2 border-b border-gray-200 text-gray-700 font-medium text-left">
                                                Status Breakdown
                                            </th>
                                            <th class="px-4 py-2 border-b border-gray-200 text-gray-700 font-medium text-left">
                                                Closing Date
                                            </th>
                                            <th class="px-4 py-2 border-b border-gray-200 text-gray-700 font-medium text-left">
                                                Job Status
                                            </th>
                                            <th class="px-4 py-2 border-b border-gray-200 text-gray-700 font-medium text-left">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="job in filteredJobListings"
                                            :key="job.job_listing_id"
                                            @click="viewJobApplications(job.job_listing_id)"
                                            class="hover:bg-gray-50 cursor-pointer"
                                        >
                                            <td class="px-4 py-2 border-b border-gray-200">
                                                {{ job.title }}
                                            </td>
                                            <td class="px-4 py-2 border-b border-gray-200">
                                                {{ job.position?.position_name || 'N/A' }}
                                            </td>
                                            <td class="px-4 py-2 border-b border-gray-200">
                                                <span class="font-semibold text-blue-600">
                                                    {{ job.applicant_count }}
                                                </span>
                                            </td>
                                            <td class="px-4 py-2 border-b border-gray-200">
                                                <div class="flex flex-wrap gap-1">
                                                    <span
                                                        v-for="(count, status) in job.status_breakdown"
                                                        :key="status"
                                                        class="px-2 py-1 text-xs rounded-full"
                                                        :class="getStatusBadgeClass(status)"
                                                    >
                                                        {{ status }}: {{ count }}
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="px-4 py-2 border-b border-gray-200">
                                                {{ formatDate(job.closing_date) }}
                                            </td>
                                            <td class="px-4 py-2 border-b border-gray-200">
                                                <span
                                                    class="px-2 py-1 text-xs rounded-full"
                                                    :class="getJobStatusClass(job.status)"
                                                >
                                                    {{ job.status }}
                                                </span>
                                            </td>
                                            <td class="px-4 py-2 border-b border-gray-200">
                                                <button
                                                    @click.stop="viewJobApplications(job.job_listing_id)"
                                                    class="px-4 py-1 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition-colors text-sm font-medium"
                                                >
                                                    View Applications
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </HRLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { Head, router } from "@inertiajs/vue3";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import CustomSelect from "@/Components/CustomSelect.vue";

const props = defineProps({
    jobListings: {
        type: Array,
        required: true,
    },
    statuses: {
        type: Array,
        required: true,
    },
});

const jobListings = ref(props.jobListings);
const searchQuery = ref("");
const statusFilter = ref("");
const statuses = ref(props.statuses);

const resetFilters = () => {
    statusFilter.value = "";
    searchQuery.value = "";
};

const viewJobApplications = (jobListingId) => {
    // Redirect to the job applications page
    router.visit(route("applications.job", jobListingId));
};

const filteredJobListings = computed(() => {
    let filtered = jobListings.value;

    // Apply status filter
    if (statusFilter.value) {
        filtered = filtered.filter((job) => {
            // Check if any application has the selected status
            return job.status_breakdown && job.status_breakdown[statusFilter.value] > 0;
        });
    }

    // Apply search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter((job) => {
            const title = job.title || "";
            const positionName = job.position?.position_name || "";
            const status = job.status || "";

            return (
                title.toLowerCase().includes(query) ||
                positionName.toLowerCase().includes(query) ||
                status.toLowerCase().includes(query)
            );
        });
    }

    return filtered;
});

const getStatusBadgeClass = (status) => {
    const statusClasses = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Qualified': 'bg-green-100 text-green-800',
        'Disqualified': 'bg-red-100 text-red-800',
        'Competency Exam': 'bg-blue-100 text-blue-800',
        'Not Selected': 'bg-gray-100 text-gray-800',
        'Lack Requirements': 'bg-orange-100 text-orange-800',
        'Interview': 'bg-purple-100 text-purple-800',
        'Accepted': 'bg-emerald-100 text-emerald-800'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
};

const getJobStatusClass = (status) => {
    const statusClasses = {
        'Active': 'bg-green-100 text-green-800',
        'Inactive': 'bg-gray-100 text-gray-800',
        'Archived': 'bg-red-100 text-red-800'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
};

console.log("Filtered Job Listings:", filteredJobListings.value);

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>
