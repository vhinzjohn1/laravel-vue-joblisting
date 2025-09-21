<script setup>
import { ref, onMounted } from "vue";
import { useForm, usePage } from "@inertiajs/vue3";
import InputLabel from "@/Components/InputLabel.vue";
import InputError from "@/Components/InputError.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import DangerButton from "@/Components/DangerButton.vue";
import Modal from "@/Components/Modal.vue"; // Import Modal component
import CustomSelect from "@/Components/CustomSelect.vue"; // Import CustomSelect component
import {
    AcademicCapIcon,
} from "@heroicons/vue/24/outline"; // Import icons

const emit = defineEmits(["step-completed"]);
const user = usePage().props.auth.user;
const allEligibilities = ref([]);
const userEligibilities = ref([]);
const isLoading = ref(true); // Set to true initially for loading state
const showModal = ref(false); // Renamed for consistency with EducationalBackgroundForm.vue

const form = useForm({
    eligibility_id: "",
});

const fetchAllEligibilities = async () => {
    try {
        const response = await axios.get(route("eligibility.all"));
        allEligibilities.value = response.data;
    } catch (error) {
        console.error("Error fetching all eligibilities:", error);
    }
};

const fetchUserEligibilities = async () => {
    try {
        isLoading.value = true; // Set loading to true before fetching
        const response = await axios.get(route("user-eligibility.index"));
        userEligibilities.value = response.data;
        if (userEligibilities.value.length > 0) {
            emit("step-completed");
        }
        isLoading.value = false; // Set loading to false after fetching
    } catch (error) {
        console.error("Error fetching user eligibilities:", error);
        isLoading.value = false; // Set loading to false on error
    }
};

const addEligibility = async () => {
    isLoading.value = true;
    try {
        await axios.post(route("user-eligibility.store"), {
            eligibility_id: form.eligibility_id,
        });
        showSuccessAlert("Eligibility Added Successfully!");
        form.reset();
        showModal.value = false; // Close modal on success
        fetchUserEligibilities();
    } catch (error) {
        console.error("Error adding user eligibility:", error);
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error!",
            text: error.response.data.message || "Failed to add eligibility. Please try again.",
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            color: "#ffffff",
            background: "#ef4444",
        });
    } finally {
        isLoading.value = false;
    }
};

const removeEligibility = async (userEligibilityId) => {
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
        isLoading.value = true;
        try {
            await axios.delete(route("user-eligibility.destroy", userEligibilityId));
            showSuccessAlert("Eligibility Removed Successfully!");
            fetchUserEligibilities();
        } catch (error) {
            console.error("Error removing user eligibility:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: "Failed to remove eligibility. Please try again.",
                showConfirmButton: false,
                timer: 3000,
                toast: true,
                color: "#ffffff",
                background: "#ef4444",
            });
        } finally {
            isLoading.value = false;
        }
    }
};

const showSuccessAlert = (message) => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        iconColor: "#ffffffff",
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        color: "#ffffff",
        background: "#22c55e",
    });
};

const showValidationToast = () => {
    Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Eligibility Field Missing",
        html: `
            <div class="text-left">
                <p class="mb-2">Please select an eligibility.</p>
            </div>
        `,
        showConfirmButton: false,
        timer: 5000,
        toast: true,
        color: "#ffffff",
        background: "#f59e0b",
    });
};

onMounted(() => {
    fetchAllEligibilities();
    fetchUserEligibilities();
});
</script>

<template>
    <section class="space-y-6">
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-800">
                Your Eligibilities
            </h3>
            <PrimaryButton
                @click="showModal = true"
                class="flex gap-2 items-center bg-green-700 hover:bg-green-800"
            >
                <span class="hidden sm:inline">Add Eligibility</span>
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
            v-else-if="userEligibilities.length === 0"
            class="p-8 text-center bg-white rounded-lg border border-gray-100 shadow-sm"
        >
            <div class="flex justify-center">
                <AcademicCapIcon class="w-16 h-16 text-gray-400" />
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">
                No Eligibilities Added Yet
            </h3>
            <p class="mt-2 text-gray-600">
                Start by adding your eligibilities.
            </p>
            <PrimaryButton
                @click="showModal = true"
                class="inline-flex items-center px-4 py-2 mt-4 text-xs font-semibold tracking-widest text-white uppercase bg-green-700 rounded-md border border-transparent transition hover:bg-green-800 active:bg-green-900 focus:outline-none focus:border-green-900 focus:ring focus:ring-green-300 disabled:opacity-25"
            >
                Add Eligibility
            </PrimaryButton>
        </div>

        <!-- Eligibility Records -->
        <div v-else class="space-y-4">
            <div
                v-for="userEligibility in userEligibilities"
                :key="userEligibility.user_eligibility_id"
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
                                    {{ userEligibility.eligibility.eligibility_name }}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            @click="removeEligibility(userEligibility.user_eligibility_id)"
                            class="text-red-500 hover:text-red-700 focus:outline-none"
                            title="Delete"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.581.19-2.357.362L4 4.5V8h12V4.5l-.357-.19c-.776-.172-1.562-.285-2.357-.362V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.828 0 1.5.672 1.5 1.5V6h-3V5.5c0-.828.672-1.5 1.5-1.5ZM3.75 7.5v4.583A1.5 1.5 0 0 0 5.25 13.5h9.5a1.5 1.5 0 0 0 1.5-1.5V7.5h-12Z" clip-rule="evenodd" /><path d="M15.75 14.567a.75.75 0 0 1 .75.75v1.183A2.25 2.25 0 0 1 14.25 18H5.75A2.25 2.25 0 0 1 3.5 16.5V15.317a.75.75 0 0 1 .75-.75h11.25Z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Eligibility Modal -->
        <Modal
            :title="'Add Eligibility'"
            :show="showModal"
            @close="showModal = false; form.reset()"
            max-width="md"
        >
            <div class="p-6">
                <form @submit.prevent="addEligibility" class="space-y-5">
                    <div>
                        <InputLabel
                            for="eligibility_id"
                            value="Select Eligibility"
                            class="font-medium text-gray-700"
                            required
                        />
                        <CustomSelect
                            id="eligibility_id"
                            v-model="form.eligibility_id"
                            :options="allEligibilities"
                            valueKey="eligibility_id"
                            displayFormat="{eligibility_name}"
                            placeholder="Select an eligibility"
                            :required="true"
                        />
                        <InputError
                            class="mt-2"
                            :message="form.errors.eligibility_id"
                        />
                    </div>
                    <div class="flex gap-3 justify-end items-center mt-6">
                        <button
                            type="button"
                            @click="showModal = false; form.reset()"
                            class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-gray-700 uppercase rounded-md border border-gray-300 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-25"
                        >
                            Cancel
                        </button>
                        <PrimaryButton
                            :disabled="form.processing || !form.eligibility_id"
                            class="bg-green-700 hover:bg-green-800"
                        >
                            Save Eligibility
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    </section>
</template>
