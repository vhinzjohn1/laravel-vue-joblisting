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
                                    <div class="relative w-full">
                                        <TextInput
                                            v-model="searchQuery"
                                            class="w-full rounded-r-none"
                                            placeholder="Search job listings..."
                                        />
                                    </div>
                                    <button
                                        class="px-4 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"
                                    >
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                            <button
                                class="btn px-2 bg-green-800 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center"
                                @click="showAddModal = true"
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
                                            class="flex-shrink-0 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                                            style="width: 56px; height: 56px"
                                        >
                                            <span
                                                class="text-green-600 font-semibold text-lg"
                                            >
                                                {{
                                                    job.position.position_name.substring(
                                                        0,
                                                        2,
                                                    )
                                                }}
                                            </span>
                                        </div>

                                        <!-- Title and Position -->
                                        <div class="flex-1">
                                            <h5
                                                class="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-800 transition-colors"
                                            >
                                                {{ job.title }}
                                            </h5>
                                            <div
                                                class="flex items-center gap-2 text-sm"
                                            >
                                                <span class="text-gray-600">{{
                                                    job.position.position_name
                                                }}</span>
                                                <span class="text-gray-300"
                                                    >•</span
                                                >
                                                <span
                                                    class="inline-flex items-center gap-1.5"
                                                >
                                                    <span
                                                        class="inline-block w-2.5 h-2.5 rounded-full"
                                                        :class="{
                                                            'bg-green-500':
                                                                job.status ===
                                                                'Active',
                                                            'bg-yellow-500':
                                                                job.status ===
                                                                'Draft',
                                                            'bg-red-500':
                                                                job.status ===
                                                                'Closed',
                                                        }"
                                                    ></span>
                                                    <span
                                                        :class="{
                                                            'text-green-600':
                                                                job.status ===
                                                                'Active',
                                                            'text-yellow-600':
                                                                job.status ===
                                                                'Draft',
                                                            'text-red-600':
                                                                job.status ===
                                                                'Closed',
                                                        }"
                                                        >{{ job.status }}</span
                                                    >
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Content Section -->
                                    <div class="flex-grow">
                                        <!-- Tags -->
                                        <div class="flex flex-wrap gap-2 mb-4">
                                            <span
                                                class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-900 group-hover:bg-green-100 transition-colors"
                                            >
                                                &#x20B1;{{
                                                    job.position.salary_grade.amount.toLocaleString()
                                                }}
                                            </span>
                                            <span
                                                class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 group-hover:bg-gray-100 transition-colors"
                                            >
                                                {{
                                                    job.position
                                                        .minimum_requirement
                                                        .years_experience
                                                }}+ years
                                            </span>
                                        </div>

                                        <!-- Minimum Requirements -->
                                        <div
                                            v-if="
                                                job.position.minimum_requirement
                                            "
                                            class="mb-4"
                                        >
                                            <h6
                                                class="text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Minimum Requirements:
                                            </h6>
                                            <ul
                                                class="list-disc list-inside text-sm text-gray-600 space-y-1"
                                            >
                                                <li
                                                    v-if="
                                                        job.position
                                                            .minimum_requirement
                                                            .education_level
                                                    "
                                                >
                                                    Education:
                                                    {{
                                                        job.position
                                                            .minimum_requirement
                                                            .education_level
                                                    }}
                                                </li>
                                                <li
                                                    v-if="
                                                        job.position
                                                            .minimum_requirement
                                                            .eligibility
                                                    "
                                                >
                                                    Eligibility:
                                                    {{
                                                        job.position
                                                            .minimum_requirement
                                                            .eligibility
                                                    }}
                                                </li>
                                                <li
                                                    v-if="
                                                        job.position
                                                            .minimum_requirement
                                                            .training_hours
                                                    "
                                                >
                                                    Training:
                                                    {{
                                                        job.position
                                                            .minimum_requirement
                                                            .training_hours
                                                    }}
                                                    hours
                                                </li>
                                                <li
                                                    v-if="
                                                        job.position
                                                            .minimum_requirement
                                                            .years_experience
                                                    "
                                                >
                                                    Experience:
                                                    {{
                                                        job.position
                                                            .minimum_requirement
                                                            .years_experience
                                                    }}
                                                    year(s)
                                                </li>
                                            </ul>
                                        </div>

                                        <!-- Description -->
                                        <p
                                            class="text-gray-600 text-sm leading-relaxed line-clamp-3"
                                        >
                                            {{ job.description }}
                                        </p>
                                    </div>

                                    <!-- Footer Section -->
                                    <div
                                        class="mt-6 pt-4 border-t border-gray-50"
                                    >
                                        <div
                                            class="flex items-center justify-between"
                                        >
                                            <div class="flex gap-2">
                                                <button
                                                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                                                    @click="editJob(job)"
                                                >
                                                    <i
                                                        class="fas fa-edit mr-2"
                                                    ></i>
                                                    Edit
                                                </button>
                                                <Link
                                                    :href="
                                                        route(
                                                            'selection-lineup.show',
                                                            job.job_listing_id,
                                                        )
                                                    "
                                                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 hover:text-green-900 transition-all duration-200"
                                                >
                                                    <i
                                                        class="fas fa-users mr-2"
                                                    ></i>
                                                    Lineup
                                                </Link>
                                            </div>
                                            <button
                                                class="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200"
                                                @click="
                                                    deleteJob(
                                                        job.job_listing_id,
                                                    )
                                                "
                                            >
                                                <i
                                                    class="fas fa-trash-alt mr-2"
                                                ></i>
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
                                    @update:modelValue="handlePositionSelect"
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
                                    <TextInput
                                        :value="
                                            selectedPosition?.salary_grade
                                                ?.amount
                                                ? `₱${selectedPosition.salary_grade.amount.toLocaleString()}`
                                                : ''
                                        "
                                        disabled
                                        class="bg-gray-50"
                                    />
                                </div>

                                <!-- Item Number -->
                                <div class="form-group">
                                    <label
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Item Number
                                    </label>
                                    <TextInput
                                        :value="
                                            selectedPosition?.item_number || ''
                                        "
                                        disabled
                                        class="bg-gray-50"
                                    />
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
                <div class="border-t p-4 flex gap-2 justify-end">
                    <!-- Cancel Button -->
                    <button
                        type="button"
                        class="btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                        @click="showAddModal = false"
                    >
                        Cancel
                    </button>

                    <!-- Save Button -->
                    <button
                        type="submit"
                        class="btn px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors"
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
                                    @update:modelValue="handlePositionSelect"
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
                                    <TextInput
                                        :value="
                                            selectedPosition?.salary_grade
                                                ?.amount
                                                ? `₱${selectedPosition.salary_grade.amount.toLocaleString()}`
                                                : ''
                                        "
                                        disabled
                                        class="bg-gray-50"
                                    />
                                </div>

                                <!-- Item Number -->
                                <div class="form-group">
                                    <label
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Item Number
                                    </label>
                                    <TextInput
                                        :value="
                                            selectedPosition?.item_number || ''
                                        "
                                        disabled
                                        class="bg-gray-50"
                                    />
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
                <div class="border-t p-4 flex gap-2 justify-end">
                    <button
                        type="button"
                        class="btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                        @click="showEditModal = false"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="btn px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Update Job Listing
                    </button>
                </div>
            </form>
        </Modal>
    </HRLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import { useForm, usePage, Head } from "@inertiajs/vue3";
import TextInput from "@/Components/TextInput.vue";
import CustomSelect from "@/Components/CustomSelect.vue";
import TextArea from "@/Components/TextArea.vue";
import Modal from "@/Components/Modal.vue";
import { Link } from "@inertiajs/vue3";

// Fetching Props that was sent by controller
const data = ref(usePage().props.jobListings);
const positions = ref(usePage().props.positions);

console.log("this is the props: ", usePage().props);

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

// Modal state
const showAddModal = ref(false);
const showEditModal = ref(false);
const selectedPosition = ref(null);

const handlePositionSelect = (positionId) => {
    selectedPosition.value = positions.value.find(
        (p) => p.position_id === positionId,
    );
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
            console.log("Response from API: ", response.data);
            jobs.value = response.data;

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
