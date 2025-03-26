<template>
    <Head title="Schedule Details" />

    <ApplicantLayout>
        <template #header>
            <Header title="Interview Schedule Details" />
        </template>

        <div class="py-5">
            <div class="container-fluid px-4">
                <Breadcrumbs
                    :items="[
                        { name: 'Home', href: route('applicant.index') },
                        {
                            name: 'My Schedules',
                            href: route('my-schedules.index'),
                        },
                        {
                            name: 'Schedule Details',
                            href: route(
                                'my-schedules.show',
                                schedule.schedule_id,
                            ),
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
                                {{ schedule.title }}
                            </h2>
                            <div
                                class="px-3 py-1 inline-flex text-sm rounded-full"
                                :class="getStatusClass(schedule.status)"
                            >
                                {{ schedule.status }}
                            </div>
                        </div>
                    </div>

                    <div class="p-6">
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
                                                        schedule.schedule_date,
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
                                                {{ schedule.location }}
                                            </p>
                                        </div>

                                        <div class="mb-4">
                                            <h4
                                                class="text-sm font-medium text-gray-500"
                                            >
                                                Description
                                            </h4>
                                            <p class="text-gray-800">
                                                {{ schedule.description }}
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
                                                    schedule.notes ||
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
                                                schedule.participants[0]
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
                                                        schedule.participants[0]
                                                            .application
                                                            .job_listing
                                                            .position
                                                            .position_name
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
                                                        schedule.participants[0]
                                                            .application
                                                            .job_listing.title
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
                                    <h3 class="text-lg font-semibold mb-4">
                                        Your Status
                                    </h3>

                                    <div class="mb-4">
                                        <div
                                            class="text-center px-3 py-2 rounded-lg font-semibold text-sm mb-4"
                                            :class="
                                                getParticipantStatusClass(
                                                    schedule.participants[0]
                                                        .status,
                                                )
                                            "
                                        >
                                            {{
                                                schedule.participants[0].status
                                            }}
                                        </div>

                                        <div
                                            v-if="
                                                schedule.status ===
                                                    'Scheduled' &&
                                                schedule.participants[0]
                                                    .status === 'Pending'
                                            "
                                        >
                                            <p
                                                class="text-gray-600 mb-4 text-sm"
                                            >
                                                Please confirm your attendance
                                                for this interview.
                                            </p>

                                            <div class="space-y-2">
                                                <button
                                                    @click="
                                                        updateStatus(
                                                            'Confirmed',
                                                        )
                                                    "
                                                    class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                                >
                                                    Confirm Attendance
                                                </button>

                                                <button
                                                    @click="
                                                        updateStatus('Declined')
                                                    "
                                                    class="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                                >
                                                    Decline
                                                </button>
                                            </div>
                                        </div>

                                        <div
                                            v-else-if="
                                                schedule.status === 'Completed'
                                            "
                                        >
                                            <p class="text-gray-600 text-sm">
                                                This interview has been
                                                completed.
                                            </p>
                                        </div>

                                        <div
                                            v-else-if="
                                                schedule.status === 'Cancelled'
                                            "
                                        >
                                            <p class="text-gray-600 text-sm">
                                                This interview has been
                                                cancelled.
                                            </p>
                                        </div>

                                        <div
                                            v-else-if="
                                                schedule.participants[0]
                                                    .status === 'Confirmed'
                                            "
                                        >
                                            <p class="text-gray-600 text-sm">
                                                You have confirmed your
                                                attendance.
                                            </p>
                                        </div>

                                        <div
                                            v-else-if="
                                                schedule.participants[0]
                                                    .status === 'Declined'
                                            "
                                        >
                                            <p class="text-gray-600 text-sm">
                                                You have declined this
                                                interview.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="border rounded-lg p-4">
                                    <h3 class="text-lg font-semibold mb-4">
                                        Schedule Created By
                                    </h3>

                                    <div v-if="schedule.creator">
                                        <p class="font-medium">
                                            {{
                                                schedule.creator.userDetail
                                                    ? `${schedule.creator.userDetail.firstname} ${schedule.creator.userDetail.lastname}`
                                                    : schedule.creator.username
                                            }}
                                        </p>
                                        <p class="text-sm text-gray-600">
                                            {{ schedule.creator.email }}
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
                </div>
            </div>
        </div>
    </ApplicantLayout>
</template>

<script setup>
import { ref } from "vue";
import { Head, Link, router } from "@inertiajs/vue3";
import ApplicantLayout from "@/Layouts/Applicant/ApplicantLayout.vue";
import Header from "@/Components/Header/Header.vue";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs.vue";
import axios from "axios";

const props = defineProps({
    schedule: {
        type: Object,
        required: true,
    },
});

// Format date for display
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
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

// Update participant status
const updateStatus = (status) => {
    axios
        .post(route("my-schedules.update-status", props.schedule.schedule_id), {
            status: status,
        })
        .then((response) => {
            // Show success message
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Status Updated",
                showConfirmButton: false,
                timer: 3000,
                iconColor: "#ffffff",
                toast: true,
                color: "#ffffff",
                background: "#22c55e",
            });

            // Reload the page to reflect the updated status
            router.reload();
        })
        .catch((error) => {
            // Show error message
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to Update Status",
                text: "There was a problem updating your status",
                showConfirmButton: false,
                timer: 3000,
                iconColor: "#ffffff",
                toast: true,
                color: "#ffffff",
                background: "#ef4444"
            });
            console.error("Error updating status:", error);
        });
};
</script>
