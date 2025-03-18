<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import TextInput from "./TextInput.vue";

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
    displayFormat: {
        type: [String, Function],
        default: null,
    },
    valueKey: {
        type: String,
        default: null,
    },
    optionsHeight: {
        type: String,
        default: "15rem",
    },
    searchable: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(["update:modelValue", "select"]);

const isOpen = ref(false);
const search = ref("");
const selectedOption = ref(null);
const searchInputRef = ref(null);

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
        return props.displayFormat.replace(/\{([^}]+)\}/g, (_, key) => {
            return key.split(".").reduce((obj, k) => obj?.[k], option) ?? "";
        });
    }

    return typeof option === "object" ? JSON.stringify(option) : String(option);
};

const getValue = (option) => {
    return props.valueKey ? option?.[props.valueKey] : option;
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

// Handle click outside
const selectRef = ref(null);
const handleClickOutside = (event) => {
    if (!selectRef.value.contains(event.target)) {
        isOpen.value = false;
        search.value = "";
    }
};

// Watch for modelValue changes from parent
watch(
    () => props.modelValue,
    (newValue) => {
        selectedOption.value = props.options.find(
            (option) => getValue(option) === newValue
        ) ?? null;
    },
    { immediate: true }
);

// Open dropdown and auto-focus search input
const toggleDropdown = async () => {
    isOpen.value = !isOpen.value;

    if (isOpen.value && props.searchable) {
        await nextTick(); // Wait for DOM updates
        searchInputRef.value?.focus();
    }
};

onMounted(() => {
    document.addEventListener("pointerdown", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("pointerdown", handleClickOutside);
});
</script>

<template>
    <div ref="selectRef" class="relative">
        <!-- Main input field -->
        <div
            @click="toggleDropdown"
            tabindex="0"
            class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full cursor-pointer bg-white flex items-center justify-between transition-all duration-200 p-2"
            :class="{ 'ring-2 ring-indigo-500 border-indigo-500': isOpen }"
        >
            <span v-if="selectedOption" class="text-gray-900 truncate">
                {{ displayValue }}
            </span>
            <span v-else class="text-gray-500">
                {{ placeholder }}
            </span>
            <svg
                class="w-5 h-5 text-gray-400 flex-shrink-0 ml-2"
                :class="{ 'rotate-180': isOpen }"
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
            class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
            style="
                top: 100%;
                left: 0;
                right: 0;
                max-height: v-bind(optionsHeight);
                overflow-y: auto;
            "
        >
            <!-- Search input -->
            <div v-if="searchable" class="p-2 border-b">
                <TextInput
                    v-model="search"
                    ref="searchInputRef"
                    placeholder="Search..."
                    @click.stop
                    class="w-full"
                />
            </div>

            <!-- Options list -->
            <div :style="{ maxHeight: optionsHeight }" class="overflow-y-auto">
                <template v-if="filteredOptions.length">
                    <div
                        v-for="(option, index) in filteredOptions"
                        :key="index"
                        @click="selectOption(option)"
                        class="px-4 py-2 cursor-pointer hover:bg-indigo-50 text-sm"
                        :class="{
                            'bg-indigo-50 text-indigo-700':
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
