<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<template>
  <h2 class="font-semibold text-[20px] px-5 sm:text-[30px] text-gray-800 leading-tight">{{ props.title }}</h2>
</template>

<style scoped>

</style>
