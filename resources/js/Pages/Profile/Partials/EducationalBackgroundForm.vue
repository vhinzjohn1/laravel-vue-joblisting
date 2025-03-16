<script setup>
import { ref, onMounted } from "vue";
import { useForm } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Modal from "@/Components/Modal.vue";

const educations = ref([]);
const showModal = ref(false);

const form = useForm({
    level: "",
    school_name: "",
    degree_course: "",
    year_graduated: "",
    honors_received: "",
});

const fetchEducations = async () => {
    const response = await axios.get(
        route("profile-details.index", "education"),
    );
    educations.value = response.data;
};

const addEducation = async () => {
    try {
        const response = await axios.post(
            route("profile-details.store", "education"),
            form.data(),
        );
        educations.value.push(response.data);
        form.reset();
        showModal.value = false;
        showSuccessAlert("add");
    } catch (error) {
        console.error(error.response.data);
    }
};

const deleteEducation = async (id) => {
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
        await axios.delete(route("profile-details.destroy", ["education", id]));
        fetchEducations();
        showSuccessAlert("delete");
    }
};
// Show success alert function
const showSuccessAlert = (action) => {
    let title, text;

    switch (action) {
        case "add":
            title = "Educational Background Added Successfully!";
            text = "Your profile information has been updated.";
            break;
        case "update":
            title = "Profile Updated Successfully!";
            text = "Your profile information has been updated.";
            break;
        case "delete":
            title = "Education Deleted Successfully!";
            text = "Your profile information has been updated.";
        default:
            title = "Action Completed!";
            text = "The operation was successful.";
    }

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: title,
        text: text,
        iconColor: "#ffffff",
        showConfirmButton: false,
        timer: 3000, // Toast will disappear after 3 seconds
        toast: true, // Enable toast mode
        customClass: {
            popup: "bg-green-500 text-white",
        },
    });
};

onMounted(() => {
    fetchEducations();
});
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-gray-900">
                Educational Background
            </h2>
            <p class="mt-1 text-sm text-gray-600">
                Add or update your educational information.
            </p>
        </header>

        <PrimaryButton @click="showModal = true">Add Education</PrimaryButton>

        <Modal :show="showModal" @close="showModal = false">
            <template #default>
                <form @submit.prevent="addEducation" class="mt-6 space-y-6 p-5">
                    <h1 class="text-xl font-semibold text-gray-800 text-center">
                        Add Educational Background
                    </h1>
                    <div>
                        <InputLabel for="level" value="Level" />
                        <select
                            id="level"
                            v-model="form.level"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        >
                            <option value="">Select Level</option>
                            <option value="Elementary">Elementary</option>
                            <option value="High School">High School</option>
                            <option value="College">College</option>
                            <option value="Graduate">Graduate</option>
                        </select>
                        <InputError :message="form.errors.level" />
                    </div>

                    <div>
                        <InputLabel for="school_name" value="School Name" />
                        <input
                            id="school_name"
                            type="text"
                            v-model="form.school_name"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                        <InputError :message="form.errors.school_name" />
                    </div>

                    <div>
                        <InputLabel for="degree_course" value="Degree/Course" />
                        <input
                            id="degree_course"
                            type="text"
                            v-model="form.degree_course"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                        <InputError :message="form.errors.degree_course" />
                    </div>

                    <div>
                        <InputLabel
                            for="year_graduated"
                            value="Year Graduated"
                        />
                        <input
                            id="year_graduated"
                            type="number"
                            v-model="form.year_graduated"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                        <InputError :message="form.errors.year_graduated" />
                    </div>

                    <div>
                        <InputLabel
                            for="honors_received"
                            value="Honors Received"
                        />
                        <input
                            id="honors_received"
                            type="text"
                            v-model="form.honors_received"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        <InputError :message="form.errors.honors_received" />
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
                Existing Education
            </h3>
            <div class="mt-4 space-y-4">
                <div
                    v-for="education in educations"
                    :key="education.education_id"
                    class="bg-white p-4 rounded-lg shadow"
                >
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-medium">
                                {{ education.degree_course }}
                            </h4>
                            <p class="text-sm text-gray-600">
                                {{ education.school_name }}
                            </p>
                            <p class="text-sm text-gray-500">
                                Level: {{ education.level }} | Graduated:
                                {{ education.year_graduated }}
                            </p>
                            <p
                                v-if="education.honors_received"
                                class="text-sm text-gray-500"
                            >
                                Honors: {{ education.honors_received }}
                            </p>
                        </div>
                        <button
                            @click="deleteEducation(education.education_id)"
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
