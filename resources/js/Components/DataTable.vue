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
            <input
                type="text"
                v-model="searchQuery"
                placeholder="Search..."
                class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                            v-for="col in showColumns"
                            :key="col"
                            @click="sortable && sortBy(col)"
                            class="px-4 py-2 border border-gray-200 cursor-pointer select-none"
                        >
                            <div class="flex items-center space-x-1">
                                <span>{{ formatHeader(col) }}</span>
                                <!-- Show sort indicator if this is the active sort column -->
                                <span v-if="sortable && currentSortKey === col">
                                    <svg
                                        v-if="sortDirection === 'asc'"
                                        class="w-3 h-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M5.23 7.21a.75.75 0 011.06 0L10 10.91l3.71-3.7a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z"
                                        />
                                    </svg>
                                    <svg
                                        v-else
                                        class="w-3 h-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M14.77 12.79a.75.75 0 01-1.06 0L10 9.09l-3.71 3.7a.75.75 0 11-1.06-1.06l4.24-4.24a.75.75 0 011.06 0l4.24 4.24a.75.75 0 010 1.06z"
                                        />
                                    </svg>
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
                            v-for="col in showColumns"
                            :key="col"
                            class="px-4 py-2 border border-gray-200"
                        >
                            <template v-if="conditionalColumns[col]">
                                <span
                                    :class="
                                        getConditionalClass(
                                            col,
                                            getNestedValue(item, col),
                                        )
                                    "
                                >
                                    {{ getNestedValue(item, col) }}
                                </span>
                            </template>
                            <template v-else>
                                {{ getNestedValue(item, col) }}
                            </template>
                        </td>
                        <td class="px-4 py-2 border border-gray-200">
                            <button
                                @click="onEdit(item)"
                                class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2 transition-colors"
                            >
                                Edit
                            </button>
                            <button
                                @click="onDelete(item)"
                                class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
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
import { ref, computed, watch } from "vue";

// Props definition including conditionalColumns prop
const props = defineProps({
    data: { type: Array, required: true },
    pageSize: { type: Number, default: 10 },
    columns: { type: Array, default: null },
    pageSizeOptions: { type: Array, default: () => [5, 10, 20, 50] },
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

// Compute filtered items based on search query (case‑insensitive)
const filteredItems = computed(() => {
    let result = !searchQuery.value.trim()
        ? props.data
        : props.data.filter((item) =>
              Object.values(item).some((val) =>
                  String(val)
                      .toLowerCase()
                      .includes(searchQuery.value.toLowerCase()),
              ),
          );
    if (props.sortable && currentSortKey.value) {
        result = [...result].sort((a, b) => {
            const aValue = a[currentSortKey.value];
            const bValue = b[currentSortKey.value];
            if (typeof aValue === "number" && typeof bValue === "number") {
                return sortDirection.value === "asc"
                    ? aValue - bValue
                    : bValue - aValue;
            }
            const aStr = String(aValue).toLowerCase();
            const bStr = String(bValue).toLowerCase();
            if (aStr < bStr) return sortDirection.value === "asc" ? -1 : 1;
            if (aStr > bStr) return sortDirection.value === "asc" ? 1 : -1;
            return 0;
        });
    }
    return result;
});

// Calculate total pages based on filtered items and current page size
const totalPages = computed(() =>
    Math.ceil(filteredItems.value.length / currentPageSize.value),
);

// Compute paginated items for the current page
const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * currentPageSize.value;
    return filteredItems.value.slice(start, start + currentPageSize.value);
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

// Determine which columns to show: use columns prop if provided, otherwise all keys from first data item.
const showColumns = computed(() => {
    if (props.columns && props.columns.length) {
        return props.columns;
    }
    if (props.data.length) {
        return Object.keys(props.data[0]);
    }
    return [];
});

// Error handler: if columns prop is provided, check that each column exists in the first data item.
const errorMessage = computed(() => {
    if (props.columns && props.columns.length && props.data.length) {
        const firstItem = props.data[0];
        const missing = props.columns.filter((col) => !(col in firstItem));
        if (missing.length) {
            return `Error: Column(s) ${missing.join(", ")} do not exist in the data.`;
        }
    }
    return null;
});

// Helper function to get nested value from an object using dot notation
const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

// Helper: format header names (capitalize first letter and replace underscores with spaces)
const formatHeader = (key) => {
    return key
        .split(".")
        .pop()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

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
const sortBy = (col) => {
    if (currentSortKey.value === col) {
        sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
        currentSortKey.value = col;
        sortDirection.value = "asc";
    }
};

// Emit edit and delete events
const onEdit = (item) => {
    emit("edit", item);
};

const onDelete = (item) => {
    emit("delete", item);
};

// Function to return conditional class for a given column and value
const getConditionalClass = (column, value) => {
    if (
        props.conditionalColumns[column] &&
        props.conditionalColumns[column][value]
    ) {
        return props.conditionalColumns[column][value];
    }
    return "";
};
</script>
