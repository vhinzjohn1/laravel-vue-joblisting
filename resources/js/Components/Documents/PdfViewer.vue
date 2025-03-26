<template>
  <div class="pdf-container h-full w-full" ref="pdfContainer">
    <div v-if="loading" class="flex items-center justify-center h-full">
      <p class="text-gray-500">Loading PDF...</p>
    </div>
    <canvas ref="pdfCanvas" class="w-full h-full"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const props = defineProps({
  url: {
    type: String,
    required: true
  }
});

const pdfContainer = ref(null);
const pdfCanvas = ref(null);
const loading = ref(true);
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.5;

const renderPage = (num) => {
  pageRendering = true;

  // Using promise to fetch the page
  pdfDoc.getPage(num).then((page) => {
    const viewport = page.getViewport({ scale });
    const canvas = pdfCanvas.value;
    const context = canvas.getContext('2d');

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    const renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(() => {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
      loading.value = false;
    });
  });
};

const queueRenderPage = (num) => {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
};

const loadPdf = async () => {
  loading.value = true;
  try {
    pdfDoc = await pdfjsLib.getDocument(props.url).promise;
    renderPage(pageNum);
  } catch (error) {
    console.error('Error loading PDF:', error);
    loading.value = false;
  }
};

watch(() => props.url, (newUrl) => {
  if (newUrl) {
    loadPdf();
  }
});

onMounted(() => {
  if (props.url) {
    loadPdf();
  }
});

onBeforeUnmount(() => {
  // Clean up resources if needed
  pdfDoc = null;
});
</script> 
