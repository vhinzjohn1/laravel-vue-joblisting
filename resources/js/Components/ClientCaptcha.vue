<template>
  <div class="captcha-container">
    <canvas ref="canvas" class="captcha-canvas w-full" :width="canvasWidth" :height="100"></canvas>
    <div class="mt-4">
      <input
        type="text"
        v-model="userInput"
        :placeholder="placeholder"
        class="w-full uppercase p-2 text-sm rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
        :class="{ 'border-red-500': error }"
        maxlength="6"
        autofocus
        @input="onInput"
        @keyup.enter="verifyCaptcha"
      />
    </div>
    <div v-if="error" class="mt-2 text-sm text-red-600 flex items-center">
      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>
      {{ error }}
    </div>
    <div class="mt-4 flex justify-center">
      <button
        type="button"
        class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
        :disabled="userInput.length !== captchaText.length || loading"
        @click="verifyCaptcha"
      >
        <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span v-if="!loading">Verify</span>
        <span v-else>Verifying...</span>
      </button>
      <button
        type="button"
        @click="refreshCaptcha"
        class="ml-2 text-sm text-green-600 hover:text-green-500 flex items-center"
        :disabled="loading"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1"
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
        Refresh
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Enter the code shown above'
  }
});

const emit = defineEmits(['update:modelValue', 'verified']);

const canvas = ref(null);
const userInput = ref('');
const error = ref('');
const captchaText = ref('');
const loading = ref(false);
const canvasWidth = ref(300);
const lastWidth = ref(0);
const resizeTimeout = ref(null);

const updateCanvasWidthAndDraw = async () => {
  if (canvas.value && canvas.value.parentElement) {
    const newWidth = canvas.value.parentElement.offsetWidth || 300;

    // Only update if width actually changed significantly (more than 5px)
    if (Math.abs(newWidth - lastWidth.value) > 5) {
      canvasWidth.value = newWidth;
      lastWidth.value = newWidth;
      await nextTick();
      drawCaptcha();
    }
  }
};

// Debounced resize handler
const handleResize = () => {
  if (resizeTimeout.value) {
    clearTimeout(resizeTimeout.value);
  }
  resizeTimeout.value = setTimeout(() => {
    updateCanvasWidthAndDraw();
  }, 250); // 250ms debounce
};

// Exclude 0 and O from the character set
const generateRandomString = (length = 6) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789'; // No 0, no O
  let result = '';
  for (let i = 0; i < length; i++) {
    let char;
    do {
      char = chars.charAt(Math.floor(Math.random() * chars.length));
    } while (char === 'O' || char === '0');
    result += char;
  }
  return result;
};

const drawCaptcha = () => {
  if (!canvas.value || canvasWidth.value === 0) return;
  const ctx = canvas.value.getContext('2d');
  const width = canvasWidth.value;
  const height = canvas.value.height;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, width, height);

  captchaText.value = generateRandomString();

  ctx.font = 'bold 48px Arial'; // Bigger font
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const spacing = width / (captchaText.value.length + 1);
  for (let i = 0; i < captchaText.value.length; i++) {
    const x = spacing * (i + 1);
    const y = height / 2;
    const rotation = (Math.random() - 0.5) * 0.4;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = `rgb(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100})`;
    ctx.fillText(captchaText.value[i], 0, 0);
    ctx.restore();
  }

  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
    ctx.beginPath();
    ctx.arc(
      Math.random() * width,
      Math.random() * height,
      Math.random() * 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, Math.random() * height);
    ctx.lineTo(Math.random() * width, Math.random() * height);
    ctx.stroke();
  }
};

const refreshCaptcha = async () => {
  userInput.value = '';
  error.value = '';
  await nextTick();
  drawCaptcha();
};

const onInput = () => {
  error.value = '';
  emit('update:modelValue', userInput.value);
};

const verifyCaptcha = async () => {
  error.value = '';
  if (userInput.value.length !== captchaText.value.length) return;
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 700));
  if (userInput.value.toUpperCase() === captchaText.value) {
    emit('verified', true);
  } else {
    error.value = 'Invalid CAPTCHA code. Please try again.';
    emit('verified', false);
    loading.value = false;
  }
};

onMounted(async () => {
  // Wait for next tick to ensure DOM is ready
  await nextTick();

  if (canvas.value && canvas.value.parentElement) {
    lastWidth.value = canvas.value.parentElement.offsetWidth || 300;
    canvasWidth.value = lastWidth.value;
    // Ensure we draw the captcha after setting the width
    await nextTick();
    drawCaptcha();
  }

  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (resizeTimeout.value) {
    clearTimeout(resizeTimeout.value);
  }
});

defineExpose({
  refresh: refreshCaptcha
});
</script>

<style scoped>
.captcha-container {
  margin: 1rem 0;
}

.captcha-canvas {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #f3f4f6;
  display: block;
}
</style>
