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
            <CustomSelect
                v-if="trainingOptions.length > 0"
                class="w-full sm:w-64"
                placeholder="Existing training"
                :options="trainingOptions"
                :displayFormat="
                    (option) => `${option.title} - ${option.institution}`
                "
                valueKey="training_id"
                @select="onTrainingSelect"
            />
            <div v-else class="text-sm text-gray-500 w-full sm:w-64 text-right">
                Select from existing training
            </div>
        </div>

        <!-- List of selected trainings -->
        <div v-if="selectedTrainings.length > 0" class="mb-4 space-y-3">
            <div v-for="(training, index) in selectedTrainings" :key="training.training_id || index" class="bg-green-50 rounded-lg p-4 border border-green-200">
                <div class="flex justify-between">
                    <div>
                        <h3 class="text-base font-medium text-gray-900">
                            {{ training.title }}
                        </h3>
                        <div class="mt-1 text-sm text-gray-600">
                            <p>
                                <span class="font-medium">Institution:</span>
                                {{ training.institution }}
                            </p>
                            <p>
                                <span class="font-medium">Duration:</span>
                                {{ training.duration_hours }} hours
                            </p>
                        </div>
                    </div>
                    <button
                        @click="removeTraining(index)"
                        type="button"
                        class="text-xs text-gray-600 hover:text-gray-800 flex items-center h-6"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        Remove
                    </button>
                </div>
                <div class="mt-2 text-xs text-green-700">
                    <span>Selected from your profile</span>
                </div>
            </div>
        </div>

        <!-- Empty state when no training is selected -->
        <div
            v-else
            class="text-center py-6 bg-gray-50 rounded-lg border border-gray-200"
        >
            <p class="text-gray-800">No training or certification selected</p>
            <p class="text-sm text-gray-700 mt-1">
                Please select from the dropdown above
            </p>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import CustomSelect from "@/Components/CustomSelect.vue";

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

const emit = defineEmits(["update:selectedTrainings", "select"]);

const onTrainingSelect = (selected) => {

     // If the selected option is "Select from existing education", do not continue
     if (selected.training_id === "") {
        return;
    }
    // Check if already exists in the array
    const exists = props.selectedTrainings.some(
        training => training.training_id === selected.training_id
    );

    if (!exists) {
        const updatedTrainings = [...props.selectedTrainings, selected];
        emit("update:selectedTrainings", updatedTrainings);
    }
};

const removeTraining = (index) => {
    const updatedTrainings = [...props.selectedTrainings];
    updatedTrainings.splice(index, 1);
    emit("update:selectedTrainings", updatedTrainings);
};
</script>
