<template>
    <HRLayout>
        <Head title="Job Listings" />
        <template #header>
            <Header title="Job Listings" />
        </template>

        <div class="py-5">
            <div class="container-fluid px-4">
                <div
                    class="card shadow-sm rounded-lg overflow-hidden bg-white mb-6"
                >
                    <div class="card-header bg-white py-4 px-4 border-b">
                        <div
                            class="flex flex-col md:flex-row justify-center items-center gap-3"
                        >
                            <div class="relative w-full md:w-1/2 max-w-xl">
                                <div class="flex">
                                    <input
                                        type="text"
                                        class="form-control block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search job listings..."
                                        v-model="searchQuery"
                                    />
                                    <button
                                        class="px-4 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"
                                    >
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                            <button
                                class="btn px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
                                data-toggle="modal"
                                data-target="#addModal"
                            >
                                <i class="fas fa-plus mr-2"></i> Add Job Listing
                            </button>
                        </div>
                    </div>
                    <div class="card-body p-4">
                        <div
                            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                        >
                            <!-- Job Listing Preview Cards -->
                            <div
                                v-for="(job, index) in filteredJobs"
                                :key="index"
                                class="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full"
                            >
                                <div class="p-6 flex flex-col h-full">
                                    <!-- Header Section -->
                                    <div class="flex items-start gap-4 mb-5">
                                        <!-- Position Icon -->
                                        <div
                                            class="flex-shrink-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                                            style="width: 56px; height: 56px"
                                        >
                                            <span class="text-blue-600 font-semibold text-lg">
                                                {{ job.position.position_name.substring(0, 2) }}
                                            </span>
                                        </div>

                                        <!-- Title and Position -->
                                        <div class="flex-1">
                                            <h5 class="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                                                {{ job.title }}
                                            </h5>
                                            <div class="flex items-center gap-2 text-sm">
                                                <span class="text-gray-600">{{ job.position.position_name }}</span>
                                                <span class="text-gray-300">•</span>
                                                <span class="inline-flex items-center gap-1.5">
                                                    <span
                                                        class="inline-block w-2.5 h-2.5 rounded-full"
                                                        :class="{
                                                            'bg-green-500': job.status === 'Active',
                                                            'bg-yellow-500': job.status === 'Draft',
                                                            'bg-red-500': job.status === 'Closed',
                                                        }"
                                                    ></span>
                                                    <span :class="{
                                                        'text-green-600': job.status === 'Active',
                                                        'text-yellow-600': job.status === 'Draft',
                                                        'text-red-600': job.status === 'Closed',
                                                    }">{{ job.status }}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Content Section -->
                                    <div class="flex-grow">
                                        <!-- Tags -->
                                        <div class="flex flex-wrap gap-2 mb-4">
                                            <span
                                                class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 group-hover:bg-blue-100 transition-colors"
                                            >
                                                ${{ job.position.salary_grade.amount.toLocaleString() }}
                                            </span>
                                            <span
                                                class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 group-hover:bg-gray-100 transition-colors"
                                            >
                                                {{ job.position.salary_grade.years_experience }}+ years
                                            </span>
                                        </div>

                                        <!-- Description -->
                                        <p class="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                            {{ job.description }}
                                        </p>
                                    </div>

                                    <!-- Footer Section -->
                                    <div class="mt-6 pt-4 border-t border-gray-50">
                                        <div class="flex items-center justify-between">
                                            <button
                                                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                                                @click="editJob(job)"
                                            >
                                                <i class="fas fa-edit mr-2"></i>
                                                Edit
                                            </button>
                                            <button
                                                class="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200"
                                                @click="deleteJob(job.job_listing_id)"
                                            >
                                                <i class="fas fa-trash-alt mr-2"></i>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Job Modal -->
        <div
            class="modal fade"
            id="addModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="addModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content rounded-lg">
                    <div class="modal-header bg-gray-50 px-5 py-4 border-b">
                        <h5
                            class="modal-title font-semibold text-gray-900 text-lg"
                            id="addModalLabel"
                        >
                            Create New Job Listing
                        </h5>
                        <button
                            type="button"
                            class="btn-close text-gray-500 hover:text-gray-700"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body p-5">
                        <form>
                            <!-- Basic Information Section -->
                            <div class="mb-6">
                                <h6
                                    class="font-semibold text-gray-800 mb-4 pb-2 border-b"
                                >
                                    Basic Information
                                </h6>
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    <div class="form-group">
                                        <label
                                            class="block text-sm font-medium text-gray-700 mb-1"
                                            for="position"
                                            >Position</label
                                        >
                                        <select
                                            class="form-control block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            id="position"
                                            v-model="newJob.position_id"
                                        >
                                            <option value="">
                                                Select a position
                                            </option>
                                            <option
                                                v-for="position in positions"
                                                :key="position.position_id"
                                                :value="position.position_id"
                                            >
                                                {{ position.position_name }} ({{
                                                    position.item_number
                                                }})
                                            </option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label
                                            class="block text-sm font-medium text-gray-700 mb-1"
                                            for="jobTitle"
                                            >Job Title</label
                                        >
                                        <input
                                            type="text"
                                            id="jobTitle"
                                            class="form-control block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            v-model="newJob.title"
                                        />
                                    </div>
                                </div>

                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
                                >
                                    <div class="form-group">
                                        <label
                                            class="block text-sm font-medium text-gray-700 mb-1"
                                            >Closing Date</label
                                        >
                                        <input
                                            type="date"
                                            class="form-control block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            v-model="newJob.closing_date"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label
                                            class="block text-sm font-medium text-gray-700 mb-1"
                                            >Applicant Limit</label
                                        >
                                        <input
                                            type="number"
                                            class="form-control block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            v-model="newJob.applicant_limit"
                                            min="1"
                                        />
                                    </div>
                                </div>

                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
                                >
                                    <div class="form-group">
                                        <label
                                            class="block text-sm font-medium text-gray-700 mb-1"
                                            >Status</label
                                        >
                                        <select
                                            class="form-control block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            v-model="newJob.status"
                                        >
                                            <option value="Active">
                                                Active
                                            </option>
                                            <option value="Draft">Draft</option>
                                            <option value="Closed">
                                                Closed
                                            </option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label
                                            class="block text-sm font-medium text-gray-700 mb-1"
                                            for="category"
                                            >Category</label
                                        >
                                        <select
                                            class="form-control block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            id="category"
                                            v-model="newJob.category_id"
                                        >
                                            <option value="">
                                                Select a category
                                            </option>
                                            <option
                                                v-for="category in categories"
                                                :key="category.category_id"
                                                :value="category.category_id"
                                            >
                                                {{ category.name }}
                                            </option>
                                        </select>
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
                                <div class="form-group">
                                    <label
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Description</label
                                    >
                                    <textarea
                                        class="form-control block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        rows="4"
                                        v-model="newJob.description"
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div
                        class="modal-footer border-t p-4 flex gap-2 justify-end"
                    >
                        <button
                            type="button"
                            class="btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                            data-dismiss="modal"
                            @click="showAddModal = false"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            class="btn px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            @click="saveJob"
                        >
                            Save Job Listing
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Job Modal -->
        <div
            class="modal fade"
            id="editModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="editModalLabel"
            aria-modal="true"
        >
            <div
                class="modal-dialog modal-xl"
                role="document"
            >
                <div class="modal-content rounded-lg">
                    <div class="modal-header bg-gray-50 px-5 py-4 border-b">
                        <h5
                            class="modal-title font-semibold text-gray-900 text-lg"
                            id="editModalLabel"
                        >
                            Edit Job Listing
                        </h5>
                        <button
                            type="button"
                            class="btn-close text-gray-500 hover:text-gray-700"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body p-5">
                        <form @submit.prevent="updateJob">
                            <!-- Basic Information Section -->
                            <div class="mb-6">
                                <h6 class="font-semibold text-gray-800 mb-4 pb-2 border-b">
                                    Basic Information
                                </h6>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="form-group">
                                        <label class="block text-sm font-medium text-gray-700 mb-1" for="editPosition">Position</label>
                                        <select
                                            class="form-control block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            id="editPosition"
                                            v-model="editingJob.position_id"
                                        >
                                            <option value="">Select a position</option>
                                            <option
                                                v-for="position in positions"
                                                :key="position.position_id"
                                                :value="position.position_id"
                                            >
                                                {{ position.position_name }} ({{ position.item_number }})
                                            </option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="block text-sm font-medium text-gray-700 mb-1" for="editJobTitle">Job Title</label>
                                        <input
                                            type="text"
                                            id="editJobTitle"
                                            class="form-control block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            v-model="editingJob.title"
                                        />
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div class="form-group">
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Closing Date</label>
                                        <input
                                            type="date"
                                            class="form-control block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            v-model="editingJob.closing_date"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Applicant Limit</label>
                                        <input
                                            type="number"
                                            class="form-control block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            v-model="editingJob.applicant_limit"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer border-t p-4 flex gap-2 justify-end">
                        <button
                            type="button"
                            class="btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                            data-dismiss="modal"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="btn px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Update Job Listing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </HRLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import { useForm, usePage, Head } from "@inertiajs/vue3";

// Fetching Props that was sent by controller
const data = ref(usePage().props.jobListings);
const positions = ref(usePage().props.positions);
const categories = ref(usePage().props.categories);
const salaryGrades = ref(usePage().props.salaryGrades);

// Modified job data structure to match database schema
const jobs = ref(data.value);

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

// Modified new job form data
const newJob = ref({
    position_id: null,
    title: "",
    description: "",
    closing_date: "",
    status: "Active",
    applicant_limit: 1,
    minimum_requirements: [],
    category_id: null,
});

// Add these to your script setup section
const editingJob = ref({
    job_listing_id: null,
    position_id: null,
    title: '',
    description: '',
    closing_date: '',
    status: 'Active',
    applicant_limit: 1,
    category_id: null,
});

const editJob = (job) => {
    editingJob.value = { ...job };
    // Format the date for the input
    editingJob.value.closing_date = job.closing_date.split('T')[0];
    $("#editModal").modal("show");
};

const updateJob = () => {
    axios.put(`/job-listing/${editingJob.value.job_listing_id}`, editingJob.value)
        .then((response) => {
            // Update the jobs list with the updated data
            const index = jobs.value.findIndex(job => job.job_listing_id === editingJob.value.job_listing_id);
            if (index !== -1) {
                jobs.value[index] = response.data;
            }

            // Close modal and reset form
            $("#editModal").modal("hide");
            editingJob.value = {
                job_listing_id: null,
                position_id: null,
                title: '',
                description: '',
                closing_date: '',
                status: 'Active',
                applicant_limit: 1,
                category_id: null,
            };
        })
        .catch((error) => {
            console.error("Error updating job listing:", error);
        });
};

// Methods
const saveJob = () => {
    const jobToAdd = {
        position_id: newJob.value.position_id,
        title: newJob.value.title,
        description: newJob.value.description,
        closing_date: newJob.value.closing_date,
        status: newJob.value.status,
        category_id: newJob.value.category_id,
        applicant_limit: newJob.value.applicant_limit,
        created_by: usePage().props.auth.user.id, // Assuming you have auth user info
    };

    // In a real application, you would call your API here
    axios
        .post("job-listing", jobToAdd)
        .then((response) => {
            console.log("Response from API: ", response.data);
            jobs.value = response.data;

            // Reset form and close modal
            resetForm();
            // Close Add Modal using jQuery
            $("#addModal").modal("hide");
        })
        .catch((error) => {
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
        applicant_limit: 1,
        minimum_requirements: [],
    };
};

const deleteJob = (jobId) => {
    axios
        .delete(`job-listing/${jobId}`)
        .then(() => {
            jobs.value = jobs.value.filter(
                (job) => job.job_listing_id !== jobId,
            );
        })
        .catch((error) => {
            console.error("Error deleting job listing:", error);
        });
};
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
