<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showBadge = ref(false);
const position = ref('');
const jobListingId = ref('');
const showTooltip = ref(false);

function updateBadge() {
    // Get the array from localStorage
    let jobs = [];
    try {
        jobs = JSON.parse(localStorage.getItem('job_listing_id')) || [];
    } catch (e) {
        jobs = [];
    }
    if (jobs.length > 0) {
        const last = jobs[jobs.length - 1];
        showBadge.value = true;
        position.value = last.position;
        jobListingId.value = last.job_listing_id;
    } else {
        showBadge.value = false;
        position.value = '';
        jobListingId.value = '';
    }
}

function handleClick() {
    showTooltip.value = !showTooltip.value;
}

function handleClickOutside(event) {
    if (!event.target.closest('.badge-tooltip-parent')) {
        showTooltip.value = false;
    }
}

onMounted(() => {
    updateBadge();
    window.addEventListener('storage', updateBadge);
    window.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
    window.removeEventListener('storage', updateBadge);
    window.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <span
        v-if="showBadge"
        class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 fixed top-20 right-20 z-50 shadow-lg badge-tooltip-parent cursor-pointer"
        @click.stop="handleClick"
    >
        {{ position }}
        <span
            v-if="showTooltip"
            class="absolute mt-2 right-0 bg-white border border-gray-300 rounded shadow-lg px-4 py-2 text-xs text-gray-800 whitespace-nowrap"
            style="top: 100%; min-width: 180px;"
        >
            <div class="font-bold text-green-700 mb-2 text-sm">Selected Position</div>
            <div><b>Position:</b> {{ position }}</div>
        </span>
    </span>
</template>
