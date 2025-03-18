<script setup>
import { ref } from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { Link } from "@inertiajs/vue3";
import { router } from "@inertiajs/vue3";

const showMobileMenu = ref(false);
const sidebarOpen = ref(true);
const showLogoutModal = ref(false);

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
};

const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value;
};

const handleLogout = () => {
    router.post(route("logout"));
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 shadow-md">
        <!-- Mobile hamburger -->
        <div class="lg:hidden">
            <button
                @click="toggleMobileMenu"
                class="fixed top-4 right-4 z-50 rounded-lg bg-white p-2 text-gray-600 shadow-lg hover:bg-gray-50 focus:outline-none"
            >
                <i class="fas fa-bars h-6 w-6" v-if="!showMobileMenu"></i>
                <i class="fas fa-times h-6 w-6" v-else></i>
            </button>
        </div>

        <!-- Sidebar -->
        <div
            :class="{
                'translate-x-0': showMobileMenu,
                '-translate-x-full': !showMobileMenu,
                'w-64': sidebarOpen,
                'w-20': !sidebarOpen,
            }"
            class="fixed left-0 top-0 z-40 h-full sidebar shadow-sm transition-all duration-300 ease-in-out lg:translate-x-0"
        >
            <!-- Sidebar Header -->
            <div class="flex h-16 items-center border-b px-6 mt-2.5">
                <Link :href="route('hr.index')" class="flex items-center">
                    <ApplicationLogo
                        class="block h-8 w-auto fill-current text-white"
                    />
                    <span
                        v-if="sidebarOpen"
                        class="ml-3 text-lg font-semibold text-white"
                        >HR Personnel</span
                    >
                </Link>
            </div>

            <!-- Navigation Links -->
            <nav class="mt-4 px-3">
                <ul class="space-y-2">
                    <li>
                        <Link
                            :href="route('hr.index')"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                            :class="{
                                'bg-gray-100': route().current('hr.index'),
                            }"
                        >
                            <i
                                class="fas fa-tachometer-alt w-5 h-5 transition duration-75 group-hover:text-gray-900"
                            ></i>
                            <span
                                v-if="sidebarOpen"
                                class="ms-3 text-sm font-medium"
                                >HR Dashboard</span
                            >
                        </Link>
                    </li>

                    <li>
                        <Link
                            :href="route('job-listing.index')"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                            :class="{
                                'bg-gray-100': route().current('job-listing.index'),
                            }"
                        >
                            <i
                                class="fas fa-list-ul w-5 h-5 transition duration-75 group-hover:text-gray-900"
                            ></i>
                            <span
                                v-if="sidebarOpen"
                                class="ms-3 text-sm font-medium"
                                >Job Listings</span
                            >
                        </Link>
                    </li>

                    <li>
                        <Link
                            :href="route('applications.index')"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                            :class="{
                                'bg-gray-100':
                                    route().current('applications.index') ||
                                    route().current('applications.show'),
                            }"
                        >
                            <i
                                class="fas fa-file-alt w-5 h-5 transition duration-75 group-hover:text-gray-900"
                            ></i>
                            <span
                                v-if="sidebarOpen"
                                class="ms-3 text-sm font-medium"
                                >Manage Applications</span
                            >
                        </Link>
                    </li>

                    <li>
                        <Link
                            :href="route('groups.index')"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                            :class="{
                                'bg-gray-100': route().current('groups.index'),
                            }"
                        >
                            <i
                                class="fas fa-users w-5 h-5 transition duration-75 group-hover:text-gray-900"
                            ></i>
                            <span
                                v-if="sidebarOpen"
                                class="ms-3 text-sm font-medium"
                                >Group Management</span
                            >
                        </Link>
                    </li>

                    <li>
                        <Link
                            :href="route('schedules.index')"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                            :class="{
                                'bg-gray-100':
                                    route().current('schedules.index') ||
                                    route().current('schedules.show'),
                            }"
                        >
                            <i
                                class="fas fa-calendar-alt w-5 h-5 transition duration-75 group-hover:text-gray-900"
                            ></i>
                            <span
                                v-if="sidebarOpen"
                                class="ms-3 text-sm font-medium"
                                >Schedule Management</span
                            >
                        </Link>
                    </li>

                    <li>
                        <Link
                            :href="route('profile.edit')"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                            :class="{
                                'bg-gray-100': route().current('profile.edit'),
                            }"
                        >
                            <i
                                class="fas fa-user w-5 h-5 transition duration-75 group-hover:text-gray-900"
                            ></i>
                            <span
                                v-if="sidebarOpen"
                                class="ms-3 text-sm font-medium"
                                >Profile</span
                            >
                        </Link>
                    </li>

                    <li>
                        <Link
                            :href="route('profile.edit')"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                            :class="{
                                'bg-gray-100': route().current('profile.edit'),
                            }"
                        >
                            <i
                                class="fas fa-file-pdf w-5 h-5 transition duration-75 group-hover:text-gray-900"
                            ></i>
                            <span
                                v-if="sidebarOpen"
                                class="ms-3 text-sm font-medium"
                                >Reports</span
                            >
                        </Link>
                    </li>
                </ul>
            </nav>
            <!-- User Menu -->
            <div class="absolute bottom-0 w-90 border-t p-2">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <span
                                v-if="sidebarOpen"
                                class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200"
                            >
                                <span
                                    class="text-sm font-medium leading-none text-gray-600"
                                >
                                    {{
                                        $page.props.auth.user.username.charAt(0)
                                    }}
                                </span>
                            </span>
                        </div>
                        <div v-if="sidebarOpen" class="ml-3">
                            <p class="text-md font-medium text-white">
                                {{ $page.props.auth.user.name }}
                            </p>
                            <p class="text-sm text-white max-w-[150px] truncate" title="{{ $page.props.auth.user.email }}">
                                {{ $page.props.auth.user.email }}
                            </p>
                        </div>
                    </div>
                    <button
                        @click="showLogoutModal = true"
                        class="rounded-lg p-1.5 text-white hover:bg-[#ffc001] hover:text-black transition-colors duration-200"
                    >
                        <i class="fas fa-sign-out-alt h-5 w-5"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Toggle Sidebar Button -->
        <button
            @click="toggleSidebar"
            class="fixed left-0 top-4 z-40 hidden rounded-r-lg p-2 m-2 text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-600 lg:block"
            :class="{
                'left-64': sidebarOpen,
                'left-20': !sidebarOpen,
            }"
        >
            <i class="fas fa-bars h-5 w-5" v-if="sidebarOpen"></i>
            <i class="fas fa-chevron-right h-5 w-5" v-else></i>
        </button>

        <!-- Mobile Overlay -->
        <div
            v-if="showMobileMenu"
            class="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden"
            @click="toggleMobileMenu"
        ></div>

        <!-- Logout Modal -->
        <div
            v-if="showLogoutModal"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity"
        >
            <div
                class="relative w-full max-w-sm rounded-lg bg-white p-6 text-center"
            >
                <h3 class="mb-1 text-lg font-semibold text-black">
                    Are you sure you want to log out?
                </h3>
                <p class="mb-4 text-gray-800">
                    Log out of
                    <span class="text-black"
                        >{{ $page.props.auth.user.email }}?</span
                    >
                </p>
                <div class="flex flex-col space-y-2">
                    <button
                        @click="handleLogout"
                        class="w-full rounded-lg logout px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Log out
                    </button>
                    <button
                        @click="showLogoutModal = false"
                        class="w-full rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div
            :class="{
                'lg:ml-64': sidebarOpen,
                'lg:ml-20': !sidebarOpen,
            }"
            class="transition-all duration-300 ease-in-out"
        >
            <!-- Page Heading -->
            <header class="bg-white shadow" v-if="$slots.header">
                <div class="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <!-- Page Content -->
            <main class="py-1">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>

<style scoped>
.transition-all {
    transition-property: all;
}

/* New styles for sidebar */
.sidebar {
    background-color: #012f12; /* Dark Green */
}

.sidebar a {
    color: #ffffff; /* White text for links */
}

.sidebar nav a:hover,
.sidebar nav a.bg-gray-100 {
    background-color: #ffc001;
    color: black !important; /* Green text on hover */
}
.logout {
    background-color: #012f12;
}

.sidebar nav a:hover i {
    color: black !important;
}

/* Add modal animation */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>
