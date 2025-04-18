<script setup>
import { ref, onMounted } from "vue";
import { useForm } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Modal from "@/Components/Modal.vue";
import {
    TrashIcon,
    BriefcaseIcon,
    BuildingOfficeIcon,
    CalendarIcon,
} from "@heroicons/vue/24/outline";

const experiences = ref([]);
const showModal = ref(false);
const isLoading = ref(true);

const form = useForm({
    position: "",
    company_name: "",
    start_date: "",
    end_date: "",
    is_current_job: false,
    responsibilities: "",
});

const emit = defineEmits(["step-completed"]);

const fetchExperiences = async () => {
    try {
        isLoading.value = true;
        const response = await axios.get(
            route("profile-details.index", "experience"),
        );
        experiences.value = response.data;
        isLoading.value = false;
    } catch (error) {
        console.error("Error fetching experience data:", error);
        isLoading.value = false;
    }
};

const addExperience = async () => {
    try {
        const response = await axios.post(
            route("profile-details.store", "experience"),
            form.data(),
            {
                preserveScroll: true,
            },
        );
        experiences.value.push(response.data);
        form.reset();
        showModal.value = false;
        showSuccessAlert("add");

        // Emit completion event if at least one experience record exists
        if (experiences.value.length > 0) {
            emit("step-completed");
        }
    } catch (error) {
        console.error(error.response.data);
    }
};

const deleteExperience = async (id) => {
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
        await axios.delete(
            route("profile-details.destroy", ["experience", id]),
            {
                preserveScroll: true,
            },
        );
        fetchExperiences();
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
    });
};

// Show success alert function
const showSuccessAlert = (action) => {
    let title;

    switch (action) {
        case "add":
            title = "Work Experience Added Successfully!";
            break;
        case "update":
            title = "Work Experience Updated Successfully!";
            break;
        case "delete":
            title = "Work Experience Deleted Successfully!";
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
    fetchExperiences().then(() => {
        // Emit completion event if experience records already exist
        if (experiences.value.length > 0) {
            emit("step-completed");
        }
    });
});
</script>

<template>
    <section>
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-800">Work Experience</h3>
            <PrimaryButton
                @click="showModal = true"
                class="flex gap-2 items-center bg-green-700 hover:bg-green-800"
            >
                <span class="hidden sm:inline">Add Experience</span>
                <span class="sm:hidden">Add</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
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
                class="w-10 h-10 rounded-full border-t-2 border-b-2 border-green-700 animate-spin"
            ></div>
        </div>

        <!-- No Records State -->
        <div
            v-else-if="experiences.length === 0"
            class="p-8 text-center bg-white rounded-lg border border-gray-100 shadow-sm"
        >
            <div class="flex justify-center">
                <BriefcaseIcon class="w-16 h-16 text-gray-400" />
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">
                No Work Experience Added Yet
            </h3>
            <p class="mt-2 text-gray-600">
                Start by adding your professional work experience.
            </p>
            <button
                @click="showModal = true"
                class="inline-flex items-center px-4 py-2 mt-4 text-xs font-semibold tracking-widest text-white uppercase bg-green-700 rounded-md border border-transparent transition hover:bg-green-800 active:bg-green-900 focus:outline-none focus:border-green-900 focus:ring focus:ring-green-300 disabled:opacity-25"
            >
                Add Experience
            </button>
        </div>

        <!-- Experience Records -->
        <div v-else class="space-y-4">
            <div
                v-for="experience in experiences"
                :key="experience.experience_id"
                class="p-5 bg-white rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md"
            >
                <div class="flex justify-between">
                    <div class="flex-grow">
                        <div class="flex gap-3 items-start">
                            <div class="mt-1">
                                <BriefcaseIcon class="w-6 h-6 text-green-700" />
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-gray-800">
                                    {{ experience.position }}
                                </h4>
                                <div
                                    class="flex items-center mt-1 text-gray-600"
                                >
                                    <BuildingOfficeIcon class="mr-1 w-4 h-4" />
                                    <span>{{ experience.company_name }}</span>
                                </div>
                                <div
                                    class="flex items-center mt-1 text-gray-500"
                                >
                                    <CalendarIcon class="mr-1 w-4 h-4" />
                                    <span>
                                        {{ formatDate(experience.start_date) }}
                                        -
                                        {{
                                            experience.is_current_job
                                                ? "Present"
                                                : formatDate(
                                                      experience.end_date,
                                                  )
                                        }}
                                    </span>
                                </div>
                                <p
                                    v-if="experience.responsibilities"
                                    class="mt-2 text-sm text-gray-600"
                                >
                                    {{ experience.responsibilities }}
                                </p>
                                <div
                                    class="mt-2"
                                    v-if="experience.is_current_job"
                                >
                                    <span
                                        class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-green-800 bg-green-100 rounded-full"
                                    >
                                        Current Position
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            @click="deleteExperience(experience.experience_id)"
                            class="text-red-500 hover:text-red-700 focus:outline-none"
                            title="Delete"
                        >
                            <TrashIcon class="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Experience Modal -->
        <Modal
            :title="'Add Work Experience'"
            :show="showModal"
            @close="showModal = false"
            max-width="md"
        >
            <div class="p-6">
                <form @submit.prevent="addExperience" class="space-y-5">
                    <div>
                        <InputLabel
                            for="position"
                            value="Position"
                            class="font-medium text-gray-700"
                        />
                        <input
                            id="position"
                            type="text"
                            v-model="form.position"
                            class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                            placeholder="e.g. Science Teacher"
                            required
                        />
                        <InputError :message="form.errors.position" />
                    </div>

                    <div>
                        <InputLabel
                            for="company_name"
                            value="Company Name"
                            class="font-medium text-gray-700"
                        />
                        <input
                            id="company_name"
                            type="text"
                            v-model="form.company_name"
                            class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                            placeholder="e.g. School Name"
                            required
                        />
                        <InputError :message="form.errors.company_name" />
                    </div>

                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <InputLabel
                                for="start_date"
                                value="Start Date"
                                class="font-medium text-gray-700"
                            />
                            <input
                                id="start_date"
                                type="date"
                                v-model="form.start_date"
                                class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                                required
                            />
                            <InputError :message="form.errors.start_date" />
                        </div>

                        <div>
                            <InputLabel
                                for="end_date"
                                value="End Date"
                                class="font-medium text-gray-700"
                            />
                            <input
                                id="end_date"
                                type="date"
                                v-model="form.end_date"
                                :disabled="form.is_current_job"
                                class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                                :required="!form.is_current_job"
                            />
                            <InputError :message="form.errors.end_date" />
                        </div>
                    </div>

                    <div class="flex items-center">
                        <input
                            id="is_current_job"
                            type="checkbox"
                            v-model="form.is_current_job"
                            class="text-green-600 rounded border-gray-300 shadow-sm focus:ring-green-500"
                        />
                        <label
                            for="is_current_job"
                            class="ml-2 text-sm text-gray-700"
                            >This is my current job</label
                        >
                    </div>

                    <div>
                        <InputLabel
                            for="responsibilities"
                            value="Responsibilities (Optional)"
                            class="font-medium text-gray-700"
                        />
                        <textarea
                            id="responsibilities"
                            v-model="form.responsibilities"
                            rows="3"
                            class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                            placeholder="Describe your key responsibilities"
                        ></textarea>
                        <InputError :message="form.errors.responsibilities" />
                    </div>

                    <div class="flex gap-3 justify-end items-center mt-6">
                        <button
                            type="button"
                            @click="showModal = false"
                            class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-gray-700 uppercase rounded-md border border-gray-300 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-25"
                        >
                            Cancel
                        </button>
                        <PrimaryButton
                            :disabled="form.processing"
                            class="bg-green-700 hover:bg-green-800"
                        >
                            Save Experience
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    </section>
</template>
