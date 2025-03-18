<template>
    <Head title="Application Groups" />

    <HRLayout>
        <template #header>
            <Header title="Application Groups" />
        </template>

        <div class="py-5">
            <div class="container-fluid px-4">
                <div class="card shadow-sm rounded-lg overflow-hidden bg-white">
                    <div class="card-header bg-white py-4 px-4 border-b">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-semibold">Application Groups</h2>
                            <button
                                @click="showModal = true"
                                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <i class="fas fa-plus mr-2"></i>
                                Create Group
                            </button>
                        </div>
                    </div>

                    <div class="p-4">
                        <!-- Groups List -->
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Group Name
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Job Position
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Members Count
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Schedule Status
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="group in groups" :key="group.group_id">
                                        <td class="px-6 py-4">
                                            {{ group.name }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ group.job_listing.position.position_name }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ group.applications?.length || 0 }} members
                                        </td>
                                        <td class="px-6 py-4">
                                            <span
                                                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                                :class="getScheduleStatusClass(group)"
                                            >
                                                {{ getScheduleStatus(group) }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4">
                                            <button
                                                @click="addMembers(group)"
                                                class="text-indigo-600 hover:text-indigo-900 mr-2"
                                                title="Add Members"
                                            >
                                                <i class="fas fa-user-plus"></i>
                                            </button>
                                            <button
                                                @click="viewGroup(group)"
                                                class="text-blue-600 hover:text-blue-900 mr-2"
                                            >
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button
                                                @click="createSchedule(group)"
                                                class="text-green-600 hover:text-green-900 mr-2"
                                                :disabled="!!group.schedule"
                                            >
                                                <i class="fas fa-calendar-plus"></i>
                                            </button>
                                            <button
                                                @click="editGroup(group)"
                                                class="text-blue-600 hover:text-blue-900 mr-2"
                                            >
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button
                                                @click="deleteGroup(group)"
                                                class="text-red-600 hover:text-red-900"
                                            >
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Create/Edit Group Modal -->
        <Modal
         :show="showModal"
         @close="closeModal"
         :title="editingGroup ? 'Edit Group' : 'Create New Group'"
            >
            <div class="py-4 px-10">
                <form @submit.prevent="createGroup" class="space-y-4">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">
                                Group Name
                            </label>
                            <input
                                type="text"
                                v-model="form.name"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">
                                Job Listing
                            </label>
                            <select
                                v-model="form.job_listing_id"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Job Listing</option>
                                <option
                                    v-for="job in jobListings"
                                    :key="job.job_listing_id"
                                    :value="job.job_listing_id"
                                >
                                    {{ job.position.position_name }} - {{ job.title }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">
                                Notes
                            </label>
                            <textarea
                                v-model="form.notes"
                                rows="3"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            ></textarea>
                        </div>
                    </div>

                    <div class="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            @click="closeModal"
                            class="px-4 py-2 border rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            :disabled="processing"
                        >
                            {{ editingGroup ? 'Update Group' : 'Create Group' }}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    </HRLayout>
</template>

<script setup>
import { ref } from 'vue';
import { Head, useForm, router } from '@inertiajs/vue3';
import HRLayout from '@/Layouts/HR/HRLayout.vue';
import Header from '@/Components/Header/Header.vue';
import Modal from '@/Components/Modal.vue';

const props = defineProps({
    groups: Array,
    jobListings: Array
});

const showModal = ref(false);
const editingGroup = ref(null);
const processing = ref(false);

const form = useForm({
    name: '',
    job_listing_id: '',
    notes: ''
});

const closeModal = () => {
    showModal.value = false;
    editingGroup.value = null;
    form.reset();
};

const createGroup = () => {
    if (editingGroup.value) {
        form.put(route('groups.update', editingGroup.value.group_id), {
            onSuccess: () => {
                closeModal();
                showSuccessAlert("update");
            }
        });
    } else {
        form.post(route('groups.store'), {
            onSuccess: () => {
                closeModal();
                showSuccessAlert("add");
            },
            onError: () => {
                console.error("Error creating group:", form.errors);
            }
        });
    }
};

// Show success alert function
const showSuccessAlert = (action) => {
    let title, text;

    switch (action) {
        case "add":
            title = "Added Successfully!";
            text = "Information has been updated.";
            break;
        case "update":
            title = "Updated Successfully!";
            text = "Information has been updated.";
            break;
        case "delete":
            title = "Deleted Successfully!";
            text = "Information has been updated.";
            break;
        default:
            title = "Action Completed!";
            text = "The operation was successful.";
    }

    // Using SweetAlert2 toast with custom styling
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: title,
        text: text,
        iconColor: '#ffffffff',
        showConfirmButton: false,
        timer: 3000, // Toast will disappear after 3 seconds
        toast: true, // Enable toast mode
        color: '#ffffff',
        background: '#22c55e'
    });
};

const addMembers = (group, applicationIds) => {
    router.put(route('groups.update', group.group_id), {
        action: 'addMembers',
        application_ids: applicationIds
    });
};

const getScheduleStatus = (group) => {
    if (!group.schedule) return 'Not Scheduled';
    return group.schedule.status;
};

const getScheduleStatusClass = (group) => {
    const status = getScheduleStatus(group);
    return {
        'bg-yellow-100 text-yellow-800': status === 'Not Scheduled',
        'bg-green-100 text-green-800': status === 'Scheduled',
        'bg-blue-100 text-blue-800': status === 'Completed'
    };
};

const createSchedule = (group) => {
    router.visit(route('schedules.create', { group: group.group_id }));
};

const viewGroup = (group) => {
    router.visit(route('groups.show', group.group_id));
};

const editGroup = (group) => {
    editingGroup.value = group;
    form.name = group.name;
    form.job_listing_id = group.job_listing_id;
    form.notes = group.notes;
    showModal.value = true;
};

const deleteGroup = (group) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(route('groups.destroy', group.group_id), {
                onSuccess: () => {
                    showSuccessAlert("delete");
                }
            });
        }
    });
};
</script>
