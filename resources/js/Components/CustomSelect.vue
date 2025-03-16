<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
    options: {
        type: Array,
        required: true,
    },
    modelValue: {
        type: [String, Number],
        default: "",
    },
    placeholder: {
        type: String,
        default: "Select an option",
    },
    // New prop for custom display format
    displayFormat: {
        type: [String, Function],
        default: null,
    },
    // Optional value key - if not provided, use the entire option as value
    valueKey: {
        type: String,
        default: null,
    },
    // Optional max height for options dropdown
    optionsHeight: {
        type: String,
        default: "15rem",
    },
    // Optional prop to disable search
    searchable: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(["update:modelValue", "select"]);

const isOpen = ref(false);
const search = ref("");
const selectedOption = ref(null);

const filteredOptions = computed(() => {
    if (!search.value || !props.searchable) return props.options;

    const searchTerm = search.value.toLowerCase();
    return props.options.filter((option) => {
        const displayText = getDisplayText(option).toLowerCase();
        return displayText.includes(searchTerm);
    });
});

const getDisplayText = (option) => {
    if (!option) return "";

    if (props.displayFormat) {
        if (typeof props.displayFormat === "function") {
            return props.displayFormat(option);
        }
        // Handle string format with template literals
        return props.displayFormat.replace(/\{([^}]+)\}/g, (_, key) => {
            return (
                key.split(".").reduce((obj, key) => obj?.[key], option) ?? ""
            );
        });
    }

    // Default display if no format specified
    return typeof option === "object" ? JSON.stringify(option) : String(option);
};

const getValue = (option) => {
    if (!option) return "";
    return props.valueKey ? option[props.valueKey] : option;
};

const selectOption = (option) => {
    selectedOption.value = option;
    emit("update:modelValue", getValue(option));
    emit("select", option);
    isOpen.value = false;
    search.value = "";
};

const displayValue = computed(() => {
    return selectedOption.value ? getDisplayText(selectedOption.value) : "";
});

// Close dropdown when clicking outside
const selectRef = ref(null);
const handleClickOutside = (event) => {
    if (selectRef.value && !selectRef.value.contains(event.target)) {
        isOpen.value = false;
        search.value = "";
    }
};

// Watch for modelValue changes from parent
watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue) {
            selectedOption.value = props.options.find(
                (option) => getValue(option) === newValue,
            );
        } else {
            selectedOption.value = null;
        }
    },
    { immediate: true },
);

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
    <div ref="selectRef" class="relative">
        <!-- Main input field -->
        <div
            @click="isOpen = !isOpen"
            tabindex="0"
            :class="[
                'w-full px-4 py-2 border rounded-lg cursor-pointer bg-white flex items-center justify-between transition-all duration-200 focus:outline-none',
                isOpen ? 'border-blue-500 shadow-sm' : 'border-gray-300',
            ]"
        >
            <span v-if="selectedOption" class="text-gray-900 truncate">
                {{ displayValue }}
            </span>
            <span v-else class="text-gray-500">
                {{ placeholder }}
            </span>
            <svg
                class="w-5 h-5 text-gray-400 flex-shrink-0"
                :class="{ 'transform rotate-180': isOpen }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                />
            </svg>
        </div>

        <!-- Dropdown -->
        <div
            v-if="isOpen"
            class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
            style="
                top: 100%;
                left: 0;
                right: 0;
                max-height: none;
                overflow-y: auto;
            "
        >
            <!-- Search input -->
            <div v-if="searchable" class="p-2 border-b">
                <input
                    type="text"
                    v-model="search"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search..."
                    @click.stop
                />
            </div>

            <!-- Options list -->
            <div class="overflow-y-auto">
                <template v-if="filteredOptions.length">
                    <div
                        v-for="(option, index) in filteredOptions"
                        :key="index"
                        @click="selectOption(option)"
                        class="px-4 py-2 cursor-pointer hover:bg-blue-50 text-sm"
                        :class="{
                            'bg-blue-50':
                                selectedOption &&
                                getValue(option) === getValue(selectedOption),
                        }"
                    >
                        {{ getDisplayText(option) }}
                    </div>
                </template>
                <div v-else class="px-4 py-2 text-sm text-gray-500">
                    No results found
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.max-h-60 {
    max-height: 15rem;
}
</style>
