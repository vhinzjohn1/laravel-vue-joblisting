<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { Link } from "@inertiajs/vue3";
import { ref, onMounted, defineProps } from "vue";

const mobileMenuClasses = ref("translate-x-full");
const isSmallScreen = ref(false);

const asset = (path) => {
    return `/${path}`;
};

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const checkScreenSize = () => {
    isSmallScreen.value = window.innerWidth < 640;
    if (!isSmallScreen.value) {
        isMobileMenuOpen.value = false;
        mobileMenuClasses.value = "translate-x-full";
    }
};

onMounted(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
});

const props = defineProps({
    canLogin: {
        type: Boolean,
        default: false
    },
    canRegister: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <!-- Navigation -->
        <header class="fixed w-full bg-white shadow-md z-50">
            <nav class="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div class="flex justify-between items-center">
                    <Link href="welcome" class="flex items-center space-x-3">
                        <img :src="asset('img/cmulogo.png')" alt="CMU Logo" class="w-10 h-10 sm:w-12 sm:h-12 critical-image">
                        <span class="font-semibold text-green-800 text-sm sm:text-base lg:text-xl">
                            Central Mindanao University
                        </span>
                    </Link>

                    <!-- Hamburger Menu Button -->
                    <button @click="toggleMobileMenu" class="lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <!-- Desktop Menu -->
                    <div class="hidden lg:flex items-center space-x-8">
                        <a href="#home" class="text-green-800 hover:text-green-600">Home</a>
                        <a href="#how-to-apply" class="text-green-800 hover:text-green-600">How to Apply</a>
                        <a href="#about" class="text-green-800 hover:text-green-600">About</a>
                        <div class="flex space-x-4">
                            <Link v-if="props.canLogin" :href="route('login')" class="px-6 py-2 border-2 border-green-800 text-green-800 rounded-md hover:bg-green-800 hover:text-white transition-colors">
                                Log in
                            </Link>
                            <Link v-if="props.canRegister" :href="route('register')" class="px-6 py-2 bg-green-800 text-white border-2 border-green-800 rounded-md hover:text-white hover:bg-green-900 transition-colors">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>

                <!-- Mobile Menu Backdrop -->
                <div v-if="isMobileMenuOpen" @click="toggleMobileMenu" class="fixed inset-0 bg-black bg-opacity-30 transition-opacity lg:hidden"></div>

                <!-- Mobile Menu -->
                <div :class="['lg:hidden fixed top-0 right-0 h-full w-52 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50', isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full']">
                    <div class="p-4">
                        <button @click="toggleMobileMenu" class="absolute top-4 right-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div class="mt-8 flex flex-col space-y-4">
                            <a href="#home" class="text-green-800 hover:text-green-600 text-lg">Home</a>
                            <a href="#how-to-apply" class="text-green-800 hover:text-green-600 text-lg">How to Apply</a>
                            <a href="#about" class="text-green-800 hover:text-green-600 text-lg">About</a>
                            <div class="flex flex-col space-y-2 mt-4">
                                <Link v-if="props.canLogin" :href="route('login')" class="px-6 py-2 border-2 border-green-800 text-green-800 rounded-md hover:bg-green-800 hover:text-white transition-colors text-center">
                                    Log in
                                </Link>
                                <Link v-if="props.canRegister" :href="route('register')" class="px-6 py-2 bg-green-800 text-white border-2 border-green-800 rounded-md hover:text-white hover:bg-green-700 transition-colors text-center">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        <!-- Main Content -->
        <div class="pt-16 flex-grow">
            <slot />
        </div>

        <footer class="bg-gray-100 border-t py-4 px-4 mt-auto">
            <div
                class="container mx-auto flex flex-col sm:flex-row items-center justify-between"
            >
                <div class="text-sm text-gray-600 text-center sm:text-left">
                    <span class="font-semibold hidden sm:inline">Version</span>
                    <span class="sm:ml-2">1.2.0</span>
                </div>

                <div class="text-sm text-center sm:text-right">
                    <span class="font-semibold">
                        Copyright 2025
                        <a
                            href="#"
                            class="text-green-700 hover:text-green-500 transition-colors ml-1"
                        >
                            Software Development Department
                        </a>
                    </span>
                    <span class="block sm:inline mt-1 sm:mt-0 sm:ml-2">
                        All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    </div>
</template>
