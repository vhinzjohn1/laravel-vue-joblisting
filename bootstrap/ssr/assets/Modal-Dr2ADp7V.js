import { ssrRenderTeleport, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { watch, onMounted, onUnmounted, computed, useSSRContext } from "vue";
const _sfc_main = {
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    closeable: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    watch(
      () => props.show,
      () => {
        if (props.show) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = null;
        }
      }
    );
    const close = () => {
      if (props.closeable) {
        emit("close");
      }
    };
    const closeOnEscape = (e) => {
      if (e.key === "Escape" && props.show) {
        close();
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = null;
    });
    const maxWidthClass = computed(() => {
      return {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "3xl": "sm:max-w-3xl",
        "4xl": "sm:max-w-4xl",
        "5xl": "sm:max-w-5xl",
        "6xl": "sm:max-w-6xl",
        "7xl": "sm:max-w-7xl"
      }[props.maxWidth];
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="fixed inset-0 px-4 py-6 sm:px-0 z-50 flex items-center justify-center"><div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="fixed inset-0 bg-gray-500 opacity-75"></div><div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="${ssrRenderClass([[
          maxWidthClass.value,
          "min-w-[370px] max-w-[90vw] max-h-[90vh] overflow-y-auto"
        ], "bg-white rounded-lg shadow-xl transform transition-all sm:w-full sm:mx-auto"])}">`);
        if (__props.show) {
          _push2(`<div>`);
          if (__props.showHeader) {
            _push2(`<div class="modal-header bg-gray-50 px-5 py-4 border-b"><div class="flex justify-between items-center w-full"><h5 class="modal-title font-semibold text-gray-900 text-lg">${ssrInterpolate(__props.title)}</h5>`);
            if (__props.closeable) {
              _push2(`<button type="button" class="btn-close text-gray-500 hover:text-gray-700" aria-label="Close"><i class="fas fa-times"></i></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div>`);
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div></div>`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Modal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
