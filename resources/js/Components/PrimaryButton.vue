<template>
    <button
        :disabled="disabled"
        class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-green-700 rounded-md border border-transparent transition duration-150 ease-in-out hover:bg-green-600 focus:bg-green-600 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
        <span v-if="loading" class="mr-2 loader"></span>
        <slot />
    </button>
</template>

<script setup>
defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped>
.loader {
  border: 2.5px solid #e5e7eb; /* light gray */
  border-top: 2.5px solid #22c55e; /* vibrant green */
  border-right: 2.5px solid #22c55e;
  border-radius: 50%;
  width: 1.3em;
  height: 1.3em;
  animation: spin 0.6s cubic-bezier(0.4,0,0.2,1) infinite;
  display: inline-block;
  vertical-align: middle;
  box-shadow: 0 0 0 2px rgba(34,197,94,0.15);
}
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
</style>