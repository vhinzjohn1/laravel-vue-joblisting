import { ref, onMounted, watch, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { A as ApplicationLogo } from "./ApplicationLogo-Ds5KDWV0.js";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./NotificationBell-DssmmqXB.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "HRLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const showMobileMenu = ref(false);
    const sidebarOpen = ref(true);
    const showLogoutModal = ref(false);
    const activeDropdown = ref(null);
    const hoveredItem = ref(null);
    onMounted(() => {
      if (route().current("schedules.index") || route().current("schedules.show") || route().current("groups.index")) {
        activeDropdown.value = "schedule";
      }
    });
    watch(
      () => route().current(),
      (newRoute) => {
        if (newRoute === "schedules.index" || newRoute === "schedules.show" || newRoute === "groups.index") {
          activeDropdown.value = "schedule";
        }
      }
    );
    const setHoveredItem = (item) => {
      hoveredItem.value = item;
    };
    const clearHoveredItem = () => {
      hoveredItem.value = null;
    };
    const isActive = (routeName) => {
      return route().current(routeName);
    };
    const isActiveGroup = (routeNames) => {
      return routeNames.some((name) => route().current(name));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100" }, _attrs))} data-v-c9efb78e><button class="fixed top-4 right-4 z-50 lg:hidden rounded-full w-10 h-10 flex items-center justify-center bg-white shadow-lg text-gray-700 hover:bg-gray-50 focus:outline-none transition-all duration-300" data-v-c9efb78e><i class="${ssrRenderClass([
        showMobileMenu.value ? "fa-times" : "fa-bars",
        "fas text-lg"
      ])}" data-v-c9efb78e></i></button>`);
      if (showMobileMenu.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300" data-v-c9efb78e></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([{
        "translate-x-0": showMobileMenu.value,
        "-translate-x-full": !showMobileMenu.value,
        "w-64": sidebarOpen.value,
        "w-20": !sidebarOpen.value
      }, "fixed left-0 top-0 h-full z-40 bg-[#012f12] shadow-xl transition-all duration-300 ease-in-out lg:translate-x-0 flex flex-col"])}" data-v-c9efb78e><div class="flex items-center h-16 px-4 border-b border-[#023d17]" data-v-c9efb78e>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("hr.index"),
        class: "flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, { class: "h-9 w-9 text-[#ffc001]" }, null, _parent2, _scopeId));
            if (sidebarOpen.value) {
              _push2(`<span class="ml-3 text-lg font-bold text-white transition-opacity duration-300" data-v-c9efb78e${_scopeId}>HR Personnel</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(ApplicationLogo, { class: "h-9 w-9 text-[#ffc001]" }),
              sidebarOpen.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "ml-3 text-lg font-bold text-white transition-opacity duration-300"
              }, "HR Personnel")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="flex-1 px-3 py-4 overflow-y-auto" data-v-c9efb78e><ul class="space-y-1" data-v-c9efb78e><li data-v-c9efb78e>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("hr.index"),
        class: ["flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden", {
          "bg-[#ffc001] text-black": isActive("hr.index"),
          "text-gray-300 hover:bg-[#034b1c] hover:text-white": !isActive("hr.index")
        }],
        onMouseenter: ($event) => setHoveredItem("dashboard"),
        onMouseleave: ($event) => clearHoveredItem()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center w-full" data-v-c9efb78e${_scopeId}><div class="${ssrRenderClass([{
              "text-black": isActive("hr.index")
            }, "flex items-center justify-center w-8 h-8 transition-all duration-300"])}" data-v-c9efb78e${_scopeId}><i class="fas fa-tachometer-alt" data-v-c9efb78e${_scopeId}></i></div>`);
            if (sidebarOpen.value) {
              _push2(`<span class="${ssrRenderClass([{
                "font-semibold": isActive("hr.index")
              }, "ml-3 font-medium transition-all duration-300"])}" data-v-c9efb78e${_scopeId}>HR Dashboard</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (hoveredItem.value === "dashboard" && !isActive("hr.index")) {
              _push2(`<div class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300" data-v-c9efb78e${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "flex items-center w-full" }, [
                createVNode("div", {
                  class: ["flex items-center justify-center w-8 h-8 transition-all duration-300", {
                    "text-black": isActive("hr.index")
                  }]
                }, [
                  createVNode("i", { class: "fas fa-tachometer-alt" })
                ], 2),
                sidebarOpen.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: ["ml-3 font-medium transition-all duration-300", {
                    "font-semibold": isActive("hr.index")
                  }]
                }, "HR Dashboard", 2)) : createCommentVNode("", true)
              ]),
              hoveredItem.value === "dashboard" && !isActive("hr.index") ? (openBlock(), createBlock("div", {
                key: 0,
                class: "absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="relative" data-v-c9efb78e><div class="${ssrRenderClass([{
        "text-white": isActiveGroup([
          "job-category.index",
          "job-category.show",
          "job-position.index"
        ]),
        "text-gray-300 hover:bg-[#034b1c] hover:text-white": !isActiveGroup([
          "job-category.index",
          "job-category.show",
          "job-position.index"
        ])
      }, "flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer group transition-all duration-200 relative overflow-hidden"])}" data-v-c9efb78e><div class="flex items-center" data-v-c9efb78e><div class="${ssrRenderClass([{
        "text-white": isActiveGroup([
          "job-category.index",
          "job-category.show",
          "job-position.index"
        ])
      }, "flex items-center justify-center w-8 h-8 transition-all duration-300"])}" data-v-c9efb78e><i class="fas fa-calendar-alt" data-v-c9efb78e></i></div>`);
      if (sidebarOpen.value) {
        _push(`<span class="${ssrRenderClass([{
          "font-semibold": isActiveGroup([
            "job-category.index",
            "job-category.show",
            "job-position.index"
          ])
        }, "ml-3 font-medium transition-all duration-300"])}" data-v-c9efb78e>Manage Job Details</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (sidebarOpen.value) {
        _push(`<div class="${ssrRenderClass([{
          "rotate-180": activeDropdown.value === "manage-job-details"
        }, "transition-transform duration-300"])}" data-v-c9efb78e><i class="${ssrRenderClass([{
          "text-black": isActiveGroup([
            "job-category.index",
            "job-category.show",
            "job-position.index"
          ])
        }, "fas fa-chevron-down text-xs"])}" data-v-c9efb78e></i></div>`);
      } else {
        _push(`<!---->`);
      }
      if (hoveredItem.value === "manage-job-details" && !isActiveGroup([
        "job-category.index",
        "job-category.show",
        "job-position.index"
      ])) {
        _push(`<div class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300" data-v-c9efb78e></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><ul style="${ssrRenderStyle(activeDropdown.value === "manage-job-details" ? null : { display: "none" })}" class="mt-1 space-y-1 pl-7" data-v-c9efb78e><li data-v-c9efb78e>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("job-category.index"),
        class: ["flex items-center px-3 py-2 rounded-md text-sm transition-all duration-200", {
          "bg-[#ffc001] text-black font-medium": isActive("job-category.index"),
          "text-gray-300 hover:bg-[#034b1c] hover:text-white": !isActive("job-category.index")
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="${ssrRenderClass([{
              "text-black": isActive("job-category.index")
            }, "fas fa-calendar-check mr-2"])}" data-v-c9efb78e${_scopeId}></i><span data-v-c9efb78e${_scopeId}>Job Category</span>`);
          } else {
            return [
              createVNode("i", {
                class: ["fas fa-calendar-check mr-2", {
                  "text-black": isActive("job-category.index")
                }]
              }, null, 2),
              createVNode("span", null, "Job Category")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-c9efb78e>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("job-position.index"),
        class: ["flex items-center px-3 py-2 rounded-md text-sm transition-all duration-200", {
          "bg-[#ffc001] text-black font-medium": isActive("job-position.index"),
          "text-gray-300 hover:bg-[#034b1c] hover:text-white": !isActive("job-position.index")
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="${ssrRenderClass([{
              "text-black": isActive("job-position.index")
            }, "fas fa-users-cog mr-2"])}" data-v-c9efb78e${_scopeId}></i><span data-v-c9efb78e${_scopeId}>Job Position</span>`);
          } else {
            return [
              createVNode("i", {
                class: ["fas fa-users-cog mr-2", {
                  "text-black": isActive("job-position.index")
                }]
              }, null, 2),
              createVNode("span", null, "Job Position")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></li><li data-v-c9efb78e>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("job-listing.index"),
        class: ["flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden", {
          "bg-[#ffc001] text-black": isActive("job-listing.index"),
          "text-gray-300 hover:bg-[#034b1c] hover:text-white": !isActive("job-listing.index")
        }],
        onMouseenter: ($event) => setHoveredItem("jobs"),
        onMouseleave: ($event) => clearHoveredItem()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center w-full" data-v-c9efb78e${_scopeId}><div class="${ssrRenderClass([{
              "text-black": isActive("job-listing.index")
            }, "flex items-center justify-center w-8 h-8 transition-all duration-300"])}" data-v-c9efb78e${_scopeId}><i class="fas fa-list-ul" data-v-c9efb78e${_scopeId}></i></div>`);
            if (sidebarOpen.value) {
              _push2(`<span class="${ssrRenderClass([{
                "font-semibold": isActive("job-listing.index")
              }, "ml-3 font-medium transition-all duration-300"])}" data-v-c9efb78e${_scopeId}>Job Listings</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (hoveredItem.value === "jobs" && !isActive("job-listing.index")) {
              _push2(`<div class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300" data-v-c9efb78e${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "flex items-center w-full" }, [
                createVNode("div", {
                  class: ["flex items-center justify-center w-8 h-8 transition-all duration-300", {
                    "text-black": isActive("job-listing.index")
                  }]
                }, [
                  createVNode("i", { class: "fas fa-list-ul" })
                ], 2),
                sidebarOpen.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: ["ml-3 font-medium transition-all duration-300", {
                    "font-semibold": isActive("job-listing.index")
                  }]
                }, "Job Listings", 2)) : createCommentVNode("", true)
              ]),
              hoveredItem.value === "jobs" && !isActive("job-listing.index") ? (openBlock(), createBlock("div", {
                key: 0,
                class: "absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-c9efb78e>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("applications.index"),
        class: ["flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden", {
          "bg-[#ffc001] text-black": isActiveGroup([
            "applications.index",
            "applications.show"
          ]),
          "text-gray-300 hover:bg-[#034b1c] hover:text-white": !isActiveGroup([
            "applications.index",
            "applications.show"
          ])
        }],
        onMouseenter: ($event) => setHoveredItem("applications"),
        onMouseleave: ($event) => clearHoveredItem()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center w-full" data-v-c9efb78e${_scopeId}><div class="${ssrRenderClass([{
              "text-black": isActiveGroup([
                "applications.index",
                "applications.show"
              ])
            }, "flex items-center justify-center w-8 h-8 transition-all duration-300"])}" data-v-c9efb78e${_scopeId}><i class="fas fa-file-alt" data-v-c9efb78e${_scopeId}></i></div>`);
            if (sidebarOpen.value) {
              _push2(`<span class="${ssrRenderClass([{
                "font-semibold": isActiveGroup([
                  "applications.index",
                  "applications.show"
                ])
              }, "ml-3 font-medium transition-all duration-300"])}" data-v-c9efb78e${_scopeId}>Manage Applications</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (hoveredItem.value === "applications" && !isActiveGroup([
              "applications.index",
              "applications.show"
            ])) {
              _push2(`<div class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300" data-v-c9efb78e${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "flex items-center w-full" }, [
                createVNode("div", {
                  class: ["flex items-center justify-center w-8 h-8 transition-all duration-300", {
                    "text-black": isActiveGroup([
                      "applications.index",
                      "applications.show"
                    ])
                  }]
                }, [
                  createVNode("i", { class: "fas fa-file-alt" })
                ], 2),
                sidebarOpen.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: ["ml-3 font-medium transition-all duration-300", {
                    "font-semibold": isActiveGroup([
                      "applications.index",
                      "applications.show"
                    ])
                  }]
                }, "Manage Applications", 2)) : createCommentVNode("", true)
              ]),
              hoveredItem.value === "applications" && !isActiveGroup([
                "applications.index",
                "applications.show"
              ]) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="relative" data-v-c9efb78e><div class="${ssrRenderClass([{
        "text-white": isActiveGroup([
          "schedules.index",
          "schedules.show",
          "groups.index"
        ]),
        "text-gray-300 hover:bg-[#034b1c] hover:text-white": !isActiveGroup([
          "schedules.index",
          "schedules.show",
          "groups.index"
        ])
      }, "flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer group transition-all duration-200 relative overflow-hidden"])}" data-v-c9efb78e><div class="flex items-center" data-v-c9efb78e><div class="${ssrRenderClass([{
        "text-white": isActiveGroup([
          "schedules.index",
          "schedules.show",
          "groups.index"
        ])
      }, "flex items-center justify-center w-8 h-8 transition-all duration-300"])}" data-v-c9efb78e><i class="fas fa-calendar-alt" data-v-c9efb78e></i></div>`);
      if (sidebarOpen.value) {
        _push(`<span class="${ssrRenderClass([{
          "font-semibold": isActiveGroup([
            "schedules.index",
            "schedules.show",
            "groups.index"
          ])
        }, "ml-3 font-medium transition-all duration-300"])}" data-v-c9efb78e>Schedule Management</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (sidebarOpen.value) {
        _push(`<div class="${ssrRenderClass([{
          "rotate-180": activeDropdown.value === "schedule"
        }, "transition-transform duration-300"])}" data-v-c9efb78e><i class="${ssrRenderClass([{
          "text-black": isActiveGroup([
            "schedules.index",
            "schedules.show",
            "groups.index"
          ])
        }, "fas fa-chevron-down text-xs"])}" data-v-c9efb78e></i></div>`);
      } else {
        _push(`<!---->`);
      }
      if (hoveredItem.value === "schedule" && !isActiveGroup([
        "schedules.index",
        "schedules.show",
        "groups.index"
      ])) {
        _push(`<div class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300" data-v-c9efb78e></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><ul style="${ssrRenderStyle(activeDropdown.value === "schedule" ? null : { display: "none" })}" class="mt-1 space-y-1 pl-7" data-v-c9efb78e><li data-v-c9efb78e>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("schedules.index"),
        class: ["flex items-center px-3 py-2 rounded-md text-sm transition-all duration-200", {
          "bg-[#ffc001] text-black font-medium": isActive("schedules.index"),
          "text-gray-300 hover:bg-[#034b1c] hover:text-white": !isActive("schedules.index")
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="${ssrRenderClass([{
              "text-black": isActive("schedules.index")
            }, "fas fa-calendar-check mr-2"])}" data-v-c9efb78e${_scopeId}></i><span data-v-c9efb78e${_scopeId}>Individual Schedule</span>`);
          } else {
            return [
              createVNode("i", {
                class: ["fas fa-calendar-check mr-2", {
                  "text-black": isActive("schedules.index")
                }]
              }, null, 2),
              createVNode("span", null, "Individual Schedule")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-c9efb78e>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("groups.index"),
        class: ["flex items-center px-3 py-2 rounded-md text-sm transition-all duration-200", {
          "bg-[#ffc001] text-black font-medium": isActive("groups.index"),
          "text-gray-300 hover:bg-[#034b1c] hover:text-white": !isActive("groups.index")
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="${ssrRenderClass([{
              "text-black": isActive("groups.index")
            }, "fas fa-users-cog mr-2"])}" data-v-c9efb78e${_scopeId}></i><span data-v-c9efb78e${_scopeId}>Group Schedule</span>`);
          } else {
            return [
              createVNode("i", {
                class: ["fas fa-users-cog mr-2", {
                  "text-black": isActive("groups.index")
                }]
              }, null, 2),
              createVNode("span", null, "Group Schedule")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></li><li data-v-c9efb78e>`);
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
            _push2(`<div class="flex items-center w-full" data-v-c9efb78e${_scopeId}><div class="${ssrRenderClass([{
              "text-black": isActive("profile.edit")
            }, "flex items-center justify-center w-8 h-8 transition-all duration-300"])}" data-v-c9efb78e${_scopeId}><i class="fas fa-user" data-v-c9efb78e${_scopeId}></i></div>`);
            if (sidebarOpen.value) {
              _push2(`<span class="${ssrRenderClass([{
                "font-semibold": isActive("profile.edit")
              }, "ml-3 font-medium transition-all duration-300"])}" data-v-c9efb78e${_scopeId}>Profile</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (hoveredItem.value === "profile" && !isActive("profile.edit")) {
              _push2(`<div class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300" data-v-c9efb78e${_scopeId}></div>`);
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
      _push(`</li><li data-v-c9efb78e>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("profile.edit"),
        class: ["flex items-center px-3 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden", {
          "bg-[#ffc001] text-black": false,
          "text-gray-300 hover:bg-[#034b1c] hover:text-white": true
        }],
        onMouseenter: ($event) => setHoveredItem("reports"),
        onMouseleave: ($event) => clearHoveredItem()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center w-full" data-v-c9efb78e${_scopeId}><div class="flex items-center justify-center w-8 h-8 transition-all duration-300" data-v-c9efb78e${_scopeId}><i class="fas fa-file-pdf" data-v-c9efb78e${_scopeId}></i></div>`);
            if (sidebarOpen.value) {
              _push2(`<span class="ml-3 font-medium transition-all duration-300" data-v-c9efb78e${_scopeId}>Reports</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (hoveredItem.value === "reports") {
              _push2(`<div class="absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300" data-v-c9efb78e${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "flex items-center w-full" }, [
                createVNode("div", { class: "flex items-center justify-center w-8 h-8 transition-all duration-300" }, [
                  createVNode("i", { class: "fas fa-file-pdf" })
                ]),
                sidebarOpen.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "ml-3 font-medium transition-all duration-300"
                }, "Reports")) : createCommentVNode("", true)
              ]),
              hoveredItem.value === "reports" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "absolute left-0 top-0 h-full w-1 bg-[#ffc001] transform transition-all duration-300"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></nav><div class="border-t border-[#023d17] p-4 mt-auto" data-v-c9efb78e><div class="flex items-center justify-between" data-v-c9efb78e><div class="flex items-center" data-v-c9efb78e><div class="flex-shrink-0" data-v-c9efb78e>`);
      if (sidebarOpen.value) {
        _push(`<span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200" data-v-c9efb78e><span class="text-sm font-medium leading-none text-gray-600" data-v-c9efb78e>${ssrInterpolate(_ctx.$page.props.auth.user.name.charAt(0))}</span></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (sidebarOpen.value) {
        _push(`<div class="ml-3" data-v-c9efb78e><p class="text-md font-medium text-white" data-v-c9efb78e>${ssrInterpolate(_ctx.$page.props.auth.user.name)}</p><p class="text-sm text-white max-w-[150px] truncate" title="{{ $page.props.auth.user.email }}" data-v-c9efb78e>${ssrInterpolate(_ctx.$page.props.auth.user.email)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="rounded-lg p-1.5 text-white hover:bg-[#ffc001] hover:text-black transition-colors duration-200" data-v-c9efb78e><i class="fas fa-sign-out-alt h-5 w-5" data-v-c9efb78e></i></button></div></div></aside><div class="${ssrRenderClass([{
        "lg:ml-64": sidebarOpen.value,
        "lg:ml-20": !sidebarOpen.value
      }, "transition-all duration-300 ease-in-out"])}" data-v-c9efb78e>`);
      if (_ctx.$slots.header) {
        _push(`<header class="bg-white shadow-sm" data-v-c9efb78e><div class="mx-auto py-2.5 sm:px-10 md:px-12 lg:px-8 flex items-center gap-5" data-v-c9efb78e><button class="hidden lg:flex rounded-full w-8 h-8 items-center justify-center text-gray-600 hover:bg-[#034b1c] hover:text-white transition-colors duration-200 ml-4 flex-shrink-0" data-v-c9efb78e><i class="${ssrRenderClass([
          sidebarOpen.value ? "fa-chevron-left" : "fa-chevron-right",
          "fas text-xs"
        ])}" data-v-c9efb78e></i></button><div class="flex-grow" data-v-c9efb78e>`);
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
      _push(`<main class="py-3" data-v-c9efb78e><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-c9efb78e>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div>`);
      if (showLogoutModal.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity" data-v-c9efb78e><div class="relative w-full max-w-sm rounded-lg bg-white p-6 text-center" data-v-c9efb78e><h3 class="mb-1 text-lg font-semibold text-black" data-v-c9efb78e> Are you sure you want to log out? </h3><p class="mb-4 text-gray-800" data-v-c9efb78e> Log out of <span class="text-black" data-v-c9efb78e>${ssrInterpolate(_ctx.$page.props.auth.user.email)}?</span></p><div class="flex flex-col space-y-2" data-v-c9efb78e><button class="w-full rounded-lg logout px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-300" data-v-c9efb78e> Log out </button><button class="w-full rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" data-v-c9efb78e> Cancel </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/HR/HRLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HRLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c9efb78e"]]);
export {
  HRLayout as H
};
