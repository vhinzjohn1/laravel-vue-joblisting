<template>
    <Head title="Manage Applications" />

    <HRLayout>
        <template #header>
            <Header title="Manage Applications" />
        </template>

        <div class="py-5">
            <div class="container-fluid px-4">
                <Breadcrumbs
                    :items="[
                        { name: 'Home', href: route('applications.index') },
                        {
                            name: 'Manage Applications',
                            href: route('applications.index'),
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
                                    <TextInput
                                        type="text"
                                        class="w-full rounded-r-none"
                                        placeholder="Search applications..."
                                        v-model="searchQuery"
                                    />
                                    <button
                                        class="px-4 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"
                                    >
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="flex gap-2">
                                <CustomSelect
                                    v-model="statusFilter"
                                    :options="statuses"
                                    :displayFormat="(option) => option"
                                    placeholder="All Statuses"
                                    class="w-72"
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
                                <table
                                    class="min-w-full divide-y divide-gray-200"
                                >
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Applicant
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Job Title
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Position
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Applied Date
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        class="bg-white divide-y divide-gray-200"
                                    >
                                        <tr
                                            v-for="application in filteredApplications"
                                            :key="application.application_id"
                                            class="hover:bg-gray-50 cursor-pointer"
                                            @click="
                                                viewDetails(
                                                    application.application_id,
                                                )
                                            "
                                        >
                                            <td
                                                class="px-6 py-4 whitespace-nowrap"
                                            >
                                                <div class="flex items-center">
                                                    <div
                                                        class="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center"
                                                    >
                                                        <span
                                                            class="text-sm font-medium text-gray-600"
                                                        >
                                                            {{
                                                                application.user.user_detail.firstname.charAt(
                                                                    0,
                                                                )
                                                            }}
                                                        </span>
                                                    </div>
                                                    <div class="ml-4">
                                                        <div
                                                            class="text-sm font-medium text-gray-900"
                                                        >
                                                            {{
                                                                `${application.user.user_detail.firstname} ${application.user.user_detail.lastname}`
                                                            }}
                                                        </div>
                                                        <div
                                                            class="text-sm text-gray-500"
                                                        >
                                                            {{
                                                                application.user
                                                                    .email
                                                            }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap"
                                            >
                                                <div
                                                    class="text-sm font-medium text-gray-900"
                                                >
                                                    {{
                                                        application.job_listing
                                                            .title
                                                    }}
                                                </div>
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap"
                                            >
                                                <div
                                                    class="text-sm text-gray-500"
                                                >
                                                    {{
                                                        application.job_listing
                                                            .position
                                                            .position_name
                                                    }}
                                                </div>
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap"
                                            >
                                                <div
                                                    class="text-sm text-gray-500"
                                                >
                                                    {{
                                                        formatDate(
                                                            application.created_at,
                                                        )
                                                    }}
                                                </div>
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap"
                                            >
                                                <span
                                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                                    :class="{
                                                        'bg-yellow-100 text-yellow-800':
                                                            application.status ===
                                                            'Pending',
                                                        'bg-green-100 text-green-800':
                                                            application.status ===
                                                            'Qualified',
                                                        'bg-red-100 text-red-800':
                                                            application.status ===
                                                            'Rejected',
                                                        'bg-blue-100 text-blue-800':
                                                            application.status ===
                                                            'Competency Exam',
                                                        'bg-purple-100 text-purple-800':
                                                            application.status ===
                                                            'Interview',
                                                        'bg-gray-100 text-gray-800':
                                                            ![
                                                                'Pending',
                                                                'Qualified',
                                                                'Rejected',
                                                                'Competency Exam',
                                                                'Interview',
                                                            ].includes(
                                                                application.status,
                                                            ),
                                                    }"
                                                >
                                                    {{ application.status }}
                                                </span>
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                            >
                                                <button
                                                    @click.stop="
                                                        viewDetails(
                                                            application.application_id,
                                                        )
                                                    "
                                                    class="text-green-800 hover:text-green-900"
                                                >
                                                    View Details
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
import { Head, Link } from "@inertiajs/vue3";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs.vue";
import CustomSelect from "@/Components/CustomSelect.vue";
import TextInput from "@/Components/TextInput.vue";

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
const jobListings = ref(props.applications.map((app) => app.job_listing));

const viewDetails = (applicationId) => {
    // Instead of showing modal, redirect to the application details page
    window.location.href = route("applications.show", applicationId);
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

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>
