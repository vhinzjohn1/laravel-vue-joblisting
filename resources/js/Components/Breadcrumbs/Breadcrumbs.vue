<template>
    <nav class="flex mb-4" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li
                v-for="(item, index) in items"
                :key="index"
                class="inline-flex items-center"
            >
                <!-- Separator for all items except first -->
                <svg
                    v-if="index > 0"
                    class="w-3 h-3 mx-1 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                    />
                </svg>

                <!-- Link for non-active items -->
                <Link
                    v-if="!item.active"
                    :href="item.href"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                    <span>{{ item.name }}</span>
                </Link>

                <!-- Span for active item -->
                <span v-else class="text-sm font-medium text-gray-500">
                    {{ item.name }}
                </span>
            </li>
        </ol>
    </nav>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";

defineProps({
    items: {
        type: Array,
        required: true,
    },
});
</script>
