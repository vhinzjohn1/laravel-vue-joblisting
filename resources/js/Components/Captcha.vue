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
        class="w-full p-2 text-sm rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
        :class="{ 'error': error }"
        maxlength="6"
        autofocus
        @input="onInput"
      />
      <input type="hidden" :name="tokenName" :value="token" />
    </div>

    <div v-if="error" class="error-message">
      <div class="flex items-center text-red-600">
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <span>{{ error }}</span>
      </div>
      <div v-if="retryAfter" class="text-sm text-gray-600 mt-1">
        Please wait {{ retryAfter }} seconds before trying again.
      </div>
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
const retryAfter = ref(null);

const refreshCaptcha = async () => {
  try {
    loading.value = true;
    error.value = '';
    retryAfter.value = null;

    const response = await axios.post('/api/captcha/generate');
    imageData.value = response.data.image_data;
    token.value = response.data.token;
    attempt.value = '';

    emit('update:modelValue', '');
  } catch (e) {
    const responseData = e.response?.data;

    if (e.response?.status === 429) {
      error.value = responseData.message || 'Too many requests. Please wait before trying again.';
      retryAfter.value = responseData.retry_after;
    } else {
      error.value = responseData?.message ||
                   'Failed to load CAPTCHA. Please try refreshing the page.';

      // Log error details if in development
      if (responseData?.debug) {
        console.error('CAPTCHA Error:', responseData.debug);
      }
    }

    emit('error', error.value);
  } finally {
    loading.value = false;
  }
};

const onInput = () => {
  error.value = '';
  retryAfter.value = null;
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

.error-message {
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

.input-container {
  position: relative;
}
</style>
