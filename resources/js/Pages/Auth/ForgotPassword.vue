<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { Head, useForm, Link } from '@inertiajs/vue3';
import InputField from '@/Components/InputField.vue';


defineProps({
    status: {
        type: String,
    },
});

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <GuestLayout>
        <Head title="Forgot Password" />

        <div class="py-12 sm:px-6 lg:px-8 px-6 flex justify-center">
        <div class="sm:mx-auto sm:w-full sm:max-w-md mt-32">
            <div class="text-center">
                <img
                    class="mx-auto h-10 w-auto"
                    src="https://www.svgrepo.com/show/301692/login.svg"
                    alt="Workflow"
                />
                <Title class="text-center mt-4">Forgot Password</Title>
            </div>

            <div
                class="bg-white rounded-lg border border-gray-200 shadow-lg mt-6 p-6"
            >
                <p class="text-gray-600 mb-4 text-center">
                    You forgot your password? Here you can easily retrieve a new
                    password.
                </p>
                <SessionMessages :status="status" />
                <form @submit.prevent="submit">
                    <div class="input-group mb-4">
                        <InputField
                            name="Email"
                            type="email"
                            v-model="form.email"
                            icon="fas fa-at"
                            placeholder="Email"
                            :message="form.errors.email"
                        />
                    </div>
                    <div class="w-full flex justify-end">
                        <PrimaryButton
                            class="mt-4"
                            :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing"
                        >
                            Send
                        </PrimaryButton>
                    </div>
                </form>

                <div class="mt-6 space-y-2">
                    <p class="text-center">
                        <Link
                            :href="route('login')"
                            class="text-green-800 hover:underline hover:text-green-400"
                        >
                            Back to Login
                        </Link>
                    </p>
                    <p class="text-center">
                        <Link
                            :href="route('register')"
                            class="text-green-800 hover:underline hover:text-green-400"
                        >
                            Register a new account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
    </GuestLayout>
</template>
