import { ref, unref, withCtx, createVNode, createBlock, createCommentVNode, createTextVNode, toDisplayString, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { A as ApplicantLayout } from "./ApplicantLayout-C8saV4-b.js";
import { _ as _sfc_main$2 } from "./Header-VZTQj6rE.js";
import { _ as _sfc_main$1 } from "./Breadcrumbs-BdN6WHN9.js";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./NotificationBell-DssmmqXB.js";
const _sfc_main = {
  __name: "MyApplicationDetails",
  __ssrInlineRender: true,
  props: {
    application: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    console.log("this is the props:", props);
    const showDocumentModal = ref(false);
    const currentDocument = ref(null);
    const documentContainer = ref(null);
    const documentUrl = ref(null);
    const openDocumentModal = (doc) => {
      currentDocument.value = doc;
      documentUrl.value = `/storage/${doc.file_path}`;
      showDocumentModal.value = true;
    };
    const closeDocumentModal = () => {
      showDocumentModal.value = false;
      setTimeout(() => {
        currentDocument.value = null;
        documentUrl.value = null;
      }, 300);
    };
    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      };
      return new Date(dateString).toLocaleDateString(void 0, options);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Application - ${__props.application.job_listing.title}`
      }, null, _parent));
      _push(ssrRenderComponent(ApplicantLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { title: `Application Details` }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { title: `Application Details` })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="py-5"${_scopeId}><div class="container-fluid px-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              items: [
                { name: "Home", href: _ctx.route("my-applications.index") },
                {
                  name: "My Applications",
                  href: _ctx.route("my-applications.index")
                },
                {
                  name: "Application Details",
                  href: _ctx.route(
                    "my-applications.show",
                    __props.application.application_id
                  ),
                  active: true
                }
              ]
            }, null, _parent2, _scopeId));
            _push2(`<div class="card shadow-sm rounded-lg overflow-hidden bg-white"${_scopeId}><div class="p-4 border-b"${_scopeId}><button class="flex items-center text-gray-600 hover:text-gray-900"${_scopeId}><i class="fas fa-arrow-left mr-2"${_scopeId}></i> Back to Applications </button></div><div class="p-6"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(__props.application.job_listing.title)}</h1><span class="${ssrRenderClass([{
              "bg-yellow-100 text-yellow-800": __props.application.status === "Pending",
              "bg-green-100 text-green-800": __props.application.status === "Approved",
              "bg-red-100 text-red-800": __props.application.status === "Rejected",
              "bg-blue-100 text-blue-800": __props.application.status === "Shortlisted",
              "bg-purple-100 text-purple-800": __props.application.status === "Interview",
              "bg-gray-100 text-gray-800": ![
                "Pending",
                "Approved",
                "Rejected",
                "Shortlisted",
                "Interview"
              ].includes(__props.application.status)
            }, "px-3 py-1 text-sm font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(__props.application.status)}</span></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div class="md:col-span-2 space-y-6"${_scopeId}><div class="bg-gray-50 p-4 rounded-lg"${_scopeId}><h2 class="text-lg font-semibold mb-3"${_scopeId}> Job Information </h2><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-500"${_scopeId}>Position</label><p class="mt-1"${_scopeId}>${ssrInterpolate(__props.application.job_listing.position.position_name)}</p></div><div${_scopeId}><label class="block text-sm font-medium text-gray-500"${_scopeId}>Category</label><p class="mt-1"${_scopeId}>${ssrInterpolate(((_a = __props.application.job_listing.category) == null ? void 0 : _a.name) || "N/A")}</p></div><div${_scopeId}><label class="block text-sm font-medium text-gray-500"${_scopeId}>Description</label><p class="mt-1"${_scopeId}>${ssrInterpolate(__props.application.job_listing.description)}</p></div><div${_scopeId}><label class="block text-sm font-medium text-gray-500"${_scopeId}>Closing Date</label><p class="mt-1"${_scopeId}>${ssrInterpolate(formatDate(
              __props.application.job_listing.closing_date
            ))}</p></div></div></div><div class="bg-gray-50 p-4 rounded-lg"${_scopeId}><h2 class="text-lg font-semibold mb-3"${_scopeId}> Application Documents </h2>`);
            if (__props.application.documents && __props.application.documents.length > 0) {
              _push2(`<div${_scopeId}><!--[-->`);
              ssrRenderList(__props.application.documents, (doc) => {
                _push2(`<div class="mb-2 flex items-center justify-between"${_scopeId}><div class="flex items-center"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(doc.document_type.charAt(0).toUpperCase() + doc.document_type.slice(1))}</span></div><button class="text-blue-600 hover:text-blue-800"${_scopeId}> View </button></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-gray-500"${_scopeId}> No documents attached </div>`);
            }
            _push2(`</div>`);
            if (__props.application.status_history && __props.application.status_history.length > 0) {
              _push2(`<div class="bg-gray-50 p-4 rounded-lg"${_scopeId}><h2 class="text-lg font-semibold mb-3"${_scopeId}> Status History </h2><div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.application.status_history, (history, index) => {
                _push2(`<div class="border-l-2 border-gray-300 pl-4 pb-4 relative"${_scopeId}><div class="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px]"${_scopeId}></div><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(
                  history.created_at
                ))}</p><p class="font-medium"${_scopeId}> Status changed from <span class="font-semibold"${_scopeId}>${ssrInterpolate(history.previous_status || "New")}</span> to <span class="font-semibold"${_scopeId}>${ssrInterpolate(history.new_status)}</span></p>`);
                if (history.remarks) {
                  _push2(`<p class="text-gray-600 mt-1"${_scopeId}>${ssrInterpolate(history.remarks)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-6"${_scopeId}><div class="bg-gray-50 p-4 rounded-lg"${_scopeId}><h2 class="text-lg font-semibold mb-3"${_scopeId}> Application Summary </h2><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-500"${_scopeId}>Application ID</label><p class="mt-1"${_scopeId}>${ssrInterpolate(__props.application.application_id)}</p></div><div${_scopeId}><label class="block text-sm font-medium text-gray-500"${_scopeId}>Applied On</label><p class="mt-1"${_scopeId}>${ssrInterpolate(formatDate(
              __props.application.created_at
            ))}</p></div><div${_scopeId}><label class="block text-sm font-medium text-gray-500"${_scopeId}>Current Status</label><p class="mt-1"${_scopeId}>${ssrInterpolate(__props.application.status)}</p></div></div></div></div></div></div></div></div></div>`);
            if (showDocumentModal.value) {
              _push2(`<div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true"${_scopeId}><div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"${_scopeId}><div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"${_scopeId}></div><div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"${_scopeId}><div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"${_scopeId}><div class="sm:flex sm:items-start"${_scopeId}><div class="mt-3 text-center sm:mt-0 sm:text-left w-full"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title"${_scopeId}>${ssrInterpolate(currentDocument.value ? currentDocument.value.document_type.charAt(0).toUpperCase() + currentDocument.value.document_type.slice(
                1
              ) : "Document")}</h3><div class="mt-2 h-[70vh]"${_scopeId}>`);
              if (documentUrl.value) {
                _push2(`<iframe${ssrRenderAttr("src", documentUrl.value)} class="w-full h-full border-0" title="Document Viewer"${_scopeId}></iframe>`);
              } else {
                _push2(`<div class="flex items-center justify-center h-full"${_scopeId}><p class="text-gray-500"${_scopeId}> Loading document... </p></div>`);
              }
              _push2(`</div></div></div></div><div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"${_scopeId}><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"${_scopeId}> Close </button>`);
              if (currentDocument.value && documentUrl.value) {
                _push2(`<a${ssrRenderAttr("href", documentUrl.value)} target="_blank" class="inline-flex items-center justify-center rounded-md border border-transparent shadow-sm p-1 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"${_scopeId}> Open in new tab- </a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "py-5" }, [
                createVNode("div", { class: "container-fluid px-4" }, [
                  createVNode(_sfc_main$1, {
                    items: [
                      { name: "Home", href: _ctx.route("my-applications.index") },
                      {
                        name: "My Applications",
                        href: _ctx.route("my-applications.index")
                      },
                      {
                        name: "Application Details",
                        href: _ctx.route(
                          "my-applications.show",
                          __props.application.application_id
                        ),
                        active: true
                      }
                    ]
                  }, null, 8, ["items"]),
                  createVNode("div", { class: "card shadow-sm rounded-lg overflow-hidden bg-white" }, [
                    createVNode("div", { class: "p-4 border-b" }, [
                      createVNode("button", {
                        onClick: ($event) => _ctx.$inertia.get(_ctx.route("my-applications.index")),
                        class: "flex items-center text-gray-600 hover:text-gray-900"
                      }, [
                        createVNode("i", { class: "fas fa-arrow-left mr-2" }),
                        createTextVNode(" Back to Applications ")
                      ], 8, ["onClick"])
                    ]),
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                        createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(__props.application.job_listing.title), 1),
                        createVNode("span", {
                          class: ["px-3 py-1 text-sm font-semibold rounded-full", {
                            "bg-yellow-100 text-yellow-800": __props.application.status === "Pending",
                            "bg-green-100 text-green-800": __props.application.status === "Approved",
                            "bg-red-100 text-red-800": __props.application.status === "Rejected",
                            "bg-blue-100 text-blue-800": __props.application.status === "Shortlisted",
                            "bg-purple-100 text-purple-800": __props.application.status === "Interview",
                            "bg-gray-100 text-gray-800": ![
                              "Pending",
                              "Approved",
                              "Rejected",
                              "Shortlisted",
                              "Interview"
                            ].includes(__props.application.status)
                          }]
                        }, toDisplayString(__props.application.status), 3)
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                        createVNode("div", { class: "md:col-span-2 space-y-6" }, [
                          createVNode("div", { class: "bg-gray-50 p-4 rounded-lg" }, [
                            createVNode("h2", { class: "text-lg font-semibold mb-3" }, " Job Information "),
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-500" }, "Position"),
                                createVNode("p", { class: "mt-1" }, toDisplayString(__props.application.job_listing.position.position_name), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-500" }, "Category"),
                                createVNode("p", { class: "mt-1" }, toDisplayString(((_b = __props.application.job_listing.category) == null ? void 0 : _b.name) || "N/A"), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-500" }, "Description"),
                                createVNode("p", { class: "mt-1" }, toDisplayString(__props.application.job_listing.description), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-500" }, "Closing Date"),
                                createVNode("p", { class: "mt-1" }, toDisplayString(formatDate(
                                  __props.application.job_listing.closing_date
                                )), 1)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "bg-gray-50 p-4 rounded-lg" }, [
                            createVNode("h2", { class: "text-lg font-semibold mb-3" }, " Application Documents "),
                            __props.application.documents && __props.application.documents.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.application.documents, (doc) => {
                                return openBlock(), createBlock("div", {
                                  key: doc.document_id,
                                  class: "mb-2 flex items-center justify-between"
                                }, [
                                  createVNode("div", { class: "flex items-center" }, [
                                    (openBlock(), createBlock("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      class: "h-5 w-5 text-gray-500 mr-2",
                                      fill: "none",
                                      viewBox: "0 0 24 24",
                                      stroke: "currentColor"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                      })
                                    ])),
                                    createVNode("span", null, toDisplayString(doc.document_type.charAt(0).toUpperCase() + doc.document_type.slice(1)), 1)
                                  ]),
                                  createVNode("button", {
                                    onClick: ($event) => openDocumentModal(doc),
                                    class: "text-blue-600 hover:text-blue-800"
                                  }, " View ", 8, ["onClick"])
                                ]);
                              }), 128))
                            ])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "text-gray-500"
                            }, " No documents attached "))
                          ]),
                          __props.application.status_history && __props.application.status_history.length > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "bg-gray-50 p-4 rounded-lg"
                          }, [
                            createVNode("h2", { class: "text-lg font-semibold mb-3" }, " Status History "),
                            createVNode("div", { class: "space-y-4" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.application.status_history, (history, index) => {
                                return openBlock(), createBlock("div", {
                                  key: index,
                                  class: "border-l-2 border-gray-300 pl-4 pb-4 relative"
                                }, [
                                  createVNode("div", { class: "absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px]" }),
                                  createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(formatDate(
                                    history.created_at
                                  )), 1),
                                  createVNode("p", { class: "font-medium" }, [
                                    createTextVNode(" Status changed from "),
                                    createVNode("span", { class: "font-semibold" }, toDisplayString(history.previous_status || "New"), 1),
                                    createTextVNode(" to "),
                                    createVNode("span", { class: "font-semibold" }, toDisplayString(history.new_status), 1)
                                  ]),
                                  history.remarks ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-gray-600 mt-1"
                                  }, toDisplayString(history.remarks), 1)) : createCommentVNode("", true)
                                ]);
                              }), 128))
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-6" }, [
                          createVNode("div", { class: "bg-gray-50 p-4 rounded-lg" }, [
                            createVNode("h2", { class: "text-lg font-semibold mb-3" }, " Application Summary "),
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-500" }, "Application ID"),
                                createVNode("p", { class: "mt-1" }, toDisplayString(__props.application.application_id), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-500" }, "Applied On"),
                                createVNode("p", { class: "mt-1" }, toDisplayString(formatDate(
                                  __props.application.created_at
                                )), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-500" }, "Current Status"),
                                createVNode("p", { class: "mt-1" }, toDisplayString(__props.application.status), 1)
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              showDocumentModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 z-50 overflow-y-auto",
                "aria-labelledby": "modal-title",
                role: "dialog",
                "aria-modal": "true"
              }, [
                createVNode("div", { class: "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" }, [
                  createVNode("div", {
                    class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
                    "aria-hidden": "true",
                    onClick: closeDocumentModal
                  }),
                  createVNode("div", { class: "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full" }, [
                    createVNode("div", { class: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, [
                      createVNode("div", { class: "sm:flex sm:items-start" }, [
                        createVNode("div", { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, [
                          createVNode("h3", {
                            class: "text-lg leading-6 font-medium text-gray-900 mb-4",
                            id: "modal-title"
                          }, toDisplayString(currentDocument.value ? currentDocument.value.document_type.charAt(0).toUpperCase() + currentDocument.value.document_type.slice(
                            1
                          ) : "Document"), 1),
                          createVNode("div", {
                            class: "mt-2 h-[70vh]",
                            ref_key: "documentContainer",
                            ref: documentContainer
                          }, [
                            documentUrl.value ? (openBlock(), createBlock("iframe", {
                              key: 0,
                              src: documentUrl.value,
                              class: "w-full h-full border-0",
                              title: "Document Viewer"
                            }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex items-center justify-center h-full"
                            }, [
                              createVNode("p", { class: "text-gray-500" }, " Loading document... ")
                            ]))
                          ], 512)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, [
                      createVNode("button", {
                        type: "button",
                        class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
                        onClick: closeDocumentModal
                      }, " Close "),
                      currentDocument.value && documentUrl.value ? (openBlock(), createBlock("a", {
                        key: 0,
                        href: documentUrl.value,
                        target: "_blank",
                        class: "inline-flex items-center justify-center rounded-md border border-transparent shadow-sm p-1 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      }, " Open in new tab- ", 8, ["href"])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Applicant/MyApplications/MyApplicationDetails.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
