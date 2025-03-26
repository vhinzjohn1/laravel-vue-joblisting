import { useModel, ref, onMounted, nextTick, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrGetDynamicModelProps } from "vue/server-renderer";
const _sfc_main = {
  __name: "TextInput",
  __ssrInlineRender: true,
  props: {
    "modelValue": {
      type: [String, Number],
      required: true
    },
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const model = useModel(__props, "modelValue");
    const input = ref(null);
    onMounted(async () => {
      var _a;
      await nextTick();
      if ((_a = input.value) == null ? void 0 : _a.hasAttribute("autofocus")) {
        input.value.focus();
      }
    });
    __expose({ focus: () => input.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full",
        ref_key: "input",
        ref: input
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, model.value))))}>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TextInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
