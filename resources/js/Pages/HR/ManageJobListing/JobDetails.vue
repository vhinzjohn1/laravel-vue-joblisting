<template>
    <div class="applicant-details" v-if="selectedApplicant">
        <div class="mb-6">
            <h3 class="text-xl font-semibold mb-4">Educational Background</h3>
            <div v-for="edu in selectedApplicant.educational_backgrounds" :key="edu.education_id" class="mb-4 p-4 border rounded">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <span class="font-medium">Level:</span> {{ edu.level }}
                    </div>
                    <div>
                        <span class="font-medium">School:</span> {{ edu.school_name }}
                    </div>
                    <div>
                        <span class="font-medium">Course:</span> {{ edu.degree_course }}
                    </div>
                    <div>
                        <span class="font-medium">Graduated:</span> {{ edu.year_graduated }}
                    </div>
                </div>
            </div>
        </div>

        <div class="mb-6">
            <h3 class="text-xl font-semibold mb-4">Training & Certifications</h3>
            <div v-for="training in selectedApplicant.trainings" :key="training.training_id" class="mb-4 p-4 border rounded">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <span class="font-medium">Title:</span> {{ training.title }}
                    </div>
                    <div>
                        <span class="font-medium">Institution:</span> {{ training.institution }}
                    </div>
                    <div>
                        <span class="font-medium">Duration:</span> {{ training.duration_hours }} hours
                    </div>
                </div>
            </div>
        </div>

        <div class="mb-6">
            <h3 class="text-xl font-semibold mb-4">Work Experience</h3>
            <div v-for="exp in selectedApplicant.work_experiences" :key="exp.experience_id" class="mb-4 p-4 border rounded">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <span class="font-medium">Position:</span> {{ exp.position }}
                    </div>
                    <div>
                        <span class="font-medium">Company:</span> {{ exp.company_name }}
                    </div>
                    <div>
                        <span class="font-medium">Duration:</span>
                        {{ formatDate(exp.start_date) }} - {{ exp.is_current_job ? 'Present' : formatDate(exp.end_date) }}
                    </div>
                    <div class="col-span-2">
                        <span class="font-medium">Responsibilities:</span>
                        <p class="mt-1">{{ exp.responsibilities }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};
</script>
