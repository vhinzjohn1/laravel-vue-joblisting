<script setup>
import { ref } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';
import { router } from '@inertiajs/vue3';

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
    router.post(route('logout'));
};
</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <!-- Mobile hamburger -->
        <div class="lg:hidden">
            <button @click="toggleMobileMenu"
                class="fixed top-4 right-4 z-50 rounded-lg bg-white p-2 text-gray-600 shadow-lg hover:bg-gray-50 focus:outline-none">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Sidebar -->
        <div :class="{
            'translate-x-0': showMobileMenu,
            '-translate-x-full': !showMobileMenu,
            'w-64': sidebarOpen,
            'w-20': !sidebarOpen
        }" class="fixed left-0 top-0 z-40 h-full bg-white shadow-sm transition-all duration-300 ease-in-out
            lg:translate-x-0">
            <!-- Sidebar Header -->
            <div class="flex h-16 items-center border-b px-6 mt-2.5">
                <Link :href="route('dashboard')" class="flex items-center">
                    <ApplicationLogo class="block h-8 w-auto fill-current text-gray-800" />
                    <span v-if="sidebarOpen" class="ml-3 text-lg font-semibold text-gray-800">Dashboard</span>
                </Link>
            </div>

            <!-- Navigation Links -->
            <nav class="mt-4 px-3">
                <ul class="space-y-2">
                    <li>
                        <Link :href="route('dashboard')"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                            :class="{ 'bg-gray-100': route().current('dashboard') }">
                            <svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 21">
                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                            </svg>
                            <span v-if="sidebarOpen" class="ms-3 text-sm font-medium">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link :href="route('profile.edit')"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                            :class="{ 'bg-gray-100': route().current('profile.edit') }">
                            <svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 18">
                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                            </svg>
                            <span v-if="sidebarOpen" class="flex-1 ms-3 text-sm font-medium whitespace-nowrap">Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link :href="route('admin.index')">Go to Admin Dashboard</Link>
                    </li>
                </ul>
            </nav>

            <!-- User Menu -->
            <div class="absolute bottom-0 w-full border-t bg-white p-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <span v-if="sidebarOpen" class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                                <span class="text-sm font-medium leading-none text-gray-600">
                                    {{ $page.props.auth.user.name.charAt(0) }}
                                </span>
                            </span>
                        </div>
                        <div v-if="sidebarOpen" class="ml-3">
                            <p class="text-md font-medium text-gray-900">{{ $page.props.auth.user.name }}</p>
                            <p class="text-sm text-gray-900">{{ $page.props.auth.user.email }}</p>
                        </div>
                    </div>
                    <button
                        @click="showLogoutModal = true"
                        class="rounded-lg p-1.5 text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:text-black"
                    >
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

         <!-- Toggle Sidebar Button -->
         <button @click="toggleSidebar"
            class="fixed left-0 top-4 z-40 hidden rounded-r-lg p-2 m-2 text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-600 lg:block"
            :class="{
                'left-64': sidebarOpen,
                'left-20': !sidebarOpen,
            }">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="sidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>

        <!-- Mobile Overlay -->
        <div v-if="showMobileMenu"
            class="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden"
            @click="toggleMobileMenu">
        </div>

        <!-- Logout Modal -->
        <div v-if="showLogoutModal"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity">
            <div class="relative w-full max-w-sm rounded-lg bg-white p-6 text-center">
                <h3 class="mb-1 text-xl font-semibold text-black">
                    Are you sure you want to log out?
                </h3>
                <p class="mb-4 text-gray-800">
                    Log out of {{ $page.props.auth.user.email }}?
                </p>
                <div class="flex flex-col space-y-2">
                    <button
                        @click="handleLogout"
                        class="w-full rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
        <div :class="{
            'lg:ml-64': sidebarOpen,
            'lg:ml-20': !sidebarOpen
        }" class="transition-all duration-300 ease-in-out">
            <!-- Page Heading -->
            <header class="bg-white shadow" v-if="$slots.header">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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

/* Add smooth transition for navigation items */
.router-link-active {
    @apply bg-indigo-50 text-indigo-600;
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
