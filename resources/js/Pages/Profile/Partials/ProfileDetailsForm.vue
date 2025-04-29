<script setup>
import { ref, onMounted } from "vue";
import { useForm, usePage } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";

const userDetails = ref(null);
const emit = defineEmits(["step-completed"]);
const isFormValid = ref(false);
const userCredentials = ref();
const currentRoute = usePage().url;
const user = usePage().props.auth.user;

const form = useForm({
    firstname: "",
    lastname: "",
    middle_name: "",
    phone_number: "",
    eligibility: "",
    email: ""
});

// Function to check if required fields in userDetails are filled
function areFetchedFieldsFilled(details) {
    const requireEmail = currentRoute !== '/complete-profile';
    const isHR = user.role_name === 'hr';

    return (
        details &&
        details.firstname && details.firstname.trim() !== "" &&
        details.lastname && details.lastname.trim() !== "" &&
        details.middle_name && details.middle_name.trim() !== "" &&
        details.phone_number && details.phone_number !== "" &&
        (!isHR || (details.eligibility && details.eligibility.trim() !== "")) &&
        (!requireEmail || (details.email && details.email.trim() !== ""))
    );
}

const fetchUserDetails = async () => {
    try {
        const response = await axios.get(route("profile.user-details"));
        console.log('This is the props user', response.data.userDetails);
        if (response.data) {
            userDetails.value = response.data.userDetails; // Correctly assign userDetails
            userCredentials.value = response.data.userCredentials; // Assign userCredentials

            // Populate form fields with the fetched data
            form.firstname = userDetails.value.firstname || "";
            form.lastname = userDetails.value.lastname || "";
            form.middle_name = userDetails.value.middle_name || "";
            form.phone_number = userDetails.value.phone_number || "";
            form.eligibility = userDetails.value.eligibility || "";
            form.email = userCredentials.value.email || "";

            // Check if required fields in fetched data are filled and emit "step-completed" if they are
            if (areFetchedFieldsFilled(userDetails.value)) {
                isFormValid.value = true;
                emit("step-completed");
            }
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
};

const saveProfileDetails = async () => {
    const isHR = user.role_name === 'hr';

    // Don't submit if required fields are not filled
    if (
        !form.firstname ||
        !form.lastname ||
        !form.middle_name ||
        !form.phone_number ||
        (!isHR && !form.eligibility) ||
        (currentRoute !== '/complete-profile' && !form.email)
    ) {
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
                class="p-6 bg-white rounded-lg border border-gray-100 shadow-sm"
            >
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <InputLabel
                            for="firstname"
                            value="First Name"
                            class="font-medium text-gray-700"
                        />
                        <TextInput
                            id="firstname"
                            type="text"
                            class="block mt-1 w-full"
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
                        />
                        <TextInput
                            id="lastname"
                            type="text"
                            class="block mt-1 w-full"
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
                        />
                        <TextInput
                            id="middle_name"
                            type="text"
                            class="block mt-1 w-full"
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
                        />
                        <div class="flex relative mt-1">
                            <TextInput
                                id="phone_number"
                                type="number"
                                class="block w-full rounded-none rounded-r-md"
                                v-model="form.phone_number"
                                maxlength="10"
                                isPhoneNumber
                                placeholder="9123456789"
                                required
                            />
                        </div>
                        <InputError
                            class="mt-2"
                            :message="form.errors.phone_number"
                        />
                    </div>

                    <!-- Email if current route is complete-profile not show -->
                    <div v-if="currentRoute !== '/complete-profile'">
                        <InputLabel
                            for="email"
                            value="Email"
                            class="font-medium text-gray-700"
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
                    </div>

                    <div class="md:col-span-2" v-if="user.role_name !== 'hr'">
                        <InputLabel
                            for="eligibility"
                            value="Eligibility (Optional)"
                            class="font-medium text-gray-700"
                        />
                        <select
                            id="eligibility"
                            v-model="form.eligibility"
                            placeholder="e.g., Professional License, Civil Service Eligibility"
                            class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="" selected disabled hidden>
                            </option>
                            <option value="None">None</option>
                            <option value="Career Service (Professional)">
                                Career Service (Professional)
                            </option>
                            <option value="Career Service (Sub-Professional)">
                                Career Service (Sub-Professional)
                            </option>
                            <option value="RA 1080 (Board/Bar/Court)">
                                RA 1080 (Board/Bar/Court)
                            </option>
                            <option value="PD 907">PD 907</option>
                        </select>
                        <InputError
                            class="mt-2"
                            :message="form.errors.eligibility"
                        />
                    </div>
                </div>
            </div>

            <div class="flex justify-end">
                <PrimaryButton
                    type="submit"
                    :disabled="form.processing || !form.firstname || !form.lastname || !form.middle_name || !form.phone_number || (user.role_name !== 'hr' && !form.eligibility) || (currentRoute !== '/complete-profile' && !form.email)"
                    :class="[
                        'px-6 py-2',
                        form.firstname && form.lastname && form.middle_name && form.phone_number && (user.role_name === 'hr' || form.eligibility) && (currentRoute === '/complete-profile' || form.email)
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
