<template>
    <Head title="Job Position Details" />
    <component :is="layouts[userRole]">
        <template #header>
            <Header title="Job Position Details" />
        </template>

        <div>
            <div class="py-12">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div
                        class="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                    >
                        <div class="p-6 text-gray-900">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-lg font-semibold">
                                    Job Position
                                </h3>
                                <button
                                    @click="showAddModal = true"
                                    class="px-4 py-2 bg-[#0e4e25] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200 sm:px-6 sm:py-3 md:px-8 md:py-4"
                                >
                                    Add Job Position
                                </button>
                            </div>

                            <div
                                v-if="localJobPosition.length === 0"
                                class="text-center py-8 text-gray-500"
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
                                            key: 'minimum_requirement.years_experience',
                                            title: 'Year Experience',
                                        },
                                        {
                                            key: 'salary_grade.amount',
                                            title: 'Salary Grade',
                                            currency: '₱',
                                        },
                                        {
                                            key: 'minimum_requirement.education_level',
                                            title: 'Education',
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
        </div>

        <!-- Modal For Adding Job Position with Minimum Requirements -->
        <Modal
            :show="showAddModal"
            @close="closeModal('add')"
            maxWidth="3xl"
            title="Add Job Position"
        >
            <form @submit.prevent="saveJobPosition">
                <div class="p-10">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Left Column -->
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h4
                                class="font-medium text-gray-800 mb-3 text-lg border-b pb-2"
                            >
                                Position Details
                            </h4>
                            <div class="space-y-4">
                                <div class="form-group">
                                    <label
                                        for="name"
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Position Name</label
                                    >
                                    <TextInput
                                        id="name"
                                        v-model="form.position_name"
                                        required
                                        autofocus
                                        class="w-full"
                                    />
                                </div>
                                <div class="form-group">
                                    <label
                                        for="item_number"
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Item Number</label
                                    >
                                    <TextInput
                                        id="item_number"
                                        v-model="form.item_number"
                                        required
                                        class="w-full"
                                    />
                                </div>
                                <div class="form-group">
                                    <label
                                        for="amount"
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Salary Grade</label
                                    >
                                    <TextInput
                                        id="amount"
                                        isCurrency
                                        v-model="form.amount"
                                        required
                                        class="w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Right Column -->
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h4
                                class="font-medium text-gray-800 mb-3 text-lg border-b pb-2"
                            >
                                Minimum Requirements
                            </h4>
                            <div class="space-y-4">
                                <div class="form-group">
                                    <label
                                        for="education_level"
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Education Level</label
                                    >
                                    <select
                                        id="education_level"
                                        v-model="form.education_level"
                                        required
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="Bachelor's degree">
                                            Bachelor's degree
                                        </option>
                                        <option value="Master's degree">
                                            Master's degree
                                        </option>
                                        <option value="Doctorate degree">
                                            Doctorate degree
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label
                                        for="training_hours"
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Training (Hours)</label
                                    >
                                    <TextInput
                                        id="training_hours"
                                        v-model="form.training_hours"
                                        required
                                        class="w-full"
                                    />
                                </div>
                                <div class="form-group">
                                    <label
                                        for="years_experience"
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Years of Experience</label
                                    >
                                    <TextInput
                                        id="years_experience"
                                        v-model="form.years_experience"
                                        required
                                        class="w-full"
                                    />
                                </div>
                                <div class="form-group">
                                    <label
                                        for="eligibility"
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Eligibility</label
                                    >
                                    <select
                                        id="eligibility"
                                        v-model="form.eligibility"
                                        required
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="None">None</option>
                                        <option
                                            value="Career Service (Professional)"
                                        >
                                            Career Service (Professional)
                                        </option>
                                        <option
                                            value="Career Service (Sub-Professional)"
                                        >
                                            Career Service (Sub-Professional)
                                        </option>
                                        <option
                                            value="RA 1080 (Board/Bar/Court)"
                                        >
                                            RA 1080 (Board/Bar/Court)
                                        </option>
                                        <option value="PD 907">PD 907</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end gap-5 mt-6">
                        <button
                            type="button"
                            @click="closeModal('add')"
                            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </Modal>

        <!-- Modal for Editing Job Position Details -->
        <Modal
            :show="showEditModal"
            @close="closeModal('edit')"
            maxWidth="3xl"
            title="Edit Job Position"
        >
            <form @submit.prevent="editJobPosition">
                <div class="p-10">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Left Column -->
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h4
                                class="font-medium text-gray-800 mb-3 text-lg border-b pb-2"
                            >
                                Position Details
                            </h4>
                            <div class="space-y-4">
                                <div class="form-group">
                                    <label
                                        for="edit_name"
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Position Name</label
                                    >
                                    <TextInput
                                        id="edit_name"
                                        v-model="form.position_name"
                                        required
                                        autofocus
                                    />
                                </div>
                                <div class="form-group">
                                    <label
                                        for="edit_item_number"
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Item Number</label
                                    >
                                    <TextInput
                                        id="edit_item_number"
                                        v-model="form.item_number"
                                        required
                                    />
                                </div>
                                <div class="form-group">
                                    <label
                                        for="edit_amount"
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Salary Amount</label
                                    >
                                    <TextInput
                                        id="edit_amount"
                                        isCurrency
                                        v-model="form.amount"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Right Column -->
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h4
                                class="font-medium text-gray-800 mb-3 text-lg border-b pb-2"
                            >
                                Minimum Requirements
                            </h4>
                            <div class="space-y-4">
                                <div class="form-group">
                                    <label
                                        for="edit_education_level"
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Education Level</label
                                    >
                                    <select
                                        id="edit_education_level"
                                        v-model="form.education_level"
                                        required
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="Bachelor's degree">
                                            Bachelor's degree
                                        </option>
                                        <option value="Master's degree">
                                            Master's degree
                                        </option>
                                        <option value="Doctorate degree">
                                            Doctorate degree
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label
                                        for="edit_training_hours"
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Training (Hours)</label
                                    >
                                    <TextInput
                                        placeholder="3"
                                        id="edit_training_hours"
                                        v-model="form.training_hours"
                                        required
                                        class="w-full"
                                    />
                                </div>
                                <div class="form-group">
                                    <label
                                        for="edit_years_experience"
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Years of Experience</label
                                    >
                                    <TextInput
                                        placeholder="1"
                                        id="edit_years_experience"
                                        v-model="form.years_experience"
                                        required
                                        class="w-full"
                                    />
                                </div>
                                <div class="form-group">
                                    <label
                                        for="edit_eligibility"
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Eligibility</label
                                    >
                                    <select
                                        id="edit_eligibility"
                                        v-model="form.eligibility"
                                        required
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="None">None</option>
                                        <option
                                            value="Career Service (Professional)"
                                        >
                                            Career Service (Professional)
                                        </option>
                                        <option
                                            value="Career Service (Sub-Professional)"
                                        >
                                            Career Service (Sub-Professional)
                                        </option>
                                        <option
                                            value="RA 1080 (Board/Bar/Court)"
                                        >
                                            RA 1080 (Board/Bar/Court)
                                        </option>
                                        <option value="PD 907">PD 907</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end gap-5 mt-6">
                        <button
                            type="button"
                            @click="closeModal('edit')"
                            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    </component>
</template>

<script setup>
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import AdminLayout from "@/Layouts/Admin/AdminLayout.vue";
import { Head } from "@inertiajs/vue3";
import Header from "@/Components/Header/Header.vue";
import { usePage } from "@inertiajs/vue3";
import { computed, ref } from "vue";
import DataTable from "@/Components/DataTable.vue";
import Modal from "@/Components/Modal.vue";
import TextInput from "@/Components/TextInput.vue";
import { useForm } from "@inertiajs/vue3";

const page = usePage();
const userRole = computed(() => page.props.auth.user.role_name);

const layouts = {
    admin: AdminLayout,
    hr: HRLayout,
};

const form = useForm({
    position_name: "",
    item_number: "",
    years_experience: "",
    amount: "",
    position_id: "",
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
    axios
        .post(route("job-position.store"), form)
        .then((response) => {
            showAddModal.value = false;
            form.reset();
            localJobPosition.value = response.data.data;
            showToast("add", true);
        })
        .catch((error) => {
            console.error(error);
            showToast("add", false, error.response.data.message);
        });
};

const showEdit = (item) => {
    form.position_name = item.position_name;
    form.item_number = item.item_number;
    form.amount = item.salary_grade.amount;
    form.position_id = item.position_id;
    form.salary_grade_id = item.salary_grade_id;

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
    axios
        .put(route("job-position.update", form.position_id), form)
        .then((response) => {
            showEditModal.value = false;
            form.reset();
            localJobPosition.value = response.data.data;
            showToast("edit", true);
        })
        .catch((error) => {
            console.error(error);
            showToast("edit", false, error.response.data.message);
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
