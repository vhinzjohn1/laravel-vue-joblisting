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
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                </svg>
                Training & Certifications
            </h6>
            <div class="text-sm text-gray-500 w-full sm:w-64 text-right">
                Select from your existing training
            </div>
        </div>

        <!-- List of all training options with checkboxes -->
        <div v-if="trainingOptions.length > 0" class="mb-4 space-y-3">
            <div v-for="training in trainingOptions" :key="training.training_id"
                class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm flex items-start gap-3">
                <input
                    type="checkbox"
                    :id="`training-${training.training_id}`"
                    :value="training"
                    :checked="isTrainingSelected(training)"
                    @change="toggleTraining(training)"
                    class="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label :for="`training-${training.training_id}`" class="flex-1 block text-sm">
                    <h3 class="text-base font-medium text-gray-900">{{ training.title }}</h3>
                    <div class="mt-1 text-sm text-gray-600">
                        <p><span class="font-medium">Institution:</span> {{ training.institution }}</p>
                        <p><span class="font-medium">Duration:</span> {{ training.duration_hours }} hours</p>
                    </div>
                </label>
            </div>
        </div>

        <!-- Empty state when no training is available -->
        <div
            v-else
            class="text-center py-6 bg-gray-50 rounded-lg border border-gray-200"
        >
            <p class="text-gray-800">No training or certification available in your profile.</p>
            <p class="text-sm text-gray-700 mt-1">
                Please update your profile to add training records.
            </p>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
// import CustomSelect from "@/Components/CustomSelect.vue"; // Removed CustomSelect

const props = defineProps({
    trainingOptions: {
        type: Array,
        default: () => [],
    },
    selectedTrainings: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(["update:selectedTrainings"]);

const isTrainingSelected = (training) => {
    return props.selectedTrainings.some(selected => selected.training_id === training.training_id);
};

const toggleTraining = (training) => {
    const updatedTrainings = [...props.selectedTrainings];
    const index = updatedTrainings.findIndex(selected => selected.training_id === training.training_id);

    if (index === -1) {
        // Add training
        updatedTrainings.push(training);
    } else {
        // Remove training
        updatedTrainings.splice(index, 1);
    }
    emit("update:selectedTrainings", updatedTrainings);
};
</script>
