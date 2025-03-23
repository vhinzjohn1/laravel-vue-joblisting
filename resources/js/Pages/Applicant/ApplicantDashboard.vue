<template>
  <ApplicantLayout>
    <Head title="Applicant Dashboard" />
    <template #header>
      <Header title="Applicant Dashboard" />
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            v-for="(value, key) in stats"
            :key="key"
            class="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
            data-aos="fade-up"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">
                  {{ key.replace("_", " ").toUpperCase() }}
                </p>
                <p class="text-3xl font-bold text-green-600">
                  {{ value }}
                </p>
              </div>
              <div class="p-3 bg-green-100 rounded-full">
                <i class="fas fa-user-tie text-green-600"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recent Applications -->
          <div class="bg-white rounded-lg shadow-md p-6" data-aos="fade-right">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Your Recent Applications
            </h3>
            <div class="space-y-4">
              <div
                v-for="application in recentApplications"
                :key="application.id"
                class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="font-medium text-gray-900">
                      {{ application.job_listing.title }}
                    </h4>
                    <p class="text-sm text-gray-600">
                      Applied:
                      {{
                        new Date(application.created_at).toLocaleDateString()
                      }}
                    </p>
                  </div>
                  <span
                    class="px-3 py-1 text-xs font-medium rounded-full"
                    :class="{
                      'bg-yellow-100 text-yellow-800':
                        application.status === 'pending',
                      'bg-green-100 text-green-800':
                        application.status === 'accepted',
                      'bg-red-100 text-red-800':
                        application.status === 'rejected',
                    }"
                  >
                    {{ application.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Upcoming Interviews -->
          <div class="bg-white rounded-lg shadow-md p-6" data-aos="fade-left">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Upcoming Interviews
            </h3>
            <div class="space-y-4">
              <div
                
                v-for="interview in upcomingInterviews"
                :key="interview.id"
                class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="font-medium text-gray-900">
                      {{ interview.application.job_listing.title }}
                    </h4>
                    <p class="text-sm text-gray-600">
                      {{
                        new Date(
                          interview.schedule.schedule_date,
                        ).toLocaleString()
                      }}
                    </p>
                  </div>
                  <span
                    class="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                  >
                    {{ interview.type }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recommended Jobs -->
          <div
            class="bg-white rounded-lg shadow-md p-6 lg:col-span-2"
            data-aos="fade-up"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Recommended Jobs
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="job in recommendedJobs"
                :key="job.id"
                class="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h4 class="font-medium text-gray-900 mb-2">
                  {{ job.title }}
                </h4>
                <p class="text-sm text-gray-600 mb-4">
                  {{ job.description }}
                </p>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500">
                    Posted:
                    {{ new Date(job.created_at).toLocaleDateString() }}
                  </span>
                  <Link
                    :href="
                      route('job-application.create', {
                        job: job.id,
                      })
                    "
                    class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ApplicantLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Head } from "@inertiajs/vue3";
import ApplicantLayout from "@/Layouts/Applicant/ApplicantLayout.vue";
import Header from "@/Components/Header/Header.vue";
import { Link } from "@inertiajs/vue3";

const props = defineProps({
  stats: Object,
  recentApplications: Array,
  upcomingInterviews: Array,
  recommendedJobs: Array,
});

console.log("props", props.upcomingInterviews);

onMounted(() => {
  // Add AOS initialization if needed
  if (window.AOS) {
    window.AOS.init();
  }
});
</script>
