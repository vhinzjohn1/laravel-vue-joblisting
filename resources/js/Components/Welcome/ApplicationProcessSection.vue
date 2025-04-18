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
</template>