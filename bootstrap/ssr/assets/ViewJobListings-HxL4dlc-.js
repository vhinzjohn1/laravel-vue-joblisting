import { ref, computed, unref, withCtx, createVNode, withDirectives, vModelText, createBlock, openBlock, Fragment, renderList, toDisplayString, createCommentVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { usePage, Head, router } from "@inertiajs/vue3";
import { A as ApplicantLayout } from "./ApplicantLayout-C8saV4-b.js";
import { _ as _sfc_main$2 } from "./Header-VZTQj6rE.js";
import { _ as _sfc_main$1 } from "./Breadcrumbs-BdN6WHN9.js";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./NotificationBell-DssmmqXB.js";
const _sfc_main = {
  __name: "ViewJobListings",
  __ssrInlineRender: true,
  setup(__props) {
    const jobs = ref(usePage().props.jobListings);
    console.log("This is the props ", usePage().props);
    const searchQuery = ref("");
    const filteredJobs = computed(() => {
      if (!searchQuery.value) return jobs.value;
      const query = searchQuery.value.toLowerCase();
      return jobs.value.filter(
        (job) => job.title.toLowerCase().includes(query) || job.description.toLowerCase().includes(query) || job.position.position_name.toLowerCase().includes(query)
      );
    });
    const showJobDetails = (job) => {
      router.get(route("job-application.show", job.job_listing_id));
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "View Job Listings" }, null, _parent));
      _push(ssrRenderComponent(ApplicantLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { title: "View Job Listings" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { title: "View Job Listings" })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-5"${_scopeId}><div class="container-fluid px-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              items: [
                { name: "Home", href: _ctx.route("job-application.index") },
                {
                  name: "Job Listings",
                  href: _ctx.route("job-application.index"),
                  active: true
                }
              ]
            }, null, _parent2, _scopeId));
            _push2(`<div class="card shadow-sm rounded-lg overflow-hidden bg-white mb-6"${_scopeId}><div class="card-header bg-white py-4 px-4 border-b"${_scopeId}><div class="flex flex-col md:flex-row justify-center items-center gap-3"${_scopeId}><div class="relative w-full md:w-1/2 max-w-xl"${_scopeId}><div class="flex"${_scopeId}><input type="text" class="form-control block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Search job listings..."${ssrRenderAttr("value", searchQuery.value)}${_scopeId}><button class="px-4 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"${_scopeId}><i class="fas fa-search"${_scopeId}></i></button></div></div></div></div><div class="card-body p-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"${_scopeId}><!--[-->`);
            ssrRenderList(filteredJobs.value, (job, index) => {
              _push2(`<div class="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full cursor-pointer"${_scopeId}><div class="p-6 flex flex-col h-full"${_scopeId}><div class="flex items-start gap-4 mb-5"${_scopeId}><div class="flex-shrink-0 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300" style="${ssrRenderStyle({ "width": "56px", "height": "56px" })}"${_scopeId}><span class="text-green-600 font-semibold text-lg"${_scopeId}>${ssrInterpolate(job.position.position_name.substring(
                0,
                2
              ))}</span></div><div class="flex-1"${_scopeId}><h5 class="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors"${_scopeId}>${ssrInterpolate(job.title)}</h5><div class="flex items-center gap-2 text-sm"${_scopeId}><span class="text-gray-600"${_scopeId}>${ssrInterpolate(job.position.position_name)}</span><span class="text-gray-300"${_scopeId}>•</span><span class="inline-flex items-center gap-1.5"${_scopeId}><span class="${ssrRenderClass([{
                "bg-green-500": job.status === "Active",
                "bg-yellow-500": job.status === "Draft",
                "bg-red-500": job.status === "Closed"
              }, "inline-block w-2.5 h-2.5 rounded-full"])}"${_scopeId}></span><span class="${ssrRenderClass({
                "text-green-600": job.status === "Active",
                "text-yellow-600": job.status === "Draft",
                "text-red-600": job.status === "Closed"
              })}"${_scopeId}>${ssrInterpolate(job.status)}</span></span></div></div></div><div class="flex-grow"${_scopeId}><div class="flex flex-wrap gap-2 mb-4"${_scopeId}><span class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-900 group-hover:bg-blue-100 transition-colors"${_scopeId}> ₱${ssrInterpolate(job.position.salary_grade.amount.toLocaleString())}</span><span class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 group-hover:bg-gray-100 transition-colors"${_scopeId}>${ssrInterpolate(job.position.salary_grade.years_experience)}+ years </span><span class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-50 text-purple-900 group-hover:bg-purple-100 transition-colors"${_scopeId}>${ssrInterpolate(job.category.name)}</span></div><p class="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4"${_scopeId}>${ssrInterpolate(job.description)}</p>`);
              if (job.minimum_requirements.length > 0) {
                _push2(`<div class="text-sm text-gray-600"${_scopeId}><!--[-->`);
                ssrRenderList(job.minimum_requirements, (req) => {
                  _push2(`<div class="flex items-center gap-2"${_scopeId}><i class="fas fa-check-circle text-green-500"${_scopeId}></i> ${ssrInterpolate(req.title)}</div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="mt-6 pt-4 border-t border-gray-50"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><span class="text-sm text-gray-500"${_scopeId}> Posted ${ssrInterpolate(formatDate(
                job.created_at
              ))}</span></div><button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-800 rounded-lg hover:bg-green-700 transition-all duration-200"${_scopeId}><i class="fas fa-arrow-right mr-2"${_scopeId}></i> View Details </button></div></div></div></div>`);
            });
            _push2(`<!--]--></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-5" }, [
                createVNode("div", { class: "container-fluid px-4" }, [
                  createVNode(_sfc_main$1, {
                    items: [
                      { name: "Home", href: _ctx.route("job-application.index") },
                      {
                        name: "Job Listings",
                        href: _ctx.route("job-application.index"),
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
                              placeholder: "Search job listings...",
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
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredJobs.value, (job, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full cursor-pointer",
                            onClick: ($event) => showJobDetails(job)
                          }, [
                            createVNode("div", { class: "p-6 flex flex-col h-full" }, [
                              createVNode("div", { class: "flex items-start gap-4 mb-5" }, [
                                createVNode("div", {
                                  class: "flex-shrink-0 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300",
                                  style: { "width": "56px", "height": "56px" }
                                }, [
                                  createVNode("span", { class: "text-green-600 font-semibold text-lg" }, toDisplayString(job.position.position_name.substring(
                                    0,
                                    2
                                  )), 1)
                                ]),
                                createVNode("div", { class: "flex-1" }, [
                                  createVNode("h5", { class: "font-bold text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors" }, toDisplayString(job.title), 1),
                                  createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                                    createVNode("span", { class: "text-gray-600" }, toDisplayString(job.position.position_name), 1),
                                    createVNode("span", { class: "text-gray-300" }, "•"),
                                    createVNode("span", { class: "inline-flex items-center gap-1.5" }, [
                                      createVNode("span", {
                                        class: ["inline-block w-2.5 h-2.5 rounded-full", {
                                          "bg-green-500": job.status === "Active",
                                          "bg-yellow-500": job.status === "Draft",
                                          "bg-red-500": job.status === "Closed"
                                        }]
                                      }, null, 2),
                                      createVNode("span", {
                                        class: {
                                          "text-green-600": job.status === "Active",
                                          "text-yellow-600": job.status === "Draft",
                                          "text-red-600": job.status === "Closed"
                                        }
                                      }, toDisplayString(job.status), 3)
                                    ])
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "flex-grow" }, [
                                createVNode("div", { class: "flex flex-wrap gap-2 mb-4" }, [
                                  createVNode("span", { class: "inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-900 group-hover:bg-blue-100 transition-colors" }, " ₱" + toDisplayString(job.position.salary_grade.amount.toLocaleString()), 1),
                                  createVNode("span", { class: "inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 group-hover:bg-gray-100 transition-colors" }, toDisplayString(job.position.salary_grade.years_experience) + "+ years ", 1),
                                  createVNode("span", { class: "inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-50 text-purple-900 group-hover:bg-purple-100 transition-colors" }, toDisplayString(job.category.name), 1)
                                ]),
                                createVNode("p", { class: "text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4" }, toDisplayString(job.description), 1),
                                job.minimum_requirements.length > 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-sm text-gray-600"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(job.minimum_requirements, (req) => {
                                    return openBlock(), createBlock("div", {
                                      key: req.requirement_id,
                                      class: "flex items-center gap-2"
                                    }, [
                                      createVNode("i", { class: "fas fa-check-circle text-green-500" }),
                                      createTextVNode(" " + toDisplayString(req.title), 1)
                                    ]);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "mt-6 pt-4 border-t border-gray-50" }, [
                                createVNode("div", { class: "flex items-center justify-between" }, [
                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                    createVNode("span", { class: "text-sm text-gray-500" }, " Posted " + toDisplayString(formatDate(
                                      job.created_at
                                    )), 1)
                                  ]),
                                  createVNode("button", { class: "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-800 rounded-lg hover:bg-green-700 transition-all duration-200" }, [
                                    createVNode("i", { class: "fas fa-arrow-right mr-2" }),
                                    createTextVNode(" View Details ")
                                  ])
                                ])
                              ])
                            ])
                          ], 8, ["onClick"]);
                        }), 128))
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Applicant/ViewJobs/ViewJobListings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
