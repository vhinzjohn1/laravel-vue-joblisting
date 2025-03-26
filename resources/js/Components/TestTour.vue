<template>
    <div class="test-tour">
        <h1 class="text-xl font-bold my-4">Tour Test Component</h1>
        <button
            @click="startTour"
            class="px-4 py-2 bg-[#012f12] text-white rounded"
        >
            Start Test Tour
        </button>

        <div class="grid grid-cols-3 gap-4 mt-8">
            <div id="test-1" class="p-4 bg-blue-100">Step 1</div>
            <div id="test-2" class="p-4 bg-green-100">Step 2</div>
            <div id="test-3" class="p-4 bg-yellow-100">Step 3</div>
        </div>

        <vue-guided-tour
            v-model:stepIndex="currentStepIndex"
            :steps="steps"
            @after-start="onAfterStart"
            @after-exit="onAfterExit"
            @after-move="onAfterMove"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useVgt } from 'vue-guided-tour'

const currentStepIndex = ref(-1);
const steps = ref([
    {
        target: "#test-1",
        title: "Test Step 1",
        content: "This is test step 1",
        popover: {
            position: "right",
            placement: "center",
        },
    },
    {
        target: "#test-2",
        title: "Test Step 2",
        content: "This is test step 2",
        popover: {
            position: "bottom",
            placement: "center",
        },
    },
    {
        target: "#test-3",
        title: "Test Step 3",
        content: "This is test step 3",
        popover: {
            position: "left",
            placement: "center",
        },
    },
]);
const $vgt = useVgt()

const startTour = () => {
    if ($vgt) {
        console.log("Starting tour with $vgt global");
        $vgt.start(0);
    } else {
        console.error("$vgt global not available");
        currentStepIndex.value = 0; // Try direct method as fallback
    }
};

const onAfterStart = () => console.log("Tour started");
const onAfterExit = () => {
    currentStepIndex.value = -1;
    console.log("Tour exited");
};
const onAfterMove = () => console.log("Tour moved", currentStepIndex.value);
</script>
