<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<template>
  <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ props.title }}</h2>
</template>

<style scoped>

</style>
