<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import CaptchaVerification from '@/Components/CaptchaVerification.vue';
import FormContainer from '@/Components/FormContainer.vue';
import InputField from '@/Components/InputField.vue';
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

const showCaptcha = ref(false);
const form = useForm({
    login: '',
    password: '',
    remember: false,
    captcha_token: '',
    captcha_code: '',
});

const submit = async () => {
    if (form.processing) return;

    // First validate credentials without CAPTCHA
    try {
        await axios.post(route('login.validate'), {
            login: form.login,
            password: form.password,
        });
        
        // If validation passes, show CAPTCHA
        if (!form.captcha_token || !form.captcha_code) {
            showCaptcha.value = true;
            return;
        }
        
        // If we have CAPTCHA, proceed with login
        form.post(route('login'), {
            onFinish: () => {
                form.reset('password', 'captcha_token', 'captcha_code');
            },
        });
    } catch (error) {
        if (error.response?.data?.errors) {
            form.setError('login', error.response.data.errors.login);
            form.setError('password', error.response.data.errors.password);
        }
    }
};

const handleCaptchaVerified = ({ token, code }) => {
    form.captcha_token = token;
    form.captcha_code = code;
    submit(); // Now submit with CAPTCHA
};
</script>

<template>
    <Head title="Log in" />

    <GuestLayout :can-login="true" :can-register="true">
        <!-- Main Content Wrapper centered -->
        <div class="flex justify-center p-20">
            <FormContainer class="w-full max-w-md">
                <h1 class="text-3xl font-bold text-center mb-6">Login Page</h1>

                <form @submit.prevent="submit">
                    <div>
                        <InputLabel for="login" value="Email/Username" />
                        <InputField
                            id="login"
                            type="text"
                            class="mt-1 block w-full"
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
                        <InputField
                            id="password"
                            type="password"
                            class="mt-1 block w-full"
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
                                class="text-green-800 hover:text-green-500 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="block mt-4">
                            <label class="flex items-center">
                                <Checkbox name="remember" v-model:checked="form.remember" />
                                <span class="ms-2 text-sm text-gray-600">Remember me</span>
                            </label>
                        </div>

                        <div class="flex items-center justify-end mt-4">
                            <PrimaryButton
                                class="mt-4"
                                :class="{ 'opacity-25': form.processing }"
                                :disabled="form.processing"
                            >
                                Log in
                            </PrimaryButton>
                        </div>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="pt-4 flex items-center text-md">
                            Don't have an account yet?
                            <Link :href="route('register')" class="text-green-800 hover:text-green-500 transition-colors">Register</Link>
                        </p>
                    </div>
                </form>
            </FormContainer>
        </div>

        <!-- CAPTCHA Verification Modal Centered -->
        <CaptchaVerification
            class="fixed inset-0 z-50 overflow-y-auto"
            :is-open="showCaptcha"
            @close="showCaptcha = false"
            @verified="handleCaptchaVerified"
        />
    </GuestLayout>
</template>
