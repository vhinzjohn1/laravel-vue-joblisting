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

              <div class="mt-4">
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
                  <Captcha
                    v-model="captchaCode"
                    :token-name="'captcha_token'"
                    ref="captchaRef"
                    @error="handleCaptchaError"
                  />
                  
                  <div class="mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                      @click="verifyCaptcha"
                      :disabled="!captchaCode"
                    >
                      Verify
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

const handleCheckboxClick = () => {
  isChecked.value = true;
  showCaptcha.value = true;
};

const closeModal = () => {
  isChecked.value = false;
  showCaptcha.value = false;
  captchaCode.value = '';
  emit('close');
};

const handleCaptchaError = (error) => {
  console.error('CAPTCHA error:', error);
};

const verifyCaptcha = async () => {
  if (captchaCode.value) {
    emit('verified', {
      code: captchaCode.value,
      token: document.querySelector('input[name="captcha_token"]').value
    });
    closeModal();
  }
};
</script>
