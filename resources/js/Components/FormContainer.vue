<script setup>
</script>
<template>
    <div class="flex justify-center items-center w-full">
        <div
            class="w-full bg-white rounded-lg border border-gray-200 shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
            <div class="p-8">
                <slot />
            </div>
        </div>
    </div>
</template>
