<script setup>
import { computed, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: "2xl",
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
        default: "",
    },
    showHeader: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(["close"]);

watch(
    () => props.show,
    () => {
        if (props.show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = null;
        }
    },
);

const close = () => {
    if (props.closeable) {
        emit("close");
    }
};

const closeOnEscape = (e) => {
    if (e.key === "Escape" && props.show) {
        close();
    }
};

onMounted(() => document.addEventListener("keydown", closeOnEscape));

onUnmounted(() => {
    document.removeEventListener("keydown", closeOnEscape);
    document.body.style.overflow = null;
});

const maxWidthClass = computed(() => {
    return {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "3xl": "sm:max-w-3xl",
        "4xl": "sm:max-w-4xl",
        "5xl": "sm:max-w-5xl",
        "6xl": "sm:max-w-6xl",
        "7xl": "sm:max-w-7xl",
    }[props.maxWidth];
});
</script>

<template>
    <Teleport to="body">
        <Transition leave-active-class="duration-150">
            <div
                v-show="show"
                class="fixed inset-0 px-4 py-6 sm:px-0 z-50 flex items-center justify-center"
            >
                <Transition
                    enter-active-class="ease-out duration-150"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-150"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div
                        v-show="show"
                        class="fixed inset-0 bg-gray-500 opacity-75"
                        @click="close"
                    ></div>
                </Transition>

                <Transition
                    enter-active-class="ease-out duration-150"
                    enter-from-class="opacity-0 translate-y-2"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="ease-in duration-150"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 translate-y-2"
                >
                    <div
                        v-show="show"
                        class="bg-white rounded-lg shadow-xl transform transition-all sm:w-full sm:mx-auto"
                        :class="[
                            maxWidthClass,
                            'min-w-[450px] max-w-[90vw] max-h-[90vh] overflow-y-auto',
                        ]"
                    >
                        <div v-if="show">
                            <!-- Modal Header -->
                            <div
                                v-if="showHeader"
                                class="modal-header bg-gray-50 px-5 py-4 border-b"
                            >
                                <div
                                    class="flex justify-between items-center w-full"
                                >
                                    <h5
                                        class="modal-title font-semibold text-gray-900 text-lg"
                                    >
                                        {{ title }}
                                    </h5>
                                    <button
                                        v-if="closeable"
                                        type="button"
                                        class="btn-close text-gray-500 hover:text-gray-700"
                                        @click="close"
                                        aria-label="Close"
                                    >
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>

                            <!-- Modal Content (Scrollable) -->
                            <div>
                                <slot />
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>
