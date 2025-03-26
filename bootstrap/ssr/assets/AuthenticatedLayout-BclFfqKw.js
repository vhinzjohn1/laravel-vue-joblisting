import { ref, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { A as ApplicationLogo } from "./ApplicationLogo-Ds5KDWV0.js";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const showMobileMenu = ref(false);
    const sidebarOpen = ref(true);
    const showLogoutModal = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100" }, _attrs))} data-v-5c464649><div class="lg:hidden" data-v-5c464649><button class="fixed top-4 right-4 z-50 rounded-lg bg-white p-2 text-gray-600 shadow-lg hover:bg-gray-50 focus:outline-none" data-v-5c464649><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5c464649>`);
      if (!showMobileMenu.value) {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-5c464649></path>`);
      } else {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-5c464649></path>`);
      }
      _push(`</svg></button></div><div class="${ssrRenderClass([{
        "translate-x-0": showMobileMenu.value,
        "-translate-x-full": !showMobileMenu.value,
        "w-64": sidebarOpen.value,
        "w-20": !sidebarOpen.value
      }, "fixed left-0 top-0 z-40 h-full bg-white shadow-sm transition-all duration-300 ease-in-out lg:translate-x-0"])}" data-v-5c464649><div class="flex h-16 items-center border-b px-6 mt-2.5" data-v-5c464649>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        class: "flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, { class: "block h-8 w-auto fill-current text-gray-800" }, null, _parent2, _scopeId));
            if (sidebarOpen.value) {
              _push2(`<span class="ml-3 text-lg font-semibold text-gray-800" data-v-5c464649${_scopeId}>Dashboard</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(ApplicationLogo, { class: "block h-8 w-auto fill-current text-gray-800" }),
              sidebarOpen.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "ml-3 text-lg font-semibold text-gray-800"
              }, "Dashboard")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="mt-4 px-3" data-v-5c464649><ul class="space-y-2" data-v-5c464649><li data-v-5c464649>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        class: ["flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group", { "bg-gray-100": _ctx.route().current("dashboard") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21" data-v-5c464649${_scopeId}><path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" data-v-5c464649${_scopeId}></path><path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" data-v-5c464649${_scopeId}></path></svg>`);
            if (sidebarOpen.value) {
              _push2(`<span class="ms-3 text-sm font-medium" data-v-5c464649${_scopeId}>Dashboard</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "currentColor",
                viewBox: "0 0 22 21"
              }, [
                createVNode("path", { d: "M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" }),
                createVNode("path", { d: "M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" })
              ])),
              sidebarOpen.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "ms-3 text-sm font-medium"
              }, "Dashboard")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-5c464649>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.index"),
        class: ["flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group", { "bg-gray-100": _ctx.route().current("admin.index") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21" data-v-5c464649${_scopeId}><path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" data-v-5c464649${_scopeId}></path><path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" data-v-5c464649${_scopeId}></path></svg>`);
            if (sidebarOpen.value) {
              _push2(`<span class="ms-3 text-sm font-medium" data-v-5c464649${_scopeId}>Admin Dashboard</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "currentColor",
                viewBox: "0 0 22 21"
              }, [
                createVNode("path", { d: "M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" }),
                createVNode("path", { d: "M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" })
              ])),
              sidebarOpen.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "ms-3 text-sm font-medium"
              }, "Admin Dashboard")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-5c464649><h1 data-v-5c464649>THis is the AuthenticatedLayout</h1></li></ul></nav><div class="absolute bottom-0 w-full border-t bg-white p-4" data-v-5c464649><div class="flex items-center justify-between" data-v-5c464649><div class="flex items-center" data-v-5c464649><div class="flex-shrink-0" data-v-5c464649>`);
      if (sidebarOpen.value) {
        _push(`<span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200" data-v-5c464649><span class="text-sm font-medium leading-none text-gray-600" data-v-5c464649>${ssrInterpolate(_ctx.$page.props.auth.user.username.charAt(0))}</span></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (sidebarOpen.value) {
        _push(`<div class="ml-3" data-v-5c464649><p class="text-md font-medium text-gray-900" data-v-5c464649>${ssrInterpolate(_ctx.$page.props.auth.user.name)}</p><p class="text-sm text-gray-900" data-v-5c464649>${ssrInterpolate(_ctx.$page.props.auth.user.email)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="rounded-lg p-1.5 text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:text-black" data-v-5c464649><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5c464649><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-5c464649></path></svg></button></div></div></div><button class="${ssrRenderClass([{
        "left-64": sidebarOpen.value,
        "left-20": !sidebarOpen.value
      }, "fixed left-0 top-4 z-40 hidden rounded-r-lg p-2 m-2 text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-600 lg:block"])}" data-v-5c464649><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5c464649>`);
      if (sidebarOpen.value) {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-5c464649></path>`);
      } else {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-5c464649></path>`);
      }
      _push(`</svg></button>`);
      if (showMobileMenu.value) {
        _push(`<div class="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden" data-v-5c464649></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showLogoutModal.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity" data-v-5c464649><div class="relative w-full max-w-sm rounded-lg bg-white p-6 text-center" data-v-5c464649><h3 class="mb-1 text-lg font-semibold text-black" data-v-5c464649> Are you sure you want to log out? </h3><p class="mb-4 text-gray-800" data-v-5c464649> Log out of <span class="text-black" data-v-5c464649>${ssrInterpolate(_ctx.$page.props.auth.user.email)}?</span></p><div class="flex flex-col space-y-2" data-v-5c464649><button class="w-full rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300" data-v-5c464649> Log out </button><button class="w-full rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" data-v-5c464649> Cancel </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([{
        "lg:ml-64": sidebarOpen.value,
        "lg:ml-20": !sidebarOpen.value
      }, "transition-all duration-300 ease-in-out"])}" data-v-5c464649>`);
      if (_ctx.$slots.header) {
        _push(`<header class="bg-white shadow" data-v-5c464649><div class="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8" data-v-5c464649>`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="py-1" data-v-5c464649><div class="max-w-7xl mx-auto sm:px-6 lg:px-8" data-v-5c464649>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AuthenticatedLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5c464649"]]);
export {
  AuthenticatedLayout as A
};
