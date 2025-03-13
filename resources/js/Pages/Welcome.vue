<script setup>
import { Head, Link } from "@inertiajs/vue3";
import { ref } from "vue";

// Add this function to handle asset URLs
const asset = (path) => {
    return `/${path}`;
};

// Add reactive ref for mobile menu
const isMobileMenuOpen = ref(false);

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
        <title>Welcome</title>
    </Head>

    <div class="min-h-screen bg-white">
        <!-- Navigation -->
        <header class="fixed w-full bg-white shadow-md z-50">
            <nav class="container mx-auto px-6 py-3">
                <div class="flex justify-between items-center">
                    <a href="#" class="flex items-center space-x-3">
                        <img
                            :src="asset('img/cmulogo.png')"
                            alt="CMU Logo"
                            class="w-12 h-12"
                        />
                        <span
                            class="font-semibold text-green-800 text-base sm:text-xl"
                        >
                            Central Mindanao University
                        </span>
                    </a>

                    <!-- Hamburger Menu Button -->
                    <button
                        @click="isMobileMenuOpen = !isMobileMenuOpen"
                        class="lg:hidden"
                    >
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
                    :class="{
                        hidden: !isMobileMenuOpen,
                        block: isMobileMenuOpen,
                    }"
                    class="lg:hidden mt-4"
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

        <!-- Hero Section -->
        <section class="h-screen flex items-center justify-center px-6">
            <div
                class="container mx-auto flex flex-col lg:flex-row items-center justify-center"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-mirror="true"
            >
                <div class="w-full text-center">
                    <p
                        class="text-xl text-green-800 mb-4 font-bold"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        WELCOME TO
                    </p>
                    <h1
                        class="text-4xl lg:text-6xl font-bold text-green-800 mb-4"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        Office of Human Resource Management
                    </h1>
                    <h2
                        class="text-3xl lg:text-4xl text-yellow-500 font-bold"
                        data-aos="fade-up"
                        data-aos-delay="600"
                    >
                        Job Listing Application
                    </h2>
                </div>
            </div>
        </section>

        <!-- Mission and Vision Section -->
        <section
            id="about"
            class="min-h-screen py-20 bg-gray-50 flex items-center"
        >
            <div class="container mx-auto px-6">
                <div class="text-center mb-16" data-aos="fade-up">
                    <p class="text-xl text-green-800 mb-2">DEPARTMENT'S</p>
                    <h2 class="text-4xl font-bold text-green-800">
                        MISSION AND VISION
                    </h2>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
                    <div data-aos="fade-right">
                        <img
                            :src="asset('img/cmuadmin.png')"
                            alt="CMU Admin Building"
                            class="w-full h-80 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div
                        class="flex flex-col justify-center"
                        data-aos="fade-left"

                    >
                        <h3 class="text-3xl font-bold text-green-800 mb-4">
                            MISSION
                        </h3>
                        <p class="text-gray-700 leading-relaxed">
                            To advance the frontier of knowledge through
                            internationalization of education and equitable
                            access to quality instruction, research, extension
                            and production for economic prosperity, moral
                            integrity, social and cultural sensitivity and
                            environmental consciousness.
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div
                        class="flex flex-col justify-center"
                        data-aos="fade-right"

                    >
                        <h3 class="text-3xl font-bold text-green-800 mb-4">
                            VISION
                        </h3>
                        <p class="text-gray-700 leading-relaxed">
                            A leading ASEAN university actively committed to the
                            total development of people for a globally
                            sustainable environment and a humane society.
                        </p>
                    </div>
                    <div data-aos="fade-left">
                        <img
                            :src="asset('img/main_gate.png')"
                            alt="CMU Main Gate"
                            class="w-full h-80 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-green-800 text-white py-4 text-center">
            <p>© Software Development Department 2024. All Rights Reserved.</p>
        </footer>
    </div>
</template>

<style scoped>
/* Remove animation-related styles */
/* Keep only the scroll margin for sections */
section {
    scroll-margin-top: 5rem;
}
</style>
