<template>
    <Head :title="`${jobListing.title}`" />

    <HRLayout>
        <template #header>
            <Header :title="`Applications for ${jobListing.title}`" />
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
                                    <button
                                        @click="
                                            $inertia.get(
                                                route('applications.index'),
                                            )
                                        "
                                        class="flex items-center text-gray-600 hover:text-gray-900 mb-2"
                                    >
                                        <i class="fas fa-arrow-left mr-2"></i>
                                        Back to Job Listings
                                    </button>
                                    <h1
                                        class="text-2xl font-bold uppercase tracking-wider sm:mb-0"
                                    >
                                        Applications for {{ jobListing.title }}
                                    </h1>
                                    <div class="mt-1 flex items-center">
                                        <p class="text-gray-600 mt-1 mr-6">
                                            {{ jobListing.position?.position_name }}
                                        </p>
                                        <span class="block font-semibold text-gray-700 mr-2">
                                            Closing Date:
                                        </span>
                                        <span class="text-gray-600">
                                            {{ formatDate(jobListing.closing_date) }}
                                        </span>
                                    </div>
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
                                            placeholder="Search applicants..."
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
                        <!-- Schedule Selected Button -->
                        <div v-if="selectedApplications.length > 0" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <i class="fas fa-calendar-alt text-green-600 mr-2"></i>
                                    <span class="text-green-800 font-medium">
                                        {{ selectedApplications.length }} applicant{{ selectedApplications.length > 1 ? 's' : '' }} selected
                                    </span>
                                </div>
                                <button
                                    @click="openScheduleModal"
                                    class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                                >
                                    <i class="fas fa-calendar-plus mr-2"></i>
                                    Schedule Selected
                                </button>
                            </div>
                        </div>

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
                                There are no applications for this job listing yet.
                            </p>
                        </div>

                        <div v-else>
                            <div class="overflow-x-auto">
                                <table class="min-w-full border-collapse">
                                    <thead class="bg-gray-100">
                                        <tr>
                                            <th class="px-4 py-2 border-b border-gray-200 text-gray-700 font-medium text-center w-12">
                                                <input
                                                    type="checkbox"
                                                    :checked="allSelected"
                                                    @change="toggleSelectAll"
                                                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                />
                                            </th>
                                            <th class="px-4 py-2 border-b border-gray-200 text-gray-700 font-medium text-left">
                                                First Name
                                            </th>
                                            <th class="px-4 py-2 border-b border-gray-200 text-gray-700 font-medium text-left">
                                                Last Name
                                            </th>
                                            <th class="px-4 py-2 border-b border-gray-200 text-gray-700 font-medium text-left">
                                                Email
                                            </th>
                                            <th class="px-4 py-2 border-b border-gray-200 text-gray-700 font-medium text-left">
                                                Applied Date
                                            </th>
                                            <th class="px-4 py-2 border-b border-gray-200 text-gray-700 font-medium text-left">
                                                Status
                                            </th>
                                            <th class="px-4 py-2 border-b border-gray-200 text-gray-700 font-medium text-left">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="application in filteredApplications"
                                            :key="application.application_id"
                                            @click="viewDetails(application.application_id)"
                                            class="hover:bg-gray-50 cursor-pointer"
                                        >
                                            <td class="px-4 py-2 border-b border-gray-200 text-center" @click.stop>
                                                <input
                                                    type="checkbox"
                                                    v-model="selectedApplications"
                                                    :value="application.application_id"
                                                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                />
                                            </td>
                                            <td class="px-4 py-2 border-b border-gray-200">
                                                {{ application.user?.user_detail?.firstname || 'N/A' }}
                                            </td>
                                            <td class="px-4 py-2 border-b border-gray-200">
                                                {{ application.user?.user_detail?.lastname || 'N/A' }}
                                            </td>
                                            <td class="px-4 py-2 border-b border-gray-200">
                                                {{ application.user?.email || 'N/A' }}
                                            </td>
                                            <td class="px-4 py-2 border-b border-gray-200">
                                                {{ formatDate(application.created_at) }}
                                            </td>
                                            <td class="px-4 py-2 border-b border-gray-200">
                                                <span
                                                    class="px-2 py-1 text-xs rounded-full"
                                                    :class="getStatusBadgeClass(application.status)"
                                                >
                                                    {{ application.status }}
                                                </span>
                                            </td>
                                            <td class="px-4 py-2 border-b border-gray-200">
                                                <button
                                                    @click.stop="viewDetails(application.application_id)"
                                                    class="px-3 py-1 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition-colors text-sm font-medium"
                                                >
                                                    View
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

        <!-- Schedule Modal -->
        <Modal
            :show="showScheduleModal"
            title="Schedule Interview"
            @close="closeScheduleModal"
            maxWidth="2xl"
        >
            <div class="p-6">
                <form @submit.prevent="createSchedule" class="space-y-4">
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                v-model="scheduleForm.title"
                                class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                v-model="scheduleForm.location"
                                class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Date & Time</label>
                            <input
                                type="datetime-local"
                                v-model="scheduleForm.schedule_date"
                                :max="getMaxDate()"
                                class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                required
                            />
                            <p class="mt-1 text-xs text-gray-500">
                                Job closing date: {{ formatDate(jobListing.closing_date) }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Application Status</label>
                            <select
                                v-model="scheduleForm.application_status"
                                class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                required
                            >
                                <option value="">Select Status</option>
                                <option v-for="status in statuses" :key="status" :value="status">
                                    {{ status }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            v-model="scheduleForm.description"
                            rows="3"
                            class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            required
                        ></textarea>
                    </div>

                    <div class="bg-green-50 p-4 rounded-lg">
                        <h4 class="text-sm font-medium text-green-800 mb-2">Selected Applicants ({{ selectedApplications.length }})</h4>
                        <div class="space-y-2 max-h-32 overflow-y-auto">
                            <div
                                v-for="applicationId in selectedApplications"
                                :key="applicationId"
                                class="text-sm text-green-700"
                            >
                                {{ getApplicantName(applicationId) }}
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end mt-6 space-x-3">
                        <button
                            type="button"
                            @click="closeScheduleModal"
                            class="px-4 py-2 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <PrimaryButton type="submit" :disabled="isLoading" :loading="isLoading">
                            Create Schedule
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    </HRLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { Head, router } from "@inertiajs/vue3";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import CustomSelect from "@/Components/CustomSelect.vue";
import Modal from "@/Components/Modal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";

const props = defineProps({
    jobListing: {
        type: Object,
        required: true,
    },
    applications: {
        type: Array,
        required: true,
    },
    statuses: {
        type: Array,
        required: true,
    },
});

const jobListing = ref(props.jobListing);
const applications = ref(props.applications);
const searchQuery = ref("");
const statusFilter = ref("");
const statuses = ref(props.statuses);

// Selection state
const selectedApplications = ref([]);
const showScheduleModal = ref(false);
const isLoading = ref(false);

// Schedule form
const scheduleForm = ref({
    title: "",
    description: "",
    schedule_date: "",
    location: "",
    application_status: "",
    participants: []
});

const resetFilters = () => {
    statusFilter.value = "";
    searchQuery.value = "";
    selectedApplications.value = [];
};

const viewDetails = (applicationId) => {
    // Redirect to the application details page
    router.visit(route("applications.show", applicationId));
};

const filteredApplications = computed(() => {
    let filtered = applications.value;

    // Apply status filter
    if (statusFilter.value) {
        filtered = filtered.filter((app) => app.status === statusFilter.value);
    }

    // Apply search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter((application) => {
            // Safely access nested properties
            const userEmail = application.user?.email || "";
            const status = application.status || "";
            const firstName = application.user?.user_detail?.firstname || "";
            const lastName = application.user?.user_detail?.lastname || "";

            return (
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

// Select all functionality
const allSelected = computed(() => {
    return filteredApplications.value.length > 0 &&
           filteredApplications.value.every(app => selectedApplications.value.includes(app.application_id));
});

const toggleSelectAll = () => {
    if (allSelected.value) {
        // Deselect all
        selectedApplications.value = [];
    } else {
        // Select all filtered applications
        selectedApplications.value = filteredApplications.value.map(app => app.application_id);
    }
};

// Schedule modal functions
const openScheduleModal = () => {
    // Pre-fill the form with job listing info
    scheduleForm.value = {
        title: `Interview - ${jobListing.value.title}`,
        description: `Interview for ${jobListing.value.position?.position_name} position`,
        schedule_date: "",
        location: "",
        application_status: "Interview",
        participants: selectedApplications.value
    };
    showScheduleModal.value = true;
};

const closeScheduleModal = () => {
    showScheduleModal.value = false;
    scheduleForm.value = {
        title: "",
        description: "",
        schedule_date: "",
        location: "",
        application_status: "",
        participants: []
    };
};

const createSchedule = () => {
    // Validate schedule date against closing date
    if (scheduleForm.value.schedule_date) {
        const scheduleDate = new Date(scheduleForm.value.schedule_date);
        const closingDate = new Date(jobListing.value.closing_date);

        if (scheduleDate > closingDate) {
            showToast("Schedule date cannot be after the job closing date (" + formatDate(jobListing.value.closing_date) + ")", "error");
            return;
        }
    }

    isLoading.value = true;

    // Prepare the form data
    const formData = {
        ...scheduleForm.value,
        participants: selectedApplications.value.map(appId => ({ application_id: appId }))
    };

    // Submit to create schedule
    router.post(route('schedules.store'), formData, {
        onSuccess: (response) => {
            closeScheduleModal();
            selectedApplications.value = [];
            showToast("Schedule created successfully!", "success");
        },
        onError: (errors) => {
            // Handle specific validation errors
            if (errors.schedule_date) {
                showToast(errors.schedule_date[0], "error");
            } else {
                showToast("Failed to create schedule. Please try again.", "error");
            }
        },
        onFinish: () => {
            isLoading.value = false;
        }
    });
};

// Helper functions
const getApplicantName = (applicationId) => {
    const application = applications.value.find(app => app.application_id === applicationId);
    if (application) {
        const firstName = application.user?.user_detail?.firstname || '';
        const lastName = application.user?.user_detail?.lastname || '';
        return `${firstName} ${lastName}`.trim() || 'Unknown';
    }
    return 'Unknown';
};

const getStatusBadgeClass = (status) => {
    const statusClasses = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Qualified': 'bg-green-100 text-green-800',
        'Disqualified': 'bg-red-100 text-red-800',
        'Competency Exam': 'bg-green-100 text-green-800',
        'Not Selected': 'bg-gray-100 text-gray-800',
        'Lack Requirements': 'bg-orange-100 text-orange-800',
        'Interview': 'bg-purple-100 text-purple-800',
        'Accepted': 'bg-emerald-100 text-emerald-800'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
};

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const getMaxDate = () => {
    if (jobListing.value.closing_date) {
        // Convert the closing date to datetime-local format (YYYY-MM-DDTHH:mm)
        const closingDate = new Date(jobListing.value.closing_date);
        const year = closingDate.getFullYear();
        const month = String(closingDate.getMonth() + 1).padStart(2, '0');
        const day = String(closingDate.getDate()).padStart(2, '0');
        const hours = String(closingDate.getHours()).padStart(2, '0');
        const minutes = String(closingDate.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    return "";
};

const showToast = (message, type = 'success') => {
    Swal.fire({
        position: "top-end",
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        background: type === 'success' ? '#22c55e' : '#ef4444',
        color: '#ffffff',
        iconColor: '#ffffff',
    });
};

console.log("Filtered Applications:", filteredApplications.value);
</script>
