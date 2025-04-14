<template>
  <div class="captcha-container">
    <div class="captcha-image" v-if="imageData">
      <img :src="imageData" alt="CAPTCHA" class="mb-2" />
      <button
        type="button"
        @click="refreshCaptcha"
        class="refresh-button"
        :disabled="loading"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    </div>
    
    <div class="input-container">
      <input
        type="text"
        v-model="attempt"
        :placeholder="placeholder"
        class="captcha-input"
        :class="{ 'error': error }"
        maxlength="6"
        @input="onInput"
      />
      <input type="hidden" :name="tokenName" :value="token" />
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  tokenName: {
    type: String,
    default: 'captcha_token'
  },
  placeholder: {
    type: String,
    default: 'Enter the code shown above'
  }
});

const emit = defineEmits(['update:modelValue', 'error']);

const imageData = ref(null);
const token = ref('');
const attempt = ref('');
const error = ref('');
const loading = ref(false);

const refreshCaptcha = async () => {
  try {
    loading.value = true;
    error.value = '';
    
    const response = await axios.post('/api/captcha/generate');
    imageData.value = response.data.image_data;
    token.value = response.data.token;
    attempt.value = '';
    
    emit('update:modelValue', '');
  } catch (e) {
    error.value = 'Failed to load CAPTCHA. Please try again.';
    emit('error', error.value);
  } finally {
    loading.value = false;
  }
};

const onInput = () => {
  error.value = '';
  emit('update:modelValue', attempt.value);
};

onMounted(() => {
  refreshCaptcha();
});

defineExpose({
  refresh: refreshCaptcha
});
</script>

<style scoped>
.captcha-container {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.captcha-image {
  position: relative;
  display: inline-block;
}

.refresh-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.25rem;
  color: #6b7280;
  transition-property: color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.refresh-button:hover {
  color: #374151;
}

.refresh-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.captcha-input {
  margin-top: 0.25rem;
  display: block;
  width: 100%;
  border-radius: 0.375rem;
  border-color: #d1d5db;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.captcha-input:focus {
  border-color: #6366f1;
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}

.captcha-input.error {
  border-color: #ef4444;
}

.error-message {
  font-size: 0.875rem;
  color: #dc2626;
}

.input-container {
  position: relative;
}
</style>
