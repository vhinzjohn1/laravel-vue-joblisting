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
    honors_received: "None",
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
                class="flex gap-2 items-center bg-green-700 hover:bg-green-800"
            >
                <span class="hidden sm:inline">Add Education</span>
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
            v-else-if="educations.length === 0"
            class="p-8 text-center bg-white rounded-lg border border-gray-100 shadow-sm"
        >
            <div class="flex justify-center">
                <AcademicCapIcon class="w-16 h-16 text-gray-400" />
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">
                No Educational Background Added Yet
            </h3>
            <p class="mt-2 text-gray-600">
                Start by adding your educational qualifications.
            </p>
            <button
                @click="showModal = true"
                class="inline-flex items-center px-4 py-2 mt-4 text-xs font-semibold tracking-widest text-white uppercase bg-green-700 rounded-md border border-transparent transition hover:bg-green-800 active:bg-green-900 focus:outline-none focus:border-green-900 focus:ring focus:ring-green-300 disabled:opacity-25"
            >
                Add Education
            </button>
        </div>

        <!-- Education Records -->
        <div v-else class="space-y-4">
            <div
                v-for="education in educations"
                :key="education.education_id"
                class="p-5 bg-white rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md"
            >
                <div class="flex justify-between">
                    <div class="flex-grow">
                        <div class="flex gap-3 items-start">
                            <div class="mt-1">
                                <AcademicCapIcon
                                    class="w-6 h-6 text-green-700"
                                />
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-gray-800">
                                    {{ education.degree_course }}
                                </h4>
                                <div
                                    class="flex items-center mt-1 text-gray-600"
                                >
                                    <BuildingLibraryIcon class="mr-1 w-4 h-4" />
                                    <span>{{ education.school_name }}</span>
                                </div>
                                <div
                                    class="flex items-center mt-1 text-gray-500"
                                >
                                    <CalendarIcon class="mr-1 w-4 h-4" />
                                    <span
                                        >Graduated:
                                        {{ education.year_graduated }}</span
                                    >
                                </div>
                                <div class="mt-1">
                                    <span
                                        class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-green-800 bg-green-100 rounded-full"
                                    >
                                        {{ education.level }}
                                    </span>
                                    <span
                                        v-if="education.honors_received"
                                        class="inline-flex items-center px-2.5 py-0.5 ml-2 text-xs font-medium text-blue-800 bg-blue-100 rounded-full"
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
                            <TrashIcon class="w-5 h-5" />
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
                            class="font-medium text-gray-700"
                        />
                        <select
                            id="level"
                            v-model="form.level"
                            class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                            required
                        >
                            <option value="" disabled>Select Level</option>
                            <option value="High School Diploma">High School Diploma</option>
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
                            class="font-medium text-gray-700"
                        />
                        <input
                            id="school_name"
                            type="text"
                            v-model="form.school_name"
                            class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                            placeholder="Enter school name"
                            required
                        />
                        <InputError :message="form.errors.school_name" />
                    </div>

                    <div>
                        <InputLabel
                            for="degree_course"
                            value="Degree/Course"
                            class="font-medium text-gray-700"
                        />
                        <input
                            id="degree_course"
                            type="text"
                            v-model="form.degree_course"
                            class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                            placeholder="e.g. BS Information Technology"
                            required
                        />
                        <InputError :message="form.errors.degree_course" />
                    </div>

                    <div>
                        <InputLabel
                            for="year_graduated"
                            value="Year Graduated"
                            class="font-medium text-gray-700"
                        />
                        <input
                            id="year_graduated"
                            type="number"
                            v-model="form.year_graduated"
                            min="1900"
                            :max="new Date().getFullYear()"
                            class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                            placeholder="2025"
                            required
                        />
                        <InputError :message="form.errors.year_graduated" />
                    </div>

                    <div>
                        <InputLabel
                            for="honors_received"
                            value="Honors Received (Optional)"
                            class="font-medium text-gray-700"
                        />
                        <select
                            id="honors_received"
                            v-model="form.honors_received"
                            class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                            placeholder="e.g., Cum Laude, Magna Cum Laude"
                        >
                            <option value="" disabled>Select Honors</option>
                            <option value="None">None</option>
                            <option value="Cum Laude">Cum Laude</option>
                            <option value="Magna Cum Laude">Magna Cum Laude</option>
                            <option value="Summa Cum Laude">Summa Cum Laude</option>
                        </select>
                        <InputError :message="form.errors.honors_received" />
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
                            Save Education
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    </section>
</template>
