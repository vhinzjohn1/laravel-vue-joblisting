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
                        data-toggle="modal"
                        data-target="#addModal"
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

        <Modal modalId="addModal" modalTitle="Add User">
            <form @submit.prevent="saveChanges">
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
                        data-dismiss="modal"
                    >
                        Close
                    </button>
                    <button type="submit" class="btn btn-primary">
                        Save changes
                    </button>
                </div>
            </form>
        </Modal>

        <Modal modalId="editModal" modalTitle="Edit User">
            <!-- Form Submit for Edit User -->
            <form @submit.prevent="editUser">
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
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    <button type="submit" class="btn btn-primary">
                        Save changes
                    </button>
                </div>
            </form>
        </Modal>
    </AdminLayout>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import AdminLayout from "@/Layouts/Admin/AdminLayout.vue";
import Header from "@/Components/Header/Header.vue";
import DataTable from "@/Components/DataTable.vue";
import { useForm, usePage, Head } from "@inertiajs/vue3";
import Modal from "@/Components/Modal/Modal.vue";

// Fethcing Props that was sent by controller
const data = ref(usePage().props.users);

const form = useForm({
    username: "",
    password: "",
    email: "",
    role_name: "",
    user_id: "",
});

const showEdit = (item) => {
    // Set the form values
    form.username = item.username;
    form.email = item.email;
    form.password = item.password;
    form.role_name = item.role_name;
    form.user_id = item.user_id;
    // Set modal to show edit form
    $("#editModal").modal("show");
};

const editUser = () => {
    axios
        .put(`admin/${form.user_id}`, form)
        .then((response) => {
            console.log(response);
            // Add the new item to the data array
            data.value = response.data;
            // Reset form
            form.reset();
            // Close modal (assuming you're using bootstrap)
            $("#editModal").modal("hide");
        })
        .catch((error) => {
            console.error("Error saving item:", error);
        });
};
const deleteItem = (item) => {
    axios
        .delete(`admin/${item.user_id}`)
        .then((response) => {
            console.log(response.data);
            // Update the local state by removing the item
            data.value = data.value.filter((i) => i.user_id !== item.user_id);
        })
        .catch((error) => {
            console.error("Error deleting item:", error);
        });
};

const saveChanges = () => {
    axios
        .post("admin", form)
        .then((response) => {
            console.log(response);
            // Add the new item to the data array
            data.value = response.data;
            // Reset form
            form.reset();
            // Close modal (assuming you're using bootstrap)
            $("#addModal").modal("hide");
        })
        .catch((error) => {
            console.error("Error saving item:", error);
        });
};
</script>
