import { onMounted, withCtx, unref, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { A as ApplicantLayout } from "./ApplicantLayout-C8saV4-b.js";
import { _ as _sfc_main$1 } from "./Header-VZTQj6rE.js";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./NotificationBell-DssmmqXB.js";
const _sfc_main = {
  __name: "ApplicantDashboard",
  __ssrInlineRender: true,
  props: {
    stats: Object,
    recentApplications: Array,
    upcomingInterviews: Array,
    recommendedJobs: Array
  },
  setup(__props) {
    const props = __props;
    console.log("props", props.upcomingInterviews);
    onMounted(() => {
      if (window.AOS) {
        window.AOS.init();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(ApplicantLayout, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, { title: "Applicant Dashboard" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, { title: "Applicant Dashboard" })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Applicant Dashboard" }, null, _parent2, _scopeId));
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"${_scopeId}><!--[-->`);
            ssrRenderList(__props.stats, (value, key) => {
              _push2(`<div class="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300" data-aos="fade-up"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}>${ssrInterpolate(key.replace("_", " ").toUpperCase())}</p><p class="text-3xl font-bold text-green-600"${_scopeId}>${ssrInterpolate(value)}</p></div><div class="p-3 bg-green-100 rounded-full"${_scopeId}><i class="fas fa-user-tie text-green-600"${_scopeId}></i></div></div></div>`);
            });
            _push2(`<!--]--></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8"${_scopeId}><div class="bg-white rounded-lg shadow-md p-6" data-aos="fade-right"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}> Your Recent Applications </h3><div class="space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.recentApplications, (application) => {
              _push2(`<div class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"${_scopeId}><div class="flex justify-between items-start"${_scopeId}><div${_scopeId}><h4 class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(application.job_listing.title)}</h4><p class="text-sm text-gray-600"${_scopeId}> Applied: ${ssrInterpolate(new Date(
                application.created_at
              ).toLocaleDateString())}</p></div><span class="${ssrRenderClass([{
                "bg-yellow-100 text-yellow-800": application.status === "pending",
                "bg-green-100 text-green-800": application.status === "accepted",
                "bg-red-100 text-red-800": application.status === "rejected"
              }, "px-3 py-1 text-xs font-medium rounded-full"])}"${_scopeId}>${ssrInterpolate(application.status)}</span></div></div>`);
            });
            _push2(`<!--]--></div></div><div class="bg-white rounded-lg shadow-md p-6" data-aos="fade-left"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}> Upcoming Interviews </h3><div class="space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.upcomingInterviews, (interview) => {
              _push2(`<div class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"${_scopeId}><div class="flex justify-between items-start"${_scopeId}><div${_scopeId}><h4 class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(interview.application.job_listing.title)}</h4><p class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(new Date(
                interview.schedule.schedule_date
              ).toLocaleString())}</p></div><span class="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"${_scopeId}>${ssrInterpolate(interview.type)}</span></div></div>`);
            });
            _push2(`<!--]--></div></div><div class="bg-white rounded-lg shadow-md p-6 lg:col-span-2" data-aos="fade-up"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}> Recommended Jobs </h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
            ssrRenderList(__props.recommendedJobs, (job) => {
              _push2(`<div class="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"${_scopeId}><h4 class="font-medium text-gray-900 mb-2"${_scopeId}>${ssrInterpolate(job.title)}</h4><p class="text-sm text-gray-600 mb-4"${_scopeId}>${ssrInterpolate(job.description)}</p><div class="flex justify-between items-center"${_scopeId}><span class="text-sm text-gray-500"${_scopeId}> Posted: ${ssrInterpolate(new Date(
                job.created_at
              ).toLocaleDateString())}</span>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("job-application.create", {
                  job: job.id
                }),
                class: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Apply Now `);
                  } else {
                    return [
                      createTextVNode(" Apply Now ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Applicant Dashboard" }),
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.stats, (value, key) => {
                      return openBlock(), createBlock("div", {
                        key,
                        class: "bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300",
                        "data-aos": "fade-up"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-medium text-gray-600" }, toDisplayString(key.replace("_", " ").toUpperCase()), 1),
                            createVNode("p", { class: "text-3xl font-bold text-green-600" }, toDisplayString(value), 1)
                          ]),
                          createVNode("div", { class: "p-3 bg-green-100 rounded-full" }, [
                            createVNode("i", { class: "fas fa-user-tie text-green-600" })
                          ])
                        ])
                      ]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-8" }, [
                    createVNode("div", {
                      class: "bg-white rounded-lg shadow-md p-6",
                      "data-aos": "fade-right"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, " Your Recent Applications "),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.recentApplications, (application) => {
                          return openBlock(), createBlock("div", {
                            key: application.id,
                            class: "p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          }, [
                            createVNode("div", { class: "flex justify-between items-start" }, [
                              createVNode("div", null, [
                                createVNode("h4", { class: "font-medium text-gray-900" }, toDisplayString(application.job_listing.title), 1),
                                createVNode("p", { class: "text-sm text-gray-600" }, " Applied: " + toDisplayString(new Date(
                                  application.created_at
                                ).toLocaleDateString()), 1)
                              ]),
                              createVNode("span", {
                                class: ["px-3 py-1 text-xs font-medium rounded-full", {
                                  "bg-yellow-100 text-yellow-800": application.status === "pending",
                                  "bg-green-100 text-green-800": application.status === "accepted",
                                  "bg-red-100 text-red-800": application.status === "rejected"
                                }]
                              }, toDisplayString(application.status), 3)
                            ])
                          ]);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", {
                      class: "bg-white rounded-lg shadow-md p-6",
                      "data-aos": "fade-left"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, " Upcoming Interviews "),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.upcomingInterviews, (interview) => {
                          return openBlock(), createBlock("div", {
                            key: interview.id,
                            class: "p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          }, [
                            createVNode("div", { class: "flex justify-between items-start" }, [
                              createVNode("div", null, [
                                createVNode("h4", { class: "font-medium text-gray-900" }, toDisplayString(interview.application.job_listing.title), 1),
                                createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(new Date(
                                  interview.schedule.schedule_date
                                ).toLocaleString()), 1)
                              ]),
                              createVNode("span", { class: "px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full" }, toDisplayString(interview.type), 1)
                            ])
                          ]);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", {
                      class: "bg-white rounded-lg shadow-md p-6 lg:col-span-2",
                      "data-aos": "fade-up"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, " Recommended Jobs "),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.recommendedJobs, (job) => {
                          return openBlock(), createBlock("div", {
                            key: job.id,
                            class: "p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          }, [
                            createVNode("h4", { class: "font-medium text-gray-900 mb-2" }, toDisplayString(job.title), 1),
                            createVNode("p", { class: "text-sm text-gray-600 mb-4" }, toDisplayString(job.description), 1),
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", { class: "text-sm text-gray-500" }, " Posted: " + toDisplayString(new Date(
                                job.created_at
                              ).toLocaleDateString()), 1),
                              createVNode(unref(Link), {
                                href: _ctx.route("job-application.create", {
                                  job: job.id
                                }),
                                class: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Apply Now ")
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ])
                          ]);
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
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Applicant/ApplicantDashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
