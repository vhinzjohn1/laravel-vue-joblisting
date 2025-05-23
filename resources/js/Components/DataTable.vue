<!-- Instruction to Use -->
<!-- :data - array of objects data-->
<!-- :columns - array of column objects -->
<!-- 2 ways for defining columns -->
<!-- 1. column object should have key and title properties -->
<!-- :columns="[
                { key: 'position_id', title: 'Position ID' },
                { key: 'position_name', title: 'Position Name' },
                { key: 'item_number', title: 'Item Number' },
                { key: 'salary_grade.amount', title: 'Salary Grade' },
                { key: 'id', title: 'ID', hidden: true } // Example of hidden column
            ]" -->
<!-- 2. Defined columns by column key -->
<!-- :columns="['user_id', 'username', 'email', 'role_name']" -->

<!-- :sortable - boolean -->
<!-- :enableRowCheckbox - boolean -->
<!-- :conditionalColumns - object -->
<!-- :rowClick - string - key path to get value from clicked row -->
<!-- :action - string or array - determines which action buttons to show -->
<!-- @edit - edit event -->
<!-- @delete - delete event -->
<!-- @view - view event -->
<!-- @row-click - row click event -->

<template>
    <div class="p-4">
        <!-- Items per page dropdown -->
        <div class="mb-4 flex items-center justify-between">
            <!-- Left: Items per page dropdown -->
            <div>
                <select
                    v-model="currentPageSize"
                    @change="onPageSizeChange"
                    class="appearance-none border rounded px-2 py-1 pr-10 w-20 h-10 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    <option
                        v-for="option in pageSizeOptions"
                        :key="option"
                        :value="option"
                    >
                        {{ option }}
                    </option>
                </select>
            </div>

            <!-- Right: Search Field -->
            <div class="relative">
                <TextInput
                    type="text"
                    :modelValue="searchQuery"
                    @update:modelValue="immediateSearch"
                    placeholder="Search..."
                    icon="fas fa-search"
                    id="table-search"
                    name="table-search"
                />
            </div>
        </div>

        <!-- Error Message -->
        <div
            v-if="errorMessage"
            class="mb-4 text-red-600 text-center font-medium"
        >
            {{ errorMessage }}
        </div>

        <!-- Table Container with fixed height and vertical scrolling -->
        <div v-else class="overflow-x-auto border border-gray-200 rounded-sm" style="max-height: calc(60vh)">
            <!-- Data Table (only rendered if no error) -->
            <table class="min-w-full border-collapse">
                <thead class="bg-gray-100 sticky top-0">
                    <tr>
                        <!-- Checkbox header: select all -->
                        <th
                            v-if="enableRowCheckbox"
                            class="px-4 py-2 border-b border-gray-200 text-center w-10"
                        >
                            <input
                                type="checkbox"
                                :checked="allSelected"
                                @change="toggleSelectAll"
                                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                        </th>
                        <!-- Render specified columns -->
                        <th
                            v-for="col in visibleColumns"
                            :key="col.key"
                            @click="sortable && sortBy(col.key)"
                            class="px-4 py-2 border-b border-gray-200 text-gray-700 font-medium cursor-pointer select-none text-left"
                        >
                            <div class="flex items-center space-x-1">
                                <span>{{ col.title }}</span>
                                <span
                                    v-if="
                                        sortable && currentSortKey === col.key
                                    "
                                >
                                    <!-- ... existing sort indicators ... -->
                                </span>
                            </div>
                        </th>
                        <!-- Actions Column -->
                        <th v-if="showActionsColumn" class="px-4 py-2 border-b border-gray-200 text-gray-700 font-medium text-left">
                            ACTION
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in virtualItems"
                        :key="item.id || index"
                        :style="getItemStyle(startIndex + index)"
                        @click="handleRowClick(item)"
                        :class="[
                            'hover:bg-gray-50',
                            { 'cursor-pointer': props.rowClick }
                        ]"
                        class="hover:bg-gray-50"
                    >
                        <!-- Checkbox cell for each row -->
                        <td
                            v-if="enableRowCheckbox"
                            class="px-4 py-2 border-b border-gray-200 text-center"
                        >
                            <input
                                type="checkbox"
                                v-model="selectedItems"
                                :value="item.id"
                                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                        </td>
                        <!-- Render only specified columns -->
                        <td
                            v-for="col in visibleColumns"
                            :key="col.key"
                            class="px-4 py-2 border-b border-gray-200"
                        >
                            <template v-if="conditionalColumns[col.key]">
                                <span
                                    :class="
                                        getConditionalClass(
                                            col.key,
                                            getNestedValue(item, col.key),
                                        )
                                    "
                                >
                                    {{
                                        col.currency
                                            ? formatCurrency(
                                                  getNestedValue(item, col.key),
                                                  col.currency,
                                              )
                                            : getNestedValue(item, col.key)
                                    }}
                                </span>
                            </template>
                            <template v-else>
                                {{
                                    col.currency
                                        ? formatCurrency(
                                              getNestedValue(item, col.key),
                                              col.currency,
                                          )
                                        : getNestedValue(item, col.key)
                                }}
                            </template>
                        </td>
                        <!-- Actions Column -->
                        <td v-if="showActionsColumn" class="px-4 py-2 border-b border-gray-200">
                            <div class="flex space-x-2">
                                <template v-if="Array.isArray(props.action)">
                                    <button
                                        v-for="actionType in props.action"
                                        :key="actionType"
                                        @click="handleAction(actionType, item)"
                                        class="px-4 py-1 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition-colors text-sm font-medium"
                                    >
                                        {{ actionType.charAt(0).toUpperCase() + actionType.slice(1) }}
                                    </button>
                                </template>
                                <template v-else-if="props.action">
                                    <button
                                        @click="handleAction(props.action, item)"
                                        class="px-4 py-1 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition-colors text-sm font-medium"
                                    >
                                        {{ props.action.charAt(0).toUpperCase() + props.action.slice(1) }}
                                    </button>
                                </template>
                                <template v-else>
                                    <button
                                        @click="onEdit(item)"
                                        class="px-4 py-1 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition-colors text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        @click="onDelete(item)"
                                        class="px-4 py-1 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 transition-colors text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </template>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedItems.length === 0">
                        <td
                            :colspan="
                                enableRowCheckbox
                                    ? visibleColumns.length + (showActionsColumn ? 2 : 1)
                                    : visibleColumns.length + (showActionsColumn ? 1 : 0)
                            "
                            class="text-center py-4 border-b border-gray-200"
                        >
                            No matching records found.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination Controls -->
        <div
            v-if="!errorMessage"
            class="flex items-center justify-between mt-4 text-sm"
        >
            <!-- Showing X to Y of Z results -->
            <div class="text-gray-600">
                Showing {{ filteredItems.length > 0 ? (currentPage - 1) * currentPageSize + 1 : 0 }}
                to {{ Math.min(currentPage * currentPageSize, filteredItems.length) }}
                of {{ filteredItems.length }} results
            </div>

            <!-- Pagination Buttons -->
            <div class="flex items-center space-x-1">
                <button
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                    <span>&lt;</span>
                </button>

                <!-- Dynamic Pagination Buttons -->
                <template v-for="(page, index) in visiblePages" :key="index">
                    <button
                        v-if="page !== '...'"
                        @click="changePage(page)"
                        :class="[
                            'w-8 h-8 flex items-center justify-center rounded border',
                            currentPage === page
                                ? 'bg-green-600 text-white border-green-600'
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100',
                        ]"
                    >
                        {{ page }}
                    </button>
                    <span v-else class="px-1">...</span>
                </template>

                <button
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                    <span>&gt;</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, shallowRef, useSlots } from "vue";
import TextInput from "@/Components/TextInput.vue";

// Props definition including conditionalColumns prop
const props = defineProps({
    data: { type: Array, required: true },
    pageSize: { type: Number, default: 10 },
    columns: { type: Array, default: () => [] },
    pageSizeOptions: { type: Array, default: () => [10, 20, 50, 100] },
    enableRowCheckbox: { type: Boolean, default: false },
    sortable: { type: Boolean, default: true },
    rowClick: { type: String, default: '' },
    action: {
        type: [String, Array],
        default: null,
        validator: (value) => {
            if (Array.isArray(value)) {
                return value.every(action => typeof action === 'string');
            }
            return typeof value === 'string' || value === null;
        }
    },
    // conditionalColumns: an object where keys are column names and values are mappings of cell value to CSS class
    conditionalColumns: { type: Object, default: () => ({}) },
});

// Emits for actions and row click
const emit = defineEmits(["edit", "delete", "view", "row-click"]);

// Use shallowRef for primitive values
const searchQuery = shallowRef("");
const currentPage = shallowRef(1);
const currentPageSize = shallowRef(props.pageSize);
const selectedItems = ref([]);

// Sorting state
const currentSortKey = shallowRef(null);
const sortDirection = shallowRef("asc");

// Helper function to optimize the flattening of items for search
const flattenItemCache = new WeakMap();
const flattenItem = (item) => {
    if (flattenItemCache.has(item)) {
        return flattenItemCache.get(item);
    }

    const values = [];
    const queue = [item];

    while (queue.length > 0) {
        const current = queue.shift();

        if (current && typeof current === "object") {
            queue.push(...Object.values(current));
        } else if (current !== undefined && current !== null) {
            values.push(String(current).toLowerCase());
        }
    }

    flattenItemCache.set(item, values);
    return values;
};

// Helper function to get nested value from an object using dot notation
const pathCache = new Map();
const getNestedValue = (obj, path) => {
    if (!obj) return undefined;
    if (typeof path !== "string") {
        // If path is an object (from columnConfigs), use the key property
        path = path.key || path;
    }

    // Get or create cached path parts
    let parts = pathCache.get(path);
    if (!parts) {
        parts = path.split(".");
        pathCache.set(path, parts);
    }

    let result = obj;
    for (const part of parts) {
        if (result == null) return undefined;
        result = result[part];
    }
    return result;
};

// Helper function to quickly check common fields before doing a full search
const quickSearchMatch = (item, query) => {
    // List of common fields to check directly first
    const commonFields = [
        "id",
        "name",
        "title",
        "email",
        "username",
        "position_id",
        "position_name",
    ];

    // Check these fields directly for a match
    for (const field of commonFields) {
        const value = item[field];
        if (
            value !== undefined &&
            String(value).toLowerCase().includes(query)
        ) {
            return true;
        }
    }

    // No quick match found
    return false;
};

// Update filteredItems to use the quick path
const filteredItems = computed(() => {
    if (!searchQuery.value.trim()) return props.data;

    const query = searchQuery.value.toLowerCase();

    return props.data.filter((item) => {
        // Try quick path first
        if (quickSearchMatch(item, query)) return true;

        // If no quick match, do the more extensive search
        const flatValues = flattenItem(item);
        return flatValues.some((val) => val.includes(query));
    });
});

// Calculate total pages based on filtered items and current page size
const totalPages = computed(() =>
    Math.ceil(filteredItems.value.length / currentPageSize.value),
);

// Compute sorted items based on current sort key and direction
const sortedItems = computed(() => {
    if (!currentSortKey.value) return filteredItems.value;

    return [...filteredItems.value].sort((a, b) => {
        const aValue = getNestedValue(a, currentSortKey.value);
        const bValue = getNestedValue(b, currentSortKey.value);

        // Handle null/undefined values
        if (aValue === undefined || aValue === null)
            return sortDirection.value === "asc" ? 1 : -1;
        if (bValue === undefined || bValue === null)
            return sortDirection.value === "asc" ? -1 : 1;

        // Compare based on type
        if (typeof aValue === "number" && typeof bValue === "number") {
            return sortDirection.value === "asc"
                ? aValue - bValue
                : bValue - aValue;
        }

        // Default string comparison
        const aString = String(aValue).toLowerCase();
        const bString = String(bValue).toLowerCase();

        return sortDirection.value === "asc"
            ? aString.localeCompare(bString)
            : bString.localeCompare(aString);
    });
});

// Compute paginated items for the current page
const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * currentPageSize.value;
    return sortedItems.value.slice(start, start + currentPageSize.value);
});

// Computed property for dynamic pagination buttons
const visiblePages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const delta = 2;
    let range = [];
    if (total <= 7) {
        range = Array.from({ length: total }, (_, i) => i + 1);
    } else {
        range.push(1);
        let start = Math.max(2, current - delta);
        let end = Math.min(total - 1, current + delta);
        if (start > 2) {
            range.push("...");
        }
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        if (end < total - 1) {
            range.push("...");
        }
        range.push(total);
    }
    return range;
});

const columnConfigs = computed(() => {
    if (!props.data.length) return [];

    return props.columns.map((col) => {
        if (typeof col === "string") {
            return { key: col, title: formatHeader(col) };
        }
        return {
            key: col.key,
            title: col.title || formatHeader(col.key),
            currency: col.currency,
            hidden: col.hidden || false, // Add support for hidden property
        };
    });
});

// Create a new computed property for visible columns only
const visibleColumns = computed(() => {
    return columnConfigs.value.filter((col) => !col.hidden);
});

// Determine which columns to show: use columns prop if provided, otherwise all keys from first data item.
const showColumns = computed(() => {
    return columnConfigs.value.map((col) => col.key);
});

// Error handler: if columns prop is provided, check that each column exists in the first data item.
const errorMessage = computed(() => {
    if (props.columns && props.columns.length && props.data.length) {
        const firstItem = props.data[0];
        const missing = props.columns.filter(
            (col) => getNestedValue(firstItem, col) === undefined,
        );
        if (missing.length) {
            return `Error: Column(s) ${missing.join(", ")} do not exist in the data.`;
        }
    }
    return null;
});

// Change page function with bounds checking
const changePage = (page) => {
    if (page < 1 || page > totalPages.value || page === currentPage.value)
        return;
    currentPage.value = page;
};

// Reset to page 1 when search query changes
watch(searchQuery, () => {
    currentPage.value = 1;
});

// Reset to page 1 when page size changes
const onPageSizeChange = () => {
    currentPage.value = 1;
};

// Computed property: allSelected is true if all paginated items are selected.
const allSelected = computed(() => {
    return (
        paginatedItems.value.length > 0 &&
        paginatedItems.value.every((item) =>
            selectedItems.value.includes(item.id),
        )
    );
});

// Toggle select all for current page
const toggleSelectAll = () => {
    if (allSelected.value) {
        const ids = paginatedItems.value.map((item) => item.id);
        selectedItems.value = selectedItems.value.filter(
            (id) => !ids.includes(id),
        );
    } else {
        const ids = paginatedItems.value.map((item) => item.id);
        selectedItems.value = Array.from(
            new Set([...selectedItems.value, ...ids]),
        );
    }
};

// Sorting function: toggles sort direction if same column is clicked,
// or sets new sort column and resets direction to ascending.
const sortBy = (column) => {
    const key = typeof column === "string" ? column : column.key;
    if (currentSortKey.value === key) {
        sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
        currentSortKey.value = key;
        sortDirection.value = "asc";
    }
    currentPage.value = 1; // Reset to first page when sorting
};

// Format Currency Helper Function
const formatCurrency = (value, currency = "") => {
    if (!value) return "";
    const numValue = Number(value);
    if (isNaN(numValue)) return value;
    return `${currency}${numValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
};

// Emit edit and delete events
const onEdit = (item) => {
    emit("edit", item);
};

const onDelete = (item) => {
    emit("delete", item);
};

// Handle row click event
const handleRowClick = (item) => {
    if (props.rowClick) {
        emit('row-click', {
            value: getNestedValue(item, props.rowClick),
            key: props.rowClick,
            item
        });
    }
};

// Handle different action types
const handleAction = (actionType, item) => {
    emit(actionType.toLowerCase(), item);
};

// Function to return conditional class for a given column and value
// Memoized for performance
const classCache = new Map();
const getConditionalClass = (column, value) => {
    const cacheKey = `${column}:${value}`;

    if (classCache.has(cacheKey)) {
        return classCache.get(cacheKey);
    }

    let result = "";
    if (
        props.conditionalColumns[column] &&
        props.conditionalColumns[column][value]
    ) {
        result = props.conditionalColumns[column][value];
    }

    classCache.set(cacheKey, result);
    return result;
};

// Computed property to determine if actions column should be shown
const showActionsColumn = computed(() => {
    // Always show if action prop is set
    if (props.action !== null) {
        return true;
    }

    // If no action prop is set, show if we have the default edit/delete buttons
    return true; // Default to showing actions column for backward compatibility
});

// Watch for changes in props.data to clear caches when data changes completely
watch(
    () => props.data,
    () => {
        flattenItemCache.clear && flattenItemCache.clear();
        classCache.clear();
    },
    { deep: false },
);

// Initialize with a default sort if sortable is enabled
onMounted(() => {
    if (props.sortable && props.columns && props.columns.length > 0) {
        currentSortKey.value = props.columns[0];
    }
});

// Add window size tracking for virtual scrolling
const windowSize = shallowRef(20); // Number of items to render in virtual window
const startIndex = shallowRef(0);
const endIndex = shallowRef(0);

// Improve the virtual window algorithm for better performance
const calculateVirtualWindow = () => {
    // Only recalculate when visible on screen
    if (
        typeof document !== "undefined" &&
        document.visibilityState === "hidden"
    )
        return;

    const start = (currentPage.value - 1) * currentPageSize.value;
    startIndex.value = Math.max(0, start - windowSize.value);
    endIndex.value = Math.min(
        sortedItems.value.length,
        start + currentPageSize.value + windowSize.value,
    );
};

// Use virtualized items for rendering (only render visible + buffer)
const virtualItems = computed(() => {
    return sortedItems.value.slice(startIndex.value, endIndex.value);
});

// Add index tracking for better rendering performance
const getItemStyle = (index) => {
    const start = (currentPage.value - 1) * currentPageSize.value;
    if (index < start || index >= start + currentPageSize.value) {
        return { display: "none" };
    }
    return {};
};

// Update when page or data changes
watch([currentPage, () => sortedItems.value.length], calculateVirtualWindow);

// Replace debounced search with immediate search
const immediateSearch = (value) => {
    searchQuery.value = value;
};
</script>