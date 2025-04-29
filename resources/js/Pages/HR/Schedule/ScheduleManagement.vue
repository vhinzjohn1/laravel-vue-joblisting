<template>
    <Head title="Schedule Management" />

    <HRLayout>
        <template #header>
            <Header title="Schedule Management" />
        </template>

        <div class="py-5">
            <div class="px-4 container-fluid">
                <div
                    class="overflow-hidden mb-6 bg-white rounded-lg shadow-sm card"
                >
                    <div class="px-4 py-4 bg-white border-b card-header">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-semibold">Schedules</h2>
                            <PrimaryButton @click="showCreateModal = true">
                                <i class="mr-2 fas fa-plus"></i>
                                Create Schedule
                            </PrimaryButton>
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
                                <table
                                    class="min-w-full divide-y divide-gray-200"
                                >
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
                                                Date
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
                                                    @click="
                                                        viewParticipants(
                                                            schedule,
                                                        )
                                                    "
                                                    class="mr-2 text-blue-600 hover:text-blue-900"
                                                >
                                                    <i class="fas fa-users"></i>
                                                </button>
                                                <button
                                                    @click="
                                                        editSchedule(schedule)
                                                    "
                                                    class="mr-2 text-blue-600 hover:text-blue-900"
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
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700"
                                >Title</label
                            >
                            <input
                                type="text"
                                v-model="form.title"
                                class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                                class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                                class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                                class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                            class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>

                    <div v-if="!editingSchedule">
                        <label
                            class="block mb-2 text-sm font-medium text-gray-700"
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

                        <!-- Group Status Toggle -->
                        <div class="mb-4">
                            <label class="flex items-center">
                                <input
                                    type="checkbox"
                                    v-model="useGroupStatus"
                                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                <span class="ml-2 text-sm text-gray-700">Apply group status to all participants</span>
                            </label>
                        </div>

                        <!-- Group Status Selection (only show if checkbox is checked) -->
                        <div v-if="useGroupStatus" class="mb-4">
                            <label class="block text-sm font-medium text-gray-700">Group Status</label>
                            <select
                                v-model="groupStatus"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Select Status</option>
                                <option v-for="status in availableGroupStatuses" :key="status" :value="status">
                                    {{ status }}
                                </option>
                            </select>
                        </div>

                        <!-- Application Status Selection -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700">Application Status</label>
                            <select
                                v-model="applicationStatus"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Select Status</option>
                                <option v-for="(color, status) in statusColors" :key="status" :value="status">
                                    {{ status }}
                                </option>
                            </select>
                            <p class="mt-1 text-xs text-gray-500">
                                This status will be applied to all applications added to this schedule.
                            </p>
                        </div>

                        <!-- Participants Selection (only show if group status is not checked) -->
                        <div v-if="!useGroupStatus" class="space-y-2">
                            <div
                                v-for="(participant, index) in form.participants"
                                :key="index"
                                class="flex gap-2 items-center"
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
                            <button
                                type="button"
                                @click="addParticipant"
                                class="mt-2 text-sm text-blue-600 hover:text-blue-800"
                            >
                                <i class="mr-1 fas fa-plus"></i> Add Participant
                            </button>
                        </div>
                    </div>

                    <div class="flex justify-end mt-6 space-x-3">
                        <button
                            type="button"
                            @click="closeModal"
                            class="px-4 py-2 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <PrimaryButton type="submit" :disabled="processing">
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
                            </div>
                        </div>
                    </div>
                </div>

                <h3 class="mt-6 mb-4 text-lg font-semibold">
                    Schedule Participants
                </h3>
                <div class="space-y-4">
                    <div
                        v-for="participant in selectedSchedule.participants"
                        :key="participant.participant_id"
                        class="p-4 rounded-lg border"
                    >
                        <div
                            class="flex items-center gap-6 p-3 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                        >
                            <div class="flex-1 flex items-center gap-4">
                                <div>
                                    <h3
                                        class="text-lg font-semibold text-gray-800"
                                    >
                                        {{ participant.user.user_detail?.firstname || 'N/A' }} {{ participant.user.user_detail?.lastname || 'N/A' }}
                                    </h3>
                                    <p class="text-sm text-gray-600">
                                        {{ getPositionName(participant) }}
                                    </p>
                                </div>
                                <div class="text-sm text-gray-600 space-x-4">
                                    <span
                                        ><strong class="font-medium"
                                            >Email:</strong
                                        >
                                        {{ participant.user.email }}</span
                                    >
                                    <span>
                                        <strong class="font-medium"
                                            >Application Status:</strong
                                        >
                                        <span
                                            class="font-semibold text-indigo-600"
                                            >{{
                                                participant.application.status
                                            }}</span
                                        >
                                    </span>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <button
                                    @click="removeParticipantFromSchedule(participant)"
                                    class="text-red-600 hover:text-red-800"
                                >
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Add Participant Form -->
                <div class="mt-6 p-4 border rounded-lg bg-gray-50">
                    <h3 class="text-lg font-semibold mb-4">Add New Participant</h3>

                    <!-- Job Listing Selection (only show if no participants or explicitly adding from different job listing) -->
                    <div v-if="!hasParticipants || showJobListingSelection" class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Select Job Listing</label>
                        <CustomSelect
                            v-model="newParticipant.jobListingId"
                            :options="jobListings"
                            :displayFormat="(option) => `${option.position.position_name} - ${option.title}`"
                            valueKey="job_listing_id"
                            placeholder="Select Job Listing"
                            @select="handleJobListingChangeForNewParticipant"
                        />
                        <button
                            v-if="hasParticipants && !showJobListingSelection"
                            @click="showJobListingSelection = true"
                            class="mt-2 text-sm text-blue-600 hover:text-blue-800"
                        >
                            <i class="mr-1 fas fa-plus"></i> Add from different job listing
                        </button>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Select Applicant</label>
                        <CustomSelect
                            v-model="newParticipant.applicationId"
                            :options="availableApplications"
                            :displayFormat="(option) => {
                                return `${option.user.user_detail.firstname} ${option.user.user_detail.lastname} - ${option.user.email} (${option.status})`;
                            }"
                            valueKey="application_id"
                            placeholder="Select Applicant"
                        />
                    </div>

                    <div class="mt-4 flex justify-end">
                        <PrimaryButton
                            @click="addParticipantToSchedule"
                            :disabled="!newParticipant.applicationId"
                        >
                            Add Participant
                        </PrimaryButton>
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
        required: false,
        default: () => []
    },
    jobListings: {
        type: Array,
        required: true,
    },
});

console.log('This is the props: ', props)
const showCreateModal = ref(false);
const showParticipantsModal = ref(false);
const editingSchedule = ref(null);
const selectedSchedule = ref(null);
const processing = ref(false);
const selectedJobListing = ref("");
const schedules = ref(props.schedules);

const form = ref({
    title: "",
    description: "",
    schedule_date: "",
    location: "",
    status: "Scheduled",
    participants: [{ application_id: "" }],
});

// New participant form
const newParticipant = ref({
    jobListingId: "",
    applicationId: "",
    groupStatus: ""
});

// Show job listing selection when adding from different job listing
const showJobListingSelection = ref(false);

// Computed property to check if schedule has participants
const hasParticipants = computed(() => {
    return selectedSchedule.value?.participants?.length > 0;
});

// Get available applications (filtered by job listing and excluding existing participants)
const availableApplications = computed(() => {
    // If no job listing is selected and there are participants, use the first participant's job listing
    let jobListingId = newParticipant.value.jobListingId;

    if (!jobListingId && hasParticipants.value) {
        jobListingId = selectedSchedule.value.participants[0].application.job_listing_id;
    }

    if (!jobListingId) return [];

    // Find the job listing with matching ID
    const jobListing = props.jobListings.find(
        (job) => job.job_listing_id === jobListingId
    );

    if (!jobListing) return [];

    // Get existing participant application IDs
    const existingApplicationIds = selectedSchedule.value.participants.map(
        p => p.application_id
    );

    // Filter out applications that are already participants
    return jobListing.applications.filter(
        app => !existingApplicationIds.includes(app.application_id)
    );
});

const handleJobListingChangeForNewParticipant = () => {
    newParticipant.value.applicationId = "";
};

const addParticipantToSchedule = () => {
    if (!newParticipant.value.applicationId) {
        return;
    }

    // Get the application to determine its current status
    const application = availableApplications.value.find(
        app => app.application_id === newParticipant.value.applicationId
    );

    // Use the application's current status or default to 'Pending'
    const status = application ? application.status : 'Pending';

    axios.post(route('schedules.add-participant', selectedSchedule.value.schedule_id), {
        application_id: newParticipant.value.applicationId,
        status: status
    })
    .then(response => {
        if (response.data.success) {
            selectedSchedule.value = response.data.schedule;
            showToast("add");

            // Reset form
            newParticipant.value = {
                jobListingId: "",
                applicationId: "",
                groupStatus: ""
            };

            // Hide job listing selection if it was shown
            showJobListingSelection.value = false;
        }
    })
    .catch(error => {
        console.error('Error adding participant:', error);
        showToast("add", false);
    });
};

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

    const formattedDate = new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
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
    useGroupStatus.value = false;
    groupStatus.value = "";
    applicationStatus.value = "";
    form.value = {
        title: "",
        description: "",
        schedule_date: "",
        location: "",
        status: "Scheduled",
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

    // Prepare form data
    const formData = prepareFormData();

    // If group status is enabled, add group status and job listing ID
    if (useGroupStatus.value && groupStatus.value && selectedJobListing.value) {
        formData.use_group_status = true;
        formData.group_status = groupStatus.value;
        formData.job_listing_id = selectedJobListing.value;

        // Clear participants array when using group status
        formData.participants = [];
    } else {
        // Ensure use_group_status is false when not using group status
        formData.use_group_status = false;
    }

    // Add application status
    formData.application_status = applicationStatus.value;

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
            formData,
            options,
        );
    } else {
        router.post(route("schedules.store"), formData, options);
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
        participants: schedule.participants.map((participant) => ({
            application_id: participant.application_id,
        })),
    };
    showCreateModal.value = true;
};

const viewParticipants = (schedule) => {
    console.log('Schedule participants:', schedule.participants);
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

const removeParticipantFromSchedule = (participant) => {
    Swal.fire({
        title: "Are you sure?",
        text: `You are about to remove this participant from the schedule`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, remove it!",
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(route('schedules.remove-participant', [selectedSchedule.value.schedule_id, participant.participant_id]))
                .then(response => {
                    if (response.data.success) {
                        selectedSchedule.value = response.data.schedule;
                        showToast("delete");
                    }
                })
                .catch(error => {
                    console.error('Error removing participant:', error);
                    showToast("delete", false);
                });
        }
    });
};

// Add this function to safely get the position name
const getPositionName = (participant) => {
    try {
        return participant.application?.job_listing?.position?.position_name || 'Position not available';
    } catch (error) {
        console.error('Error getting position name:', error);
        return 'Position not available';
    }
};

// Add status colors from ApplicationDetails.vue
const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Qualified: "bg-green-100 text-green-800",
    Disqualified: "bg-red-100 text-red-800",
    "Competency Exam": "bg-blue-100 text-blue-800",
    Rejected: "bg-red-100 text-red-800",
    Interview: "bg-purple-100 text-purple-800",
    Accepted: "bg-green-100 text-green-800",
};

// Add group status toggle
const useGroupStatus = ref(false);
const groupStatus = ref("");

// Add applicationStatus to the form data
const applicationStatus = ref("");

// Computed property to get available group statuses based on selected job listing
const availableGroupStatuses = computed(() => {
    if (!selectedJobListing.value) return [];

    // Find the job listing with matching ID
    const jobListing = props.jobListings.find(
        (job) => job.job_listing_id === selectedJobListing.value
    );

    if (!jobListing || !jobListing.applications) return [];

    // Get unique statuses from applications
    const statuses = new Set();
    jobListing.applications.forEach(app => {
        if (app.status) statuses.add(app.status);
    });

    return Array.from(statuses);
});
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
