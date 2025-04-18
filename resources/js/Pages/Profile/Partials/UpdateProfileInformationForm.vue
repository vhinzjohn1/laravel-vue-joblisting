<script setup>
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { Link, useForm, usePage } from "@inertiajs/vue3";

const props = defineProps({
    mustVerifyEmail: Boolean,
    status: String,
    userDetails: Object,
});

const user = usePage().props.auth.user;
const form = useForm({
    username: user.username,
    email: user.email,
    firstname: props.userDetails?.firstname || "",
    lastname: props.userDetails?.lastname || "",
    middle_name: props.userDetails?.middle_name || "",
    phone_number: props.userDetails?.phone_number || "",
    eligibility: props.userDetails?.eligibility || "",
});
// Show success alert
const showToast = () => {
    let title;

    title = "Profile Updated Successfully!";

    // Using SweetAlert2 toast with custom styling
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: title,
        iconColor: "#ffffffff",
        showConfirmButton: false,
        timer: 3000, // Toast will disappear after 3 seconds
        toast: true, // Enable toast mode
        color: "#ffffff",
        background: "#22c55e",
    });
};
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-gray-900">
                Profile Information
            </h2>

            <p class="mt-1 text-sm text-gray-600">
                Update your account's profile information and email address.
            </p>
        </header>

        <form
            @submit.prevent="form.patch(route('profile.update'), {
                preserveScroll: true,
                onSuccess: () => {
                    showToast();
                }
            })"
            class="mt-6 space-y-6"
        >
            <div>
                <InputLabel for="username" value="Username" />

                <TextInput
                    id="username"
                    type="text"
                    class="block mt-1 w-full"
                    v-model="form.username"
                    required
                    autofocus
                    autocomplete="username"
                />

                <InputError class="mt-2" :message="form.errors.username" />
            </div>

            <div>
                <InputLabel for="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    class="block mt-1 w-full"
                    v-model="form.email"
                    required
                    autocomplete="email"
                />

                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <InputLabel for="firstname" value="First Name" />
                    <TextInput
                        id="firstname"
                        type="text"
                        class="block mt-1 w-full"
                        v-model="form.firstname"
                        required
                    />
                    <InputError class="mt-2" :message="form.errors.firstname" />
                </div>

                <div>
                    <InputLabel for="lastname" value="Last Name" />
                    <TextInput
                        id="lastname"
                        type="text"
                        class="block mt-1 w-full"
                        v-model="form.lastname"
                        required
                    />
                    <InputError class="mt-2" :message="form.errors.lastname" />
                </div>

                <div>
                    <InputLabel for="middle_name" value="Middle Name" />
                    <TextInput
                        id="middle_name"
                        type="text"
                        class="block mt-1 w-full"
                        v-model="form.middle_name"
                        maxlength="1"
                        @input="
                            form.middle_name =
                                $event.target.value.toUpperCase()
                        "
                    />
                    <InputError
                        class="mt-2"
                        :message="form.errors.middle_initial"
                    />
                </div>

                <div>
                    <InputLabel for="phone_number" value="Phone Number" />
                    <div class="flex relative mt-1">
                        <div
                            class="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 rounded-l-md border border-r-0 border-gray-300"
                        >
                            +63
                        </div>
                        <TextInput
                            id="phone_number"
                            type="number"
                            class="block w-full rounded-none rounded-r-md"
                            v-model="form.phone_number"
                            maxlength="11"
                            placeholder="9123 4567"
                        />
                    </div>
                    <InputError
                        class="mt-2"
                        :message="form.errors.phone_number"
                    />
                </div>

                <div>
                    <InputLabel for="eligibility" value="Eligibility" />
                    <TextInput
                        id="eligibility"
                        type="text"
                        class="block mt-1 w-full"
                        v-model="form.eligibility"
                    />
                    <InputError
                        class="mt-2"
                        :message="form.errors.eligibility"
                    />
                </div>
            </div>

            <div v-if="mustVerifyEmail && user.email_verified_at === null">
                <p class="mt-2 text-sm text-gray-800">
                    Your email address is unverified.
                    <Link
                        :href="route('verification.send')"
                        method="post"
                        as="button"
                        class="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Click here to re-send the verification email.
                    </Link>
                </p>

                <div
                    v-show="status === 'verification-link-sent'"
                    class="mt-2 text-sm font-medium text-green-600"
                >
                    A new verification link has been sent to your email address.
                </div>
            </div>

            <div class="flex gap-4 items-center">
                <PrimaryButton :disabled="form.processing">Save</PrimaryButton>
            </div>
        </form>
    </section>
</template>
