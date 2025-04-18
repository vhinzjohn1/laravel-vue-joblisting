<template>
    <Head title="My Schedules" />

    <ApplicantLayout>
        <template #header>
            <Header title="My Interview Schedules" />
        </template>

        <div class="py-5">
            <div class="px-4 container-fluid">
                <Breadcrumbs
                    :items="[
                        { name: 'Home', href: route('applicant.index') },
                        {
                            name: 'My Schedules',
                            href: route('my-schedules.index'),
                            active: true,
                        },
                    ]"
                />

                <div
                    class="overflow-hidden mb-6 bg-white rounded-lg shadow-sm card"
                >
                    <div class="px-4 py-4 bg-white border-b card-header">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-semibold">
                                My Interview Schedules
                            </h2>
                        </div>
                    </div>

                    <div class="p-4">
                        <!-- Two-column layout -->
                        <div class="flex flex-col gap-6 md:flex-row">
                            <!-- Calendar View -->
                            <div class="mb-6 w-full md:w-3/5 md:mb-0">
                                <FullCalendar :options="calendarOptions" />
                            </div>

                            <!-- Spacer Line -->
                            <div class="w-1/5 border border-gray-400 md:w-0" />

                            <!-- Schedule List -->
                            <div class="overflow-x-auto w-full md:w-2/5">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase"
                                            >
                                                Title
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase"
                                            >
                                                Date & Time
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase"
                                            >
                                                Location
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        class="bg-white divide-y divide-gray-200"
                                    >
                                        <tr
                                            v-for="schedule in schedules"
                                            :key="schedule.schedule_id"
                                        >
                                            <td class="px-6 py-4">
                                                {{ schedule.title }}
                                            </td>
                                            <td class="px-6 py-4">
                                                {{
                                                    formatDate(
                                                        schedule.schedule_date,
                                                    )
                                                }}
                                            </td>
                                            <td class="px-6 py-4">
                                                {{ schedule.location }}
                                            </td>
                                            <td class="px-6 py-4">
                                                <span
                                                    class="inline-flex px-2 text-xs font-semibold leading-5 rounded-full"
                                                    :class="
                                                        getStatusClass(
                                                            schedule.status,
                                                        )
                                                    "
                                                >
                                                    {{ schedule.status }}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4">
                                                <button
                                                    @click="showDetails(schedule)"
                                                    class="mr-2 text-blue-600 hover:text-blue-900"
                                                >
                                                    <i class="fas fa-eye"></i> View
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                        <tr v-if="schedules.length === 0">
                                            <td
                                                colspan="6"
                                                class="px-6 py-4 text-center text-gray-500"
                                            >
                                                No schedules found
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

        <!-- Schedule Details Modal -->
        <Modal
            :show="showModal"
            :title="selectedSchedule ? selectedSchedule.title : ''"
            @close="closeModal"
            maxWidth="6xl"
        >
            <div v-if="selectedSchedule" class="p-6">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <!-- Left column: Basic details -->
                    <div class="md:col-span-2">
                        <div class="max-w-none prose">
                            <h3 class="mb-3 text-lg font-semibold">
                                Interview Details
                            </h3>

                            <div class="p-4 mb-6 bg-gray-50 rounded-lg">
                                <div class="mb-4">
                                    <h4
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Date & Time
                                    </h4>
                                    <p class="text-gray-800">
                                        {{
                                            formatDate(
                                                selectedSchedule.schedule_date,
                                            )
                                        }}
                                    </p>
                                </div>

                                <div class="mb-4">
                                    <h4
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Location
                                    </h4>
                                    <p class="text-gray-800">
                                        {{ selectedSchedule.location }}
                                    </p>
                                </div>

                                <div class="mb-4">
                                    <h4
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Description
                                    </h4>
                                    <p class="text-gray-800">
                                        {{ selectedSchedule.description }}
                                    </p>
                                </div>

                                <div>
                                    <h4
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        Additional Notes
                                    </h4>
                                    <p class="text-gray-800">
                                        {{
                                            selectedSchedule.notes ||
                                            "No additional notes"
                                        }}
                                    </p>
                                </div>
                            </div>

                            <h3 class="mb-3 text-lg font-semibold">
                                Job Application
                            </h3>
                            <div class="p-4 bg-gray-50 rounded-lg">
                                <div
                                    v-if="
                                        selectedSchedule.participants[0]
                                            .application
                                    "
                                >
                                    <div class="mb-4">
                                        <h4
                                            class="text-sm font-medium text-gray-500"
                                        >
                                            Position
                                        </h4>
                                        <p class="text-gray-800">
                                            {{
                                                selectedSchedule.participants[0]
                                                    .application.job_listing
                                                    .position.position_name
                                            }}
                                        </p>
                                    </div>

                                    <div>
                                        <h4
                                            class="text-sm font-medium text-gray-500"
                                        >
                                            Job Title
                                        </h4>
                                        <p class="text-gray-800">
                                            {{
                                                selectedSchedule.participants[0]
                                                    .application.job_listing
                                                    .title
                                            }}
                                        </p>
                                    </div>
                                </div>
                                <div v-else>
                                    <p class="text-gray-600">
                                        No application data available.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right column: Status and actions -->
                    <div>
                        <div class="p-4 mb-6 rounded-lg border">
                            <div class="mb-4">
                                <div
                                    class="px-3 py-2 mb-4 text-sm font-semibold text-center rounded-lg"
                                    :class="
                                        getParticipantStatusClass(
                                            selectedSchedule.status,
                                        )
                                    "
                                >
                                    {{ selectedSchedule.status }}
                                </div>

                                <p class="mb-4 text-sm text-gray-600">
                                    Your attendance at this interview is
                                    required. Please make sure to attend at the
                                    scheduled date and time.
                                </p>

                                <div
                                    v-if="
                                        selectedSchedule.status === 'Cancelled'
                                    "
                                >
                                    <p
                                        class="text-sm font-medium text-gray-600"
                                    >
                                        This interview has been cancelled.
                                    </p>
                                </div>

                                <div
                                    v-else-if="
                                        selectedSchedule.status === 'Completed'
                                    "
                                >
                                    <p
                                        class="text-sm font-medium text-gray-600"
                                    >
                                        This interview has been completed.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="p-4 rounded-lg border">
                            <h3 class="mb-4 text-lg font-semibold">
                                Schedule Created By
                            </h3>

                            <div v-if="selectedSchedule.creator">
                                <p class="font-medium">
                                    {{
                                        selectedSchedule.creator.userDetail
                                            ? `${selectedSchedule.creator.userDetail.firstname} ${selectedSchedule.creator.userDetail.lastname}`
                                            : selectedSchedule.creator.username
                                    }}
                                </p>
                                <p class="text-sm text-gray-600">
                                    {{ selectedSchedule.creator.email }}
                                </p>
                            </div>
                            <div v-else>
                                <p class="text-gray-600">
                                    Creator information not available.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </ApplicantLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { Head, Link } from "@inertiajs/vue3";
import ApplicantLayout from "@/Layouts/Applicant/ApplicantLayout.vue";
import Header from "@/Components/Header/Header.vue";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs.vue";
import Modal from "@/Components/Modal.vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { router } from "@inertiajs/vue3";

const props = defineProps({
    schedules: {
        type: Array,
        required: true,
    },
});

// Modal state
const showModal = ref(false);
const selectedSchedule = ref(null);

// Format date for display
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
};

// Show schedule details in modal
const showDetails = (schedule) => {
    selectedSchedule.value = schedule;
    console.log(selectedSchedule);
    showModal.value = true;
};

// Close modal
const closeModal = () => {
    showModal.value = false;
    // Clear selected schedule after a short delay to prevent visual flicker
    setTimeout(() => {
        selectedSchedule.value = null;
    }, 200);
};

// Update participant status
const updateStatus = (status) => {
    // This function is no longer needed, but we'll keep an empty stub for now
    // in case we need to reimplement it later
};

// Calendar options
const calendarOptions = computed(() => ({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    events: props.schedules.map((schedule) => ({
        id: schedule.schedule_id,
        title: schedule.title,
        start: schedule.schedule_date,
        extendedProps: {
            location: schedule.location,
            description: schedule.description,
            status: schedule.status,
        },
        backgroundColor: getStatusColor(schedule.status),
        borderColor: getStatusColor(schedule.status),
        textColor: "#ffffff",
    })),
    eventClick: (info) => {
        const schedule = props.schedules.find(
            (s) => s.schedule_id.toString() === info.event.id,
        );
        if (schedule) {
            showDetails(schedule);
        }
    },
}));

// Get status color for calendar events
const getStatusColor = (status) => {
    switch (status) {
        case "Scheduled":
            return "#3788d8";
        case "Completed":
            return "#28a745";
        case "Cancelled":
            return "#dc3545";
        default:
            return "#6c757d";
    }
};

// Get class for status badge
const getStatusClass = (status) => {
    switch (status) {
        case "Scheduled":
            return "bg-blue-100 text-blue-800";
        case "Completed":
            return "bg-green-100 text-green-800";
        case "Cancelled":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

// Get class for participant status badge
const getParticipantStatusClass = (status) => {
    switch (status) {
        case "Pending":
            return "bg-yellow-100 text-yellow-800";
        case "Confirmed":
            return "bg-green-100 text-green-800";
        case "Declined":
            return "bg-red-100 text-red-800";
        case "Attended":
            return "bg-blue-100 text-blue-800";
        case "Cancelled":
            return "bg-gray-100 text-gray-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};
</script>

<style scoped>

/* Calendar View Styling */
:deep(.fc-toolbar-title) {
    font-size: 1.25rem !important;
    font-weight: 600;
}

:deep(.fc-button) {
    text-transform: capitalize !important;
    border-radius: 0.375rem !important;
    padding: 0.5rem 0.75rem !important;
    font-weight: 500 !important;
    @media (max-width: 768px) {
        padding: 0.1rem 0.25rem !important;
    }
}

:deep(.fc-event) {
    border-radius: 0.25rem;
    padding: 0.125rem 0.25rem;
    font-size: 0.875rem;
    cursor: pointer;
}

:deep(.fc-daygrid-day-top) {
    padding: 0.25rem;
}

:deep(.fc-day-today) {
    background: var(--fc-today-bg-color) !important;
}
</style>