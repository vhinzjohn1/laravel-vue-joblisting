import { unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$3 } from "./InputLabel-9qluswvY.js";
import { P as PrimaryButton } from "./PrimaryButton-CZbnR4E4.js";
import { _ as _sfc_main$2 } from "./TextInput-DJ5KC4cX.js";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "UpdateProfileInformationForm",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: Boolean,
    status: String,
    userDetails: Object
  },
  setup(__props) {
    var _a, _b, _c, _d, _e;
    const props = __props;
    const user = usePage().props.auth.user;
    const form = useForm({
      username: user.username,
      email: user.email,
      firstname: ((_a = props.userDetails) == null ? void 0 : _a.firstname) || "",
      lastname: ((_b = props.userDetails) == null ? void 0 : _b.lastname) || "",
      middle_initial: ((_c = props.userDetails) == null ? void 0 : _c.middle_initial) || "",
      phone_number: ((_d = props.userDetails) == null ? void 0 : _d.phone_number) || "",
      eligibility: ((_e = props.userDetails) == null ? void 0 : _e.eligibility) || ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><header><h2 class="text-lg font-medium text-gray-900"> Profile Information </h2><p class="mt-1 text-sm text-gray-600"> Update your account&#39;s profile information and email address. </p></header><form class="mt-6 space-y-6"><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "username",
        value: "Username"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "username",
        type: "text",
        class: "mt-1 block w-full",
        modelValue: unref(form).username,
        "onUpdate:modelValue": ($event) => unref(form).username = $event,
        required: "",
        autofocus: "",
        autocomplete: "username"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.username
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "email",
        value: "Email"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "email",
        type: "email",
        class: "mt-1 block w-full",
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        required: "",
        autocomplete: "email"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "firstname",
        value: "First Name"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "firstname",
        type: "text",
        class: "mt-1 block w-full",
        modelValue: unref(form).firstname,
        "onUpdate:modelValue": ($event) => unref(form).firstname = $event,
        required: ""
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.firstname
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "lastname",
        value: "Last Name"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "lastname",
        type: "text",
        class: "mt-1 block w-full",
        modelValue: unref(form).lastname,
        "onUpdate:modelValue": ($event) => unref(form).lastname = $event,
        required: ""
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.lastname
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "middle_initial",
        value: "Middle Initial"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "middle_initial",
        type: "text",
        class: "mt-1 block w-full",
        modelValue: unref(form).middle_initial,
        "onUpdate:modelValue": ($event) => unref(form).middle_initial = $event,
        maxlength: "1",
        onInput: ($event) => unref(form).middle_initial = $event.target.value.toUpperCase()
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.middle_initial
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "phone_number",
        value: "Phone Number"
      }, null, _parent));
      _push(`<div class="relative mt-1 flex"><div class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> +63 </div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "phone_number",
        type: "number",
        class: "block w-full rounded-none rounded-r-md",
        modelValue: unref(form).phone_number,
        "onUpdate:modelValue": ($event) => unref(form).phone_number = $event,
        maxlength: "11",
        placeholder: "9123 4567"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.phone_number
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "eligibility",
        value: "Eligibility"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "eligibility",
        type: "text",
        class: "mt-1 block w-full",
        modelValue: unref(form).eligibility,
        "onUpdate:modelValue": ($event) => unref(form).eligibility = $event
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.eligibility
      }, null, _parent));
      _push(`</div></div>`);
      if (__props.mustVerifyEmail && unref(user).email_verified_at === null) {
        _push(`<div><p class="text-sm mt-2 text-gray-800"> Your email address is unverified. `);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("verification.send"),
          method: "post",
          as: "button",
          class: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Click here to re-send the verification email. `);
            } else {
              return [
                createTextVNode(" Click here to re-send the verification email. ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p><div style="${ssrRenderStyle(__props.status === "verification-link-sent" ? null : { display: "none" })}" class="mt-2 font-medium text-sm text-green-600"> A new verification link has been sent to your email address. </div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(PrimaryButton, {
        disabled: unref(form).processing
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Save`);
          } else {
            return [
              createTextVNode("Save")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
