<template>
    <Head :title="`Application - ${application.job_listing.title}`" />

    <HRLayout>
        <template #header>
            <Header :title="`Application Details`" />
        </template>

        <div class="py-5">
            <div class="container-fluid px-4">
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
                                                   <i class="fas fa-user mr-2"></i>
                                                    Applicant Information
                                                </h2>
                                                <i class="fas fa-chevron-down section-toggle" :class="{ 'fa-chevron-up': sectionStates.applicant }"></i>
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
                                                    <i class="fas fa-briefcase mr-2"></i>
                                                    Job Information
                                                </h2>
                                                <i class="fas fa-chevron-down section-toggle" :class="{ 'fa-chevron-up': sectionStates.job }"></i>
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
                                                    <i class="fas fa-graduation-cap mr-2"></i>
                                                    Educational Background
                                                </h2>
                                                <i class="fas fa-chevron-down section-toggle" :class="{ 'fa-chevron-up': sectionStates.education }"></i>
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
                                                    <i class="fas fa-certificate mr-2"></i>
                                                    Training & Certifications
                                                </h2>
                                                <i class="fas fa-chevron-down section-toggle" :class="{ 'fa-chevron-up': sectionStates.training }"></i>
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
                                                    <i class="fas fa-briefcase mr-2"></i>
                                                    Work Experience
                                                </h2>
                                                <i class="fas fa-chevron-down section-toggle" :class="{ 'fa-chevron-up': sectionStates.workExperience }"></i>
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
                                                    <i class="fas fa-file-alt mr-2"></i>
                                                    Application Documents
                                                </h2>
                                                <i class="fas fa-chevron-down section-toggle" :class="{ 'fa-chevron-up': sectionStates.documents }"></i>
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
                                                                <i class="fas fa-file-alt mr-2 text-gray-600"></i>
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
                                                            <i class="fas fa-eye mr-1"></i>
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
                                                <i class="fas fa-clipboard-list mr-2"></i>
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
                                                <i class="fas fa-edit mr-2"></i>
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
                                                    <i class="fas fa-history mr-2"></i>
                                                    Status History
                                                </h2>
                                                <i class="fas fa-chevron-down section-toggle" :class="{ 'fa-chevron-up': sectionStates.statusHistory }"></i>
                                            </div>
                                            <div
                                                v-show="sectionStates.statusHistory"
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
                                    <i class="fas fa-file-alt mr-2 text-gray-600"></i>
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
                                    <i class="fas fa-times"></i>
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
                                        <i class="fas fa-spinner animate-spin h-8 w-8 text-gray-400 mx-auto mb-2"></i>
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
                                        <i class="fas fa-times mr-2"></i>
                                        Close
                                    </button>
                                    <a
                                        v-if="documentUrl"
                                        :href="documentUrl"
                                        target="_blank"
                                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                    >
                                        <i class="fas fa-external-link-alt mr-2"></i>
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
