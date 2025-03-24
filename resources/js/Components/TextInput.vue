<script setup>
import { onMounted, ref, nextTick, computed, watch } from "vue";

const model = defineModel({
    type: [String, Number],
    required: true,
});

const props = defineProps({
    isCurrency: {
        type: Boolean,
        default: false,
    },
    currencySign: {
        type: String,
        default: "₱",
    },
});

const input = ref(null);
const displayValue = ref("");

// Format number with commas
const formatNumber = (val) => {
    if (!val && val !== 0) return "";

    // Convert to string and remove non-numeric characters except decimal point
    const numericValue = String(val).replace(/[^\d.]/g, "");

    // Split by decimal point
    const parts = numericValue.split(".");

    // Format the integer part with commas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Return formatted number
    return parts.join(".");
};

// Initialize the display value
watch(
    () => model.value,
    (newVal) => {
        if (props.isCurrency && newVal !== undefined) {
            displayValue.value = formatNumber(newVal);
        }
    },
    { immediate: true },
);

// Handle input changes
const handleInput = (event) => {
    if (props.isCurrency) {
        // Get cursor position before update
        const cursorPosition = event.target.selectionStart;

        // Get input value and remove currency formatting
        const rawValue = event.target.value.replace(/[^\d.]/g, "");

        // Update the model with raw numeric value
        model.value = rawValue ? parseFloat(rawValue) : "";

        // Update display value with formatting
        displayValue.value = formatNumber(rawValue);

        // Calculate new cursor position (accounting for added commas)
        nextTick(() => {
            // Count commas before cursor position in the new formatted value
            const valueBeforeCursor = displayValue.value.substring(
                0,
                cursorPosition,
            );
            const commasBeforeCursor = (valueBeforeCursor.match(/,/g) || [])
                .length;

            // Original cursor position + added commas
            const newPosition = cursorPosition + commasBeforeCursor;

            // Set cursor position
            event.target.setSelectionRange(newPosition, newPosition);
        });
    } else {
        model.value = event.target.value;
    }
};

// Prevent typing alphabets in currency mode
const handleKeyDown = (event) => {
    if (!props.isCurrency) return;

    // Allow: backspace, delete, tab, escape, enter, decimal point, navigation keys
    const allowedKeys = [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        ".",
        ",",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
        "PageUp",
        "PageDown",
    ];

    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (
        (event.ctrlKey &&
            (event.key === "a" ||
                event.key === "c" ||
                event.key === "v" ||
                event.key === "x")) ||
        allowedKeys.includes(event.key)
    ) {
        return;
    }

    // Allow only numbers
    if (!/^\d$/.test(event.key)) {
        event.preventDefault();
    }
};

// Computed property for styling
const inputClass = computed(() => {
    const baseClasses =
        "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full";
    return props.isCurrency ? `${baseClasses} pl-7` : baseClasses;
});

// Computed property for placeholder with currency sign
const placeholder = computed(() => {
    return props.isCurrency ? `0.00` : "";
});

onMounted(async () => {
    await nextTick(); // Wait for the DOM update
    if (input.value?.hasAttribute("autofocus")) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <div class="relative border-none" :class="{ 'currency-input': isCurrency }">
        <span
            v-if="isCurrency"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
        >
            {{ currencySign }}
        </span>
        <input
            :class="inputClass"
            :value="isCurrency ? displayValue : model"
            @input="handleInput"
            @keydown="handleKeyDown"
            :placeholder="placeholder"
            ref="input"
            v-bind="$attrs"
        />
    </div>
</template>

<style scoped>
.currency-input input {
    padding-left: 1.75rem;
}
.relative {
    position: relative;
    display: block;
}
</style>
