import { computed, ref, watch, unref, createVNode, resolveDynamicComponent, withCtx, createBlock, openBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderVNode, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { usePage, Head, router } from "@inertiajs/vue3";
import axios from "axios";
import { A as AdminLayout } from "./AdminLayout-BD39AHzM.js";
import { H as HRLayout } from "./HRLayout-Deg3lApQ.js";
import { A as ApplicantLayout } from "./ApplicantLayout-C8saV4-b.js";
import { _ as _sfc_main$1 } from "./Header-VZTQj6rE.js";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./NotificationBell-DssmmqXB.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    notifications: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const userRole = computed(() => page.props.auth.user.role_name);
    const layouts = {
      admin: AdminLayout,
      hr: HRLayout,
      applicant: ApplicantLayout
    };
    const localNotifications = ref([...props.notifications]);
    watch(
      () => props.notifications,
      (newVal) => {
        localNotifications.value = [...newVal];
      },
      { deep: true }
    );
    const markAsRead = (notification) => {
      const index = localNotifications.value.findIndex(
        (n) => n.notification_id === notification.notification_id
      );
      if (index !== -1) {
        localNotifications.value[index].is_read = true;
      }
      axios.post(route("notifications.mark-as-read", notification.notification_id)).then(() => {
        router.reload({ only: ["notifications"], preserveScroll: true });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Notification marked as read",
          showConfirmButton: false,
          timer: 3e3,
          iconColor: "#ffffff",
          toast: true,
          customClass: {
            popup: "bg-green-500 text-white"
          }
        });
      }).catch((error) => {
        console.error("Error marking notification as read:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to mark notification as read",
          showConfirmButton: false,
          timer: 3e3,
          iconColor: "#ffffff",
          toast: true,
          customClass: {
            popup: "bg-red-500 text-white"
          }
        });
      });
    };
    const markAllAsRead = () => {
      localNotifications.value.forEach((notification) => {
        notification.is_read = true;
      });
      axios.post(route("notifications.mark-all-as-read")).then(() => {
        router.reload({ only: ["notifications"], preserveScroll: true });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "All notifications marked as read",
          showConfirmButton: false,
          timer: 3e3,
          iconColor: "#ffffff",
          toast: true,
          customClass: {
            popup: "bg-green-500 text-white"
          }
        });
      }).catch((error) => {
        console.error("Error marking all notifications as read:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to mark all notifications as read",
          showConfirmButton: false,
          timer: 3e3,
          iconColor: "#ffffff",
          toast: true,
          customClass: {
            popup: "bg-red-500 text-white"
          }
        });
      });
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleString();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "View Job Listings" }, null, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(layouts[userRole.value]), null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, { title: "Notifications" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, { title: "Notifications" })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 text-gray-900"${_scopeId}><div class="flex justify-between items-center mb-4"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}> Your Notifications </h3><button class="px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200"${_scopeId}> Mark All as Read </button></div>`);
            if (localNotifications.value.length === 0) {
              _push2(`<div class="text-center py-8 text-gray-500"${_scopeId}> No notifications found </div>`);
            } else {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(localNotifications.value, (notification) => {
                _push2(`<div class="${ssrRenderClass([{ "bg-gray-50": notification.is_read }, "p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200"])}"${_scopeId}><div class="flex justify-between items-start"${_scopeId}><div class="flex-1"${_scopeId}><p class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(notification.message)}</p><p class="text-xs text-gray-500 mt-1"${_scopeId}>${ssrInterpolate(formatDate(notification.created_at))}</p></div><div class="flex items-center space-x-2"${_scopeId}>`);
                if (!notification.is_read) {
                  _push2(`<button class="text-sm text-[#012f12] hover:text-[#034b1c]"${_scopeId}> Mark as Read </button>`);
                } else {
                  _push2(`<!---->`);
                }
                if (!notification.is_read) {
                  _push2(`<span class="h-2 w-2 bg-[#ffc001] rounded-full"${_scopeId}></span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 text-gray-900" }, [
                      createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                        createVNode("h3", { class: "text-lg font-semibold" }, " Your Notifications "),
                        createVNode("button", {
                          onClick: markAllAsRead,
                          class: "px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200"
                        }, " Mark All as Read ")
                      ]),
                      localNotifications.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-8 text-gray-500"
                      }, " No notifications found ")) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-4"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(localNotifications.value, (notification) => {
                          return openBlock(), createBlock("div", {
                            key: notification.notification_id,
                            class: ["p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200", { "bg-gray-50": notification.is_read }]
                          }, [
                            createVNode("div", { class: "flex justify-between items-start" }, [
                              createVNode("div", { class: "flex-1" }, [
                                createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(notification.message), 1),
                                createVNode("p", { class: "text-xs text-gray-500 mt-1" }, toDisplayString(formatDate(notification.created_at)), 1)
                              ]),
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                !notification.is_read ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => markAsRead(notification),
                                  class: "text-sm text-[#012f12] hover:text-[#034b1c]"
                                }, " Mark as Read ", 8, ["onClick"])) : createCommentVNode("", true),
                                !notification.is_read ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "h-2 w-2 bg-[#ffc001] rounded-full"
                                })) : createCommentVNode("", true)
                              ])
                            ])
                          ], 2);
                        }), 128))
                      ]))
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }), _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Notifications/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
