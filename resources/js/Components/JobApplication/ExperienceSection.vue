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
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
                Work Experience
            </h6>
            <div class="text-sm text-gray-500 w-full sm:w-64 text-right">
                Select from your existing experience
            </div>
        </div>

        <!-- List of all experience options with checkboxes -->
        <div v-if="experienceOptions.length > 0" class="mb-4 space-y-3">
            <div v-for="experience in experienceOptions" :key="experience.experience_id"
                class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm flex items-start gap-3">
                <input
                    type="checkbox"
                    :id="`experience-${experience.experience_id}`"
                    :value="experience"
                    :checked="isExperienceSelected(experience)"
                    @change="toggleExperience(experience)"
                    class="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label :for="`experience-${experience.experience_id}`" class="flex-1 block text-sm">
                    <h3 class="text-base font-medium text-gray-900">{{ experience.position }}</h3>
                    <div class="mt-1 text-sm text-gray-600">
                        <p><span class="font-medium">Company:</span> {{ experience.company_name }}</p>
                        <p>
                            <span class="font-medium">Period:</span>
                            {{ formatDateDisplay(experience.start_date) }} —
                            {{ experience.is_current_job ? "Present" : formatDateDisplay(experience.end_date) }}
                        </p>
                    </div>
                    <div class="mt-2 text-sm">
                        <p class="text-gray-700 line-clamp-2" :title="experience.responsibilities">
                            <span class="font-medium">Responsibilities:</span>
                            {{ experience.responsibilities }}
                        </p>
                    </div>
                </label>
            </div>
        </div>

        <!-- Empty state when no experience is available -->
        <div
            v-else
            class="text-center py-6 bg-gray-50 rounded-lg border border-gray-200"
        >
            <p class="text-gray-800">No work experience available in your profile.</p>
            <p class="text-sm text-gray-700 mt-1">
                Please update your profile to add work experience records.
            </p>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
// import CustomSelect from "@/Components/CustomSelect.vue"; // Removed CustomSelect

const props = defineProps({
    experienceOptions: {
        type: Array,
        default: () => [],
    },
    selectedExperiences: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(["update:selectedExperiences"]);

// Format date for display
const formatDateDisplay = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const isExperienceSelected = (experience) => {
    return props.selectedExperiences.some(selected => selected.experience_id === experience.experience_id);
};

const toggleExperience = (experience) => {
    const updatedExperiences = [...props.selectedExperiences];
    const index = updatedExperiences.findIndex(selected => selected.experience_id === experience.experience_id);

    if (index === -1) {
        // Add experience
        updatedExperiences.push(experience);
    } else {
        // Remove experience
        updatedExperiences.splice(index, 1);
    }
    emit("update:selectedExperiences", updatedExperiences);
};
</script>
