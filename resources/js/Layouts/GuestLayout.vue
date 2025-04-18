<script setup>
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
    <div class="flex flex-col min-h-screen">
        <!-- Navigation -->
        <header class="fixed z-50 w-full bg-white shadow-md">
            <nav class="container px-4 py-3 mx-auto sm:px-6 lg:px-8">
                <div class="flex justify-between items-center">
                    <Link href="welcome" class="flex items-center space-x-3">
                        <img :src="asset('img/cmulogo.png')" alt="CMU Logo" class="w-10 h-10 sm:w-12 sm:h-12 critical-image">
                        <span class="text-sm font-semibold text-green-800 sm:text-base lg:text-xl">
                            Central Mindanao University
                        </span>
                    </Link>

                    <!-- Hamburger Menu Button -->
                    <button @click="toggleMobileMenu" class="lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <!-- Desktop Menu -->
                    <div class="hidden items-center space-x-8 lg:flex">
                        <a href="#home" class="text-green-800 hover:text-green-600">Home</a>
                        <a href="#how-to-apply" class="text-green-800 hover:text-green-600">Apply</a>
                        <a href="#about" class="text-green-800 hover:text-green-600">About</a>
                        <div class="flex space-x-4">
                            <Link v-if="props.canLogin" :href="route('login')" class="px-6 py-2 text-green-800 rounded-md border-2 border-green-800 transition-colors hover:bg-green-800 hover:text-white">
                                Log in
                            </Link>
                            <Link v-if="props.canRegister" :href="route('register')" class="px-6 py-2 text-white bg-green-800 rounded-md border-2 border-green-800 transition-colors hover:bg-green-900 hover:text-white">
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
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div class="flex flex-col mt-8 space-y-4">
                            <a href="#home" class="text-lg text-green-800 hover:text-green-600">Home</a>
                            <a href="#how-to-apply" class="text-lg text-green-800 hover:text-green-600">How to Apply</a>
                            <a href="#about" class="text-lg text-green-800 hover:text-green-600">About</a>
                            <div class="flex flex-col mt-4 space-y-2">
                                <Link v-if="props.canLogin" :href="route('login')" class="px-6 py-2 text-center text-green-800 rounded-md border-2 border-green-800 transition-colors hover:bg-green-800 hover:text-white">
                                    Log in
                                </Link>
                                <Link v-if="props.canRegister" :href="route('register')" class="px-6 py-2 text-center text-white bg-green-800 rounded-md border-2 border-green-800 transition-colors hover:text-white hover:bg-green-700">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        <!-- Main Content -->
        <div class="flex-grow pt-16">
            <slot />
        </div>

        <footer class="px-4 py-4 mt-auto bg-gray-100 border-t">
            <div
                class="container flex flex-col justify-between items-center mx-auto sm:flex-row"
            >
                <div class="text-sm text-center text-gray-600 sm:text-left">
                    <span class="hidden font-semibold sm:inline">Version</span>
                    <span class="sm:ml-2">1.2.0</span>
                </div>

                <div class="text-sm text-center sm:text-right">
                    <span class="font-semibold">
                        Copyright 2025
                        <a
                            href="#"
                            class="ml-1 text-green-700 transition-colors hover:text-green-500"
                        >
                            Software Development Department
                        </a>
                    </span>
                    <span class="block mt-1 sm:inline sm:mt-0 sm:ml-2">
                        All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    </div>
</template>
