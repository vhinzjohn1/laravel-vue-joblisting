<script setup>
import { ref, computed } from "vue";
import { Head, usePage, router } from "@inertiajs/vue3";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import Collapsible from "@/Components/Collapsible.vue";
import Modal from "@/Components/Modal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";

// Job Listings
const batches = usePage().props.batches;

console.log('This is the props', usePage().props);

// Modal state
const showViewModal = ref(false);
const selectedJob = ref(null);

// Search and pagination state
const searchQuery = ref("");
const searchQueryNonPlantilla = ref("");

// Pagination state for plantilla batches
const batchPagination = ref({});
batches.forEach(batch => {
    batchPagination.value[batch.batch_id] = {
        currentPage: 1,
        perPage: 10
    };
});

// Pagination state for non-plantilla jobs
const nonPlantillaPagination = ref({
    currentPage: 1,
    perPage: 10
});

// Filter batches into plantilla and non-plantilla
const filteredPlantillaJobs = computed(() => {
    if (!searchQuery.value) {
        return batches.filter(batch => batch.is_plantilla === 1);
    }
    const query = searchQuery.value.toLowerCase();
    return batches.filter(batch => batch.is_plantilla === 1).map(batch => ({
        ...batch,
        job_listings: batch.job_listings.filter(job =>
            (job.title && job.title.toLowerCase().includes(query)) ||
            (job.position?.position_name && job.position.position_name.toLowerCase().includes(query)) ||
            (job.position?.item_number && job.position.item_number.toLowerCase().includes(query)) ||
            (job.position?.category && job.position.category.toLowerCase().includes(query)) ||
            (job.position?.salary_grade?.salary_grade && job.position.salary_grade.salary_grade.toString().toLowerCase().includes(query)) ||
            (job.status && job.status.toLowerCase().includes(query)) ||
            (job.place_assigned && job.place_assigned.toLowerCase().includes(query))
        )
    }));
});

// Update the plantillaBatches computed property to use filteredPlantillaJobs
const plantillaBatches = computed(() => {
    return filteredPlantillaJobs.value;
});

// Get all non-plantilla jobs from all batches
const allNonPlantillaJobs = computed(() => {
    const nonPlantillaBatches = batches.filter(batch => batch.is_plantilla === 0);
    return nonPlantillaBatches.flatMap(batch => batch.job_listings || []);
});

// Filtered non-plantilla jobs with search
const filteredNonPlantillaJobs = computed(() => {
    if (!searchQueryNonPlantilla.value) {
        return allNonPlantillaJobs.value;
    }
    const query = searchQueryNonPlantilla.value.toLowerCase();
    return allNonPlantillaJobs.value.filter(job => {
        return (
            (job.title && job.title.toLowerCase().includes(query)) ||
            (job.position?.position_name && job.position.position_name.toLowerCase().includes(query)) ||
            (job.position?.category && job.position.category.toLowerCase().includes(query)) ||
            (job.status && job.status.toLowerCase().includes(query))
        );
    });
});

// Paginated non-plantilla jobs
const paginatedNonPlantillaJobs = computed(() => {
    const start = (nonPlantillaPagination.value.currentPage - 1) * nonPlantillaPagination.value.perPage;
    return filteredNonPlantillaJobs.value.slice(start, start + nonPlantillaPagination.value.perPage);
});

// Total pages for non-plantilla jobs
const totalNonPlantillaPages = computed(() => {
    return Math.ceil(filteredNonPlantillaJobs.value.length / nonPlantillaPagination.value.perPage);
});

// Pagination methods for non-plantilla jobs
const previousNonPlantillaPage = () => {
    if (nonPlantillaPagination.value.currentPage > 1) {
        nonPlantillaPagination.value.currentPage--;
    }
};

const nextNonPlantillaPage = () => {
    if (nonPlantillaPagination.value.currentPage < totalNonPlantillaPages.value) {
        nonPlantillaPagination.value.currentPage++;
    }
};

// Pagination methods for plantilla batches
const paginatedJobs = (batch) => {
    const start = (batchPagination.value[batch.batch_id].currentPage - 1) * batchPagination.value[batch.batch_id].perPage;
    return batch.job_listings.slice(start, start + batchPagination.value[batch.batch_id].perPage);
};

const totalPages = (batch) => {
    return Math.ceil(batch.job_listings.length / batchPagination.value[batch.batch_id].perPage);
};

const previousPage = (batch) => {
    if (batchPagination.value[batch.batch_id].currentPage > 1) {
        batchPagination.value[batch.batch_id].currentPage--;
    }
};

const nextPage = (batch) => {
    if (batchPagination.value[batch.batch_id].currentPage < totalPages(batch)) {
        batchPagination.value[batch.batch_id].currentPage++;
    }
};

// View job details
const viewJobDetails = (job) => {
    selectedJob.value = job;
    showViewModal.value = true;
};

// Format date
const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

// Add this with other methods
const navigateToRegister = () => {
    router.visit(route('register'));
};
</script>

<template>
    <Head>
        <title>CMU Job Listing</title>
        <meta name="description" content="Streamlined HR job posting and application management system. Empower HR teams with efficient tools while making it easier for applicants to find and apply for opportunities." />
    </Head>

    <GuestLayout :can-login="true" :can-register="true">
        <div class="relative w-full py-12">
            <div class="max-w-8xl mx-auto sm:px-6 lg:px-8">
                <!-- Plantilla Job Listings Section -->
                <Collapsible :initially-open="true" class="mb-8">
                    <template #header>
                        <div class="flex items-center justify-center flex-col w-full space-y-2">
                            <h1 class="text-xl font-bold uppercase tracking-wider">
                                Plantilla Positions
                            </h1>
                            <div
                                class="mx-auto w-24 h-1 bg-green-600 rounded-full"
                            ></div>
                        </div>
                    </template>

                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="px-6 text-gray-900">
                            <div v-if="plantillaBatches.length === 0" class="text-center py-8 text-gray-500">
                                No plantilla job listings available
                            </div>

                            <div v-else class="space-y-4">
                                <div v-for="batch in plantillaBatches" :key="batch.batch_id" class="mt-4">
                                    <Collapsible
                                        :title="`${batch.batch_name} - ${batch.batch_code}`"
                                        :initially-open="true"
                                    >
                                        <template #header>
                                            <div class="flex items-center justify-between w-full">
                                                <div>
                                                    <h3 class="text-lg font-semibold">{{ batch.batch_name }} - {{ batch.batch_code }}</h3>
                                                    <p class="text-sm text-gray-500">
                                                        {{ batch.job_listings.length }} job listings
                                                    </p>
                                                </div>
                                                <div class="flex items-center gap-2">
                                                    <span class="text-sm text-gray-800">
                                                        {{ formatDate(batch.post_date) }} -
                                                        {{ formatDate(batch.deadline) }}
                                                    </span>
                                                </div>
                                            </div>
                                        </template>

                                        <!-- Search Bar -->
                                        <div class="mb-4">
                                            <TextInput
                                                v-model="searchQuery"
                                                type="text"
                                                placeholder="Search positions..."
                                                class="w-full"
                                            />
                                        </div>

                                        <!-- Job Listings Table -->
                                        <div class="overflow-x-auto">
                                            <table class="min-w-full border-collapse">
                                                <thead>
                                                    <tr>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0">No.</th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0">Title</th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0">Item Number</th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0">Salary Grade</th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0">Category</th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0" colspan="4">Qualification Standards</th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0">Closing Date</th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0">Date Created</th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0">Place of Assignment</th>
                                                    </tr>
                                                    <tr>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm"></th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm"></th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm"></th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm"></th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm"></th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm">Education</th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm">Training</th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm">Experience</th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm">Eligibility</th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm"></th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm"></th>
                                                        <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="paginatedJobs(batch).length === 0" class="border-b">
                                                        <td colspan="13" class="border border-gray-300 px-3 py-2 text-sm text-center text-gray-500">
                                                            No matching job listings found
                                                        </td>
                                                    </tr>
                                                    <tr v-for="(job, index) in paginatedJobs(batch)"
                                                        :key="job.job_listing_id"
                                                        class="border-b transition-all duration-200 cursor-pointer hover:bg-blue-100 hover:shadow-md"
                                                        @click="viewJobDetails(job)"
                                                    >
                                                        <td class="border border-gray-300 px-3 py-2 text-sm">
                                                            {{ (batchPagination[batch.batch_id].currentPage - 1) * batchPagination[batch.batch_id].perPage + index + 1 }}
                                                        </td>
                                                        <td class="border border-gray-300 px-3 py-2 text-sm">
                                                            <div class="flex items-center space-x-2">
                                                                <span>{{ job.title }}</span>
                                                                <button
                                                                    @click.stop="viewJobDetails(job)"
                                                                    class="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-0"
                                                                >
                                                                    <i class="fas fa-eye"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td class="border border-gray-300 px-3 py-2 text-sm">
                                                            {{ job.position?.item_number === '' ? 'CoS/Job Order' : job.position?.item_number || '-' }}
                                                        </td>
                                                        <td class="border border-gray-300 px-3 py-2 text-sm">
                                                            {{ job.position?.salary_grade?.salary_grade || '-' }}
                                                        </td>
                                                        <td class="border border-gray-300 px-3 py-2 text-sm">
                                                            {{ job.position?.category || '-' }}
                                                        </td>
                                                        <td class="border border-gray-300 px-3 py-2 text-sm">
                                                            {{ job.position?.minimum_requirement?.education_level || '-' }}
                                                        </td>
                                                        <td class="border border-gray-300 px-3 py-2 text-sm">
                                                            {{ job.position?.minimum_requirement?.training_hours ? job.position?.minimum_requirement?.training_hours + ' hours' : '-' }}
                                                        </td>
                                                        <td class="border border-gray-300 px-3 py-2 text-sm">
                                                            {{ job.position?.minimum_requirement?.years_experience ? job.position?.minimum_requirement?.years_experience + ' year(s)' : '-' }}
                                                        </td>
                                                        <td class="border border-gray-300 px-3 py-2 text-sm">
                                                            {{ job.position?.minimum_requirement?.eligibility || '-' }}
                                                        </td>
                                                        <td class="border border-gray-300 px-3 py-2 text-sm">
                                                            {{ formatDate(job.closing_date) }}
                                                        </td>
                                                        <td class="border border-gray-300 px-3 py-2 text-sm">
                                                            {{ formatDate(job.created_at) }}
                                                        </td>
                                                        <td class="border border-gray-300 px-3 py-2 text-sm">
                                                            {{ job.place_assigned || '-' }}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <!-- Pagination -->
                                        <div class="flex items-center justify-between mt-4">
                                            <div class="text-sm text-gray-700">
                                                Showing page {{ batchPagination[batch.batch_id].currentPage }} of {{ totalPages(batch) }}
                                            </div>
                                            <div class="flex gap-2">
                                                <button
                                                    @click="previousPage(batch)"
                                                    :disabled="batchPagination[batch.batch_id].currentPage === 1"
                                                    class="px-3 py-1 border rounded-md disabled:opacity-50"
                                                >
                                                    Previous
                                                </button>
                                                <button
                                                    @click="nextPage(batch)"
                                                    :disabled="batchPagination[batch.batch_id].currentPage === totalPages(batch)"
                                                    class="px-3 py-1 border rounded-md disabled:opacity-50"
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </Collapsible>
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapsible>

                <!-- Non-Plantilla Job Listings Section -->
                <Collapsible :initially-open="true">
                    <template #header>
                        <div class="flex items-center justify-center flex-col w-full space-y-2">
                            <h1 class="text-xl font-bold uppercase tracking-wider">
                                Contract of Service & Job Order Positions
                            </h1>
                            <div
                                class="mx-auto w-24 h-1 bg-green-600 rounded-full"
                            ></div>
                        </div>
                    </template>

                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="p-6 text-gray-900">
                            <!-- Search Bar -->
                            <div class="mb-4">
                                <TextInput
                                    v-model="searchQueryNonPlantilla"
                                    type="text"
                                    placeholder="Search positions..."
                                    class="w-full"
                                />
                            </div>

                            <div v-if="allNonPlantillaJobs.length === 0" class="text-center py-8 text-gray-500">
                                No non-plantilla job listings available
                            </div>

                            <div v-else>
                                <!-- Job Listings Table -->
                                <div class="overflow-x-auto">
                                    <table class="min-w-full border-collapse">
                                        <thead>
                                            <tr>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0">No.</th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0">Title</th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0">Item Number</th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0">Salary Grade</th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0">Category</th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0" colspan="4">Qualification Standards</th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0">Closing Date</th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0">Date Created</th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm sticky top-0">Place of Assignment</th>
                                            </tr>
                                            <tr>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm"></th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm"></th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm"></th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm"></th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm"></th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm">Education</th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm">Training</th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm">Experience</th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm">Eligibility</th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm"></th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm"></th>
                                                <th class="border border-gray-300 px-3 py-2 bg-gray-100 font-medium text-sm"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-if="paginatedNonPlantillaJobs.length === 0" class="border-b">
                                                <td colspan="13" class="border border-gray-300 px-3 py-2 text-sm text-center text-gray-500">
                                                    No matching job listings found
                                                </td>
                                            </tr>
                                            <tr v-for="(job, index) in paginatedNonPlantillaJobs"
                                                :key="job.job_listing_id"
                                                class="border-b transition-all duration-200 cursor-pointer hover:bg-blue-100 hover:shadow-md"
                                                @click="viewJobDetails(job)"
                                            >
                                                <td class="border border-gray-300 px-3 py-2 text-sm">
                                                    {{ (nonPlantillaPagination.currentPage - 1) * nonPlantillaPagination.perPage + index + 1 }}
                                                </td>
                                                <td class="border border-gray-300 px-3 py-2 text-sm">
                                                    <div class="flex items-center space-x-2">
                                                        <span>{{ job.title }}</span>
                                                        <button
                                                            @click.stop="viewJobDetails(job)"
                                                            class="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-0"
                                                        >
                                                            <i class="fas fa-eye"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td class="border border-gray-300 px-3 py-2 text-sm">
                                                    {{ job.position?.item_number === '' ? 'CoS/Job Order' : job.position?.item_number || '-' }}
                                                </td>
                                                <td class="border border-gray-300 px-3 py-2 text-sm">
                                                    {{ job.position?.salary_grade?.salary_grade || '-' }}
                                                </td>
                                                <td class="border border-gray-300 px-3 py-2 text-sm">
                                                    {{ job.position?.category || '-' }}
                                                </td>
                                                <td class="border border-gray-300 px-3 py-2 text-sm">
                                                    {{ job.position?.minimum_requirement?.education_level || '-' }}
                                                </td>
                                                <td class="border border-gray-300 px-3 py-2 text-sm">
                                                    {{ job.position?.minimum_requirement?.training_hours ? job.position?.minimum_requirement?.training_hours + ' hours' : '-' }}
                                                </td>
                                                <td class="border border-gray-300 px-3 py-2 text-sm">
                                                    {{ job.position?.minimum_requirement?.years_experience ? job.position?.minimum_requirement?.years_experience + ' year(s)' : '-' }}
                                                </td>
                                                <td class="border border-gray-300 px-3 py-2 text-sm">
                                                    {{ job.position?.minimum_requirement?.eligibility || '-' }}
                                                </td>
                                                <td class="border border-gray-300 px-3 py-2 text-sm">
                                                    {{ formatDate(job.closing_date) }}
                                                </td>
                                                <td class="border border-gray-300 px-3 py-2 text-sm">
                                                    {{ formatDate(job.created_at) }}
                                                </td>

                                                <td class="border border-gray-300 px-3 py-2 text-sm">
                                                    {{ job.place_assigned || '-' }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <!-- Pagination -->
                                <div class="flex items-center justify-between mt-4">
                                    <div class="text-sm text-gray-700">
                                        Showing page {{ nonPlantillaPagination.currentPage }} of {{ totalNonPlantillaPages }}
                                    </div>
                                    <div class="flex gap-2">
                                        <button
                                            @click="previousNonPlantillaPage"
                                            :disabled="nonPlantillaPagination.currentPage === 1"
                                            class="px-3 py-1 border rounded-md disabled:opacity-50"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            @click="nextNonPlantillaPage"
                                            :disabled="nonPlantillaPagination.currentPage === totalNonPlantillaPages"
                                            class="px-3 py-1 border rounded-md disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapsible>
            </div>
        </div>

        <!-- View Job Details Modal -->
        <Modal
            :show="showViewModal"
            @close="showViewModal = false"
            :max-width="'4xl'"
        >
            <div v-if="selectedJob" class="p-6">
                <h2 class="text-2xl font-bold mb-4">{{ selectedJob.title }}</h2>

                <!-- Basic Information -->
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-3">Basic Information</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm text-gray-600">Position</p>
                            <p class="font-medium">{{ selectedJob.position?.position_name }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Category</p>
                            <p class="font-medium">{{ selectedJob.position?.category || '-' }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Item Number</p>
                            <p class="font-medium">{{ selectedJob.position?.item_number || 'CoS/Job Order' }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Salary Grade</p>
                            <p class="font-medium">{{ selectedJob.position?.salary_grade?.salary_grade || '-' }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Closing Date</p>
                            <p class="font-medium">{{ formatDate(selectedJob.closing_date) }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Status</p>
                            <p class="font-medium">{{ selectedJob.status }}</p>
                        </div>
                    </div>
                </div>

                <!-- Job Description -->
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-3">Job Description</h3>
                    <p class="text-gray-700 whitespace-pre-line">{{ selectedJob.description }}</p>
                </div>

                <!-- Minimum Requirements -->
                <div v-if="selectedJob.position?.minimum_requirement" class="mb-6">
                    <h3 class="text-lg font-semibold mb-3">Minimum Requirements</h3>
                    <ul class="list-disc list-inside space-y-2">
                        <li v-if="selectedJob.position.minimum_requirement.education_level">
                            <span class="font-medium">Education:</span>
                            {{ selectedJob.position.minimum_requirement.education_level }}
                        </li>
                        <li v-if="selectedJob.position.minimum_requirement.eligibility">
                            <span class="font-medium">Eligibility:</span>
                            {{ selectedJob.position.minimum_requirement.eligibility }}
                        </li>
                        <li v-if="selectedJob.position.minimum_requirement.training_hours">
                            <span class="font-medium">Training Required:</span>
                            {{ selectedJob.position.minimum_requirement.training_hours }} hours
                        </li>
                        <li v-if="selectedJob.position.minimum_requirement.years_experience">
                            <span class="font-medium">Experience Required:</span>
                            {{ selectedJob.position.minimum_requirement.years_experience }} year(s)
                        </li>
                    </ul>
                </div>

                <!-- Required Documents -->
                <div v-if="selectedJob.required_documents?.length" class="mb-6">
                    <h3 class="text-lg font-semibold mb-3">Required Documents</h3>
                    <ul class="list-disc list-inside space-y-2">
                        <li v-for="doc in selectedJob.required_documents" :key="doc.required_document_id">
                            {{ doc.document_name }}
                        </li>
                    </ul>
                </div>

                <!-- Modal Footer -->
                <div class="flex justify-end gap-4 mt-6">
                    <button
                        @click="showViewModal = false"
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                        Close
                    </button>
                    <PrimaryButton @click="navigateToRegister">
                        Apply Now
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    </GuestLayout>
</template>

<style scoped>
.overflow-x-auto {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}
</style>