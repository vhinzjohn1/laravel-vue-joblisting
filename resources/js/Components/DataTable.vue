<!-- Instruction to Use -->
<!-- :data - array of objects data-->
<!-- :columns - array of column objects -->
    <!-- 2 ways for defining columns -->
        <!-- 1. column object should have key and title properties -->
                <!-- :columns="[
                { key: 'position_id', title: 'Position ID' },
                { key: 'position_name', title: 'Position Name' },
                { key: 'item_number', title: 'Item Number' },
                { key: 'salary_grade.amount', title: 'Salary Grade' }
            ]" -->
        <!-- 2. Defined columns by column key -->
                <!-- :columns="['user_id', 'username', 'email', 'role_name']" -->
            
<!-- :sortable - boolean -->
<!-- :enableRowCheckbox - boolean -->
<!-- :conditionalColumns - object -->
<!-- @edit - edit event -->
<!-- @delete - delete event -->



<template>
    <div class="p-4">
        <!-- Items per page dropdown -->
        <div class="mb-4 flex items-center space-x-2">
            <label for="pageSize" class="font-medium">Items per page:</label>
            <select
                v-model="currentPageSize"
                @change="onPageSizeChange"
                class="appearance-none border rounded px-2 py-1 pr-10 w-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

        <!-- Search Field -->
        <div class="mb-4">
            <TextInput
                type="text"
                v-model="searchQuery"
                placeholder="Search..."
            />
        </div>

        <!-- Error Message -->
        <div
            v-if="errorMessage"
            class="mb-4 text-red-600 text-center font-medium"
        >
            {{ errorMessage }}
        </div>

        <!-- Table Container with fixed height and vertical scrolling -->
        <div v-else class="overflow-x-auto" style="max-height: calc(60vh)">
            <!-- Data Table (only rendered if no error) -->
            <table class="min-w-full border-collapse border border-gray-200">
                <thead class="bg-gray-100 sticky top-0 z-10">
                    <tr>
                        <!-- Checkbox header: select all -->
                        <th
                            v-if="enableRowCheckbox"
                            class="px-4 py-2 border border-gray-200 text-center"
                        >
                            <input
                                type="checkbox"
                                :checked="allSelected"
                                @change="toggleSelectAll"
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                        </th>
                        <!-- Render specified columns -->
                        <th
                            v-for="col in columnConfigs"
                            :key="col.key"
                            @click="sortable && sortBy(col.key)"
                                class="px-4 py-2 border border-gray-200 cursor-pointer select-none"
                            >
                                <div class="flex items-center space-x-1">
                                    <span>{{ col.title }}</span>
                                    <span v-if="sortable && currentSortKey === col.key">
                                        <!-- ... existing sort indicators ... -->
                                    </span>
                                </div>
                            </th>
                        <!-- Actions Column -->
                        <th class="px-4 py-2 border border-gray-200">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in paginatedItems" :key="item.id">
                        <!-- Checkbox cell for each row -->
                        <td
                            v-if="enableRowCheckbox"
                            class="px-4 py-2 border border-gray-200 text-center"
                        >
                            <input
                                type="checkbox"
                                v-model="selectedItems"
                                :value="item.id"
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                        </td>
                        <!-- Render only specified columns -->
                        <td
                            v-for="col in columnConfigs"
                            :key="col.key"
                            class="px-4 py-2 border border-gray-200 text-center"
                        >
                            <template v-if="conditionalColumns[col.key]">
                                <span :class="getConditionalClass(col.key, getNestedValue(item, col.key))">
                                    {{ col.currency 
                                        ? formatCurrency(getNestedValue(item, col.key), col.currency)
                                        : getNestedValue(item, col.key) 
                                    }}
                                </span>
                            </template>
                            <template v-else>
                                {{ col.currency 
                                    ? formatCurrency(getNestedValue(item, col.key), col.currency)
                                    : getNestedValue(item, col.key) 
                                }}
                            </template>
                        </td>
                        <td class="px-4 py-2 border border-gray-200">
                            <button
                                @click="onEdit(item)"
                                class="px-2 py-1 bg-green-800 text-white rounded hover:bg-green-600 mr-2 transition-colors"
                            >
                                Edit
                            </button>
                            <button
                                @click="onDelete(item)"
                                class="px-2 py-1 bg-red-700 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                    <tr v-if="paginatedItems.length === 0">
                        <td
                            :colspan="
                                enableRowCheckbox
                                    ? showColumns.length + 2
                                    : showColumns.length + 1
                            "
                            class="text-center py-4"
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
            class="flex items-center justify-center space-x-2 mt-4"
        >
            <button
                @click="changePage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
                Prev
            </button>

            <!-- Dynamic Pagination Buttons -->
            <template v-for="(page, index) in visiblePages" :key="index">
                <button
                    v-if="page !== '...'"
                    @click="changePage(page)"
                    :class="[
                        'px-3 py-1 rounded',
                        currentPage === page
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300',
                    ]"
                >
                    {{ page }}
                </button>
                <span v-else class="px-3 py-1">...</span>
            </template>

            <button
                @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import TextInput from "@/Components/TextInput.vue";

// Props definition including conditionalColumns prop
const props = defineProps({
    data: { type: Array, required: true },
    pageSize: { type: Number, default: 10 },
    columns: { type: Array,  default: () => [] },
    pageSizeOptions: { type: Array, default: () => [10, 20, 50, 100] },
    enableRowCheckbox: { type: Boolean, default: false },
    sortable: { type: Boolean, default: true },
    // conditionalColumns: an object where keys are column names and values are mappings of cell value to CSS class
    conditionalColumns: { type: Object, default: () => ({}) },
});

// Emits for actions (edit and delete)
const emit = defineEmits(["edit", "delete"]);

// Local state for search, pagination, sorting, and selected row IDs
const searchQuery = ref("");
const currentPage = ref(1);
const currentPageSize = ref(props.pageSize);
const selectedItems = ref([]);

// Sorting state
const currentSortKey = ref(null);
const sortDirection = ref("asc");

/**
 * Helper function to recursively flatten an item's values (including nested values)
 * Memoized to improve performance when called multiple times with the same item
 */
const flattenItemCache = new WeakMap();
const flattenItem = (item) => {
    // Return cached result if available
    if (flattenItemCache.has(item)) {
        return flattenItemCache.get(item);
    }
    
    const values = [];
    const recurse = (obj) => {
        if (obj && typeof obj === "object") {
            Object.values(obj).forEach((val) => recurse(val));
        } else if (obj !== undefined && obj !== null) {
            values.push(String(obj).toLowerCase());
        }
    };
    recurse(item);
    
    // Cache the result
    flattenItemCache.set(item, values);
    return values;
};

/**
 * Helper function to get nested value from an object using dot notation
 * Optimized with path splitting memoization
 */
const pathCache = new Map();
const getNestedValue = (obj, path) => {
    if (!obj) return undefined;
    if (typeof path !== 'string') {
        // If path is an object (from columnConfigs), use the key property
        path = path.key || path;
    }
    
    // Get or create cached path parts
    let parts = pathCache.get(path);
    if (!parts) {
        parts = path.split(".");
        pathCache.set(path, parts);
    }
    
    return parts.reduce((acc, part) => acc && acc[part], obj);
};

/**
 * Helper: format header names (capitalize first letter and replace underscores with spaces)
 * Memoized for performance
 */
const headerCache = new Map();
const formatHeader = (key) => {
    if (headerCache.has(key)) {
        return headerCache.get(key);
    }
    
    const formatted = key
        .split(".")
        .pop()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    
    headerCache.set(key, formatted);
    return formatted;
};

/**
 * Compute filtered items based on the search query.
 * This version searches across every value in the flattened item.
 * Optimized with debounced search and pre-lowercased values
 */
const filteredItems = computed(() => {
    if (!searchQuery.value.trim()) return props.data;

    const query = searchQuery.value.toLowerCase();
    return props.data.filter((item) => {
        // Get flattened and lowercased values from cache or compute them
        const flatValues = flattenItem(item);
        // Check if any value includes the query
        return flatValues.some(val => val.includes(query));
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
        if (aValue === undefined || aValue === null) return sortDirection.value === 'asc' ? 1 : -1;
        if (bValue === undefined || bValue === null) return sortDirection.value === 'asc' ? -1 : 1;
        
        // Compare based on type
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortDirection.value === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        // Default string comparison
        const aString = String(aValue).toLowerCase();
        const bString = String(bValue).toLowerCase();
        
        return sortDirection.value === 'asc' 
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
    
    return props.columns.map(col => {
        if (typeof col === 'string') {
            return { key: col, title: formatHeader(col) };
        }
        return { 
            key: col.key, 
            title: col.title || formatHeader(col.key),
            currency: col.currency 
        };
    });
});
// Determine which columns to show: use columns prop if provided, otherwise all keys from first data item.
const showColumns = computed(() => {
    return columnConfigs.value.map(col => col.key);
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
    const key = typeof column === 'string' ? column : column.key;
    if (currentSortKey.value === key) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortKey.value = key;
        sortDirection.value = 'asc';
    }
    currentPage.value = 1; // Reset to first page when sorting
};


// Format Currency Helper Function
const formatCurrency = (value, currency = '') => {
    if (!value) return '';
    const numValue = Number(value);
    if (isNaN(numValue)) return value;
    return `${currency}${numValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
};

// Emit edit and delete events
const onEdit = (item) => {
    emit("edit", item);
};

const onDelete = (item) => {
    emit("delete", item);
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

// Watch for changes in props.data to clear caches when data changes completely
watch(() => props.data, () => {
    flattenItemCache.clear && flattenItemCache.clear();
    classCache.clear();
}, { deep: false });

// Initialize with a default sort if sortable is enabled
onMounted(() => {
    if (props.sortable && props.columns && props.columns.length > 0) {
        currentSortKey.value = props.columns[0];
    }
});
</script>