<template>
    <HRLayout>
        <Head title="Job Listings" />
        <template #header>
            <Header title="Job Listings" />
        </template>

        <div>
            <!-- Batches Section -->
            <Collapsible :initially-open="false">
                <template #header>
                    <div class="flex items-center justify-between w-full">
                        <h1 class="text-2xl font-bold uppercase tracking-wider">
                            Batches
                        </h1>
                        <div class="flex gap-2">
                            <PrimaryButton @click.stop="showAddBatchModal = true">
                                Add Batch
                            </PrimaryButton>
                        </div>
                    </div>
                </template>

                <div class="bg-white px-4 rounded-lg shadow-md">
                    <BatchCustomTable
                        :items="filteredBatches"
                        @edit="editBatch"
                        @delete="deleteBatch"
                        @bulk-archive="handleBulkArchiveBatches"
                        :show-delete="true"
                    />
                </div>
            </Collapsible>
            <div class="max-w-full mt-3">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <div
                            v-if="batches.length === 0"
                            class="text-center py-8 text-gray-500"
                        >
                            No batches found, please add one to proceed
                        </div>

                        <div v-else class="space-y-3">

                            <h1 class="text-xl font-bold uppercase tracking-wider text-center">
                                Job Listing Batches
                            </h1>
                            <div
                                class="mx-auto w-24 h-1 bg-green-600 rounded-full"
                            ></div>
                            <!-- Job listing Batches List (Collapsible) -->
                            <div v-for="batch in filteredBatches" :key="batch.batch_id" class="mt-4">

                                <Collapsible
                                    :title="`${batch.batch_name} - ${batch.batch_code}`"
                                    :initially-open="false"
                                    :id="batch.batch_id"
                                >
                                    <template #header>
                                        <div class="flex items-center justify-between w-full">
                                            <div>
                                                <h3 class="text-lg font-semibold">{{ batch.batch_name }} - {{ batch.batch_code }}</h3>
                                                <p class="text-sm text-gray-500">
                                                    {{ batch.job_listings.length }} job listings
                                                </p>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <span class="text-sm text-gray-800">
                                                    {{ new Date(batch.post_date).toLocaleDateString() }} -
                                                    {{ new Date(batch.deadline).toLocaleDateString() }}
                                                </span>
                                                <PrimaryButton @click.stop="() => {
                                                    selectedBatch = batch;
                                                    showAddModal = true;
                                                    newJob.closing_date = batch.deadline;
                                                }">
                                                    <i class="fa fa-plus"></i>
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </template>

                                    <JobListingTable
                                        :items="batch.job_listings"
                                        :is-plantilla="true"
                                        @edit="editJob"
                                        @view="viewJob"
                                        @bulk-edit="handleBulkEdit"
                                        @bulk-delete="handleBulkDelete"
                                        @bulk-archive="handleBulkArchive"
                                    />
                                </Collapsible>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Non-Plantilla Job Listings Section -->
        <Collapsible :initially-open="true" class="mt-4">
            <template #header>
                <div class="flex flex-col items-center justify-center w-full space-y-3">
                    <h1 class="text-xl font-bold uppercase tracking-wider text-center">
                        Non-Plantilla Job Listings
                    </h1>
                    <div
                            class="mx-auto w-24 h-1 bg-green-600 rounded-full"
                        ></div>

                </div>
            </template>

            <div class="bg-white px-4 rounded-lg shadow-md">
                <div class="space-y-4">
                    <!-- Search Bar for Non-Plantilla -->
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center w-full justify-between">
                            <h1 class="text-xl font-semibold mr-4">
                                Contract of Service & Job Order Positions
                            </h1>
                            <div class="flex gap-2">
                                <PrimaryButton @click.stop="() => {
                                    selectedBatch = {
                                        batch_id: 2,
                                        deadline: null,
                                        is_plantilla: 0
                                    };
                                    showAddModal = true;
                                }">
                                    Add Job Listing
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>

                    <!-- Non-Plantilla Job Listings Table -->
                    <div class="table-responsive">
                        <JobListingTable
                            :items="nonPlantillaJobs"
                            :is-plantilla="false"
                            @edit="editJob"
                            @view="viewJob"
                            @bulk-edit="handleBulkEdit"
                            @bulk-delete="handleBulkDelete"
                        />
                    </div>
                </div>
            </div>
        </Collapsible>

        <!-- Add Batch Modal -->
        <Modal
            :show="showAddBatchModal"
            @close="() => {
                showAddBatchModal = false;
                resetBatchForm();
            }"
            title="Create New Batch"
            max-width="2xl"
        >
            <form @submit.prevent="createBatch">
                <div class="p-5">
                    <div class="grid grid-cols-1 gap-4">
                       <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Batch Name *
                                </label>
                                <TextInput
                                    v-model="newBatch.batch_name"
                                    required
                                />
                            </div>

                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Batch Code *
                                </label>
                                <TextInput
                                    v-model="newBatch.batch_code"
                                    value="defaultBatchCode"
                                    required
                                />
                            </div>
                       </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Post Date *
                                </label>
                                <TextInput
                                    type="date"
                                    v-model="newBatch.post_date"
                                    required
                                />
                            </div>

                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Deadline *
                                </label>
                                <TextInput
                                    type="date"
                                    v-model="newBatch.deadline"
                                    required
                                />
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Status *
                                </label>
                                <CustomSelect
                                    :options="[
                                        { value: 'Active' },
                                        { value: 'Draft' },
                                        { value: 'Closed' }
                                    ]"
                                    v-model="newBatch.status"
                                    :value-key="'value'"
                                    :display-format="(option) => option.value"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end gap-4 mt-6 p-4 border-t">
                    <button
                        type="button"
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                        @click="showAddBatchModal = false"
                    >
                        Cancel
                    </button>
                    <PrimaryButton
                        type="submit"
                        :loading="isLoading"
                        :disabled="isLoading"
                    >
                        Create Batch
                    </PrimaryButton>
                </div>
            </form>
        </Modal>

        <!-- Add Job Modal -->
        <Modal
            :show="showAddModal"
            @close="
                () => {
                    showAddModal = false;
                    clearErrors();
                }
            "
            title="Create New Job Listing"
            max-width="6xl"
        >
            <form @submit.prevent="saveJob">
                <div class="p-5">
                    <!-- Basic Information Section -->
                    <div class="mb-2">
                        <h6
                            class="font-semibold text-gray-800 mb-4 pb-2 border-b"
                        >
                            Basic Information
                        </h6>

                        <!-- Job Title and Position -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Job Title -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                    for="jobTitle"
                                >
                                    Job Title *
                                </label>
                                <TextInput
                                    id="jobTitle"
                                    v-model="newJob.title"
                                    required
                                />
                            </div>

                            <!-- Position -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                    for="position"
                                >
                                    Position *
                                </label>
                                <CustomSelect
                                    :options="filteredPositions"
                                    v-model="newJob.position_id"
                                    placeholder="Select a position"
                                    :value-key="'position_id'"
                                    :display-format="
                                        (position) =>
                                            `${position.position_name} (${position.item_number})`
                                    "
                                    required
                                    @select="handlePositionSelect"
                                />
                            </div>
                        </div>

                        <!-- Salary Grade and Item Number -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div class="grid grid-cols-2 gap-2">
                                <!-- Salary Grade -->
                                <div class="form-group">
                                    <label
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Salary Grade
                                    </label>
                                    <p class="text-gray-700 py-2">
                                        {{
                                            selectedPosition?.salary_grade
                                                ?.salary_grade || "-"
                                        }}
                                    </p>
                                </div>

                                <!-- Item Number -->
                                <div class="form-group">
                                    <label
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Item Number
                                    </label>
                                    <p class="text-gray-700 py-2">
                                        {{
                                            selectedPosition?.item_number === ""
                                                ? "CoS/Job Order"
                                                : selectedPosition?.item_number ||
                                                  "-"
                                        }}
                                    </p>
                                </div>
                            </div>
                            <!-- Category -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                    for="category"
                                >
                                    Category *
                                </label>
                                <p class="text-gray-700 py-2">
                                    {{ selectedPosition?.category || "-" }}
                                </p>
                            </div>
                        </div>

                        <!-- Closing Date and Applicant Limit -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <!-- Closing Date -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Closing Date *
                                </label>
                                <TextInput
                                    type="date"
                                    v-model="newJob.closing_date"
                                    required
                                    :max="selectedBatch?.is_plantilla ? selectedBatch?.deadline : null"
                                    :class="{
                                        'border-red-500': errors.closing_date,
                                    }"
                                />
                                <p
                                    v-if="errors.closing_date"
                                    class="mt-1 text-sm text-red-600"
                                >
                                    {{ errors.closing_date[0] }}
                                </p>
                            </div>
                            <!-- Status -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Status *
                                </label>
                                <CustomSelect
                                    :options="[
                                        { value: 'Active' },
                                        { value: 'Draft' }
                                    ]"
                                    v-model="newJob.status"
                                    :value-key="'value'"
                                    :display-format="(option) => option.value"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                     <!-- Place Assigned Section -->
                     <div>
                            <h6 class="font-semibold text-gray-800 mb-2 border-b">
                                Place Assigned
                            </h6>
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Place Assigned *
                                </label>
                                <TextInput
                                    v-model="newJob.place_assigned"
                                    required
                                />
                            </div>
                        </div>

                    <!-- Job Description Section -->
                    <div class="mb-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Left Column: Job Description -->
                            <div>
                                <h6 class="font-semibold text-gray-800 mb-4 pb-2 border-b">
                                    Job Description
                                </h6>
                                <div class="form-group">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">
                                        Description *
                                    </label>
                                    <TextArea
                                        v-model="newJob.description"
                                        rows="4"
                                        placeholder="Enter job description"
                                        required
                                    />
                                </div>
                            </div>

                            <!-- Right Column: Required Documents -->
                            <div>
                                <h6 class="font-semibold text-gray-800 mb-4 pb-2 border-b">
                                    Required Documents
                                </h6>
                                <div class="space-y-2 max-h-[200px] overflow-y-auto">
                                    <div v-for="doc in requiredDocuments" :key="doc.required_document_id" class="flex items-center">
                                        <input
                                            type="checkbox"
                                            :id="'doc-' + doc.required_document_id"
                                            v-model="newJob.required_documents"
                                            :value="doc.required_document_id"
                                            class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                        >
                                        <label :for="'doc-' + doc.required_document_id" class="ml-2 text-sm text-gray-700">
                                            {{ doc.document_name }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Minimum Requirements Section -->
                    <div
                        v-if="selectedPosition?.minimum_requirement"
                        class="mb-4"
                    >
                        <h6
                            class="font-semibold text-gray-800 mb-4 pb-2 border-b"
                        >
                            Minimum Requirements
                        </h6>
                        <ul
                            class="list-disc list-inside text-sm text-gray-600 space-y-2"
                        >
                            <li
                                v-if="
                                    selectedPosition.minimum_requirement
                                        .education_level
                                "
                            >
                                <span class="font-medium">Education:</span>
                                {{
                                    selectedPosition.minimum_requirement
                                        .education_level
                                }}
                            </li>
                            <li
                                v-if="
                                    selectedPosition.minimum_requirement
                                        .eligibility
                                "
                            >
                                <span class="font-medium">Eligibility:</span>
                                {{
                                    selectedPosition.minimum_requirement
                                        .eligibility
                                }}
                            </li>
                            <li
                                v-if="
                                    selectedPosition.minimum_requirement
                                        .training_hours
                                "
                            >
                                <span class="font-medium"
                                    >Training Required:</span
                                >
                                {{
                                    selectedPosition.minimum_requirement
                                        .training_hours
                                }}
                                hours
                            </li>
                            <li
                                v-if="
                                    selectedPosition.minimum_requirement
                                        .years_experience
                                "
                            >
                                <span class="font-medium"
                                    >Experience Required:</span
                                >
                                {{
                                    selectedPosition.minimum_requirement
                                        .years_experience
                                }}
                                year(s)
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex justify-end gap-4 mt-6 p-4 border-t">
                    <!-- Cancel Button -->
                    <button
                        type="button"
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                        @click="showAddModal = false"
                    >
                        Cancel
                    </button>

                    <!-- Save Button -->
                    <PrimaryButton
                        type="submit"
                        :loading="isLoading"
                        :disabled="isLoading"
                    >
                        Save Job Listing
                    </PrimaryButton>
                </div>
            </form>
        </Modal>

        <!-- Edit Job Modal -->
        <Modal
            :show="showEditModal"
            @close="
                () => {
                    showEditModal = false;
                    clearErrors();
                }
            "
            title="Edit Job Listing"
            max-width="6xl"
        >
            <form @submit.prevent="updateJob">
                <div class="p-5">
                    <!-- Basic Information Section -->
                    <div class="mb-2">
                        <h6
                            class="font-semibold text-gray-800 mb-4 pb-2 border-b"
                        >
                            Basic Information
                        </h6>

                        <!-- Job Title and Position -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Job Title -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                    for="editJobTitle"
                                >
                                    Job Title *
                                </label>
                                <TextInput
                                    id="editJobTitle"
                                    v-model="editingJob.title"
                                    required
                                />
                            </div>

                            <!-- Position -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                    for="editPosition"
                                >
                                    Position *
                                </label>
                                <CustomSelect
                                    :options="filteredPositions"
                                    v-model="editingJob.position_id"
                                    placeholder="Select a position"
                                    :value-key="'position_id'"
                                    :display-format="
                                        (position) =>
                                            `${position.position_name} (${position.item_number})`
                                    "
                                    required
                                    @select="handlePositionSelect"
                                />
                            </div>
                        </div>

                        <!-- Salary Grade and Item Number -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div class="grid grid-cols-2 gap-2">
                                <!-- Salary Grade -->
                                <div class="form-group">
                                    <label
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Salary Grade
                                    </label>
                                    <p class="text-gray-700 py-2">
                                        {{
                                            selectedPosition?.salary_grade
                                                ?.salary_grade || "-"
                                        }}
                                    </p>
                                </div>

                                <!-- Item Number -->
                                <div class="form-group">
                                    <label
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Item Number
                                    </label>
                                    <p class="text-gray-700 py-2">
                                        {{
                                            selectedPosition?.item_number === ""
                                                ? "CoS/Job Order"
                                                : selectedPosition?.item_number ||
                                                  "-"
                                        }}
                                    </p>
                                </div>
                            </div>
                            <!-- Category -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                    for="editCategory"
                                >
                                    Category *
                                </label>
                                <p class="text-gray-700 py-2">
                                    {{ selectedPosition?.category || "-" }}
                                </p>
                            </div>
                        </div>

                        <!-- Closing Date and Status -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <!-- Closing Date -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Closing Date *
                                </label>
                                <TextInput
                                    type="date"
                                    v-model="editingJob.closing_date"
                                    required
                                    :max="selectedBatch?.is_plantilla ? selectedBatch?.deadline : null"
                                    :class="{
                                        'border-red-500': errors.closing_date,
                                    }"
                                />
                                <p
                                    v-if="errors.closing_date"
                                    class="mt-1 text-sm text-red-600"
                                >
                                    {{ errors.closing_date[0] }}
                                </p>
                            </div>
                            <!-- Status -->
                            <div class="form-group">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Status *
                                </label>
                                <CustomSelect
                                    :options="[
                                        { value: 'Active' },
                                        { value: 'Draft' },
                                        { value: 'Closed' },
                                    ]"
                                    v-model="editingJob.status"
                                    :value-key="'value'"
                                    :display-format="(option) => option.value"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                     <!-- Place Assigned Section -->
                     <div>
                            <h6 class="font-semibold text-gray-800 mb-2 border-b">
                                Place Assigned
                            </h6>
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Place Assigned *
                                </label>
                                <TextInput
                                    v-model="editingJob.place_assigned"
                                    required
                                />
                            </div>
                        </div>

                    <!-- Job Description Section -->
                    <div class="mb-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Left Column: Job Description -->
                            <div>
                                <h6 class="font-semibold text-gray-800 mb-4 pb-2 border-b">
                                    Job Description
                                </h6>
                                <div class="form-group">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">
                                        Description *
                                    </label>
                                    <TextArea
                                        v-model="editingJob.description"
                                        rows="4"
                                        placeholder="Enter job description"
                                        required
                                    />
                                </div>
                            </div>

                            <!-- Right Column: Required Documents -->
                            <div>
                                <h6 class="font-semibold text-gray-800 mb-4 pb-2 border-b">
                                    Required Documents
                                </h6>
                                <div class="space-y-2 max-h-[200px] overflow-y-auto">
                                    <div v-for="doc in requiredDocuments" :key="doc.required_document_id" class="flex items-center">
                                        <input
                                            type="checkbox"
                                            :id="'doc-' + doc.required_document_id"
                                            v-model="editingJob.required_documents"
                                            :value="doc.required_document_id"
                                            class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                        >
                                        <label :for="'doc-' + doc.required_document_id" class="ml-2 text-sm text-gray-700">
                                            {{ doc.document_name }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Minimum Requirements Section -->
                    <div
                        v-if="selectedPosition?.minimum_requirement"
                        class="mb-4"
                    >
                        <h6
                            class="font-semibold text-gray-800 mb-4 pb-2 border-b"
                        >
                            Minimum Requirements
                        </h6>
                        <ul
                            class="list-disc list-inside text-sm text-gray-600 space-y-2"
                        >
                            <li
                                v-if="
                                    selectedPosition.minimum_requirement
                                        .education_level
                                "
                            >
                                <span class="font-medium">Education:</span>
                                {{
                                    selectedPosition.minimum_requirement
                                        .education_level
                                }}
                            </li>
                            <li
                                v-if="
                                    selectedPosition.minimum_requirement
                                        .eligibility
                                "
                            >
                                <span class="font-medium">Eligibility:</span>
                                {{
                                    selectedPosition.minimum_requirement
                                        .eligibility
                                }}
                            </li>
                            <li
                                v-if="
                                    selectedPosition.minimum_requirement
                                        .training_hours
                                "
                            >
                                <span class="font-medium"
                                    >Training Required:</span
                                >
                                {{
                                    selectedPosition.minimum_requirement
                                        .training_hours
                                }}
                                hours
                            </li>
                            <li
                                v-if="
                                    selectedPosition.minimum_requirement
                                        .years_experience
                                "
                            >
                                <span class="font-medium"
                                    >Experience Required:</span
                                >
                                {{
                                    selectedPosition.minimum_requirement
                                        .years_experience
                                }}
                                year(s)
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex justify-end gap-4 mt-6 p-4 border-t">
                    <button
                        type="button"
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                        @click="showEditModal = false"
                    >
                        Cancel
                    </button>
                    <PrimaryButton
                        type="submit"
                        :loading="isLoading"
                        :disabled="isLoading"
                    >
                        Update Job Listing
                    </PrimaryButton>
                </div>
            </form>
        </Modal>

        <!-- Edit Batch Modal -->
        <Modal
            :show="showEditBatchModal"
            @close="() => {
                showEditBatchModal = false;
                resetBatchForm();
            }"
            title="Edit Batch"
            max-width="2xl"
        >
            <form @submit.prevent="updateBatch">
                <div class="p-5">
                    <div class="grid grid-cols-1 gap-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Batch Name *
                                </label>
                                <TextInput
                                    v-model="editingBatch.batch_name"
                                    required
                                />
                            </div>

                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Batch Code *
                                </label>
                                <TextInput
                                    v-model="editingBatch.batch_code"
                                    required
                                />
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Post Date *
                                </label>
                                <TextInput
                                    type="date"
                                    v-model="editingBatch.post_date"
                                    required
                                />
                            </div>

                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Deadline *
                                </label>
                                <TextInput
                                    type="date"
                                    v-model="editingBatch.deadline"
                                    required
                                />
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Status *
                                </label>
                                <CustomSelect
                                    :options="[
                                        { value: 'Active' },
                                        { value: 'Draft' },
                                        { value: 'Closed' }
                                    ]"
                                    v-model="editingBatch.status"
                                    :value-key="'value'"
                                    :display-format="(option) => option.value"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end gap-4 mt-6 p-4 border-t">
                    <button
                        type="button"
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                        @click="showEditBatchModal = false"
                    >
                        Cancel
                    </button>
                    <PrimaryButton
                        type="submit"
                        :loading="isLoading"
                        :disabled="isLoading"
                    >
                        Update Batch
                    </PrimaryButton>
                </div>
            </form>
        </Modal>

        <!-- Add debug info to display selected position values -->
        <div v-if="showAddModal || showEditModal" class="hidden">
            Selected Position Debug:
            {{ selectedPosition ? selectedPosition.position_name : "None" }}
        </div>
    </HRLayout>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import axios from "axios";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import Header from "@/Components/Header/Header.vue";
import { usePage, Head, router } from "@inertiajs/vue3";
import TextInput from "@/Components/TextInput.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import CustomSelect from "@/Components/CustomSelect.vue";
import TextArea from "@/Components/TextArea.vue";
import Modal from "@/Components/Modal.vue";
import JobListingTable from "@/Components/JobListingCustomTable.vue";
import Collapsible from "@/Components/Collapsible.vue";
import BatchCustomTable from '@/Components/BatchCustomTable.vue';

// Fetching Props that was sent by controller
const batches = ref(usePage().props.batches || []);
const positions = ref(usePage().props.positions || []);
const requiredDocuments = ref(usePage().props.requiredDocuments || []);

console.log("This is the props", usePage().props);

// Add pagination state to each batch
batches.value = batches.value.map(batch => ({
    ...batch,
    pagination: {
        currentPage: 1,
        perPage: 10,
    },
}));

//loading state
const isLoading = ref(false);


// Default Batch Code
const today = new Date();
const defaultBatchCode = ref(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-PL`);


// Modal state
const showAddModal = ref(false);
const showAddBatchModal = ref(false);
const showEditModal = ref(false);
const showEditBatchModal = ref(false);
const selectedPosition = ref(null);
const selectedBatch = ref(null);

// New batch form data
const newBatch = ref({
    batch_name: '',
    batch_code: defaultBatchCode.value,
    post_date: '',
    deadline: '',
    status: 'Active',
    is_plantilla: true
});

// New job form data
const newJob = ref({
    position_id: null,
    title: "",
    description: "",
    closing_date: "",
    status: "Draft",
    category: "",
    batch_id: null,
    required_documents: [],
    place_assigned: ""
});

// Search functionality
const searchQuery = ref("");
const searchQueryNonPlantilla = ref("");

// Original batches filtering
const filteredBatches = computed(() => {
    if (!batches.value || !Array.isArray(batches.value)) {
        return [];
    }

    if (!searchQuery.value) {
        // Only show plantilla batches (is_plantilla === 1)
        return batches.value.filter(batch => batch.is_plantilla === 1);
    }
    const query = searchQuery.value.toLowerCase();
    return batches.value
        .filter(batch => batch.is_plantilla === 1) // Only plantilla batches
        .filter(batch =>
            batch.batch_name.toLowerCase().includes(query) ||
            batch.batch_code.toLowerCase().includes(query)
        );
});

// Original pagination methods
const paginatedJobs = (batch) => {
    const start = (batch.pagination.currentPage - 1) * batch.pagination.perPage;
    return batch.job_listings.slice(start, start + batch.pagination.perPage);
};

const totalPages = (batch) => {
    return Math.ceil(batch.job_listings.length / batch.pagination.perPage);
};

// Pagination methods for batches
const previousPage = (batch) => {
    if (batch.pagination.currentPage > 1) {
        batch.pagination.currentPage--;
    }
};

const nextPage = (batch) => {
    if (batch.pagination.currentPage < totalPages(batch)) {
        batch.pagination.currentPage++;
    }
};

// Add non-plantilla pagination state
const nonPlantillaPagination = ref({
    currentPage: 1,
    perPage: 10,
});

// Computed property for non-plantilla jobs
const nonPlantillaJobs = computed(() => {
    try {
        // Ensure batches.value is an array and has data
        if (!batches.value || !Array.isArray(batches.value)) {
            console.warn('Batches is not an array:', batches.value);
            return [];
        }

        // Get all non-plantilla batches (is_plantilla === 0)
        const nonPlantillaBatches = batches.value.filter(batch => {
            // Explicitly check for false or 0 to handle both boolean and numeric values
            return batch && (batch.is_plantilla === false || batch.is_plantilla === 0);
        });

        if (nonPlantillaBatches.length === 0) {
            console.log('No non-plantilla batches found');
            return [];
        }

        // Combine all job listings from non-plantilla batches
        let allNonPlantillaJobs = nonPlantillaBatches.flatMap(batch => {
            if (!batch.job_listings) {
                console.warn('No job listings found for batch:', batch);
                return [];
            }
            return batch.job_listings;
        });

        // If no search query, return all jobs
        if (!searchQueryNonPlantilla.value) {
            return allNonPlantillaJobs;
        }

        // Apply search filter
        const query = searchQueryNonPlantilla.value.toLowerCase();
        return allNonPlantillaJobs.filter(job => {
            if (!job) return false;

            return (
                (job.title && job.title.toLowerCase().includes(query)) ||
                (job.position?.position_name && job.position.position_name.toLowerCase().includes(query)) ||
                (job.position?.item_number && job.position.item_number.toLowerCase().includes(query)) ||
                (job.position?.category && job.position.category.toLowerCase().includes(query)) ||
                (job.position?.salary_grade?.salary_grade && job.position.salary_grade.salary_grade.toString().toLowerCase().includes(query)) ||
                (job.status && job.status.toLowerCase().includes(query))
            );
        });
    } catch (error) {
        console.error('Error in nonPlantillaJobs computed:', error);
        return [];
    }
});

// Computed property for paginated non-plantilla jobs
const paginatedNonPlantillaJobs = computed(() => {
    const start = (nonPlantillaPagination.value.currentPage - 1) * nonPlantillaPagination.value.perPage;
    return nonPlantillaJobs.value.slice(start, start + nonPlantillaPagination.value.perPage);
});

// Computed property for total non-plantilla pages
const totalNonPlantillaPages = computed(() => {
    return Math.ceil(nonPlantillaJobs.value.length / nonPlantillaPagination.value.perPage);
});

// Methods for non-plantilla pagination
const previousNonPlantillaPage = () => {
    if (nonPlantillaPagination.value.currentPage > 1) {
        nonPlantillaPagination.value.currentPage--;
    }
};

const nextNonPlantillaPage = () => {
    if (nonPlantillaPagination.value.currentPage < totalNonPlantillaPages.value) {
        nonPlantillaPagination.value.currentPage++;
    }
};

// Methods for batch management
const createBatch = () => {
    isLoading.value = true;
    axios.post(route('batches.store'), newBatch.value)
        .then(response => {
            // Process the received batches to add pagination state
            batches.value = response.data.map(batch => ({
                ...batch,
                pagination: {
                    currentPage: batch.pagination?.currentPage || 1, // Preserve existing pagination if any (e.g., after search)
                    perPage: batch.pagination?.perPage || 10,
                },
            }));
            showAddBatchModal.value = false;
            resetBatchForm();
            showSuccessAlert('add', 'Batch');
        })
        .catch(error => {
            console.error('Error creating batch:', error);
            let errorMessage = "Failed to create batch.";

            if (error.response && error.response.status === 422) {
                // Handle validation errors
                const validationErrors = error.response.data.errors;
                errorMessage = Object.values(validationErrors).flat().join('\n');
            } else if (error.message) {
                 errorMessage = error.message;
            }

            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: errorMessage, // Display the specific error message
                showConfirmButton: false,
                timer: 5000, // Give users more time to read validation errors
                toast: true,
                customClass: {
                    popup: "bg-red-500 text-white",
                },
            });
        })
        .finally(() => {
            isLoading.value = false;
        });
};

const resetBatchForm = () => {
    newBatch.value = {
        batch_name: '',
        batch_code: defaultBatchCode.value,
        post_date: '',
        deadline: '',
        status: 'Active',
        is_plantilla: false
    };
};

// Methods for job management
const saveJob = () => {
    // Clear previous errors
    errors.value = {};
    isLoading.value = true;

    // Set closing date to batch deadline if not specified
    if (!newJob.value.closing_date && selectedBatch.value) {
        newJob.value.closing_date = selectedBatch.value.deadline;
    }

    console.log('This is the new job', newJob.value);

    const jobToAdd = {
        position_id: newJob.value.position_id,
        title: newJob.value.title,
        description: newJob.value.description,
        closing_date: newJob.value.closing_date,
        status: newJob.value.status,
        category: selectedPosition.value?.category || '', // Get category from selected position
        batch_id: selectedBatch.value?.batch_id || null, // Assign batch_id if a batch was selected
        created_by: usePage().props.auth.user.id,
        required_documents: newJob.value.required_documents,
        place_assigned: newJob.value.place_assigned
    };

    console.log('This is the job to add', jobToAdd);

    axios
        .post("job-listing", jobToAdd)
        .then((response) => {
            batches.value = response.data.batches;
            // Reset form and close modal
            resetForm();
            showAddModal.value = false;
            showSuccessAlert("add", "Job Listing");
        })
        .catch((error) => {
            if (error.response && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
            console.error("Error creating job listing:", error.response.data);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: "Failed to create job listing.",
                showConfirmButton: false,
                timer: 3000,
                toast: true,
                customClass: {
                    popup: "bg-red-500 text-white",
                },
            });
        })
        .finally(() => {
            isLoading.value = false;
        });
};

// Add a method to fetch batches
const fetchBatches = async () => {
     try {
         const response = await axios.get('/batches');
         batches.value = response.data; // Assuming response.data is the array of batches
     } catch (error) {
         console.error('Error fetching batches:', error);
     }
};

const resetForm = () => {
    newJob.value = {
        position_id: null,
        title: "",
        description: "",
        closing_date: "",
        status: "Draft",
        category: "",
        batch_id: null,
        required_documents: [],
        place_assigned: ""
    };
     selectedPosition.value = null; // Clear selected position
     errors.value = {}; // Clear errors
};

// Methods
const archiveJob = async (jobId) => {
    // Confirm before archiving using SweetAlert2
    const result = await Swal.fire({
        title: 'Archive Job Listing',
        text: 'Are you sure you want to archive this job listing? Only closed job listings can be archived.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, archive it!'
    });

    // If user cancels, exit the function
    if (!result.isConfirmed) {
        return;
    }

    try {
        isLoading.value = true;

        // Attempt to archive the job listing
        const response = await axios.post(route('archive.store'), {
            id: jobId,
            status: "Archived",
            method: "archiveJoblisting"
        });

        // Remove the archived job from the list by re-fetching batches
         fetchBatches();

        // Show success message
        showSuccessAlert('archive');

    } catch (error) {
        // Handle specific error scenarios
        let errorMessage = 'Failed to archive job listing. Please try again.';

        if (error.response) {
            if (error.response.data && error.response.data.message) {
                 errorMessage = error.response.data.message;
            }
        } else if (error.request) {
            errorMessage = 'No response received from the server. Please check your network connection.';
        }

        Swal.fire({
            icon: 'error',
            title: 'Archiving Failed',
            text: errorMessage,
            confirmButtonText: 'OK'
        });

        // Log the full error for debugging
        console.error("Error archiving job:", error);
    } finally {
        isLoading.value = false;
    }
};

// Add these to your script setup section
const editingJob = ref({
    job_listing_id: null,
    position_id: null,
    title: "",
    description: "",
    closing_date: "",
    status: "Draft",
    category: "",
    required_documents: []
});

const editJob = (job) => {
    editingJob.value = {
        ...job,
        required_documents: job.required_documents?.map(doc => doc.required_document_id) || []
    };
    // Format the date for the input
    editingJob.value.closing_date = job.closing_date ? job.closing_date.split("T")[0] : '';

    // Find the batch this job belongs to
    const batch = batches.value.find(b => b.batch_id === job.batch_id);
    if (batch) {
        selectedBatch.value = {
            batch_id: batch.batch_id,
            is_plantilla: batch.is_plantilla
        };
    }

    selectedPosition.value = positions.value.find(
        (p) => p.position_id === job.position_id,
    );
    showEditModal.value = true;
};

const errors = ref({});

const updateJob = () => {
    // Clear previous errors
    errors.value = {};

    isLoading.value = true;

    axios
        .put(
            `/job-listing/${editingJob.value.job_listing_id}`,
            editingJob.value,
        )
        .then((response) => {
            // Fetch the updated batches
            batches.value = response.data.batches;

            // Close modal and reset form
            showEditModal.value = false;
            resetForm();

            showSuccessAlert("update");
        })
        .catch((error) => {
            let errorMessage = "Failed to update job listing";

            // Handle different types of errors
            if (error.response) {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                    errorMessage = error.response.data.message || "Validation failed";
                } else if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
            } else if (error.request) {
                errorMessage = "No response received from the server";
            }

            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: errorMessage,
                showConfirmButton: false,
                timer: 3000,
                toast: true,
                customClass: {
                    popup: "bg-red-500 text-white",
                },
            });

            console.error("Error updating job listing:", error);
        })
        .finally(() => {
            isLoading.value = false;
        });
};

// Show success alert function
const showSuccessAlert = (action, type) => {
    let title;

    switch (action) {
        case "add":
            title = type ? `${type} Added Successfully!` : `Added Successfully!`;
            break;
        case "update":
            title = type ? `${type} Updated Successfully!` : `Updated Successfully!`;
            break;
        case "delete":
            title = type ? `${type} Deleted Successfully!` : `Deleted Successfully!`;
            break;
         case "archive":
            title = type ? `${type} Archived Successfully!` : `Archived Successfully!`;
            break;
        default:
            title = "Action Completed!";
    }

    // Using SweetAlert2 toast with custom styling
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: title,
        iconColor: "#ffffffff",
        showCloseButton: true,
        showConfirmButton: false,
        timer: 3000, // Toast will disappear after 3 seconds
        toast: true, // Enable toast mode
        color: "#ffffff",
        background: "#22c55e",
    });
};

const clearErrors = () => {
    errors.value = {};
};

// Watch for changes in newJob position_id to update selectedPosition
watch(
    () => newJob.value.position_id,
    (newValue) => {
        if (newValue) {
            const position = positions.value.find(
                (p) => p.position_id === newValue,
            );
            if (position) {
                selectedPosition.value = position;
                // Automatically set category when position is selected for new job
                newJob.value.category = position.category || '';
            }
        }
    }, { immediate: true } // Run immediately when component is mounted if position_id has an initial value
);

// Watch for changes in editingJob position_id to update selectedPosition
watch(
    () => editingJob.value.position_id,
    (newValue) => {
        if (newValue) {
            const position = positions.value.find(
                (p) => p.position_id === newValue,
            );
            if (position) {
                selectedPosition.value = position;
                 // Automatically set category when position is selected for editing job
                editingJob.value.category = position.category || '';
            }
        }
    }, { immediate: true } // Run immediately when component is mounted if position_id has an initial value
);

// Also add a watcher for selectedPosition (for debugging/logging if needed)
// watch(
//     () => selectedPosition.value,
//     (newVal) => {
//         console.log("selectedPosition changed:", newVal);
//     },
//     { deep: true },
// );

const handlePositionSelect = (option) => {
    selectedPosition.value = option;
     // Update category in the form based on selected position
    if (showAddModal.value) {
        newJob.value.category = option.category || '';
    } else if (showEditModal.value) {
        editingJob.value.category = option.category || '';
    }
    console.log("Selected Position:", selectedPosition.value);
};

// Format date function (can be kept here or moved to a utility if used elsewhere)
const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

// Add new methods for bulk actions
const handleBulkEdit = ({ items, status }) => {
    isLoading.value = true;

    axios.put(route('job-listing.bulk-update'), {
        job_listing_ids: items.map(item => item.job_listing_id),
        status
    })
    .then((response) => {
        batches.value = response.data.batches;
        showSuccessAlert('update', 'Job Listings');
    })
    .catch(error => {
        console.error('Error updating job listings:', error);
        let errorMessage = 'Failed to update job listings.';
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error!",
            text: errorMessage,
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            customClass: {
                popup: "bg-red-500 text-white",
            },
        });
    })
    .finally(() => {
        isLoading.value = false;
    });
};

const handleBulkDelete = async (items) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete them!",
    });

    if (result.isConfirmed) {
        try {
            isLoading.value = true;
            await axios.delete(route('job-listing.destroy', 'bulk'), {
                data: {
                    items: items.map(item => item.job_listing_id)
                }
            })
            .then((response) => {
                // Fetch the updated batches
                batches.value = response.data.batches;
                showSuccessAlert('delete', 'Job Listings');
            });
        } catch (error) {
            console.error('Error deleting job listings:', error);
            let errorMessage = 'Failed to delete job listings.';

            if (error.response?.status === 422) {
                if (error.response.data.jobListings) {
                    // Handle bulk delete error with multiple job listings
                    const jobListings = error.response.data.jobListings.join(', ');
                    errorMessage = `Cannot delete the following job listings as they have applications: ${jobListings}`;
                } else if (error.response.data.jobListing) {
                    // Handle single job listing error
                    errorMessage = `Cannot delete "${error.response.data.jobListing}" as it has applications.`;
                }
            }

            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: errorMessage,
                showConfirmButton: false,
                timer: 5000, // Increased timer to give more time to read the message
                toast: true,
                customClass: {
                    popup: "bg-red-500 text-white",
                },
            });
        } finally {
            isLoading.value = false;
        }
    }
};

const handleBulkArchive = async (items) => {
    const result = await Swal.fire({
        title: 'Archive Job Listings',
        text: 'Are you sure you want to archive these job listings? Only closed job listings can be archived.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, archive them!'
    });

    if (result.isConfirmed) {
        try {
            isLoading.value = true;
            await Promise.all(items.map(item =>
                axios.post(route('archive.store'), {
                    id: item.job_listing_id,
                    status: "Archived",
                    method: "archiveJoblisting"
                })
            ));

            // Fetch the updated batches
            await fetchBatches();
            showSuccessAlert('archive', 'Job Listings');
        } catch (error) {
            console.error('Error archiving job listings:', error);
            let errorMessage = 'Failed to archive job listings.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: errorMessage,
                showConfirmButton: false,
                timer: 3000,
                toast: true,
                customClass: {
                    popup: "bg-red-500 text-white",
                },
            });
        } finally {
            isLoading.value = false;
        }
    }
};

// Add view job method
const viewJob = (job) => {
    // Implement view job functionality - maybe open a modal or redirect
    console.log('View job:', job);
};

// Add new methods for batch management
const editBatch = (batch) => {
    editingBatch.value = { ...batch };
    // Format the dates for the input
    editingBatch.value.post_date = batch.post_date ? batch.post_date.split('T')[0] : '';
    editingBatch.value.deadline = batch.deadline ? batch.deadline.split('T')[0] : '';
    showEditBatchModal.value = true;
};

const updateBatch = () => {
    isLoading.value = true;

    // Create a clean batch object with only the necessary fields
    const batchData = {
        batch_name: editingBatch.value.batch_name,
        batch_code: editingBatch.value.batch_code,
        post_date: editingBatch.value.post_date,
        deadline: editingBatch.value.deadline,
        status: editingBatch.value.status,
        is_plantilla: editingBatch.value.is_plantilla
    };

    axios.put(route('batches.update', editingBatch.value.batch_id), batchData)
        .then(response => {
            batches.value = response.data;
            showEditBatchModal.value = false;
            resetBatchForm();
            showSuccessAlert('update', 'Batch');
        })
        .catch(error => {
            console.error('Error updating batch:', error);
            let errorMessage = "Failed to update batch.";

            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                errorMessage = Object.values(validationErrors).flat().join('\n');
            } else if (error.message) {
                errorMessage = error.message;
            }

            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: errorMessage,
                showConfirmButton: false,
                timer: 5000,
                toast: true,
                customClass: {
                    popup: "bg-red-500 text-white",
                },
            });
        })
        .finally(() => {
            isLoading.value = false;
        });
};

// Add this with the other refs at the top of the script setup
const selectedItems = ref([]);

// Update the deleteBatch method
const deleteBatch = (items) => {
    // If items is an array, use it directly; otherwise, wrap the single item in an array
    const itemsToDelete = Array.isArray(items) ? items : [items];

    Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this! ${itemsToDelete.length > 1 ? `(${itemsToDelete.length} items selected)` : ''}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            isLoading.value = true;

            // Use the same endpoint for both single and multiple deletions
            const requestData = itemsToDelete.length > 1
                ? { batch_ids: itemsToDelete.map(item => item.batch_id) }
                : null;

            const requestConfig = itemsToDelete.length > 1
                ? { data: requestData }
                : {};

            axios.delete(
                itemsToDelete.length > 1
                    ? route('batches.destroy', 'bulk')
                    : route('batches.destroy', itemsToDelete[0].batch_id),
                requestConfig
            )
            .then(response => {
                batches.value = response.data;
                showSuccessAlert('delete', itemsToDelete.length > 1 ? 'Batches' : 'Batch');
                // Clear selection after successful deletion
                if (itemsToDelete.length > 1) {
                    selectedItems.value = [];
                }
            })
            .catch(error => {
                console.error('Error deleting batch(es):', error);
                let errorMessage = itemsToDelete.length > 1 ? 'Failed to delete batches.' : 'Failed to delete batch.';
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error!",
                    text: errorMessage,
                    showConfirmButton: false,
                    timer: 3000,
                    toast: true,
                    customClass: {
                        popup: "bg-red-500 text-white",
                    },
                });
            })
            .finally(() => {
                isLoading.value = false;
            });
        }
    });
};

const handleBulkArchiveBatches = (selectedBatches) => {
    Swal.fire({
        title: 'Archive Batches',
        text: 'Are you sure you want to archive these batches? This will also hide all job listings within them.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, archive them!'
    }).then((result) => {
        if (result.isConfirmed) {
            isLoading.value = true;

            // Use Promise.all to handle multiple updates
            Promise.all(selectedBatches.map(batch =>
                axios.put(route('batches.update', batch.batch_id), {
                    ...batch,
                    status: 'Archived'
                })
            ))
            .then((responses) => {
                // Get the last response since it contains the updated batches
                const lastResponse = responses[responses.length - 1];
                // Update batches with the data from the response
                batches.value = lastResponse.data;
                showSuccessAlert('archive', 'Batches');
            })
            .catch(error => {
                console.error('Error archiving batches:', error);
                let errorMessage = 'Failed to archive batches.';
                if (error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                }
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error!",
                    text: errorMessage,
                    showConfirmButton: false,
                    timer: 3000,
                    toast: true,
                    customClass: {
                        popup: "bg-red-500 text-white",
                    },
                });
            })
            .finally(() => {
                isLoading.value = false;
            });
        }
    });
};

// Update the filteredPositions computed property
const filteredPositions = computed(() => {
    // If we're in edit mode, use the batch_id from the editingJob
    if (showEditModal.value && editingJob.value) {
        const batch = batches.value.find(b => b.batch_id === editingJob.value.batch_id);
        if (batch?.is_plantilla === 1) {
            return positions.value.filter(position => position.employment_type === 'Plantilla');
        } else if (batch?.is_plantilla === 0) {
            return positions.value.filter(position => position.employment_type !== 'Plantilla');
        }
    }

    // For add mode, use the selectedBatch
    if (selectedBatch.value?.is_plantilla === 1) {
        return positions.value.filter(position => position.employment_type === 'Plantilla');
    } else if (selectedBatch.value?.is_plantilla === 0) {
        return positions.value.filter(position => position.employment_type !== 'Plantilla');
    }

    // If no batch is selected, show all positions
    return positions.value;
});

// Add this with the other refs at the top of the script setup
const editingBatch = ref({
    batch_id: null,
    batch_name: '',
    batch_code: '',
    post_date: '',
    deadline: '',
    status: 'Active'
});

</script>

<style>
/* Adding utility classes */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.table-responsive {
    width: 100%;
    overflow-x: auto;
}

.table-responsive table {
    min-width: 900px; /* Adjust as needed for your columns */
}
</style>
