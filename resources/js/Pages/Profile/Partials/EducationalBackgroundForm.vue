<script setup>
import { ref, onMounted } from "vue";
import { useForm } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Modal from "@/Components/Modal.vue";
import {
    TrashIcon,
    PencilIcon,
    AcademicCapIcon,
    BuildingLibraryIcon,
    CalendarIcon,
} from "@heroicons/vue/24/outline";

const educations = ref([]);
const showModal = ref(false);
const isLoading = ref(true);

const form = useForm({
    level: "",
    school_name: "",
    degree_course: "",
    year_graduated: "",
    honors_received: "",
});

const emit = defineEmits(["step-completed"]);

const fetchEducations = async () => {
    try {
        isLoading.value = true;
        const response = await axios.get(
            route("profile-details.index", "education"),
        );
        educations.value = response.data;
        isLoading.value = false;
    } catch (error) {
        console.error("Error fetching education data:", error);
        isLoading.value = false;
    }
};

const addEducation = async () => {
    try {
        const response = await axios.post(
            route("profile-details.store", "education"),
            form.data(),
            {
                preserveScroll: true,
            },
        );
        educations.value.push(response.data);
        form.reset();
        showModal.value = false;
        showSuccessAlert("add");

        if (educations.value.length > 0) {
            emit("step-completed");
        }
    } catch (error) {
        console.error(error.response.data);
    }
};

const deleteEducation = async (id) => {
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
            route("profile-details.destroy", ["education", id]),
            {
                preserveScroll: true,
            },
        );
        fetchEducations();
        showSuccessAlert("delete");
    }
};

// Show success alert function
const showSuccessAlert = (action) => {
    let title;

    switch (action) {
        case "add":
            title = "Educational Background Added Successfully!";
            break;
        case "update":
            title = "Educational Background Updated Successfully!";
            break;
        case "delete":
            title = "Educational Background Deleted Successfully!";
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
    fetchEducations().then(() => {
        if (educations.value.length > 0) {
            emit("step-completed");
        }
    });
});
</script>

<template>
    <section>
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-800">
                Educational Background
            </h3>
            <PrimaryButton
                @click="showModal = true"
                class="bg-green-700 hover:bg-green-800 flex items-center gap-2"
            >
                <span class="hidden sm:inline">Add Education</span>
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
            v-else-if="educations.length === 0"
            class="bg-white rounded-lg shadow-sm p-8 border border-gray-100 text-center"
        >
            <div class="flex justify-center">
                <AcademicCapIcon class="h-16 w-16 text-gray-400" />
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">
                No Educational Background Added Yet
            </h3>
            <p class="mt-2 text-gray-600">
                Start by adding your educational qualifications.
            </p>
            <button
                @click="showModal = true"
                class="mt-4 inline-flex items-center px-4 py-2 bg-green-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-800 active:bg-green-900 focus:outline-none focus:border-green-900 focus:ring focus:ring-green-300 disabled:opacity-25 transition"
            >
                Add Education
            </button>
        </div>

        <!-- Education Records -->
        <div v-else class="space-y-4">
            <div
                v-for="education in educations"
                :key="education.education_id"
                class="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
                <div class="flex justify-between">
                    <div class="flex-grow">
                        <div class="flex items-start gap-3">
                            <div class="mt-1">
                                <AcademicCapIcon
                                    class="h-6 w-6 text-green-700"
                                />
                            </div>
                            <div>
                                <h4 class="font-semibold text-lg text-gray-800">
                                    {{ education.degree_course }}
                                </h4>
                                <div
                                    class="flex items-center mt-1 text-gray-600"
                                >
                                    <BuildingLibraryIcon class="h-4 w-4 mr-1" />
                                    <span>{{ education.school_name }}</span>
                                </div>
                                <div
                                    class="flex items-center mt-1 text-gray-500"
                                >
                                    <CalendarIcon class="h-4 w-4 mr-1" />
                                    <span
                                        >Graduated:
                                        {{ education.year_graduated }}</span
                                    >
                                </div>
                                <div class="mt-1">
                                    <span
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                    >
                                        {{ education.level }}
                                    </span>
                                    <span
                                        v-if="education.honors_received"
                                        class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                    >
                                        {{ education.honors_received }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            @click="deleteEducation(education.education_id)"
                            class="text-red-500 hover:text-red-700 focus:outline-none"
                            title="Delete"
                        >
                            <TrashIcon class="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Education Modal -->
        <Modal
            :title="'Add Educational Background'"
            :show="showModal"
            @close="showModal = false"
            max-width="md"
        >
            <div class="p-6">
                <form @submit.prevent="addEducation" class="space-y-5">
                    <div>
                        <InputLabel
                            for="level"
                            value="Level"
                            class="text-gray-700 font-medium"
                        />
                        <select
                            id="level"
                            v-model="form.level"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                            required
                        >
                            <option value="">Select Level</option>
                            <option value="Bachelor's degree">Bachelor's degree</option>
                            <option value="Master's degree">Master's degree</option>
                            <option value="Doctorate degree">Doctorate degree</option>
                        </select>
                        <InputError :message="form.errors.level" />
                    </div>

                    <div>
                        <InputLabel
                            for="school_name"
                            value="School Name"
                            class="text-gray-700 font-medium"
                        />
                        <input
                            id="school_name"
                            type="text"
                            v-model="form.school_name"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                            placeholder="Enter school name"
                            required
                        />
                        <InputError :message="form.errors.school_name" />
                    </div>

                    <div>
                        <InputLabel
                            for="degree_course"
                            value="Degree/Course"
                            class="text-gray-700 font-medium"
                        />
                        <input
                            id="degree_course"
                            type="text"
                            v-model="form.degree_course"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                            placeholder="e.g. BS Information Technology"
                            required
                        />
                        <InputError :message="form.errors.degree_course" />
                    </div>

                    <div>
                        <InputLabel
                            for="year_graduated"
                            value="Year Graduated"
                            class="text-gray-700 font-medium"
                        />
                        <input
                            id="year_graduated"
                            type="number"
                            v-model="form.year_graduated"
                            min="1900"
                            :max="new Date().getFullYear()"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                            placeholder="2025"
                            required
                        />
                        <InputError :message="form.errors.year_graduated" />
                    </div>

                    <div>
                        <InputLabel
                            for="honors_received"
                            value="Honors Received (Optional)"
                            class="text-gray-700 font-medium"
                        />
                        <input
                            id="honors_received"
                            type="text"
                            v-model="form.honors_received"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                            placeholder="e.g., Cum Laude, Magna Cum Laude"
                        />
                        <InputError :message="form.errors.honors_received" />
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
                            Save Education
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    </section>
</template>
