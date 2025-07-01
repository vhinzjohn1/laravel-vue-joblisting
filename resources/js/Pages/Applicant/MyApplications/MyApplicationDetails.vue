<template>
    <ApplicantLayout>
        <Head :title="`Application - ${application.job_listing.title}`" />
        <template #header>
            <Header
                :title="`Application for ${application.job_listing.title}`"
            />
        </template>

        <div class="py-5">
            <div class="container-fluid px-4">
                <!-- Success Message -->
                <div
                    v-if="$page.props.flash && $page.props.flash.success"
                    class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                >
                    <span class="block sm:inline">{{
                        $page.props.flash.success
                    }}</span>
                </div>

                <!-- Pending Application Message -->
                <div
                    v-if="application.status === 'Pending'"
                    class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-4 flex items-start"
                >
                    <i class="fas fa-clock text-yellow-600 mt-1 mr-3"></i>
                    <div>
                        <h3 class="font-semibold mb-1">
                            Your application is currently under review
                        </h3>
                        <p class="text-sm">
                            Thank you for submitting your application. Our HR
                            team is currently reviewing your documents and
                            qualifications. This process typically takes 5-10
                            business days. You'll receive updates on your
                            application status through this portal. Please check
                            back regularly for updates.
                        </p>
                    </div>
                </div>

                <!-- Application Details -->
                <div
                    class="card shadow-sm rounded-lg overflow-hidden bg-white mb-6 flex flex-col"
                >
                    <!-- Back Button and Application Status -->
                    <div class="p-4 border-b flex items-center">
                        <div class="flex items-center">
                            <button
                                @click="
                                    $inertia.get(route('my-applications.index'))
                                "
                                class="flex items-center text-gray-600 hover:text-gray-900"
                            >
                                <i class="fas fa-arrow-left mr-2"></i>
                                Back
                            </button>
                        </div>
                        <div class="flex-1 ml-4 text-center">
                            <div
                                class="rounded-lg p-4 flex items-center justify-center"
                                :class="{
                                    'bg-green-50 border border-green-200':
                                        application.status === 'Accepted',
                                    'bg-yellow-50 border border-yellow-200':
                                        application.status === 'Pending' ||
                                        application.status === 'Interview' ||
                                        application.status === 'qualified' ||
                                        application.status ===
                                            'Competency Exam',
                                    'bg-red-50 border border-red-200':
                                        application.status === 'Rejected' ||
                                        application.status === 'Disqualified',
                                }"
                            >
                                <i
                                    class="fas fa-info-circle mr-2"
                                    :class="{
                                        'text-green-500':
                                            application.status === 'Accepted',
                                        'text-yellow-500':
                                            application.status === 'Pending' ||
                                            application.status ===
                                                'Interview' ||
                                            application.status ===
                                                'qualified' ||
                                            application.status ===
                                                'competency exam',
                                        'text-red-500':
                                            application.status === 'Rejected' ||
                                            application.status ===
                                                'Disqualified',
                                    }"
                                ></i>
                                <h6
                                    class="font-semibold mr-2"
                                    :class="{
                                        'text-green-900':
                                            application.status === 'Accepted',
                                        'text-yellow-900':
                                            application.status === 'Pending' ||
                                            application.status ===
                                                'Interview' ||
                                            application.status ===
                                                'Qualified' ||
                                            application.status ===
                                                'Competency Exam',
                                        'text-red-900':
                                            application.status === 'Rejected' ||
                                            application.status ===
                                                'Disqualified',
                                    }"
                                >
                                    Application Status:
                                </h6>
                                <p
                                    :class="{
                                        'text-green-800':
                                            application.status === 'Accepted',
                                        'text-yellow-800':
                                            application.status === 'Pending' ||
                                            application.status ===
                                                'Interview' ||
                                            application.status ===
                                                'Qualified' ||
                                            application.status ===
                                                'Competency Exam',
                                        'text-red-800':
                                            application.status === 'Rejected' ||
                                            application.status ===
                                                'Disqualified',
                                    }"
                                >
                                    {{ application.status }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="p-6">
                        <!-- Application Header -->
                        <div class="flex items-start gap-4 mb-6">
                            <div
                                class="flex-shrink-0 bg-green-50 rounded-lg p-4 flex items-center justify-center"
                                style="width: 64px; height: 64px"
                            >
                                <span
                                    class="text-green-600 font-medium text-xl"
                                >
                                    {{
                                        application.job_listing.position.position_name.substring(
                                            0,
                                            2,
                                        )
                                    }}
                                </span>
                            </div>
                            <div>
                                <h1
                                    class="text-2xl font-bold text-gray-900 mb-2"
                                >
                                    {{ application.job_listing.title }}
                                </h1>
                                <div
                                    class="flex items-center gap-3 text-gray-600"
                                >
                                    <span>{{
                                        application.job_listing.position
                                            .position_name
                                    }}</span>
                                    <span class="text-gray-400">•</span>
                                    <span class="inline-flex items-center">
                                        <span
                                            class="inline-block w-2 h-2 rounded-full mr-1"
                                            :class="{
                                                'bg-green-500':
                                                    application.status ===
                                                    'Accepted',
                                                'bg-yellow-500':
                                                    application.status ===
                                                        'Pending' ||
                                                    application.status ===
                                                        'Interview' ||
                                                    application.status ===
                                                        'Qualified' ||
                                                    application.status ===
                                                        'Competency Exam',
                                                'bg-red-500':
                                                    application.status ===
                                                        'Rejected' ||
                                                    application.status ===
                                                        'Disqualified',
                                            }"
                                        ></span>
                                        {{ application.status }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Application Details -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="md:col-span-2">
                                <!-- Job Description -->
                                <div class="mb-6">
                                    <h2 class="text-lg font-semibold mb-3">
                                        Job Description
                                    </h2>
                                    <p
                                        class="text-gray-600 whitespace-pre-line"
                                    >
                                        {{
                                            application.job_listing.description
                                        }}
                                    </p>
                                </div>

                                <!-- Application Documents -->
                                <div class="mb-6">
                                    <h2 class="text-lg font-semibold mb-3">
                                        Application Documents
                                    </h2>
                                    <div
                                        v-if="
                                            application.documents &&
                                            application.documents.length > 0
                                        "
                                        class="space-y-3"
                                    >
                                        <!-- Documents are now grouped by type -->
                                        <div
                                            class="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                        >
                                            <h3
                                                class="font-medium text-gray-700 mb-3"
                                            >
                                                Submitted Documents
                                            </h3>

                                            <!-- Document categories with fixed height and scrolling -->
                                            <div
                                                class="space-y-3 max-h-[400px] overflow-y-auto pr-2"
                                            >
                                                <div
                                                    v-for="(
                                                        docs, documentType
                                                    ) in groupedDocuments"
                                                    :key="documentType"
                                                    class="border-b border-gray-200 pb-3 last:border-0 last:pb-0"
                                                >
                                                    <h4
                                                        class="text-sm font-medium text-gray-600 mb-2"
                                                    >
                                                        {{ docs[0]?.document_type || 'Document' }}
                                                    </h4>

                                                    <div
                                                        v-for="doc in docs"
                                                        :key="doc.document_id"
                                                        class="p-3 bg-white rounded-lg flex items-center justify-between shadow-sm"
                                                    >
                                                        <div
                                                            class="flex items-center"
                                                        >
                                                            <i
                                                                class="far fa-file-pdf text-red-500 text-xl mr-3"
                                                            ></i>
                                                            <div>
                                                                <p
                                                                    class="font-medium"
                                                                >
                                                                    {{
                                                                        doc.document_name
                                                                    }}
                                                                </p>
                                                                <p
                                                                    class="text-xs text-gray-500"
                                                                >
                                                                    {{
                                                                        formatDate(
                                                                            doc.created_at,
                                                                        )
                                                                    }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            @click="
                                                                openDocumentModal(
                                                                    doc,
                                                                )
                                                            "
                                                            class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                                                        >
                                                            <i
                                                                class="fas fa-eye mr-1"
                                                            ></i>
                                                            View
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p v-else class="text-gray-500 italic">
                                        No documents uploaded.
                                    </p>
                                </div>

                                <!-- Application History -->
                                <div class="mb-6">
                                    <h2 class="text-lg font-semibold mb-3">
                                        Application History
                                    </h2>
                                    <div
                                        v-if="
                                            application.status_history &&
                                            application.status_history.length >
                                                0
                                        "
                                        class="border-l border-gray-200 pl-4 space-y-6"
                                    >
                                        <div
                                            v-for="history in application.status_history"
                                            :key="history.history_id"
                                            class="relative"
                                        >
                                            <div
                                                class="absolute -left-7 mt-1.5 w-3 h-3 rounded-full"
                                                :class="{
                                                    'bg-green-500':
                                                        history.new_status ===
                                                        'Accepted',
                                                    'bg-yellow-500':
                                                        history.new_status ===
                                                            'Pending' ||
                                                        history.new_status ===
                                                            'Interview' ||
                                                        history.new_status ===
                                                            'qualified' ||
                                                        history.new_status ===
                                                            'competency exam',
                                                    'bg-red-500':
                                                        history.new_status ===
                                                            'Rejected' ||
                                                        history.new_status ===
                                                            'Disqualified',
                                                }"
                                            ></div>
                                            <div
                                                class="mb-1 flex justify-between"
                                            >
                                                <p class="font-medium">
                                                    Status changed to
                                                    <span
                                                        class="px-2 py-0.5 rounded text-sm font-semibold"
                                                        :class="{
                                                            'bg-green-100 text-green-800':
                                                                history.new_status ===
                                                                'Accepted',
                                                            'bg-yellow-100 text-yellow-800':
                                                                history.new_status ===
                                                                    'Pending' ||
                                                                history.new_status ===
                                                                    'Interview' ||
                                                                history.new_status ===
                                                                    'qualified' ||
                                                                history.new_status ===
                                                                    'competency exam',
                                                            'bg-red-100 text-red-800':
                                                                history.new_status ===
                                                                    'Rejected' ||
                                                                history.new_status ===
                                                                    'Disqualified',
                                                        }"
                                                    >
                                                        {{ history.new_status }}
                                                    </span>
                                                </p>
                                                <p
                                                    class="text-sm text-gray-500"
                                                >
                                                    {{
                                                        formatDate(
                                                            history.created_at,
                                                        )
                                                    }}
                                                </p>
                                            </div>
                                            <p
                                                v-if="history.remarks"
                                                class="text-gray-600 mt-1"
                                            >
                                                {{ history.remarks }}
                                            </p>
                                            <p
                                                v-if="
                                                    history.new_status ===
                                                        'Pending' &&
                                                    !history.remarks
                                                "
                                                class="text-gray-600 mt-1 italic"
                                            >
                                                Your application is being
                                                reviewed by our HR team. Please
                                                be patient while we verify your
                                                details and documents. This
                                                process typically takes 5-10
                                                business days.
                                            </p>
                                        </div>
                                    </div>
                                    <p v-else class="text-gray-500 italic">
                                        No status changes recorded yet.
                                    </p>
                                </div>
                            </div>

                            <!-- Right Column: Application Summary -->
                            <div class="space-y-6">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h3 class="font-semibold mb-4">
                                        Application Information
                                    </h3>
                                    <div class="space-y-3">
                                        <div>
                                            <label class="text-sm text-gray-500"
                                                >Application ID</label
                                            >
                                            <p class="font-medium">
                                                {{ application.application_id }}
                                            </p>
                                        </div>
                                        <div>
                                            <label class="text-sm text-gray-500"
                                                >Date Applied</label
                                            >
                                            <p class="font-medium">
                                                {{
                                                    formatDate(
                                                        application.created_at,
                                                    )
                                                }}
                                            </p>
                                        </div>
                                        <div>
                                            <label class="text-sm text-gray-500"
                                                >Current Status</label
                                            >
                                            <p class="font-medium">
                                                <span
                                                    class="px-2 py-0.5 rounded text-sm font-semibold"
                                                    :class="{
                                                        'bg-green-100 text-green-800':
                                                            application.status ===
                                                            'Accepted',
                                                        'bg-yellow-100 text-yellow-800':
                                                            application.status ===
                                                                'Pending' ||
                                                            application.status ===
                                                                'Interview' ||
                                                            application.status ===
                                                                'Qualified' ||
                                                            application.status ===
                                                                'Competency Exam',
                                                        'bg-red-100 text-red-800':
                                                            application.status ===
                                                                'Rejected' ||
                                                            application.status ===
                                                                'Disqualified',
                                                    }"
                                                >
                                                    {{ application.status }}
                                                </span>
                                                <span
                                                    v-if="
                                                        application.status ===
                                                        'Pending'
                                                    "
                                                    class="block mt-2 text-xs text-gray-600"
                                                >
                                                    Please wait while our HR
                                                    team reviews your
                                                    application and verifies
                                                    your documents.
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <label class="text-sm text-gray-500"
                                                >Job Category</label
                                            >
                                            <p class="font-medium">
                                                {{
                                                    application.job_listing
                                                        .category
                                                }}
                                            </p>
                                        </div>
                                        <div>
                                            <label class="text-sm text-gray-500"
                                                >Position</label
                                            >
                                            <p class="font-medium">
                                                {{
                                                    application.job_listing
                                                        .position.position_name
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

        <!-- Document Viewer Modal -->
        <div
            v-if="showDocumentModal"
            class="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center"
        >
            <div
                class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                @click="closeDocumentModal"
            ></div>
            <div class="transform transition-all sm:max-w-4xl w-full relative">
                <div class="bg-white rounded-lg shadow-xl p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold">
                            {{ currentDocument?.document_name }}
                        </h3>
                        <button
                            @click="closeDocumentModal"
                            class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <span class="sr-only">Close</span>
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div
                        class="bg-gray-100 p-2 rounded h-[70vh] overflow-hidden"
                    >
                        <iframe
                            :src="documentUrl"
                            class="w-full h-full"
                            frameborder="0"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    </ApplicantLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { Head } from "@inertiajs/vue3";
import ApplicantLayout from "@/Layouts/Applicant/ApplicantLayout.vue";
import Header from "@/Components/Header/Header.vue";

// Props
const props = defineProps({
    application: {
        type: Object,
        required: true,
    },
});

// Document viewer modal
const showDocumentModal = ref(false);
const currentDocument = ref(null);
const documentUrl = ref(null);

const openDocumentModal = (doc) => {
    currentDocument.value = doc;
    documentUrl.value = `/storage/${doc.file_path}`;
    showDocumentModal.value = true;
};

const closeDocumentModal = () => {
    showDocumentModal.value = false;
    currentDocument.value = null;
};

// Format date
const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Group documents by type
const groupedDocuments = computed(() => {
    if (
        !props.application.documents ||
        props.application.documents.length === 0
    ) {
        return {};
    }

    // Group documents by their type
    const result = {};

    props.application.documents.forEach((doc) => {
        const type = doc.document_type || "other";
        if (!result[type]) {
            result[type] = [];
        }
        result[type].push(doc);
    });

    return result;
});

// Format document type for display
const formatDocumentType = (type) => {
    const typeMap = {
        application_letter: "Application Letter",
        personal_data_sheet: "Personal Data Sheet",
        work_experience_sheet: "Work Experience Sheet",
        transcript_and_diploma: "Transcript and Diploma",
        eligibility_proof: "Eligibility Proof",
        performance_rating: "Performance Rating",
        training_certificates: "Training Certificates",
        employment_certificate: "Employment Certificate",
        other: "Other Documents",
    };

    return (
        typeMap[type] ||
        type
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    );
};
</script>
