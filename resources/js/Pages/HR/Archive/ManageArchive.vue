<template>
    <HRLayout>
        <Head title="Job Listing Archive" />
        <template #header>
            <Header title="Job Listing Archive" />
        </template>

        <div>
            <!-- Archived Batches Section -->
            <div class="p-4 mt-4 bg-white rounded-lg shadow-md">
                <div class="flex flex-col justify-between items-center sm:flex-row">
                    <h1 class="mb-4 text-2xl font-bold tracking-wider uppercase sm:mb-0">
                        Archived Batches
                    </h1>
                </div>
                <div class="mt-4">
                    <DataTable
                        :data="archivedBatches"
                        :columns="[
                            { key: 'batch_name', title: 'Batch Name' },
                            { key: 'batch_code', title: 'Batch Code' },
                            { key: 'post_date', title: 'Post Date' },
                            { key: 'deadline', title: 'Deadline' },
                            { key: 'status', title: 'Status' }
                        ]"
                        action="edit"
                        @edit="editBatch"
                    />
                </div>
            </div>

            <!-- Archived Non-Plantilla Job Listings Section -->
            <div class="p-4 mt-4 bg-white rounded-lg shadow-md">
                <div class="flex flex-col justify-between items-center sm:flex-row">
                    <h1 class="mb-4 text-2xl font-bold tracking-wider uppercase sm:mb-0">
                        Archived Non-Plantilla Job Listings
                    </h1>
                </div>
                <div class="mt-4">
                    <DataTable
                        :data="archivedNonPlantilla"
                        :columns="[
                            { key: 'title', title: 'Job Title' },
                            { key: 'position.position_name', title: 'Position' },
                            { key: 'position.category', title: 'Category' },
                            { key: 'closing_date', title: 'Closing Date' },
                            { key: 'status', title: 'Status' }
                        ]"
                        action="edit"
                        @edit="editJobListing"
                    />
                </div>
            </div>
        </div>

        <!-- Edit Status Modal -->
        <Modal
            :show="showModal"
            @close="closeModal"
            maxWidth="3xl"
            :title="modalTitle"
            class="p-6 bg-white rounded-lg shadow-md"
        >
            <div class="p-10">
                <form @submit.prevent="updateStatus">
                    <label for="status" class="block mb-1 text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        name="status"
                        id="status"
                        v-model="form.status"
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    >
                        <option value="" disabled>Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Draft">Draft</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <div v-if="form.errors.status" class="text-red-500 text-sm mt-1">{{ form.errors.status }}</div>
                    <PrimaryButton type="submit" :disabled="form.processing" :loading="form.processing" class="mt-4">
                        Update Status
                    </PrimaryButton>
                </form>
            </div>
        </Modal>
    </HRLayout>
</template>

<script setup>
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import { Head, usePage, router } from "@inertiajs/vue3";
import { ref, watch } from "vue";
import DataTable from "@/Components/DataTable.vue";
import { useForm } from "@inertiajs/vue3";
import Modal from "@/Components/Modal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";

const showModal = ref(false);
const modalTitle = ref('');
const selectedItem = ref(null);
const isBatch = ref(false);

const archivedBatches = ref(usePage().props.archivedBatches || []);
const archivedNonPlantilla = ref(usePage().props.archivedNonPlantilla || []);

const form = useForm({
    id: '',
    status: "",
    method: ""
});

const closeModal = () => {
    showModal.value = false;
    form.reset();
    selectedItem.value = null;
    isBatch.value = false;
};

const editBatch = (batch) => {
    selectedItem.value = batch;
    isBatch.value = true;
    modalTitle.value = 'Edit Batch Status';
    form.id = batch.batch_id;
    form.status = batch.status;
    form.method = "updateBatchStatus";
    showModal.value = true;
};

const editJobListing = (jobListing) => {
    selectedItem.value = jobListing;
    isBatch.value = false;
    modalTitle.value = 'Edit Job Listing Status';
    form.id = jobListing.job_listing_id;
    form.status = jobListing.status;
    form.method = "updateStatus";
    showModal.value = true;
};

const updateStatus = () => {
    axios.post(route("archive.store"), form.data())
        .then((response) => {
            // Update the data with the fresh data from the response
            if (isBatch.value) {
                archivedBatches.value = response.data.archivedBatches;
            } else {
                archivedNonPlantilla.value = response.data.archivedNonPlantilla;
            }

            // Show success toast
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Success!",
                text: response.data.message,
                showConfirmButton: false,
                timer: 3000,
                toast: true,
                customClass: {
                    popup: "bg-green-500 text-white",
                },
            });

            closeModal();
        })
        .catch((error) => {
            // Show error toast
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: "Failed to update status",
                showConfirmButton: false,
                timer: 3000,
                toast: true,
                customClass: {
                    popup: "bg-red-500 text-white",
                },
            });
        });
};

// Watch for changes in props
watch(
    () => usePage().props.archivedBatches,
    (newValue) => {
        archivedBatches.value = newValue;
    },
    { deep: true }
);

watch(
    () => usePage().props.archivedNonPlantilla,
    (newValue) => {
        archivedNonPlantilla.value = newValue;
    },
    { deep: true }
);
</script>
