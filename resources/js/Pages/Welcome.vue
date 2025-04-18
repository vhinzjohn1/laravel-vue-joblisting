<script setup>
import { Head, usePage } from "@inertiajs/vue3";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import HeroSection from "@/Components/Welcome/HeroSection.vue";
import DetailedApplicationSection from "@/Components/Welcome/DetailedApplicationSection.vue";

// Job Listings
const jobListings = usePage().props.jobListings;

// Asset
const asset = (path) => {
    return `/${path}`;
};

defineProps({
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    }
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
            <HeroSection :can-login="canLogin" :can-register="canRegister"/>

            <!-- Detailed Application Steps Section -->
            <DetailedApplicationSection :can-login="canLogin" :can-register="canRegister"/>

            <!-- Job Listings Section -->
            <section id="job-listing" class="py-16 bg-gradient-to-b from-gray-50 to-white lg:py-20">
                <div class="container px-4 mx-auto sm:px-6 lg:px-8">
                    <div class="mb-16 text-center" data-aos="fade-up">
                        <span
                            class="inline-block px-4 py-1 mb-4 text-sm font-semibold text-green-800 bg-green-100 rounded-full">For Applicants</span>
                        <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                            Latest Job Listings
                        </h2>
                        <div class="mx-auto w-24 h-1 bg-green-600 rounded-full"></div>
                    </div>
                    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div
                            v-for="jobListing in jobListings"
                            :key="jobListing.id"
                            data-aos="fade-up"
                            data-aos-delay="{{ $loop->iteration * 100 }}"
                            class="bg-white rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md group">
                            <div class="p-6">
                                <h3 class="mb-3 text-lg font-semibold text-gray-900 transition-colors group-hover:text-green-600">
                                    {{ jobListing.title }}
                                </h3>
                                <p class="mb-4 text-gray-600 line-clamp-2">
                                    {{ jobListing.description }}
                                </p>
                                <div class="flex items-center mb-3 text-sm text-gray-500">
                                    <svg class="mr-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    {{ jobListing.position.position_name ?? 'N/A' }}
                                </div>
                                <div class="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
                                    <span class="text-sm text-gray-500">
                                        Closing: {{ jobListing.closing_date }}
                                    </span>
                                    <a href="{{ route('login') }}" class="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700">
                                        Details
                                        <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="jobListings.length === 0"
                            class="col-span-1 py-12 text-center md:col-span-2 lg:col-span-3">
                            <div class="inline-flex justify-center items-center mb-4 w-16 h-16 bg-gray-100 rounded-full">
                                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                                </svg>
                            </div>
                            <h3 class="mb-1 text-lg font-medium text-gray-900">No Opportunities Found</h3>
                            <p class="text-gray-500">We couldn't find any job listings matching your criteria.</p>
                        </div>
                    </div>
                </div>
            </section>


            <!-- Mission and Vision Section -->
            <section
                id="about"
                class="py-16 bg-gradient-to-b from-gray-50 to-white lg:py-20"
            >
                <div class="container px-4 mx-auto sm:px-6 lg:px-8">
                    <div class="mb-16 text-center" data-aos="fade-up">
                        <span
                            class="inline-block px-4 py-1 mb-4 text-sm font-semibold text-green-800 bg-green-100 rounded-full"
                            >DEPARTMENT'S</span
                        >
                        <h2
                            class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl"
                        >
                            Mission and Vision
                        </h2>
                        <div
                            class="mx-auto w-24 h-1 bg-green-600 rounded-full"
                        ></div>
                    </div>

                    <!-- Mission Card -->
                    <div class="mx-auto mb-12 max-w-6xl lg:mb-20">
                        <div
                            class="overflow-hidden relative bg-white rounded-2xl shadow-xl"
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
                                        class="flex items-center mb-6 text-2xl font-bold text-gray-900 sm:text-3xl"
                                    >
                                        <span class="mr-3 text-green-600"
                                            >01.</span
                                        >
                                        Our Mission
                                    </h3>
                                    <p
                                        class="text-base leading-relaxed text-gray-600 sm:text-lg"
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
                                        class="object-cover w-full h-full"
                                    />
                                    <div
                                        class="absolute inset-0 bg-green-900 bg-opacity-20"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Vision Card -->
                    <div class="mx-auto max-w-6xl">
                        <div
                            class="overflow-hidden relative bg-white rounded-2xl shadow-xl"
                        >
                            <div class="grid grid-cols-1 lg:grid-cols-2">
                                <div
                                    class="relative order-2 h-60 sm:h-72 lg:h-auto lg:order-1"
                                    data-aos="fade-right"
                                    data-aos-duration="1000"
                                >
                                    <img
                                        :src="asset('img/main_gate.jpg')"
                                        alt="CMU Main Gate"
                                        class="object-cover w-full h-full"
                                    />
                                    <div
                                        class="absolute inset-0 bg-green-900 bg-opacity-20"
                                    ></div>
                                </div>
                                <div
                                    class="relative order-1 p-6 sm:p-8 lg:p-12 lg:order-2"
                                    data-aos="fade-left"
                                    data-aos-duration="1000"
                                >
                                    <div
                                        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"
                                    ></div>
                                    <h3
                                        class="flex items-center mb-6 text-2xl font-bold text-gray-900 sm:text-3xl"
                                    >
                                        <span class="mr-3 text-green-600"
                                            >02.</span
                                        >
                                        Our Vision
                                    </h3>
                                    <p
                                        class="text-base leading-relaxed text-gray-600 sm:text-lg"
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
            <footer class="py-4 text-center text-white bg-green-800">
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
