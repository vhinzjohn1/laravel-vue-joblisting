<template>
    <Head title="Manage Eligibility" />
    <component :is="layouts[userRole]">
        <template #header>
            <Header title="Manage Eligibility" />
        </template>
        <div>
            <div class="p-4 mt-4 bg-white rounded-lg shadow-md">
                <div
                    class="flex flex-col justify-between items-center sm:flex-row"
                >
                    <h1
                        class="mb-4 text-2xl font-bold tracking-wider uppercase sm:mb-0"
                    >
                        Manage Eligibility
                    </h1>
                    <PrimaryButton @click="showAddModal = true"
                        >Add Eligibility</PrimaryButton
                    >
                </div>
            </div>
            <div class="mt-3 max-w-full">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <div
                            v-if="eligibilities.length === 0"
                            class="py-8 text-center text-gray-500"
                        >
                            No eligibilities found, please add one to proceed
                        </div>

                        <div v-else class="space-y-4">
                            <DataTable
                                :data="eligibilities"
                                :columns="[
                                    {
                                        key: 'eligibility_id',
                                        title: 'Eligibility ID',
                                        hidden: true,
                                    },
                                    {
                                        key: 'eligibility_name',
                                        title: 'Eligibility Name',
                                    },
                                    {
                                        key: 'eligibility_description',
                                        title: 'Description',
                                    },
                                    {
                                        key: 'eligibility_type',
                                        title: 'Type',
                                    },
                                ]"
                                @edit="showEdit"
                                @delete="deleteEligibility"
                            />
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal For Adding Eligibility -->
        <Modal
            :show="showAddModal"
            @close="closeModal('add')"
            maxWidth="3xl"
            title="Create New Eligibility"
        >
            <form @submit.prevent="saveEligibility">
                <div class="p-10">
                    <div class="">
                        <!-- Left Column -->
                        <div
                            class="p-6 bg-white rounded-lg border border-gray-200"
                        >
                            <h4
                                class="pb-2 mb-4 text-lg font-medium text-gray-800 border-b"
                            >
                                Eligibility Details
                            </h4>
                            <div class="space-y-4">
                                <div class="form-group">
                                    <label
                                        for="name"
                                        class="block mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Eligibility Name
                                    </label>
                                    <TextInput
                                        id="name"
                                        v-model="form.eligibility_name"
                                        placeholder="Enter eligibility name"
                                        required
                                        autofocus
                                        class="w-full"
                                    />
                                </div>
                                <div class="form-group">
                                    <label
                                        for="description"
                                        class="block mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        v-model="form.eligibility_description"
                                        placeholder="Enter description"
                                        class="w-full rounded border-gray-300 focus:border-green-700 focus:ring-green-700"
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div class="form-group">
                                    <label
                                        for="type"
                                        class="block mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Eligibility Type
                                    </label>
                                    <TextInput
                                        id="type"
                                        v-model="form.eligibility_type"
                                        placeholder="Enter eligibility type (e.g., Professional, Sub-Professional)"
                                        class="w-full"
                                    />
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
                            Save Eligibility
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </Modal>

        <!-- Modal For Editing Eligibility -->
        <Modal
            :show="showEditModal"
            @close="closeModal('edit')"
            maxWidth="3xl"
            title="Edit Eligibility"
        >
            <form @submit.prevent="editEligibility">
                <div class="p-10">
                    <div class="">
                        <!-- Left Column -->
                        <div
                            class="p-6 bg-white rounded-lg border border-gray-200"
                        >
                            <h4
                                class="pb-2 mb-4 text-lg font-medium text-gray-800 border-b"
                            >
                                Eligibility Details
                            </h4>
                            <div class="space-y-4">
                                <div class="form-group">
                                    <label
                                        for="edit_name"
                                        class="block mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Eligibility Name
                                    </label>
                                    <TextInput
                                        id="edit_name"
                                        v-model="form.eligibility_name"
                                        placeholder="Enter eligibility name"
                                        required
                                        autofocus
                                        class="w-full"
                                    />
                                </div>
                                <div class="form-group">
                                    <label
                                        for="edit_description"
                                        class="block mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="edit_description"
                                        v-model="form.eligibility_description"
                                        placeholder="Enter description"
                                        class="w-full rounded border-gray-300 focus:border-green-700 focus:ring-green-700"
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div class="form-group">
                                    <label
                                        for="edit_type"
                                        class="block mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Eligibility Type
                                    </label>
                                    <TextInput
                                        id="edit_type"
                                        v-model="form.eligibility_type"
                                        placeholder="Enter eligibility type (e.g., Professional, Sub-Professional)"
                                        class="w-full"
                                    />
                                </div>
                            </div>
                            <div v-if="form.errors.eligibility_name" class="text-red-500 text-sm mt-1">
                                {{ form.errors.eligibility_name }}
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
                            Update Eligibility
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

const eligibilities = ref(page.props.eligibilities.data);
const links = ref(page.props.eligibilities.links);


const form = useForm({
    eligibility_name: "",
    eligibility_description: "",
    eligibility_type: "",
    eligibility_id: "",
});

const showAddModal = ref(false);
const showEditModal = ref(false);

const saveEligibility = () => {
    axios
        .post(route("eligibility.store"), form)
        .then((response) => {
            eligibilities.value = response.data.data;
            links.value = response.data.links;
            showAddModal.value = false;
            form.reset();
            showToast("add", true);
        })
        .catch((error) => {
            console.error(error);
            showToast("add", false, error.response.data.errors.eligibility_name[0]);
        });
};

const showEdit = (item) => {
    form.eligibility_id = item.eligibility_id;
    form.eligibility_name = item.eligibility_name;
    form.eligibility_description = item.eligibility_description;
    form.eligibility_type = item.eligibility_type;
    showEditModal.value = true;
};

const editEligibility = () => {
    axios
        .put(`/eligibility/${form.eligibility_id}`, form)
        .then((response) => {
            eligibilities.value = response.data.data;
            links.value = response.data.links;
            showEditModal.value = false;
            form.reset();
            showToast("edit", true);
        })
        .catch((error) => {
            console.error(error);
            showToast("edit", false, error.response.data.errors.eligibility_name[0]);
        });
};

const deleteEligibility = (eligibility) => {
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
                .delete(`eligibility/${eligibility.eligibility_id}`)
                .then((response) => {
                    eligibilities.value = response.data.data;
                    links.value = response.data.links;
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
                ? "Eligibility Added Successfully!"
                : "Failed to Add Eligibility.";
            break;
        case "edit":
            title = isSuccess
                ? "Eligibility Updated Successfully!"
                : "Failed to Update Eligibility.";
            break;
        case "delete":
            title = isSuccess
                ? "Eligibility Deleted Successfully!"
                : "Failed to Delete Eligibility.";
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
