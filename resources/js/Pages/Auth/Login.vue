<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import CaptchaVerification from '@/Components/CaptchaVerification.vue';
import FormContainer from '@/Components/FormContainer.vue';
import TextInput from '@/Components/TextInput.vue';
import ClientCaptcha from '@/Components/ClientCaptcha.vue';
import { ref } from 'vue';
import axios from 'axios';

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const isLoading = ref(false);
const showCaptcha = ref(false);
const isCaptchaVerified = ref(false);
const form = useForm({
    login: '',
    password: '',
    remember: false,
});

const submit = async () => {
    isLoading.value = true;
    if (form.processing) return;
    try {
        // Validate credentials first
        const response = await axios.post(route('login.validate'), {
            login: form.login,
            password: form.password,
        });

        if (response.data.message === 'Credentials valid') {
            // Show CAPTCHA if credentials are valid
            showCaptcha.value = true;
            isLoading.value = false;
            form.clearErrors();
        }
    } catch (error) {
        console.log('Validation error:', error);
        isLoading.value = false;
        if (error.response?.data?.errors) {
            form.setError('login', error.response.data.errors.login?.[0]);
            form.setError('password', error.response.data.errors.password?.[0]);
        }
    }
};

const handleCaptchaVerified = (verified) => {
    if (verified) {
        isCaptchaVerified.value = true;
        // Submit the login form
        form.post(route('login'), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset('password');
                showCaptcha.value = false;
                isCaptchaVerified.value = false;
            },
            onError: (errors) => {
                console.log('Login errors:', errors);
                showCaptcha.value = true;
                isCaptchaVerified.value = false;
            },
        });
    }
};
</script>

<template>
    <Head title="Log in" />

    <GuestLayout :can-login="true" :can-register="true">
        <!-- Main Content Wrapper centered -->
        <div class="flex justify-center p-4 md:mt-10">
            <FormContainer class="w-full max-w-md">
                <h1 class="mb-6 text-3xl font-bold text-center">Login Page</h1>

                <form @submit.prevent="submit">
                    <div>
                        <InputLabel for="login" value="Email/Username" />
                        <TextInput
                            id="login"
                            type="text"
                            class="block mt-1 w-full"
                            v-model="form.login"
                            placeholder="Enter email or username"
                            required
                            icon="fas fa-envelope"
                            autofocus
                            autocomplete="username"
                        />
                        <InputError class="mt-2" :message="form.errors.login" />
                    </div>

                    <div class="mt-4">
                        <InputLabel for="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            class="block mt-1 w-full"
                            placeholder="Enter Password"
                            v-model="form.password"
                            required
                            icon="fas fa-lock"
                            autocomplete="current-password"
                        />
                        <InputError class="mt-2" :message="form.errors.password" />
                    </div>

                    <div class="flex justify-end items-center">
                        <div class="flex items-right">
                            <Link
                                v-if="canResetPassword"
                                :href="route('password.request')"
                                class="text-green-800 transition-colors hover:text-green-500"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <div class="flex justify-between items-center">
                        <div class="block mt-4">
                            <label class="flex items-center">
                                <Checkbox name="remember" v-model:checked="form.remember" />
                                <span class="text-sm text-gray-600 ms-2">Remember me</span>
                            </label>
                        </div>

                        <div class="flex justify-end items-center mt-4">
                            <PrimaryButton
                                type="submit"
                                class="mt-4"
                                :loading="isLoading"
                                :disabled="isLoading"
                            >
                                Log in
                            </PrimaryButton>
                        </div>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="flex items-center pt-4 text-md">
                            Don't have an account yet?
                            <Link :href="route('register')" class="text-green-800 transition-colors hover:text-green-500">Register</Link>
                        </p>
                    </div>
                </form>
            </FormContainer>
        </div>

        <!-- CAPTCHA Verification Modal Centered -->
        <CaptchaVerification
            class="overflow-y-auto fixed inset-0 z-50"
            :is-open="showCaptcha"
            @close="showCaptcha = false"
        >
            <template #default>
                <ClientCaptcha
                    @verified="handleCaptchaVerified"
                    placeholder="Enter the CAPTCHA code"
                />
            </template>
        </CaptchaVerification>
    </GuestLayout>
</template>
