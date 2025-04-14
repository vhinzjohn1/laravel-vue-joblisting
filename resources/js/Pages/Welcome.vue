<script setup>
import { Head, Link } from "@inertiajs/vue3";
import GuestLayout from "@/Layouts/GuestLayout.vue";

const asset = (path) => {
    return `/${path}`;
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
</script>

<template>
    <Head>
        <title>CMU Job Listing</title>
        <meta name="description" content="Streamlined HR job posting and application management system. Empower HR teams with efficient tools while making it easier for applicants to find and apply for opportunities." />
    </Head>

    <GuestLayout :can-login="canLogin" :can-register="canRegister">
        <!-- Main Content Wrapper -->
        <div class="relative w-full">
            <!-- Hero Section -->
            <section id="home" class="min-h-screen flex items-center">
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
                        </div>

                        <!-- Right Content - Animated Showcase (Only visible on large screens) -->
                        <div
                            class="relative mt-8 lg:mt-0 lg:block"
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

            <!-- Detailed Application Steps Section -->
            <section id="how-to-apply" class="py-16 lg:py-20 bg-white">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16" data-aos="fade-up">
                        <span
                            class="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4"
                            >FOR APPLICANTS</span
                        >
                        <h2
                            class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                        >
                            How to Apply
                        </h2>
                        <p class="text-gray-600 max-w-2xl mx-auto text-lg">
                            Follow these detailed steps to complete your
                            application process smoothly.
                        </p>
                        <div
                            class="w-24 h-1 bg-green-600 mx-auto rounded-full mt-6"
                        ></div>
                    </div>

                    <div class="max-w-6xl mx-auto">
                        <div
                            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            <!-- Step 1: Registration -->
                            <div
                                class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                <div class="h-2 bg-green-600"></div>
                                <div class="p-6">
                                    <div
                                        class="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-xl mb-4"
                                    >
                                        1
                                    </div>
                                    <h3
                                        class="text-xl font-bold text-gray-900 mb-3"
                                    >
                                        Registration
                                    </h3>
                                    <p class="text-gray-600 mb-4">
                                        Create your account to access the job
                                        application system.
                                    </p>
                                    <ul class="space-y-2 text-gray-600">
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-green-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Enter username
                                        </li>
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-green-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Provide valid email
                                        </li>
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-green-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Create secure password
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Step 2: Profile Details -->
                            <div
                                class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <div class="h-2 bg-blue-600"></div>
                                <div class="p-6">
                                    <div
                                        class="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xl mb-4"
                                    >
                                        2
                                    </div>
                                    <h3
                                        class="text-xl font-bold text-gray-900 mb-3"
                                    >
                                        Complete Profile
                                    </h3>
                                    <p class="text-gray-600 mb-4">
                                        Input comprehensive details about your
                                        qualifications.
                                    </p>
                                    <ul class="space-y-2 text-gray-600">
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-blue-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Educational background
                                        </li>
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-blue-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Work experience
                                        </li>
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-blue-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Training certifications
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Step 3: Job Search -->
                            <div
                                class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
                                data-aos="fade-up"
                                data-aos-delay="300"
                            >
                                <div class="h-2 bg-purple-600"></div>
                                <div class="p-6">
                                    <div
                                        class="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-xl mb-4"
                                    >
                                        3
                                    </div>
                                    <h3
                                        class="text-xl font-bold text-gray-900 mb-3"
                                    >
                                        Find Job Listings
                                    </h3>
                                    <p class="text-gray-600 mb-4">
                                        Browse and search available job
                                        opportunities.
                                    </p>
                                    <ul class="space-y-2 text-gray-600">
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-purple-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Search by position
                                        </li>
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-purple-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Filter by department
                                        </li>
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-purple-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Select suitable job listing
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Step 4: Application Submission -->
                            <div
                                class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
                                data-aos="fade-up"
                                data-aos-delay="400"
                            >
                                <div class="h-2 bg-orange-600"></div>
                                <div class="p-6">
                                    <div
                                        class="w-12 h-12 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold text-xl mb-4"
                                    >
                                        4
                                    </div>
                                    <h3
                                        class="text-xl font-bold text-gray-900 mb-3"
                                    >
                                        Submit Application
                                    </h3>
                                    <p class="text-gray-600 mb-4">
                                        Select relevant profile details for the
                                        position.
                                    </p>
                                    <ul class="space-y-2 text-gray-600">
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-orange-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Select relevant credentials
                                        </li>
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-orange-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Customize application details
                                        </li>
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-orange-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Submit application form
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Step 5: Application Review -->
                            <div
                                class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
                                data-aos="fade-up"
                                data-aos-delay="500"
                            >
                                <div class="h-2 bg-teal-600"></div>
                                <div class="p-6">
                                    <div
                                        class="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-xl mb-4"
                                    >
                                        5
                                    </div>
                                    <h3
                                        class="text-xl font-bold text-gray-900 mb-3"
                                    >
                                        Application Review
                                    </h3>
                                    <p class="text-gray-600 mb-4">
                                        Wait while HR processes your
                                        application.
                                    </p>
                                    <ul class="space-y-2 text-gray-600">
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-teal-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            HR screening process
                                        </li>
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-teal-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Qualification assessment
                                        </li>
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-teal-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Application status updates
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Step 6: Schedule & Next Steps -->
                            <div
                                class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
                                data-aos="fade-up"
                                data-aos-delay="600"
                            >
                                <div class="h-2 bg-pink-600"></div>
                                <div class="p-6">
                                    <div
                                        class="w-12 h-12 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center font-bold text-xl mb-4"
                                    >
                                        6
                                    </div>
                                    <h3
                                        class="text-xl font-bold text-gray-900 mb-3"
                                    >
                                        Next Steps
                                    </h3>
                                    <p class="text-gray-600 mb-4">
                                        Follow up on your application status.
                                    </p>
                                    <ul class="space-y-2 text-gray-600">
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-pink-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Check application status
                                        </li>
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-pink-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Schedule for interview
                                        </li>
                                        <li class="flex items-start">
                                            <svg
                                                class="w-5 h-5 text-pink-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                            Complete competency exams
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- CTA Button -->
                        <div
                            class="mt-12 text-center"
                            data-aos="fade-up"
                            data-aos-delay="700"
                        >
                            <Link
                                v-if="canRegister"
                                :href="route('register')"
                                class="px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium inline-flex items-center"
                            >
                                Start Your Application
                                <svg
                                    class="w-5 h-5 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    ></path>
                                </svg>
                            </Link>
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
                                        :src="asset('img/cmuadmin.jpg')"
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
                                        :src="asset('img/main_gate.jpg')"
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

            <!-- Footer -->
            <footer class="bg-green-800 text-white py-4 text-center">
                <p>
                    Software Development Department 2025. All Rights Reserved.
                </p>
            </footer>
        </div>
    </GuestLayout>
</template>

<style>
/* Global styles to prevent horizontal scroll */
html,
body {
    max-width: 100vw;
    overflow-x: hidden;
}

/* Section styles */
section {
    scroll-margin-top: 5rem;
    width: 100%;
}

/* Optimize SVG rendering */
svg {
    shape-rendering: geometricPrecision;
}

/* Custom transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Smooth scroll behavior */
html {
    scroll-behavior: smooth;
}

/* Mobile menu transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition: all 0.3s ease-out;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
