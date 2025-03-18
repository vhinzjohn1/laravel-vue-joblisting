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
                                    <input
                                        type="text"
                                        class="form-control block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
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
                                <select
                                    v-model="statusFilter"
                                    class="form-control px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">All Statuses</option>
                                    <option
                                        v-for="status in statuses"
                                        :key="status"
                                        :value="status"
                                    >
                                        {{ status }}
                                    </option>
                                </select>

                                <CustomSelect
                                    v-model="jobTitleFilter"
                                    :options="jobListingOptions"
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
                                                            {{ application.user.user_detail.firstname.charAt(0) }}
                                                        </span>
                                                    </div>
                                                    <div class="ml-4">
                                                        <div
                                                            class="text-sm font-medium text-gray-900"
                                                        >
                                                            {{ `${application.user.user_detail.firstname} ${application.user.user_detail.lastname}` }}
                                                        </div>
                                                        <div
                                                            class="text-sm text-gray-500"
                                                        >
                                                            {{ application.user.email }}
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
                                                                'Interview'
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
                                                    class="text-blue-600 hover:text-blue-900"
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

    <!-- Application Details Modal - UPDATED -->
    <Modal
        :show="showDetailsModal"
        @close="closeDetailsModal"
        :max-width="'7xl'"
        :title="'Application Details'"
    >
        <div class="p-4">

            <!-- Application Details Content -->
            <div class="mt-2" v-if="selectedApplication">
                <!-- Application Status -->
                <div class="mb-4 flex items-center justify-between">
                    <h1 class="text-xl font-bold text-gray-900">
                        {{ selectedApplication.job_listing.title }}
                    </h1>
                    <span
                        class="px-3 py-1 text-sm font-semibold rounded-full"
                        :class="getStatusColor(selectedApplication.status)"
                    >
                        {{ selectedApplication.status }}
                    </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <!-- Left Column: Job Information -->
                    <div class="md:col-span-7 space-y-4">
                        <!-- Applicant Information -->
                        <div class="bg-white p-4 rounded-lg border">
                            <h2 class="text-base font-semibold mb-3">
                                Applicant Information
                            </h2>
                            <div class="space-y-3">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-500"
                                        >Name</label
                                    >
                                    <p class="mt-1">
                                        {{ `${selectedApplication.user.user_detail.firstname} ${selectedApplication.user.user_detail.middle_initial}. ${selectedApplication.user.user_detail.lastname}` }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-500"
                                        >Email</label
                                    >
                                    <p class="mt-1">
                                        {{ selectedApplication.user.email }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-500"
                                        >Phone Number</label
                                    >
                                    <p class="mt-1">
                                        {{ selectedApplication.user.user_detail.phone_number }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Job Details -->
                        <div class="bg-white p-4 rounded-lg border">
                            <h2 class="text-base font-semibold mb-3">
                                Job Details
                            </h2>
                            <div class="space-y-3">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-500"
                                        >Position</label
                                    >
                                    <p class="mt-1">
                                        {{
                                            selectedApplication.job_listing
                                                .position.position_name
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-500"
                                        >Description</label
                                    >
                                    <p class="mt-1 text-sm">
                                        {{
                                            selectedApplication.job_listing
                                                .description
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Documents -->
                        <div class="bg-white p-4 rounded-lg border">
                            <h2 class="text-base font-semibold mb-3">
                                Documents
                            </h2>
                            <div
                                v-if="
                                    selectedApplication.documents &&
                                    selectedApplication.documents.length > 0
                                "
                            >
                                <div
                                    v-for="doc in selectedApplication.documents"
                                    :key="doc.document_id"
                                    class="flex justify-between items-center py-1.5"
                                >
                                    <span class="text-gray-700 text-sm">{{
                                        doc.document_type
                                    }}</span>
                                    <button
                                        @click="openDocumentModal(doc)"
                                        class="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                            <div v-else class="text-gray-500 text-sm">
                                No documents attached
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Status Updates -->
                    <div class="md:col-span-5 space-y-4">
                        <!-- Status Update Form -->
                        <div class="bg-white p-4 rounded-lg border">
                            <h2 class="text-base font-semibold mb-3">
                                Update Status
                            </h2>
                            <form @submit.prevent="updateStatus">
                                <div class="mb-3">
                                    <label
                                        for="status"
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Status</label
                                    >
                                    <select
                                        id="status"
                                        v-model="form.status"
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option
                                            v-for="status in statuses"
                                            :key="status"
                                            :value="status"
                                        >
                                            {{ status }}
                                        </option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label
                                        for="remarks"
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Remarks</label
                                    >
                                    <textarea
                                        id="remarks"
                                        v-model="form.remarks"
                                        rows="2"
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="Add any notes about this status change"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    class="w-full bg-blue-600 text-white py-1.5 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"

                                >
                                    Update Status
                                </button>
                            </form>
                        </div>

                        <!-- Status History -->
                        <div class="bg-white p-4 rounded-lg border">
                            <h2 class="text-base font-semibold mb-3">
                                Status History
                            </h2>
                            <div
                                v-if="
                                    selectedApplication.status_history &&
                                    selectedApplication.status_history.length >
                                        0
                                "
                                class="space-y-3 max-h-[320px] overflow-y-auto pr-2"
                            >
                                <div
                                    v-for="(history, index) in [
                                        ...selectedApplication.status_history,
                                    ].reverse()"
                                    :key="index"
                                    class="border-l-2 border-gray-200 pl-3 pb-3 text-sm"
                                >
                                    <div class="text-xs text-gray-600">
                                        {{ formatDateTime(history.created_at) }}
                                    </div>
                                    <p class="mt-1">
                                        Status changed from
                                        <span class="font-semibold">{{
                                            history.previous_status || "New"
                                        }}</span>
                                        to
                                        <span class="font-semibold">{{
                                            history.new_status
                                        }}</span>
                                    </p>
                                    <p
                                        v-if="history.remarks"
                                        class="mt-1 text-gray-600 text-xs"
                                    >
                                        {{ history.remarks }}
                                    </p>
                                </div>
                            </div>
                            <div v-else class="text-gray-500 text-sm">
                                No status history available
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Modal>

    <!-- Document Viewer Modal -->
    <Modal
        :show="showDocumentModal"
        @close="closeDocumentModal"
        :max-width="'4xl'"
        :title="'View Document'"
    >
        <div class="p-4">

            <!-- Document Viewer Content -->
            <div class="mt-2 h-[80vh]" ref="documentContainer">
                <iframe
                    v-if="documentUrl"
                    :src="documentUrl"
                    class="w-full h-full border-0"
                    title="Document Viewer"
                ></iframe>
                <div v-else class="flex items-center justify-center h-full">
                    <p class="text-gray-500">Loading document...</p>
                </div>
            </div>

            <div class="mt-3 flex justify-end space-x-2">
                <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-3 py-1.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    @click="closeDocumentModal"
                >
                    Close
                </button>
                <a
                    v-if="documentUrl"
                    :href="documentUrl"
                    target="_blank"
                    class="inline-flex items-center justify-center rounded-md border border-transparent shadow-sm px-3 py-1.5 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Open in new tab
                </a>
            </div>
        </div>
    </Modal>
</template>

<script setup>
import { ref, computed } from "vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs.vue";
import CustomSelect from "@/Components/CustomSelect.vue";
import Modal from "@/Components/Modal.vue";

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

console.log('this is hte props', props)

const applications = ref(props.applications);
const searchQuery = ref("");
const statusFilter = ref("");
const jobTitleFilter = ref("");
const statuses = ref(props.statuses);

const showDetailsModal = ref(false);
const selectedApplication = ref(null);
const showDocumentModal = ref(false);
const currentDocument = ref(null);
const documentUrl = ref(null);

const form = useForm({
    status: "",
    remarks: "",
});

const viewDetails = (applicationId) => {
    selectedApplication.value = applications.value.find(
        (app) => app.application_id === applicationId,
    );
    console.log(selectedApplication.value);
    form.status = selectedApplication.value.status;
    form.remarks = "";
    showDetailsModal.value = true;
};

const closeDetailsModal = () => {
    showDetailsModal.value = false;
    setTimeout(() => {
        selectedApplication.value = null;
        form.reset();
    }, 300);
};

const openDocumentModal = (doc) => {
    currentDocument.value = doc;
    documentUrl.value = `/storage/${doc.file_path}`;
    showDocumentModal.value = true;
};

const closeDocumentModal = () => {
    showDocumentModal.value = false;
    setTimeout(() => {
        currentDocument.value = null;
        documentUrl.value = null;
    }, 300);
};

const updateStatus = () => {
    // Check if the new status is the same as the current status
    if (form.status === selectedApplication.value.status) {
        showToast({
            icon: "warning",
            title: "No changes made",
            text: "The selected status is the same as the current status",
            success: false,
        });
        return;
    }

    axios
        .put(
            route(
                "applications.update",
                selectedApplication.value.application_id,
            ),
            {
                status: form.status,
                remarks: form.remarks,
            },
        )
        .then((response) => {
            // Update the applications array with new data
            applications.value = response.data.applications;

            // Update the selected application with the new data
            selectedApplication.value = response.data.applications.find(
                (app) =>
                    app.application_id ===
                    selectedApplication.value.application_id,
            );

            // Update statuses array if needed
            statuses.value = response.data.statuses;

            // Reset remarks
            form.remarks = "";

            // Close modal
            closeDetailsModal();

            // Show success toast with status change message
            showToast({
                icon: "success",
                title: "Status updated successfully",
                text: `Application status has been changed to ${form.status}`,
                success: true,
            });
        })
        .catch((error) => {
            console.error("Error updating status:", error);
            showToast({
                icon: "error",
                title: "Failed to update status",
                text: error.response?.data?.message || "An error occurred",
                success: false,
            });
        });
};

// Separate toast function
const showToast = (config) => {
    Swal.fire({
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        ...config,
        background: config.success ? "#22c55e" : "#ef4444",
        color: "#ffffff",
        iconColor: "#ffffff",
    });
};

const getStatusColor = (status) => {
    const colors = {
        Pending: "bg-yellow-100 text-yellow-800",
        Approved: "bg-green-100 text-green-800",
        Rejected: "bg-red-100 text-red-800",
        Shortlisted: "bg-blue-100 text-blue-800",
        Interview: "bg-purple-100 text-purple-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
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
            (app) => app.job_listing?.job_listing_id === jobTitleFilter.value
        );
    }

    // Apply search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter((application) => {
            // Safely access nested properties
            const jobTitle = application.job_listing?.title || '';
            const positionName = application.job_listing?.position?.position_name || '';
            const userEmail = application.user?.email || '';
            const status = application.status || '';
            const firstName = application.user?.user_detail?.firstname || '';
            const lastName = application.user?.user_detail?.lastname || '';

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

const jobListingOptions = computed(() => {
    const uniqueJobListings = new Map();
    applications.value.forEach((app) => {
        const jobListing = app.job_listing;
        if (!uniqueJobListings.has(jobListing.job_listing_id)) {
            uniqueJobListings.set(jobListing.job_listing_id, jobListing);
        }
    });

    // Convert Map to array and add "All" option at the beginning
    return [
        { job_listing_id: "", title: "All Job Titles" },
        ...Array.from(uniqueJobListings.values()),
    ];
});

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>
