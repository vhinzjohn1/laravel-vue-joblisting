<script setup>
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import { Head } from "@inertiajs/vue3";
import Header from "@/Components/Header/Header.vue";

const asset = (path) => `/${path}`;

const print = () => {
    // Remove header and button, also make the print page landscape
    const header = document.querySelector('header');
    const button = document.querySelector('#print-button');
    header.style.display = 'none';
    button.style.display = 'none';
    window.print();
    header.style.display = 'block';
    button.style.display = 'block';
};
</script>


<template>
    <Head title="Selection Lineup" />

    <HRLayout>
        <template #header>
            <Header title="Selection Lineup" />
        </template>

        <div>
            <div class="py-1">
                <div class="container-fluid">

                    <div
                        id="selection-lineup"
                        class="card shadow-sm rounded-lg overflow-hidden bg-white"
                    >
                        <div class="card-header bg-white border-b relative">
                             <!-- Button to print out selection lineup -->
                    <div class="flex justify-end mb-4">
                        <button
                            id="print-button"
                            @click="print"
                            class="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors absolute top-3 right-3"
                        >
                            Print
                        </button>
                    </div>
                            <div class="flex items-center gap-3">
                                <img
                                    :src="asset('img/cmulogo.png')"
                                    alt="CMU Logo"
                                    class="w-10 h-10 sm:w-12 sm:h-12"
                                />
                                <div class="flex flex-col">
                                    <h5 class="text-gray-900 text-lg">Republic of the Philippines</h5>
                                    <h5 class="font-bold text-gray-900 text-lg">
                                    Central Mindanao University
                                    </h5>
                                    <h5 class="text-gray-900 text-lg">University Town, Musuan, Bukidnon</h5>
                                </div>
                            </div>

                            <div class="flex items-center justify-center flex-col">
                                <h5 class="font-bold text-gray-900 text-lg">
                                SELECTION LINEUP
                            </h5>
                            <h5 class="text-gray-900 text-lg">INTERNAL AUDITOR II</h5>
                            <h5 class="text-gray-900 text-lg">SG-15</h5>
                            </div>

                        </div>
                        <div class="card-body">
                            <table
                                class="min-w-full border-collapse border border-gray-300"
                            >
                                <thead>
                                    <tr>
                                        <th
                                            class="border border-gray-300 px-4 py-2"
                                        >
                                            Name of Applicant
                                        </th>
                                        <th
                                            class="border border-gray-300 px-4 py-2"
                                        >
                                            Education
                                        </th>
                                        <th
                                            class="border border-gray-300 px-4 py-2"
                                        >
                                            Training
                                        </th>
                                        <th
                                            class="border border-gray-300 px-4 py-2"
                                        >
                                            Experience
                                        </th>
                                        <th
                                            class="border border-gray-300 px-4 py-2"
                                        >
                                            Eligibility
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Data rows will be added here later -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </HRLayout>
</template>