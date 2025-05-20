<template>
    <HRLayout>
        <Head title="HR Dashboard" />
        <template #header>
            <Header title="HR Dashboard" />
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <!-- Statistics Cards -->
                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                >
                    <div
                        v-for="(value, key) in stats"
                        :key="key"
                        class="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                        data-aos="fade-up"
                        @click="navigateToSection(key)"
                    >
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">
                                    {{ formatStatTitle(key) }}
                                </p>
                                <p class="text-3xl font-bold text-green-600">
                                    {{ value }}
                                </p>
                            </div>
                            <div class="p-3 bg-green-100 rounded-full">
                                <i :class="getStatIcon(key)" class="text-green-600"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <!-- Applications Chart -->
                    <div class="bg-white rounded-lg shadow-md p-6" data-aos="fade-right">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex justify-between items-center">
                            <span>Applications Over Time</span>
                            <button @click="navigateToSection('applications')" class="text-sm text-blue-600 hover:text-blue-800">
                                View All
                            </button>
                        </h3>
                        <div class="h-64">
                            <canvas ref="applicationsChart"></canvas>
                        </div>
                    </div>

                    <!-- Job Listings Chart -->
                    <div class="bg-white rounded-lg shadow-md p-6" data-aos="fade-left">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex justify-between items-center">
                            <span>Job Listings by Category</span>
                            <button @click="navigateToSection('job_listings')" class="text-sm text-blue-600 hover:text-blue-800">
                                View All
                            </button>
                        </h3>
                        <div class="h-64">
                            <canvas ref="jobListingsChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Recent Job Listings -->
                    <div class="bg-white rounded-lg shadow-md p-6" data-aos="fade-right">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex justify-between items-center">
                            <span>Recent Job Listings</span>
                            <Link :href="route('job-listing.index')" class="text-sm text-blue-600 hover:text-blue-800">
                                View All
                            </Link>
                        </h3>
                        <div class="space-y-4">
                            <div
                                v-for="job in recentJobs"
                                :key="job.id"
                                class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                @click="navigateToJobListing(job.id)"
                            >
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h4 class="font-medium text-gray-900">
                                            {{ job?.title }}
                                        </h4>
                                        <p class="text-sm text-gray-600">
                                            {{ job?.category?.name }}
                                        </p>
                                    </div>
                                    <span
                                        class="px-3 py-1 text-xs font-medium rounded-full"
                                        :class="
                                            job.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        "
                                    >
                                        {{ job.status }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Upcoming Interviews -->
                    <div class="bg-white rounded-lg shadow-md p-6" data-aos="fade-left">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex justify-between items-center">
                            <span>Upcoming Interviews</span>
                            <Link :href="route('schedules.index')" class="text-sm text-blue-600 hover:text-blue-800">
                                View All
                            </Link>
                        </h3>
                        <div class="space-y-4">
                            <div
                                v-for="interview in upcomingInterviews"
                                :key="interview.id"
                                class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                @click="navigateToSchedule(interview.schedule_id)"
                            >
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h4 class="font-medium text-gray-900">
                                            {{ interview?.schedule?.title }}
                                        </h4>
                                        <p class="text-sm text-gray-600">
                                            {{ interview?.schedule?.description }}
                                        </p>
                                        <p class="text-xs text-gray-500 mt-1">
                                            <i class="fas fa-map-marker-alt mr-1"></i> {{ interview?.schedule?.location }}
                                        </p>
                                    </div>
                                    <div class="text-right">
                                        <span class="text-sm text-gray-600 block">
                                            {{ formatDate(interview?.schedule?.schedule_date) }}
                                        </span>
                                        <span class="text-xs text-gray-500 block">
                                            {{ formatTime(interview?.schedule?.schedule_date) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Applications -->
                    <div class="bg-white rounded-lg shadow-md p-6 lg:col-span-2" data-aos="fade-up">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex justify-between items-center">
                            <span>Recent Applications</span>
                            <Link :href="route('applications.index')" class="text-sm text-blue-600 hover:text-blue-800">
                                View All
                            </Link>
                        </h3>
                        <div class="overflow-x-auto">
                            <table class="min-w-full">
                                <thead>
                                    <tr class="bg-gray-50">
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Applicant
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Position
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr
                                        v-for="application in recentApplications"
                                        :key="application.id"
                                        class="hover:bg-gray-50"
                                    >
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 h-10 w-10">
                                                    <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <span class="text-gray-500 font-medium">
                                                            {{ getInitials(application?.user?.user_detail?.firstname, application?.user?.user_detail?.lastname) }}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="ml-4">
                                                    <div class="text-sm font-medium text-gray-900">
                                                        {{ application?.user?.user_detail?.firstname }} {{ application?.user?.user_detail?.lastname }}
                                                    </div>
                                                    <div class="text-sm text-gray-500">
                                                        {{ application?.user?.email }}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ application?.job_listing?.title }}</div>
                                            <div class="text-sm text-gray-500">{{ application?.job_listing?.category?.name }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                                :class="getStatusClass(application?.status)"
                                            >
                                                {{ application?.status }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {{ formatDate(application?.created_at) }}
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </HRLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { Head, Link, router } from "@inertiajs/vue3";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";

const props = defineProps({
    stats: Object,
    recentJobs: Array,
    upcomingInterviews: Array,
    recentApplications: Array,
    applicationStats: {
        type: Object,
        default: () => ({})
    },
    applicationsOverTime: {
        type: Array,
        default: () => []
    },
    jobListingStats: {
        type: Object,
        default: () => ({})
    }
});

// Chart references
const applicationsChart = ref(null);
const jobListingsChart = ref(null);

// Format stat title for display
const formatStatTitle = (key) => {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Get appropriate icon for each stat
const getStatIcon = (key) => {
    const icons = {
        total_applications: 'fas fa-file-alt',
        active_jobs: 'fas fa-briefcase',
        upcoming_interviews: 'fas fa-calendar-check',
        total_candidates: 'fas fa-users'
    };
    return icons[key] || 'fas fa-chart-line';
};

// Get status class for application status
const getStatusClass = (status) => {
    const statusClasses = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'accepted': 'bg-green-100 text-green-800',
        'rejected': 'bg-red-100 text-red-800',
        'interview': 'bg-purple-100 text-purple-800',
        'qualified': 'bg-blue-100 text-blue-800',
        'disqualified': 'bg-red-100 text-red-800',
        'competency_exam': 'bg-indigo-100 text-indigo-800'
    };
    return statusClasses[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

// Format date for display
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
};

// Format time for display
const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Get initials from first and last name
const getInitials = (firstName, lastName) => {
    if (!firstName && !lastName) return 'NA';
    return `${(firstName?.charAt(0) || '')}${(lastName?.charAt(0) || '')}`.toUpperCase();
};

// Navigation functions
const navigateToSection = (section) => {
    const routes = {
        'total_applications': 'applications.index',
        'applications': 'applications.index',
        'active_jobs': 'job-listing.index',
        'job_listings': 'job-listing.index',
        'upcoming_interviews': 'schedules.index',
        'schedules': 'schedules.index',
        'total_candidates': 'applications.index'
    };

    if (routes[section]) {
        router.visit(route(routes[section]));
    }
};

const navigateToJobListing = (id) => {
    router.visit(route('job-listing.show', id));
};

const navigateToSchedule = (id) => {
    router.visit(route('schedules.show', id));
};

const viewApplication = (id) => {
    router.visit(route('applications.show', id));
};

const editApplication = (id) => {
    router.visit(route('applications.edit', id));
};

// Initialize charts
const initCharts = () => {
    // Applications Chart
    if (applicationsChart.value && props.applicationsOverTime && props.applicationsOverTime.length > 0) {
        const ctx = applicationsChart.value.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: props.applicationsOverTime.map(item => formatDate(item.date)),
                datasets: [{
                    label: 'Applications',
                    data: props.applicationsOverTime.map(item => item.count),
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: '#10B981',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.raw} applications`;
                            }
                        }
                    }
                }
            }
        });
    } else {
        // Display a message if no data is available
        const ctx = applicationsChart.value.getContext('2d');
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#6B7280';
        ctx.fillText('No applications data available', applicationsChart.value.width / 2, applicationsChart.value.height / 2);
    }

    // Job Listings Chart
    if (jobListingsChart.value && props.jobListingStats && Object.keys(props.jobListingStats).length > 0) {
        const ctx = jobListingsChart.value.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(props.jobListingStats),
                datasets: [{
                    label: 'Job Listings',
                    data: Object.values(props.jobListingStats),
                    backgroundColor: [
                        '#10B981', // Green
                        '#3B82F6', // Blue
                        '#F59E0B', // Yellow
                        '#EF4444', // Red
                        '#8B5CF6'  // Purple
                    ],
                    borderColor: [
                        '#059669', // Darker Green
                        '#2563EB', // Darker Blue
                        '#D97706', // Darker Yellow
                        '#DC2626', // Darker Red
                        '#7C3AED'  // Darker Purple
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.raw} job listings`;
                            }
                        }
                    }
                }
            }
        });
    } else {
        // Display a message if no data is available
        const ctx = jobListingsChart.value.getContext('2d');
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#6B7280';
        ctx.fillText('No job listings data available', jobListingsChart.value.width / 2, jobListingsChart.value.height / 2);
    }
};

onMounted(() => {
    // Initialize AOS
    if (window.AOS) {
        window.AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Initialize charts
    initCharts();
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
