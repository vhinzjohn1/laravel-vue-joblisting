<script setup>
import { ref, onMounted } from "vue";
import { useForm } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Modal from "@/Components/Modal.vue";

const trainings = ref([]);
const showModal = ref(false);

const form = useForm({
    title: "",
    institution: "",
    duration_hours: "",
    certificate_url: null,
});

const fetchTrainings = async () => {
    const response = await axios.get(
        route("profile-details.index", "training"),
    );
    trainings.value = response.data;
};

const addTraining = async () => {
    try {
        const response = await axios.post(
            route("profile-details.store", "training"),
            form.data(),
        );
        trainings.value.push(response.data);
        form.reset();
        showModal.value = false;
        showSuccessAlert("add");
    } catch (error) {
        console.error(error.response.data);
    }
};

const deleteTraining = async (id) => {
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
        await axios.delete(route("profile-details.destroy", ["training", id]));
        fetchTrainings();
        showSuccessAlert("delete");
    }
};

// Show success alert function
const showSuccessAlert = (action) => {
    let title, text;

    switch (action) {
        case "add":
            title = "Training Added Successfully!";
            text = "Your profile information has been updated.";
            break;
        case "update":
            title = "Training Updated Successfully!";
            text = "Your profile information has been updated.";
            break;
        case "delete":
            title = "Training Deleted Successfully!";
            text = "Your profile information has been updated.";
            break;
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
    fetchTrainings();
});
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-gray-900">
                Training & Certifications
            </h2>
            <p class="mt-1 text-sm text-gray-600">
                Add your training and certification details.
            </p>
        </header>

        <PrimaryButton @click="showModal = true">Add Training</PrimaryButton>

        <Modal :show="showModal" @close="showModal = false">
            <template #default>
                <form @submit.prevent="addTraining" class="mt-6 space-y-6 p-5">
                    <h1 class="text-xl font-semibold text-gray-800 text-center">
                        Add Training & Certifications
                    </h1>
                    <div>
                        <InputLabel for="title" value="Training Title" />
                        <input
                            id="title"
                            type="text"
                            v-model="form.title"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                        <InputError :message="form.errors.title" />
                    </div>

                    <div>
                        <InputLabel for="institution" value="Institution" />
                        <input
                            id="institution"
                            type="text"
                            v-model="form.institution"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                        <InputError :message="form.errors.institution" />
                    </div>

                    <div>
                        <InputLabel
                            for="duration_hours"
                            value="Duration (Hours)"
                        />
                        <input
                            id="duration_hours"
                            type="number"
                            v-model="form.duration_hours"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                        <InputError :message="form.errors.duration_hours" />
                    </div>

                    <div>
                        <InputLabel
                            for="certificate"
                            value="Certificate (Optional)"
                        />
                        <input
                            type="file"
                            @input="
                                form.certificate_url = $event.target.files[0]
                            "
                            class="mt-1 block w-full"
                            accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <InputError :message="form.errors.certificate_url" />
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
                Existing Trainings
            </h3>
            <div class="mt-4 space-y-4">
                <div
                    v-for="training in trainings"
                    :key="training.training_id"
                    class="bg-white p-4 rounded-lg shadow"
                >
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-medium">{{ training.title }}</h4>
                            <p class="text-sm text-gray-600">
                                {{ training.institution }}
                            </p>
                            <p class="text-sm text-gray-500">
                                Duration: {{ training.duration_hours }} hours
                            </p>
                        </div>
                        <button
                            @click="deleteTraining(training.training_id)"
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
