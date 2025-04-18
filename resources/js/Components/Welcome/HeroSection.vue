<script setup>
import { Link } from '@inertiajs/vue3';

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
</template>