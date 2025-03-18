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
                            <button
                                @click="showCreateModal = true"
                                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <i class="fas fa-plus mr-2"></i>
                                Create Schedule
                            </button>
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
                        <button
                            type="submit"
                            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            :disabled="processing"
                        >
                            {{
                                editingSchedule
                                    ? "Update Schedule"
                                    : "Create Schedule"
                            }}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>

        <!-- Add this new modal for viewing participants -->
        <Modal
            :show="showParticipantsModal"
            @close="showParticipantsModal = false"
            maxWidth="2xl"
        >
            <div class="p-6">
                <h2 class="text-lg font-semibold mb-4">
                    Schedule Participants
                </h2>
                <div class="space-y-4">
                    <div
                        v-for="participant in selectedSchedule?.participants"
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
import { ref, computed } from "vue";
import { Head, router } from "@inertiajs/vue3";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import Modal from "@/Components/Modal.vue";
import CustomSelect from "@/Components/CustomSelect.vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

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
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    events: schedules.value.map((schedule) => ({
        id: schedule.schedule_id,
        title: schedule.title,
        start: schedule.schedule_date,
        allDay: true,
    })),
    dayCellDidMount: (info) => {
        const today = new Date();
        if (info.date.toDateString() === today.toDateString()) {
            // Apply custom styles
            info.el.style.backgroundColor = "#f0f8ff";
            info.el.style.border = "2px solid #007bff";
            info.el.style.position = "relative"; // ensure the cell can position absolute children

            // Create a label element
            const label = document.createElement("div");
            label.innerText = "Current";
            // Style the label (adjust as needed)
            label.style.position = "absolute";
            label.style.top = "5px";
            label.style.left = "5px";
            label.style.backgroundColor = "#007bff";
            label.style.color = "#fff";
            label.style.padding = "2px 4px";
            label.style.fontSize = "10px";
            label.style.borderRadius = "3px";

            // Append the label to the cell element
            info.el.appendChild(label);
        }
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

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
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
        },
        onError: (error) => {
            console.error("Error updating schedule:", error); // Log the error for debugging
            processing.value = false;
        },
        preserveScroll: true, // Preserve scroll position
    };

    if (editingSchedule.value) {
        router.put(
            route("schedules.update", editingSchedule.value.schedule_id),
            form.value,
            options,
        );
    } else {
        router.post(route("schedules.store"), form.value, options);
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
        schedule_date: schedule.schedule_date,
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

const deleteSchedule = (schedule) => {
    if (confirm("Are you sure you want to delete this schedule?")) {
        router.delete(route("schedules.destroy", schedule.schedule_id), {
            onSuccess: () => {
                schedules.value = schedules.value.filter(
                    (s) => s.schedule_id !== schedule.schedule_id,
                );
            },
            preserveScroll: true, // Preserve scroll position
        });
    }
};
</script>

<style scoped></style>
