<script setup>
defineProps({
    routeName: {
        type: String,
        required: false,
        default: null,
    },
    label: String,
});
</script>

<template>
    <div>
        <Link
            v-if="routeName"
            :href="route(routeName)"
            class="text-green-800 hover:text-green-500 transition-colors"
        >
            {{ label }}
        </Link>
        <span v-else class="text-green-800 cursor-pointer underline">
            {{ label }}
        </span>
    </div>
</template>
