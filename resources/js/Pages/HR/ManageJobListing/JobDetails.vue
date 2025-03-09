<template>
    <HRLayout>
        <Head :title="job.title" />
        <template #header>
            <Header :title="job.title" />
        </template>

        <!-- Breadcrumbs -->
        <nav class="bg-white py-3 px-4 mb-4 rounded-lg shadow-sm">
            <ol class="list-reset flex text-gray-700">
                <li>
                    <a href="#" class="text-blue-600 hover:underline">Home</a>
                </li>
                <li><span class="mx-2">/</span></li>
                <li>
                    <a
                        href="#"
                        class="text-blue-600 hover:underline"
                        @click.prevent="goBack"
                        >Job Listings</a
                    >
                </li>
                <li><span class="mx-2">/</span></li>
                <li>{{ job.title }}</li>
            </ol>
        </nav>

        <div class="py-5">
            <div class="container-fluid px-4">
                <div
                    class="card shadow-sm rounded-lg overflow-hidden bg-white mb-6"
                >
                    <div class="card-body p-4">
                        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
                            {{ job.title }}
                        </h2>
                        <div class="text-gray-500 text-sm mb-4">
                            <span>{{ job.position.position_name }}</span>
                            <span class="mx-1">•</span>
                            <span class="inline-flex items-center">
                                <span
                                    class="inline-block w-2 h-2 rounded-full mr-1"
                                    :class="{
                                        'bg-green-500': job.status === 'Active',
                                        'bg-yellow-500': job.status === 'Draft',
                                        'bg-red-500': job.status === 'Closed',
                                    }"
                                ></span>
                                {{ job.status }}
                            </span>
                        </div>
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span
                                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                                ${{
                                    job.position.salary_grade.amount.toLocaleString()
                                }}
                            </span>
                            <span
                                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                                {{
                                    job.position.salary_grade.years_experience
                                }}+ years experience
                            </span>
                        </div>
                        <p class="text-gray-600 text-sm mb-4">
                            {{ job.description }}
                        </p>
                        <button
                            class="btn text-sm py-1.5 px-3 border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors"
                            @click="applyForJob(job.job_listing_id)"
                        >
                            <i class="far fa-paper-plane mr-1"></i> Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </HRLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import { Head } from "@inertiajs/vue3";

const route = useRoute();
const router = useRouter();
const job = ref({});

onMounted(() => {
    const jobId = route.params.id;
    axios
        .get(`job-listing/${jobId}`)
        .then((response) => {
            job.value = response.data;
        })
        .catch((error) => {
            console.error("Error fetching job details:", error.response.data);
        });
});

const applyForJob = (jobId) => {
    axios
        .post(`job-application/${jobId}`)
        .then((response) => {
            console.log("Application successful:", response.data);
            // Handle successful application (e.g., show a success message)
        })
        .catch((error) => {
            console.error("Error applying for job:", error.response.data);
            // Handle error (e.g., show an error message)
        });
};

const goBack = () => {
    router.push({ name: "JobListing" });
};
</script>

<style>
/* Adding utility classes */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
