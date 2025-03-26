import { ref, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import "./ApplicationLogo-Ds5KDWV0.js";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./NotificationBell-DssmmqXB.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "AdminLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const showMobileMenu = ref(false);
    const sidebarOpen = ref(true);
    const showLogoutModal = ref(false);
    const hoveredItem = ref(null);
    console.log(usePage().props);
    const setHoveredItem = (item) => {
      hoveredItem.value = item;
    };
    const clearHoveredItem = () => {
      hoveredItem.value = null;
    };
    const isActive = (routeName) => {
      return route().current(routeName);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100" }, _attrs))} data-v-06a98ce2><div class="lg:hidden" data-v-06a98ce2><button class="fixed top-4 right-4 z-50 rounded-lg bg-white p-2 text-gray-600 shadow-lg hover:bg-gray-50 focus:outline-none" data-v-06a98ce2>`);
      if (!showMobileMenu.value) {
        _push(`<i class="fas fa-bars h-6 w-6" data-v-06a98ce2></i>`);
      } else {
        _push(`<i class="fas fa-times h-6 w-6" data-v-06a98ce2></i>`);
      }
      _push(`</button></div><div class="${ssrRenderClass([{
        "translate-x-0": showMobileMenu.value,
        "-translate-x-full": !showMobileMenu.value,
        "w-64": sidebarOpen.value,
        "w-20": !sidebarOpen.value
      }, "fixed left-0 top-0 z-40 h-full bg-[#012f12] shadow-xl transition-all duration-300 ease-in-out lg:translate-x-0 flex flex-col"])}" data-v-06a98ce2><nav class="flex-1 px-3 py-4 overflow-y-auto" data-v-06a98ce2><ul class="space-y-1" data-v-06a98ce2><li data-v-06a98ce2>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.index"),
        class: ["flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden", {
          "bg-[#ffc001] text-black": isActive("admin.index"),
          "text-gray-300 hover:bg-[#034b1c] hover:text-white": !isActive("admin.index")
        }],
        onMouseenter: ($event) => setHoveredItem("dashboard"),
        onMouseleave: ($event) => clearHoveredItem()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center w-full" data-v-06a98ce2${_scopeId}><div class="${ssrRenderClass([{
              "text-black": isActive("admin.index")
            }, "flex items-center justify-center w-8 h-8 transition-all duration-300"])}" data-v-06a98ce2${_scopeId}><i class="fas fa-tachometer-alt" data-v-06a98ce2${_scopeId}></i></div>`);
            if (sidebarOpen.value) {
              _push2(`<span class="${ssrRenderClass([{
                "font-semibold": isActive("admin.index")
              }, "ml-3 font-medium transition-all duration-300"])}" data-v-06a98ce2${_scopeId}>Admin Dashboard</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (hoveredItem.value === "dashboard" && !isActive("admin.index")) {
              _push2(`<div class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300" data-v-06a98ce2${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "flex items-center w-full" }, [
                createVNode("div", {
                  class: ["flex items-center justify-center w-8 h-8 transition-all duration-300", {
                    "text-black": isActive("admin.index")
                  }]
                }, [
                  createVNode("i", { class: "fas fa-tachometer-alt" })
                ], 2),
                sidebarOpen.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: ["ml-3 font-medium transition-all duration-300", {
                    "font-semibold": isActive("admin.index")
                  }]
                }, "Admin Dashboard", 2)) : createCommentVNode("", true)
              ]),
              hoveredItem.value === "dashboard" && !isActive("admin.index") ? (openBlock(), createBlock("div", {
                key: 0,
                class: "absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-06a98ce2>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("profile.edit"),
        class: ["flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden", {
          "bg-[#ffc001] text-black": isActive("profile.edit"),
          "text-gray-300 hover:bg-[#034b1c] hover:text-white": !isActive("profile.edit")
        }],
        onMouseenter: ($event) => setHoveredItem("profile"),
        onMouseleave: ($event) => clearHoveredItem()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center w-full" data-v-06a98ce2${_scopeId}><div class="${ssrRenderClass([{
              "text-black": isActive("profile.edit")
            }, "flex items-center justify-center w-8 h-8 transition-all duration-300"])}" data-v-06a98ce2${_scopeId}><i class="fas fa-user" data-v-06a98ce2${_scopeId}></i></div>`);
            if (sidebarOpen.value) {
              _push2(`<span class="${ssrRenderClass([{
                "font-semibold": isActive("profile.edit")
              }, "ml-3 font-medium transition-all duration-300"])}" data-v-06a98ce2${_scopeId}>Profile</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (hoveredItem.value === "profile" && !isActive("profile.edit")) {
              _push2(`<div class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300" data-v-06a98ce2${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "flex items-center w-full" }, [
                createVNode("div", {
                  class: ["flex items-center justify-center w-8 h-8 transition-all duration-300", {
                    "text-black": isActive("profile.edit")
                  }]
                }, [
                  createVNode("i", { class: "fas fa-user" })
                ], 2),
                sidebarOpen.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: ["ml-3 font-medium transition-all duration-300", {
                    "font-semibold": isActive("profile.edit")
                  }]
                }, "Profile", 2)) : createCommentVNode("", true)
              ]),
              hoveredItem.value === "profile" && !isActive("profile.edit") ? (openBlock(), createBlock("div", {
                key: 0,
                class: "absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-06a98ce2>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("test.index"),
        class: ["flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden", {
          "bg-[#ffc001] text-black": isActive("test.index"),
          "text-gray-300 hover:bg-[#034b1c] hover:text-white": !isActive("test.index")
        }],
        onMouseenter: ($event) => setHoveredItem("test"),
        onMouseleave: ($event) => clearHoveredItem()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center w-full" data-v-06a98ce2${_scopeId}><div class="${ssrRenderClass([{
              "text-black": isActive("test.index")
            }, "flex items-center justify-center w-8 h-8 transition-all duration-300"])}" data-v-06a98ce2${_scopeId}><i class="fas fa-upload" data-v-06a98ce2${_scopeId}></i></div>`);
            if (sidebarOpen.value) {
              _push2(`<span class="${ssrRenderClass([{
                "font-semibold": isActive("test.index")
              }, "ml-3 font-medium transition-all duration-300"])}" data-v-06a98ce2${_scopeId}>Test Upload</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (hoveredItem.value === "test" && !isActive("test.index")) {
              _push2(`<div class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300" data-v-06a98ce2${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "flex items-center w-full" }, [
                createVNode("div", {
                  class: ["flex items-center justify-center w-8 h-8 transition-all duration-300", {
                    "text-black": isActive("test.index")
                  }]
                }, [
                  createVNode("i", { class: "fas fa-upload" })
                ], 2),
                sidebarOpen.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: ["ml-3 font-medium transition-all duration-300", {
                    "font-semibold": isActive("test.index")
                  }]
                }, "Test Upload", 2)) : createCommentVNode("", true)
              ]),
              hoveredItem.value === "test" && !isActive("test.index") ? (openBlock(), createBlock("div", {
                key: 0,
                class: "absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></nav><div class="border-t border-[#023d17] p-4 mt-auto" data-v-06a98ce2><div class="flex items-center justify-between" data-v-06a98ce2><div class="flex items-center" data-v-06a98ce2><div class="flex-shrink-0" data-v-06a98ce2>`);
      if (sidebarOpen.value) {
        _push(`<span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200" data-v-06a98ce2><span class="text-sm font-medium leading-none text-gray-600" data-v-06a98ce2>${ssrInterpolate(_ctx.$page.props.auth.user.username.charAt(0))}</span></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (sidebarOpen.value) {
        _push(`<div class="ml-3" data-v-06a98ce2><p class="text-sm text-white max-w-[150px] truncate" title="{{ $page.props.auth.user.email }}" data-v-06a98ce2>${ssrInterpolate(_ctx.$page.props.auth.user.email)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="rounded-lg p-1.5 text-white hover:bg-[#ffc001] hover:text-black transition-colors duration-200" data-v-06a98ce2><i class="fas fa-sign-out-alt h-5 w-5" data-v-06a98ce2></i></button></div></div></div>`);
      if (showMobileMenu.value) {
        _push(`<div class="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden" data-v-06a98ce2></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showLogoutModal.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity" data-v-06a98ce2><div class="relative w-full max-w-sm rounded-lg bg-white p-6 text-center" data-v-06a98ce2><h3 class="mb-1 text-lg font-semibold text-black" data-v-06a98ce2> Are you sure you want to log out? </h3><p class="mb-4 text-gray-800" data-v-06a98ce2> Log out of <span class="text-black" data-v-06a98ce2>${ssrInterpolate(_ctx.$page.props.auth.user.email)}?</span></p><div class="flex flex-col space-y-2" data-v-06a98ce2><button class="w-full rounded-lg logout px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-300" data-v-06a98ce2> Log out </button><button class="w-full rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" data-v-06a98ce2> Cancel </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([{
        "lg:ml-64": sidebarOpen.value,
        "lg:ml-20": !sidebarOpen.value
      }, "transition-all duration-300 ease-in-out"])}" data-v-06a98ce2>`);
      if (_ctx.$slots.header) {
        _push(`<header class="bg-white shadow-sm" data-v-06a98ce2><div class="mx-auto py-2.5 sm:px-10 md:px-12 lg:px-8 flex items-center gap-5" data-v-06a98ce2><button class="hidden lg:flex rounded-full w-8 h-8 items-center justify-center text-gray-600 hover:bg-[#034b1c] hover:text-white transition-colors duration-200 ml-4 flex-shrink-0" data-v-06a98ce2><i class="${ssrRenderClass([
          sidebarOpen.value ? "fa-chevron-left" : "fa-chevron-right",
          "fas text-xs"
        ])}" data-v-06a98ce2></i></button><div class="flex-grow" data-v-06a98ce2>`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          class: "mr-20",
          notifications: _ctx.$page.props.notifications
        }, null, _parent));
        _push(`</div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="py-1" data-v-06a98ce2><div class="max-w-7xl mx-auto sm:px-6 lg:px-8" data-v-06a98ce2>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Admin/AdminLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-06a98ce2"]]);
export {
  AdminLayout as A
};
