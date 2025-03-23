<script setup>
import { ref, computed, onMounted, onBeforeMount } from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { Link } from "@inertiajs/vue3";
import { router, usePage } from "@inertiajs/vue3";
import NotificationBell from "@/Components/NotificationBell.vue";
import { useVgt } from "vue-guided-tour";

const showMobileMenu = ref(false);
const sidebarOpen = ref(true);
const showLogoutModal = ref(false);
const hoveredItem = ref(null);
const currentStepIndex = ref(-1);
const isMobileView = ref(false);
const isUserTourCompleted = computed(() => usePage().props.auth.user.tour_completed);

// Get the VGT instance
const $vgt = useVgt();

// Detect if we're in mobile view
const checkMobileView = () => {
    isMobileView.value = window.innerWidth < 1024; // lg breakpoint in Tailwind
};

// Common tour steps for both mobile and desktop
const desktopTourSteps = [
    {
        target: "#welcome-link",
        title: "Welcome to CMU Job Application System",
        content:
            "This is your starting point for viewing and applying to job applications",
        popover: {
            position: "right",
            placement: "center",
        },
    },
    {
        target: "#dashboard-link",
        title: "Dashboard",
        content:
            "This is your Dashboard, where you can see all your activity at a glance",
        popover: {
            position: "right",
            placement: "center",
        },
    },
    {
        target: "#jobs-link",
        title: "Job Listings",
        content: "Browse and apply for available job listings here",
        popover: {
            position: "right",
            placement: "center",
        },
    },
    {
        target: "#applications-link",
        title: "My Applications",
        content: "Track all your submitted job applications in one place",
        popover: {
            position: "right",
            placement: "center",
        },
    },
    {
        target: "#schedules-link",
        title: "Schedules",
        content: "Manage your interview schedules and appointments",
        popover: {
            position: "right",
            placement: "center",
        },
    },
    {
        target: "#profile-link",
        title: "User Profile",
        content:
            "Update your profile information, resume, and personal details",
        popover: {
            position: "right",
            placement: "center",
        },
    },
];

// Mobile tour steps with hamburger menu first
const mobileTourSteps = [
    {
        target: "#welcome-link",
        title: "Welcome to CMU Job Application System",
        content:
            "This is your starting point for viewing and applying to job applications",
        popover: {
            position: "right",
            placement: "center",
        },
    },
    {
        target: "#menu-button",
        title: "Menu Button",
        content: "Click this button to show the sidebar navigation",
        popover: {
            position: "left",
            placement: "center",
        },
        params: {
            // Force 'Next' button instead of 'Done'
            buttonLabel: "Next",
            // Make sure this isn't treated as the final step
            final: false,
        },
        onBeforeNext: () => {
            if (!showMobileMenu.value) {
                // Stop the tour from advancing
                return false;
            }
            // Allow the tour to continue
            return true;
    },
    },
    // Add a placeholder step to ensure the hamburger menu isn't treated as the final step
    {
        target: "#dashboard-link",
        title: "Placeholder",
        content: "Placeholder",
        popover: {
            position: "right",
            placement: "center",
        },
        // This step will never be shown as we'll trigger the sidebar open and refresh steps
        canShow: false,
    },
];

// Dynamic tour steps based on device and view state
const tourSteps = computed(() => {
    if (isMobileView.value) {
        // For mobile: If sidebar is open, add navigation steps
        if (showMobileMenu.value) {
            // Return all steps including navigation items
            return [
                ...mobileTourSteps.slice(0, 2), // Keep welcome and menu button steps
                ...desktopTourSteps.slice(1), // Add all navigation steps
            ];
        } else {
            // Return just the initial steps (welcome + hamburger menu + placeholder)
            return mobileTourSteps;
        }
    } else {
        // For desktop: Return all desktop steps
        return desktopTourSteps;
    }
});


const isTourActive = computed(() => currentStepIndex.value >= 0);

// Function to start the tour
const startTour = () => {
    isTourActive.value = true; // Mark the tour as active
    currentStepIndex.value = -1;
    checkMobileView();
    if (isMobileView.value && showMobileMenu.value) {
        toggleMobileMenu();
    }

    setTimeout(() => {
        if ($vgt) {
            console.log("Starting tour for", isMobileView.value ? "mobile" : "desktop");
            $vgt.start(0);
        } else {
            console.error("$vgt global not available");
            currentStepIndex.value = 0; // Fallback approach
        }
    }, 300);
};

// Tour event handlers
const onAfterStart = () => {
    console.log("Tour started");
    isTourActive.value = true; // Set the tour active flag
};

const onAfterExit = () => {
    currentStepIndex.value = -1;
    console.log("Tour exited");
    isTourActive.value = false; // Unset the tour active flag

    // axios to update tour completed status in database then console log the response
    axios.post(route('complete-profile.store')).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error.response ? error.response.data.message : error.message);
    });
};


const onAfterMove = () => {
    console.log("Tour moved to step", currentStepIndex.value);

    // For mobile: if we just landed on the mobile menu step (step 1; zero-indexed)
    if (isMobileView.value && currentStepIndex.value === 1) {
        if (!showMobileMenu.value) {
            toggleMobileMenu();
        }
    }
};


// Initialize on mount
onBeforeMount(() => {
    // Add window resize listener
    window.addEventListener("resize", checkMobileView);
    checkMobileView();
});

onMounted(async () => {
    // if not haseentour then return else start tour will timeout
    if (isUserTourCompleted.value) return;
    setTimeout(() => {
        startTour();
    }, 500);
});

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
        <!-- Backdrop overlay for mobile -->
        <div
            id="sidebar-backdrop"
            v-if="showMobileMenu"
            @click="toggleMobileMenu"
            class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300"
        ></div>

        <!-- Vue Guided Tour Component -->
        <vue-guided-tour
            v-model:stepIndex="currentStepIndex"
            :steps="tourSteps"
            :allowOverlayClose="false"
            @after-start="onAfterStart"
            @after-exit="onAfterExit"
            @after-move="onAfterMove"
        />

        <!-- Tour Start Button -->
        <button
            @click="startTour"
            class="fixed bottom-4 right-4 z-20 bg-[#012f12] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#034b1c] transition-colors duration-200"
            title="Start Tour"
        >
            <i class="fas fa-question-circle mr-2"></i>
            <span>Help</span>
        </button>

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
                        >Applicant</span
                    >
                </Link>
            </div>

            <!-- Navigation Links -->
            <nav class="flex-1 px-3 py-4 overflow-y-auto">
                <ul class="space-y-1">
                    <li>
                        <Link
                            as="button"
                            :disabled="isTourActive"
                            id="dashboard-link"
                            :href="route('applicant.index')"
                            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black':
                                    isActive('applicant.index'),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('applicant.index'),
                                'cursor-not-allowed opacity-80': isTourActive,
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
                                    >Dashboard</span
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
                            as="button"
                            :disabled="isTourActive"
                            id="jobs-link"
                            :href="route('job-application.index')"
                            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black': isActive(
                                    'job-application.index',
                                ),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('job-application.index'),
                                'cursor-not-allowed opacity-80': isTourActive,
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
                            as="button"
                            :disabled="isTourActive"
                            id="applications-link"
                            :href="route('my-applications.index')"
                            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black': isActive(
                                    'my-applications.index',
                                ),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('my-applications.index'),
                                'cursor-not-allowed opacity-80': isTourActive,
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
                            as="button"
                            :disabled="isTourActive"
                            id="schedules-link"
                            :href="route('my-schedules.index')"
                            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black':
                                    isActive('my-schedules.index') ||
                                    isActive('my-schedules.show'),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('my-schedules.index') &&
                                    !isActive('my-schedules.show'),
                                'cursor-not-allowed opacity-80': isTourActive,
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
                            as="button"
                            :disabled="isTourActive"
                            id="profile-link"
                            :href="route('profile.edit')"
                            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden"
                            :class="{
                                'bg-[#ffc001] text-black':
                                    isActive('profile.edit'),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('profile.edit'),
                                'cursor-not-allowed opacity-80': isTourActive,
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
        </aside>

        <!-- Main Content -->
        <div
            :class="{
                'lg:ml-64': sidebarOpen,
                'lg:ml-20': !sidebarOpen,
            }"
            class="transition-all duration-300 ease-in-out"
        >
            <!-- Page Header -->
            <!-- make page header stay even on scroll -->
            <header class="bg-white shadow-sm sticky top-0 z-50" v-if="$slots.header">
                <div
                    class="mx-auto py-2.5 sm:px-10 md:px-12 lg:px-8 flex items-center gap-5"
                >
                    <button
                        id="desktop-toggle"
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

                    <div class="flex items-center mr-3">
                        <NotificationBell
                            :notifications="$page.props.notifications"
                        />
                        <!-- Mobile hamburger -->
                        <div class="lg:hidden" id="menu-button">
                            <button
                                @click="toggleMobileMenu"
                                class="rounded-lg bg-green-600 p-1 m-1 text-white shadow-lg hover:bg-green-500 focus:outline-none"
                            >
                                <i
                                    class="fas fa-bars h-6 w-6"
                                    v-if="!showMobileMenu"
                                ></i>
                                <i class="fas fa-times h-6 w-6" v-else></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Page Content -->
            <main class="py-3">
                <div
                    class="max-w-7xl mx-auto sm:px-6 lg:px-8"
                    id="welcome-link"
                    :class="{ 'pointer-events-none': isTourActive }"
                >
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

/* Update tour specific styles to match what works */
:deep(.v-popper__inner) {
    background-color: #012f12 !important;
    color: white !important;
}

:deep(.v-popper__arrow-inner) {
    border-color: #012f12 !important;
}

:deep(.v-popper__arrow-outer) {
    border-color: #012f12 !important;
}

:deep(.vue-tour__button) {
    background-color: #ffc001 !important;
    color: black !important;
}

:deep(.vue-tour__button--back) {
    background-color: #034b1c !important;
    color: white !important;
}

:deep(.vue-tour__button--skip) {
    color: #ffc001 !important;
}

/* Add new style for disabled links during tour */
.cursor-not-allowed {
    cursor: not-allowed !important;
}

.pointer-events-none {
    pointer-events: none;
}
</style>
