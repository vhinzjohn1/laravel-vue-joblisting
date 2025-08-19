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
                    class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm"
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
                                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            >
                        </th>
                         <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('index')">No.
                             <i class="fas" :class="sortColumn === 'index' ? (sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('title')">Title
                             <i class="fas" :class="sortColumn === 'title' ? (sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'"></i>
                        </th>
                        <!-- Applicants column header -->
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer text-center" @click="sortBy('applicationsCount')">Applicants
                            <i class="fas" :class="sortColumn === 'applicationsCount' ? (sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('position.item_number')">Item Number
                             <i class="fas" :class="sortColumn === 'position.item_number' ? (sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('position.salary_grade.salary_grade')">Salary Grade
                             <i class="fas" :class="sortColumn === 'position.salary_grade.salary_grade' ? (sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('position.category')">Category
                             <i class="fas" :class="sortColumn === 'position.category' ? (sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0" colspan="4">Qualification Standards</th>
                         <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('closing_date')">Closing Date
                              <i class="fas" :class="sortColumn === 'closing_date' ? (sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'"></i>
                         </th>
                         <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('created_at')">Date Created
                              <i class="fas" :class="sortColumn === 'created_at' ? (sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'"></i>
                         </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('status')">Status
                             <i class="fas" :class="sortColumn === 'status' ? (sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm sticky top-0 cursor-pointer" @click="sortBy('place_assigned')">Place of Assignment
                             <i class="fas" :class="sortColumn === 'place_assigned' ? (sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'"></i>
                        </th>
                    </tr>
                     <tr>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm"></th> <!-- Empty header for checkbox column -->
                         <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm"></th> <!-- Empty header for No. column -->
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm"></th> <!-- Empty header for title column -->
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm"></th> <!-- Empty header for applicants column -->
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
                         <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-sm"></th> <!-- Empty header for place of assignment column -->
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
                                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
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
                                    class="text-green-600 hover:text-green-800 focus:outline-none focus:ring-0"
                                >
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </td>
                        <!-- Applicants badge cell -->
                        <td class="border border-gray-300 px-4 py-2 text-sm text-center">
                            <span
                                class="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold"
                                :class="(item.applications?.length || 0) > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'"
                            >
                                {{ item.applications?.length || 0 }}
                            </span>
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
                                    displayStatus(item) === 'Active'
                                        ? 'bg-green-100 text-green-700'
                                        : displayStatus(item) === 'Draft'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-red-100 text-red-700',
                                ]"
                            >
                                {{ displayStatus(item) }}
                            </span>
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-sm">
                            {{ item.place_assigned || '-' }}
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

        <!-- View Job Modal -->
        <Modal
            :show="showViewModal"
            @close="showViewModal = false"
            title="Job Listing Details"
            max-width="4xl"
        >
            <div class="p-6">
                <div v-if="viewingJob" class="space-y-6">
                    <!-- Basic Information -->
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Basic Information</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm font-medium text-gray-500">Job Title</p>
                                <p class="mt-1">{{ viewingJob.title }}</p>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500">Position</p>
                                <p class="mt-1">{{ viewingJob.position?.position_name }}</p>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500">Item Number</p>
                                <p class="mt-1">{{ viewingJob.position?.item_number === '' ? 'CoS/Job Order' : viewingJob.position?.item_number || '-' }}</p>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500">Salary Grade</p>
                                <p class="mt-1">{{ viewingJob.position?.salary_grade?.salary_grade || '-' }}</p>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500">Category</p>
                                <p class="mt-1">{{ viewingJob.position?.category || '-' }}</p>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500">Status</p>
                                <p class="mt-1">
                                    <span
                                        class="px-2 py-1 text-xs font-semibold rounded-full"
                                        :class="[
                                            displayStatus(viewingJob) === 'Active'
                                                ? 'bg-green-100 text-green-700'
                                                : displayStatus(viewingJob) === 'Draft'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-red-100 text-red-700',
                                        ]"
                                    >
                                        {{ displayStatus(viewingJob) }}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500">Place of Assignment</p>
                                <p class="mt-1">{{ viewingJob.place_assigned || '-' }}</p>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500">Closing Date</p>
                                <p class="mt-1">{{ formatDate(viewingJob.closing_date) }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Job Description -->
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Job Description</h3>
                        <p class="text-gray-700 whitespace-pre-wrap">{{ viewingJob.description }}</p>
                    </div>

                    <!-- Minimum Requirements -->
                    <div v-if="viewingJob.position?.minimum_requirement">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Minimum Requirements</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm font-medium text-gray-500">Education</p>
                                <p class="mt-1">{{ viewingJob.position.minimum_requirement.education_level || '-' }}</p>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500">Eligibility</p>
                                <p class="mt-1">{{ viewingJob.position.minimum_requirement.eligibility || '-' }}</p>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500">Training Required</p>
                                <p class="mt-1">{{ viewingJob.position.minimum_requirement.training_hours ? viewingJob.position.minimum_requirement.training_hours + ' hours' : '-' }}</p>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500">Experience Required</p>
                                <p class="mt-1">{{ viewingJob.position.minimum_requirement.years_experience ? viewingJob.position.minimum_requirement.years_experience + ' year(s)' : '-' }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Required Documents -->
                    <div v-if="viewingJob.required_documents && viewingJob.required_documents.length > 0">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Required Documents</h3>
                        <ul class="list-disc list-inside space-y-1">
                            <li v-for="doc in viewingJob.required_documents" :key="doc.required_document_id" class="text-gray-700">
                                {{ doc.document_name }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="flex justify-end gap-4 mt-6 p-4 border-t">
                <button
                    type="button"
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    @click="showViewModal = false"
                >
                    Close
                </button>
            </div>
        </Modal>

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
                                { value: 'Archived' }
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

// Add new refs for view modal
const showViewModal = ref(false);
const viewingJob = ref(null);

const isJobClosedByDate = (job) => {
    if (!job || !job.closing_date) {
        return false;
    }
    const closingDate = new Date(job.closing_date);
    closingDate.setHours(23, 59, 59, 999); // Set to end of day
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for comparison
    return closingDate < today;
};

const displayStatus = (item) => {
    if (isJobClosedByDate(item)) {
        return 'Closed';
    }
    return item.status;
};

// Computed properties
const filteredItems = computed(() => {
    // Start with a cloned copy to avoid mutating props
    let currentItems = Array.isArray(props.items) ? [...props.items] : [];

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

    // Apply sorting on a non-readonly array
    if (sortColumn.value) {
        // Map the "No." column to a stable key for sorting
        const columnKey = sortColumn.value === 'index' ? 'job_listing_id' : sortColumn.value;
        currentItems.sort((a, b) => {
            // Special handling for applications count sorting
            if (sortColumn.value === 'applicationsCount') {
                const aCount = Array.isArray(a.applications) ? a.applications.length : 0;
                const bCount = Array.isArray(b.applications) ? b.applications.length : 0;
                return sortDirection.value === 'asc' ? aCount - bCount : bCount - aCount;
            }

            const aValue = getNestedValue(a, columnKey);
            const bValue = getNestedValue(b, columnKey);

            if (aValue === null || aValue === undefined) return sortDirection.value === 'asc' ? 1 : -1; // Handle null/undefined values
            if (bValue === null || bValue === undefined) return sortDirection.value === 'asc' ? -1 : 1; // Handle null/undefined values

            // Special handling for date comparison
            if (columnKey === 'closing_date' || columnKey === 'created_at') {
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
    viewingJob.value = item;
    showViewModal.value = true;
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
    const date = new Date(dateString);
    // Use UTC methods to prevent timezone conversion
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC' // Force UTC timezone
    };
    return date.toLocaleDateString(undefined, options);
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

/* Add new styles for the view modal */
.whitespace-pre-wrap {
    white-space: pre-wrap;
}
</style>
