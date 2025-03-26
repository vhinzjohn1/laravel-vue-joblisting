<template>
    <HRLayout>
        <Head title="HR Dashboard" />
        <template #header>
            <Header title="HR Dashboard" />
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <!-- Statistics Cards -->
                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                >
                    <div
                        v-for="(value, key) in stats"
                        :key="key"
                        class="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
                        data-aos="fade-up"
                    >
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">
                                    {{ key.replace("_", " ").toUpperCase() }}
                                </p>
                                <p class="text-3xl font-bold text-green-600">
                                    {{ value }}
                                </p>
                            </div>
                            <div class="p-3 bg-green-100 rounded-full">
                                <i class="fas fa-chart-line text-green-600"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Recent Job Listings -->
                    <div
                        class="bg-white rounded-lg shadow-md p-6"
                        data-aos="fade-right"
                    >
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            Recent Job Listings
                        </h3>
                        <div class="space-y-4">
                            <div
                                v-for="job in recentJobs"
                                :key="job.id"
                                class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h4 class="font-medium text-gray-900">
                                            {{ job?.title }}
                                        </h4>
                                        <p class="text-sm text-gray-600">
                                            {{ job?.category?.name }}
                                        </p>
                                    </div>
                                    <span
                                        class="px-3 py-1 text-xs font-medium rounded-full"
                                        :class="
                                            job.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        "
                                    >
                                        {{ job.status }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Upcoming Interviews -->
                    <div
                        class="bg-white rounded-lg shadow-md p-6"
                        data-aos="fade-left"
                    >
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            Upcoming Interviews
                        </h3>
                        <div class="space-y-4">
                            <div
                                v-for="interview in upcomingInterviews"
                                :key="interview.id"
                                class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h4 class="font-medium text-gray-900">
                                            {{ interview?.schedule?.title }}
                                        </h4>
                                        <p class="text-sm text-gray-600">
                                            {{
                                                interview?.schedule?.description
                                            }}
                                        </p>
                                    </div>
                                    <span class="text-sm text-gray-600">
                                        {{
                                            new Date(
                                                interview?.schedule?.schedule_date,
                                            ).toLocaleDateString()
                                        }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Applications -->
                    <div
                        class="bg-white rounded-lg shadow-md p-6 lg:col-span-2"
                        data-aos="fade-up"
                    >
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            Recent Applications
                        </h3>
                        <div class="overflow-x-auto">
                            <table class="min-w-full">
                                <thead>
                                    <tr class="bg-gray-50">
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Applicant
                                        </th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Position
                                        </th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    class="bg-white divide-y divide-gray-200"
                                >
                                    <tr
                                        v-for="application in recentApplications"
                                        :key="application.id"
                                        class="hover:bg-gray-50"
                                    >
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {{ application?.user?.email }},
                                            {{ application?.user?.user_detail?.lastname }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {{ application?.job_listing?.title }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                                :class="{
                                                    'bg-yellow-100 text-yellow-800':
                                                        application?.status ===
                                                        'pending',
                                                    'bg-green-100 text-green-800':
                                                        application?.status ===
                                                        'accepted',
                                                    'bg-red-100 text-red-800':
                                                        application?.status ===
                                                        'rejected',
                                                }"
                                            >
                                                {{ application?.status }}
                                            </span>
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                        >
                                            {{
                                                new Date(
                                                    application?.created_at,
                                                ).toLocaleDateString()
                                            }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </HRLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Head } from "@inertiajs/vue3";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";

const props = defineProps({
    stats: Object,
    recentJobs: Array,
    upcomingInterviews: Array,
    recentApplications: Array,
});

console.log('upcomingInterviews', props);

onMounted(() => {
    // Add AOS initialization if needed
    if (window.AOS) {
        window.AOS.init();
    }
});
</script>
