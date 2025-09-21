<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useForm, usePage } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";

const userDetails = ref(null);
const emit = defineEmits(["step-completed"]);
const isFormValid = ref(false);
const userCredentials = ref();
const user = usePage().props.auth.user;
const isLoading = ref(false);
let pollingInterval = null;

const form = useForm({
    firstname: "",
    lastname: "",
    middle_name: "",
    phone_number: "",
    email: "",
    email_verified_at: user.email_verified_at
});

const isEmailVerified = computed(() => !!form.email_verified_at);

// Function to check if required fields in userDetails are filled
function areFetchedFieldsFilled(details) {
    const isHR = user.role_name === 'hr';

    return (
        details &&
        details.firstname && details.firstname.trim() !== "" &&
        details.lastname && details.lastname.trim() !== "" &&
        details.middle_name && details.middle_name.trim() !== "" &&
        details.phone_number && details.phone_number !== "" &&
        form.email && form.email.trim() !== ""
    );
}

const fetchUserDetails = async () => {
    try {
        const response = await axios.get(route("profile.user-details"));
        console.log('This is the response from the fetchUserDetails function', response.data);
        if (response.data) {
            userDetails.value = response.data.userDetails;
            userCredentials.value = response.data.userCredentials;

            const details = Array.isArray(userDetails.value) ? userDetails.value[0] : userDetails.value;
            form.firstname = details?.firstname || "";
            form.lastname = details?.lastname || "";
            form.middle_name = details?.middle_name || "";
            form.phone_number = details?.phone_number || "";
            form.email = userCredentials.value.email || "";
            form.email_verified_at = userCredentials.value.email_verified_at || "";
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
};

const saveProfileDetails = async () => {
    isLoading.value = true;
    const isHR = user.role_name === 'hr';

    console.log('This is the form data', form.data());

    // Stop polling during save operation
    if (pollingInterval) {
        clearInterval(pollingInterval);
    }

    // Don't submit if required fields are not filled
    if (
        !form.firstname ||
        !form.lastname ||
        !form.middle_name ||
        !form.phone_number ||
        !form.email
    ) {
        // Restart polling if not submitting due to validation
        pollingInterval = setInterval(pollEmailVerificationStatus, 5000);
        return;
    }

    try {
        await axios.post(route("profile.store-details"), form.data());
        showSuccessAlert();
        isLoading.value = false;
        isFormValid.value = true;
        emit("step-completed"); // Re-added this line
        fetchUserDetails(); // Call fetchUserDetails after successful save
        if (!isEmailVerified.value) {
            resendVerificationEmail();
        }
    } catch (error) {
        console.error("Error saving profile details:", error);
        isLoading.value = false;
    } finally {
        // Always restart polling after the save operation, regardless of success or failure
        pollingInterval = setInterval(pollEmailVerificationStatus, 5000);
    }
};

const resendVerificationEmail = () => {
    axios.post(route('custom-verification.send'))
        .then(() => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Verification email sent!",
                text: "Please check your email to verify your account.",
                showConfirmButton: false,
                timer: 3000,
                toast: true,
                color: "#ffffff",
                background: "#22c55e",
            });
        })
        .catch((error) => {
            console.error("Error sending verification email:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: "Failed to send verification email. Please try again.",
                showConfirmButton: false,
                timer: 3000,
                toast: true,
                color: "#ffffff",
                background: "#ef4444",
            });
        });
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

const showValidationToast = () => {
    const missingFields = [];

    if (!form.firstname) missingFields.push('First Name');
    if (!form.lastname) missingFields.push('Last Name');
    if (!form.middle_name) missingFields.push('Middle Name');
    if (!form.phone_number) missingFields.push('Phone Number');
    if (!form.email) missingFields.push('Email');

    Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Required Fields Missing",
        html: `
            <div class="text-left">
                <p class="mb-2">Please fill in the following required fields:</p>
                <ul class="list-disc pl-4">
                    ${missingFields.map(field => `<li>${field}</li>`).join('')}
                </ul>
            </div>
        `,
        showConfirmButton: false,
        timer: 5000,
        toast: true,
        color: "#ffffff",
        background: "#f59e0b",
    });
};

// Polling function to only update email verification status
const pollEmailVerificationStatus = async () => {
    try {
        const response = await axios.get(route("profile.user-details"));
        console.log('This is the response from the polling function', response.data);
        if (response.data && response.data.userCredentials) {
            form.email_verified_at = response.data.userCredentials.email_verified_at || "";
        }
    } catch (error) {
        console.error("Error polling email verification status:", error);
    }
};

onMounted(() => {
    fetchUserDetails();
    pollingInterval = setInterval(pollEmailVerificationStatus, 5000);
});

onUnmounted(() => {
    if (pollingInterval) clearInterval(pollingInterval);
    console.log('Unmounting the component');
});
</script>

<template>
    <section>
        <form @submit.prevent="saveProfileDetails" class="space-y-6">
            <div
                class="p-6 bg-white rounded-lg border border-gray-100 shadow-sm"
            >
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <InputLabel
                            for="firstname"
                            value="First Name"
                            class="font-medium text-gray-700"
                            required
                        />
                        <TextInput
                            id="firstname"
                            type="text"
                            class="block mt-1 w-full uppercase"
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
                            class="font-medium text-gray-700"
                            required
                        />
                        <TextInput
                            id="lastname"
                            type="text"
                            class="block mt-1 w-full uppercase"
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
                            for="middle_name"
                            value="Middle Name"
                            class="font-medium text-gray-700"
                            required
                        />
                        <TextInput
                            id="middle_name"
                            type="text"
                            class="block mt-1 w-full uppercase"
                            v-model="form.middle_name"
                            placeholder="Enter Middle Name"
                        />
                        <InputError
                            class="mt-2"
                            :message="form.errors.middle_name"
                        />
                    </div>

                    <div>
                        <InputLabel
                            for="phone_number"
                            value="Phone Number"
                            class="font-medium text-gray-700"
                            required
                        />
                        <div class="flex relative mt-1">
                            <TextInput
                                id="phone_number"
                                type="tel"
                                class="block w-full rounded-none rounded-r-md"
                                v-model="form.phone_number"
                                maxlength="10"
                                pattern="^9[0-9]{9}$"
                                isPhoneNumber
                                placeholder="9351234567"
                                required
                                @input="form.phone_number = form.phone_number.replace(/[^0-9]/g, '').slice(0, 10); if (form.phone_number.length > 0 && form.phone_number[0] !== '9') form.phone_number = '9' + form.phone_number.substring(1);"
                            />
                        </div>
                        <InputError
                            class="mt-2"
                            :message="form.errors.phone_number"
                        />
                    </div>

                    <!-- Email field - always show -->
                    <div>
                        <InputLabel
                            for="email"
                            value="Email"
                            class="font-medium text-gray-700"
                            required
                        />
                        <div class="flex relative mt-1">
                            <TextInput
                                id="email"
                                type="email"
                                class="block w-full rounded-none rounded-r-md"
                                v-model="form.email"
                                placeholder="example@gmail.com"
                                required
                            />
                        </div>
                        <InputError
                            class="mt-2"
                            :message="form.errors.email"
                        />
                        <!-- Email verification status -->
                        <div v-if="!isEmailVerified" class="mt-2">
                            <p class="text-sm text-red-600">
                                Your email is not verified. Please verify your email.
                                <button
                                    type="button"
                                    @click="resendVerificationEmail"
                                    class="text-blue-600 hover:text-blue-800 underline"
                                >
                                    Click here to resend verification email
                                </button>
                            </p>
                        </div>
                        <div v-else class="mt-2">
                            <p class="text-sm text-green-600">
                                Email verified ✓
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div class="flex justify-end">
                <PrimaryButton
                    type="submit"
                    :loading="isLoading"
                    :disabled="form.processing || !form.firstname || !form.lastname || !form.middle_name || !form.phone_number || !form.email"
                    :class="[
                        'px-6 py-2',
                        form.firstname && form.lastname && form.middle_name && form.phone_number && form.email
                            ? 'bg-green-700 hover:bg-green-800'
                            : 'bg-green-300 cursor-not-allowed',
                    ]"
                    @click="!form.firstname || !form.lastname || !form.middle_name || !form.phone_number || !form.email ? showValidationToast() : null"
                >
                    Save Profile Details
                </PrimaryButton>
            </div>
        </form>
    </section>
</template>
