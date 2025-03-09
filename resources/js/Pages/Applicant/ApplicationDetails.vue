<template>
    <Head :title="`Application - ${application.job_listing.title}`" />

    <ApplicantLayout>
        <template #header>
            <Header :title="`Application Details`" />
        </template>

        <div class="py-5">
            <div class="container-fluid px-4">
                <Breadcrumbs
                    :items="[
                        { name: 'Home', href: route('applicant.index') },
                        {
                            name: 'My Applications',
                            href: route('my-applications.index'),
                        },
                        {
                            name: 'Application Details',
                            href: route(
                                'my-applications.show',
                                application.application_id,
                            ),
                            active: true,
                        },
                    ]"
                />

                <div class="card shadow-sm rounded-lg overflow-hidden bg-white">
                    <!-- Back Button -->
                    <div class="p-4 border-b">
                        <button
                            @click="
                                $inertia.get(route('my-applications.index'))
                            "
                            class="flex items-center text-gray-600 hover:text-gray-900"
                        >
                            <i class="fas fa-arrow-left mr-2"></i>
                            Back to Applications
                        </button>
                    </div>

                    <div class="p-6">
                        <!-- Application Status -->
                        <div class="mb-6 flex items-center justify-between">
                            <h1 class="text-2xl font-bold text-gray-900">
                                {{ application.job_listing.title }}
                            </h1>
                            <span
                                class="px-3 py-1 text-sm font-semibold rounded-full"
                                :class="{
                                    'bg-yellow-100 text-yellow-800':
                                        application.status === 'Pending',
                                    'bg-green-100 text-green-800':
                                        application.status === 'Approved',
                                    'bg-red-100 text-red-800':
                                        application.status === 'Rejected',
                                    'bg-blue-100 text-blue-800':
                                        application.status === 'Shortlisted',
                                    'bg-purple-100 text-purple-800':
                                        application.status === 'Interview',
                                    'bg-gray-100 text-gray-800': ![
                                        'Pending',
                                        'Approved',
                                        'Rejected',
                                        'Shortlisted',
                                        'Interview',
                                    ].includes(application.status),
                                }"
                            >
                                {{ application.status }}
                            </span>
                        </div>

                        <!-- Application Details -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <!-- Left Column: Job Information -->
                            <div class="md:col-span-2 space-y-6">
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <h2 class="text-lg font-semibold mb-3">
                                        Job Information
                                    </h2>
                                    <div class="space-y-3">
                                        <div>
                                            <label
                                                class="block text-sm font-medium text-gray-500"
                                                >Position</label
                                            >
                                            <p class="mt-1">
                                                {{
                                                    application.job_listing
                                                        .position.position_name
                                                }}
                                            </p>
                                        </div>
                                        <div>
                                            <label
                                                class="block text-sm font-medium text-gray-500"
                                                >Category</label
                                            >
                                            <p class="mt-1">
                                                {{
                                                    application.job_listing
                                                        .category?.name || "N/A"
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
                                                    application.job_listing
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
                                                        application.job_listing
                                                            .closing_date,
                                                    )
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Application Documents -->
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <h2 class="text-lg font-semibold mb-3">
                                        Application Documents
                                    </h2>
                                    <div
                                        v-if="
                                            application.documents &&
                                            application.documents.length > 0
                                        "
                                    >
                                        <div
                                            v-for="doc in application.documents"
                                            :key="doc.document_id"
                                            class="mb-2 flex items-center justify-between"
                                        >
                                            <div class="flex items-center">
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
                                                <span>{{
                                                    doc.document_type
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    doc.document_type.slice(1)
                                                }}</span>
                                            </div>
                                            <button
                                                @click="openDocumentModal(doc)"
                                                class="text-blue-600 hover:text-blue-800"
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                    <div v-else class="text-gray-500">
                                        No documents attached
                                    </div>
                                </div>

                                <!-- Application Status History -->
                                <div
                                    v-if="
                                        application.status_history &&
                                        application.status_history.length > 0
                                    "
                                    class="bg-gray-50 p-4 rounded-lg"
                                >
                                    <h2 class="text-lg font-semibold mb-3">
                                        Status History
                                    </h2>
                                    <div class="space-y-4">
                                        <div
                                            v-for="(
                                                history, index
                                            ) in application.status_history"
                                            :key="index"
                                            class="border-l-2 border-gray-300 pl-4 pb-4 relative"
                                        >
                                            <div
                                                class="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px]"
                                            ></div>
                                            <p class="text-sm text-gray-500">
                                                {{
                                                    formatDate(
                                                        history.created_at,
                                                    )
                                                }}
                                            </p>
                                            <p class="font-medium">
                                                Status changed from
                                                <span class="font-semibold">{{
                                                    history.previous_status ||
                                                    "New"
                                                }}</span>
                                                to
                                                <span class="font-semibold">{{
                                                    history.new_status
                                                }}</span>
                                            </p>
                                            <p
                                                v-if="history.remarks"
                                                class="text-gray-600 mt-1"
                                            >
                                                {{ history.remarks }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Right Column: Application Summary -->
                            <div class="space-y-6">
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <h2 class="text-lg font-semibold mb-3">
                                        Application Summary
                                    </h2>
                                    <div class="space-y-3">
                                        <div>
                                            <label
                                                class="block text-sm font-medium text-gray-500"
                                                >Application ID</label
                                            >
                                            <p class="mt-1">
                                                {{ application.application_id }}
                                            </p>
                                        </div>
                                        <div>
                                            <label
                                                class="block text-sm font-medium text-gray-500"
                                                >Applied On</label
                                            >
                                            <p class="mt-1">
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
                                                {{ application.status }}
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
            class="fixed inset-0 z-50 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div
                class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
                <!-- Background overlay -->
                <div
                    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    @click="closeDocumentModal"
                ></div>

                <!-- Modal panel -->
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
                >
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mt-3 text-center sm:mt-0 sm:text-left w-full"
                            >
                                <h3
                                    class="text-lg leading-6 font-medium text-gray-900 mb-4"
                                    id="modal-title"
                                >
                                    {{
                                        currentDocument
                                            ? currentDocument.document_type
                                                  .charAt(0)
                                                  .toUpperCase() +
                                              currentDocument.document_type.slice(
                                                  1,
                                              )
                                            : "Document"
                                    }}
                                </h3>
                                <div
                                    class="mt-2 h-[70vh]"
                                    ref="documentContainer"
                                >
                                    <!-- Simple iframe for all document types -->
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
                                            Loading document...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                    >
                        <button
                            type="button"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            @click="closeDocumentModal"
                        >
                            Close
                        </button>
                        <a
                            v-if="currentDocument && documentUrl"
                            :href="documentUrl"
                            target="_blank"
                            class="inline-flex items-center justify-center rounded-md border border-transparent shadow-sm p-1 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Open in new tab
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </ApplicantLayout>
</template>

<script setup>
import { ref } from "vue";
import { Head } from "@inertiajs/vue3";
import ApplicantLayout from "@/Layouts/Applicant/ApplicantLayout.vue";
import Header from "@/Components/Header/Header.vue";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs.vue";

const props = defineProps({
    application: {
        type: Object,
        required: true,
    },
});

// Document modal state
const showDocumentModal = ref(false);
const currentDocument = ref(null);
const documentContainer = ref(null);
const documentUrl = ref(null);

const openDocumentModal = (doc) => {
    currentDocument.value = doc;
    documentUrl.value = `/storage/${doc.file_path}`;
    showDocumentModal.value = true;
};

const closeDocumentModal = () => {
    showDocumentModal.value = false;
    // Reset current document after a short delay to prevent visual glitches
    setTimeout(() => {
        currentDocument.value = null;
        documentUrl.value = null;
    }, 300);
};

const formatDate = (dateString) => {
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
</script>
