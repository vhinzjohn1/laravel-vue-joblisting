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
    middle_initial: props.userDetails?.middle_initial || "",
    phone_number: props.userDetails?.phone_number || "",
    education_attainment: props.userDetails?.education_attainment || "",
    eligibility: props.userDetails?.eligibility || "",
});
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
            @submit.prevent="form.patch(route('profile.update'))"
            class="mt-6 space-y-6"
        >
            <div>
                <InputLabel for="username" value="Username" />

                <TextInput
                    id="username"
                    type="text"
                    class="mt-1 block w-full"
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
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autocomplete="email"
                />

                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <InputLabel for="firstname" value="First Name" />
                    <TextInput
                        id="firstname"
                        type="text"
                        class="mt-1 block w-full"
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
                        class="mt-1 block w-full"
                        v-model="form.lastname"
                        required
                    />
                    <InputError class="mt-2" :message="form.errors.lastname" />
                </div>

                <div>
                    <InputLabel for="middle_initial" value="Middle Initial" />
                    <TextInput
                        id="middle_initial"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.middle_initial"
                        maxlength="1"
                    />
                    <InputError
                        class="mt-2"
                        :message="form.errors.middle_initial"
                    />
                </div>

                <div>
                    <InputLabel for="phone_number" value="Phone Number" />
                    <TextInput
                        id="phone_number"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.phone_number"
                    />
                    <InputError
                        class="mt-2"
                        :message="form.errors.phone_number"
                    />
                </div>

                <div>
                    <InputLabel
                        for="education_attainment"
                        value="Education Attainment"
                    />
                    <TextInput
                        id="education_attainment"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.education_attainment"
                    />
                    <InputError
                        class="mt-2"
                        :message="form.errors.education_attainment"
                    />
                </div>

                <div>
                    <InputLabel for="eligibility" value="Eligibility" />
                    <TextInput
                        id="eligibility"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.eligibility"
                    />
                    <InputError
                        class="mt-2"
                        :message="form.errors.eligibility"
                    />
                </div>
            </div>

            <div v-if="mustVerifyEmail && user.email_verified_at === null">
                <p class="text-sm mt-2 text-gray-800">
                    Your email address is unverified.
                    <Link
                        :href="route('verification.send')"
                        method="post"
                        as="button"
                        class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Click here to re-send the verification email.
                    </Link>
                </p>

                <div
                    v-show="status === 'verification-link-sent'"
                    class="mt-2 font-medium text-sm text-green-600"
                >
                    A new verification link has been sent to your email address.
                </div>
            </div>

            <div class="flex items-center gap-4">
                <PrimaryButton :disabled="form.processing">Save</PrimaryButton>

                <Transition
                    enter-active-class="transition ease-in-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out"
                    leave-to-class="opacity-0"
                >
                    <p
                        v-if="form.recentlySuccessful"
                        class="text-sm text-gray-600"
                    >
                        Saved.
                    </p>
                </Transition>
            </div>
        </form>
    </section>
</template>
