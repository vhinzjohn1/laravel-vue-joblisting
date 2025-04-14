<script setup>
import { computed, ref, nextTick, watch, onMounted } from "vue";

const model = defineModel({
    default: null,
    required: false,
});

const props = defineProps({
    icon: String,
    label: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        default: "text",
    },
    placeholder: {
        type: String,
    },
    required: {
        type: Boolean,
        default: false,
    },
    autocomplete: {
        type: String,
        default: "off",
    },
    errors: Object,
    id: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    autofocus: {
        type: Boolean,
        default: false,
    },
    isCurrency: {
        type: Boolean,
        default: false,
    },
    currencySign: {
        type: String,
        default: "₱",
    },
    readOnly: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    value: {
        type: [String, Number],
        default: null,
    },
    
});

const input = ref(null);
const displayValue = ref("");

// Format number with commas for currency
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

// Initialize the display value for currency
watch(
    () => model.value,
    (newVal) => {
        if (props.isCurrency && newVal !== undefined) {
            displayValue.value = formatNumber(newVal);
        }
    },
    { immediate: true },
);

// Handle input changes for currency
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

// Format the value for the input when type is date or datetime-local
const inputValue = computed({
    get() {
        if (props.isCurrency) {
            return displayValue.value;
        }

        if (
            (props.type === "date" || props.type === "datetime-local") &&
            model.value
        ) {
            // If it's already a valid date string in correct format, return as is
            if (typeof model.value === "string") {
                if (
                    props.type === "date" &&
                    /^\d{4}-\d{2}-\d{2}$/.test(model.value)
                ) {
                    return model.value;
                }
                if (
                    props.type === "datetime-local" &&
                    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(model.value)
                ) {
                    // Remove seconds if present to match the input's expected format
                    return model.value.split(":").slice(0, 2).join(":");
                }
            }

            // Convert to date object if it's not already
            const date =
                model.value instanceof Date
                    ? model.value
                    : new Date(model.value);

            // Check if date is valid before formatting
            if (!isNaN(date.getTime())) {
                if (props.type === "date") {
                    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
                } else if (props.type === "datetime-local") {
                    // Format as YYYY-MM-DDTHH:MM (without seconds)
                    return date.toISOString().slice(0, 16);
                }
            }
        }
        return model.value;
    },
    set(value) {
        model.value = value;
    },
});

// After mounting, focus if autofocus is true
onMounted(() => {
    if (props.autofocus && input.value) {
        input.value.focus();
    }
});
</script>

<template>
    <div class="w-full mb-4">
        <label :for="id" class="block text-sm font-medium text-gray-700 mb-1">{{
            label
        }}</label>
        <div class="relative">
            <span
                v-if="isCurrency"
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none z-10"
            >
                {{ currencySign }}
            </span>
            <input
                v-model="inputValue"
                :id="id"
                :name="name"
                ref="input"
                :type="isCurrency ? 'text' : type"
                :autocomplete="autocomplete"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="readOnly"
                @input="isCurrency && handleInput($event)"
                @keydown="isCurrency && handleKeyDown($event)"
                :class="[
                    'w-full p-2 text-sm rounded-lg border focus:outline-none focus:ring-2',
                    errors
                        ? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-green-700',
                    isCurrency ? 'pl-7 pr-10' : 'pr-10',
                ]"
                :required="required"
            />
            <div
                v-if="icon"
                class="absolute inset-y-0 right-3 flex items-center text-gray-500 pointer-events-none"
            >
                <i :class="icon"></i>
            </div>
        </div>
        <p v-if="errors" class="text-red-500 text-xs mt-1">{{ errors }}</p>
    </div>
</template>
