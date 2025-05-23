<template>
    <Head title="Job Position Details" />
    <component :is="layouts[userRole]">
        <template #header>
            <Header title="Job Position Details" />
        </template>
        <div>
            <div class="p-4 mt-4 bg-white rounded-lg shadow-md">
                <div
                    class="flex flex-col justify-between items-center sm:flex-row"
                >
                    <h1
                        class="mb-4 text-2xl font-bold tracking-wider uppercase sm:mb-0"
                    >
                        Required Documents
                    </h1>
                    <PrimaryButton @click="showAddModal = true"
                        >Add Document</PrimaryButton
                    >
                </div>
            </div>
            <div class="mt-3 max-w-full">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <div
                            v-if="requiredDocuments.length === 0"
                            class="py-8 text-center text-gray-500"
                        >
                            No documents found, please add one to proceed
                        </div>

                        <div v-else class="space-y-4">
                            <DataTable
                                :data="requiredDocuments"
                                :columns="[
                                    {
                                        key: 'required_document_id',
                                        title: 'Required Document ID',
                                        hidden: true,
                                    },
                                    {
                                        key: 'document_name',
                                        title: 'Document Name',
                                    },
                                ]"
                                @edit="showEdit"
                                @delete="deleteDocument"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal For Adding Required Documents -->
        <Modal
            :show="showAddModal"
            @close="closeModal('add')"
            maxWidth="3xl"
            title="Create New Document"
        >
            <form @submit.prevent="saveDocument">
                <div class="p-10">
                    <div class="">
                        <!-- Left Column -->
                        <div
                            class="p-6 bg-white rounded-lg border border-gray-200"
                        >
                            <h4
                                class="pb-2 mb-4 text-lg font-medium text-gray-800 border-b"
                            >
                                Document Details
                            </h4>
                            <div class="space-y-4">
                                <div class="form-group">
                                    <label
                                        for="name"
                                        class="block mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Document Name
                                    </label>
                                    <TextInput
                                        id="name"
                                        v-model="form.document_name"
                                        placeholder="Enter document name"
                                        required
                                        autofocus
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
                            Save Document
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
            title="Edit Required Document"
        >
            <form @submit.prevent="editDocument">
                <div class="p-10">
                    <div class="">
                        <!-- Left Column -->
                        <div
                            class="p-6 bg-white rounded-lg border border-gray-200"
                        >
                            <h4
                                class="pb-2 mb-4 text-lg font-medium text-gray-800 border-b"
                            >
                                Required Document Details
                            </h4>
                            <div class="space-y-4">
                                <div class="form-group">
                                    <label
                                        for="edit_name"
                                        class="block mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Document Name
                                    </label>
                                    <TextInput
                                        id="edit_name"
                                        v-model="form.document_name"
                                        placeholder="Enter document name"
                                        required
                                        autofocus
                                        class="w-full"
                                    />
                                </div>
                            </div>
                            <div v-if="form.errors.document_name" class="text-red-500 text-sm mt-1">
                                {{ form.errors.document_name }}
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
                            Update Document
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



const requiredDocuments = ref(page.props.requiredDocuments);


const form = useForm({
    document_name: "",
    required_document_id: "",
});

const showAddModal = ref(false);
const showEditModal = ref(false);

const saveDocument = () => {
    axios
        .post(route("required-documents.store"), form)
        .then((response) => {
            requiredDocuments.value = response.data;
            showAddModal.value = false;
            form.reset();
            showToast("add", true);
        })
        .catch((error) => {
            console.error(error);
            showToast("add", false, error.response.data.errors.document_name[0]);
        });
};

const showEdit = (item) => {
    form.required_document_id = item.required_document_id;
    form.document_name = item.document_name;
    showEditModal.value = true;
};

const editDocument = () => {
    axios
        .put(`/required-documents/${form.required_document_id}`, form)
        .then((response) => {
            requiredDocuments.value = response.data;
            showEditModal.value = false;
            form.reset();
            showToast("edit", true);
        })
        .catch((error) => {
            console.error(error);
            showToast("edit", false, error.response.data.errors.document_name[0]);
        });
};

const deleteDocument = (document) => {
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
                .delete(`required-documents/${document.required_document_id}`)
                .then((response) => {
                    requiredDocuments.value = response.data;
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
                ? "Document Added Successfully!"
                : "Failed to Add Document.";
            break;
        case "edit":
            title = isSuccess
                ? "Document Updated Successfully!"
                : "Failed to Update Document.";
            break;
        case "delete":
            title = isSuccess
                ? "Document Deleted Successfully!"
                : "Failed to Delete Document.";
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
