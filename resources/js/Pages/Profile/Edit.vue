<script setup>
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import ApplicantLayout from "@/Layouts/Applicant/ApplicantLayout.vue";
import AdminLayout from "@/Layouts/Admin/AdminLayout.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import DeleteUserForm from "./Partials/DeleteUserForm.vue";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm.vue";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm.vue";
import EducationalBackgroundForm from "./Partials/EducationalBackgroundForm.vue";
import TrainingCertificationsForm from "./Partials/TrainingCertificationsForm.vue";
import WorkExperienceForm from "./Partials/WorkExperienceForm.vue";
import { Head, usePage } from "@inertiajs/vue3";
import { ref } from "vue";

const user = usePage().props.auth.user;
const activeTab = ref("profile"); // Default tab

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

const props = defineProps({
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

// Show success alert function
const showSuccessAlert = (action) => {
    let title, text;

    switch (action) {
        case "update":
            title = "Profile Updated Successfully!";
            text = "Your profile information has been updated.";
            break;
        default:
            title = "Action Completed!";
            text = "The operation was successful.";
    }

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 3000,
        iconColor: "#ffffff",
        toast: true,
        customClass: {
            popup: "bg-green-500 text-white",
        },
    });
};
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
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="flex flex-col md:flex-row gap-6">
                    <!-- Sidebar - now responsive -->
                    <div
                        class="w-full md:w-64 bg-white shadow rounded-lg h-fit"
                    >
                        <nav class="p-4">
                            <ul
                                class="flex flex-wrap md:flex-col gap-2 md:space-y-2"
                            >
                                <li class="w-full sm:flex-1 md:w-full">
                                    <button
                                        @click="activeTab = 'profile'"
                                        :class="[
                                            'w-full text-left px-4 py-2 rounded-lg transition-colors',
                                            activeTab === 'profile'
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-50',
                                        ]"
                                    >
                                        Profile Information
                                    </button>
                                </li>
                                <li class="w-full sm:flex-1 md:w-full">
                                    <button
                                        @click="activeTab = 'education'"
                                        :class="[
                                            'w-full text-left px-4 py-2 rounded-lg transition-colors',
                                            activeTab === 'education'
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-50',
                                        ]"
                                    >
                                        Educational Background
                                    </button>
                                </li>
                                <li class="w-full sm:flex-1 md:w-full">
                                    <button
                                        @click="activeTab = 'training'"
                                        :class="[
                                            'w-full text-left px-4 py-2 rounded-lg transition-colors',
                                            activeTab === 'training'
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-50',
                                        ]"
                                    >
                                        Training & Certifications
                                    </button>
                                </li>
                                <li class="w-full sm:flex-1 md:w-full">
                                    <button
                                        @click="activeTab = 'experience'"
                                        :class="[
                                            'w-full text-left px-4 py-2 rounded-lg transition-colors',
                                            activeTab === 'experience'
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-50',
                                        ]"
                                    >
                                        Work Experience
                                    </button>
                                </li>
                                <li class="w-full sm:flex-1 md:w-full">
                                    <button
                                        @click="activeTab = 'password'"
                                        :class="[
                                            'w-full text-left px-4 py-2 rounded-lg transition-colors',
                                            activeTab === 'password'
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-50',
                                        ]"
                                    >
                                        Password
                                    </button>
                                </li>
                                <li class="w-full sm:flex-1 md:w-full">
                                    <button
                                        @click="activeTab = 'delete'"
                                        :class="[
                                            'w-full text-left px-4 py-2 rounded-lg transition-colors text-red-600',
                                            activeTab === 'delete'
                                                ? 'bg-red-50'
                                                : 'hover:bg-red-50',
                                        ]"
                                    >
                                        Delete Account
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <!-- Content -->
                    <div class="flex-1 space-y-6">
                        <!-- Profile Information -->
                        <div
                            v-if="activeTab === 'profile'"
                            class="bg-white shadow sm:rounded-lg"
                        >
                            <div
                                class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
                            >
                                <div class="max-w-xl">
                                    <UpdateProfileInformationForm
                                        :must-verify-email="mustVerifyEmail"
                                        :status="status"
                                        :user-details="userDetails"
                                        @update-success="
                                            showSuccessAlert('update')
                                        "
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Educational Background -->
                        <div
                            v-if="activeTab === 'education'"
                            class="bg-white shadow sm:rounded-lg"
                        >
                            <div
                                class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
                            >
                                <div class="max-w-xl">
                                    <EducationalBackgroundForm />
                                </div>
                            </div>
                        </div>

                        <!-- Training & Certifications -->
                        <div
                            v-if="activeTab === 'training'"
                            class="bg-white shadow sm:rounded-lg"
                        >
                            <div
                                class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
                            >
                                <div class="max-w-xl">
                                    <TrainingCertificationsForm />
                                </div>
                            </div>
                        </div>

                        <!-- Work Experience -->
                        <div
                            v-if="activeTab === 'experience'"
                            class="bg-white shadow sm:rounded-lg"
                        >
                            <div
                                class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
                            >
                                <div class="max-w-xl">
                                    <WorkExperienceForm />
                                </div>
                            </div>
                        </div>

                        <!-- Password -->
                        <div
                            v-if="activeTab === 'password'"
                            class="bg-white shadow sm:rounded-lg"
                        >
                            <div
                                class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
                            >
                                <div class="max-w-xl">
                                    <UpdatePasswordForm />
                                </div>
                            </div>
                        </div>

                        <!-- Delete Account -->
                        <div
                            v-if="activeTab === 'delete'"
                            class="bg-white shadow sm:rounded-lg"
                        >
                            <div
                                class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
                            >
                                <div class="max-w-xl">
                                    <DeleteUserForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </component>
</template>
