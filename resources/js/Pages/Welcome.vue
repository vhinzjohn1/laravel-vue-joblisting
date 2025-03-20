<script setup>
import { Head, Link } from "@inertiajs/vue3";
import { ref, onMounted } from "vue";

// Import images using Vite
import cmuLogo from "@images/cmulogo.png";
import cmuAdmin from "@images/cmuadmin.png";
import mainGate from "@images/main_gate.png";

const isMobileMenuOpen = ref(false);
const mobileMenuClasses = ref("opacity-0 -translate-y-10 hidden");

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    if (isMobileMenuOpen.value) {
        mobileMenuClasses.value = "opacity-100 translate-y-0 block";
    } else {
        // Set to transitioning out state first
        mobileMenuClasses.value = "opacity-0 -translate-y-10 block";
        // Then hide after transition completes
        setTimeout(() => {
            if (!isMobileMenuOpen.value) {
                mobileMenuClasses.value = "opacity-0 -translate-y-10 hidden";
            }
        }, 300);
    }
};

defineProps({
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    },
    laravelVersion: {
        type: String,
        required: true,
    },
    phpVersion: {
        type: String,
        required: true,
    },
});

// Check screen size on mount and when resized
const isSmallScreen = ref(false);

onMounted(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
});

const checkScreenSize = () => {
    isSmallScreen.value = window.innerWidth < 1024; // lg breakpoint
};
</script>

<template>
    <Head>
        <title>Welcome</title>
    </Head>

    <div class="relative min-h-screen bg-white overflow-hidden">
        <!-- Navigation -->
        <header class="fixed w-full bg-white shadow-md z-50">
            <nav class="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div class="flex justify-between items-center">
                    <a href="#" class="flex items-center space-x-3">
                        <img
                            :src="cmuLogo"
                            alt="CMU Logo"
                            class="w-10 h-10 sm:w-12 sm:h-12"
                        />
                        <span
                            class="font-semibold text-green-800 text-sm sm:text-base lg:text-xl"
                        >
                            Central Mindanao University
                        </span>
                    </a>

                    <!-- Hamburger Menu Button -->
                    <button @click="toggleMobileMenu" class="lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6 text-green-800"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                v-if="!isMobileMenuOpen"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            <path
                                v-else
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <!-- Desktop Menu -->
                    <div class="hidden lg:flex items-center space-x-8">
                        <a
                            href="#home"
                            class="text-green-800 hover:text-green-600"
                            >Home</a
                        >
                        <a
                            href="#about"
                            class="text-green-800 hover:text-green-600"
                            >About</a
                        >
                        <a
                            href="#process"
                            class="text-green-800 hover:text-green-600"
                            >Process</a
                        >
                        <div class="flex space-x-4">
                            <Link
                                v-if="canLogin"
                                :href="route('login')"
                                class="px-6 py-2 border-2 border-green-800 text-green-800 rounded-md hover:bg-green-800 hover:text-white transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                v-if="canRegister"
                                :href="route('register')"
                                class="px-6 py-2 bg-green-800 text-white border-2 border-green-800 rounded-md hover:text-green-800 transition-colors"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>

                <!-- Mobile Menu -->
                <div
                    :class="mobileMenuClasses"
                    class="lg:hidden mt-4 transition-all duration-300 ease-in-out"
                >
                    <div class="flex flex-col space-y-4">
                        <a
                            href="#home"
                            class="text-green-800 hover:text-green-600"
                            >Home</a
                        >
                        <a
                            href="#about"
                            class="text-green-800 hover:text-green-600"
                            >About</a
                        >
                        <a
                            href="#process"
                            class="text-green-800 hover:text-green-600"
                            >Process</a
                        >
                        <div class="flex flex-col space-y-2">
                            <Link
                                v-if="canLogin"
                                :href="route('login')"
                                class="px-6 py-2 border-2 border-green-800 text-green-800 rounded-md hover:bg-green-800 hover:text-white transition-colors text-center"
                            >
                                Log in
                            </Link>
                            <Link
                                v-if="canRegister"
                                :href="route('register')"
                                class="px-6 py-2 bg-green-800 text-white border-2 border-green-800 rounded-md hover:text-green-800 transition-colors text-center"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

        <!-- Main Content Wrapper -->
        <div class="relative w-full">
            <!-- Hero Section -->
            <section id="home" class="min-h-screen flex items-center pt-16">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-0"
                    >
                        <!-- Left Content - Centered on medium and smaller screens -->
                        <div
                            class="space-y-6 text-center mx-auto sm:mx-auto md:mx-auto lg:text-left lg:mx-0"
                        >
                            <div
                                data-aos="fade-up"
                                data-aos-duration="800"
                                data-aos-mirror="true"
                            >
                                <h1
                                    class="text-4xl sm:text-5xl lg:text-7xl font-bold"
                                >
                                    HR Job
                                    <span class="text-green-700">Listing</span
                                    ><br />
                                    System
                                </h1>
                            </div>
                            <p
                                class="text-gray-600 text-base sm:text-lg max-w-md"
                                data-aos="fade-up"
                                data-aos-duration="800"
                                data-aos-delay="200"
                                data-aos-mirror="true"
                            >
                                Streamlined job posting and application
                                management system. Empowering HR teams with
                                efficient tools while making it easier for
                                applicants to find and apply for opportunities.
                            </p>
                            <div
                                class="flex flex-wrap gap-4 justify-center sm:justify-center md:justify-center lg:justify-start"
                                data-aos="fade-up"
                                data-aos-duration="800"
                                data-aos-delay="400"
                                data-aos-mirror="true"
                            >
                                <Link
                                    v-if="canLogin"
                                    :href="route('login')"
                                    class="px-6 sm:px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
                                >
                                    Get Started
                                </Link>
                                <a
                                    href="#process"
                                    class="px-6 sm:px-8 py-3 border-2 border-gray-300 rounded-lg hover:border-green-800 transition-colors font-medium"
                                >
                                    Explore Jobs
                                </a>
                            </div>
                        </div>

                        <!-- Right Content - Animated Showcase (Only visible on large screens) -->
                        <div
                            v-if="!isSmallScreen"
                            class="relative mt-8 lg:mt-0 hidden lg:block"
                            data-aos="fade-left"
                            data-aos-duration="1000"
                            data-aos-mirror="true"
                            data-aos-delay="600"
                        >
                            <div
                                class="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl transform -rotate-6 scale-95 transition-transform duration-300 hover:rotate-0"
                            ></div>
                            <div
                                class="relative bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
                            >
                                <div
                                    class="flex items-center justify-between mb-6"
                                >
                                    <h3 class="text-lg font-semibold">
                                        Application Process
                                    </h3>
                                    <div class="flex space-x-2">
                                        <div
                                            class="w-3 h-3 rounded-full bg-red-400"
                                        ></div>
                                        <div
                                            class="w-3 h-3 rounded-full bg-yellow-400"
                                        ></div>
                                        <div
                                            class="w-3 h-3 rounded-full bg-green-400"
                                        ></div>
                                    </div>
                                </div>
                                <div class="space-y-3">
                                    <!-- Application Process Steps -->
                                    <div
                                        class="bg-gray-50 p-3 rounded-lg transition-all hover:bg-gray-100"
                                        data-aos="fade-up"
                                        data-aos-delay="100"
                                        data-aos-mirror="true"
                                    >
                                        <div
                                            class="flex items-center space-x-3"
                                        >
                                            <div
                                                class="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold text-sm"
                                            >
                                                1
                                            </div>
                                            <div>
                                                <p
                                                    class="text-sm font-medium text-gray-800"
                                                >
                                                    Job Posting
                                                </p>
                                                <p
                                                    class="text-xs text-gray-500"
                                                >
                                                    HR posts detailed job
                                                    openings
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="bg-gray-50 p-3 rounded-lg transition-all hover:bg-gray-100"
                                        data-aos="fade-up"
                                        data-aos-delay="100"
                                        data-aos-mirror="true"
                                    >
                                        <div
                                            class="flex items-center space-x-3"
                                        >
                                            <div
                                                class="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm"
                                            >
                                                2
                                            </div>
                                            <div>
                                                <p
                                                    class="text-sm font-medium text-gray-800"
                                                >
                                                    Submit Application
                                                </p>
                                                <p
                                                    class="text-xs text-gray-500"
                                                >
                                                    Apply through user-friendly
                                                    interface
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="bg-gray-50 p-3 rounded-lg transition-all hover:bg-gray-100"
                                        data-aos="fade-up"
                                        data-aos-delay="100"
                                        data-aos-mirror="true"
                                    >
                                        <div
                                            class="flex items-center space-x-3"
                                        >
                                            <div
                                                class="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm"
                                            >
                                                3
                                            </div>
                                            <div>
                                                <p
                                                    class="text-sm font-medium text-gray-800"
                                                >
                                                    Application Review
                                                </p>
                                                <p
                                                    class="text-xs text-gray-500"
                                                >
                                                    HR reviews and shortlists
                                                    candidates
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="bg-gray-50 p-3 rounded-lg transition-all hover:bg-gray-100"
                                        data-aos="fade-up"
                                        data-aos-delay="100"
                                        data-aos-mirror="true"
                                    >
                                        <div
                                            class="flex items-center space-x-3"
                                        >
                                            <div
                                                class="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold text-sm"
                                            >
                                                4
                                            </div>
                                            <div>
                                                <p
                                                    class="text-sm font-medium text-gray-800"
                                                >
                                                    Schedule Interview
                                                </p>
                                                <p
                                                    class="text-xs text-gray-500"
                                                >
                                                    Selected candidates are
                                                    contacted
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="bg-gray-50 p-3 rounded-lg transition-all hover:bg-gray-100"
                                        data-aos="fade-up"
                                        data-aos-delay="100"
                                        data-aos-mirror="true"
                                    >
                                        <div
                                            class="flex items-center space-x-3"
                                        >
                                            <div
                                                class="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-semibold text-sm"
                                            >
                                                5
                                            </div>
                                            <div>
                                                <p
                                                    class="text-sm font-medium text-gray-800"
                                                >
                                                    Offer & Onboarding
                                                </p>
                                                <p
                                                    class="text-xs text-gray-500"
                                                >
                                                    Successful candidates
                                                    receive offers
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Get Started Button -->
                                    <div
                                        class="mt-6 flex justify-center"
                                        data-aos="fade-up"
                                        data-aos-delay="100"
                                        data-aos-mirror="true"
                                    >
                                        <Link
                                            v-if="canLogin"
                                            :href="route('login')"
                                            class="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Application Process Section (Only visible on small screens) -->
            <section
                id="process"
                class="min-h-screen bg-gray-50 py-16 lg:py-20"
                v-if="isSmallScreen"
                data-aos="fade-up"
                data-aos-mirror="true"
            >
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-10">
                        <span
                            class="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4"
                            >PROCESS</span
                        >
                        <h2
                            class="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                        >
                            Application Process
                        </h2>
                        <div
                            class="w-24 h-1 bg-green-600 mx-auto rounded-full"
                        ></div>
                    </div>

                    <div class="max-w-2xl mx-auto">
                        <div
                            class="relative bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
                            data-aos="fade-up"
                        >
                            <div class="flex items-center justify-between mb-6">
                                <h3 class="text-lg font-semibold">
                                    How It Works
                                </h3>
                                <div class="flex space-x-2">
                                    <div
                                        class="w-3 h-3 rounded-full bg-red-400"
                                    ></div>
                                    <div
                                        class="w-3 h-3 rounded-full bg-yellow-400"
                                    ></div>
                                    <div
                                        class="w-3 h-3 rounded-full bg-green-400"
                                    ></div>
                                </div>
                            </div>
                            <div class="space-y-4">
                                <div
                                    class="bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100"
                                    data-aos-mirror="true"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    <div class="flex items-center space-x-3">
                                        <div
                                            class="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold text-sm"
                                        >
                                            1
                                        </div>
                                        <div>
                                            <p
                                                class="text-base font-medium text-gray-800"
                                            >
                                                Job Posting
                                            </p>
                                            <p class="text-sm text-gray-500">
                                                HR posts detailed job openings
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100"
                                    data-aos-mirror="true"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    <div class="flex items-center space-x-3">
                                        <div
                                            class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm"
                                        >
                                            2
                                        </div>
                                        <div>
                                            <p
                                                class="text-base font-medium text-gray-800"
                                            >
                                                Submit Application
                                            </p>
                                            <p class="text-sm text-gray-500">
                                                Apply through user-friendly
                                                interface
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100"
                                    data-aos-mirror="true"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    <div class="flex items-center space-x-3">
                                        <div
                                            class="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm"
                                        >
                                            3
                                        </div>
                                        <div>
                                            <p
                                                class="text-base font-medium text-gray-800"
                                            >
                                                Application Review
                                            </p>
                                            <p class="text-sm text-gray-500">
                                                HR reviews and shortlists
                                                candidates
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100"
                                    data-aos-mirror="true"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    <div class="flex items-center space-x-3">
                                        <div
                                            class="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold text-sm"
                                        >
                                            4
                                        </div>
                                        <div>
                                            <p
                                                class="text-base font-medium text-gray-800"
                                            >
                                                Schedule Interview
                                            </p>
                                            <p class="text-sm text-gray-500">
                                                Selected candidates are
                                                contacted
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100"
                                    data-aos-mirror="true"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    <div class="flex items-center space-x-3">
                                        <div
                                            class="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-semibold text-sm"
                                        >
                                            5
                                        </div>
                                        <div>
                                            <p
                                                class="text-base font-medium text-gray-800"
                                            >
                                                Offer & Onboarding
                                            </p>
                                            <p class="text-sm text-gray-500">
                                                Successful candidates receive
                                                offers
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="mt-8 flex justify-center"
                                data-aos="fade-up"
                                data-aos-delay="100"
                                data-aos-mirror="true"
                            >
                                <Link
                                    v-if="canLogin"
                                    :href="route('login')"
                                    class="px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Mission and Vision Section -->
            <section
                id="about"
                class="py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white"
            >
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16" data-aos="fade-up">
                        <span
                            class="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4"
                            >DEPARTMENT'S</span
                        >
                        <h2
                            class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                        >
                            Mission and Vision
                        </h2>
                        <div
                            class="w-24 h-1 bg-green-600 mx-auto rounded-full"
                        ></div>
                    </div>

                    <!-- Mission Card -->
                    <div class="max-w-6xl mx-auto mb-12 lg:mb-20">
                        <div
                            class="relative bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            <div class="grid grid-cols-1 lg:grid-cols-2">
                                <div
                                    class="relative p-6 sm:p-8 lg:p-12"
                                    data-aos="fade-right"
                                    data-aos-duration="1000"
                                >
                                    <div
                                        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"
                                    ></div>
                                    <h3
                                        class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center"
                                    >
                                        <span class="text-green-600 mr-3"
                                            >01.</span
                                        >
                                        Our Mission
                                    </h3>
                                    <p
                                        class="text-gray-600 leading-relaxed text-base sm:text-lg"
                                    >
                                        To advance the frontier of knowledge
                                        through internationalization of
                                        education and equitable access to
                                        quality instruction, research, extension
                                        and production for economic prosperity,
                                        moral integrity, social and cultural
                                        sensitivity and environmental
                                        consciousness.
                                    </p>
                                </div>
                                <div
                                    class="relative h-60 sm:h-72 lg:h-auto"
                                    data-aos="fade-left"
                                    data-aos-duration="1000"
                                >
                                    <img
                                        :src="cmuAdmin"
                                        alt="CMU Admin Building"
                                        class="w-full h-full object-cover"
                                    />
                                    <div
                                        class="absolute inset-0 bg-green-900 bg-opacity-20"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Vision Card -->
                    <div class="max-w-6xl mx-auto">
                        <div
                            class="relative bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            <div class="grid grid-cols-1 lg:grid-cols-2">
                                <div
                                    class="relative h-60 sm:h-72 lg:h-auto order-2 lg:order-1"
                                    data-aos="fade-right"
                                    data-aos-duration="1000"
                                >
                                    <img
                                        :src="mainGate"
                                        alt="CMU Main Gate"
                                        class="w-full h-full object-cover"
                                    />
                                    <div
                                        class="absolute inset-0 bg-green-900 bg-opacity-20"
                                    ></div>
                                </div>
                                <div
                                    class="relative p-6 sm:p-8 lg:p-12 order-1 lg:order-2"
                                    data-aos="fade-left"
                                    data-aos-duration="1000"
                                >
                                    <div
                                        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"
                                    ></div>
                                    <h3
                                        class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center"
                                    >
                                        <span class="text-green-600 mr-3"
                                            >02.</span
                                        >
                                        Our Vision
                                    </h3>
                                    <p
                                        class="text-gray-600 leading-relaxed text-base sm:text-lg"
                                    >
                                        A leading ASEAN university actively
                                        committed to the total development of
                                        people for a globally sustainable
                                        environment and a humane society.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Footer -->
        <footer class="bg-green-800 text-white py-4 text-center">
            <p>Software Development Department 2025. All Rights Reserved.</p>
        </footer>
    </div>
</template>

<style>
/* Global styles to prevent horizontal scroll */
html,
body {
    overflow-x: hidden;
    width: 100%;
    position: relative;
}

/* Container styles */
.container {
    width: 100%;
    max-width: 80rem; /* max-w-7xl equivalent */
    margin-left: auto;
    margin-right: auto;
}

/* Section spacing */
section {
    scroll-margin-top: 5rem;
    width: 100%;
}

/* Full height sections */
.min-h-screen {
    min-height: 100vh;
}

/* Ensure images don't cause overflow */
img {
    max-width: 100%;
    height: auto;
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}
</style>
