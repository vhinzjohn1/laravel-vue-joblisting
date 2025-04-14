<script setup>
import { ref, computed } from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { Link, usePage } from "@inertiajs/vue3";
import { router } from "@inertiajs/vue3";
import NotificationBell from "@/Components/NotificationBell.vue";

const showMobileMenu = ref(false);
const sidebarOpen = ref(true);
const showLogoutModal = ref(false);
const showProfileDropdown = ref(false);

console.log(usePage().props);

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
};

const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value;
};

const handleLogout = () => {
    router.post(route("logout"));
};

const isActive = (routeName) => {
    return route().current(routeName);
};

const toggleProfileDropdown = () => {
    showProfileDropdown.value = !showProfileDropdown.value;
};

const toggleMenu = () => {
  const isMobile = window.innerWidth < 1024;
  if (isMobile) {
    showMobileMenu.value = !showMobileMenu.value;
  } else {
    sidebarOpen.value = !sidebarOpen.value;
  }
};
</script>

<template>
    <div class="min-h-screen bg-gray-100">
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
            class="fixed left-0 top-0 z-40 h-full bg-[#012f12] shadow-xl transition-all duration-300 ease-in-out lg:translate-x-0 flex flex-col"
        >
            <!-- Sidebar Header -->
            <div class="flex h-16 items-center border-b border-[#023d17] px-4">
                <Link href="/" class="flex items-center">
                    <ApplicationLogo
                        class="block h-8 w-auto fill-current text-white"
                    />
                    <span
                        v-if="sidebarOpen"
                        class="ml-3 text-lg font-semibold text-white"
                        >Admin</span
                    >
                </Link>
            </div>
            <!-- Navigation Links -->
            <nav class="flex-1 px-2 py-5 overflow-y-auto">
                <ul class="space-y-2">
                    <li>
                        <Link
                            :href="route('admin.index')"
                            class="sidebar-link flex items-center w-full px-4 py-2.5 rounded-lg transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black':
                                    isActive('admin.index'),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('admin.index'),
                            }"
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex items-center justify-center w-8 h-8 transition-all duration-200"
                                    :class="{
                                        'text-black': isActive('admin.index'),
                                    }"
                                >
                                    <i class="fas fa-tachometer-alt"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-200"
                                    :class="{
                                        'font-semibold':
                                            isActive('admin.index'),
                                    }"
                                    >Admin Dashboard</span
                                >
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            :href="route('profile.edit')"
                            class="sidebar-link flex items-center w-full px-4 py-2.5 rounded-lg transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black':
                                    isActive('profile.edit'),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('profile.edit'),
                            }"
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex items-center justify-center w-8 h-8 transition-all duration-200"
                                    :class="{
                                        'text-black': isActive('profile.edit'),
                                    }"
                                >
                                    <i class="fas fa-user"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-200"
                                    :class="{
                                        'font-semibold':
                                            isActive('profile.edit'),
                                    }"
                                    >Profile</span
                                >
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            :href="route('test.index')"
                            class="sidebar-link flex items-center w-full px-4 py-2.5 rounded-lg transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black':
                                    isActive('test.index'),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('test.index'),
                            }"
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex items-center justify-center w-8 h-8 transition-all duration-200"
                                    :class="{
                                        'text-black': isActive('test.index'),
                                    }"
                                >
                                    <i class="fas fa-upload"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-200"
                                    :class="{
                                        'font-semibold': isActive('test.index'),
                                    }"
                                    >Test Upload</span
                                >
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>

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
            <!-- Page Header -->
            <header class="bg-white shadow-sm sticky top-0 z-10" v-if="$slots.header">
                <div class="mx-auto py-2.5 sm:px-10 md:px-12 lg:px-8 flex items-center gap-5">

                    <!-- One Toggle Button for Both Views -->
                    <button
                    @click="toggleMenu"
                    class="rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-[#034b1c] hover:text-white transition-colors duration-200 ml-4 flex-shrink-0"
                    >
                    <i
                        class="text-base fas fa-bars"
                    ></i>
                    </button>

                    <div class="flex-grow">
                    <slot name="header" />
                    </div>

                    <div class="flex items-center">
                        <NotificationBell
                            :notifications="$page.props.notifications"
                        />

                        <!-- Profile Dropdown -->
                        <div class="relative ml-3">
                            <button
                                @click="toggleProfileDropdown"
                                class="flex items-center gap-2 hover:bg-gray-100 rounded-full p-1.5 transition-colors"
                            >
                                <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span class="text-sm font-medium text-gray-600">
                                        {{ $page.props.auth.user.username.charAt(0) }}
                                    </span>
                                </div>
                                <i class="fas fa-angle-down text-gray-600 text-sm"></i>
                            </button>

                            <!-- Dropdown Menu -->
                            <div v-if="showProfileDropdown" 
                                class="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                                <Link
                                    :href="route('profile.edit')"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Profile
                                </Link>
                                <button
                                    @click="showLogoutModal = true"
                                    class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
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
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* New styles for sidebar */
.sidebar {
    background-color: #012f12; /* Dark Green */
}

.sidebar a {
    color: #ffffff; /* White text for links */
}

.logout {
    background-color: #012f12;
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

/* New improved hover effects with CSS */
.sidebar-link {
    position: relative;
}

.sidebar-link::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background-color: #ffc001;
    transform: scaleY(0);
    transition: transform 0.2s ease;
}

.sidebar-link:not(.bg-[#ffc001]):hover::before {
    transform: scaleY(1);
}

/* Transition improvements */
.sidebar-link {
    transition:
        background-color 0.2s ease,
        color 0.2s ease;
}

/* User profile hover effect */
.user-profile-section {
    transition: background-color 0.2s ease;
}

.user-profile-section:hover {
    background-color: #023d17;
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
