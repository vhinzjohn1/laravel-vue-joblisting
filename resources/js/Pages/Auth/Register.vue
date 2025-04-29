<template>
    <Head title="Register" />

    <GuestLayout :can-login="true" :can-register="true">
        <!-- Main Content Wrapper centered -->
        <div class="flex justify-center p-4 md:mt-10">
            <FormContainer class="w-full max-w-md">
                <h1 class="mb-6 text-3xl font-bold text-center">Register Page</h1>

                <form @submit.prevent="submit">
                    <div class="mt-4">
                        <InputLabel for="username" value="Username" />
                        <TextInput
                            id="username"
                            type="text"
                            class="block mt-1 w-full"
                            v-model="form.username"
                            placeholder="Choose a username"
                            required
                            icon="fas fa-at"
                        />
                        <InputError class="mt-2" :message="form.errors.username" />
                    </div>

                    <div class="mt-4">
                        <InputLabel for="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            class="block mt-1 w-full"
                            v-model="form.email"
                            placeholder="Enter your email"
                            required
                            icon="fas fa-envelope"
                        />
                        <InputError class="mt-2" :message="form.errors.email" />
                    </div>

                    <div class="mt-4">
                        <InputLabel for="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            class="block mt-1 w-full"
                            v-model="form.password"
                            placeholder="Create a password"
                            required
                            icon="fas fa-lock"
                            autocomplete="new-password"
                        />
                        <InputError class="mt-2" :message="form.errors.password" />
                    </div>

                    <div class="mt-4">
                        <InputLabel for="password_confirmation" value="Confirm Password" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            class="block mt-1 w-full"
                            v-model="form.password_confirmation"
                            placeholder="Confirm your password"
                            required
                            icon="fas fa-lock"
                            autocomplete="new-password"
                        />
                        <InputError class="mt-2" :message="form.errors.password_confirmation" />
                    </div>

                    <div class="flex justify-end items-center mt-4">
                        <Link
                            :href="route('login')"
                            class="text-green-800 transition-colors hover:text-green-500"
                        >
                            Already registered?
                        </Link>

                        <PrimaryButton class="ml-4" :loading="form.processing" :disabled="form.processing">
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </FormContainer>
        </div>

        <CaptchaVerification
            :is-open="showCaptcha"
            @close="showCaptcha = false"
            @verified="handleCaptchaVerified"
        />
    </GuestLayout>
</template>

<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import CaptchaVerification from '@/Components/CaptchaVerification.vue';
import FormContainer from '@/Components/FormContainer.vue';
import TextInput from '@/Components/TextInput.vue';
import { ref } from 'vue';
import axios from 'axios';

const showCaptcha = ref(false);
const form = useForm({
    email: '',
    password: '',
    password_confirmation: '',
    username: '',
    captcha_token: '',
    captcha_code: '',
});

const submit = async () => {
    if (form.processing) return;

    // First validate registration data without CAPTCHA
    try {
        await axios.post(route('register.validate'), {
            username: form.username,
            email: form.email,
            password: form.password,
            password_confirmation: form.password_confirmation,
        });

        // If validation passes, show CAPTCHA
        if (!form.captcha_token || !form.captcha_code) {
            showCaptcha.value = true;
            return;
        }

        // If we have CAPTCHA, proceed with registration
        form.post(route('register'), {
            onFinish: () => {
                form.reset('password', 'password_confirmation', 'captcha_token', 'captcha_code');
            },
        });
    } catch (error) {
        if (error.response?.data?.errors) {
            const errors = error.response.data.errors;
            Object.keys(errors).forEach(key => {
                form.setError(key, errors[key]);
            });
        }
    }
};

const handleCaptchaVerified = ({ token, code }) => {
    form.captcha_token = token;
    form.captcha_code = code;
    submit(); // Now submit with CAPTCHA
};
</script>
