<script setup>
import { ref, onMounted } from "vue";
import { useForm } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Modal from "@/Components/Modal.vue";
import {
    TrashIcon,
    AcademicCapIcon,
    CalendarIcon,
} from "@heroicons/vue/24/outline";

const trainings = ref([]);
const showModal = ref(false);
const isLoading = ref(true);

const form = useForm({
    title: "",
    description: "",
    institution: "",
    duration_hours: "",
    certificate_url: null,
});

const emit = defineEmits(["step-completed"]);

const fetchTrainings = async () => {
    try {
        isLoading.value = true;
        const response = await axios.get(
            route("profile-details.index", "training"),
        );
        trainings.value = response.data;
        isLoading.value = false;
    } catch (error) {
        console.error("Error fetching training data:", error);
        isLoading.value = false;
    }
};

const addTraining = async () => {
    try {
        const response = await axios.post(
            route("profile-details.store", "training"),
            form.data(),
            {
                preserveScroll: true,
            },
        );
        trainings.value.push(response.data);
        form.reset();
        showModal.value = false;
        showSuccessAlert("add");

        if (trainings.value.length > 0) {
            emit("step-completed");
        }
    } catch (error) {
        console.error(error.response.data);
    }
};

const deleteTraining = async (id) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
        await axios.delete(route("profile-details.destroy", ["training", id]), {
            preserveScroll: true,
        });
        fetchTrainings();
        showSuccessAlert("delete");
    }
};

// Format date for display
const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

// Show success alert function
const showSuccessAlert = (action) => {
    let title;

    switch (action) {
        case "add":
            title = "Training/Certification Added Successfully!";
            break;
        case "update":
            title = "Training/Certification Updated Successfully!";
            break;
        case "delete":
            title = "Training/Certification Deleted Successfully!";
            break;
        default:
            title = "Action Completed!";
    }

    // Using SweetAlert2 toast with custom styling
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: title,
        iconColor: "#ffffffff",
        showConfirmButton: false,
        timer: 3000, // Toast will disappear after 3 seconds
        toast: true, // Enable toast mode
        color: "#ffffff",
        background: "#22c55e",
    });
};

onMounted(() => {
    fetchTrainings().then(() => {
        if (trainings.value.length > 0) {
            emit("step-completed");
        }
    });
});
</script>

<template>
    <section>
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-800">
                Trainings & Certifications
            </h3>
            <PrimaryButton
                @click="showModal = true"
                class="bg-green-700 hover:bg-green-800 flex items-center gap-2"
            >
                <span class="hidden sm:inline">Add Training</span>
                <span class="sm:hidden">Add</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                    />
                </svg>
            </PrimaryButton>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center my-8">
            <div
                class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-700"
            ></div>
        </div>

        <!-- No Records State -->
        <div
            v-else-if="trainings.length === 0"
            class="bg-white rounded-lg shadow-sm p-8 border border-gray-100 text-center"
        >
            <div class="flex justify-center">
                <AcademicCapIcon class="h-16 w-16 text-gray-400" />
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">
                No Trainings or Certifications Added Yet
            </h3>
            <p class="mt-2 text-gray-600">
                Add your professional trainings and certifications.
            </p>
            <button
                @click="showModal = true"
                class="mt-4 inline-flex items-center px-4 py-2 bg-green-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-800 active:bg-green-900 focus:outline-none focus:border-green-900 focus:ring focus:ring-green-300 disabled:opacity-25 transition"
            >
                Add Training
            </button>
        </div>

        <!-- Training Records -->
        <div v-else class="space-y-4">
            <div
                v-for="training in trainings"
                :key="training.training_id"
                class="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
                <div class="flex justify-between">
                    <div class="flex-grow">
                        <div class="flex items-start gap-3">
                            <div class="mt-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6 text-green-700"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 class="font-semibold text-lg text-gray-800">
                                    {{ training.title }}
                                </h4>
                                <div
                                    class="flex items-center mt-1 text-gray-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                    <span>{{ training.institution }}</span>
                                </div>
                                <div
                                    class="flex items-center mt-1 text-gray-500"
                                >
                                    <span class="font-medium mr-2"
                                        >Duration:</span
                                    >
                                    <span
                                        >{{
                                            training.duration_hours
                                        }}
                                        hours</span
                                    >
                                </div>
                                <p
                                    v-if="training.description"
                                    class="mt-2 text-sm text-gray-600"
                                >
                                    {{ training.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            @click="deleteTraining(training.training_id)"
                            class="text-red-500 hover:text-red-700 focus:outline-none"
                            title="Delete"
                        >
                            <TrashIcon class="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Training Modal -->
        <Modal
            :title="'Add Training or Certification'"
            :show="showModal"
            @close="showModal = false"
            max-width="md"
        >
            <div class="p-6">
                <form @submit.prevent="addTraining" class="space-y-5">
                    <div>
                        <InputLabel
                            for="title"
                            value="Title"
                            class="text-gray-700 font-medium"
                        />
                        <input
                            id="title"
                            type="text"
                            v-model="form.title"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                            placeholder="Enter training or certification title"
                            required
                        />
                        <InputError :message="form.errors.title" />
                    </div>

                    <div>
                        <InputLabel
                            for="institution"
                            value="Institution"
                            class="text-gray-700 font-medium"
                        />
                        <input
                            id="institution"
                            type="text"
                            v-model="form.institution"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                            placeholder="Enter institution name"
                            required
                        />
                        <InputError :message="form.errors.institution" />
                    </div>

                    <div>
                        <InputLabel
                            for="duration_hours"
                            value="Duration (hours)"
                            class="text-gray-700 font-medium"
                        />
                        <input
                            id="duration_hours"
                            type="number"
                            v-model="form.duration_hours"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                            required
                        />
                        <InputError :message="form.errors.duration_hours" />
                    </div>

                    <div class="flex items-center justify-end gap-3 mt-6">
                        <button
                            type="button"
                            @click="showModal = false"
                            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-25 transition"
                        >
                            Cancel
                        </button>
                        <PrimaryButton
                            :disabled="form.processing"
                            class="bg-green-700 hover:bg-green-800"
                        >
                            Save Training
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    </section>
</template>
