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
                class="w-full sm:w-64"
                placeholder="Select from existing training"
                :options="trainingOptions"
                :displayFormat="
                    (option) => `${option.title} - ${option.institution}`
                "
                valueKey="training_id"
                @select="onTrainingSelect"
            />
        </div>

        <!-- Compact display when training is selected from dropdown -->
        <div v-if="selectedTraining.training_id" class="mb-4">
            <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                <div class="flex justify-between">
                    <div>
                        <h3 class="text-base font-medium text-gray-900">
                            {{ selectedTraining.title }}
                        </h3>
                        <div class="mt-1 text-sm text-gray-600">
                            <p>
                                <span class="font-medium">Institution:</span>
                                {{ selectedTraining.institution }}
                            </p>
                            <p>
                                <span class="font-medium">Duration:</span>
                                {{ selectedTraining.duration_hours }} hours
                            </p>
                        </div>
                    </div>
                    <button
                        @click="clearTraining"
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
                        Clear selection
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
            <p class="text-gray-500">No training or certification selected</p>
            <p class="text-sm text-gray-400 mt-1">
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
    selectedTraining: {
        type: Object,
        default: () => ({
            training_id: "",
            title: "",
            institution: "",
            duration_hours: "",
        }),
    },
});

const emit = defineEmits(["update:selectedTraining", "select"]);

const onTrainingSelect = (selected) => {
    emit("select", selected);
};

const clearTraining = () => {
    emit("update:selectedTraining", {
        training_id: "",
        title: "",
        institution: "",
        duration_hours: "",
    });
};
</script>
