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
            <CustomSelect
                v-if="educationOptions.length > 0"
                class="w-full sm:w-64"
                placeholder="Select from existing education"
                :options="educationOptions"
                :displayFormat="
                    (option) =>
                        `${option.degree_course} - ${option.school_name}`
                "
                valueKey="education_id"
                @select="onEducationSelect"
            />
            <div v-else class="text-sm text-gray-500 w-full sm:w-64 text-right">
                Select from existing education
            </div>
        </div>

        <!-- List of selected education items -->
        <div v-if="selectedEducations.length > 0" class="mb-4 space-y-3">
            <div v-for="(edu, index) in selectedEducations" :key="edu.education_id || index" class="bg-green-50 rounded-lg p-4 border border-green-200">
                <div class="flex justify-between">
                    <div>
                        <h3 class="text-base font-medium text-gray-900">
                            {{ edu.degree_course }}
                        </h3>
                        <div class="mt-1 text-sm text-gray-600">
                            <p>
                                <span class="font-medium">School:</span>
                                {{ edu.school_name }}
                            </p>
                            <p>
                                <span class="font-medium">Level:</span>
                                {{ edu.level }}
                            </p>
                            <p>
                                <span class="font-medium">Year Graduated:</span>
                                {{ edu.year_graduated }}
                            </p>
                        </div>
                    </div>
                    <button
                        @click="removeEducation(index)"
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

        <!-- Empty state when no education is selected -->
        <div
            v-else
            class="text-center py-6 bg-gray-50 rounded-lg border border-gray-200"
        >
            <p class="text-gray-800">No educational background selected</p>
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
    educationOptions: {
        type: Array,
        default: () => [],
    },
    selectedEducations: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(["update:selectedEducations", "select"]);

const onEducationSelect = (selected) => {

    // If the selected option is "Select from existing education", do not continue
    if (selected.education_id === "") {
        return;
    }

    // Check if already exists in the array
    const exists = props.selectedEducations.some(
        edu => edu.education_id === selected.education_id
    );

    if (!exists) {
        const updatedEducations = [...props.selectedEducations, selected];
        emit("update:selectedEducations", updatedEducations);
    }
};

const removeEducation = (index) => {
    const updatedEducations = [...props.selectedEducations];
    updatedEducations.splice(index, 1);
    emit("update:selectedEducations", updatedEducations);
};
</script>
