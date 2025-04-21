<template>
    <Head title="Application Groups" />

    <HRLayout>
        <template #header>
            <Header title="Application Groups" />
        </template>

        <div class="py-5">
            <div class="px-4 container-fluid">
                <div class="overflow-hidden bg-white rounded-lg shadow-sm card">
                    <div class="px-4 py-4 bg-white border-b card-header">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-semibold">Application Groups</h2>
                            <PrimaryButton
                                @click="showModal = true"
                            >
                                <i class="mr-2 fas fa-plus"></i>
                                Create Group
                            </PrimaryButton>
                        </div>
                    </div>

                    <div class="p-4">
                        <!-- Groups List -->
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                                            Group Name
                                        </th>
                                        <th class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                                            Job Position
                                        </th>
                                        <th class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                                            Members Count
                                        </th>
                                        <th class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                                            Schedule Status
                                        </th>
                                        <th class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
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
                                            <button
                                                @click="createSchedule(group)"
                                                :disabled="!!group.schedule"
                                            >
                                                <span
                                                class="inline-flex px-2 text-xs font-semibold leading-5 rounded-full"
                                            >
                                                {{ group.schedule ? 'Scheduled' : 'Not Scheduled' }}
                                            </span>
                                            </button>

                                        </td>
                                        <td class="px-6 py-4">
                                            <button
                                                @click="addMembers(group)"
                                                class="mr-2 text-indigo-600 hover:text-indigo-900"
                                                title="Add Members"
                                            >
                                                <i class="fas fa-user-plus"></i>
                                            </button>
                                            <button
                                                @click="editGroup(group)"
                                                class="mr-2 text-blue-600 hover:text-blue-900"
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
            <div class="px-10 py-4">
                <form @submit.prevent="createGroup" class="space-y-4">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">
                                Group Name
                            </label>
                            <input
                                type="text"
                                v-model="form.name"
                                class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">
                                Job Listing
                            </label>
                            <select
                                v-model="form.job_listing_id"
                                class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                                class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            ></textarea>
                        </div>
                    </div>

                    <div class="flex justify-end mt-6 space-x-3">
                        <button
                            type="button"
                            @click="closeModal"
                            class="px-4 py-2 rounded-md border hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <PrimaryButton
                            type="submit"
                            :disabled="processing"
                        >
                            {{ editingGroup ? 'Update Group' : 'Create Group' }}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>

        <!-- Add Members Modal -->
        <Modal
            :show="showAddMembersModal"
            @close="closeAddMembersModal"
            :title="`Add Members to ${selectedGroup?.name}`"
        >
            <div class="px-10 py-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Select Applicants</label>
                    <div class="overflow-y-auto mt-2 max-h-64">
                        <div v-for="app in selectedGroupApplications" :key="app.application_id" class="flex items-center py-2">
                            <input
                                type="checkbox"
                                :value="app.application_id"
                                v-model="selectedApplications"
                                class="mr-2 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <span>{{ app.user.name }} ({{ app.application_id }})</span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end mt-4 space-x-3">
                    <button
                        type="button"
                        @click="closeAddMembersModal"
                        class="px-4 py-2 rounded-md border hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <PrimaryButton
                        type="button"
                        :disabled="processingAddMembers"
                        @click="submitAddMembers"
                    >
                        Add Members
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    </HRLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Head, useForm, router } from '@inertiajs/vue3';
import HRLayout from '@/Layouts/HR/HRLayout.vue';
import Header from '@/Components/Header/Header.vue';
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';

const props = defineProps({
    groups: Array,
    jobListings: Array
});

console.log(props);

const showModal = ref(false);
const editingGroup = ref(null);
const processing = ref(false);
const showAddMembersModal = ref(false);
const selectedGroup = ref(null);
const selectedApplications = ref([]);
const processingAddMembers = ref(false);

const applications = ref(props.jobListings);

console.log('this is the applications: ', applications.value);

const selectedGroupApplications = computed(() => {
    if (!selectedGroup.value) return [];
    const job = props.jobListings.find(j => j.job_listing_id === selectedGroup.value.job_listing_id);
    return job ? job.applications : [];
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
            break;
        case "update":
            title = "Updated Successfully!";
            break;
        case "addMembers":
            title = "Members Added!";
            break;
        case "delete":
            title = "Deleted Successfully!";
            break;
        default:
            title = "Action Completed!";
    }

    // Using SweetAlert2 toast with custom styling
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: title,
        iconColor: '#ffffffff',
        showConfirmButton: false,
        timer: 3000, // Toast will disappear after 3 seconds
        toast: true, // Enable toast mode
        color: '#ffffff',
        background: '#22c55e'
    });
};

const addMembers = (group) => {
    selectedGroup.value = group;
    selectedApplications.value = [];
    showAddMembersModal.value = true;
};

const closeAddMembersModal = () => {
    showAddMembersModal.value = false;
    selectedGroup.value = null;
    selectedApplications.value = [];
};

const submitAddMembers = () => {
    if (!selectedGroup.value) return;
    processingAddMembers.value = true;
    router.put(route('groups.update', selectedGroup.value.group_id), {
        action: 'addMembers',
        application_ids: selectedApplications.value
    }, {
        onSuccess: () => {
            processingAddMembers.value = false;
            showSuccessAlert('addMembers');
            closeAddMembersModal();
        },
        onError: () => {
            processingAddMembers.value = false;
            console.error('Error adding members:', form.errors);
        }
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
    // router.visit(route('schedules.create', { group: group.group_id }));
    console.log(group);
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

const form = useForm({
    name: '',
    job_listing_id: '',
    notes: ''
});
</script>
