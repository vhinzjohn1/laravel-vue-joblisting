<template>
    <Head title="My Schedules" />

    <ApplicantLayout>
        <template #header>
            <Header title="My Interview Schedules" />
        </template>

        <div class="py-5">
            <div class="container-fluid px-4">
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
                    class="card shadow-sm rounded-lg overflow-hidden bg-white mb-6"
                >
                    <div class="card-header bg-white py-4 px-4 border-b">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-semibold">
                                My Interview Schedules
                            </h2>
                        </div>
                    </div>

                    <div class="p-4">
                        <!-- Calendar View -->
                        <div class="mb-6">
                            <FullCalendar :options="calendarOptions" />
                        </div>

                        <!-- Schedule List -->
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Date & Time
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Location
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
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
                                                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
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
                                                class="text-blue-600 hover:text-blue-900 mr-2"
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

        <!-- Schedule Details Modal -->
        <Modal
            :show="showModal"
            :title="selectedSchedule ? selectedSchedule.title : ''"
            @close="closeModal"
            maxWidth="6xl"
        >
            <div v-if="selectedSchedule" class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Left column: Basic details -->
                    <div class="md:col-span-2">
                        <div class="prose max-w-none">
                            <h3 class="text-lg font-semibold mb-3">
                                Interview Details
                            </h3>

                            <div class="bg-gray-50 p-4 rounded-lg mb-6">
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

                            <h3 class="text-lg font-semibold mb-3">
                                Job Application
                            </h3>
                            <div class="bg-gray-50 p-4 rounded-lg">
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
                        <div class="border rounded-lg p-4 mb-6">
                            <div class="mb-4">
                                <div
                                    class="text-center px-3 py-2 rounded-lg font-semibold text-sm mb-4"
                                    :class="
                                        getParticipantStatusClass(
                                            selectedSchedule.status,
                                        )
                                    "
                                >
                                    {{ selectedSchedule.status }}
                                </div>

                                <p class="text-gray-600 text-sm mb-4">
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
                                        class="text-gray-600 text-sm font-medium"
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
                                        class="text-gray-600 text-sm font-medium"
                                    >
                                        This interview has been completed.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="border rounded-lg p-4">
                            <h3 class="text-lg font-semibold mb-4">
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
