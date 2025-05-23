<template>
    <div class="w-full border shadow-md">
        <!-- Collapsible Header -->
        <div
            @click="isOpen = !isOpen"
            class="bg-white p-4 rounded-lg shadow-md cursor-pointer flex justify-between items-center"
            :class="{ 'rounded-b-none': isOpen }"
        >
            <slot name="header">
            </slot>
            <div class="transform transition-transform duration-200" :class="{ 'rotate-180': isOpen }">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>

        <!-- Collapsible Content -->
        <div
            v-show="isOpen"
            class="bg-white rounded-b-lg shadow-md overflow-hidden transition-all duration-200"
        >
            <div class="p-4">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Collapsible Section'
    },
    initiallyOpen: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        default: ''
    },
    batchCode: {
        type: String,
        default: ''
    }
});

const isOpen = ref(props.initiallyOpen);
</script>

<style scoped>
.transform {
    transition: transform 0.2s ease-in-out;
}
</style>
