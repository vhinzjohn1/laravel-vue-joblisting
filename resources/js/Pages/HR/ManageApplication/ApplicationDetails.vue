<template>
    <Head :title="`Application - ${application.job_listing.title}`" />

    <HRLayout>
        <template #header>
            <Header :title="`Application Details`" />
        </template>

        <div class="py-5">
            <div class="container-fluid px-4">
                <Breadcrumbs
                    :items="[
                        { name: 'Home', href: route('applications.index') },
                        {
                            name: 'Manage Applications',
                            href: route('applications.index'),
                        },
                        {
                            name: 'Application Details',
                            href: route(
                                'applications.show',
                                application.application_id,
                            ),
                            active: true,
                        },
                    ]"
                />

                <!-- Main Content Relative Wrapper -->
                <div class="relative">
                    <!-- Main Content without Sidebar Margin -->
                    <div>
                        <div
                            class="card shadow-sm rounded-lg overflow-hidden bg-white"
                        >
                            <!-- Back Button -->
                            <div class="p-4 border-b">
                                <button
                                    @click="
                                        $inertia.get(
                                            route('applications.index'),
                                        )
                                    "
                                    class="flex items-center text-gray-600 hover:text-gray-900"
                                >
                                    <i class="fas fa-arrow-left mr-2"></i>
                                    Back to Applications
                                </button>
                            </div>

                            <div class="p-6">
                                <!-- Application Status -->
                                <div
                                    class="mb-4 flex items-center justify-between"
                                >
                                    <h1
                                        class="text-2xl font-bold text-gray-900"
                                    >
                                        {{ application.job_listing.title }}
                                    </h1>
                                    <span
                                        class="px-3 py-1 text-sm font-semibold rounded-full"
                                        :class="
                                            getStatusColor(application.status)
                                        "
                                    >
                                        {{ application.status }}
                                    </span>
                                </div>

                                <!-- Application Details -->
                                <div
                                    class="grid grid-cols-1 md:grid-cols-3 gap-8"
                                >
                                    <!-- Left Column: Job Information -->
                                    <div class="md:col-span-2 space-y-8">
                                        <!-- Applicant Information -->
                                        <div
                                            class="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow transition-shadow duration-200"
                                        >
                                            <div
                                                @click="
                                                    toggleSection('applicant')
                                                "
                                                class="flex justify-between items-center cursor-pointer mb-3"
                                            >
                                                <h2
                                                    class="text-lg font-semibold text-gray-800 flex items-center"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="h-5 w-5 mr-2 text-gray-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                        />
                                                    </svg>
                                                    Applicant Information
                                                </h2>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    :class="[
                                                        'h-5 w-5 text-gray-500 section-toggle',
                                                        {
                                                            collapsed:
                                                                !sectionStates.applicant,
                                                        },
                                                    ]"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </div>
                                            <div
                                                v-show="sectionStates.applicant"
                                                class="section-content"
                                            >
                                                <div class="space-y-3">
                                                    <div>
                                                        <label
                                                            class="block text-sm font-medium text-gray-500"
                                                            >Name</label
                                                        >
                                                        <p class="mt-1">
                                                            {{
                                                                `${application.user.user_detail.firstname} ${application.user.user_detail.middle_initial || ""} ${application.user.user_detail.lastname}`
                                                            }}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label
                                                            class="block text-sm font-medium text-gray-500"
                                                            >Email</label
                                                        >
                                                        <p class="mt-1">
                                                            {{
                                                                application.user
                                                                    .email
                                                            }}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label
                                                            class="block text-sm font-medium text-gray-500"
                                                            >Phone Number</label
                                                        >
                                                        <p class="mt-1">
                                                            {{
                                                                application.user
                                                                    .user_detail
                                                                    .phone_number ||
                                                                "Not provided"
                                                            }}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label
                                                            class="block text-sm font-medium text-gray-500"
                                                            >Eligibility</label
                                                        >
                                                        <p class="mt-1">
                                                            {{
                                                                application.user
                                                                    .user_detail
                                                                    .eligibility ||
                                                                "None"
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Job Information -->
                                        <div
                                            class="bg-gray-50 p-5 rounded-lg mt-4 border border-gray-200 shadow-sm hover:shadow transition-shadow duration-200"
                                        >
                                            <div
                                                @click="toggleSection('job')"
                                                class="flex justify-between items-center cursor-pointer mb-3"
                                            >
                                                <h2
                                                    class="text-lg font-semibold text-gray-800 flex items-center"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="h-5 w-5 mr-2 text-gray-600"
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
                                                    Job Information
                                                </h2>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    :class="[
                                                        'h-5 w-5 text-gray-500 section-toggle',
                                                        {
                                                            collapsed:
                                                                !sectionStates.job,
                                                        },
                                                    ]"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </div>
                                            <div
                                                v-show="sectionStates.job"
                                                class="section-content"
                                            >
                                                <div class="space-y-3">
                                                    <div>
                                                        <label
                                                            class="block text-sm font-medium text-gray-500"
                                                            >Position</label
                                                        >
                                                        <p class="mt-1">
                                                            {{
                                                                application
                                                                    .job_listing
                                                                    .position
                                                                    .position_name
                                                            }}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label
                                                            class="block text-sm font-medium text-gray-500"
                                                            >Department</label
                                                        >
                                                        <p class="mt-1">
                                                            {{
                                                                application
                                                                    .job_listing
                                                                    .department
                                                            }}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label
                                                            class="block text-sm font-medium text-gray-500"
                                                            >Description</label
                                                        >
                                                        <p class="mt-1">
                                                            {{
                                                                application
                                                                    .job_listing
                                                                    .description
                                                            }}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label
                                                            class="block text-sm font-medium text-gray-500"
                                                            >Closing Date</label
                                                        >
                                                        <p class="mt-1">
                                                            {{
                                                                formatDate(
                                                                    application
                                                                        .job_listing
                                                                        .closing_date,
                                                                )
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Educational Background -->
                                        <div
                                            class="bg-gray-50 p-5 rounded-lg mt-4 border border-gray-200 shadow-sm hover:shadow transition-shadow duration-200"
                                        >
                                            <div
                                                @click="
                                                    toggleSection('education')
                                                "
                                                class="flex justify-between items-center cursor-pointer mb-3"
                                            >
                                                <h2
                                                    class="text-lg font-semibold text-gray-800 flex items-center"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="h-5 w-5 mr-2 text-gray-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            d="M12 14l9-5-9-5-9 5 9 5z"
                                                        />
                                                        <path
                                                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                                        />
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                                        />
                                                    </svg>
                                                    Educational Background
                                                </h2>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    :class="[
                                                        'h-5 w-5 text-gray-500 section-toggle',
                                                        {
                                                            collapsed:
                                                                !sectionStates.education,
                                                        },
                                                    ]"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </div>
                                            <div
                                                v-show="sectionStates.education"
                                                class="section-content"
                                            >
                                                <div
                                                    v-if="
                                                        application.user
                                                            .user_detail
                                                            .educational_backgrounds &&
                                                        application.user
                                                            .user_detail
                                                            .educational_backgrounds
                                                            .length > 0
                                                    "
                                                    class="space-y-6"
                                                >
                                                    <div
                                                        v-for="education in application
                                                            .user.user_detail
                                                            .educational_backgrounds"
                                                        :key="
                                                            education.education_id
                                                        "
                                                        class="border-b pb-5 last:border-b-0"
                                                    >
                                                        <div
                                                            class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                                        >
                                                            <div>
                                                                <label
                                                                    class="block text-sm font-medium text-gray-500"
                                                                    >Level</label
                                                                >
                                                                <p class="mt-1">
                                                                    {{
                                                                        education.level
                                                                    }}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <label
                                                                    class="block text-sm font-medium text-gray-500"
                                                                    >Year
                                                                    Graduated</label
                                                                >
                                                                <p class="mt-1">
                                                                    {{
                                                                        education.year_graduated ||
                                                                        "N/A"
                                                                    }}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <label
                                                                    class="block text-sm font-medium text-gray-500"
                                                                    >School
                                                                    Name</label
                                                                >
                                                                <p class="mt-1">
                                                                    {{
                                                                        education.school_name
                                                                    }}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <label
                                                                    class="block text-sm font-medium text-gray-500"
                                                                    >Degree/Course</label
                                                                >
                                                                <p class="mt-1">
                                                                    {{
                                                                        education.degree_course
                                                                    }}
                                                                </p>
                                                            </div>
                                                            <div
                                                                v-if="
                                                                    education.honors_received
                                                                "
                                                                class="md:col-span-2"
                                                            >
                                                                <label
                                                                    class="block text-sm font-medium text-gray-500"
                                                                    >Honors
                                                                    Received</label
                                                                >
                                                                <p class="mt-1">
                                                                    {{
                                                                        education.honors_received
                                                                    }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    v-else
                                                    class="text-gray-500"
                                                >
                                                    No educational background
                                                    information available
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Training -->
                                        <div
                                            class="bg-gray-50 p-5 rounded-lg mt-4 border border-gray-200 shadow-sm hover:shadow transition-shadow duration-200"
                                        >
                                            <div
                                                @click="
                                                    toggleSection('training')
                                                "
                                                class="flex justify-between items-center cursor-pointer mb-3"
                                            >
                                                <h2
                                                    class="text-lg font-semibold text-gray-800 flex items-center"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="h-5 w-5 mr-2 text-gray-600"
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
                                                </h2>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    :class="[
                                                        'h-5 w-5 text-gray-500 section-toggle',
                                                        {
                                                            collapsed:
                                                                !sectionStates.training,
                                                        },
                                                    ]"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </div>
                                            <div
                                                v-show="sectionStates.training"
                                                class="section-content"
                                            >
                                                <div
                                                    v-if="
                                                        application.user
                                                            .user_detail
                                                            .trainings &&
                                                        application.user
                                                            .user_detail
                                                            .trainings.length >
                                                            0
                                                    "
                                                    class="space-y-6"
                                                >
                                                    <div
                                                        v-for="training in application
                                                            .user.user_detail
                                                            .trainings"
                                                        :key="
                                                            training.training_id
                                                        "
                                                        class="border-b pb-5 last:border-b-0"
                                                    >
                                                        <div
                                                            class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                                        >
                                                            <div>
                                                                <label
                                                                    class="block text-sm font-medium text-gray-500"
                                                                    >Title</label
                                                                >
                                                                <p class="mt-1">
                                                                    {{
                                                                        training.title
                                                                    }}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <label
                                                                    class="block text-sm font-medium text-gray-500"
                                                                    >Institution</label
                                                                >
                                                                <p class="mt-1">
                                                                    {{
                                                                        training.institution
                                                                    }}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <label
                                                                    class="block text-sm font-medium text-gray-500"
                                                                    >Duration
                                                                    (Hours)</label
                                                                >
                                                                <p class="mt-1">
                                                                    {{
                                                                        training.duration_hours
                                                                    }}
                                                                </p>
                                                            </div>
                                                            <div
                                                                v-if="
                                                                    training.certificate_url
                                                                "
                                                            >
                                                                <label
                                                                    class="block text-sm font-medium text-gray-500"
                                                                    >Certificate</label
                                                                >
                                                                <a
                                                                    :href="
                                                                        training.certificate_url
                                                                    "
                                                                    target="_blank"
                                                                    class="mt-1 text-blue-600 hover:text-blue-800"
                                                                    >View
                                                                    Certificate</a
                                                                >
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    v-else
                                                    class="text-gray-500"
                                                >
                                                    No training information
                                                    available
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Work Experience -->
                                        <div
                                            class="bg-gray-50 p-5 rounded-lg mt-4 border border-gray-200 shadow-sm hover:shadow transition-shadow duration-200"
                                        >
                                            <div
                                                @click="
                                                    toggleSection(
                                                        'workExperience',
                                                    )
                                                "
                                                class="flex justify-between items-center cursor-pointer mb-3"
                                            >
                                                <h2
                                                    class="text-lg font-semibold text-gray-800 flex items-center"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="h-5 w-5 mr-2 text-gray-600"
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
                                                </h2>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    :class="[
                                                        'h-5 w-5 text-gray-500 section-toggle',
                                                        {
                                                            collapsed:
                                                                !sectionStates.workExperience,
                                                        },
                                                    ]"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </div>
                                            <div
                                                v-show="
                                                    sectionStates.workExperience
                                                "
                                                class="section-content"
                                            >
                                                <div
                                                    v-if="
                                                        application.user
                                                            .user_detail
                                                            .work_experiences &&
                                                        application.user
                                                            .user_detail
                                                            .work_experiences
                                                            .length > 0
                                                    "
                                                    class="space-y-6"
                                                >
                                                    <div
                                                        v-for="experience in application
                                                            .user.user_detail
                                                            .work_experiences"
                                                        :key="
                                                            experience.experience_id
                                                        "
                                                        class="border-b pb-5 last:border-b-0"
                                                    >
                                                        <div
                                                            class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                                        >
                                                            <div>
                                                                <label
                                                                    class="block text-sm font-medium text-gray-500"
                                                                    >Position</label
                                                                >
                                                                <p class="mt-1">
                                                                    {{
                                                                        experience.position
                                                                    }}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <label
                                                                    class="block text-sm font-medium text-gray-500"
                                                                    >Company</label
                                                                >
                                                                <p class="mt-1">
                                                                    {{
                                                                        experience.company_name
                                                                    }}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <label
                                                                    class="block text-sm font-medium text-gray-500"
                                                                    >Period</label
                                                                >
                                                                <p class="mt-1">
                                                                    {{
                                                                        formatDate(
                                                                            experience.start_date,
                                                                        )
                                                                    }}
                                                                    -
                                                                    {{
                                                                        experience.is_current_job
                                                                            ? "Present"
                                                                            : formatDate(
                                                                                  experience.end_date,
                                                                              )
                                                                    }}
                                                                </p>
                                                            </div>
                                                            <div
                                                                v-if="
                                                                    experience.responsibilities
                                                                "
                                                                class="md:col-span-2"
                                                            >
                                                                <label
                                                                    class="block text-sm font-medium text-gray-500"
                                                                    >Responsibilities</label
                                                                >
                                                                <p class="mt-1">
                                                                    {{
                                                                        experience.responsibilities
                                                                    }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    v-else
                                                    class="text-gray-500"
                                                >
                                                    No work experience
                                                    information available
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Application Documents -->
                                        <div
                                            class="bg-gray-50 p-5 rounded-lg mt-4 border border-gray-200 shadow-sm hover:shadow transition-shadow duration-200"
                                        >
                                            <div
                                                @click="
                                                    toggleSection('documents')
                                                "
                                                class="flex justify-between items-center cursor-pointer mb-3"
                                            >
                                                <h2
                                                    class="text-lg font-semibold text-gray-800 flex items-center"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="h-5 w-5 mr-2 text-gray-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                        />
                                                    </svg>
                                                    Application Documents
                                                </h2>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    :class="[
                                                        'h-5 w-5 text-gray-500 section-toggle',
                                                        {
                                                            collapsed:
                                                                !sectionStates.documents,
                                                        },
                                                    ]"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </div>
                                            <div
                                                v-show="sectionStates.documents"
                                                class="section-content"
                                            >
                                                <div
                                                    v-if="
                                                        application.documents &&
                                                        application.documents
                                                            .length > 0
                                                    "
                                                >
                                                    <div
                                                        v-for="doc in application.documents"
                                                        :key="doc.document_id"
                                                        class="mb-3 flex items-center justify-between p-3 hover:bg-gray-100 rounded-md transition-colors"
                                                    >
                                                        <div
                                                            class="flex items-center"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                :id="`doc-${doc.document_id}`"
                                                                v-model="
                                                                    documentChecks[
                                                                        doc
                                                                            .document_id
                                                                    ]
                                                                "
                                                                class="mr-3 h-4 w-4 text-green-600 focus:ring-green-500 rounded border-gray-300 cursor-pointer"
                                                            />
                                                            <label
                                                                :for="`doc-${doc.document_id}`"
                                                                class="flex items-center cursor-pointer"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    class="h-5 w-5 text-gray-500 mr-2"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        stroke-width="2"
                                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                                    />
                                                                </svg>
                                                                <span
                                                                    class="text-gray-800"
                                                                    >{{
                                                                        doc.document_type
                                                                            .charAt(
                                                                                0,
                                                                            )
                                                                            .toUpperCase() +
                                                                        doc.document_type.slice(
                                                                            1,
                                                                        )
                                                                    }}</span
                                                                >
                                                            </label>
                                                        </div>
                                                        <button
                                                            @click="
                                                                openDocumentSidebar(
                                                                    doc,
                                                                )
                                                            "
                                                            class="text-green-800 hover:text-green-700 px-3 py-1 rounded hover:bg-green-50 transition-colors flex items-center"
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
                                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                />
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                />
                                                            </svg>
                                                            View
                                                        </button>
                                                    </div>
                                                </div>
                                                <div
                                                    v-else
                                                    class="text-gray-500"
                                                >
                                                    No documents attached
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Right Column: Application Summary and Status Update -->
                                    <div class="space-y-8">
                                        <div
                                            class="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm"
                                        >
                                            <h2
                                                class="text-lg font-semibold mb-4 text-gray-800 flex items-center"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="h-5 w-5 mr-2 text-gray-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                Application Summary
                                            </h2>
                                            <div class="space-y-4">
                                                <div>
                                                    <label
                                                        class="block text-sm font-medium text-gray-500"
                                                        >Application ID</label
                                                    >
                                                    <p
                                                        class="mt-1 text-gray-800 font-medium"
                                                    >
                                                        {{
                                                            application.application_id
                                                        }}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label
                                                        class="block text-sm font-medium text-gray-500"
                                                        >Applied On</label
                                                    >
                                                    <p
                                                        class="mt-1 text-gray-800 font-medium"
                                                    >
                                                        {{
                                                            formatDate(
                                                                application.created_at,
                                                            )
                                                        }}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label
                                                        class="block text-sm font-medium text-gray-500"
                                                        >Current Status</label
                                                    >
                                                    <p class="mt-1">
                                                        <span
                                                            class="px-3 py-1 text-sm font-semibold rounded-full inline-block"
                                                            :class="
                                                                getStatusColor(
                                                                    application.status,
                                                                )
                                                            "
                                                        >
                                                            {{
                                                                application.status
                                                            }}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Status Update Form -->
                                        <div
                                            class="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm"
                                        >
                                            <h2
                                                class="text-lg font-semibold mb-4 text-gray-800 flex items-center"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="h-5 w-5 mr-2 text-gray-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                    />
                                                </svg>
                                                Update Status
                                            </h2>
                                            <form
                                                @submit.prevent="updateStatus"
                                            >
                                                <div class="mb-5">
                                                    <label
                                                        for="status"
                                                        class="block text-sm font-medium text-gray-700 mb-2"
                                                        >Status</label
                                                    >
                                                    <select
                                                        id="status"
                                                        v-model="form.status"
                                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        required
                                                    >
                                                        <option
                                                            v-for="status in statuses"
                                                            :key="status"
                                                            :value="status"
                                                        >
                                                            {{ status }}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div class="mb-5">
                                                    <label
                                                        for="remarks"
                                                        class="block text-sm font-medium text-gray-700 mb-2"
                                                        >Remarks</label
                                                    >
                                                    <textarea
                                                        id="remarks"
                                                        v-model="form.remarks"
                                                        rows="3"
                                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        placeholder="Add any notes about this status change"
                                                    ></textarea>
                                                </div>
                                                <button
                                                    type="submit"
                                                    class="w-full bg-green-700 text-white py-3 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                                                    :disabled="form.processing"
                                                >
                                                    {{
                                                        form.processing
                                                            ? "Updating..."
                                                            : "Update Status"
                                                    }}
                                                </button>
                                            </form>
                                        </div>

                                        <!-- Application Status History -->
                                        <div
                                            v-if="
                                                application.status_history &&
                                                application.status_history
                                                    .length > 0
                                            "
                                            class="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm h-96 overflow-y-auto"
                                        >
                                            <div
                                                @click="
                                                    toggleSection(
                                                        'statusHistory',
                                                    )
                                                "
                                                class="flex justify-between items-center cursor-pointer mb-1"
                                            >
                                                <h2
                                                    class="text-lg font-semibold text-gray-800 flex items-center"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="h-5 w-5 mr-2 text-gray-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                        />
                                                    </svg>
                                                    Status History
                                                </h2>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    :class="[
                                                        'h-5 w-5 text-gray-500 section-toggle',
                                                        {
                                                            collapsed:
                                                                !sectionStates.statusHistory,
                                                        },
                                                    ]"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </div>
                                            <div
                                                v-show="
                                                    sectionStates.statusHistory
                                                "
                                                class="section-content"
                                            >
                                                <div
                                                    class="space-y-6 pl-[10px]"
                                                >
                                                    <div
                                                        v-for="(
                                                            history, index
                                                        ) in application.status_history"
                                                        :key="index"
                                                        class="border-l-2 border-gray-300 pl-5 relative"
                                                    >
                                                        <div
                                                            class="absolute w-3 h-3 bg-green-600 rounded-full -left-[5px] transform -translate-x-[1px]"
                                                        ></div>
                                                        <p
                                                            class="text-sm text-gray-500"
                                                        >
                                                            {{
                                                                formatDateTime(
                                                                    history.created_at,
                                                                )
                                                            }}
                                                        </p>
                                                        <p class="font-medium">
                                                            Status changed from
                                                            <span
                                                                class="font-semibold"
                                                                >{{
                                                                    history.previous_status ||
                                                                    "New"
                                                                }}</span
                                                            >
                                                            to
                                                            <span
                                                                class="font-semibold"
                                                                >{{
                                                                    history.new_status
                                                                }}</span
                                                            >
                                                        </p>
                                                        <p
                                                            v-if="
                                                                history.remarks
                                                            "
                                                            class="text-gray-600 mt-1"
                                                        >
                                                            {{
                                                                history.remarks
                                                            }}
                                                        </p>
                                                        <p
                                                            class="text-sm text-gray-500 mt-1"
                                                        >
                                                            By:
                                                            {{
                                                                history.updater
                                                                    ? history
                                                                          .updater
                                                                          .username
                                                                    : "System"
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Sidebar for Document Viewing -->
                    <div
                        v-if="showDocumentSidebar"
                        class="fixed top-0 right-0 h-full w-[450px] bg-white shadow-xl z-40 overflow-hidden"
                        style="border-left: 1px solid #e5e7eb"
                    >
                        <div class="h-full flex flex-col">
                            <!-- Sidebar Header - Improved design -->
                            <div
                                class="flex items-center justify-between px-5 py-4 border-b bg-gray-50"
                            >
                                <h3
                                    class="text-lg font-medium text-gray-800 flex items-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 mr-2 text-gray-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    {{
                                        currentDocument
                                            ? currentDocument.document_type
                                                  .charAt(0)
                                                  .toUpperCase() +
                                              currentDocument.document_type.slice(
                                                  1,
                                              )
                                            : "Document Viewer"
                                    }}
                                </h3>
                                <button
                                    @click="closeDocumentSidebar"
                                    class="text-gray-500 hover:text-gray-700 focus:outline-none p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-6 w-6"
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
                                </button>
                            </div>

                            <!-- Document Viewer Content -->
                            <div class="flex-1 overflow-hidden bg-gray-100">
                                <iframe
                                    v-if="documentUrl"
                                    :src="documentUrl"
                                    class="w-full h-full border-0"
                                    title="Document Viewer"
                                ></iframe>
                                <div
                                    v-else
                                    class="flex items-center justify-center h-full"
                                >
                                    <p class="text-gray-500">
                                        <svg
                                            class="animate-spin h-8 w-8 text-gray-400 mx-auto mb-2"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                class="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                stroke-width="4"
                                            ></circle>
                                            <path
                                                class="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Loading document...
                                    </p>
                                </div>
                            </div>

                            <!-- Sidebar Footer -->
                            <div class="px-5 py-3 border-t bg-gray-50">
                                <div class="flex justify-between">
                                    <button
                                        @click="closeDocumentSidebar"
                                        class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
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
                                        Close
                                    </button>
                                    <a
                                        v-if="documentUrl"
                                        :href="documentUrl"
                                        target="_blank"
                                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
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
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                        Open in new tab
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </HRLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { Head, useForm } from "@inertiajs/vue3";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs.vue";

const props = defineProps({
    application: {
        type: Object,
        required: true,
    },
    statuses: {
        type: Array,
        required: true,
    },
});

// Create a reactive reference for the application data
const application = ref(props.application);

// Console log for debugging
console.log("Application data structure:", application.value);

// Initialize localStorage keys
const getLocalStorageKey = (type) => {
    return `app_${application.value.application_id}_${type}`;
};

// Add refs for document sidebar
const showDocumentSidebar = ref(false);
const currentDocument = ref(null);
const documentUrl = ref(null);

// Document caching system
const documentCache = ref({});

// Form for status updates
const form = useForm({
    status: application.value.status,
    remarks: "",
});

// Toggle functionality for sections
const sectionStates = ref({
    applicant: true, // Default to open
    job: true, // Default to open
    education: true, // Default to open
    training: true,
    workExperience: true,
    documents: true,
    statusHistory: true, // Default to open
});

// Load section states from localStorage
const loadSectionStates = () => {
    try {
        const saved = localStorage.getItem(
            getLocalStorageKey("section_states"),
        );
        if (saved) {
            const parsed = JSON.parse(saved);
            sectionStates.value = { ...sectionStates.value, ...parsed };
        }
    } catch (e) {
        console.error("Error loading section states:", e);
    }
};

// Save section states to localStorage
const saveSectionStates = () => {
    try {
        localStorage.setItem(
            getLocalStorageKey("section_states"),
            JSON.stringify(sectionStates.value),
        );
    } catch (e) {
        console.error("Error saving section states:", e);
    }
};

// Toggle a section and save state
const toggleSection = (section) => {
    sectionStates.value[section] = !sectionStates.value[section];
    saveSectionStates();
};

// Document checkboxes with localStorage persistence
const documentChecks = ref({});

// Load document check states from localStorage
const loadDocumentChecks = () => {
    if (application.value.documents) {
        try {
            const saved = localStorage.getItem(
                getLocalStorageKey("document_checks"),
            );
            if (saved) {
                documentChecks.value = JSON.parse(saved);
            } else {
                // Initialize with empty states
                application.value.documents.forEach((doc) => {
                    documentChecks.value[doc.document_id] = false;
                });
            }
        } catch (e) {
            console.error("Error loading document checks:", e);
        }
    }
};

// Save document check state to localStorage
const saveDocumentCheckState = () => {
    try {
        localStorage.setItem(
            getLocalStorageKey("document_checks"),
            JSON.stringify(documentChecks.value),
        );
    } catch (e) {
        console.error("Error saving document checks:", e);
    }
};

// Watch for changes to document checks and save
watch(
    documentChecks,
    () => {
        saveDocumentCheckState();
    },
    { deep: true },
);

// Initialize on component mount
onMounted(() => {
    loadSectionStates();
    loadDocumentChecks();
});

// Document sidebar functionality
const openDocumentSidebar = (doc) => {
    currentDocument.value = doc;

    // Check if this document is already in the cache
    const cacheKey = `doc_${doc.document_id}`;
    if (documentCache.value[cacheKey]) {
        console.log(`Using cached document: ${cacheKey}`);
        documentUrl.value = documentCache.value[cacheKey];
    } else {
        // Not cached, generate the URL and store in cache
        const url = `/storage/${doc.file_path}`;
        documentCache.value[cacheKey] = url;
        documentUrl.value = url;
        console.log(`Caching document: ${cacheKey}`);
    }

    showDocumentSidebar.value = true;
};

const closeDocumentSidebar = () => {
    showDocumentSidebar.value = false;
    currentDocument.value = null;
    documentUrl.value = null;
};

// Status update functionality
const updateStatus = async () => {
    console.log("this is the status change: ", form.status);
    // Check if the new status is the same as the current status
    if (form.status === application.value.status) {
        showToast({
            icon: "warning",
            title: "No changes made",
            text: "The selected status is the same as the current status",
        });
        return;
    }

    try {
        const response = await axios.put(
            route("applications.update", application.value.application_id),
            {
                status: form.status,
                remarks: form.remarks,
            },
        );

        // Update the application data with the response from the server
        if (response.data) {
            const data = response.data;
            console.log("this is the response: ", data.applications);

            application.value = data.applications;

            showToast({
                icon: "success",
                title: "Status updated successfully",
                success: true,
            });
        }

        // Reset remarks field
        form.remarks = "";
    } catch (error) {
        console.error("Error updating status:", error);
        showToast({
            icon: "error",
            title: "Failed to update status",
            text:
                error.response?.data?.message ||
                error.message ||
                "An error occurred",
            success: false,
        });
    }
};

// Helper Functions
const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const getStatusColor = (status) => {
    const colors = {
        Pending: "bg-yellow-100 text-yellow-800",
        Qualified: "bg-green-100 text-green-800",
        Disqualified: "bg-red-100 text-red-800",
        "Competency Exam": "bg-blue-100 text-blue-800",
        Rejected: "bg-red-100 text-red-800",
        Interview: "bg-purple-100 text-purple-800",
        Accepted: "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
};

// Toast notification function
const showToast = (config) => {
    Swal.fire({
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        ...config,
        background: config.success ? "#22c55e" : "#ef4444",
        color: "#ffffff",
        iconColor: "#ffffff",
    });
};
</script>

<style>
.section-toggle {
    transition: transform 0.2s ease;
}
.section-toggle.collapsed {
    transform: rotate(-90deg);
}
.section-content {
    transition: max-height 0.3s ease;
    overflow: hidden;
}

/* Animation related styles removed */
</style>
