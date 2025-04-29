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

                                    <CustomSelect
                                        v-model="statusFilter"
                                        :options="statuses"
                                        :displayFormat="(option) => option"
                                        placeholder="All Statuses"
                                        class="w-full sm:w-72"
                                    />

                                    <CustomSelect
                                        v-model="jobTitleFilter"
                                        :options="jobListings"
                                        :displayFormat="
                                            (option) =>
                                                option.job_listing_id === ''
                                                    ? option.title
                                                    : option.title
                                        "
                                        valueKey="job_listing_id"
                                        placeholder="All Job Titles"
                                        class="w-72"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-4">
                        <div
                            v-if="applications.length === 0"
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
                                No applications found
                            </h3>
                            <p class="text-gray-500 mt-1">
                                There are no job applications in the system yet.
                            </p>
                        </div>

                        <div v-else>
                            <div class="overflow-x-auto">
                                <DataTable
                                    :data="filteredApplications"
                                    :columns="[
                                        {
                                            key: 'user.user_detail.firstname',
                                            title: 'First Name',
                                        },
                                        {
                                            key: 'user.user_detail.lastname',
                                            title: 'Last Name',
                                        },
                                        {
                                            key: 'user.email',
                                            title: 'Email',
                                        },
                                        {
                                            key: 'job_listing.title',
                                            title: 'Job Title',
                                        },
                                        {
                                            key: 'job_listing.position.position_name',
                                            title: 'Position Name',
                                        },
                                        {
                                            key: 'created_at',
                                            title: 'Applied Date',
                                        },
                                        {
                                            key: 'status',
                                            title: 'Status',
                                        },
                                    ]"
                                    action="view"
                                    :row-click="'application_id'"
                                    @row-click="
                                        ({ value }) => viewDetails(value)
                                    "
                                />
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
import DataTable from "@/Components/DataTable.vue";

const props = defineProps({
    applications: {
        type: Array,
        required: true,
    },
    statuses: {
        type: Array,
        required: true,
    },
});

const applications = ref(props.applications);
const searchQuery = ref("");
const statusFilter = ref("");
const jobTitleFilter = ref("");
const statuses = ref(props.statuses);

// Create a unique list of job listings
const jobListings = ref(
    [...new Map(
        props.applications
            .filter(app => app.job_listing) // Filter out any null job_listings
            .map(app => [app.job_listing.job_listing_id, app.job_listing])
    ).values()]
);

const resetFilters = () => {
    statusFilter.value = "";
    jobTitleFilter.value = "";
    searchQuery.value = "";
};

const viewDetails = (applicationId) => {
    // Instead of showing modal, redirect to the application details page
    router.visit(route("applications.show", applicationId));
};

const filteredApplications = computed(() => {
    let filtered = applications.value;

    // Apply status filter
    if (statusFilter.value) {
        filtered = filtered.filter((app) => app.status === statusFilter.value);
    }

    // Apply job title filter
    if (jobTitleFilter.value) {
        filtered = filtered.filter(
            (app) => app.job_listing?.job_listing_id === jobTitleFilter.value,
        );
    }

    // Apply search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter((application) => {
            // Safely access nested properties
            const jobTitle = application.job_listing?.title || "";
            const positionName =
                application.job_listing?.position?.position_name || "";
            const userEmail = application.user?.email || "";
            const status = application.status || "";
            const firstName = application.user?.user_detail?.firstname || "";
            const lastName = application.user?.user_detail?.lastname || "";

            return (
                jobTitle.toLowerCase().includes(query) ||
                positionName.toLowerCase().includes(query) ||
                userEmail.toLowerCase().includes(query) ||
                status.toLowerCase().includes(query) ||
                firstName.toLowerCase().includes(query) ||
                lastName.toLowerCase().includes(query) ||
                `${firstName} ${lastName}`.toLowerCase().includes(query)
            );
        });
    }

    return filtered;
});

console.log("Filtered Applications:", filteredApplications.value);

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>
