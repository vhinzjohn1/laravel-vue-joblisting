<script setup>
import { ref, computed } from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { Link } from "@inertiajs/vue3";
import { router } from "@inertiajs/vue3";
import NotificationBell from "@/Components/NotificationBell.vue";

const showMobileMenu = ref(false);
const sidebarOpen = ref(true);
const showLogoutModal = ref(false);
const hoveredItem = ref(null);

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
};

const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value;
};

const handleLogout = () => {
    router.post(route("logout"));
};

const setHoveredItem = (item) => {
    hoveredItem.value = item;
};

const clearHoveredItem = () => {
    hoveredItem.value = null;
};

const isActive = (routeName) => {
    return route().current(routeName);
};

const isActiveGroup = (routeNames) => {
    return routeNames.some((name) => route().current(name));
};
</script>

<template>
    <div class="min-h-screen bg-gray-100">
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
            class="fixed left-0 top-0 z-40 h-full bg-[#012f12] shadow-xl transition-all duration-300 ease-in-out lg:translate-x-0 flex flex-col"
        >
            <!-- Sidebar Header -->
            <div class="flex h-16 items-center border-b border-[#023d17] px-4">
                <Link
                    :href="route('applicant.index')"
                    class="flex items-center"
                >
                    <ApplicationLogo
                        class="block h-8 w-auto fill-current text-white"
                    />
                    <span
                        v-if="sidebarOpen"
                        class="ml-3 text-lg font-semibold text-white"
                        >Applicant</span
                    >
                </Link>
            </div>

            <!-- Navigation Links -->
            <nav class="flex-1 px-3 py-4 overflow-y-auto">
                <ul class="space-y-1">
                    <li>
                        <Link
                            :href="route('applicant.index')"
                            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black':
                                    isActive('applicant.index'),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('applicant.index'),
                            }"
                            @mouseenter="setHoveredItem('dashboard')"
                            @mouseleave="clearHoveredItem()"
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex items-center justify-center w-8 h-8 transition-all duration-300"
                                    :class="{
                                        'text-black':
                                            isActive('applicant.index'),
                                    }"
                                >
                                    <i class="fas fa-tachometer-alt"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-300"
                                    :class="{
                                        'font-semibold':
                                            isActive('applicant.index'),
                                    }"
                                    >Applicant Dashboard</span
                                >
                            </div>
                            <div
                                v-if="
                                    hoveredItem === 'dashboard' &&
                                    !isActive('applicant.index')
                                "
                                class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
                            ></div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            :href="route('job-application.index')"
                            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black': isActive(
                                    'job-application.index',
                                ),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('job-application.index'),
                            }"
                            @mouseenter="setHoveredItem('jobs')"
                            @mouseleave="clearHoveredItem()"
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex items-center justify-center w-8 h-8 transition-all duration-300"
                                    :class="{
                                        'text-black': isActive(
                                            'job-application.index',
                                        ),
                                    }"
                                >
                                    <i class="fas fa-briefcase"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-300"
                                    :class="{
                                        'font-semibold': isActive(
                                            'job-application.index',
                                        ),
                                    }"
                                    >View Job Listings</span
                                >
                            </div>
                            <div
                                v-if="
                                    hoveredItem === 'jobs' &&
                                    !isActive('job-application.index')
                                "
                                class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
                            ></div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            :href="route('my-applications.index')"
                            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black': isActive(
                                    'my-applications.index',
                                ),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('my-applications.index'),
                            }"
                            @mouseenter="setHoveredItem('applications')"
                            @mouseleave="clearHoveredItem()"
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex items-center justify-center w-8 h-8 transition-all duration-300"
                                    :class="{
                                        'text-black': isActive(
                                            'my-applications.index',
                                        ),
                                    }"
                                >
                                    <i class="fas fa-file-alt"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-300"
                                    :class="{
                                        'font-semibold': isActive(
                                            'my-applications.index',
                                        ),
                                    }"
                                    >My Applications</span
                                >
                            </div>
                            <div
                                v-if="
                                    hoveredItem === 'applications' &&
                                    !isActive('my-applications.index')
                                "
                                class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
                            ></div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            :href="route('my-schedules.index')"
                            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black':
                                    isActive('my-schedules.index') ||
                                    isActive('my-schedules.show'),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('my-schedules.index') &&
                                    !isActive('my-schedules.show'),
                            }"
                            @mouseenter="setHoveredItem('schedules')"
                            @mouseleave="clearHoveredItem()"
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex items-center justify-center w-8 h-8 transition-all duration-300"
                                    :class="{
                                        'text-black':
                                            isActive('my-schedules.index') ||
                                            isActive('my-schedules.show'),
                                    }"
                                >
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-300"
                                    :class="{
                                        'font-semibold':
                                            isActive('my-schedules.index') ||
                                            isActive('my-schedules.show'),
                                    }"
                                    >My Schedules</span
                                >
                            </div>
                            <div
                                v-if="
                                    hoveredItem === 'schedules' &&
                                    !isActive('my-schedules.index') &&
                                    !isActive('my-schedules.show')
                                "
                                class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
                            ></div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            :href="route('profile.edit')"
                            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black':
                                    isActive('profile.edit'),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('profile.edit'),
                            }"
                            @mouseenter="setHoveredItem('profile')"
                            @mouseleave="clearHoveredItem()"
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex items-center justify-center w-8 h-8 transition-all duration-300"
                                    :class="{
                                        'text-black': isActive('profile.edit'),
                                    }"
                                >
                                    <i class="fas fa-user"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-300"
                                    :class="{
                                        'font-semibold':
                                            isActive('profile.edit'),
                                    }"
                                    >Profile</span
                                >
                            </div>
                            <div
                                v-if="
                                    hoveredItem === 'profile' &&
                                    !isActive('profile.edit')
                                "
                                class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
                            ></div>
                        </Link>
                    </li>
                </ul>
            </nav>

            <!-- User Menu -->
            <div class="border-t border-[#023d17] p-4 mt-auto">
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
                                    {{ $page.props.auth.user.name.charAt(0) }}
                                </span>
                            </span>
                        </div>
                        <div v-if="sidebarOpen" class="ml-3">
                            <p
                                class="text-sm text-white max-w-[150px] truncate"
                                title="{{ $page.props.auth.user.email }}"
                            >
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


        <!-- Main Content -->
        <div
            :class="{
                'lg:ml-64': sidebarOpen,
                'lg:ml-20': !sidebarOpen,
            }"
            class="transition-all duration-300 ease-in-out"
        >
            <!-- Page Header -->
            <header class="bg-white shadow-sm" v-if="$slots.header">
                <div
                    class="mx-auto py-2.5 sm:px-10 md:px-12 lg:px-8 flex items-center gap-5"
                >
                    <button
                        @click="toggleSidebar"
                        class="hidden lg:flex rounded-full w-8 h-8 items-center justify-center text-gray-600 hover:bg-[#034b1c] hover:text-white transition-colors duration-200 ml-4 flex-shrink-0"
                    >
                        <i
                            :class="[
                                sidebarOpen
                                    ? 'fa-chevron-left'
                                    : 'fa-chevron-right',
                                'fas text-xs',
                            ]"
                        ></i>
                    </button>
                    <div class="flex-grow">
                        <slot name="header"/>
                    </div>

                    <NotificationBell
                        class="mr-20"
                        :notifications="$page.props.notifications"
                    />
                </div>
            </header>

            <!-- Page Content -->
            <main class="py-3">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <slot />
                </div>
            </main>
        </div>

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
.sidebar nav a:hover i {
    color: black !important;
}
.logout {
    background-color: #012f12;
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
