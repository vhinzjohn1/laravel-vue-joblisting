<template>
    <Head title="View Job Listings" />
    <component :is="layouts[userRole]">
        <template #header>
            <Header title="Notifications" /></template>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold">
                            Your Notifications
                        </h3>
                        <button
                            @click="markAllAsRead"
                            class="px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200"
                        >
                            Mark All as Read
                        </button>
                    </div>

                    <div
                        v-if="localNotifications.length === 0"
                        class="text-center py-8 text-gray-500"
                    >
                        No notifications found
                    </div>

                    <div v-else class="space-y-4">
                        <div
                            v-for="notification in localNotifications"
                            :key="notification.notification_id"
                            class="p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            :class="{ 'bg-gray-50': notification.is_read }"
                        >
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <p class="text-sm text-gray-600">
                                        {{ notification.message }}
                                    </p>
                                    <p class="text-xs text-gray-500 mt-1">
                                        {{
                                            formatDate(notification.created_at)
                                        }}
                                    </p>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <button
                                        v-if="!notification.is_read"
                                        @click="markAsRead(notification)"
                                        class="text-sm text-[#012f12] hover:text-[#034b1c]"
                                    >
                                        Mark as Read
                                    </button>
                                    <span
                                        v-if="!notification.is_read"
                                        class="h-2 w-2 bg-[#ffc001] rounded-full"
                                    ></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </component>
</template>

<script setup>
import { router } from "@inertiajs/vue3";
import { ref, watch } from "vue";
import axios from "axios";
import { computed } from "vue";
import { usePage } from "@inertiajs/vue3";
import HRLayout from "@/Layouts/HR/HRLayout.vue";
import ApplicantLayout from "@/Layouts/Applicant/ApplicantLayout.vue";
import Header from "@/Components/Header/Header.vue";
import { Head } from "@inertiajs/vue3";

const props = defineProps({
    notifications: {
        type: Array,
        required: true,
    },
});

const page = usePage()
const userRole = computed(() => page.props.auth.user.role_name)

const layouts = {
  admin: HRLayout,
  hr: HRLayout,
  applicant: ApplicantLayout
}

// Create a local copy of notifications to manipulate
const localNotifications = ref([...props.notifications]);

// Watch for changes in props.notifications
watch(
    () => props.notifications,
    (newVal) => {
        localNotifications.value = [...newVal];
    },
    { deep: true },
);

const markAsRead = (notification) => {
    // First update local state for immediate feedback
    const index = localNotifications.value.findIndex(
        (n) => n.notification_id === notification.notification_id,
    );

    if (index !== -1) {
        localNotifications.value[index].is_read = true;
    }

    // Then send the API request using axios instead of Inertia
    axios
        .post(route("notifications.mark-as-read", notification.notification_id))
        .then(() => {
            // Optionally refresh data after success
            router.reload({ only: ["notifications"], preserveScroll: true });
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Notification marked as read",
                showConfirmButton: false,
                timer: 3000,
                iconColor: "#ffffff",
                toast: true,
                customClass: {
                    popup: "bg-green-500 text-white",
                },
            });
        })
        .catch((error) => {
            console.error("Error marking notification as read:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to mark notification as read",
                showConfirmButton: false,
                timer: 3000,
                iconColor: "#ffffff",
                toast: true,
                customClass: {
                    popup: "bg-red-500 text-white",
                },
            });
        });
};

const markAllAsRead = () => {
    // First update local state
    localNotifications.value.forEach((notification) => {
        notification.is_read = true;
    });

    // Then send the API request
    axios
        .post(route("notifications.mark-all-as-read"))
        .then(() => {
            // Optionally refresh data after success
            router.reload({ only: ["notifications"], preserveScroll: true });
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "All notifications marked as read",
                showConfirmButton: false,
                timer: 3000,
                iconColor: "#ffffff",
                toast: true,
                customClass: {
                    popup: "bg-green-500 text-white",
                },
            });
        })
        .catch((error) => {
            console.error("Error marking all notifications as read:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to mark all notifications as read",
                showConfirmButton: false,
                timer: 3000,
                iconColor: "#ffffff",
                toast: true,
                customClass: {
                    popup: "bg-red-500 text-white",
                },
            });
        });
};

const formatDate = (date) => {
    return new Date(date).toLocaleString();
};
</script>
