<template>
    <Head title="Schedule Management" />

    <HRLayout>
        <template #header>
            <Header title="Schedule Management" />
        </template>

        <div class="py-5">
            <div class="container-fluid px-4">
                <div
                    class="card shadow-sm rounded-lg overflow-hidden bg-white mb-6"
                >
                    <div class="card-header bg-white py-4 px-4 border-b">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-semibold">Schedules</h2>
                            <PrimaryButton
                                @click="showCreateModal = true"
                            >
                                <i class="fas fa-plus mr-2"></i>
                                Create Schedule
                            </PrimaryButton>
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
                                            Date
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
                                                @click="
                                                    viewParticipants(schedule)
                                                "
                                                class="text-blue-600 hover:text-blue-900 mr-2"
                                            >
                                                <i class="fas fa-users"></i>
                                            </button>
                                            <button
                                                @click="editSchedule(schedule)"
                                                class="text-blue-600 hover:text-blue-900 mr-2"
                                            >
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button
                                                @click="
                                                    deleteSchedule(schedule)
                                                "
                                                class="text-red-600 hover:text-red-900"
                                            >
                                                <i class="fas fa-trash"></i>
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

        <!-- Create/Edit Schedule Modal -->
        <Modal
            :title="editingSchedule ? 'Edit Schedule' : 'Create New Schedule'"
            :show="showCreateModal"
            @close="closeModal"
            maxWidth="2xl"
        >
            <div class="p-6">
                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700"
                                >Title</label
                            >
                            <input
                                type="text"
                                v-model="form.title"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700"
                                >Location</label
                            >
                            <input
                                type="text"
                                v-model="form.location"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700"
                                >Date & Time</label
                            >
                            <input
                                type="datetime-local"
                                v-model="form.schedule_date"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            <p class="mt-1 text-xs text-gray-500">
                                Make sure your local timezone is correct. The
                                system will handle timezone conversion.
                            </p>
                        </div>
                        <div v-if="editingSchedule">
                            <label
                                class="block text-sm font-medium text-gray-700"
                                >Status</label
                            >
                            <select
                                v-model="form.status"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="Scheduled">Scheduled</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Description</label
                        >
                        <textarea
                            v-model="form.description"
                            rows="3"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Notes</label
                        >
                        <textarea
                            v-model="form.notes"
                            rows="2"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <div v-if="!editingSchedule">
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Participants</label
                        >

                        <!-- Job Listing Selection -->
                        <div class="mb-4">
                            <label
                                class="block text-sm font-medium text-gray-700"
                                >Select Job Listing</label
                            >
                            <CustomSelect
                                v-model="selectedJobListing"
                                :options="jobListings"
                                :displayFormat="
                                    (option) =>
                                        `${option.position.position_name} - ${option.title}`
                                "
                                valueKey="job_listing_id"
                                placeholder="Select Job Listing"
                                @select="handleJobListingChange"
                            />
                        </div>

                        <!-- Participants Selection -->
                        <div class="space-y-2">
                            <div
                                v-for="(
                                    participant, index
                                ) in form.participants"
                                :key="index"
                                class="flex items-center gap-2"
                            >
                                <div class="flex-1">
                                    <CustomSelect
                                        v-model="participant.application_id"
                                        :options="filteredApplications"
                                        :displayFormat="
                                            (option) => {
                                                return `${option.user.user_detail.firstname} ${option.user.user_detail.lastname} - ${option.user.email} (${option.status})`;
                                            }
                                        "
                                        valueKey="application_id"
                                        placeholder="Select Applicant"
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    @click="removeParticipant(index)"
                                    class="text-red-600 hover:text-red-800"
                                >
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <button
                            type="button"
                            @click="addParticipant"
                            class="mt-2 text-sm text-blue-600 hover:text-blue-800"
                        >
                            <i class="fas fa-plus mr-1"></i> Add Participant
                        </button>
                    </div>

                    <div class="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            @click="closeModal"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <PrimaryButton
                            type="submit"
                            :disabled="processing"
                        >
                            {{
                                editingSchedule
                                    ? "Update Schedule"
                                    : "Create Schedule"
                            }}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>

        <!-- Add this new modal for viewing participants -->
        <Modal
            :show="showParticipantsModal"
            :title="selectedSchedule ? selectedSchedule.title : ''"
            @close="showParticipantsModal = false"
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
                        </div>
                    </div>

                    <!-- Right column: Admin actions -->
                    <div class="md:col-span-1">
                        <div class="bg-gray-50 p-4 rounded-lg mb-6">
                            <h3 class="text-lg font-semibold mb-3">
                                Admin Actions
                            </h3>
                            <div class="space-y-2">
                                <button
                                    @click="editSchedule(selectedSchedule)"
                                    class="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                                >
                                    <i class="fas fa-edit mr-2"></i> Edit
                                    Schedule
                                </button>
                                <button
                                    @click="deleteSchedule(selectedSchedule)"
                                    class="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                                >
                                    <i class="fas fa-trash mr-2"></i> Delete
                                    Schedule
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 class="text-lg font-semibold mb-4 mt-6">
                    Schedule Participants
                </h3>
                <div class="space-y-4">
                    <div
                        v-for="participant in selectedSchedule.participants"
                        :key="participant.participant_id"
                        class="border rounded-lg p-4"
                    >
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="font-medium">
                                    {{ participant.user.name }}
                                </h3>
                                <p class="text-sm text-gray-600">
                                    {{
                                        participant.application.jobListing
                                            .position.position_name
                                    }}
                                    -
                                    {{
                                        participant.application.jobListing.title
                                    }}
                                </p>
                                <div class="mt-2 text-sm text-gray-500">
                                    <p>Email: {{ participant.user.email }}</p>
                                    <p>
                                        Contact:
                                        {{
                                            participant.user.userDetail
                                                ?.contact_number || "N/A"
                                        }}
                                    </p>
                                    <p>
                                        Application Status:
                                        {{ participant.application.status }}
                                    </p>
                                </div>
                            </div>
                            <span
                                :class="getStatusClass(participant.status)"
                                class="px-2 py-1 rounded-full text-xs"
                            >
                                {{ participant.status }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </HRLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Head, Link, router, usePage } from "@inertiajs/vue3";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import Modal from "@/Components/Modal.vue";
import CustomSelect from "@/Components/CustomSelect.vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import PrimaryButton from "@/Components/PrimaryButton.vue";

const props = defineProps({
    schedules: {
        type: Array,
        required: true,
    },
    applications: {
        type: Array,
        required: true,
    },
    jobListings: {
        type: Array,
        required: true,
    },
});
const showCreateModal = ref(false);
const showParticipantsModal = ref(false);
const editingSchedule = ref(null);
const selectedSchedule = ref(null);
const processing = ref(false);
const selectedJobListing = ref("");
const schedules = ref(props.schedules);

console.log(schedules);

const form = ref({
    title: "",
    description: "",
    schedule_date: "",
    location: "",
    status: "Scheduled",
    notes: "",
    participants: [{ application_id: "" }],
});

const calendarOptions = computed(() => ({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    timeZone: "local",
    events: schedules.value.map((schedule) => {
        const scheduleDate = new Date(schedule.schedule_date);

        return {
            id: schedule.schedule_id,
            title: schedule.title,
            start: scheduleDate,
            allDay: false,
            extendedProps: {
                location: schedule.location,
                description: schedule.description,
                status: schedule.status,
            },
            backgroundColor: getStatusColor(schedule.status),
            borderColor: getStatusColor(schedule.status),
            textColor: "#ffffff",
        };
    }),
    eventTimeFormat: {
        hour: "2-digit",
        minute: "2-digit",
        meridiem: "short",
    },
    eventClick: (info) => {
        const schedule = schedules.value.find(
            (s) => s.schedule_id === parseInt(info.event.id),
        );
        if (schedule) {
            editSchedule(schedule);
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

const formatDate = (date) => {
    if (!date) return "N/A";

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short", // Add timezone information
    });

    return formattedDate;
};

// Add a helper function to format date for input datetime-local
const formatDateForInput = (dateString) => {
    if (!dateString) return "";

    // Create a date object in UTC to avoid timezone issues
    const date = new Date(dateString);

    // Format to YYYY-MM-DDThh:mm
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Add a function to properly format the date before submitting
const prepareFormData = () => {
    // Create a new object to prevent modifying the original
    const formData = { ...form.value };

    // If there's a schedule_date, ensure it's in ISO format
    if (formData.schedule_date) {
        // This ensures timezone consistency
        const date = new Date(formData.schedule_date);
        formData.schedule_date = date.toISOString();
    }

    return formData;
};

const getStatusClass = (status) => {
    const classes = {
        Scheduled: "bg-blue-100 text-blue-800",
        Completed: "bg-green-100 text-green-800",
        Cancelled: "bg-red-100 text-red-800",
        Pending: "bg-yellow-100 text-yellow-800",
    };
    return classes[status] || "bg-gray-100 text-gray-800";
};

const filteredApplications = computed(() => {
    const jobListing = props.jobListings.find(
        (job) => job.job_listing_id === selectedJobListing.value,
    );

    return jobListing ? jobListing.applications : [];
});

const handleJobListingChange = () => {
    form.value.participants = [{ application_id: "" }];
};

const closeModal = () => {
    showCreateModal.value = false;
    editingSchedule.value = null;
    selectedJobListing.value = "";
    form.value = {
        title: "",
        description: "",
        schedule_date: "",
        location: "",
        status: "Scheduled",
        notes: "",
        participants: [{ application_id: "" }],
    };
};

const addParticipant = () => {
    form.value.participants.push({ application_id: "" });
};

const removeParticipant = (index) => {
    form.value.participants.splice(index, 1);
};

const handleSubmit = () => {
    processing.value = true;

    const options = {
        onSuccess: (response) => {
            schedules.value = response.props.schedules;
            closeModal();
            processing.value = false;
            showToast("add");
        },
        onError: (error) => {
            showToast("add", false);
            processing.value = false;
        },
        preserveScroll: true, // Preserve scroll position
    };

    if (editingSchedule.value) {
        router.put(
            route("schedules.update", editingSchedule.value.schedule_id),
            prepareFormData(),
            options,
        );
    } else {
        router.post(route("schedules.store"), prepareFormData(), options);
    }
};

const editSchedule = (schedule) => {
    editingSchedule.value = schedule;
    if (schedule.participants.length > 0) {
        selectedJobListing.value =
            schedule.participants[0].application.job_listing_id;
    }
    form.value = {
        title: schedule.title,
        description: schedule.description,
        schedule_date: formatDateForInput(schedule.schedule_date),
        location: schedule.location,
        status: schedule.status,
        notes: schedule.notes,
        participants: schedule.participants.map((participant) => ({
            application_id: participant.application_id,
        })),
    };
    showCreateModal.value = true;
};

const viewParticipants = (schedule) => {
    selectedSchedule.value = schedule;
    showParticipantsModal.value = true;
};

const showToast = (action, isSuccess = true) => {
    let title;
    let icon = isSuccess ? "success" : "error";
    let background = isSuccess ? "#22c55e" : "#ef4444";

    switch (action) {
        case "add":
            title = isSuccess
                ? "Schedule Added Successfully!"
                : "Failed to Add Schedule.";
            break;
        case "update":
            title = isSuccess
                ? "Schedule Updated Successfully!"
                : "Failed to Update Schedule.";
            break;
        case "delete":
            title = isSuccess
                ? "Schedule Deleted Successfully!"
                : "Failed to Delete Schedule.";
            break;
        default:
            title = isSuccess ? "Action Completed!" : "Action Failed!";
    }

    Swal.fire({
        position: "top-end",
        icon: icon,
        title: title,
        iconColor: "#ffffff",
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        color: "#ffffff",
        background: background,
    });
};

const deleteSchedule = (schedule) => {
    Swal.fire({
        title: "Are you sure?",
        text: `You are about to delete the schedule "${schedule.title}"`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(route("schedules.destroy", schedule.schedule_id), {
                onSuccess: (response) => {
                    schedules.value = response.props.schedules;
                    showToast("delete");
                },
                onError: () => {
                    showToast("delete", false);
                },
                preserveScroll: true,
            });
        }
    });
};
</script>

<style scoped>
/* Calendar View Styling */
/* :deep(.fc) {
    --fc-border-color: #e5e7eb;
    --fc-button-bg-color: #2baf19;
    --fc-button-border-color: #34c921;
    --fc-button-hover-bg-color: #34c921;
    --fc-button-hover-border-color: #34c921;
    --fc-button-active-bg-color: #34c921;
    --fc-button-active-border-color: #34c921;
    --fc-event-border-color: transparent;
    --fc-today-bg-color: #eff6ff;
} */

:deep(.fc-toolbar-title) {
    font-size: 1.25rem !important;
    font-weight: 600;
}

:deep(.fc-button) {
    text-transform: capitalize !important;
    border-radius: 0.375rem !important;
    padding: 0.5rem 0.75rem !important;
    font-weight: 500 !important;
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
