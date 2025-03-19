<script setup>
import { ref, computed, onMounted, watch } from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { Link } from "@inertiajs/vue3";
import { router } from "@inertiajs/vue3";
import NotificationBell from "@/Components/NotificationBell.vue";

const showMobileMenu = ref(false);
const sidebarOpen = ref(true);
const showLogoutModal = ref(false);
const activeDropdown = ref(null);
const hoveredItem = ref(null);

// Handle dropdown toggle
const toggleDropdown = (name) => {
    if (activeDropdown.value === name) {
        activeDropdown.value = null;
    } else {
        activeDropdown.value = name;
    }
};

// Auto-open schedule dropdown if a schedule-related route is active
onMounted(() => {
    if (
        route().current("schedules.index") ||
        route().current("schedules.show") ||
        route().current("groups.index")
    ) {
        activeDropdown.value = "schedule";
    }
});

// Track route changes to update active dropdown
watch(
    () => route().current(),
    (newRoute) => {
        if (
            newRoute === "schedules.index" ||
            newRoute === "schedules.show" ||
            newRoute === "groups.index"
        ) {
            activeDropdown.value = "schedule";
        }
    },
);

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
        <!-- Mobile toggle button -->
        <button
            @click="toggleMobileMenu"
            class="fixed top-4 right-4 z-50 lg:hidden rounded-full w-10 h-10 flex items-center justify-center bg-white shadow-lg text-gray-700 hover:bg-gray-50 focus:outline-none transition-all duration-300"
        >
            <i
                :class="[
                    showMobileMenu ? 'fa-times' : 'fa-bars',
                    'fas text-lg',
                ]"
            ></i>
        </button>

        <!-- Backdrop overlay for mobile -->
        <div
            v-if="showMobileMenu"
            @click="toggleMobileMenu"
            class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300"
        ></div>

        <!-- Sidebar -->
        <aside
            :class="{
                'translate-x-0': showMobileMenu,
                '-translate-x-full': !showMobileMenu,
                'w-64': sidebarOpen,
                'w-20': !sidebarOpen,
            }"
            class="fixed left-0 top-0 h-full z-40 bg-[#012f12] shadow-xl transition-all duration-300 ease-in-out lg:translate-x-0 flex flex-col"
        >
            <!-- Logo and header -->
            <div class="flex items-center h-16 px-4 border-b border-[#023d17]">
                <Link :href="route('hr.index')" class="flex items-center">
                    <ApplicationLogo class="h-9 w-9 text-[#ffc001]" />
                    <span
                        v-if="sidebarOpen"
                        class="ml-3 text-lg font-bold text-white transition-opacity duration-300"
                        >HR Personnel</span
                    >
                </Link>
            </div>

            <!-- Navigation -->
            <nav class="flex-1 px-3 py-4 overflow-y-auto">
                <ul class="space-y-1">
                    <!-- Dashboard -->
                    <li>
                        <Link
                            :href="route('hr.index')"
                            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black': isActive('hr.index'),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('hr.index'),
                            }"
                            @mouseenter="setHoveredItem('dashboard')"
                            @mouseleave="clearHoveredItem()"
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex items-center justify-center w-8 h-8 transition-all duration-300"
                                    :class="{
                                        'text-black': isActive('hr.index'),
                                    }"
                                >
                                    <i class="fas fa-tachometer-alt"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-300"
                                    :class="{
                                        'font-semibold': isActive('hr.index'),
                                    }"
                                    >HR Dashboard</span
                                >
                            </div>
                            <div
                                v-if="
                                    hoveredItem === 'dashboard' &&
                                    !isActive('hr.index')
                                "
                                class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
                            ></div>
                        </Link>
                    </li>

                    <!-- Job Listings -->
                    <li>
                        <Link
                            :href="route('job-listing.index')"
                            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black':
                                    isActive('job-listing.index'),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('job-listing.index'),
                            }"
                            @mouseenter="setHoveredItem('jobs')"
                            @mouseleave="clearHoveredItem()"
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex items-center justify-center w-8 h-8 transition-all duration-300"
                                    :class="{
                                        'text-black':
                                            isActive('job-listing.index'),
                                    }"
                                >
                                    <i class="fas fa-list-ul"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-300"
                                    :class="{
                                        'font-semibold':
                                            isActive('job-listing.index'),
                                    }"
                                    >Job Listings</span
                                >
                            </div>
                            <div
                                v-if="
                                    hoveredItem === 'jobs' &&
                                    !isActive('job-listing.index')
                                "
                                class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
                            ></div>
                        </Link>
                    </li>

                    <!-- Applications -->
                    <li>
                        <Link
                            :href="route('applications.index')"
                            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black': isActiveGroup([
                                    'applications.index',
                                    'applications.show',
                                ]),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActiveGroup([
                                        'applications.index',
                                        'applications.show',
                                    ]),
                            }"
                            @mouseenter="setHoveredItem('applications')"
                            @mouseleave="clearHoveredItem()"
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex items-center justify-center w-8 h-8 transition-all duration-300"
                                    :class="{
                                        'text-black': isActiveGroup([
                                            'applications.index',
                                            'applications.show',
                                        ]),
                                    }"
                                >
                                    <i class="fas fa-file-alt"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-300"
                                    :class="{
                                        'font-semibold': isActiveGroup([
                                            'applications.index',
                                            'applications.show',
                                        ]),
                                    }"
                                    >Manage Applications</span
                                >
                            </div>
                            <div
                                v-if="
                                    hoveredItem === 'applications' &&
                                    !isActiveGroup([
                                        'applications.index',
                                        'applications.show',
                                    ])
                                "
                                class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
                            ></div>
                        </Link>
                    </li>

                    <!-- Schedule Management with Dropdown -->
                    <li class="relative">
                        <div
                            @click="toggleDropdown('schedule')"
                            class="flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer group transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'text-white': isActiveGroup([
                                    'schedules.index',
                                    'schedules.show',
                                    'groups.index',
                                ]),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActiveGroup([
                                        'schedules.index',
                                        'schedules.show',
                                        'groups.index',
                                    ]),
                            }"
                            @mouseenter="setHoveredItem('schedule')"
                            @mouseleave="clearHoveredItem()"
                        >
                            <div class="flex items-center">
                                <div
                                    class="flex items-center justify-center w-8 h-8 transition-all duration-300"
                                    :class="{
                                        'text-white': isActiveGroup([
                                            'schedules.index',
                                            'schedules.show',
                                            'groups.index',
                                        ]),
                                    }"
                                >
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-300"
                                    :class="{
                                        'font-semibold': isActiveGroup([
                                            'schedules.index',
                                            'schedules.show',
                                            'groups.index',
                                        ]),
                                    }"
                                    >Schedule Management</span
                                >
                            </div>
                            <div
                                v-if="sidebarOpen"
                                class="transition-transform duration-300"
                                :class="{
                                    'rotate-180': activeDropdown === 'schedule',
                                }"
                            >
                                <i
                                    class="fas fa-chevron-down text-xs"
                                    :class="{
                                        'text-black': isActiveGroup([
                                            'schedules.index',
                                            'schedules.show',
                                            'groups.index',
                                        ]),
                                    }"
                                ></i>
                            </div>
                            <div
                                v-if="
                                    hoveredItem === 'schedule' &&
                                    !isActiveGroup([
                                        'schedules.index',
                                        'schedules.show',
                                        'groups.index',
                                    ])
                                "
                                class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
                            ></div>
                        </div>

                        <!-- Dropdown menu -->
                        <transition
                            enter-active-class="transition duration-200 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-100 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <ul
                                v-show="activeDropdown === 'schedule'"
                                class="mt-1 space-y-1 pl-7"
                            >
                                <li>
                                    <Link
                                        :href="route('schedules.index')"
                                        class="flex items-center px-3 py-2 rounded-md text-sm transition-all duration-200"
                                        :class="{
                                            'bg-[#ffc001] text-black font-medium':
                                                isActive('schedules.index'),
                                            'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                                !isActive('schedules.index'),
                                        }"
                                    >
                                        <i
                                            class="fas fa-calendar-check mr-2"
                                            :class="{
                                                'text-black':
                                                    isActive('schedules.index'),
                                            }"
                                        ></i>
                                        <span>Individual Schedule</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        :href="route('groups.index')"
                                        class="flex items-center px-3 py-2 rounded-md text-sm transition-all duration-200"
                                        :class="{
                                            'bg-[#ffc001] text-black font-medium':
                                                isActive('groups.index'),
                                            'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                                !isActive('groups.index'),
                                        }"
                                    >
                                        <i
                                            class="fas fa-users-cog mr-2"
                                            :class="{
                                                'text-black':
                                                    isActive('groups.index'),
                                            }"
                                        ></i>
                                        <span>Group Schedule</span>
                                    </Link>
                                </li>
                            </ul>
                        </transition>
                    </li>

                    <!-- Profile -->
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

                    <!-- Reports -->
                    <li>
                        <Link
                            :href="route('profile.edit')"
                            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black': false,
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white': true,
                            }"
                            @mouseenter="setHoveredItem('reports')"
                            @mouseleave="clearHoveredItem()"
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex items-center justify-center w-8 h-8 transition-all duration-300"
                                >
                                    <i class="fas fa-file-pdf"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-300"
                                    >Reports</span
                                >
                            </div>
                            <div
                                v-if="hoveredItem === 'reports'"
                                class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
                            ></div>
                        </Link>
                    </li>
                </ul>
            </nav>

            <!-- User profile section -->
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
                            <p class="text-md font-medium text-white">
                                {{ $page.props.auth.user.name }}
                            </p>
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
        </aside>

        <!-- Main content wrapper -->
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
                        <slot name="header" />
                    </div>

                    <NotificationBell
                        class="mr-10"
                        :notifications="$page.props.notifications"
                    />
                </div>
            </header>

            <!-- Page Content -->
            <main class="py-3">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <slot />
                </div>
            </main>
        </div>

        <!-- Logout Modal -->
        <transition
            enter-active-class="ease-out duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="showLogoutModal"
                class="fixed inset-0 z-50 overflow-y-auto"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div
                    class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                >
                    <!-- Background overlay -->
                    <div
                        class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
                        @click="showLogoutModal = false"
                    ></div>

                    <!-- Modal panel -->
                    <div
                        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
                    >
                        <div class="text-center">
                            <h3
                                class="text-lg leading-6 font-medium text-gray-900"
                                id="modal-title"
                            >
                                Confirm Logout
                            </h3>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    Are you sure you want to log out from
                                    <span class="font-semibold text-gray-700">{{
                                        $page.props.auth.user.email
                                    }}</span
                                    >?
                                </p>
                            </div>
                            <div class="mt-5 sm:mt-6 space-y-2">
                                <button
                                    type="button"
                                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#012f12] text-base font-medium text-white hover:bg-[#034b1c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#012f12] transition-colors duration-200 sm:text-sm"
                                    @click="handleLogout"
                                >
                                    Logout
                                </button>
                                <button
                                    type="button"
                                    class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc001] transition-colors duration-200 sm:text-sm"
                                    @click="showLogoutModal = false"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
/* Base styling for transitions */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles */
button:focus,
a:focus {
    outline: 2px solid #ffc001;
    outline-offset: 2px;
}

/* Custom scrollbar for the sidebar */
nav::-webkit-scrollbar {
    width: 4px;
}

nav::-webkit-scrollbar-track {
    background: #012f12;
}

nav::-webkit-scrollbar-thumb {
    background-color: #034b1c;
    border-radius: 20px;
}

/* Active item indicator animation */
.sidebar-item-active-indicator {
    width: 4px;
    background-color: #ffc001;
    position: absolute;
    left: 0;
    height: 0;
    transition: height 0.3s ease;
}

.group:hover .sidebar-item-active-indicator {
    height: 100%;
}
</style>
