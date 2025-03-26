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
const dropdownStyles = ref({});
const selectRef = ref(null);
const dropdownRef = ref(null); // For detecting clicks inside dropdown

/**
 * 1) Create a special "All" option.
 *    If `valueKey` is used, set it to "".
 *    Otherwise, store the entire option as "".
 */
const computedOptions = computed(() => {
  const allOption = props.valueKey
    ? { [props.valueKey]: "", isAll: true }
    : { value: "", isAll: true };
  return [allOption, ...props.options];
});

/**
 * 2) Filter options based on search input
 */
const filteredOptions = computed(() => {
  if (!search.value || !props.searchable) return computedOptions.value;

  const searchTerm = search.value.toLowerCase();
  return computedOptions.value.filter((option) => {
    const displayText = getDisplayText(option).toLowerCase();
    return displayText.includes(searchTerm);
  });
});

/**
 * 3) Return display text, or "All" if it's the special option
 */
 const getDisplayText = (option) => {
  if (!option) return "";
  // Use the placeholder as the display text for the special option.
  if (option.isAll) return props.placeholder;

  if (props.displayFormat) {
    if (typeof props.displayFormat === "function") {
      return props.displayFormat(option);
    }
    return props.displayFormat.replace(/\{([^}]+)\}/g, (_, key) =>
      key.split(".").reduce((obj, k) => obj?.[k], option) ?? ""
    );
  }
  return typeof option === "object" ? JSON.stringify(option) : String(option);
};


/**
 * 4) Get the value from an option or "All" if it's the special one
 */
const getValue = (option) => {
  if (!option) return "";
  if (option.isAll) return ""; // "All" emits ""
  return props.valueKey ? option[props.valueKey] : option;
};

/**
 * 5) Handle selecting an option
 */
const selectOption = (option) => {
  selectedOption.value = option;
  emit("update:modelValue", getValue(option));
  emit("select", option);
  isOpen.value = false;
  search.value = "";
};

/**
 * 6) Computed display value
 */
const displayValue = computed(() => {
  return selectedOption.value ? getDisplayText(selectedOption.value) : "";
});

/**
 * 7) Update dropdown position
 */
const updateDropdownPosition = () => {
  if (selectRef.value) {
    const rect = selectRef.value.getBoundingClientRect();
    dropdownStyles.value = {
      position: "absolute",
      top: `${rect.bottom + window.scrollY}px`,
      left: `${rect.left + window.scrollX}px`,
      width: `${rect.width}px`,
    };
  }
};

/**
 * 8) Toggle dropdown open/close, focus search if open
 */
const toggleDropdown = async () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && props.searchable) {
    await nextTick();
    searchInputRef.value?.focus();
    updateDropdownPosition();
  }
};

/**
 * 9) Close dropdown if clicking outside select or dropdown
 */
const handleClickOutside = (event) => {
  if (
    selectRef.value &&
    !selectRef.value.contains(event.target) &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target)
  ) {
    isOpen.value = false;
    search.value = "";
  }
};

/**
 * 10) Watch for parent changes to modelValue
 *     Convert both sides to string to ensure type consistency
 */
watch(
  () => props.modelValue,
  (newValue) => {
    selectedOption.value =
      computedOptions.value.find(
        (option) => String(getValue(option)) === String(newValue)
      ) ?? null;
  },
  { immediate: true }
);

/**
 * 11) Lifecycle: mount/unmount
 */
onMounted(() => {
  document.addEventListener("pointerdown", handleClickOutside);
  window.addEventListener("resize", updateDropdownPosition);
  window.addEventListener("scroll", updateDropdownPosition, true);
});

onUnmounted(() => {
  document.removeEventListener("pointerdown", handleClickOutside);
  window.removeEventListener("resize", updateDropdownPosition);
  window.removeEventListener("scroll", updateDropdownPosition, true);
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

    <!-- Teleport dropdown to avoid being cut off -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="dropdownRef"
        :style="dropdownStyles"
        class="absolute z-50 border bg-white border-gray-300 rounded-md shadow-lg"
      >
        <!-- Search input -->
        <div v-if="searchable" class="p-2 border-b">
          <TextInput
            v-model="search"
            ref="searchInputRef"
            placeholder="Search..."
            class="w-full"
          />
        </div>

        <!-- Options list -->
        <div class="overflow-y-auto" :style="{ maxHeight: props.optionsHeight }">
          <template v-if="filteredOptions.length">
            <div
              v-for="(option, index) in filteredOptions"
              :key="index"
              @click="selectOption(option)"
              class="px-4 py-2 cursor-pointer hover:bg-indigo-50 text-sm"
              :class="{
                'bg-indigo-50 text-indigo-700': selectedOption &&
                  String(getValue(option)) === String(getValue(selectedOption))
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
    </Teleport>
  </div>
</template>

<style scoped>
.max-h-60 {
  max-height: 15rem;
}
</style>
