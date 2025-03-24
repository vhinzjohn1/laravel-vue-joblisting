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
        </div>

        <!-- Compact display when education is selected from dropdown -->
        <div v-if="selectedEducation.education_id" class="mb-4">
            <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                <div class="flex justify-between">
                    <div>
                        <h3 class="text-base font-medium text-gray-900">
                            {{ selectedEducation.degree_course }}
                        </h3>
                        <div class="mt-1 text-sm text-gray-600">
                            <p>
                                <span class="font-medium">School:</span>
                                {{ selectedEducation.school_name }}
                            </p>
                            <p>
                                <span class="font-medium">Level:</span>
                                {{ selectedEducation.level }}
                            </p>
                            <p>
                                <span class="font-medium">Year Graduated:</span>
                                {{ selectedEducation.year_graduated }}
                            </p>
                        </div>
                    </div>
                    <button
                        @click="clearEducation"
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

        <!-- Empty state when no education is selected -->
        <div
            v-else
            class="text-center py-6 bg-gray-50 rounded-lg border border-gray-200"
        >
            <p class="text-gray-500">No educational background selected</p>
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
    educationOptions: {
        type: Array,
        default: () => [],
    },
    selectedEducation: {
        type: Object,
        default: () => ({
            education_id: "",
            level: "",
            school_name: "",
            degree_course: "",
            year_graduated: "",
        }),
    },
});

const emit = defineEmits(["update:selectedEducation", "select"]);

const onEducationSelect = (selected) => {
    emit("select", selected);
};

const clearEducation = () => {
    emit("update:selectedEducation", {
        education_id: "",
        level: "",
        school_name: "",
        degree_course: "",
        year_graduated: "",
    });
};
</script>
