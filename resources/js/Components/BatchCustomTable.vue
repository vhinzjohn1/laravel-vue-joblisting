<template>
    <div>
        <!-- Table Actions -->
        <div class="mb-4 flex justify-between items-center">
            <div class="flex space-x-2">
                <button
                    v-if="selectedItems.length === 1"
                    @click="handleEdit(selectedItems[0])"
                    class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 text-sm"
                >
                    Edit
                </button>
                <button
                    v-if="selectedItems.length > 0 && showDelete"
                    @click="handleDelete(selectedItems)"
                    class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm"
                >
                    Delete
                </button>
                <button
                    v-if="selectedItems.length > 0"
                    @click="handleBulkArchive"
                    class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 text-sm"
                >
                    Archive
                </button>
            </div>
            <button
                v-if="selectedItems.length > 0"
                @click="clearSelection"
                class="text-sm text-gray-500 hover:text-gray-700"
            >
                Clear Selection
            </button>
            <div class="flex items-center space-x-4">
                <TextInput
                    v-model="searchQuery"
                    placeholder="Search batches..."
                    class="w-64"
                />
            </div>
        </div>

        <!-- Custom Table Structure -->
        <div class="overflow-x-auto">
            <table class="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th v-if="selectable" class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0">
                            <input
                                type="checkbox"
                                :checked="isAllSelected"
                                @change="toggleSelectAll"
                                class="form-checkbox h-4 w-4 text-blue-600"
                            >
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('index')">No.
                            <i v-if="sortColumn === 'index'" :class="{'fa-sort-up': sortDirection === 'asc', 'fa-sort-down': sortDirection === 'desc'}" class="fas fa-sort"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('batch_name')">Batch Name
                            <i v-if="sortColumn === 'batch_name'" :class="{'fa-sort-up': sortDirection === 'asc', 'fa-sort-down': sortDirection === 'desc'}" class="fas fa-sort"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('batch_code')">Batch Code
                            <i v-if="sortColumn === 'batch_code'" :class="{'fa-sort-up': sortDirection === 'asc', 'fa-sort-down': sortDirection === 'desc'}" class="fas fa-sort"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('post_date')">Post Date
                            <i v-if="sortColumn === 'post_date'" :class="{'fa-sort-up': sortDirection === 'asc', 'fa-sort-down': sortDirection === 'desc'}" class="fas fa-sort"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('deadline')">Deadline
                            <i v-if="sortColumn === 'deadline'" :class="{'fa-sort-up': sortDirection === 'asc', 'fa-sort-down': sortDirection === 'desc'}" class="fas fa-sort"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('status')">Status
                            <i v-if="sortColumn === 'status'" :class="{'fa-sort-up': sortDirection === 'asc', 'fa-sort-down': sortDirection === 'desc'}" class="fas fa-sort"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0">Job Listings</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in paginatedItems"
                        :key="item.batch_id"
                        class="border-b hover:bg-gray-50 transition"
                    >
                        <td v-if="selectable" class="border border-gray-300 px-4 py-2 text-center">
                            <input
                                type="checkbox"
                                :checked="isSelected(item)"
                                @change="toggleSelect(item)"
                                class="form-checkbox h-4 w-4 text-blue-600 text-center"
                            >
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-sm text-center">
                            {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-sm text-center">
                            {{ item.batch_name }}
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-sm text-center">
                            {{ item.batch_code }}
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-sm text-center">
                            {{ formatDate(item.post_date) }}
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-sm text-center">
                            {{ formatDate(item.deadline) }}
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-sm text-center">
                            <span
                                class="px-2 py-1 text-xs font-semibold rounded-full"
                                :class="[
                                    item.status === 'Active'
                                        ? 'bg-green-100 text-green-700'
                                        : item.status === 'Draft'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : item.status === 'Archived'
                                        ? 'bg-gray-100 text-gray-700'
                                        : 'bg-red-100 text-red-700',
                                ]"
                            >
                                {{ item.status }}
                            </span>
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-sm text-center">
                            {{ item.job_listings?.length || 0 }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div v-if="showPagination" class="mt-4 flex justify-end space-x-2">
            <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                Previous
            </button>
            <span class="px-3 py-1">
                Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import TextInput from '@/Components/TextInput.vue';

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    selectable: {
        type: Boolean,
        default: true
    },
    showPagination: {
        type: Boolean,
        default: true
    },
    showDelete: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits([
    'edit',
    'delete',
    'bulk-archive'
]);

// State
const searchQuery = ref('');
const selectedItems = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;

// Sorting state
const sortColumn = ref(null);
const sortDirection = ref('asc');

// Computed properties
const filteredItems = computed(() => {
    let currentItems = props.items;

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        currentItems = currentItems.filter(item =>
            item.batch_name.toLowerCase().includes(query) ||
            item.batch_code.toLowerCase().includes(query) ||
            item.status.toLowerCase().includes(query)
        );
    }

    // Apply sorting
    if (sortColumn.value) {
        currentItems.sort((a, b) => {
            const aValue = getNestedValue(a, sortColumn.value);
            const bValue = getNestedValue(b, sortColumn.value);

            if (aValue === null || aValue === undefined) return sortDirection.value === 'asc' ? 1 : -1;
            if (bValue === null || bValue === undefined) return sortDirection.value === 'asc' ? -1 : 1;

            // Special handling for date comparison
            if (sortColumn.value === 'post_date' || sortColumn.value === 'deadline') {
                const aDate = new Date(aValue);
                const bDate = new Date(bValue);
                if (aDate < bDate) return sortDirection.value === 'asc' ? -1 : 1;
                if (aDate > bDate) return sortDirection.value === 'asc' ? 1 : -1;
                return 0;
            }

            // Default string comparison
            const stringA = String(aValue).toLowerCase();
            const stringB = String(bValue).toLowerCase();

            if (stringA < stringB) return sortDirection.value === 'asc' ? -1 : 1;
            if (stringA > stringB) return sortDirection.value === 'asc' ? 1 : -1;
            return 0;
        });
    }

    return currentItems;
});

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredItems.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(filteredItems.value.length / itemsPerPage);
});

const isAllSelected = computed(() => {
    return paginatedItems.value.length > 0 && selectedItems.value.length === paginatedItems.value.length;
});

const isSelected = (item) => {
    return selectedItems.value.some(selected => selected.batch_id === item.batch_id);
};

// Watch for changes in filteredItems to reset pagination and selection
watch(filteredItems, () => {
    currentPage.value = 1;
    selectedItems.value = [];
});

// Helper function to get nested property values
const getNestedValue = (obj, key) => {
    return key.split('.').reduce((o, i) => o?.[i], obj);
};

// Methods for selection
const toggleSelect = (item) => {
    const index = selectedItems.value.findIndex(selected => selected.batch_id === item.batch_id);
    if (index === -1) {
        selectedItems.value.push(item);
    } else {
        selectedItems.value.splice(index, 1);
    }
};

const toggleSelectAll = () => {
    if (isAllSelected.value) {
        const currentPageItemIds = paginatedItems.value.map(item => item.batch_id);
        selectedItems.value = selectedItems.value.filter(item => !currentPageItemIds.includes(item.batch_id));
    } else {
        const currentPageItems = paginatedItems.value;
        const currentlySelectedIds = selectedItems.value.map(item => item.batch_id);
        const newItemsToSelect = currentPageItems.filter(item => !currentlySelectedIds.includes(item.batch_id));
        selectedItems.value = [...selectedItems.value, ...newItemsToSelect];
    }
};

const clearSelection = () => {
    selectedItems.value = [];
};

// Methods for pagination
const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

// Method for sorting
const sortBy = (column) => {
    if (sortColumn.value === column) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn.value = column;
        sortDirection.value = 'asc';
    }
};

// Methods for actions
const handleEdit = (item) => {
    emit('edit', item);
};

const handleBulkArchive = () => {
    emit('bulk-archive', selectedItems.value);
};

const handleDelete = (items) => {
    emit('delete', items);
};

// Helper function to format date
const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Watch for changes in selectedItems to emit update event
watch(selectedItems, (newVal) => {
    emit('update:selected', newVal);
}, { deep: true });
</script>

<style scoped>
.table-responsive {
    width: 100%;
    overflow-x: auto;
}

.table-responsive table {
    min-width: 900px;
}

.cursor-pointer {
    cursor: pointer;
}

.fa-sort-up::before {
    content: "\f0de";
}

.fa-sort-down::before {
    content: "\f0dd";
}

.fas.fa-sort::before {
    content: "\f0dc";
}
</style>
