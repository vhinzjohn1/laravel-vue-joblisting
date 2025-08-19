<template>
    <HRLayout>
        <Head title="Batches" />
        <template #header>
            <Header title="Batches" />
        </template>

        <div>
            <Collapsible :initially-open="true">
                <template #header>
                    <div class="flex items-center justify-between w-full">
                        <h1 class="text-2xl font-bold uppercase tracking-wider">
                            Batches
                        </h1>
                        <div class="flex gap-2">
                            <PrimaryButton @click.stop="showAddBatchModal = true">
                                Add Batch
                            </PrimaryButton>
                        </div>
                    </div>
                </template>

                <div class="bg-white px-4 rounded-lg shadow-md">
                    <BatchCustomTable
                        :items="filteredBatches"
                        @edit="editBatch"
                        @delete="deleteBatch"
                        @bulk-archive="handleBulkArchiveBatches"
                        :show-delete="true"
                    />
                </div>
            </Collapsible>
        </div>

        <!-- Add Batch Modal -->
        <Modal
            :show="showAddBatchModal"
            @close="() => { showAddBatchModal = false; resetBatchForm(); }"
            title="Create New Batch"
            max-width="2xl"
        >
            <form @submit.prevent="createBatch">
                <div class="p-5">
                    <div class="grid grid-cols-1 gap-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Batch Name *
                                </label>
                                <TextInput v-model="newBatch.batch_name" required />
                            </div>
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Batch Code *
                                </label>
                                <TextInput v-model="newBatch.batch_code" required />
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Post Date *
                                </label>
                                <TextInput type="date" v-model="newBatch.post_date" required />
                            </div>
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Deadline *
                                </label>
                                <TextInput type="date" v-model="newBatch.deadline" required />
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Status *
                                </label>
                                <CustomSelect
                                    :options="[{ value: 'Active' }, { value: 'Draft' }, { value: 'Closed' }]"
                                    v-model="newBatch.status"
                                    :value-key="'value'"
                                    :display-format="(option) => option.value"
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Type *
                                </label>
                                <CustomSelect
                                    :options="[{ value: 1, label: 'Plantilla' }, { value: 0, label: 'Non-Plantilla' }]"
                                    v-model="newBatch.is_plantilla"
                                    :value-key="'value'"
                                    :display-format="(option) => option.label ?? (option.value ? 'Plantilla' : 'Non-Plantilla')"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end gap-4 mt-6 p-4 border-t">
                    <button
                        type="button"
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                        @click="showAddBatchModal = false"
                    >
                        Cancel
                    </button>
                    <PrimaryButton type="submit" :loading="isLoading" :disabled="isLoading">
                        Create Batch
                    </PrimaryButton>
                </div>
            </form>
        </Modal>

        <!-- Edit Batch Modal -->
        <Modal
            :show="showEditBatchModal"
            @close="() => { showEditBatchModal = false; resetBatchForm(); }"
            title="Edit Batch"
            max-width="2xl"
        >
            <form @submit.prevent="updateBatch">
                <div class="p-5">
                    <div class="grid grid-cols-1 gap-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Batch Name *
                                </label>
                                <TextInput v-model="editingBatch.batch_name" required />
                            </div>
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Batch Code *
                                </label>
                                <TextInput v-model="editingBatch.batch_code" required />
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Post Date *
                                </label>
                                <TextInput type="date" v-model="editingBatch.post_date" required />
                            </div>
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Deadline *
                                </label>
                                <TextInput type="date" v-model="editingBatch.deadline" required />
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Status *
                                </label>
                                <CustomSelect
                                    :options="[{ value: 'Active' }, { value: 'Draft' }, { value: 'Closed' }, { value: 'Archived' }]"
                                    v-model="editingBatch.status"
                                    :value-key="'value'"
                                    :display-format="(option) => option.value"
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Type *
                                </label>
                                <CustomSelect
                                    :options="[{ value: 1, label: 'Plantilla' }, { value: 0, label: 'Non-Plantilla' }]"
                                    v-model="editingBatch.is_plantilla"
                                    :value-key="'value'"
                                    :display-format="(option) => option.label ?? (option.value ? 'Plantilla' : 'Non-Plantilla')"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end gap-4 mt-6 p-4 border-t">
                    <button
                        type="button"
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                        @click="showEditBatchModal = false"
                    >
                        Cancel
                    </button>
                    <PrimaryButton type="submit" :loading="isLoading" :disabled="isLoading">
                        Update Batch
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    </HRLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { Head, usePage } from "@inertiajs/vue3";
import axios from "axios";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import TextInput from "@/Components/TextInput.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import CustomSelect from "@/Components/CustomSelect.vue";
import Modal from "@/Components/Modal.vue";
import Collapsible from "@/Components/Collapsible.vue";
import BatchCustomTable from "@/Components/BatchCustomTable.vue";

const batches = ref(usePage().props.batches || []);

const isLoading = ref(false);
const showAddBatchModal = ref(false);
const showEditBatchModal = ref(false);

const today = new Date();
const defaultBatchCode = ref(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-PL`);

const newBatch = ref({
    batch_name: '',
    batch_code: defaultBatchCode.value,
    post_date: '',
    deadline: '',
    status: 'Active',
    is_plantilla: true,
});

const editingBatch = ref({
    batch_id: null,
    batch_name: '',
    batch_code: '',
    post_date: '',
    deadline: '',
    status: 'Active',
    is_plantilla: true,
});

const searchQuery = ref("");

const filteredBatches = computed(() => {
    if (!batches.value || !Array.isArray(batches.value)) return [];
    if (!searchQuery.value) return batches.value;
    const query = searchQuery.value.toLowerCase();
    return batches.value.filter((batch) =>
        batch.batch_name.toLowerCase().includes(query) ||
        batch.batch_code.toLowerCase().includes(query)
    );
});

const createBatch = () => {
    isLoading.value = true;
    axios
        .post(route('batches.store'), newBatch.value)
        .then((response) => {
            batches.value = response.data;
            showAddBatchModal.value = false;
            resetBatchForm();
            showSuccessAlert('add', 'Batch');
        })
        .catch((error) => {
            console.error('Error creating batch:', error);
            let errorMessage = "Failed to create batch.";
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                errorMessage = Object.values(validationErrors).flat().join('\n');
            } else if (error.message) {
                errorMessage = error.message;
            }
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: errorMessage,
                showConfirmButton: false,
                timer: 5000,
                toast: true,
                customClass: { popup: "bg-red-500 text-white" },
            });
        })
        .finally(() => {
            isLoading.value = false;
        });
};

const editBatch = (batch) => {
    editingBatch.value = { ...batch };
    editingBatch.value.post_date = batch.post_date ? batch.post_date.split('T')[0] : '';
    editingBatch.value.deadline = batch.deadline ? batch.deadline.split('T')[0] : '';
    showEditBatchModal.value = true;
};

const updateBatch = () => {
    isLoading.value = true;
    const batchData = {
        batch_name: editingBatch.value.batch_name,
        batch_code: editingBatch.value.batch_code,
        post_date: editingBatch.value.post_date,
        deadline: editingBatch.value.deadline,
        status: editingBatch.value.status,
        is_plantilla: editingBatch.value.is_plantilla,
    };

    axios
        .put(route('batches.update', editingBatch.value.batch_id), batchData)
        .then((response) => {
            batches.value = response.data;
            showEditBatchModal.value = false;
            resetBatchForm();
            showSuccessAlert('update', 'Batch');
        })
        .catch((error) => {
            console.error('Error updating batch:', error);
            let errorMessage = "Failed to update batch.";
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                errorMessage = Object.values(validationErrors).flat().join('\n');
            } else if (error.message) {
                errorMessage = error.message;
            }
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: errorMessage,
                showConfirmButton: false,
                timer: 5000,
                toast: true,
                customClass: { popup: "bg-red-500 text-white" },
            });
        })
        .finally(() => {
            isLoading.value = false;
        });
};

const deleteBatch = (items) => {
    const itemsToDelete = Array.isArray(items) ? items : [items];

    Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this! ${itemsToDelete.length > 1 ? `(${itemsToDelete.length} items selected)` : ''}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            isLoading.value = true;

            const requestData = itemsToDelete.length > 1
                ? { batch_ids: itemsToDelete.map((item) => item.batch_id) }
                : null;

            const requestConfig = itemsToDelete.length > 1
                ? { data: requestData }
                : {};

            axios
                .delete(
                    itemsToDelete.length > 1
                        ? route('batches.destroy', 'bulk')
                        : route('batches.destroy', itemsToDelete[0].batch_id),
                    requestConfig
                )
                .then((response) => {
                    batches.value = response.data;
                    showSuccessAlert('delete', itemsToDelete.length > 1 ? 'Batches' : 'Batch');
                })
                .catch((error) => {
                    console.error('Error deleting batch(es):', error);
                    let errorMessage = itemsToDelete.length > 1 ? 'Failed to delete batches.' : 'Failed to delete batch.';
                    if (error.response && error.response.data && error.response.data.message) {
                        errorMessage = error.response.data.message;
                    }
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Error!",
                        text: errorMessage,
                        showConfirmButton: false,
                        timer: 3000,
                        toast: true,
                        customClass: { popup: "bg-red-500 text-white" },
                    });
                })
                .finally(() => {
                    isLoading.value = false;
                });
        }
    });
};

const handleBulkArchiveBatches = (selectedBatches) => {
    Swal.fire({
        title: 'Archive Batches',
        text: 'Are you sure you want to archive these batches? This will also hide all job listings within them.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, archive them!'
    }).then((result) => {
        if (result.isConfirmed) {
            isLoading.value = true;
            Promise.all(
                selectedBatches.map((batch) =>
                    axios.put(route('batches.update', batch.batch_id), {
                        ...batch,
                        status: 'Archived',
                    })
                )
            )
                .then((responses) => {
                    const lastResponse = responses[responses.length - 1];
                    batches.value = lastResponse.data;
                    showSuccessAlert('archive', 'Batches');
                })
                .catch((error) => {
                    console.error('Error archiving batches:', error);
                    let errorMessage = 'Failed to archive batches.';
                    if (error.response?.data?.message) {
                        errorMessage = error.response.data.message;
                    }
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Error!",
                        text: errorMessage,
                        showConfirmButton: false,
                        timer: 3000,
                        toast: true,
                        customClass: { popup: "bg-red-500 text-white" },
                    });
                })
                .finally(() => {
                    isLoading.value = false;
                });
        }
    });
};

const resetBatchForm = () => {
    newBatch.value = {
        batch_name: '',
        batch_code: defaultBatchCode.value,
        post_date: '',
        deadline: '',
        status: 'Active',
        is_plantilla: true,
    };
};

const showSuccessAlert = (action, type) => {
    let title;
    switch (action) {
        case 'add':
            title = type ? `${type} Added Successfully!` : `Added Successfully!`;
            break;
        case 'update':
            title = type ? `${type} Updated Successfully!` : `Updated Successfully!`;
            break;
        case 'delete':
            title = type ? `${type} Deleted Successfully!` : `Deleted Successfully!`;
            break;
        case 'archive':
            title = type ? `${type} Archived Successfully!` : `Archived Successfully!`;
            break;
        default:
            title = 'Action Completed!';
    }
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: title,
        iconColor: '#ffffffff',
        showCloseButton: true,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        color: '#ffffff',
        background: '#22c55e',
    });
};
</script>
