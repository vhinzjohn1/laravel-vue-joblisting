<script setup>
import { onMounted, ref, nextTick } from 'vue';

const model = defineModel({
    type: String,
    required: true,
});

const props = defineProps({
    rows: {
        type: [Number, String],
        default: 4
    },
    placeholder: {
        type: String,
        default: ''
    }
});

const textarea = ref(null);

onMounted(async () => {
    await nextTick(); // Wait for the DOM update
    if (textarea.value?.hasAttribute('autofocus')) {
        textarea.value.focus();
    }
});

defineExpose({ focus: () => textarea.value.focus() });
</script>

<template>
    <textarea
        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
        v-model="model"
        ref="textarea"
        :rows="rows"
        :placeholder="placeholder"
    ></textarea>
</template>
