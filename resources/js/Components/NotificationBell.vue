<template>
    <div class="relative">
        <button
            @click="toggleDropdown"
            class="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
        <i class="fas fa-bell text-2xl sm:text-xl xs:text-sm"></i>


            <span
                v-if="unreadCount > 0"
                class="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center"
            >
                {{ unreadCount }}
            </span>
        </button>

        <!-- Dropdown -->
        <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50"
        >
            <div class="p-4 border-b">
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold">Notifications</h3>
                    <button
                        v-if="unreadCount > 0"
                        @click="markAllAsRead"
                        class="text-sm text-[#012f12] hover:text-[#034b1c]"
                    >
                        Mark all as read
                    </button>
                </div>
            </div>

            <div class="max-h-96 overflow-y-auto">
                <div
                    v-if="notifications.length === 0"
                    class="p-4 text-center text-gray-500"
                >
                    No notifications
                </div>
                <div v-else class="divide-y">
                    <div
                        v-for="notification in notifications"
                        :key="notification.notification_id"
                        class="p-4 hover:bg-gray-50"
                        :class="{ 'bg-gray-50': notification.is_read }"
                    >
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <p class="text-sm text-gray-600">
                                    {{ notification.message }}
                                </p>
                                <p class="text-xs text-gray-500 mt-1">
                                    {{ formatDate(notification.created_at) }}
                                </p>
                            </div>
                            <div class="flex items-center space-x-2">
                                <button
                                    v-if="!notification.is_read"
                                    @click.stop="markAsRead(notification)"
                                    class="text-sm text-[#012f12] hover:text-[#034b1c]"
                                >
                                    Mark as read
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

            <div class="p-4 border-t text-center">
                <Link
                    :href="route('notifications.index')"
                    class="text-sm text-[#012f12] hover:text-[#034b1c]"
                >
                    View all notifications
                </Link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { Link, router } from "@inertiajs/vue3";
import axios from "axios";

const props = defineProps({
    notifications: {
        type: Array,
        required: true,
    },
});

const showDropdown = ref(false);
const unreadCount = ref(0);
const localNotifications = ref([...props.notifications]);

// Watch for changes in props.notifications
watch(
    () => props.notifications,
    (newVal) => {
        localNotifications.value = [...newVal];
        updateUnreadCount();
    },
    { deep: true },
);

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const markAsRead = (notification) => {
    // First update the local state to give immediate feedback
    const index = localNotifications.value.findIndex(
        (n) => n.notification_id === notification.notification_id,
    );

    if (index !== -1) {
        localNotifications.value[index].is_read = true;
        updateUnreadCount();
    }

    // Then send the request to the server using axios instead of Inertia
    axios
        .post(route("notifications.mark-as-read", notification.notification_id))
        .then(() => {
            // Refresh notifications after successful update
            router.reload({ only: ["notifications"], preserveScroll: true });
            showToast('success');
        })
        .catch((error) => {
            console.error("Error marking notification as read:", error);
            showToast('error');
        });
};

const showToast = (action) => {
    let title;

    switch (action) {
        case 'success':
            title = "Notification marked as read";
            break;
        case 'error':
            title = "Failed to mark notification as read";
            break;
        default:
            title = "Notification";
            break;
    }

    Swal.fire({
        position: "top-end",
        icon: action === 'error' ? "error" : "success",
        title: title,
        showConfirmButton: false,
        timer: 3000,
        iconColor: "#ffffff",
        toast: true,
        color: "#ffffff",
        background: action === 'error' ? "#ef4444" : "#22c55e",
    });
}

const markAllAsRead = () => {
    // First update the local state
    localNotifications.value.forEach((notification) => {
        notification.is_read = true;
    });
    updateUnreadCount();

    // Then send the request using axios
    axios
        .post(route("notifications.mark-all-as-read"))
        .then(() => {
            // Refresh notifications after successful update
            router.reload({ only: ["notifications"], preserveScroll: true });
            showToast('success');
        })
        .catch((error) => {
            console.error("Error marking all notifications as read:", error);
            showToast('error');
        });
};

const formatDate = (date) => {
    return new Date(date).toLocaleString();
};

const updateUnreadCount = () => {
    unreadCount.value = localNotifications.value.filter(
        (n) => !n.is_read,
    ).length;
};

onMounted(() => {
    updateUnreadCount();
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

const handleClickOutside = (event) => {
    if (showDropdown.value && !event.target.closest(".relative")) {
        showDropdown.value = false;
    }
};
</script>
