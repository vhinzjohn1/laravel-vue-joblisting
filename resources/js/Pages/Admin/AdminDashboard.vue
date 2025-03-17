<template>
    <AdminLayout>
        <Head title="Admin Dashboard" />
        <template #header>
            <Header title="Admin Dashboard" />
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white rounded-lg shadow overflow-hidden">
                    <button
                        class="btn btn-success float-right m-3"
                        @click="showAddModal = true"
                    >
                        Add
                    </button>
                    <DataTable
                        :data="data"
                        :pageSize="10"
                        :columns="['user_id', 'username', 'email', 'role_name']"
                        @edit="showEdit"
                        @delete="deleteItem"
                    />
                </div>
            </div>
        </div>

        <!-- Add User Modal -->
        <Modal :show="showAddModal" @close="closeAddModal" maxWidth="2xl">
            <div class="p-6">
                <h2 class="text-lg font-semibold mb-4">Add User</h2>
                <form @submit.prevent="saveChanges" class="space-y-4">
                    <div class="form-group">
                        <label for="exampleInputUsername">Username</label>
                        <input
                            type="text"
                            class="form-control"
                            id="exampleInputUsername"
                            v-model="form.username"
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail">Email</label>
                        <input
                            type="email"
                            class="form-control"
                            id="exampleInputEmail"
                            v-model="form.email"
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword">Password</label>
                        <input
                            type="password"
                            class="form-control"
                            id="exampleInputPassword"
                            v-model="form.password"
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputRole">Role</label>
                        <select
                            class="form-control"
                            id="exampleInputRole"
                            v-model="form.role_name"
                            required
                        >
                            <option value="admin">Admin</option>
                            <option value="hr">HR Personnel</option>
                            <option value="applicant">Applicant</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            @click="closeAddModal"
                        >
                            Close
                        </button>
                        <button type="submit" class="btn btn-primary">
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
        </Modal>

        <!-- Edit User Modal -->
        <Modal :show="showEditModal" @close="closeEditModal" maxWidth="2xl">
            <div class="p-6">
                <h2 class="text-lg font-semibold mb-4">Edit User</h2>
                <form @submit.prevent="editUser" class="space-y-4">
                    <div class="form-group">
                        <label for="editUserName">Username</label>
                        <input
                            type="text"
                            class="form-control"
                            id="editUserName"
                            v-model="form.username"
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="editEmail">Email</label>
                        <input
                            type="email"
                            class="form-control"
                            id="editEmail"
                            v-model="form.email"
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="editPassword">Password</label>
                        <input
                            type="password"
                            class="form-control"
                            id="editPassword"
                            v-model="form.password"
                            placeholder="Enter password"
                        />
                    </div>
                    <div class="form-group">
                        <label for="editRole">Role</label>
                        <select
                            class="form-control"
                            id="editRole"
                            v-model="form.role_name"
                            required
                        >
                            <option value="admin">Admin</option>
                            <option value="hr">HR Personnel</option>
                            <option value="applicant">Applicant</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            @click="closeEditModal"
                        >
                            Close
                        </button>
                        <button type="submit" class="btn btn-primary">
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    </AdminLayout>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import AdminLayout from "@/Layouts/Admin/AdminLayout.vue";
import Header from "@/Components/Header/Header.vue";
import DataTable from "@/Components/DataTable.vue";
import { useForm, usePage, Head } from "@inertiajs/vue3";
import Modal from "@/Components/Modal.vue";

const data = ref(usePage().props.users);
const form = useForm({
    username: "",
    password: "",
    email: "",
    role_name: "",
    user_id: "",
});

const showAddModal = ref(false);
const showEditModal = ref(false);

const closeAddModal = () => {
    showAddModal.value = false;
    form.reset();
};

const showSuccessAlert = (action) => {
    let title, text;

    switch (action) {
        case "add":
            title = "User Added Successfully!";
            text = "The user has been added to the system.";
            break;
        case "edit":
            title = "User Updated Successfully!";
            text = "The user details have been updated.";
            break;
        case "delete":
            title = "User Deleted Successfully!";
            text = "The user has been removed from the system.";
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
        iconColor: '#ffffff',
        showConfirmButton: false,
        timer: 3000, // Toast will disappear after 3 seconds
        toast: true, // Enable toast mode
        customClass: {
            popup: 'bg-green-500 text-white',
        },
    });
};

const showEdit = (item) => {
    form.username = item.username;
    form.email = item.email;
    form.password = item.password;
    form.role_name = item.role_name;
    form.user_id = item.user_id;
    showEditModal.value = true;
};

const closeEditModal = () => {
    showEditModal.value = false;
    form.reset();
};

const saveChanges = () => {
    axios.post("admin", form).then((response) => {
        data.value = response.data;
        closeAddModal();
        showSuccessAlert("add");
    });
};

const editUser = () => {
    axios.put(`admin/${form.user_id}`, form).then((response) => {
        data.value = response.data;
        closeEditModal();
        showSuccessAlert("edit");
    });
};

const deleteItem = (item) => {
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
            axios.delete(`admin/${item.user_id}`).then(() => {
                data.value = data.value.filter(
                    (user) => user.user_id !== item.user_id,
                );
                showSuccessAlert("delete");
            });
        }
    });
};
</script>
