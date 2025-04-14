<template>

    <Head title="My Applications" />

    <ApplicantLayout>
        <template #header>
            <Header title="My Applications" />
        </template>

        <div>
            <div class="bg-white p-4 rounded-lg shadow-md mt-4">
                <div class="flex flex-col sm:flex-row justify-between items-center">
                    <h1 class="text-2xl font-bold uppercase tracking-wider mb-4 sm:mb-0">
                        My Applications
                    </h1>
                </div>
            </div>
            <div class="max-w-full mt-3">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="text-gray-900">
                        <div class="card-body p-4">
                            <div v-if="applications.length === 0" class="text-center py-8">
                                <div class="text-gray-400 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 class="text-lg font-medium text-gray-900">
                                    No applications found
                                </h3>
                                <p class="text-gray-500 mt-1">
                                    You haven't applied to any jobs yet.
                                </p>
                                <Link :href="route('job-application.index')"
                                    class="mt-4 inline-flex items-center px-4 py-2 bg-green-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-600 focus:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                Browse Jobs
                                </Link>
                            </div>

                            <div v-else>
                                <div class="overflow-x-auto">
                                    <DataTable 
                                        :data="filteredApplications" 
                                        :columns="[
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
                                            }
                                        ]"
                                        action="view" :row-click="'application_id'"
                                        @row-click="({ value }) => viewDetails(value)" />
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
import { Head, Link, router } from "@inertiajs/vue3";
import ApplicantLayout from "@/Layouts/Applicant/ApplicantLayout.vue";
import Header from "@/Components/Header/Header.vue";
import DataTable from "@/Components/DataTable.vue";

const props = defineProps({
    applications: {
        type: Array,
        required: true,
    },
});


const viewDetails = (applicationId) => {
    router.visit(route("my-applications.show", applicationId));
};

const applications = ref(props.applications);
const searchQuery = ref("");

const filteredApplications = computed(() => {
    if (!searchQuery.value) return applications.value;

    const query = searchQuery.value.toLowerCase();
    return applications.value.filter(
        (application) =>
            application.job_listing.title.toLowerCase().includes(query) ||
            application.job_listing.position.position_name
                .toLowerCase()
                .includes(query) ||
            application.status.toLowerCase().includes(query),
    );
});

const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

</script>
