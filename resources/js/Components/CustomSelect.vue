<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";

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
  required: {
    type: Boolean,
    default: false
  }
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
 * Create a filtered list of options
 */
const computedOptions = computed(() => {
  return props.options;
});

/**
 * Filter options based on search input
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
 * Return display text for an option
 */
 const getDisplayText = (option) => {
  if (!option) return "";

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
 * Get the value from an option
 */
const getValue = (option) => {
  if (!option) return "";
  return props.valueKey ? option[props.valueKey] : option;
};

/**
 * Handle selecting an option
 */
const selectOption = (option) => {
  selectedOption.value = option;
  emit("update:modelValue", getValue(option));
  emit("select", option);
  isOpen.value = false;
  search.value = "";
};

/**
 * Computed display value
 */
const displayValue = computed(() => {
  return selectedOption.value ? getDisplayText(selectedOption.value) : "";
});

/**
 * Toggle dropdown open/close, focus search if open
 */
const toggleDropdown = async (event) => {
  // Prevent the click from propagating to parent elements
  event?.preventDefault();
  event?.stopPropagation();

  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    await nextTick();
    if (props.searchable && searchInputRef.value) {
      searchInputRef.value.focus();
    }
    updateDropdownPosition();
  }
};

/**
 * Update dropdown position
 */
const updateDropdownPosition = () => {
  if (selectRef.value) {
    const rect = selectRef.value.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const bottomSpace = windowHeight - rect.bottom;
    const topSpace = rect.top;

    // Calculate available space above and below
    const spaceBelow = bottomSpace;
    const spaceAbove = topSpace;

    // Determine if we should open upward or downward
    const openUpward = spaceBelow < 200 && spaceAbove > 200;

    // Calculate the maximum height based on available space
    const maxHeight = openUpward
      ? Math.min(spaceAbove - 10, 300)
      : Math.min(spaceBelow - 10, 300);

    if (openUpward) {
      dropdownStyles.value = {
        position: "fixed",
        bottom: `${windowHeight - rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        maxHeight: `${maxHeight}px`,
      };
    } else {
      dropdownStyles.value = {
        position: "fixed",
        top: `${rect.bottom}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        maxHeight: `${maxHeight}px`,
      };
    }
  }
};

/**
 * Close dropdown if clicking outside select or dropdown
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

// Add new method to prevent scrolling
const preventScroll = (event) => {
  event?.preventDefault();
  event?.stopPropagation();
};

/**
 * Watch for parent changes to modelValue
 */
watch(
  () => props.modelValue,
  (newValue) => {
    // Find the option that matches the modelValue
    const option = props.options.find(opt =>
      String(getValue(opt)) === String(newValue)
    );

    if (option) {
      selectedOption.value = option;
    } else {
      selectedOption.value = null;
    }
  },
  { immediate: true }
);

/**
 * Watch for options changes and update selected option if needed
 */
watch(
  () => props.options,
  (newOptions) => {
    if (props.modelValue) {
      const option = newOptions.find(opt =>
        String(getValue(opt)) === String(props.modelValue)
      );

      if (option) {
        selectedOption.value = option;
      }
    }
  }
);

/**
 * Lifecycle: mount/unmount
 */
onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
  window.addEventListener("resize", updateDropdownPosition);
  window.addEventListener("scroll", updateDropdownPosition, true);
});

onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside);
  window.removeEventListener("resize", updateDropdownPosition);
  window.removeEventListener("scroll", updateDropdownPosition, true);
});
</script>

<template>
  <div ref="selectRef" class="relative w-full">
    <!-- Main input field -->
    <div
      @click="toggleDropdown"
      @mousedown.prevent
      tabindex="0"
      class="w-full p-2 text-sm rounded-lg border cursor-pointer bg-white flex items-center justify-between transition-all duration-200"
      :class="[
        isOpen ? 'border-green-700 ring-2 ring-green-700' : 'border-gray-300 focus:ring-green-700',
      ]"
    >
      <span v-if="selectedOption" class="text-gray-900 truncate">
        {{ displayValue }}
      </span>
      <span
        v-else
        class="text-gray-500 truncate overflow-hidden whitespace-nowrap w-full"
      >
        {{ placeholder }}
      </span>
      <i class="fas fa-chevron-down text-gray-400"></i>
    </div>

    <!-- Hidden real select for form validation -->
    <select
      :required="required"
      :value="modelValue"
      class="opacity-0 h-0 w-0 absolute overflow-hidden"
    >
      <option
        v-for="option in options"
        :key="getValue(option)"
        :value="getValue(option)"
        :selected="String(modelValue) === String(getValue(option))"
      ></option>
    </select>

    <!-- Dropdown -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="dropdownRef"
        :style="dropdownStyles"
        class="fixed z-50 border bg-white border-gray-300 rounded-md shadow-lg overflow-hidden"
        @mousedown.prevent
        @click.prevent
      >
        <!-- Search input -->
        <div v-if="searchable" class="p-2 border-b">
          <input
            v-model="search"
            ref="searchInputRef"
            placeholder="Search..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            type="text"
            @mousedown.prevent
            @click.prevent
          />
        </div>

        <!-- Options list -->
        <div class="overflow-y-auto" :style="{ maxHeight: '300px' }">
          <template v-if="filteredOptions.length">
            <div
              v-for="(option, index) in filteredOptions"
              :key="index"
              @click="selectOption(option)"
              @mousedown.prevent
              class="px-4 py-2 cursor-pointer hover:bg-green-50 text-sm"
              :class="{
                'bg-green-50 text-green-700': selectedOption &&
                  String(getValue(option)) === String(getValue(selectedOption))
              }"
            >
              {{ getDisplayText(option) }}
            </div>
          </template>
          <div v-else class="px-4 py-3 text-sm text-gray-500 text-center">
            No options found
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.border-gray-300 {
  border: 1px solid #d1d5db;
}

/* Prevent scrolling when dropdown is open */
:deep(body) {
  &.dropdown-open {
    overflow: hidden;
  }
}
</style>

