<template>
    <AuthenticatedLayout>
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
                        :pageSize="5"
                        :columns="['user_id', 'username', 'email']"
                        :conditionalColumns="['roles.role_name']"
                        @edit="editItem"
                        @delete="deleteItem"
                    />
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div
            class="modal fade"
            id="addModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            Modal title
                        </h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveChanges">
                            <div class="form-group">
                                <label for="exampleInputUsername"
                                    >Username</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="exampleInputUsername"
                                    v-model="form.username"
                                    placeholder="Enter username"
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
                                />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword"
                                    >Password</label
                                >
                                <input
                                    type="password"
                                    class="form-control"
                                    id="exampleInputPassword"
                                    v-model="form.password"
                                    placeholder="Enter password"
                                />
                            </div>

                            <div class="form-group">
                                <label for="exampleInputRole">Role</label>
                                <select
                                    class="form-control"
                                    id="exampleInputRole"
                                    v-model="form.role_id"
                                >
                                    <option value="1">Admin</option>
                                    <option value="2">HR Personnel</option>
                                    <option value="3">Applicant</option>
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
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Header from "@/Components/Header/Header.vue";
import DataTable from "@/Components/DataTable.vue";
import { useForm, usePage } from "@inertiajs/vue3";

// Fethcing Props that was sent by controller
const data = ref(usePage().props.users);

console.log('This is the data: ',data);

const form = useForm({
    username: "",
    password: "",
    email: "",
    role_id: "",
});

const editItem = (item) => {
    console.log("Edit item:", item);
};

const deleteItem = (item) => {
    axios
        .delete(`test/${item.test_id}`)
        .then((response) => {
            console.log(response.data);
            // Update the local state by removing the item
            data.value = data.value.filter((i) => i.test_id !== item.test_id);
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
            data.value.push(response.data);
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
