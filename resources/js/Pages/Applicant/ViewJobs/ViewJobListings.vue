<template>
    <Head title="View Job Listings" />

    <ApplicantLayout>
        <template #header>
            <Header title="View Job Listings" />
        </template>

        <div class="py-5">
            <div class="px-4 container-fluid">
                <Breadcrumbs
                    :items="[
                        { name: 'Home', href: route('job-application.index') },
                        {
                            name: 'Job Listings',
                            href: route('job-application.index'),
                            active: true,
                        },
                    ]"
                />

                <div
                    class="overflow-hidden mb-6 bg-white rounded-lg shadow-sm card"
                >
                    <div class="px-4 py-4 bg-white border-b card-header">
                        <div
                            class="flex flex-col gap-3 justify-center items-center md:flex-row"
                        >
                            <div class="relative w-full max-w-xl md:w-1/2">
                                <div class="flex">
                                    <input
                                        type="text"
                                        class="block px-4 py-2.5 w-full text-sm rounded-l-lg border border-gray-300 form-control focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search job listings..."
                                        v-model="searchQuery"
                                    />
                                    <button
                                        class="px-4 text-gray-700 bg-gray-100 rounded-r-lg border border-l-0 border-gray-300 transition-colors hover:bg-gray-200"
                                    >
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-4 card-body">
                        <div class="flex flex-col gap-8">
                            <!-- Job Listing Preview Cards -->
                            <div
                                v-for="(group, groupType) in groupedJobs"
                                :key="groupType"
                                class="flex flex-col gap-4"
                            >
                                <h3
                                    class="px-4 py-2 text-lg font-bold text-gray-900 bg-gray-100 rounded-lg"
                                >
                                    {{ groupType }}
                                </h3>
                                <div
                                    class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
                                >
                                    <div
                                        v-for="(job, index) in group"
                                        :key="index"
                                        class="flex overflow-hidden relative flex-col h-full bg-white rounded-xl border border-gray-300 transition-all duration-300 cursor-pointer hover:shadow-lg group"
                                        :class="[
                                            hasAppliedToJob(job)
                                                ? 'border-green-200 bg-green-50/30'
                                                : 'border-gray-100',
                                        ]"
                                        @click="showJobDetails(job)"
                                    >
                                        <div class="flex flex-col p-6 h-full">
                                            <!-- Applied Badge (Top-Right Corner) -->
                                            <div
                                                v-if="hasAppliedToJob(job)"
                                                class="absolute top-0 right-0 bg-[#ffc001] text-black text-sm font-bold px-3 py-1 rounded-bl-lg"
                                            >
                                                Applied
                                            </div>

                                            <!-- Header Section -->
                                            <div class="flex gap-4 items-start mb-3">
                                                <!-- Position Icon -->
                                                <div
                                                    class="flex flex-shrink-0 justify-center items-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl transition-transform duration-300 group-hover:scale-105"
                                                    style="width: 56px; height: 56px"
                                                >
                                                    <span
                                                        class="text-lg font-semibold text-green-600"
                                                    >
                                                        {{
                                                            job.position.position_name.substring(
                                                                0,
                                                                2,
                                                            )
                                                        }}
                                                    </span>
                                                </div>

                                                <!-- Title and Position -->
                                                <div class="flex-1">
                                                    <h5
                                                        class="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-green-600"
                                                    >
                                                        {{ job.title }}
                                                    </h5>
                                                    <div
                                                        class="flex gap-2 items-center text-sm"
                                                    >
                                                        <span class="text-gray-600">{{
                                                            job.position.position_name
                                                        }}</span>
                                                        <span class="text-gray-300"
                                                            >•</span
                                                        >
                                                        <span
                                                            class="inline-flex gap-1.5 items-center"
                                                        >
                                                            <span
                                                                class="inline-block w-2.5 h-2.5 rounded-full"
                                                                :class="{
                                                                    'bg-green-500':
                                                                        job.status ===
                                                                        'Active',
                                                                    'bg-yellow-500':
                                                                        job.status ===
                                                                        'Draft',
                                                                    'bg-red-500':
                                                                        job.status ===
                                                                        'Closed',
                                                                }"
                                                            ></span>
                                                            <span
                                                                :class="{
                                                                    'text-green-600':
                                                                        job.status ===
                                                                        'Active',
                                                                    'text-yellow-600':
                                                                        job.status ===
                                                                        'Draft',
                                                                    'text-red-600':
                                                                        job.status ===
                                                                        'Closed',
                                                                }"
                                                                >{{ job.status }}</span
                                                            >
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Content Section -->
                                            <div class="flex-grow">
                                                <!-- Minimum Requirements -->
                                                <div
                                                    v-if="
                                                        job.position.minimum_requirement
                                                    "
                                                    class="mb-4"
                                                >
                                                    <h6
                                                        class="mb-2 text-sm font-medium text-gray-700"
                                                    >
                                                        Minimum Requirements:
                                                    </h6>
                                                    <ul
                                                        class="space-y-1 text-sm list-disc list-inside text-gray-600"
                                                    >
                                                        <li
                                                            v-if="
                                                                job.position
                                                                    .minimum_requirement
                                                                    .education_level
                                                            "
                                                        >
                                                            <i
                                                                class="mr-1 text-gray-500 fas fa-graduation-cap"
                                                            ></i>
                                                            {{
                                                                job.position
                                                                    .minimum_requirement
                                                                    .education_level
                                                            }}
                                                        </li>
                                                        <li
                                                            v-if="
                                                                job.position
                                                                    .minimum_requirement
                                                                    .eligibility
                                                            "
                                                        >
                                                            <i
                                                                class="mr-1 text-gray-500 fas fa-certificate"
                                                            ></i>
                                                            {{
                                                                job.position
                                                                    .minimum_requirement
                                                                    .eligibility
                                                            }}
                                                        </li>
                                                        <li
                                                            v-if="
                                                                job.position
                                                                    .minimum_requirement
                                                                    .training_hours
                                                            "
                                                        >
                                                            <i
                                                                class="mr-1 text-gray-500 fas fa-chalkboard-teacher"
                                                            ></i>
                                                            {{
                                                                job.position
                                                                    .minimum_requirement
                                                                    .training_hours
                                                            }}
                                                            hours training
                                                        </li>
                                                        <li
                                                            v-if="
                                                                job.position
                                                                    .minimum_requirement
                                                                    .years_experience
                                                            "
                                                        >
                                                            <i
                                                                class="mr-1 text-gray-500 fas fa-briefcase"
                                                            ></i>
                                                            {{
                                                                job.position
                                                                    .minimum_requirement
                                                                    .years_experience
                                                            }}
                                                            year(s) experience
                                                        </li>
                                                    </ul>
                                                </div>

                                                <!-- Description -->
                                                <p
                                                    class="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-3"
                                                >
                                                    {{ job.description }}
                                                </p>
                                            </div>

                                            <!-- Footer Section -->
                                            <div
                                                class="pt-4 mt-6 border-t border-gray-50"
                                            >
                                                <div
                                                    class="flex justify-between items-center"
                                                >
                                                    <div
                                                        class="flex gap-2 items-center"
                                                    >
                                                        <span
                                                            class="text-sm text-gray-500"
                                                        >
                                                            Posted
                                                            {{
                                                                formatDate(
                                                                    job.created_at,
                                                                )
                                                            }}
                                                        </span>
                                                    </div>
                                                    <div
                                                        class="flex gap-2 items-center"
                                                    >
                                                        <button
                                                            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-800 rounded-lg transition-all duration-200 hover:bg-green-700"
                                                        >
                                                            <i
                                                                class="mr-2 fas fa-arrow-right"
                                                            ></i>
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
import { ref, computed } from "vue";
import { usePage, Head, router } from "@inertiajs/vue3";
import ApplicantLayout from "@/Layouts/Applicant/ApplicantLayout.vue";
import Header from "@/Components/Header/Header.vue";
import axios from "axios";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs.vue";

// Fetching Props that was sent by controller
const jobs = ref(usePage().props.jobListings);

console.log("This is the props: ", usePage().props.jobListings);

// Check if user is logged in the dynamically change the layout
const user = ref(usePage().props.auth.user);
// Search functionality
const searchQuery = ref("");
const filteredJobs = computed(() => {
    if (!searchQuery.value) return jobs.value;

    const query = searchQuery.value.toLowerCase();
    const filtered = jobs.value.filter(
        (job) =>
            job.title.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            job.position.position_name.toLowerCase().includes(query) ||
            job.place_assigned.toLowerCase().includes(query) ||
            job.position.category.toLowerCase().includes(query) ||
            job.status.toLowerCase().includes(query) ||
            job.position.employment_type.toLowerCase().includes(query) ||
            (job.position.minimum_requirement && job.position.minimum_requirement.education_level && job.position.minimum_requirement.education_level.toLowerCase().includes(query)) ||
            (job.position.minimum_requirement && job.position.minimum_requirement.eligibility && job.position.minimum_requirement.eligibility.toLowerCase().includes(query)) ||
            (job.position.minimum_requirement && job.position.minimum_requirement.training_hours && String(job.position.minimum_requirement.training_hours).toLowerCase().includes(query)) ||
            (job.position.minimum_requirement && job.position.minimum_requirement.years_experience && String(job.position.minimum_requirement.years_experience).toLowerCase().includes(query)) ||
            formatDate(job.created_at).toLowerCase().includes(query)
    );

    // Sort the filtered jobs: Plantilla first, then CoS, then others alphabetically
    return filtered.sort((a, b) => {
        const typeA = a.position.employment_type;
        const typeB = b.position.employment_type;

        if (typeA === "Plantilla" && typeB !== "Plantilla") {
            return -1; // Plantilla comes first
        }
        if (typeB === "Plantilla" && typeA !== "Plantilla") {
            return 1; // Plantilla comes first
        }
        if (typeA === "CoS" && typeB !== "CoS" && typeB !== "Plantilla") {
            return -1; // CoS comes after Plantilla, before others
        }
        if (typeB === "CoS" && typeA !== "CoS" && typeA !== "Plantilla") {
            return 1; // CoS comes after Plantilla, before others
        }
        return typeA.localeCompare(typeB); // Alphabetical sort for same types or other types
    });
});

// Check if user has applied to a specific job
const hasAppliedToJob = (job) => {
    return job.applications && job.applications.length > 0;
};

const groupedJobs = computed(() => {
    const groups = {};
    filteredJobs.value.forEach((job) => {
        const type = job.position.employment_type;
        let groupName = type;

        if (type === "CoS") {
            groupName = "Non-Plantilla";
        }

        if (!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(job);
    });

    // Order the groups: Plantilla, CoS, then others alphabetically
    const orderedGroups = {};
    const order = ["Plantilla", "Non-Plantilla"];

    order.forEach((type) => {
        if (groups[type]) {
            orderedGroups[type] = groups[type];
            delete groups[type];
        }
    });

    // Add remaining groups (if any) alphabetically
    Object.keys(groups)
        .sort()
        .forEach((type) => {
            orderedGroups[type] = groups[type];
        });

    return orderedGroups;
});

// Methods
const applyForJob = (jobId) => {
    axios
        .post(`job-application/${jobId}`)
        .then((response) => {
            console.log("Application successful:", response.data);
            // Handle successful application (e.g., show a success message)
        })
        .catch((error) => {
            console.error("Error applying for job:", error.response.data);
            // Handle error (e.g., show an error message)
        });
};

const showJobDetails = (job) => {
    router.get(route("job-application.show", job.job_listing_id));
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
</script>

<style>
/* Adding utility classes */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
