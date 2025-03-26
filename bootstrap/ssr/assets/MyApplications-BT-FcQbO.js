import { ref, computed, unref, withCtx, createTextVNode, createVNode, withDirectives, vModelText, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { A as ApplicantLayout } from "./ApplicantLayout-C8saV4-b.js";
import { _ as _sfc_main$2 } from "./Header-VZTQj6rE.js";
import { _ as _sfc_main$1 } from "./Breadcrumbs-BdN6WHN9.js";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./NotificationBell-DssmmqXB.js";
const _sfc_main = {
  __name: "MyApplications",
  __ssrInlineRender: true,
  props: {
    applications: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const applications = ref(props.applications);
    const searchQuery = ref("");
    const filteredApplications = computed(() => {
      if (!searchQuery.value) return applications.value;
      const query = searchQuery.value.toLowerCase();
      return applications.value.filter(
        (application) => application.job_listing.title.toLowerCase().includes(query) || application.job_listing.position.position_name.toLowerCase().includes(query) || application.status.toLowerCase().includes(query)
      );
    });
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString(void 0, options);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "My Applications" }, null, _parent));
      _push(ssrRenderComponent(ApplicantLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { title: "My Applications" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { title: "My Applications" })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-5"${_scopeId}><div class="container-fluid px-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              items: [
                { name: "Home", href: _ctx.route("my-applications.index") },
                {
                  name: "My Applications",
                  href: _ctx.route("my-applications.index"),
                  active: true
                }
              ]
            }, null, _parent2, _scopeId));
            _push2(`<div class="card shadow-sm rounded-lg overflow-hidden bg-white mb-6"${_scopeId}><div class="card-header bg-white py-4 px-4 border-b"${_scopeId}><div class="flex flex-col md:flex-row justify-center items-center gap-3"${_scopeId}><div class="relative w-full md:w-1/2 max-w-xl"${_scopeId}><div class="flex"${_scopeId}><input type="text" class="form-control block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Search applications..."${ssrRenderAttr("value", searchQuery.value)}${_scopeId}><button class="px-4 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"${_scopeId}><i class="fas fa-search"${_scopeId}></i></button></div></div></div></div><div class="card-body p-4"${_scopeId}>`);
            if (applications.value.length === 0) {
              _push2(`<div class="text-center py-8"${_scopeId}><div class="text-gray-400 mb-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg></div><h3 class="text-lg font-medium text-gray-900"${_scopeId}> No applications found </h3><p class="text-gray-500 mt-1"${_scopeId}> You haven&#39;t applied to any jobs yet. </p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("job-application.index"),
                class: "mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Browse Jobs `);
                  } else {
                    return [
                      createTextVNode(" Browse Jobs ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Job Title </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Position </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Applied Date </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(filteredApplications.value, (application) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(application.job_listing.title)}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(application.job_listing.position.position_name)}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(
                  application.created_at
                ))}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([{
                  "bg-yellow-100 text-yellow-800": application.status === "Pending",
                  "bg-green-100 text-green-800": application.status === "Approved",
                  "bg-red-100 text-red-800": application.status === "Rejected",
                  "bg-blue-100 text-blue-800": application.status === "Shortlisted",
                  "bg-purple-100 text-purple-800": application.status === "Interview",
                  "bg-gray-100 text-gray-800": ![
                    "Pending",
                    "Approved",
                    "Rejected",
                    "Shortlisted",
                    "Interview"
                  ].includes(
                    application.status
                  )
                }, "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(application.status)}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route(
                    "my-applications.show",
                    application.application_id
                  ),
                  class: "text-blue-600 hover:text-blue-900"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` View Details `);
                    } else {
                      return [
                        createTextVNode(" View Details ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-5" }, [
                createVNode("div", { class: "container-fluid px-4" }, [
                  createVNode(_sfc_main$1, {
                    items: [
                      { name: "Home", href: _ctx.route("my-applications.index") },
                      {
                        name: "My Applications",
                        href: _ctx.route("my-applications.index"),
                        active: true
                      }
                    ]
                  }, null, 8, ["items"]),
                  createVNode("div", { class: "card shadow-sm rounded-lg overflow-hidden bg-white mb-6" }, [
                    createVNode("div", { class: "card-header bg-white py-4 px-4 border-b" }, [
                      createVNode("div", { class: "flex flex-col md:flex-row justify-center items-center gap-3" }, [
                        createVNode("div", { class: "relative w-full md:w-1/2 max-w-xl" }, [
                          createVNode("div", { class: "flex" }, [
                            withDirectives(createVNode("input", {
                              type: "text",
                              class: "form-control block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500",
                              placeholder: "Search applications...",
                              "onUpdate:modelValue": ($event) => searchQuery.value = $event
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, searchQuery.value]
                            ]),
                            createVNode("button", { class: "px-4 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors" }, [
                              createVNode("i", { class: "fas fa-search" })
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "card-body p-4" }, [
                      applications.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-8"
                      }, [
                        createVNode("div", { class: "text-gray-400 mb-2" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-12 w-12 mx-auto",
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
                          ]))
                        ]),
                        createVNode("h3", { class: "text-lg font-medium text-gray-900" }, " No applications found "),
                        createVNode("p", { class: "text-gray-500 mt-1" }, " You haven't applied to any jobs yet. "),
                        createVNode(unref(Link), {
                          href: _ctx.route("job-application.index"),
                          class: "mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Browse Jobs ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("div", { class: "overflow-x-auto" }, [
                          createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                            createVNode("thead", { class: "bg-gray-50" }, [
                              createVNode("tr", null, [
                                createVNode("th", {
                                  scope: "col",
                                  class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                }, " Job Title "),
                                createVNode("th", {
                                  scope: "col",
                                  class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                }, " Position "),
                                createVNode("th", {
                                  scope: "col",
                                  class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                }, " Applied Date "),
                                createVNode("th", {
                                  scope: "col",
                                  class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                }, " Status "),
                                createVNode("th", {
                                  scope: "col",
                                  class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                }, " Actions ")
                              ])
                            ]),
                            createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(filteredApplications.value, (application) => {
                                return openBlock(), createBlock("tr", {
                                  key: application.application_id,
                                  class: "hover:bg-gray-50"
                                }, [
                                  createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                    createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(application.job_listing.title), 1)
                                  ]),
                                  createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                    createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(application.job_listing.position.position_name), 1)
                                  ]),
                                  createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                    createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(formatDate(
                                      application.created_at
                                    )), 1)
                                  ]),
                                  createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                    createVNode("span", {
                                      class: ["px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                        "bg-yellow-100 text-yellow-800": application.status === "Pending",
                                        "bg-green-100 text-green-800": application.status === "Approved",
                                        "bg-red-100 text-red-800": application.status === "Rejected",
                                        "bg-blue-100 text-blue-800": application.status === "Shortlisted",
                                        "bg-purple-100 text-purple-800": application.status === "Interview",
                                        "bg-gray-100 text-gray-800": ![
                                          "Pending",
                                          "Approved",
                                          "Rejected",
                                          "Shortlisted",
                                          "Interview"
                                        ].includes(
                                          application.status
                                        )
                                      }]
                                    }, toDisplayString(application.status), 3)
                                  ]),
                                  createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium" }, [
                                    createVNode(unref(Link), {
                                      href: _ctx.route(
                                        "my-applications.show",
                                        application.application_id
                                      ),
                                      class: "text-blue-600 hover:text-blue-900"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" View Details ")
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])
                                  ])
                                ]);
                              }), 128))
                            ])
                          ])
                        ])
                      ]))
                    ])
                  ])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Applicant/MyApplications/MyApplications.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
