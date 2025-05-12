<template>
    <HRLayout>
        <Head title="Job Listing Archive" />
        <template #header>
            <Header title="Job Listing Archive" />
        </template>

        <div>
            <!-- Job Listings Archive -->
            <div class="p-4 mt-4 bg-white rounded-lg shadow-md">
                <div
                    class="flex flex-col justify-between items-center sm:flex-row"
                >
                    <h1
                        class="mb-4 text-2xl font-bold tracking-wider uppercase sm:mb-0"
                    >
                        Job Listings Archive
                    </h1>
                </div>
            </div>
            <div class="mt-3 max-w-full">
                <div
                    class="overflow-hidden bg-white shadow-sm sm:rounded-lg"
                >
                    <div class="p-6 text-gray-900">
                        <DataTable
                            :data="data"
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
                                    key: 'position.salary_grade.salary_grade',
                                    title: 'Salary Grade'
                                },
                                {
                                    key: 'position.category',
                                    title: 'Category',
                                },
                                {
                                    key: 'status',
                                    title: 'Status',
                                }
                            ]"
                            @edit="editArchive"
                            @delete="deleteArchive"
                        />
                    </div>
                </div>
            </div>

            <!-- Applications Archive -->
            <div class="p-4 mt-4 bg-white rounded-lg shadow-md">
                <div
                    class="flex flex-col justify-between items-center sm:flex-row"
                >
                    <h1
                        class="mb-4 text-2xl font-bold tracking-wider uppercase sm:mb-0"
                    >
                        Applications Archive
                    </h1>
                </div>
            </div>
            <div class="mt-3 max-w-full">
                <div
                    class="overflow-hidden bg-white shadow-sm sm:rounded-lg"
                >
                    <div class="p-6 text-gray-900">
                        <h1>This is the Applications Archive Page</h1>
                    </div>
                </div>
            </div>

             <!-- Schedule Archive -->
             <div class="p-4 mt-4 bg-white rounded-lg shadow-md">
                <div
                    class="flex flex-col justify-between items-center sm:flex-row"
                >
                    <h1
                        class="mb-4 text-2xl font-bold tracking-wider uppercase sm:mb-0"
                    >
                        Schedule Archive
                    </h1>
                </div>
            </div>
            <div class="mt-3 max-w-full">
                <div
                    class="overflow-hidden bg-white shadow-sm sm:rounded-lg"
                >
                    <div class="p-6 text-gray-900">
                        <h1>This is the Schedule Archive Page</h1>
                    </div>
                </div>
            </div>
        </div>
    </HRLayout>
    <Modal
    :show="showModal"
    @close="closeModal"
    maxWidth="3xl"
    title="Edit Archive"
    class="p-6 bg-white rounded-lg shadow-md"
    >
    <div class="p-10">
        <form @submit.prevent="updateStatus">
            <label for="archiveStatus" class="block mb-1 text-sm font-medium text-gray-700">
                Archive Status
            </label>
            <select
                name="status"
                id="archiveStatus"
                v-model="form.status"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
            >
                <option value="" disabled>Select Status</option>
                <option value="Archived">Archived</option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
            </select>
            <div v-if="form.errors.status" class="text-red-500 text-sm mt-1">{{ form.errors.status }}</div>
            <PrimaryButton type="submit" :disabled="form.processing" :loading="form.processing" class="mt-4">Update Status</PrimaryButton>
        </form>
    </div>
    </Modal>
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
const selectedJobListing = ref(null);
const data = ref(usePage().props.jobListings);

const form = useForm({
    id: '',
    status: "",
    method: "updateStatus"
});

const closeModal = () => {
    showModal.value = false;
    form.reset();
    selectedJobListing.value = null;
};

const editArchive = (jobListing) => {
    console.log('Editing job listing:', jobListing);
    selectedJobListing.value = jobListing;
    form.id = jobListing.job_listing_id;
    form.status = jobListing.status;
    form.method = "updateStatus";
    showModal.value = true;
};

const updateStatus = () => {
    const formData = {
        id: form.id,
        status: form.status,
        method: form.method
    };

    console.log('Submitting form with data:', formData);

    form.post(route("archive.store"), {
        preserveScroll: true,
        onSuccess: () => {
            console.log('Status updated successfully');
            closeModal();
        },
        onError: (errors) => {
            console.error('Update failed:', errors);
        },
        onFinish: () => {
            console.log('Update Status Request Finished');
        }
    });
};

// Watch for changes in jobListings prop
watch(
    () => usePage().props.jobListings,
    (newValue) => {
        console.log('JobListings updated:', newValue);
        data.value = newValue;
    },
    { deep: true }
);

</script>
