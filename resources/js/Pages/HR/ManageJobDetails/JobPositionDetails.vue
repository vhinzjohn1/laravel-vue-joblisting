<template>
    <Head title="Job Position Details" />
    <component :is="layouts[userRole]">
        <template #header>
            <Header title="Job Position Details" />
        </template>
        <div>
            <div class="p-4 mt-4 bg-white rounded-lg shadow-md">
                <div class="flex flex-col justify-between items-center sm:flex-row">
                    <h1
                        class="mb-4 text-2xl font-bold tracking-wider uppercase sm:mb-0"
                    >
                        Job Position Details
                    </h1>
                    <PrimaryButton  @click="showAddModal = true">Add Position</PrimaryButton>
                </div>
            </div>
            <div class="mt-3 max-w-full">
                    <div
                        class="overflow-hidden bg-white shadow-sm sm:rounded-lg"
                    >
                        <div class="p-6 text-gray-900">


                            <div
                                v-if="localJobPosition.length === 0"
                                class="py-8 text-center text-gray-500"
                            >
                                No job positions found, please add one to
                                proceed
                            </div>

                            <div v-else class="space-y-4">
                                <DataTable
                                    :data="localJobPosition"
                                    :columns="[
                                        {
                                            key: 'position_id',
                                            title: 'Position ID',
                                            hidden: true,
                                        },
                                        {
                                            key: 'position_name',
                                            title: 'Position Name',
                                        },
                                        {
                                            key: 'item_number',
                                            title: 'Item Number',
                                        },
                                        {
                                            key: 'category',
                                            title: 'Category',
                                        },
                                        {
                                            key: 'employment_type',
                                            title: 'Employment Type',
                                        },
                                        {
                                            key: 'salary_grade.salary_grade',
                                            title: 'Salary Grade',
                                        },
                                        {
                                            key: 'minimum_requirement.education_level',
                                            title: 'Education',
                                        },
                                        {
                                            key: 'minimum_requirement.years_experience',
                                            title: 'Years Experience',
                                        },
                                        {
                                            key: 'minimum_requirement.training_hours',
                                            title: 'Training Hours',
                                        },
                                        {
                                            key: 'minimum_requirement.eligibility',
                                            title: 'Eligibility',
                                        },
                                    ]"
                                    @edit="showEdit"
                                    @delete="deleteJobPosition"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <!-- Modal For Adding Job Position with Minimum Requirements -->
        <Modal
        :show="showAddModal"
        @close="closeModal('add')"
        maxWidth="3xl"
        title="Create New Position"
        >
        <form @submit.prevent="saveJobPosition">
            <div class="p-10">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <!-- Left Column -->
                <div class="p-6 bg-white rounded-lg border border-gray-200">
                <h4 class="pb-2 mb-4 text-lg font-medium text-gray-800 border-b">
                    Position Details
                </h4>
                <div class="space-y-4">
                    <div class="form-group">
                    <label for="name" class="block mb-1 text-sm font-medium text-gray-700">
                        Position Name
                    </label>
                    <TextInput
                        id="name"
                        v-model="form.position_name"
                        placeholder="Enter position name"
                        required
                        autofocus
                        class="w-full"
                    />
                    </div>
                    <div class="form-group">
                    <label for="category" class="block mb-1 text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="category"
                        v-model="form.category"
                        required
                        placeholder="Enter category"
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="" disabled>Select Category</option>
                        <option value="Teaching">Teaching</option>
                        <option value="Non-Teaching">Non-Teaching</option>
                    </select>
                    </div>
                    <div class="form-group">
                    <label for="employment_type" class="block mb-1 text-sm font-medium text-gray-700">
                        Employment Type
                    </label>
                    <select
                        id="employment_type"
                        v-model="form.employment_type"
                        required
                        placeholder="Enter employment type"
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="" disabled>Select Employment Type</option>
                        <option value="Plantilla">Plantilla</option>
                        <option value="Contract of Service">Contract of Service</option>
                        <option value="Job Order">Job Order</option>
                    </select>
                    </div>
                    <div v-if="form.employment_type === 'Plantilla'" class="form-group">
                    <label for="item_number" class="block mb-1 text-sm font-medium text-gray-700">
                        Item Number
                    </label>
                    <TextInput
                        id="item_number"
                        v-model="form.item_number"
                        placeholder="Enter Item number"
                        required
                        class="w-full"
                    />
                    </div>
                    <div class="form-group">
                    <label for="salary_grade" class="block mb-1 text-sm font-medium text-gray-700">
                        Salary Grade (Optional)
                    </label>
                    <TextInput
                        id="salary_grade"
                        v-model="form.salary_grade"
                        placeholder="SG-1"
                        class="w-full uppercase"
                    />
                    </div>
                </div>
                </div>

                <!-- Right Column -->
                <div class="p-6 bg-white rounded-lg border border-gray-200">
                <h4 class="pb-2 mb-4 text-lg font-medium text-gray-800 border-b">
                    Minimum Requirements
                </h4>
                <div class="space-y-4">
                    <div class="form-group">
                    <label for="education_level" class="block mb-1 text-sm font-medium text-gray-700">
                        Education
                    </label>
                    <select
                        id="education_level"
                        v-model="form.education_level"
                        required
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="" disabled>Select Education</option>
                        <option value="Elementary Level">Elementary Level</option>
                        <option value="Elementary Graduate">Elementary Graduate</option>
                        <option value="High School Level">High School Level</option>
                        <option value="High School Graduate">High School Graduate</option>
                        <option value="College Level">College Level</option>
                        <option value="College Graduate">College Graduate</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="Doctorate Degree">Doctorate Degree</option>
                    </select>
                    </div>
                    <div class="form-group">
                    <label for="training_hours" class="block mb-1 text-sm font-medium text-gray-700">
                        Training (Hours)
                    </label>
                    <TextInput
                        id="training_hours"
                        v-model="form.training_hours"
                        placeholder="Training (Leave Empty if not required)"
                        class="w-full"
                    />
                    </div>
                    <div class="form-group">
                    <label for="years_experience" class="block mb-1 text-sm font-medium text-gray-700">
                        Years Of Experience
                    </label>
                    <TextInput
                        id="years_experience"
                        v-model="form.years_experience"
                        placeholder="Enter years of experience"
                        class="w-full"
                    />
                    </div>
                    <div class="form-group">
                    <label for="eligibility" class="block mb-1 text-sm font-medium text-gray-700">
                        Eligibility
                    </label>
                    <select
                        id="eligibility"
                        v-model="form.eligibility"
                        required
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="" disabled>Select Eligibility</option>
                        <option value="None">None</option>
                        <option value="Career Service (Professional)">
                        Career Service (Professional)
                        </option>
                        <option value="Career Service (Sub-Professional)">
                        Career Service (Sub-Professional)
                        </option>
                        <option value="RA 1080 (Board/Bar)">RA 1080 (Board/Bar)</option>
                        <option value="PD 907">PD 907</option>
                    </select>
                    </div>
                </div>
                </div>
            </div>

            <div class="flex gap-4 justify-end mt-6">
                <button
                type="button"
                @click="closeModal('add')"
                class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg transition-colors duration-200 hover:bg-gray-300"
                >
                Cancel
                </button>
                <PrimaryButton
                type="submit"
                :loading="form.processing"
                :disabled="form.processing"
                >
                Save Job Listing
                </PrimaryButton>
            </div>
            </div>
        </form>
        </Modal>

       <!-- Modal For Editing Job Position with Minimum Requirements -->
        <Modal
        :show="showEditModal"
        @close="closeModal('edit')"
        maxWidth="3xl"
        title="Edit Job Position"
        >
        <form @submit.prevent="editJobPosition">
            <div class="p-10">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <!-- Left Column -->
                <div class="p-6 bg-white rounded-lg border border-gray-200">
                <h4 class="pb-2 mb-4 text-lg font-medium text-gray-800 border-b">
                    Position Details
                </h4>
                <div class="space-y-4">
                    <div class="form-group">
                    <label for="edit_name" class="block mb-1 text-sm font-medium text-gray-700">
                        Position Name
                    </label>
                    <TextInput
                        id="edit_name"
                        v-model="form.position_name"
                        placeholder="Enter position name"
                        required
                        autofocus
                        class="w-full"
                    />
                    </div>
                    <div class="form-group">
                    <label for="category" class="block mb-1 text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="category"
                        v-model="form.category"
                        required
                        placeholder="Enter category"
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="" disabled>Select Category</option>
                        <option value="Teaching">Teaching</option>
                        <option value="Non-Teaching">Non-Teaching</option>
                    </select>
                    </div>
                    <div class="form-group">
                    <label for="employment_type" class="block mb-1 text-sm font-medium text-gray-700">
                        Employment Type
                    </label>
                    <select
                        id="employment_type"
                        v-model="form.employment_type"
                        required
                        placeholder="Enter employment type"
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="" disabled>Select Employment Type</option>
                        <option value="Plantilla">Plantilla</option>
                        <option value="Contract of Service">Contract of Service</option>
                        <option value="Job Order">Job Order</option>
                    </select>
                    </div>
                    <div v-if="form.employment_type === 'Plantilla'" class="form-group">
                    <label for="item_number" class="block mb-1 text-sm font-medium text-gray-700">
                        Item Number
                    </label>
                    <TextInput
                        id="item_number"
                        v-model="form.item_number"
                        placeholder="Enter Item number"
                        required
                        class="w-full"
                    />
                    </div>
                    <div class="form-group">
                    <label for="edit_salary_grade" class="block mb-1 text-sm font-medium text-gray-700">
                        Salary Grade (Optional)
                    </label>
                    <TextInput
                        id="edit_salary_grade"
                        v-model="form.salary_grade"
                        placeholder="SG-1"
                        class="w-full uppercase"
                    />
                    </div>
                </div>
                </div>

                <!-- Right Column -->
                <div class="p-6 bg-white rounded-lg border border-gray-200">
                <h4 class="pb-2 mb-4 text-lg font-medium text-gray-800 border-b">
                    Minimum Requirements
                </h4>
                <div class="space-y-4">
                    <div class="form-group">
                    <label for="edit_education_level" class="block mb-1 text-sm font-medium text-gray-700">
                        Education
                    </label>
                    <select
                        id="edit_education_level"
                        v-model="form.education_level"
                        required
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="" disabled>Select Education</option>
                        <option value="Elementary Level">Elementary Level</option>
                        <option value="Elementary Graduate">Elementary Graduate</option>
                        <option value="High School Level">High School Level</option>
                        <option value="High School Graduate">High School Graduate</option>
                        <option value="College Level">College Level</option>
                        <option value="College Graduate">College Graduate</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="Doctorate Degree">Doctorate Degree</option>
                    </select>
                    </div>
                    <div class="form-group">
                    <label for="edit_training_hours" class="block mb-1 text-sm font-medium text-gray-700">
                        Training (Hours)
                    </label>
                    <TextInput
                        id="edit_training_hours"
                        v-model="form.training_hours"
                        placeholder="Training (Leave Empty if not required)"
                        class="w-full"
                    />
                    </div>
                    <div class="form-group">
                    <label for="edit_years_experience" class="block mb-1 text-sm font-medium text-gray-700">
                        Years Of Experience
                    </label>
                    <TextInput
                        id="edit_years_experience"
                        v-model="form.years_experience"
                        placeholder="Enter years of experience"
                        class="w-full"
                    />
                    </div>
                    <div class="form-group">
                    <label for="edit_eligibility" class="block mb-1 text-sm font-medium text-gray-700">
                        Eligibility
                    </label>
                    <select
                        id="edit_eligibility"
                        v-model="form.eligibility"
                        required
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="" disabled>Select Eligibility</option>
                        <option value="None">None</option>
                        <option value="Career Service (Professional)">
                        Career Service (Professional)
                        </option>
                        <option value="Career Service (Sub-Professional)">
                        Career Service (Sub-Professional)
                        </option>
                        <option value="RA 1080 (Board/Bar)">RA 1080 (Board/Bar)</option>
                        <option value="PD 907">PD 907</option>
                    </select>
                    </div>
                </div>
                </div>
            </div>

            <div class="flex gap-4 justify-end mt-6">
                <button
                type="button"
                @click="closeModal('edit')"
                class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg transition-colors duration-200 hover:bg-gray-300"
                >
                Cancel
                </button>
                <PrimaryButton
                type="submit"
                :loading="form.processing"
                :disabled="form.processing"
                >
                Update Position
                </PrimaryButton>
            </div>
            </div>
        </form>
        </Modal>

    </component>
</template>

<script setup>
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import { Head } from "@inertiajs/vue3";
import Header from "@/Components/Header/Header.vue";
import { usePage } from "@inertiajs/vue3";
import { computed, ref } from "vue";
import DataTable from "@/Components/DataTable.vue";
import Modal from "@/Components/Modal.vue";
import TextInput from "@/Components/TextInput.vue";
import { useForm } from "@inertiajs/vue3";
import PrimaryButton from "@/Components/PrimaryButton.vue";

const page = usePage();
const userRole = computed(() => page.props.auth.user.role_name);

// Use HRLayout for both admin and HR roles
const layouts = {
    admin: HRLayout,
    hr: HRLayout,
};

const form = useForm({
    position_name: "",
    item_number: "",
    years_experience: "",
    salary_grade: "",
    position_id: "",
    category: "",
    employment_type: "",
    salary_grade_id: "",
    education_level: "Bachelor's degree",
    training_hours: "",
    eligibility: "None",
    minimum_requirement_id: "",
});

const showAddModal = ref(false);
const showEditModal = ref(false);

const localJobPosition = ref(page.props.positions || "");
console.log(page.props.positions);

const saveJobPosition = () => {
    form.post(route("job-position.store"), {
        onSuccess: () => {
            showAddModal.value = false;
            form.reset();
            localJobPosition.value = page.props.positions;
            showToast("add", true);
        },
        onError: (errors) => {
            console.error(errors);
            showToast("add", false, errors.message);
        }
    });
};

const showEdit = (item) => {
    form.position_name = item.position_name;
    form.item_number = item.item_number;
    form.salary_grade = item.salary_grade.salary_grade;
    form.position_id = item.position_id;
    form.salary_grade_id = item.salary_grade_id;
    form.category = item.category;
    form.employment_type = item.employment_type;

    // Add minimum requirement fields
    if (item.minimum_requirement) {
        form.education_level = item.minimum_requirement.education_level;
        form.training_hours = item.minimum_requirement.training_hours;
        form.eligibility = item.minimum_requirement.eligibility;
        form.years_experience = item.minimum_requirement.years_experience;
        form.minimum_requirement_id =
            item.minimum_requirement.minimum_requirement_id;
    }

    showEditModal.value = true;
};

const editJobPosition = () => {
    form.put(route("job-position.update", form.position_id), {
        onSuccess: () => {
            showEditModal.value = false;
            form.reset();
            localJobPosition.value = page.props.positions;
            showToast("edit", true);
        },
        onError: (errors) => {
            console.error(errors);
            showToast("edit", false, errors.message);
        }
    });
};

const deleteJobPosition = (jobPosition) => {
    // Show Toast confirmation
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
                .delete(`job-position/${jobPosition.position_id}`)
                .then((response) => {
                    localJobPosition.value = response.data.data;
                    showToast("delete", true);
                })
                .catch((error) => {
                    console.error(error.message);
                    showToast("delete", false);
                });
        }
    });
};

const closeModal = (action) => {
    if (action === "add") {
        showAddModal.value = false;
    } else if (action === "edit") {
        showEditModal.value = false;
        form.reset();
    }
};

const showToast = (action, isSuccess = true, message = "") => {
    let title, icon, background, toastOptions;

    switch (action) {
        case "add":
            title = isSuccess
                ? "Job Position Added Successfully!"
                : "Failed to Add Job Position.";
            break;
        case "edit":
            title = isSuccess
                ? "Job Position Updated Successfully!"
                : "Failed to Update Job Position.";
            break;
        case "delete":
            title = isSuccess
                ? "Job Position Deleted Successfully!"
                : "Failed to Delete Job Position.";
            break;
        default:
            title = isSuccess ? "Action Completed!" : "Action Failed!";
            break;
    }

    icon = isSuccess ? "success" : "error";
    background = isSuccess ? "#22c55e" : "#ef4444";

    toastOptions = {
        position: "top-end",
        icon: icon,
        title: title,
        iconColor: "#ffffff",
        showCloseButton: true,
        showConfirmButton: false,
        timer: 3000, // Toast will disappear after 3 seconds
        toast: true, // Enable toast mode
        color: "#ffffff",
        background: background,
    };

    if (message) {
        toastOptions.text = message;
    }

    // Using SweetAlert2 toast with custom styling
    Swal.fire(toastOptions);
};
</script>
