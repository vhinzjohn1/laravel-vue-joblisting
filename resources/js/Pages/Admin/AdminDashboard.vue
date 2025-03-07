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
                        :columns="['test_id', 'name', 'status']"
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
                                <label for="exampleInputName">Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="exampleInputName"
                                    v-model="form.name"
                                    placeholder="Enter name"
                                />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputStatus">Status</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="exampleInputStatus"
                                    v-model="form.status"
                                    placeholder="Enter status"
                                />
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
const data = ref(usePage().props.tests);

const form = useForm({
    name: "",
    status: "",
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
            console.log(response)
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
