<template>
    <HRLayout>
        <Head title="HR Dashboard" />
        <template #header>
            <Header title="HR Dashboard" />
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">You're logged in! as {{ $page.props.auth.user.email }}</div>
                </div>
            </div>
        </div>
    </HRLayout>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import { useForm, usePage, Head } from "@inertiajs/vue3";

// Fethcing Props that was sent by controller
const data = ref(usePage().props.users);

console.log(data);
</script>
