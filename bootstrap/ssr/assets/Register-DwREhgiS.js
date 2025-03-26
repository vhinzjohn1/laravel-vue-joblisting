import { ref, withCtx, unref, createTextVNode, createVNode, withModifiers, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./GuestLayout-DllDUiDq.js";
import { _ as _sfc_main$2, a as _sfc_main$4 } from "./InputLabel-9qluswvY.js";
import { P as PrimaryButton } from "./PrimaryButton-CZbnR4E4.js";
import { _ as _sfc_main$3 } from "./TextInput-DJ5KC4cX.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      username: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    const toggleConfirmPasswordVisibility = () => {
      showConfirmPassword.value = !showConfirmPassword.value;
    };
    const submit = () => {
      form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Register" }, null, _parent2, _scopeId));
            _push2(`<h1 class="text-3xl font-bold text-center mb-6"${_scopeId}>Register Page</h1><form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "username",
              value: "Username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "username",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).username,
              "onUpdate:modelValue": ($event) => unref(form).username = $event,
              placeholder: "username",
              required: "",
              autofocus: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.username
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              placeholder: "example@gmail.com",
              required: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "password",
              type: showPassword.value ? "text" : "password",
              class: "mt-1 block w-full pr-10",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(`<button type="button" tabindex="-1" class="absolute inset-y-0 right-0 top-7 px-3 flex items-center"${_scopeId}>`);
            if (!showPassword.value) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-5-7-9-7zM10 15a5 5 0 110-10 5 5 0 010 10z"${_scopeId}></path><path d="M10 7a3 3 0 100 6 3 3 0 000-6z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path d="M4.03 3.97a.75.75 0 011.06 0l11 11a.75.75 0 11-1.06 1.06l-1.21-1.21a9.93 9.93 0 01-4.72 1.12c-5 0-8.27-4.11-9-7a9.95 9.95 0 012.07-3.39L4.03 3.97zM10 5c2.07 0 3.95.95 5.07 2.44l-1.41 1.41A3.5 3.5 0 0010 6.5a3.5 3.5 0 00-3.66 4.36l-1.41 1.41A5.002 5.002 0 0110 5z"${_scopeId}></path><path d="M2.7 7.3A9.954 9.954 0 001 10c.73 2.89 4 7 9 7 1.36 0 2.64-.31 3.79-.87l-1.47-1.47a5 5 0 01-6.35-6.35L2.7 7.3z"${_scopeId}></path></svg>`);
            }
            _push2(`</button>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "password_confirmation",
              value: "Confirm Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "password_confirmation",
              type: showConfirmPassword.value ? "text" : "password",
              class: "mt-1 block w-full pr-10",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(`<button type="button" tabindex="-1" class="absolute inset-y-0 right-0 top-7 px-3 flex items-center"${_scopeId}>`);
            if (!showConfirmPassword.value) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-5-7-9-7zM10 15a5 5 0 110-10 5 5 0 010 10z"${_scopeId}></path><path d="M10 7a3 3 0 100 6 3 3 0 000-6z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path d="M4.03 3.97a.75.75 0 011.06 0l11 11a.75.75 0 11-1.06 1.06l-1.21-1.21a9.93 9.93 0 01-4.72 1.12c-5 0-8.27-4.11-9-7a9.95 9.95 0 012.07-3.39L4.03 3.97zM10 5c2.07 0 3.95.95 5.07 2.44l-1.41 1.41A3.5 3.5 0 0010 6.5a3.5 3.5 0 00-3.66 4.36l-1.41 1.41A5.002 5.002 0 0110 5z"${_scopeId}></path><path d="M2.7 7.3A9.954 9.954 0 001 10c.73 2.89 4 7 9 7 1.36 0 2.64-.31 3.79-.87l-1.47-1.47a5 5 0 01-6.35-6.35L2.7 7.3z"${_scopeId}></path></svg>`);
            }
            _push2(`</button>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-end mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("login"),
              class: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Already registered? `);
                } else {
                  return [
                    createTextVNode(" Already registered? ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(PrimaryButton, {
              class: ["ms-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Register `);
                } else {
                  return [
                    createTextVNode(" Register ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Register" }),
              createVNode("h1", { class: "text-3xl font-bold text-center mb-6" }, "Register Page"),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "username",
                    value: "Username"
                  }),
                  createVNode(_sfc_main$3, {
                    id: "username",
                    type: "text",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).username,
                    "onUpdate:modelValue": ($event) => unref(form).username = $event,
                    placeholder: "username",
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(form).errors.username
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$2, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$3, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    placeholder: "example@gmail.com",
                    required: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4 relative" }, [
                  createVNode(_sfc_main$2, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$3, {
                    id: "password",
                    type: showPassword.value ? "text" : "password",
                    class: "mt-1 block w-full pr-10",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                  createVNode("button", {
                    type: "button",
                    tabindex: "-1",
                    class: "absolute inset-y-0 right-0 top-7 px-3 flex items-center",
                    onClick: togglePasswordVisibility
                  }, [
                    !showPassword.value ? (openBlock(), createBlock("svg", {
                      key: 0,
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-5 w-5 text-gray-600",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
                    }, [
                      createVNode("path", { d: "M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-5-7-9-7zM10 15a5 5 0 110-10 5 5 0 010 10z" }),
                      createVNode("path", { d: "M10 7a3 3 0 100 6 3 3 0 000-6z" })
                    ])) : (openBlock(), createBlock("svg", {
                      key: 1,
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-5 w-5 text-gray-600",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
                    }, [
                      createVNode("path", { d: "M4.03 3.97a.75.75 0 011.06 0l11 11a.75.75 0 11-1.06 1.06l-1.21-1.21a9.93 9.93 0 01-4.72 1.12c-5 0-8.27-4.11-9-7a9.95 9.95 0 012.07-3.39L4.03 3.97zM10 5c2.07 0 3.95.95 5.07 2.44l-1.41 1.41A3.5 3.5 0 0010 6.5a3.5 3.5 0 00-3.66 4.36l-1.41 1.41A5.002 5.002 0 0110 5z" }),
                      createVNode("path", { d: "M2.7 7.3A9.954 9.954 0 001 10c.73 2.89 4 7 9 7 1.36 0 2.64-.31 3.79-.87l-1.47-1.47a5 5 0 01-6.35-6.35L2.7 7.3z" })
                    ]))
                  ]),
                  createVNode(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4 relative" }, [
                  createVNode(_sfc_main$2, {
                    for: "password_confirmation",
                    value: "Confirm Password"
                  }),
                  createVNode(_sfc_main$3, {
                    id: "password_confirmation",
                    type: showConfirmPassword.value ? "text" : "password",
                    class: "mt-1 block w-full pr-10",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                  createVNode("button", {
                    type: "button",
                    tabindex: "-1",
                    class: "absolute inset-y-0 right-0 top-7 px-3 flex items-center",
                    onClick: toggleConfirmPasswordVisibility
                  }, [
                    !showConfirmPassword.value ? (openBlock(), createBlock("svg", {
                      key: 0,
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-5 w-5 text-gray-600",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
                    }, [
                      createVNode("path", { d: "M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-5-7-9-7zM10 15a5 5 0 110-10 5 5 0 010 10z" }),
                      createVNode("path", { d: "M10 7a3 3 0 100 6 3 3 0 000-6z" })
                    ])) : (openBlock(), createBlock("svg", {
                      key: 1,
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-5 w-5 text-gray-600",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
                    }, [
                      createVNode("path", { d: "M4.03 3.97a.75.75 0 011.06 0l11 11a.75.75 0 11-1.06 1.06l-1.21-1.21a9.93 9.93 0 01-4.72 1.12c-5 0-8.27-4.11-9-7a9.95 9.95 0 012.07-3.39L4.03 3.97zM10 5c2.07 0 3.95.95 5.07 2.44l-1.41 1.41A3.5 3.5 0 0010 6.5a3.5 3.5 0 00-3.66 4.36l-1.41 1.41A5.002 5.002 0 0110 5z" }),
                      createVNode("path", { d: "M2.7 7.3A9.954 9.954 0 001 10c.73 2.89 4 7 9 7 1.36 0 2.64-.31 3.79-.87l-1.47-1.47a5 5 0 01-6.35-6.35L2.7 7.3z" })
                    ]))
                  ]),
                  createVNode(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(form).errors.password_confirmation
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("login"),
                    class: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Already registered? ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(PrimaryButton, {
                    class: ["ms-4", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Register ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
