<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useForm, usePage } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";

const user = usePage().props.auth.user;
const userDetails = ref(null);
const emit = defineEmits(["step-completed"]);
const isFormValid = ref(false);

const form = useForm({
    firstname: "",
    lastname: "",
    middle_initial: "",
    phone_number: "",
    eligibility: "",
});

// Computed property to check if required fields are filled
const areRequiredFieldsFilled = computed(() => {
    return form.firstname.trim() !== "" && form.lastname.trim() !== "";
});

// Watch for changes in required fields to update validity and emit event
watch(areRequiredFieldsFilled, (newValue) => {
    isFormValid.value = newValue;
    if (newValue) {
        emit("step-completed");
    }
});

const fetchUserDetails = async () => {
    try {
        const response = await axios.get(route("profile.user-details"));
        if (response.data) {
            userDetails.value = response.data;
            form.firstname = response.data.firstname || "";
            form.lastname = response.data.lastname || "";
            form.middle_initial = response.data.middle_initial || "";
            form.phone_number = response.data.phone_number || "";
            form.eligibility = response.data.eligibility || "";

            // Check if required fields are filled and emit "step-completed" if they are
            if (form.firstname && form.lastname) {
                isFormValid.value = true;
                emit("step-completed");
            }
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
};

const saveProfileDetails = async () => {
    // Don't submit if required fields are not filled
    if (!areRequiredFieldsFilled.value) {
        return;
    }

    try {
        await axios.post(route("profile.store-details"), form.data());
        showSuccessAlert();
        isFormValid.value = true;
        emit("step-completed");
    } catch (error) {
        console.error("Error saving profile details:", error);
    }
};

// Show success alert function
const showSuccessAlert = () => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile Details Saved Successfully!",
        iconColor: "#ffffffff",
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        color: "#ffffff",
        background: "#22c55e",
    });
};

onMounted(() => {
    fetchUserDetails();
});
</script>

<template>
    <section>
        <form @submit.prevent="saveProfileDetails" class="space-y-6">
            <div
                class="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel
                            for="firstname"
                            value="First Name"
                            class="text-gray-700 font-medium"
                        />
                        <TextInput
                            id="firstname"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="form.firstname"
                            required
                            placeholder="Enter your first name"
                        />
                        <InputError
                            class="mt-2"
                            :message="form.errors.firstname"
                        />
                    </div>

                    <div>
                        <InputLabel
                            for="lastname"
                            value="Last Name"
                            class="text-gray-700 font-medium"
                        />
                        <TextInput
                            id="lastname"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="form.lastname"
                            required
                            placeholder="Enter your last name"
                        />
                        <InputError
                            class="mt-2"
                            :message="form.errors.lastname"
                        />
                    </div>

                    <div>
                        <InputLabel
                            for="middle_initial"
                            value="Middle Initial"
                            class="text-gray-700 font-medium"
                        />
                        <TextInput
                            id="middle_initial"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="form.middle_initial"
                            maxlength="1"
                            placeholder="M"
                            @input="
                                form.middle_initial =
                                    $event.target.value.toUpperCase()
                            "
                        />
                        <InputError
                            class="mt-2"
                            :message="form.errors.middle_initial"
                        />
                    </div>

                    <div>
                        <InputLabel
                            for="phone_number"
                            value="Phone Number"
                            class="text-gray-700 font-medium"
                        />
                        <div class="relative mt-1 flex">
                            <div
                                class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                            >
                                +63
                            </div>
                            <TextInput
                                id="phone_number"
                                type="number"
                                class="block w-full rounded-none rounded-r-md"
                                v-model="form.phone_number"
                                maxlength="10"
                                placeholder="9123456789"
                            />
                        </div>
                        <InputError
                            class="mt-2"
                            :message="form.errors.phone_number"
                        />
                    </div>

                    <div class="md:col-span-2">
                        <InputLabel
                            for="eligibility"
                            value="Eligibility (Optional)"
                            class="text-gray-700 font-medium"
                        />
                        <TextInput
                            id="eligibility"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="form.eligibility"
                            placeholder="e.g., Professional License, Civil Service Eligibility"
                        />
                        <InputError
                            class="mt-2"
                            :message="form.errors.eligibility"
                        />
                    </div>
                </div>
            </div>

            <div class="flex justify-end">
                <PrimaryButton
                    :disabled="form.processing || !areRequiredFieldsFilled"
                    :class="[
                        'px-6 py-2',
                        areRequiredFieldsFilled
                            ? 'bg-green-700 hover:bg-green-800'
                            : 'bg-green-300 cursor-not-allowed',
                    ]"
                >
                    Save Profile Details
                </PrimaryButton>
            </div>
        </form>
    </section>
</template>
