<template>
    <HRLayout>
        <Head title="Job Listings" />
        <template #header>
            <Header title="Job Listings" />
        </template>

        <div>
            <div class="bg-white p-4 rounded-lg shadow-md mt-4">
                <div
                    class="flex flex-col sm:flex-row justify-between items-center"
                >
                    <h1
                        class="text-2xl font-bold uppercase tracking-wider mb-4 sm:mb-0"
                    >
                        Job Listings
                    </h1>
                    <PrimaryButton @click="showAddModal = true"
                        >Add Job Listing</PrimaryButton
                    >
                </div>
            </div>
            <div class="max-w-full mt-3">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <div
                            v-if="jobs.length === 0"
                            class="text-center py-8 text-gray-500"
                        >
                            No job listings found, please add one to proceed
                        </div>

                        <div v-else class="space-y-4">
                            <DataTable
                                :data="filteredJobs"
                                :columns="[
                                    {
                                        key: 'title',
                                        title: 'Title',
                                    },
                                    {
                                        key: 'position.position_name',
                                        title: 'Position Name',
                                    },
                                    {
                                        key: 'position.item_number',
                                        title: 'Item Number',
                                    },
                                    {
                                        key: 'position.salary_grade.amount',
                                        title: 'Salary Grade',
                                        currency: '₱',
                                    },
                                    {
                                        key: 'category',
                                        title: 'Category',
                                    },
                                    {
                                        key: 'status',
                                        title: 'Status',
                                    },
                                    {
                                        key: 'closing_date',
                                        title: 'Closing Date',
                                    },
                                ]"
                                @edit="editJob"
                                @delete="deleteJob"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Job Modal -->
        <Modal
            :show="showAddModal"
            @close="
                () => {
                    showAddModal = false;
                    clearErrors();
                }
            "
            title="Create New Job Listing"
            max-width="6xl"
        >
            <form @submit.prevent="saveJob">
                <div class="p-5">
                    <!-- Basic Information Section -->
                    <div class="mb-6">
                        <h6
                            class="font-semibold text-gray-800 mb-4 pb-2 border-b"
                        >
                            Basic Information
                        </h6>

                        <!-- Job Title and Position -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Job Title -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                    for="jobTitle"
                                >
                                    Job Title *
                                </label>
                                <TextInput
                                    id="jobTitle"
                                    v-model="newJob.title"
                                    required
                                />
                            </div>

                            <!-- Position -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                    for="position"
                                >
                                    Position *
                                </label>
                                <CustomSelect
                                    :options="positions"
                                    v-model="newJob.position_id"
                                    placeholder="Select a position"
                                    :value-key="'position_id'"
                                    :display-format="
                                        (position) =>
                                            `${position.position_name} (${position.item_number})`
                                    "
                                    required
                                    @select="handlePositionSelect"
                                />
                            </div>
                        </div>

                        <!-- Salary Grade and Item Number -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div class="grid grid-cols-2 gap-2">
                                <!-- Salary Grade -->
                                <div class="form-group">
                                    <label
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Salary Grade
                                    </label>
                                    <p class="text-gray-700 py-2">
                                        {{ selectedPosition?.salary_grade?.amount ? `₱${selectedPosition.salary_grade.amount.toLocaleString()}` : '-' }}
                                    </p>
                                </div>

                                <!-- Item Number -->
                                <div class="form-group">
                                    <label
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Item Number
                                    </label>
                                    <p class="text-gray-700 py-2">
                                        {{ selectedPosition?.item_number || '-' }}
                                    </p>
                                </div>
                            </div>
                            <!-- Category -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                    for="category"
                                >
                                    Category *
                                </label>
                                <CustomSelect
                                    :options="[
                                        { value: 'Teaching' },
                                        { value: 'Non-Teaching' },
                                    ]"
                                    v-model="newJob.category"
                                    placeholder="Select a category"
                                    :value-key="'value'"
                                    :display-format="(option) => option.value"
                                    required
                                />
                            </div>
                        </div>

                        <!-- Closing Date and Applicant Limit -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <!-- Closing Date -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Closing Date *
                                </label>
                                <TextInput
                                    type="date"
                                    v-model="newJob.closing_date"
                                    required
                                    :class="{
                                        'border-red-500': errors.closing_date,
                                    }"
                                />
                                <p
                                    v-if="errors.closing_date"
                                    class="mt-1 text-sm text-red-600"
                                >
                                    {{ errors.closing_date[0] }}
                                </p>
                            </div>
                            <!-- Status -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Status *
                                </label>
                                <CustomSelect
                                    :options="[
                                        { value: 'Active' },
                                        { value: 'Draft' },
                                        { value: 'Closed' },
                                    ]"
                                    v-model="newJob.status"
                                    :value-key="'value'"
                                    :display-format="(option) => option.value"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Job Description Section -->
                    <div class="mb-4">
                        <h6
                            class="font-semibold text-gray-800 mb-4 pb-2 border-b"
                        >
                            Job Description
                        </h6>

                        <!-- Description -->
                        <div class="form-group">
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Description *
                            </label>
                            <TextArea
                                v-model="newJob.description"
                                rows="4"
                                placeholder="Enter job description"
                                required
                            />
                        </div>
                    </div>

                    <!-- Minimum Requirements Section -->
                    <div
                        v-if="selectedPosition?.minimum_requirement"
                        class="mb-4"
                    >
                        <h6
                            class="font-semibold text-gray-800 mb-4 pb-2 border-b"
                        >
                            Minimum Requirements
                        </h6>
                        <ul
                            class="list-disc list-inside text-sm text-gray-600 space-y-2"
                        >
                            <li
                                v-if="
                                    selectedPosition.minimum_requirement
                                        .education_level
                                "
                            >
                                <span class="font-medium">Education:</span>
                                {{
                                    selectedPosition.minimum_requirement
                                        .education_level
                                }}
                            </li>
                            <li
                                v-if="
                                    selectedPosition.minimum_requirement
                                        .eligibility
                                "
                            >
                                <span class="font-medium">Eligibility:</span>
                                {{
                                    selectedPosition.minimum_requirement
                                        .eligibility
                                }}
                            </li>
                            <li
                                v-if="
                                    selectedPosition.minimum_requirement
                                        .training_hours
                                "
                            >
                                <span class="font-medium"
                                    >Training Required:</span
                                >
                                {{
                                    selectedPosition.minimum_requirement
                                        .training_hours
                                }}
                                hours
                            </li>
                            <li
                                v-if="
                                    selectedPosition.minimum_requirement
                                        .years_experience
                                "
                            >
                                <span class="font-medium"
                                    >Experience Required:</span
                                >
                                {{
                                    selectedPosition.minimum_requirement
                                        .years_experience
                                }}
                                year(s)
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex justify-end gap-4 mt-6 p-4 border-t">
                    <!-- Cancel Button -->
                    <button
                        type="button"
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                        @click="showAddModal = false"
                    >
                        Cancel
                    </button>

                    <!-- Save Button -->
                    <button
                        type="submit"
                        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                        Save Job Listing
                    </button>
                </div>
            </form>
        </Modal>

        <!-- Edit Job Modal -->
        <Modal
            :show="showEditModal"
            @close="
                () => {
                    showEditModal = false;
                    clearErrors();
                }
            "
            title="Edit Job Listing"
            max-width="6xl"
        >
            <form @submit.prevent="updateJob">
                <div class="p-5">
                    <!-- Basic Information Section -->
                    <div class="mb-6">
                        <h6
                            class="font-semibold text-gray-800 mb-4 pb-2 border-b"
                        >
                            Basic Information
                        </h6>

                        <!-- Job Title and Position -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Job Title -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                    for="editJobTitle"
                                >
                                    Job Title *
                                </label>
                                <TextInput
                                    id="editJobTitle"
                                    v-model="editingJob.title"
                                    required
                                />
                            </div>

                            <!-- Position -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                    for="editPosition"
                                >
                                    Position *
                                </label>
                                <CustomSelect
                                    :options="positions"
                                    v-model="editingJob.position_id"
                                    placeholder="Select a position"
                                    :value-key="'position_id'"
                                    :display-format="
                                        (position) =>
                                            `${position.position_name} (${position.item_number})`
                                    "
                                    required
                                    @select="handlePositionSelect"
                                />
                            </div>
                        </div>

                        <!-- Salary Grade and Item Number -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div class="grid grid-cols-2 gap-2">
                                <!-- Salary Grade -->
                                <div class="form-group">
                                    <label
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Salary Grade
                                    </label>
                                    <p class="text-gray-700 py-2">
                                        {{ selectedPosition?.salary_grade?.amount ? `₱${selectedPosition.salary_grade.amount.toLocaleString()}` : '-' }}
                                    </p>
                                </div>

                                <!-- Item Number -->
                                <div class="form-group">
                                    <label
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Item Number
                                    </label>
                                    <p class="text-gray-700 py-2">
                                        {{ selectedPosition?.item_number || '-' }}
                                    </p>
                                </div>
                            </div>
                            <!-- Category -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                    for="editCategory"
                                >
                                    Category *
                                </label>
                                <CustomSelect
                                    :options="[
                                        { value: 'Teaching' },
                                        { value: 'Non-Teaching' },
                                    ]"
                                    v-model="editingJob.category"
                                    placeholder="Select a category"
                                    :value-key="'value'"
                                    :display-format="(option) => option.value"
                                    required
                                />
                            </div>
                        </div>

                        <!-- Closing Date and Status -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <!-- Closing Date -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Closing Date *
                                </label>
                                <TextInput
                                    type="date"
                                    v-model="editingJob.closing_date"
                                    required
                                    :class="{
                                        'border-red-500': errors.closing_date,
                                    }"
                                />
                                <p
                                    v-if="errors.closing_date"
                                    class="mt-1 text-sm text-red-600"
                                >
                                    {{ errors.closing_date[0] }}
                                </p>
                            </div>
                            <!-- Status -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Status *
                                </label>
                                <CustomSelect
                                    :options="[
                                        { value: 'Active' },
                                        { value: 'Draft' },
                                        { value: 'Closed' },
                                    ]"
                                    v-model="editingJob.status"
                                    :value-key="'value'"
                                    :display-format="(option) => option.value"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Job Description Section -->
                    <div class="mb-4">
                        <h6
                            class="font-semibold text-gray-800 mb-4 pb-2 border-b"
                        >
                            Job Description
                        </h6>

                        <!-- Description -->
                        <div class="form-group">
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Description *
                            </label>
                            <TextArea
                                v-model="editingJob.description"
                                rows="4"
                                placeholder="Enter job description"
                                required
                            />
                        </div>
                    </div>

                    <!-- Minimum Requirements Section -->
                    <div
                        v-if="selectedPosition?.minimum_requirement"
                        class="mb-4"
                    >
                        <h6
                            class="font-semibold text-gray-800 mb-4 pb-2 border-b"
                        >
                            Minimum Requirements
                        </h6>
                        <ul
                            class="list-disc list-inside text-sm text-gray-600 space-y-2"
                        >
                            <li
                                v-if="
                                    selectedPosition.minimum_requirement
                                        .education_level
                                "
                            >
                                <span class="font-medium">Education:</span>
                                {{
                                    selectedPosition.minimum_requirement
                                        .education_level
                                }}
                            </li>
                            <li
                                v-if="
                                    selectedPosition.minimum_requirement
                                        .eligibility
                                "
                            >
                                <span class="font-medium">Eligibility:</span>
                                {{
                                    selectedPosition.minimum_requirement
                                        .eligibility
                                }}
                            </li>
                            <li
                                v-if="
                                    selectedPosition.minimum_requirement
                                        .training_hours
                                "
                            >
                                <span class="font-medium"
                                    >Training Required:</span
                                >
                                {{
                                    selectedPosition.minimum_requirement
                                        .training_hours
                                }}
                                hours
                            </li>
                            <li
                                v-if="
                                    selectedPosition.minimum_requirement
                                        .years_experience
                                "
                            >
                                <span class="font-medium"
                                    >Experience Required:</span
                                >
                                {{
                                    selectedPosition.minimum_requirement
                                        .years_experience
                                }}
                                year(s)
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex justify-end gap-4 mt-6 p-4 border-t">
                    <button
                        type="button"
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                        @click="showEditModal = false"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                        Update Job Listing
                    </button>
                </div>
            </form>
        </Modal>

        <!-- Add debug info to display selected position values -->
        <div v-if="showAddModal || showEditModal" class="hidden">
            Selected Position Debug:
            {{ selectedPosition ? selectedPosition.position_name : "None" }}
        </div>
    </HRLayout>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import axios from "axios";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import { usePage, Head } from "@inertiajs/vue3";
import TextInput from "@/Components/TextInput.vue";
import InputField from "@/Components/InputField.vue";
import DataTable from "@/Components/DataTable.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import CustomSelect from "@/Components/CustomSelect.vue";
import TextArea from "@/Components/TextArea.vue";
import Modal from "@/Components/Modal.vue";

// Fetching Props that was sent by controller
const data = ref(usePage().props.jobListings);
const positions = ref(usePage().props.positions);

// Modified job data structure to match database schema
const jobs = ref(data.value);

// Format closing date for each job for table display
const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

// Prepare data for display in DataTable
jobs.value.forEach((job) => {
    job.closing_date = formatDate(job.closing_date);
});

// Search functionality
const searchQuery = ref("");
const filteredJobs = computed(() => {
    if (!searchQuery.value) return jobs.value;

    const query = searchQuery.value.toLowerCase();
    return jobs.value.filter(
        (job) =>
            job.title.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            job.position.position_name.toLowerCase().includes(query),
    );
});

// Modal state
const showAddModal = ref(false);
const showEditModal = ref(false);
const selectedPosition = ref(null);

const handlePositionSelect = (option) => {
    selectedPosition.value = option;
};

// Modified new job form data
const newJob = ref({
    position_id: null,
    title: "",
    description: "",
    closing_date: "",
    status: "Draft",
    category: "",
});

// Add these to your script setup section
const editingJob = ref({
    job_listing_id: null,
    position_id: null,
    title: "",
    description: "",
    closing_date: "",
    status: "Draft",
    category: "",
});

const editJob = (job) => {
    editingJob.value = { ...job };
    // Format the date for the input
    editingJob.value.closing_date = job.closing_date.split("T")[0];
    selectedPosition.value = positions.value.find(
        (p) => p.position_id === job.position_id,
    );
    showEditModal.value = true;
};

const errors = ref({});

const updateJob = () => {
    // Clear previous errors
    errors.value = {};

    axios
        .put(
            `/job-listing/${editingJob.value.job_listing_id}`,
            editingJob.value,
        )
        .then((response) => {
            jobs.value = response.data;

            // Format dates for display
            jobs.value.forEach((job) => {
                job.closing_date = formatDate(job.closing_date);
            });

            // Close modal and reset form
            showEditModal.value = false;
            editingJob.value = {
                job_listing_id: null,
                position_id: null,
                title: "",
                description: "",
                status: "Active",
                category: "",
            };

            showSuccessAlert("update");
        })
        .catch((error) => {
            if (error.response && error.response.status === 422) {
                // Store validation errors
                errors.value = error.response.data.errors;
            }
            console.error("Error updating job listing:", error);
        });
};

// Methods
const saveJob = () => {
    // Clear previous errors
    errors.value = {};

    const jobToAdd = {
        position_id: newJob.value.position_id,
        title: newJob.value.title,
        description: newJob.value.description,
        closing_date: newJob.value.closing_date,
        status: newJob.value.status,
        category: newJob.value.category,
        created_by: usePage().props.auth.user.id,
    };

    axios
        .post("job-listing", jobToAdd)
        .then((response) => {
            jobs.value = response.data;

            // Format dates for display
            jobs.value.forEach((job) => {
                job.closing_date = formatDate(job.closing_date);
            });

            // Reset form and close modal
            resetForm();
            // Close Add Modal
            showAddModal.value = false;
            showSuccessAlert("add");
        })
        .catch((error) => {
            if (error.response && error.response.status === 422) {
                // Store validation errors
                errors.value = error.response.data.errors;
            }
            console.error("Error creating job listing:", error.response.data);
        });
};

const resetForm = () => {
    newJob.value = {
        position_id: null,
        title: "",
        description: "",
        closing_date: "",
        status: "Active",
        category: "",
    };
};

// Show success alert function
const showSuccessAlert = (action) => {
    let title;

    switch (action) {
        case "add":
            title = "Job Listing Added Successfully!";
            break;
        case "update":
            title = "Job Listing Updated Successfully!";
            break;
        case "delete":
            title = "Job Listing Deleted Successfully!";
            break;
        default:
            title = "Action Completed!";
    }

    // Using SweetAlert2 toast with custom styling
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: title,
        iconColor: "#ffffffff",
        showConfirmButton: false,
        timer: 3000, // Toast will disappear after 3 seconds
        toast: true, // Enable toast mode
        color: "#ffffff",
        background: "#22c55e",
    });
};

const deleteJob = (jobId) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .delete(`job-listing/${jobId}`)
                .then(() => {
                    jobs.value = jobs.value.filter(
                        (job) => job.job_listing_id !== jobId,
                    );

                    showSuccessAlert("delete");
                })
                .catch((error) => {
                    console.error("Error deleting job listing:", error);
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Error!",
                        text: "Failed to delete job listing.",
                        showConfirmButton: false,
                        timer: 3000,
                        toast: true,
                        customClass: {
                            popup: "bg-red-500 text-white",
                        },
                    });
                });
        }
    });
};

const clearErrors = () => {
    errors.value = {};
};

// Add proper watchers for newJob and editingJob position_id
watch(
    () => newJob.position_id,
    (newValue) => {
        if (newValue) {
            const position = positions.value.find(
                (p) => p.position_id === newValue,
            );
            if (position) {
                selectedPosition.value = position;
            }
        }
    },
);

watch(
    () => editingJob.position_id,
    (newValue) => {
        if (newValue) {
            const position = positions.value.find(
                (p) => p.position_id === newValue,
            );
            if (position) {
                selectedPosition.value = position;
            }
        }
    },
);

// Also add a watcher for selectedPosition
watch(
    () => selectedPosition.value,
    (newVal) => {
        console.log("selectedPosition changed:", newVal);
    },
    { deep: true },
);
</script>

<style>
/* Adding utility classes */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
