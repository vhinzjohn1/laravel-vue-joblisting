<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-center justify-center min-h-screen p-4 text-center">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>

      <!-- Modal panel -->
      <div class="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 max-w-lg w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full flex items-center justify-center flex-col">
              <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                Verify you're human
              </h3>

              <div class="mt-4 w-full">
                <div v-if="!isChecked" class="flex items-center space-x-2 mb-4">
                  <div
                    class="w-6 h-6 border rounded cursor-pointer flex items-center justify-center hover:border-gray-400"
                    :class="{ 'border-gray-300': !isChecked }"
                    @click="handleCheckboxClick"
                  >
                    <svg
                      v-if="isChecked"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <span class="text-sm text-gray-600">I'm not a robot</span>
                </div>

                <div v-if="showCaptcha" class="mt-4">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm text-gray-600">Enter the code shown below</span>
                    <button
                      type="button"
                      @click="refreshCaptchaImage"
                      class="text-sm text-green-600 hover:text-green-500 flex items-center"
                      :disabled="isRefreshing"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-1"
                        :class="{ 'animate-spin': isRefreshing }"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Refresh CAPTCHA
                    </button>
                  </div>

                  <Captcha
                    v-model="captchaCode"
                    :token-name="'captcha_token'"
                    ref="captchaRef"
                    @error="handleCaptchaError"
                  />

                  <!-- Validation Error Message -->
                  <div v-if="validationError" class="mt-2 text-sm text-red-600 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                    </svg>
                    {{ validationError }}
                  </div>

                  <div class="mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                      @click="verifyCaptcha"
                      :disabled="!captchaCode || isVerifying"
                    >
                      <svg
                        v-if="isVerifying"
                        class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ isVerifying ? 'Verifying...' : 'Verify' }}
                    </button>
                    <button
                      type="button"
                      class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                      @click="closeModal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Captcha from './Captcha.vue';
import axios from 'axios';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close', 'verified']);

const isChecked = ref(false);
const showCaptcha = ref(false);
const captchaCode = ref('');
const captchaRef = ref(null);
const validationError = ref('');
const isVerifying = ref(false);
const isRefreshing = ref(false);

const handleCheckboxClick = () => {
  isChecked.value = true;
  showCaptcha.value = true;
  validationError.value = '';
};

const closeModal = () => {
  isChecked.value = false;
  showCaptcha.value = false;
  captchaCode.value = '';
  validationError.value = '';
  emit('close');
};

const handleCaptchaError = (error) => {
  validationError.value = error;
};

const refreshCaptchaImage = async (keepError = false) => {
  if (isRefreshing.value) return;

  isRefreshing.value = true;
  try {
    await captchaRef.value?.refresh();
    if (!keepError) {
      validationError.value = '';
    }
  } catch (error) {
    validationError.value = 'Failed to refresh CAPTCHA. Please try again.';
  } finally {
    isRefreshing.value = false;
  }
};

const verifyCaptcha = async () => {
  if (!captchaCode.value || isVerifying.value) return;

  isVerifying.value = true;
  validationError.value = '';

  try {
    // First validate the CAPTCHA code
    const token = document.querySelector('input[name="captcha_token"]').value;
    const response = await axios.post('/api/captcha/verify', {
      code: captchaCode.value,
      token: token
    });

    if (response.data.success) {
      emit('verified', {
        code: captchaCode.value,
        token: token
      });
      closeModal();
    } else {
      validationError.value = 'Invalid CAPTCHA code. Please try again.';
      captchaCode.value = '';
      await refreshCaptchaImage(true); // Pass true to keep the error message
    }
  } catch (error) {
    validationError.value = error.response?.data?.message || 'Failed to verify CAPTCHA. Please try again.';
    captchaCode.value = '';
    await refreshCaptchaImage(true); // Pass true to keep the error message
  } finally {
    isVerifying.value = false;
  }
};
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
