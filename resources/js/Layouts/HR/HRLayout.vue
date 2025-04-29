<script setup>
import { ref, computed, onMounted, onBeforeMount, watch } from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { Link } from "@inertiajs/vue3";
import { router, usePage } from "@inertiajs/vue3";
import NotificationBell from "@/Components/NotificationBell.vue";
import { useVgt } from "vue-guided-tour";

const showMobileMenu = ref(false);
const sidebarOpen = ref(true);
const showLogoutModal = ref(false);
const activeDropdown = ref(null);
const currentStepIndex = ref(-1);
const isMobileView = ref(false);
const isUserTourCompleted = computed(
    () => usePage().props.auth.user.tour_completed,
);

const showProfileDropdown = ref(false);

// Get the VGT instance
const $vgt = useVgt();

// Detect if we're in mobile view
const checkMobileView = () => {
    isMobileView.value = window.innerWidth < 1024; // lg breakpoint in Tailwind
};

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
    } else if (
        route().current("selection-lineup.index") ||
        route().current("selection-lineup.show")
    ) {
        activeDropdown.value = "reports";
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
        } else if (
            newRoute === "selection-lineup.index" ||
            newRoute === "selection-lineup.show"
        ) {
            activeDropdown.value = "reports";
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

const isActive = (routeName) => {
    return route().current(routeName);
};

const isActiveGroup = (routeNames) => {
    return routeNames.some((name) => route().current(name));
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
// Common tour steps for both mobile and desktop
const desktopTourSteps = [
    {
        target: "#dashboard-link",
        title: "HR Dashboard",
        content:
            "This is your Dashboard, where you can see all your activity at a glance",
        popover: {
            position: "right",
            placement: "center",
        },
    },
    {
        target: "#job-details-link",
        title: "Job Position Details",
        content: "Manage Job details here",
        popover: {
            position: "right",
            placement: "center",
        },
    },
    {
        target: "#job-listings-link",
        title: "Job Listings",
        content: "View and manage job listings here",
        popover: {
            position: "right",
            placement: "center",
        },
    },
    {
        target: "#applications-link",
        title: "Manage Applications",
        content: "Track and manage job applications here",
        popover: {
            position: "right",
            placement: "center",
        },
    },
    {
        target: "#reports-link",
        title: "Reports",
        content: "View reports for Selection Lineup",
        popover: {
            position: "right",
            placement: "center",
        },
    },
    {
        target: "#schedule-management-link",
        title: "Schedule Management",
        content: "Manage interview schedules and appointments",
        popover: {
            position: "right",
            placement: "center",
        },
    },
    {
        target: "#profile-link",
        title: "User Profile",
        content: "Update your profile information and personal details",
        popover: {
            position: "right",
            placement: "center",
        },
    },
];

// Mobile tour steps with hamburger menu first
const mobileTourSteps = [
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
                ...mobileTourSteps.slice(0, 1), // Keep menu button step
                ...desktopTourSteps, // Add all navigation steps
            ];
        } else {
            // Return just the initial steps (hamburger menu + placeholder)
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
            console.log(
                "Starting tour for",
                isMobileView.value ? "mobile" : "desktop",
            );
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
    axios
        .post(route("complete-profile.store"))
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(
                error.response ? error.response.data.message : error.message,
            );
        });
};

const onAfterMove = () => {
    console.log("Tour moved to step", currentStepIndex.value);

    // For mobile: if we just landed on the mobile menu step (step 1; zero-indexed)
    // if (isMobileView.value && currentStepIndex.value === 1) {
    //     if (!showMobileMenu.value) {
    //         toggleMobileMenu();
    //     }
    // }
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
</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <!-- Backdrop overlay for mobile -->
        <div
            v-if="showMobileMenu"
            @click="toggleMobileMenu"
            class="fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden"
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
            id="tour-start-button"
            @click="startTour"
            class="fixed bottom-4 right-4 z-20 bg-[#012f12] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#034b1c] transition-colors duration-200"
            title="Start Tour"
        >
            <i class="mr-2 fas fa-question-circle"></i>
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
            <nav class="overflow-y-auto flex-1 py-5">
                <ul class="px-2 space-y-2">
                    <!-- Dashboard -->
                    <li>
                        <Link
                            id="dashboard-link"
                            as="button"
                            :disabled="isTourActive"
                            :href="route('hr.index')"
                            class="flex overflow-hidden relative items-center px-4 py-2.5 w-full rounded-lg transition-all duration-200 sidebar-link group"
                            :class="{
                                'bg-[#ffc001] text-black': isActive('hr.index'),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('hr.index'),
                            }"
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex justify-center items-center w-8 h-8 transition-all duration-300"
                                    :class="{
                                        'text-black': isActive('hr.index'),
                                    }"
                                >
                                    <i class="fas fa-tachometer-alt"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-200"
                                    :class="{
                                        'font-semibold': isActive('hr.index'),
                                    }"
                                    >Dashboard</span
                                >
                            </div>
                        </Link>
                    </li>

                    <!-- Job Position Details -->
                    <li>
                        <Link
                            id="job-details-link"
                            as="button"
                            :disabled="isTourActive"
                            :href="route('job-position.index')"
                            class="flex overflow-hidden relative items-center px-4 py-2.5 w-full rounded-lg transition-all duration-200 sidebar-link group"
                            :class="{
                                'bg-[#ffc001] text-black':
                                    isActive('job-position.index'),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('job-position.index'),
                            }"
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex justify-center items-center w-8 h-8 transition-all duration-300"
                                    :class="{
                                        'text-black':
                                            isActive('job-position.index'),
                                    }"
                                >
                                    <i class="fas fa-users-cog"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-200"
                                    :class="{
                                        'font-semibold':
                                            isActive('job-position.index'),
                                    }"
                                    >Position Details</span
                                >
                            </div>
                        </Link>
                    </li>

                    <!-- Job Listings -->
                    <li>
                        <Link
                            as="button"
                            :disabled="isTourActive"
                            id="job-listings-link"
                            :href="route('job-listing.index')"
                            class="flex overflow-hidden relative items-center px-4 py-2.5 w-full rounded-lg transition-all duration-200 sidebar-link group"
                            :class="{
                                'bg-[#ffc001] text-black':
                                    isActive('job-listing.index'),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('job-listing.index'),
                            }"
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex justify-center items-center w-8 h-8 transition-all duration-300"
                                    :class="{
                                        'text-black':
                                            isActive('job-listing.index'),
                                    }"
                                >
                                    <i class="fas fa-list-ul"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-200"
                                    :class="{
                                        'font-semibold':
                                            isActive('job-listing.index'),
                                    }"
                                    >Job Listings</span
                                >
                            </div>
                        </Link>
                    </li>

                    <!-- Applications -->
                    <li>
                        <Link
                            as="button"
                            :disabled="isTourActive"
                            id="applications-link"
                            :href="route('applications.index')"
                            class="flex overflow-hidden relative items-center px-4 py-2.5 w-full rounded-lg transition-all duration-200 sidebar-link group"
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
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex justify-center items-center w-8 h-8 transition-all duration-300"
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
                                    class="ml-3 font-medium transition-all duration-200"
                                    :class="{
                                        'font-semibold': isActiveGroup([
                                            'applications.index',
                                            'applications.show',
                                        ]),
                                    }"
                                    >Applications</span
                                >
                            </div>
                        </Link>
                    </li>

                    <!-- Reports with dropdown -->
                    <li class="relative">
                        <div
                            id="reports-link"
                            @click="toggleDropdown('reports')"
                            class="flex overflow-hidden relative justify-between items-center px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer sidebar-link group"
                            :class="{
                                'text-white': isActiveGroup([
                                    'selection-lineup.index',
                                    'selection-lineup.show',
                                ]),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActiveGroup([
                                        'selection-lineup.index',
                                        'selection-lineup.show',
                                    ]),
                            }"
                        >
                            <div class="flex items-center">
                                <div
                                    class="flex justify-center items-center w-8 h-8 transition-all duration-300"
                                    :class="{
                                        'text-white': isActiveGroup([
                                            'selection-lineup.index',
                                            'selection-lineup.show',
                                        ]),
                                    }"
                                >
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-200"
                                    :class="{
                                        'font-semibold': isActiveGroup([
                                            'selection-lineup.index',
                                            'selection-lineup.show',
                                        ]),
                                    }"
                                    >Reports</span
                                >
                            </div>
                            <div
                                v-if="sidebarOpen"
                                class="transition-transform duration-200"
                                :class="{
                                    'rotate-180': activeDropdown === 'reports',
                                }"
                            >
                                <i
                                    class="text-xs fas fa-chevron-down"
                                    :class="{
                                        'text-white': isActiveGroup([
                                        'selection-lineup.index',
                                        'selection-lineup.show',
                                        ]),
                                    }"
                                ></i>
                            </div>
                        </div>

                        <!-- Dropdown menu -->
                        <transition
                            enter-active-class="transition duration-200 ease-out"
                            enter-from-class="opacity-0 transform scale-95"
                            enter-to-class="opacity-100 transform scale-100"
                            leave-active-class="transition duration-100 ease-in"
                            leave-from-class="opacity-100 transform scale-100"
                            leave-to-class="opacity-0 transform scale-95"
                        >
                            <ul
                                v-show="activeDropdown === 'reports'"
                                class="pr-2 pl-4 mt-1 ml-4 space-y-1"
                            >
                                <li>
                                    <Link
                                        :href="route('selection-lineup.index')"
                                        class="flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200 dropdown-link"
                                        :class="{
                                            'bg-[#ffc001] text-black font-medium':
                                                isActiveGroup([
                                                    'selection-lineup.index',
                                                    'selection-lineup.show',
                                                ]),
                                            'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                                !isActiveGroup([
                                                    'selection-lineup.index',
                                                    'selection-lineup.show',
                                                ]),
                                        }"
                                    >
                                        <i
                                            class="mr-2 fas fa-calendar-check"
                                            :class="{
                                                'text-black': isActiveGroup([
                                                    'selection-lineup.index',
                                                    'selection-lineup.show',
                                                ]),
                                            }"
                                        ></i>
                                        <span>Selection Lineup</span>
                                    </Link>
                                </li>
                            </ul>
                        </transition>
                    </li>

                    <!-- Schedule Management with Dropdown - Fixed reference -->
                    <li class="relative">
                        <div
                            id="schedule-management-link"
                            @click="toggleDropdown('schedule')"
                            class="flex overflow-hidden relative justify-between items-center px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer sidebar-link group"
                            :class="{
                                'text-white bg-[#034b1c]':
                                    activeDropdown === 'schedule' ||
                                    isActiveGroup([
                                        'schedules.index',
                                        'schedules.show',
                                        'groups.index',
                                    ]),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    activeDropdown !== 'schedule' &&
                                    !isActiveGroup([
                                        'schedules.index',
                                        'schedules.show',
                                        'groups.index',
                                    ]),
                            }"
                        >
                            <div class="flex items-center">
                                <div
                                    class="flex justify-center items-center w-8 h-8 transition-all duration-300"
                                    :class="{
                                        'text-white':
                                            isActiveGroup([
                                                'schedules.index',
                                                'schedules.show',
                                                'groups.index',
                                            ]) || activeDropdown === 'schedule',
                                    }"
                                >
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <span
                                    v-if="sidebarOpen"
                                    class="ml-3 font-medium transition-all duration-200"
                                    :class="{
                                        'font-semibold':
                                            isActiveGroup([
                                                'schedules.index',
                                                'schedules.show',
                                                'groups.index',
                                            ]) || activeDropdown === 'schedule',
                                    }"
                                    >Schedule</span
                                >
                            </div>
                            <div
                                v-if="sidebarOpen"
                                class="transition-transform duration-200"
                                :class="{
                                    'rotate-180': activeDropdown === 'schedule',
                                }"
                            >
                                <i
                                    class="text-xs fas fa-chevron-down"
                                    :class="{
                                        'text-white':
                                            activeDropdown === 'schedule' ||
                                            isActiveGroup([
                                                'schedules.index',
                                                'schedules.show',
                                                'groups.index',
                                            ]),
                                    }"
                                ></i>
                            </div>
                        </div>

                        <!-- Dropdown menu -->
                        <transition
                            enter-active-class="transition duration-200 ease-out"
                            enter-from-class="opacity-0 transform scale-95"
                            enter-to-class="opacity-100 transform scale-100"
                            leave-active-class="transition duration-100 ease-in"
                            leave-from-class="opacity-100 transform scale-100"
                            leave-to-class="opacity-0 transform scale-95"
                        >
                            <ul
                                v-show="activeDropdown === 'schedule'"
                                class="pr-2 pl-4 mt-1 ml-4 space-y-1"
                            >
                                <li>
                                    <Link
                                        :href="route('schedules.index')"
                                        class="flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200 dropdown-link"
                                        :class="{
                                            'bg-[#ffc001] text-black font-medium':
                                                isActive('schedules.index'),
                                            'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                                !isActive('schedules.index'),
                                        }"
                                    >
                                        <i
                                            class="mr-2 fas fa-calendar-check"
                                            :class="{
                                                'text-black':
                                                    isActive('schedules.index'),
                                            }"
                                        ></i>
                                        <span>Manage Schedule</span>
                                    </Link>
                                </li>
                                <!-- <li>
                                    <Link
                                        :href="route('groups.index')"
                                        class="flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200 dropdown-link"
                                        :class="{
                                            'bg-[#ffc001] text-black font-medium':
                                                isActive('groups.index'),
                                            'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                                !isActive('groups.index'),
                                        }"
                                    >
                                        <i
                                            class="mr-2 fas fa-users-cog"
                                            :class="{
                                                'text-black':
                                                    isActive('groups.index'),
                                            }"
                                        ></i>
                                        <span>Group Schedule</span>
                                    </Link>
                                </li> -->
                            </ul>
                        </transition>
                    </li>

                    <!-- Profile -->
                    <li>
                        <Link
                            as="button"
                            :disabled="isTourActive"
                            id="profile-link"
                            :href="route('profile.edit')"
                            class="flex overflow-hidden relative items-center px-4 py-2.5 w-full rounded-lg transition-all duration-200 sidebar-link group"
                            :class="{
                                'bg-[#ffc001] text-black':
                                    isActive('profile.edit'),
                                'text-gray-300 hover:bg-[#034b1c] hover:text-white':
                                    !isActive('profile.edit'),
                            }"
                        >
                            <div class="flex items-center w-full">
                                <div
                                    class="flex justify-center items-center w-8 h-8 transition-all duration-300"
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
                </ul>
            </nav>
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
            <header class="sticky top-0 z-10 bg-white shadow-sm" v-if="$slots.header">
                <div class="flex gap-5 items-center py-2.5 mx-auto sm:px-10 md:px-12 lg:px-8">

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
                        <!-- <slot name="header" /> -->
                    </div>

                    <div class="flex items-center">
                        <NotificationBell
                            :notifications="$page.props.notifications"
                        />

                        <!-- Profile Dropdown -->
                        <div class="relative ml-3">
                            <button
                                @click="toggleProfileDropdown"
                                class="flex gap-2 items-center p-1.5 rounded-full transition-colors hover:bg-gray-100"
                            >
                                <div class="flex justify-center items-center w-8 h-8 bg-gray-200 rounded-full">
                                    <span class="text-sm font-medium text-gray-600">
                                        {{ $page.props.auth.user.username.charAt(0) }}
                                    </span>
                                </div>
                                <i class="text-sm text-gray-600 fas fa-angle-down"></i>
                            </button>

                            <!-- Dropdown Menu -->
                            <div v-if="showProfileDropdown"
                                class="absolute right-0 py-1 mt-2 w-48 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg">
                                <Link
                                    :href="route('profile.edit')"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Profile
                                </Link>
                                <button
                                    @click="showLogoutModal = true"
                                    class="block px-4 py-2 w-full text-sm text-left text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Page Content -->
            <main class="py-3">
                <div class="px-4 mx-auto max-w-full sm:px-6 lg:px-8">
                    <slot />
                </div>
            </main>
        </div>

        <!-- Logout Modal -->
        <div
            v-if="showLogoutModal"
            class="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black bg-opacity-75 transition-opacity"
        >
            <div
                class="relative p-6 w-full max-w-sm text-center bg-white rounded-lg"
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
                        class="px-4 py-2 w-full text-sm font-semibold text-white rounded-lg logout focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Log out
                    </button>
                    <button
                        @click="showLogoutModal = false"
                        class="px-4 py-2 w-full text-sm font-semibold text-black rounded-lg border border-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
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

/* Dropdown link hover effect */
.dropdown-link {
    position: relative;
}

.dropdown-link::before {
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

/* Transition improvements */
.sidebar-link,
.dropdown-link {
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
</style>
