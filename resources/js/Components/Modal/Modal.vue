<template>
    <div
            class="modal fade"
            :id="modalId"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            {{ modalTitle }}
                        </h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    modalId: {
        type: String,
        required: true
    },
    modalTitle: {
        type: String,
        required: true
    }
});
</script>
