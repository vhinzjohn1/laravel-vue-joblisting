<template>
    <AuthenticatedLayout>
        <template #header>
            <Header title="Admin Dashboard" />
        </template>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white rounded-lg shadow overflow-hidden">
                    <DataTable
                        :items="items"
                        :pageSize="5"
                        :columns="['test_id', 'status']"
                        @edit="editItem"
                        @delete="deleteItem"
                    />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Header from "@/Components/Header/Header.vue";
import DataTable from "@/Components/DataTable.vue";

const items = ref([]);

const fetchData = () => {
    axios
        .get("test")
        .then((response) => {
            items.value = response.data;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
};

onMounted(fetchData);

const editItem = (item) => {
    console.log("Edit item:", item);
};

const deleteItem = (item) => {
    axios
        .delete(`test/${item.test_id}`)
        .then((response) => {
            console.log(response.data);
            // Optionally, remove the item from the local state
            items.value = items.value.filter((i) => i.test_id !== item.test_id);
        })
        .catch((error) => {
            console.error("Error deleting item:", error);
        });
};
</script>
