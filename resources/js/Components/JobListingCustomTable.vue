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
                    v-if="selectedItems.length > 0"
                    @click="handleBulkEdit"
                    class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 text-sm"
                >
                    Edit Status
                </button>
                <button
                    v-if="selectedItems.length > 0"
                    @click="handleBulkDelete"
                    class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 text-sm"
                >
                    Delete
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
                    placeholder="Search job listings..."
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
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('title')">Title
                             <i v-if="sortColumn === 'title'" :class="{'fa-sort-up': sortDirection === 'asc', 'fa-sort-down': sortDirection === 'desc'}" class="fas fa-sort"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('position.item_number')">Item Number
                             <i v-if="sortColumn === 'position.item_number'" :class="{'fa-sort-up': sortDirection === 'asc', 'fa-sort-down': sortDirection === 'desc'}" class="fas fa-sort"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('position.salary_grade.salary_grade')">Salary Grade
                             <i v-if="sortColumn === 'position.salary_grade.salary_grade'" :class="{'fa-sort-up': sortDirection === 'asc', 'fa-sort-down': sortDirection === 'desc'}" class="fas fa-sort"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('position.category')">Category
                             <i v-if="sortColumn === 'position.category'" :class="{'fa-sort-up': sortDirection === 'asc', 'fa-sort-down': sortDirection === 'desc'}" class="fas fa-sort"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0" colspan="4">Qualification Standards</th>
                         <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('closing_date')">Closing Date
                              <i v-if="sortColumn === 'closing_date'" :class="{'fa-sort-up': sortDirection === 'asc', 'fa-sort-down': sortDirection === 'desc'}" class="fas fa-sort"></i>
                         </th>
                         <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('created_at')">Date Created
                              <i v-if="sortColumn === 'created_at'" :class="{'fa-sort-up': sortDirection === 'asc', 'fa-sort-down': sortDirection === 'desc'}" class="fas fa-sort"></i>
                         </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('status')">Status
                             <i v-if="sortColumn === 'status'" :class="{'fa-sort-up': sortDirection === 'asc', 'fa-sort-down': sortDirection === 'desc'}" class="fas fa-sort"></i>
                        </th>
                    </tr>
                     <tr>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm"></th> <!-- Empty header for checkbox column -->
                         <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm"></th> <!-- Empty header for No. column -->
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm"></th> <!-- Empty header for title column -->
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm"></th> <!-- Empty header for item number column -->
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm"></th> <!-- Empty header for salary grade column -->
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm"></th> <!-- Empty header for category column -->
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm">Education</th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm">Training</th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm">Experience</th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm">Eligibility</th>
                         <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm"></th> <!-- Empty header for Closing Date column -->
                         <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm"></th> <!-- Empty header for Date Created column -->
                         <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm"></th> <!-- Empty header for status column -->
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in paginatedItems"
                        :key="item.job_listing_id"
                        class="border-b hover:bg-gray-50 transition"
                    >
                         <td v-if="selectable" class="border border-gray-300 px-4 py-2">
                            <input
                                type="checkbox"
                                :checked="isSelected(item)"
                                @change="toggleSelect(item)"
                                class="form-checkbox h-4 w-4 text-blue-600"
                            >
                        </td>
                         <td class="border border-gray-300 px-4 py-2 text-sm">
                            {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-sm">
                             <div class="flex items-center space-x-2">
                                <span>{{ item.title }}</span>
                                <button
                                    @click="handleView(item)"
                                    class="text-blue-600 hover:text-blue-800"
                                >
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-sm">
                            {{ item.position?.item_number === '' ? 'CoS/Job Order' : item.position?.item_number || '-' }}
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-sm">
                            {{ item.position?.salary_grade?.salary_grade || '-' }}
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-sm">
                            {{ item.position?.category || '-' }}
                        </td>
                         <td class="border border-gray-300 px-4 py-2 text-sm">
                             {{ item.position?.minimum_requirement?.education_level || '-' }}
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-sm">
                             {{ item.position?.minimum_requirement?.training_hours ? item.position?.minimum_requirement?.training_hours + ' hours' : '-' }}
                        </td>
                         <td class="border border-gray-300 px-4 py-2 text-sm">
                             {{ item.position?.minimum_requirement?.years_experience ? item.position?.minimum_requirement?.years_experience + ' year(s)' : '-' }}
                        </td>
                         <td class="border border-gray-300 px-4 py-2 text-sm">
                             {{ item.position?.minimum_requirement?.eligibility || '-' }}
                        </td>
                         <td class="border border-gray-300 px-4 py-2 text-sm">
                             {{ formatDate(item.closing_date) }}
                        </td>
                         <td class="border border-gray-300 px-4 py-2 text-sm">
                             {{ formatDate(item.created_at) }}
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-sm">
                            <span
                                class="px-2 py-1 text-xs font-semibold rounded-full"
                                :class="[
                                    item.status === 'Active'
                                        ? 'bg-green-100 text-green-700'
                                        : item.status === 'Draft'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-red-100 text-red-700',
                                ]"
                            >
                                {{ item.status }}
                            </span>
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

        <!-- Bulk Edit Modal -->
        <Modal
            :show="showBulkEditModal"
            @close="showBulkEditModal = false"
            title="Edit Status"
        >
            <form @submit.prevent="submitBulkEdit">
                <div class="p-4">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <CustomSelect
                            v-model="bulkEditStatus"
                            :options="[
                                { value: 'Active' },
                                { value: 'Draft' },
                                { value: 'Closed' },
                                ...(props.isPlantilla ? [] : [{ value: 'Archived' }])
                            ]"
                            :value-key="'value'"
                            :display-format="(option) => option.value"
                            required
                        />
                    </div>
                </div>
                <div class="flex justify-end gap-4 mt-6 p-4 border-t">
                    <button
                        type="button"
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                        @click="showBulkEditModal = false"
                    >
                        Cancel
                    </button>
                    <PrimaryButton
                        type="submit"
                        :loading="isLoading"
                        :disabled="isLoading"
                    >
                        Update Status
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import TextInput from '@/Components/TextInput.vue';
import CustomSelect from '@/Components/CustomSelect.vue';
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    isPlantilla: {
        type: Boolean,
        default: false
    },
    selectable: {
        type: Boolean,
        default: true // Default to true as it's required for this use case
    },
     showPagination: {
        type: Boolean,
        default: true // Default to true as it's required for this use case
    },
});

const emit = defineEmits([
    'edit',
    'view',
    'bulk-edit',
    'bulk-delete',
    'bulk-archive'
]);

// State
const searchQuery = ref('');
const selectedItems = ref([]);
const currentPage = ref(1);
const showBulkEditModal = ref(false);
const bulkEditStatus = ref('');
const isLoading = ref(false);

// Sorting state
const sortColumn = ref(null);
const sortDirection = ref('asc');

// Pagination state
const itemsPerPage = 10; // Define how many items per page

// Computed properties
const filteredItems = computed(() => {
    let currentItems = props.items;

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
         currentItems = currentItems.filter(item =>
            item.title.toLowerCase().includes(query) ||
            (item.position?.position_name || '').toLowerCase().includes(query) ||
            (item.position?.item_number || '').toLowerCase().includes(query) ||
            (item.position?.category || '').toLowerCase().includes(query) ||
            ((item.position?.salary_grade?.salary_grade || '') + '').toLowerCase().includes(query) ||
            (item.status || '').toLowerCase().includes(query)
        );
    }

    // Apply sorting
    if (sortColumn.value) {
        currentItems.sort((a, b) => {
            const aValue = getNestedValue(a, sortColumn.value);
            const bValue = getNestedValue(b, sortColumn.value);

            if (aValue === null || aValue === undefined) return sortDirection.value === 'asc' ? 1 : -1; // Handle null/undefined values
            if (bValue === null || bValue === undefined) return sortDirection.value === 'asc' ? -1 : 1; // Handle null/undefined values

            // Special handling for date comparison
            if (sortColumn.value === 'closing_date' || sortColumn.value === 'created_at') {
                const aDate = new Date(aValue);
                const bDate = new Date(bValue);
                 if (aDate < bDate) return sortDirection.value === 'asc' ? -1 : 1;
                if (aDate > bDate) return sortDirection.value === 'asc' ? 1 : -1;
                return 0;
            }

             // Check if values are numeric and compare accordingly
            if (!isNaN(aValue) && !isNaN(bValue)) {
                return sortDirection.value === 'asc' ? aValue - bValue : bValue - aValue;
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
    // Check if the number of selected items is equal to the number of items on the current page
    return paginatedItems.value.length > 0 && selectedItems.value.length === paginatedItems.value.length;
});

const isSelected = (item) => {
    return selectedItems.value.some(selected => selected.job_listing_id === item.job_listing_id);
};

// Watch for changes in filteredItems to reset pagination and selection
watch(filteredItems, () => {
    currentPage.value = 1;
    selectedItems.value = []; // Clear selection when filtering changes
});

// Helper function to get nested property values
const getNestedValue = (obj, key) => {
  return key.split('.').reduce((o, i) => o?.[i], obj);
};

// Methods for selection
const toggleSelect = (item) => {
    const index = selectedItems.value.findIndex(selected => selected.job_listing_id === item.job_listing_id);
    if (index === -1) {
        selectedItems.value.push(item);
    } else {
        selectedItems.value.splice(index, 1);
    }
};

const toggleSelectAll = () => {
    if (isAllSelected.value) {
        // Deselect all items on the current page
        const currentPageItemIds = paginatedItems.value.map(item => item.job_listing_id);
        selectedItems.value = selectedItems.value.filter(item => !currentPageItemIds.includes(item.job_listing_id));

    } else {
        // Select all items on the current page
        const currentPageItems = paginatedItems.value;
        const currentlySelectedIds = selectedItems.value.map(item => item.job_listing_id);
        const newItemsToSelect = currentPageItems.filter(item => !currentlySelectedIds.includes(item.job_listing_id));
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
const handleView = (item) => {
    emit('view', item);
};

const handleEdit = (item) => {
    emit('edit', item);
};

const handleBulkEdit = () => {
    showBulkEditModal.value = true;
};

const handleBulkDelete = () => {
    emit('bulk-delete', selectedItems.value);
};

const submitBulkEdit = () => {
    emit('bulk-edit', {
        items: selectedItems.value,
        status: bulkEditStatus.value
    });
    showBulkEditModal.value = false;
    bulkEditStatus.value = '';
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
/* Add any specific styles for this table here */
.table-responsive {
    width: 100%;
    overflow-x: auto;
}

.table-responsive table {
    min-width: 900px; /* Adjust as needed for your columns */
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
