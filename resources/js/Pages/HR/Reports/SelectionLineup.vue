<script setup>
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import { Head, Link, router } from "@inertiajs/vue3";
import Header from "@/Components/Header/Header.vue";
import { computed, ref } from "vue";

// Add reactive variables for input fields
const preparedBy = ref('HR Staff');
const certifiedBy = ref('ATHENA JAN I. DERAYUNAN');
import DataTable from "@/Components/DataTable.vue";

const props = defineProps({
    jobListings: Array,
    jobListing: Object,
    applicants: Array,
});

// Status filter
const statusFilter = ref("All");
const statusOptions = [
    { value: "All", label: "All Applicants" },
    { value: "Qualified", label: "Qualified" },
    { value: "Pending", label: "Pending Review" },
    { value: "Rejected", label: "Rejected" },
];

console.log("this is the props", props)

// Filtered applicants based on statusFilter
const filteredApplicants = computed(() => {
    if (!props.applicants) return [];
    if (statusFilter.value === "All") return props.applicants;

    return props.applicants.filter((app) => app.status === statusFilter.value);
});

// Utility function to ensure consistent data structure handling
const ensureArray = (value) => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
};

const asset = (path) => `/${path}`;

// Check if we're on the index page or a specific job listing page
const isIndex = computed(() => !props.jobListing);

// Format date function
const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const viewDetails = (id) => {
    router.visit(route('selection-lineup.show', id));
};

const print = () => {
    window.print();
};
</script>

<template>
    <Head :title="isIndex ? 'Selection Lineup Reports' : 'Selection Lineup'" />

    <HRLayout>
        <template #header>
            <Header
                :title="
                    isIndex ? 'Selection Lineup Reports' : 'Selection Lineup'
                "
            />
        </template>

        <div>
            <div class="py-1">
                <div class="container-fluid">
                    <!-- Index View - List of Job Listings -->
                    <div
                        v-if="isIndex"
                        class="card shadow-sm rounded-lg overflow-hidden bg-white"
                    >
                        <div class="card-header bg-white border-b p-4">
                            <h5 class="text-gray-900 text-lg font-bold">
                                Available Job Listings for Selection Lineup
                            </h5>
                            <p class="text-gray-600 text-sm mt-1">
                                Select a job listing to view its selection
                                lineup
                            </p>
                        </div>
                        <!-- Data Table for Selection Lineup -->
                        <DataTable
                            :data="jobListings"
                            :columns="[
                                {
                                    key: 'title',
                                    title: 'Job Title',
                                },
                                {
                                    key: 'position.position_name',
                                    title: 'Position Name',
                                },
                                {
                                    key: 'position.item_number',
                                    title: 'Item No.',
                                },
                                {
                                    key: 'position.category',
                                    title: 'Category',
                                },
                                {
                                    key: 'closing_date',
                                    title: 'Closing Date',
                                },
                            ]"
                            action="view"
                            :row-click="'job_listing_id'"
                            @row-click="({ value }) => viewDetails(value)"
                        />
                    </div>

                    <!-- Show View - Selection Lineup for specific job -->
                    <div
                        v-else
                        id="selection-lineup"
                        class="card shadow-sm rounded-lg overflow-hidden bg-white"
                    >
                        <div class="card-header bg-white border-b relative p-4">
                            <!-- Header Navigation and Actions -->
                            <div class="flex justify-between items-center mb-4">
                                <!-- Back Button (Left) -->
                                <Link
                                    :href="route('selection-lineup.index')"
                                    class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    <i class="fas fa-arrow-left mr-2"></i> Back
                                </Link>

                                <!-- Print Button (Right) -->
                                <button
                                    id="print-button"
                                    @click="print"
                                    class="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors"
                                >
                                    <i class="fas fa-print mr-2"></i> Print
                                </button>
                            </div>

                            <div class="flex items-center gap-3">
                                <img
                                    :src="asset('img/cmulogo.png')"
                                    alt="CMU Logo"
                                    class="w-10 h-10 sm:w-12 sm:h-12"
                                />
                                <div class="flex flex-col">
                                    <h5 class="text-gray-900 text-lg">
                                        Republic of the Philippines
                                    </h5>
                                    <h5 class="font-bold text-gray-900 text-lg">
                                        Central Mindanao University
                                    </h5>
                                    <h5 class="text-gray-900 text-lg">
                                        University Town, Musuan, Bukidnon
                                    </h5>
                                </div>
                            </div>

                            <div
                                class="flex items-center justify-center flex-col mt-4"
                            >
                                <h5 class="font-bold text-gray-900 text-lg">
                                    SELECTION LINEUP
                                </h5>
                                <h5 class="text-gray-900 text-lg">
                                    {{ jobListing.position.position_name }}
                                </h5>
                                <h5 class="text-gray-900 text-lg">
                                    SG-{{
                                        jobListing.position.salary_grade
                                            .salary_grade_number
                                    }}
                                </h5>
                                <h5 class="text-gray-900 text-lg">
                                    Item No.
                                    {{ jobListing.position.item_number }}
                                </h5>
                            </div>
                        </div>

                        <!-- Status Filter -->
                        <div class="p-4 bg-gray-50 border-b no-print">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <label
                                        class="mr-2 text-gray-700 font-medium"
                                        >Filter by status:</label
                                    >
                                    <select
                                        v-model="statusFilter"
                                        class="rounded border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                    >
                                        <option
                                            v-for="option in statusOptions"
                                            :key="option.value"
                                            :value="option.value"
                                        >
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </div>
                                <div class="text-sm text-gray-600">
                                    Showing {{ filteredApplicants.length }} of
                                    {{ applicants ? applicants.length : 0 }}
                                    applicants
                                </div>
                            </div>
                        </div>

                        <div class="card-body p-0 overflow-x-visible w-full">
                            <div
                                v-if="
                                    filteredApplicants &&
                                    filteredApplicants.length > 0
                                "
                                class="p-4 relative"
                            >
                                <table
                                    class="w-full border-collapse border border-gray-300"
                                >
                                    <thead>
                                        <tr class="bg-gray-50">
                                            <th
                                                class="border border-gray-300 px-4 py-2 text-left"
                                            >
                                                Name of Applicant
                                            </th>
                                            <th
                                                class="border border-gray-300 px-4 py-2 text-left"
                                            >
                                                Education
                                                <div
                                                    v-if="
                                                        jobListing.position
                                                            .minimum_requirement
                                                            ?.education_level
                                                    "
                                                    class="text-xs font-normal mt-1"
                                                >
                                                    {{
                                                        jobListing.position
                                                            .minimum_requirement
                                                            .education_level
                                                    }}
                                                    relevant to the Job
                                                </div>
                                            </th>
                                            <th
                                                class="border border-gray-300 px-4 py-2 text-left"
                                            >
                                                Training
                                                <div
                                                    v-if="
                                                        jobListing.position
                                                            .minimum_requirement
                                                            ?.training_hours
                                                    "
                                                    class="text-xs font-normal mt-1"
                                                >
                                                    {{
                                                        jobListing.position
                                                            .minimum_requirement
                                                            .training_hours
                                                    }}
                                                    hours relevant training
                                                </div>
                                            </th>
                                            <th
                                                class="border border-gray-300 px-4 py-2 text-left"
                                            >
                                                Experience
                                                <div
                                                    v-if="
                                                        jobListing.position
                                                            .minimum_requirement
                                                            ?.years_experience
                                                    "
                                                    class="text-xs font-normal mt-1"
                                                >
                                                    {{
                                                        jobListing.position
                                                            .minimum_requirement
                                                            .years_experience
                                                    }}
                                                    year(s) relevant experience
                                                </div>
                                            </th>
                                            <th
                                                class="border border-gray-300 px-4 py-2 text-left"
                                            >
                                                Eligibility
                                                <div
                                                    v-if="
                                                        jobListing.position
                                                            .minimum_requirement
                                                            ?.eligibility
                                                    "
                                                    class="text-xs font-normal mt-1"
                                                >
                                                    {{
                                                        jobListing.position
                                                            .minimum_requirement
                                                            .eligibility
                                                    }}
                                                </div>
                                            </th>
                                            <th
                                                class="border border-gray-300 px-4 py-2 text-left no-print"
                                            >
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="applicant in filteredApplicants"
                                            :key="applicant.application_id"
                                        >
                                            <td
                                                class="border border-gray-300 px-4 py-2 uppercase"
                                            >
                                                {{ applicant.applicant_name.toUpperCase() }}
                                            </td>
                                            <td
                                                class="border border-gray-300 px-4 py-2"
                                            >
                                                <div v-if="applicant.education">
                                                    <!-- Process education data consistently -->
                                                    <div v-for="(edu, index) in ensureArray(applicant.education)"
                                                         :key="index"
                                                         class="mb-2 pb-2"
                                                         :class="{'border-b border-gray-200': index < ensureArray(applicant.education).length - 1}">
                                                        <p class="text-sm">
                                                            {{ edu.course || "N/A" }}
                                                        </p>
                                                        <p v-if="edu.school" class="text-xs">
                                                            {{ edu.school }}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span
                                                    v-else
                                                    class="text-gray-400"
                                                    >N/A</span
                                                >
                                            </td>
                                            <td
                                                class="border border-gray-300 px-4 py-2"
                                            >
                                                <div v-if="applicant.training">
                                                    <!-- Process training data consistently -->
                                                    <div v-for="(train, index) in ensureArray(applicant.training)"
                                                         :key="index"
                                                         class="mb-2 pb-2"
                                                         :class="{'border-b border-gray-200': index < ensureArray(applicant.training).length - 1}">
                                                        <p>
                                                            {{ train.hours || "N/A" }} hours
                                                        </p>
                                                        <p class="text-sm">
                                                            {{ train.details || "No details available" }}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span
                                                    v-else
                                                    class="text-gray-400"
                                                    >N/A</span
                                                >
                                            </td>
                                            <td
                                                class="border border-gray-300 px-4 py-2"
                                            >
                                                <div v-if="applicant.experience">
                                                    <!-- Process experience data consistently -->
                                                    <div v-for="(exp, index) in ensureArray(applicant.experience)"
                                                         :key="index"
                                                         class="mb-2 pb-2"
                                                         :class="{'border-b border-gray-200': index < ensureArray(applicant.experience).length - 1}">
                                                        <p>
                                                            {{ exp.years || "N/A" }}
                                                        </p>
                                                        <p class="text-sm">
                                                            {{ exp.details || "No details available" }}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span
                                                    v-else
                                                    >N/A</span
                                                >
                                            </td>
                                            <td
                                                class="border border-gray-300 px-4 py-2"
                                            >
                                                <!-- Process eligibility data consistently -->
                                                <div v-if="applicant.eligibility">
                                                    <ul class="list-disc pl-4">
                                                        <li v-for="(elig, index) in ensureArray(applicant.eligibility)"
                                                            :key="index"
                                                            class="mb-1">
                                                            {{ elig }}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <span v-else class="text-gray-400">N/A</span>
                                            </td>
                                            <td
                                                class="border border-gray-300 px-4 py-2 no-print"
                                            >
                                                <span
                                                    class="px-2 py-1 rounded text-xs font-medium"
                                                    :class="{
                                                        'bg-green-100 text-green-800':
                                                            applicant.status ===
                                                            'Qualified',
                                                        'bg-yellow-100 text-yellow-800':
                                                            applicant.status ===
                                                            'Pending',
                                                        'bg-red-100 text-red-800':
                                                            applicant.status ===
                                                            'Rejected',
                                                        'bg-gray-100':
                                                            ![
                                                                'Qualified',
                                                                'Pending',
                                                                'Rejected',
                                                            ].includes(
                                                                applicant.status,
                                                            ),
                                                    }"
                                                >
                                                    {{ applicant.status }}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else class="p-8 text-center">
                                <div class="text-gray-400 text-lg mb-2">
                                    <i class="fas fa-users-slash fa-3x"></i>
                                </div>
                                <p class="text-gray-600 mb-1">
                                    No
                                    {{
                                        statusFilter !== "All"
                                            ? statusFilter.toLowerCase()
                                            : ""
                                    }}
                                    applicants found for this position.
                                </p>
                                <p class=" text-sm">
                                    {{
                                        statusFilter !== "All"
                                            ? "Try changing the filter above or "
                                            : ""
                                    }}Check back later for new applications.
                                </p>
                            </div>
                        </div>

                        <!-- Signature Section -->
                        <div
                            class="card-footer border-t p-6 print:block"
                            v-if="!isIndex"
                        >
                            <div class="print-signatures mt-12">
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-8"
                                >
                                    <div class="flex flex-col items-center">
                                        <div class="flex flex-col items-center">
                                            <p class="font-medium mb-2">
                                                Prepared by:
                                            </p>
                                            <input
                                              v-model="preparedBy"
                                              type="text"
                                              class="text-sm text-center w-48 bg-transparent border-0 border-b-2 border-black focus:border-blue-500 focus:outline-none placeholder:italic placeholder-gray-400 mb-1"
                                              placeholder="Signature/Name"
                                            />
                                            <p class="font-medium mb-2 ">
                                                HRM Clerk
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex flex-col items-center">
                                        <div class="flex flex-col items-center">
                                            <p class="font-medium mb-2">
                                                Certified Correct by:
                                            </p>
                                            <input
                                              v-model="certifiedBy"
                                              type="text"
                                              class="text-sm text-center w-48 bg-transparent border-0 border-b-2 border-black focus:border-blue-500 focus:outline-none placeholder:italic placeholder-gray-400 mb-1"
                                              placeholder="Signature/Name"
                                            />
                                            <p class="font-medium mb-2 ">
                                                Director, OHRM
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </HRLayout>
</template>

<style scoped>
@media print {
    .card-body, .card-body > div, .card-body > div > table, .card-body > table, table {
        width: 100% !important;
        max-width: 100vw !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    @page {
        margin: 0mm;
    }

    html,
    body {
        margin: 0 !important;
        padding: 0 !important;
    }

    #print-button,
    button,
    nav,
    header,
    a,
    .no-print {
        display: none !important;
    }

    /* Hide the HRLayout header and main wrapper padding */
    :deep(header),
    :deep(nav) {
        display: none !important;
    }

    :deep(main),
    :deep(.max-w-9xl) {
        padding: 0 !important;
        margin: 0 !important;
        max-width: 100% !important;
    }

    /* Reset all containers and ensure proper centering */
    .container-fluid,
    .py-1 {
        padding: 0 !important;
        margin: 0 !important;
        width: 100% !important;
    }

    /* Reset card */
    .card {
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        margin: 0 auto !important;
        width: 90% !important; /* Control width of the whole content */
    }

    .card-header {
        padding: 0.5cm !important;
        padding-bottom: 0.25cm !important;
        text-align: center !important;
    }

    .card-body {
        padding: 0.5cm !important;
        overflow-x: visible !important;
    }

    /* Center table and adjust dimensions */
    .card-body > div {
        display: flex !important;
        justify-content: center !important;
        width: 100% !important;
    }

    /* Table formatting */
    th,
    td {
        border: 1px solid #000 !important;
        padding: 6px 8px !important;
        text-align: left !important;
        word-wrap: break-word !important;
    }

    th {
        background-color: #f8f8f8 !important;
        font-weight: bold !important;
    }

    /* Adjust column widths */
    table th:nth-child(1),
    table td:nth-child(1) {
        width: 25% !important;
    } /* Name */
    table th:nth-child(2),
    table td:nth-child(2) {
        width: 25% !important;
    } /* Education */
    table th:nth-child(3),
    table td:nth-child(3) {
        width: 20% !important;
    } /* Training */
    table th:nth-child(4),
    table td:nth-child(4) {
        width: 15% !important;
    } /* Experience */
    table th:nth-child(5),
    table td:nth-child(5) {
        width: 15% !important;
    } /* Eligibility */

    /* Signature section */
    .print-signatures {
        padding-top: 2cm !important;
        width: 100% !important;
    }

    .print-signatures .grid {
        display: flex !important;
        justify-content: space-between !important;
        width: 100% !important;
        margin: 0 auto !important;
    }

    .print-signatures .flex {
        width: 48% !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
    }

    /* Background color */
    body {
        background-color: white !important;
    }

    /* Special print class */
    .print\:block {
        display: block !important;
    }

    /* Remove absolute layout that could cause issues */
    #selection-lineup {
        position: static !important;
        margin-top: 0 !important;
        overflow: visible !important;
    }

    /* Ensure the overflow is visible */
    .overflow-x-auto {
        overflow: visible !important;
    }
}
</style>
