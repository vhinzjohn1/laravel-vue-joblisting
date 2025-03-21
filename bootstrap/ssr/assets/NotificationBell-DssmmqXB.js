import { ref, watch, onMounted, onUnmounted, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "NotificationBell",
  __ssrInlineRender: true,
  props: {
    notifications: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const showDropdown = ref(false);
    const unreadCount = ref(0);
    const localNotifications = ref([...props.notifications]);
    watch(
      () => props.notifications,
      (newVal) => {
        localNotifications.value = [...newVal];
        updateUnreadCount();
      },
      { deep: true }
    );
    const formatDate = (date) => {
      return new Date(date).toLocaleString();
    };
    const updateUnreadCount = () => {
      unreadCount.value = localNotifications.value.filter(
        (n) => !n.is_read
      ).length;
    };
    onMounted(() => {
      updateUnreadCount();
      document.addEventListener("click", handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });
    const handleClickOutside = (event) => {
      if (showDropdown.value && !event.target.closest(".relative")) {
        showDropdown.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><button class="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"><i class="fas fa-bell text-2xl sm:text-xl xs:text-sm"></i>`);
      if (unreadCount.value > 0) {
        _push(`<span class="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">${ssrInterpolate(unreadCount.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
      if (showDropdown.value) {
        _push(`<div class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50"><div class="p-4 border-b"><div class="flex justify-between items-center"><h3 class="text-lg font-semibold">Notifications</h3>`);
        if (unreadCount.value > 0) {
          _push(`<button class="text-sm text-[#012f12] hover:text-[#034b1c]"> Mark all as read </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="max-h-96 overflow-y-auto">`);
        if (__props.notifications.length === 0) {
          _push(`<div class="p-4 text-center text-gray-500"> No notifications </div>`);
        } else {
          _push(`<div class="divide-y"><!--[-->`);
          ssrRenderList(__props.notifications, (notification) => {
            _push(`<div class="${ssrRenderClass([{ "bg-gray-50": notification.is_read }, "p-4 hover:bg-gray-50"])}"><div class="flex justify-between items-start"><div class="flex-1"><p class="text-sm text-gray-600">${ssrInterpolate(notification.message)}</p><p class="text-xs text-gray-500 mt-1">${ssrInterpolate(formatDate(notification.created_at))}</p></div><div class="flex items-center space-x-2">`);
            if (!notification.is_read) {
              _push(`<button class="text-sm text-[#012f12] hover:text-[#034b1c]"> Mark as read </button>`);
            } else {
              _push(`<!---->`);
            }
            if (!notification.is_read) {
              _push(`<span class="h-2 w-2 bg-[#ffc001] rounded-full"></span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div><div class="p-4 border-t text-center">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("notifications.index"),
          class: "text-sm text-[#012f12] hover:text-[#034b1c]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` View all notifications `);
            } else {
              return [
                createTextVNode(" View all notifications ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NotificationBell.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
