<script setup>
import { ref, onMounted } from "vue";
import { useForm } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Modal from "@/Components/Modal.vue";

const experiences = ref([]);
const showModal = ref(false);

const form = useForm({
    position: "",
    company_name: "",
    start_date: "",
    end_date: "",
    is_current_job: false,
    responsibilities: "",
});

const fetchExperiences = async () => {
    const response = await axios.get(
        route("profile-details.index", "experience"),
    );
    experiences.value = response.data;
};

const addExperience = async () => {
    try {
        const response = await axios.post(
            route("profile-details.store", "experience"),
            form.data(),
            {
                preserveScroll: true,
            },
        );
        experiences.value.push(response.data);
        form.reset();
        showModal.value = false;
        showSuccessAlert("add");
    } catch (error) {
        console.error(error.response.data);
    }
};

const deleteExperience = async (id) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
        await axios.delete(
            route("profile-details.destroy", ["experience", id]),
            {
                preserveScroll: true,
            },
        );
        fetchExperiences();
        showSuccessAlert("delete");
    }
};
// Show success alert function
const showSuccessAlert = (action) => {
    let title, text;

    switch (action) {
        case "add":
            title = "Experience Added Successfully!";
            text = "Your profile information has been updated.";
            break;
        case "update":
            title = "Experience Updated Successfully!";
            text = "Your profile information has been updated.";
            break;
        case "delete":
            title = "Experience Deleted Successfully!";
            text = "Your profile information has been updated.";
            break;
        default:
            title = "Action Completed!";
            text = "The operation was successful.";
    }

    // Using SweetAlert2 toast with custom styling
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: title,
        text: text,
        iconColor: "#ffffffff",
        showConfirmButton: false,
        timer: 3000, // Toast will disappear after 3 seconds
        toast: true, // Enable toast mode
        color: "#ffffff",
        background: "#22c55e",
    });
};
onMounted(() => {
    fetchExperiences();
});
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-gray-900">Work Experience</h2>
            <p class="mt-1 text-sm text-gray-600">
                Add your work experience details.
            </p>
        </header>

        <PrimaryButton @click="showModal = true">Add Experience</PrimaryButton>

        <Modal
            :title="'Add Experience'"
            :show="showModal"
            @close="showModal = false"
        >
            <template #default>
                <form
                    @submit.prevent="addExperience"
                    class="space-y-6 px-10 py-4"
                >
                    <div>
                        <InputLabel for="position" value="Position" />
                        <input
                            id="position"
                            type="text"
                            v-model="form.position"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                        <InputError :message="form.errors.position" />
                    </div>

                    <div>
                        <InputLabel for="company_name" value="Company Name" />
                        <input
                            id="company_name"
                            type="text"
                            v-model="form.company_name"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                        <InputError :message="form.errors.company_name" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel for="start_date" value="Start Date" />
                            <input
                                id="start_date"
                                type="date"
                                v-model="form.start_date"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                required
                            />
                            <InputError :message="form.errors.start_date" />
                        </div>

                        <div>
                            <InputLabel for="end_date" value="End Date" />
                            <input
                                id="end_date"
                                type="date"
                                v-model="form.end_date"
                                :disabled="form.is_current_job"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                :required="!form.is_current_job"
                            />
                            <InputError :message="form.errors.end_date" />
                        </div>
                    </div>

                    <div class="flex items-center">
                        <input
                            id="is_current_job"
                            type="checkbox"
                            v-model="form.is_current_job"
                            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                        />
                        <label
                            for="is_current_job"
                            class="ml-2 text-sm text-gray-600"
                            >This is my current job</label
                        >
                    </div>

                    <div>
                        <InputLabel
                            for="responsibilities"
                            value="Responsibilities"
                        />
                        <textarea
                            id="responsibilities"
                            v-model="form.responsibilities"
                            rows="4"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        ></textarea>
                        <InputError :message="form.errors.responsibilities" />
                    </div>

                    <div class="flex items-center gap-4">
                        <PrimaryButton :disabled="form.processing"
                            >Save</PrimaryButton
                        >
                    </div>
                </form>
            </template>
        </Modal>

        <div class="mt-6">
            <h3 class="text-lg font-medium text-gray-900">
                Existing Work Experience
            </h3>
            <div class="mt-4 space-y-4">
                <div
                    v-for="experience in experiences"
                    :key="experience.experience_id"
                    class="bg-white p-4 rounded-lg shadow"
                >
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-medium">
                                {{ experience.position }}
                            </h4>
                            <p class="text-sm text-gray-600">
                                {{ experience.company_name }}
                            </p>
                            <p class="text-sm text-gray-500">
                                {{
                                    new Date(
                                        experience.start_date,
                                    ).toLocaleDateString()
                                }}
                                -
                                {{
                                    experience.is_current_job
                                        ? "Present"
                                        : new Date(
                                              experience.end_date,
                                          ).toLocaleDateString()
                                }}
                            </p>
                            <p class="text-sm text-gray-600 mt-2">
                                {{ experience.responsibilities }}
                            </p>
                        </div>
                        <button
                            @click="deleteExperience(experience.experience_id)"
                            class="text-red-600 hover:text-red-800"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
