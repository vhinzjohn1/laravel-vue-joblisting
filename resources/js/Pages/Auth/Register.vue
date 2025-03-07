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
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
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

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="username" value="Username" />

                <TextInput
                    id="username"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.username"
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
                    class="absolute inset-y-0 right-0 top-5 px-3 flex items-center"
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
                    class="absolute inset-y-0 right-0 top-5 px-3 flex items-center"
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

            <div class="flex items-center justify-end mt-4">
                <Link
                    :href="route('login')"
                    class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Already registered?
                </Link>

                <PrimaryButton
                    class="ms-4"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    Register
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>
