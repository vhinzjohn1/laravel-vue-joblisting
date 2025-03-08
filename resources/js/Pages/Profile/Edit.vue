<script setup>
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import ApplicantLayout from "@/Layouts/Applicant/ApplicantLayout.vue";
import AdminLayout from "@/Layouts/Admin/AdminLayout.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import DeleteUserForm from "./Partials/DeleteUserForm.vue";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm.vue";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm.vue";
import { Head, usePage } from "@inertiajs/vue3";

const user = usePage().props.auth.user;

// Determine which layout to use based on user role
const getLayout = () => {
    switch (user.role_name) {
        case "hr":
            return HRLayout;
        case "applicant":
            return ApplicantLayout;
        case "admin":
            return AdminLayout;
        default:
            return AuthenticatedLayout;
    }
};

const LayoutComponent = getLayout();

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
    userDetails: {
        type: Object,
    },
});
</script>

<template>
    <Head title="Profile" />

    <component :is="LayoutComponent">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Profile
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdateProfileInformationForm
                        :must-verify-email="mustVerifyEmail"
                        :status="status"
                        :user-details="userDetails"
                        class="max-w-xl"
                    />
                </div>

                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdatePasswordForm class="max-w-xl" />
                </div>

                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <DeleteUserForm class="max-w-xl" />
                </div>
            </div>
        </div>
    </component>
</template>
