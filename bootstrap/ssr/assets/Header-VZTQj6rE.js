import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "Header",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<h2${ssrRenderAttrs(mergeProps({ class: "font-semibold text-[20px] px-5 sm:text-[30px] text-gray-800 leading-tight" }, _attrs))}>${ssrInterpolate(props.title)}</h2>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Header/Header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
