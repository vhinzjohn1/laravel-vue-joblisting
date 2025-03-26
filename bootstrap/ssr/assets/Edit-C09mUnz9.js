import { ref, unref, createVNode, resolveDynamicComponent, withCtx, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderVNode, ssrRenderClass } from "vue/server-renderer";
import { H as HRLayout } from "./HRLayout-Deg3lApQ.js";
import { A as ApplicantLayout } from "./ApplicantLayout-C8saV4-b.js";
import { A as AdminLayout } from "./AdminLayout-BD39AHzM.js";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BclFfqKw.js";
import _sfc_main$6 from "./DeleteUserForm-CNPlTlsm.js";
import _sfc_main$5 from "./UpdatePasswordForm-DWKZPO2C.js";
import _sfc_main$1 from "./UpdateProfileInformationForm-GXg6HoJL.js";
import _sfc_main$2 from "./EducationalBackgroundForm-DenlbHBF.js";
import _sfc_main$3 from "./TrainingCertificationsForm-DlCyNYLq.js";
import _sfc_main$4 from "./WorkExperienceForm-BIbT-4Sj.js";
import { usePage, Head } from "@inertiajs/vue3";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./NotificationBell-DssmmqXB.js";
import "./InputLabel-9qluswvY.js";
import "./Modal-Dr2ADp7V.js";
import "./TextInput-DJ5KC4cX.js";
import "./PrimaryButton-CZbnR4E4.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: {
      type: Boolean
    },
    status: {
      type: String
    },
    userDetails: {
      type: Object
    }
  },
  setup(__props) {
    const user = usePage().props.auth.user;
    const activeTab = ref("profile");
    const getLayout = () => {
      switch (user.role_name) {
        case "hr":
          return HRLayout;
        case "applicant":
          return ApplicantLayout;
        case "admin":
          return AdminLayout;
        default:
          return AuthenticatedLayout;
      }
    };
    const LayoutComponent = getLayout();
    const showSuccessAlert = (action) => {
      let title, text;
      switch (action) {
        case "update":
          title = "Profile Updated Successfully!";
          text = "Your profile information has been updated.";
          break;
        default:
          title = "Action Completed!";
          text = "The operation was successful.";
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title,
        text,
        showConfirmButton: false,
        timer: 3e3,
        iconColor: "#ffffff",
        toast: true,
        customClass: {
          popup: "bg-green-500 text-white"
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Profile" }, null, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(LayoutComponent)), null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Profile </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Profile ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="flex flex-col md:flex-row gap-6"${_scopeId}><div class="w-full md:w-64 bg-white shadow rounded-lg h-fit"${_scopeId}><nav class="p-4"${_scopeId}><ul class="flex flex-wrap md:flex-col gap-2 md:space-y-2"${_scopeId}><li class="w-full sm:flex-1 md:w-full"${_scopeId}><button class="${ssrRenderClass([
              "w-full text-left px-4 py-2 rounded-lg transition-colors",
              activeTab.value === "profile" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
            ])}"${_scopeId}> Profile Information </button></li><li class="w-full sm:flex-1 md:w-full"${_scopeId}><button class="${ssrRenderClass([
              "w-full text-left px-4 py-2 rounded-lg transition-colors",
              activeTab.value === "education" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
            ])}"${_scopeId}> Educational Background </button></li><li class="w-full sm:flex-1 md:w-full"${_scopeId}><button class="${ssrRenderClass([
              "w-full text-left px-4 py-2 rounded-lg transition-colors",
              activeTab.value === "training" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
            ])}"${_scopeId}> Training &amp; Certifications </button></li><li class="w-full sm:flex-1 md:w-full"${_scopeId}><button class="${ssrRenderClass([
              "w-full text-left px-4 py-2 rounded-lg transition-colors",
              activeTab.value === "experience" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
            ])}"${_scopeId}> Work Experience </button></li><li class="w-full sm:flex-1 md:w-full"${_scopeId}><button class="${ssrRenderClass([
              "w-full text-left px-4 py-2 rounded-lg transition-colors",
              activeTab.value === "password" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
            ])}"${_scopeId}> Password </button></li><li class="w-full sm:flex-1 md:w-full"${_scopeId}><button class="${ssrRenderClass([
              "w-full text-left px-4 py-2 rounded-lg transition-colors text-red-600",
              activeTab.value === "delete" ? "bg-red-50" : "hover:bg-red-50"
            ])}"${_scopeId}> Delete Account </button></li></ul></nav></div><div class="flex-1 space-y-6"${_scopeId}>`);
            if (activeTab.value === "profile") {
              _push2(`<div class="bg-white shadow sm:rounded-lg"${_scopeId}><div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"${_scopeId}><div class="max-w-xl"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                "must-verify-email": __props.mustVerifyEmail,
                status: __props.status,
                "user-details": __props.userDetails,
                onUpdateSuccess: ($event) => showSuccessAlert("update")
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "education") {
              _push2(`<div class="bg-white shadow sm:rounded-lg"${_scopeId}><div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"${_scopeId}><div class="max-w-xl"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "training") {
              _push2(`<div class="bg-white shadow sm:rounded-lg"${_scopeId}><div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"${_scopeId}><div class="max-w-xl"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "experience") {
              _push2(`<div class="bg-white shadow sm:rounded-lg"${_scopeId}><div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"${_scopeId}><div class="max-w-xl"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, null, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "password") {
              _push2(`<div class="bg-white shadow sm:rounded-lg"${_scopeId}><div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"${_scopeId}><div class="max-w-xl"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, null, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "delete") {
              _push2(`<div class="bg-white shadow sm:rounded-lg"${_scopeId}><div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"${_scopeId}><div class="max-w-xl"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, null, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex flex-col md:flex-row gap-6" }, [
                    createVNode("div", { class: "w-full md:w-64 bg-white shadow rounded-lg h-fit" }, [
                      createVNode("nav", { class: "p-4" }, [
                        createVNode("ul", { class: "flex flex-wrap md:flex-col gap-2 md:space-y-2" }, [
                          createVNode("li", { class: "w-full sm:flex-1 md:w-full" }, [
                            createVNode("button", {
                              onClick: ($event) => activeTab.value = "profile",
                              class: [
                                "w-full text-left px-4 py-2 rounded-lg transition-colors",
                                activeTab.value === "profile" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
                              ]
                            }, " Profile Information ", 10, ["onClick"])
                          ]),
                          createVNode("li", { class: "w-full sm:flex-1 md:w-full" }, [
                            createVNode("button", {
                              onClick: ($event) => activeTab.value = "education",
                              class: [
                                "w-full text-left px-4 py-2 rounded-lg transition-colors",
                                activeTab.value === "education" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
                              ]
                            }, " Educational Background ", 10, ["onClick"])
                          ]),
                          createVNode("li", { class: "w-full sm:flex-1 md:w-full" }, [
                            createVNode("button", {
                              onClick: ($event) => activeTab.value = "training",
                              class: [
                                "w-full text-left px-4 py-2 rounded-lg transition-colors",
                                activeTab.value === "training" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
                              ]
                            }, " Training & Certifications ", 10, ["onClick"])
                          ]),
                          createVNode("li", { class: "w-full sm:flex-1 md:w-full" }, [
                            createVNode("button", {
                              onClick: ($event) => activeTab.value = "experience",
                              class: [
                                "w-full text-left px-4 py-2 rounded-lg transition-colors",
                                activeTab.value === "experience" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
                              ]
                            }, " Work Experience ", 10, ["onClick"])
                          ]),
                          createVNode("li", { class: "w-full sm:flex-1 md:w-full" }, [
                            createVNode("button", {
                              onClick: ($event) => activeTab.value = "password",
                              class: [
                                "w-full text-left px-4 py-2 rounded-lg transition-colors",
                                activeTab.value === "password" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
                              ]
                            }, " Password ", 10, ["onClick"])
                          ]),
                          createVNode("li", { class: "w-full sm:flex-1 md:w-full" }, [
                            createVNode("button", {
                              onClick: ($event) => activeTab.value = "delete",
                              class: [
                                "w-full text-left px-4 py-2 rounded-lg transition-colors text-red-600",
                                activeTab.value === "delete" ? "bg-red-50" : "hover:bg-red-50"
                              ]
                            }, " Delete Account ", 10, ["onClick"])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex-1 space-y-6" }, [
                      activeTab.value === "profile" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "bg-white shadow sm:rounded-lg"
                      }, [
                        createVNode("div", { class: "p-4 sm:p-8 bg-white shadow sm:rounded-lg" }, [
                          createVNode("div", { class: "max-w-xl" }, [
                            createVNode(_sfc_main$1, {
                              "must-verify-email": __props.mustVerifyEmail,
                              status: __props.status,
                              "user-details": __props.userDetails,
                              onUpdateSuccess: ($event) => showSuccessAlert("update")
                            }, null, 8, ["must-verify-email", "status", "user-details", "onUpdateSuccess"])
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      activeTab.value === "education" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "bg-white shadow sm:rounded-lg"
                      }, [
                        createVNode("div", { class: "p-4 sm:p-8 bg-white shadow sm:rounded-lg" }, [
                          createVNode("div", { class: "max-w-xl" }, [
                            createVNode(_sfc_main$2)
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      activeTab.value === "training" ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "bg-white shadow sm:rounded-lg"
                      }, [
                        createVNode("div", { class: "p-4 sm:p-8 bg-white shadow sm:rounded-lg" }, [
                          createVNode("div", { class: "max-w-xl" }, [
                            createVNode(_sfc_main$3)
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      activeTab.value === "experience" ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "bg-white shadow sm:rounded-lg"
                      }, [
                        createVNode("div", { class: "p-4 sm:p-8 bg-white shadow sm:rounded-lg" }, [
                          createVNode("div", { class: "max-w-xl" }, [
                            createVNode(_sfc_main$4)
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      activeTab.value === "password" ? (openBlock(), createBlock("div", {
                        key: 4,
                        class: "bg-white shadow sm:rounded-lg"
                      }, [
                        createVNode("div", { class: "p-4 sm:p-8 bg-white shadow sm:rounded-lg" }, [
                          createVNode("div", { class: "max-w-xl" }, [
                            createVNode(_sfc_main$5)
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      activeTab.value === "delete" ? (openBlock(), createBlock("div", {
                        key: 5,
                        class: "bg-white shadow sm:rounded-lg"
                      }, [
                        createVNode("div", { class: "p-4 sm:p-8 bg-white shadow sm:rounded-lg" }, [
                          createVNode("div", { class: "max-w-xl" }, [
                            createVNode(_sfc_main$6)
                          ])
                        ])
                      ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
