import { mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Breadcrumbs",
  __ssrInlineRender: true,
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: "flex mb-4",
        "aria-label": "Breadcrumb"
      }, _attrs))}><ol class="inline-flex items-center space-x-1 md:space-x-3"><!--[-->`);
      ssrRenderList(__props.items, (item, index) => {
        _push(`<li class="inline-flex items-center">`);
        if (index > 0) {
          _push(`<svg class="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        if (!item.active) {
          _push(ssrRenderComponent(unref(Link), {
            href: item.href,
            class: "inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span${_scopeId}>${ssrInterpolate(item.name)}</span>`);
              } else {
                return [
                  createVNode("span", null, toDisplayString(item.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<span class="text-sm font-medium text-gray-500">${ssrInterpolate(item.name)}</span>`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ol></nav>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Breadcrumbs/Breadcrumbs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
