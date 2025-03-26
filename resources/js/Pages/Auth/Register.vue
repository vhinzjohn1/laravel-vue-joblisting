<script setup>
import { ref } from "vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

const form = useForm({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    privacy_consent: false,
    applicant_consent: false,
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const showPrivacyModal = ref(false);
const showApplicantConsentModal = ref(false);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
};

const openPrivacyModal = () => {
    showPrivacyModal.value = true;
};

const closePrivacyModal = () => {
    showPrivacyModal.value = false;
};

const openApplicantConsentModal = () => {
    showApplicantConsentModal.value = true;
};

const closeApplicantConsentModal = () => {
    showApplicantConsentModal.value = false;
};

const submit = () => {
    form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation"),
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Register" />

        <h1 class="text-3xl font-bold text-center mb-6">Register Page</h1>
        <form @submit.prevent="submit">
            <div>
                <InputLabel for="username" value="Username" />

                <TextInput
                    id="username"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.username"
                    placeholder="username"
                    required
                    autofocus
                    autocomplete="username"
                />

                <InputError class="mt-2" :message="form.errors.username" />
            </div>

            <div class="mt-4">
                <InputLabel for="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    placeholder="example@gmail.com"
                    required
                    autocomplete="username"
                />

                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div class="mt-4 relative">
                <InputLabel for="password" value="Password" />

                <TextInput
                    id="password"
                    :type="showPassword ? 'text' : 'password'"
                    class="mt-1 block w-full pr-10"
                    v-model="form.password"
                    required
                    autocomplete="new-password"
                />

                <button
                    type="button"
                    tabindex="-1"
                    class="absolute inset-y-0 right-0 top-7 px-3 flex items-center"
                    @click="togglePasswordVisibility"
                >
                    <!-- Eye icon when password is hidden -->
                    <svg
                        v-if="!showPassword"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-5-7-9-7zM10 15a5 5 0 110-10 5 5 0 010 10z"
                        />
                        <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
                    </svg>
                    <!-- Eye-off icon when password is shown -->
                    <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M4.03 3.97a.75.75 0 011.06 0l11 11a.75.75 0 11-1.06 1.06l-1.21-1.21a9.93 9.93 0 01-4.72 1.12c-5 0-8.27-4.11-9-7a9.95 9.95 0 012.07-3.39L4.03 3.97zM10 5c2.07 0 3.95.95 5.07 2.44l-1.41 1.41A3.5 3.5 0 0010 6.5a3.5 3.5 0 00-3.66 4.36l-1.41 1.41A5.002 5.002 0 0110 5z"
                        />
                        <path
                            d="M2.7 7.3A9.954 9.954 0 001 10c.73 2.89 4 7 9 7 1.36 0 2.64-.31 3.79-.87l-1.47-1.47a5 5 0 01-6.35-6.35L2.7 7.3z"
                        />
                    </svg>
                </button>

                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="mt-4 relative">
                <InputLabel
                    for="password_confirmation"
                    value="Confirm Password"
                />

                <TextInput
                    id="password_confirmation"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="mt-1 block w-full pr-10"
                    v-model="form.password_confirmation"
                    required
                    autocomplete="new-password"
                />

                <button
                    type="button"
                    tabindex="-1"
                    class="absolute inset-y-0 right-0 top-7 px-3 flex items-center"
                    @click="toggleConfirmPasswordVisibility"
                >
                    <!-- Eye icon when confirmation password is hidden -->
                    <svg
                        v-if="!showConfirmPassword"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-5-7-9-7zM10 15a5 5 0 110-10 5 5 0 010 10z"
                        />
                        <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
                    </svg>
                    <!-- Eye-off icon when confirmation password is shown -->
                    <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M4.03 3.97a.75.75 0 011.06 0l11 11a.75.75 0 11-1.06 1.06l-1.21-1.21a9.93 9.93 0 01-4.72 1.12c-5 0-8.27-4.11-9-7a9.95 9.95 0 012.07-3.39L4.03 3.97zM10 5c2.07 0 3.95.95 5.07 2.44l-1.41 1.41A3.5 3.5 0 0010 6.5a3.5 3.5 0 00-3.66 4.36l-1.41 1.41A5.002 5.002 0 0110 5z"
                        />
                        <path
                            d="M2.7 7.3A9.954 9.954 0 001 10c.73 2.89 4 7 9 7 1.36 0 2.64-.31 3.79-.87l-1.47-1.47a5 5 0 01-6.35-6.35L2.7 7.3z"
                        />
                    </svg>
                </button>

                <InputError
                    class="mt-2"
                    :message="form.errors.password_confirmation"
                />
            </div>

            <!-- Compact Consent Section -->
            <div class="mt-6">
                <h3 class="text-lg font-medium text-gray-700 mb-3">
                    Required Consents
                </h3>

                <div class="space-y-4">
                    <!-- Privacy Consent -->
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input
                                id="privacy_consent"
                                name="privacy_consent"
                                type="checkbox"
                                v-model="form.privacy_consent"
                                required
                                class="w-4 h-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                        </div>
                        <div class="ml-3 text-sm">
                            <label
                                for="privacy_consent"
                                class="font-medium text-gray-700"
                            >
                                I have read and understood the
                                <button
                                    type="button"
                                    @click="openPrivacyModal"
                                    class="text-indigo-600 hover:text-indigo-500 font-medium underline focus:outline-none"
                                >
                                    Data Privacy Notice
                                </button>
                                and consent to the collection and processing of
                                my personal information.
                            </label>
                        </div>
                    </div>
                    <InputError
                        class="mt-1"
                        :message="form.errors.privacy_consent"
                    />

                    <!-- Applicant Consent -->
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input
                                id="applicant_consent"
                                name="applicant_consent"
                                type="checkbox"
                                v-model="form.applicant_consent"
                                required
                                class="w-4 h-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                        </div>
                        <div class="ml-3 text-sm">
                            <label
                                for="applicant_consent"
                                class="font-medium text-gray-700"
                            >
                                I have read and agreed to the
                                <button
                                    type="button"
                                    @click="openApplicantConsentModal"
                                    class="text-indigo-600 hover:text-indigo-500 font-medium underline focus:outline-none"
                                >
                                    Applicant's Consent
                                </button>
                                terms.
                            </label>
                        </div>
                    </div>
                    <InputError
                        class="mt-1"
                        :message="form.errors.applicant_consent"
                    />
                </div>
            </div>

            <div class="flex items-center justify-end mt-4">
                <Link
                    :href="route('login')"
                    class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Already registered?
                </Link>

                <PrimaryButton
                    class="ms-4"
                    :class="{
                        'opacity-25':
                            form.processing ||
                            !form.privacy_consent ||
                            !form.applicant_consent,
                    }"
                    :disabled="
                        form.processing ||
                        !form.privacy_consent ||
                        !form.applicant_consent
                    "
                >
                    Register
                </PrimaryButton>
            </div>
        </form>

        <!-- Privacy Policy Modal -->
        <div
            v-if="showPrivacyModal"
            class="fixed inset-0 z-50 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div
                class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
                <!-- Background overlay -->
                <div
                    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    @click="closePrivacyModal"
                ></div>

                <!-- Modal panel -->
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                >
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                            >
                                <h3
                                    class="text-lg leading-6 font-medium text-gray-900"
                                    id="modal-title"
                                >
                                    DATA PRIVACY NOTICE
                                </h3>
                                <div class="mt-4">
                                    <p class="text-sm text-gray-700">
                                        The Central Mindanao University - Office
                                        of Human Resource Management (CMU-OHRM)
                                        is mandated to comply with the Civil
                                        Service Commission (CSC) regulations on
                                        recruitment, selection, appointment and
                                        other human resource actions in the
                                        civil service. All information gathered
                                        in this platform is protected under the
                                        Data Privacy Act of 2012 and shall only
                                        be used for the purpose of assessing and
                                        evaluating applicants. CMU OHRM is duly
                                        bound to observe and respect your
                                        privacy rights, including your right to
                                        information, right to remove, right to
                                        damages, and right to data portability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                    >
                        <button
                            type="button"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                            @click="closePrivacyModal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Applicant Consent Modal -->
        <div
            v-if="showApplicantConsentModal"
            class="fixed inset-0 z-50 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div
                class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
                <!-- Background overlay -->
                <div
                    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    @click="closeApplicantConsentModal"
                ></div>

                <!-- Modal panel -->
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                >
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                            >
                                <h3
                                    class="text-lg leading-6 font-medium text-gray-900"
                                    id="modal-title"
                                >
                                    APPLICANT'S CONSENT
                                </h3>
                                <div class="mt-4">
                                    <p class="text-sm text-gray-700">
                                        I give my consent to the CMU - Office of
                                        Human Resource Management and the
                                        Secretariat to view my application and
                                        evaluate my supporting documents. I
                                        understand that in order to complete the
                                        submission of my application, this
                                        Online Application Form will require
                                        pertinent information and supporting
                                        documents. Lastly, I understand that
                                        should there be lacking documents, my
                                        application will not be entertained.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                    >
                        <button
                            type="button"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                            @click="closeApplicantConsentModal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </GuestLayout>
</template>
