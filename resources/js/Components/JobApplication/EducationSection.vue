<template>
    <div class="mb-8 bg-white rounded-xl shadow-sm p-6 border border-green-100">
        <div
            class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2"
        >
            <h6 class="text-lg font-semibold text-gray-800 flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-green-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 14v7"
                    />
                </svg>
                Educational Background
            </h6>
            <div class="text-sm text-gray-500 w-full sm:w-64 text-right">
                Select from your existing education
            </div>
        </div>

        <!-- List of all education options with checkboxes -->
        <div v-if="educationOptions.length > 0" class="mb-4 space-y-3">
            <div v-for="edu in educationOptions" :key="edu.education_id"
                class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm flex items-start gap-3">
                <input
                    type="checkbox"
                    :id="`education-${edu.education_id}`"
                    :value="edu"
                    :checked="isEducationSelected(edu)"
                    @change="toggleEducation(edu)"
                    class="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label :for="`education-${edu.education_id}`" class="flex-1 block text-sm">
                    <h3 class="text-base font-medium text-gray-900">{{ edu.degree_course }}</h3>
                    <div class="mt-1 text-sm text-gray-600">
                        <p><span class="font-medium">School:</span> {{ edu.school_name }}</p>
                        <p><span class="font-medium">Level:</span> {{ edu.level }}</p>
                        <p><span class="font-medium">Year Graduated:</span> {{ edu.year_graduated }}</p>
                    </div>
                </label>
            </div>
        </div>

        <!-- Empty state when no education is available -->
        <div
            v-else
            class="text-center py-6 bg-gray-50 rounded-lg border border-gray-200"
        >
            <p class="text-gray-800">No educational background available in your profile.</p>
            <p class="text-sm text-gray-700 mt-1">
                Please update your profile to add educational records.
            </p>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
// Remove CustomSelect import
// import CustomSelect from "@/Components/CustomSelect.vue";

const props = defineProps({
    educationOptions: {
        type: Array,
        default: () => [],
    },
    selectedEducations: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(["update:selectedEducations"]);

const isEducationSelected = (edu) => {
    return props.selectedEducations.some(selected => selected.education_id === edu.education_id);
};

const toggleEducation = (edu) => {
    const updatedEducations = [...props.selectedEducations];
    const index = updatedEducations.findIndex(selected => selected.education_id === edu.education_id);

    if (index === -1) {
        // Add education
        updatedEducations.push(edu);
    } else {
        // Remove education
        updatedEducations.splice(index, 1);
    }
    emit("update:selectedEducations", updatedEducations);
};
</script>
