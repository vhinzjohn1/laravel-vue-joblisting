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
            <CustomSelect
                class="w-full sm:w-64"
                placeholder="Select from existing experience"
                :options="experienceOptions"
                :displayFormat="
                    (option) => `${option.position} at ${option.company_name}`
                "
                valueKey="experience_id"
                @select="onExperienceSelect"
            />
        </div>

        <!-- Compact display when experience is selected from dropdown -->
        <div v-if="selectedExperience.experience_id" class="mb-4">
            <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                <div class="flex justify-between">
                    <div>
                        <h3 class="text-base font-medium text-gray-900">
                            {{ selectedExperience.position }}
                        </h3>
                        <div class="mt-1 text-sm text-gray-600">
                            <p>
                                <span class="font-medium">Company:</span>
                                {{ selectedExperience.company_name }}
                            </p>
                            <p>
                                <span class="font-medium">Period:</span>
                                {{
                                    formatDateDisplay(
                                        selectedExperience.start_date,
                                    )
                                }}
                                —
                                {{
                                    selectedExperience.is_current_job
                                        ? "Present"
                                        : formatDateDisplay(
                                              selectedExperience.end_date,
                                          )
                                }}
                            </p>
                        </div>
                        <div class="mt-2 text-sm">
                            <p
                                class="text-gray-700 line-clamp-2"
                                :title="selectedExperience.responsibilities"
                            >
                                <span class="font-medium"
                                    >Responsibilities:</span
                                >
                                {{ selectedExperience.responsibilities }}
                            </p>
                        </div>
                    </div>
                    <button
                        @click="clearExperience"
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

        <!-- Empty state when no experience is selected -->
        <div
            v-else
            class="text-center py-6 bg-gray-50 rounded-lg border border-gray-200"
        >
            <p class="text-gray-500">No work experience selected</p>
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
    experienceOptions: {
        type: Array,
        default: () => [],
    },
    selectedExperience: {
        type: Object,
        default: () => ({
            experience_id: "",
            position: "",
            company_name: "",
            start_date: "",
            end_date: "",
            is_current_job: false,
            responsibilities: "",
        }),
    },
});

const emit = defineEmits(["update:selectedExperience", "select"]);

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

const onExperienceSelect = (selected) => {
    emit("select", selected);
};

const clearExperience = () => {
    emit("update:selectedExperience", {
        experience_id: "",
        position: "",
        company_name: "",
        start_date: "",
        end_date: "",
        is_current_job: false,
        responsibilities: "",
    });
};
</script>
