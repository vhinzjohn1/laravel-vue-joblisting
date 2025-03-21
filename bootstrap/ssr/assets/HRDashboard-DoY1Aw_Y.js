import { onMounted, withCtx, unref, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { H as HRLayout } from "./HRLayout-Deg3lApQ.js";
import { _ as _sfc_main$1 } from "./Header-VZTQj6rE.js";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./NotificationBell-DssmmqXB.js";
const _sfc_main = {
  __name: "HRDashboard",
  __ssrInlineRender: true,
  props: {
    stats: Object,
    recentJobs: Array,
    upcomingInterviews: Array,
    recentApplications: Array
  },
  setup(__props) {
    const props = __props;
    console.log("upcomingInterviews", props);
    onMounted(() => {
      if (window.AOS) {
        window.AOS.init();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(HRLayout, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, { title: "HR Dashboard" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, { title: "HR Dashboard" })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "HR Dashboard" }, null, _parent2, _scopeId));
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"${_scopeId}><!--[-->`);
            ssrRenderList(__props.stats, (value, key) => {
              _push2(`<div class="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300" data-aos="fade-up"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}>${ssrInterpolate(key.replace("_", " ").toUpperCase())}</p><p class="text-3xl font-bold text-green-600"${_scopeId}>${ssrInterpolate(value)}</p></div><div class="p-3 bg-green-100 rounded-full"${_scopeId}><i class="fas fa-chart-line text-green-600"${_scopeId}></i></div></div></div>`);
            });
            _push2(`<!--]--></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8"${_scopeId}><div class="bg-white rounded-lg shadow-md p-6" data-aos="fade-right"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}> Recent Job Listings </h3><div class="space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.recentJobs, (job) => {
              _push2(`<div class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"${_scopeId}><div class="flex justify-between items-start"${_scopeId}><div${_scopeId}><h4 class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(job.title)}</h4><p class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(job.category.name)}</p></div><span class="${ssrRenderClass([
                job.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800",
                "px-3 py-1 text-xs font-medium rounded-full"
              ])}"${_scopeId}>${ssrInterpolate(job.status)}</span></div></div>`);
            });
            _push2(`<!--]--></div></div><div class="bg-white rounded-lg shadow-md p-6" data-aos="fade-left"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}> Upcoming Interviews </h3><div class="space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.upcomingInterviews, (interview) => {
              _push2(`<div class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"${_scopeId}><div class="flex justify-between items-start"${_scopeId}><div${_scopeId}><h4 class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(interview.schedule.title)}</h4><p class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(interview.schedule.description)}</p></div><span class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(new Date(
                interview.schedule.schedule_date
              ).toLocaleDateString())}</span></div></div>`);
            });
            _push2(`<!--]--></div></div><div class="bg-white rounded-lg shadow-md p-6 lg:col-span-2" data-aos="fade-up"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}> Recent Applications </h3><div class="overflow-x-auto"${_scopeId}><table class="min-w-full"${_scopeId}><thead${_scopeId}><tr class="bg-gray-50"${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Applicant </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Position </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Date </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.recentApplications, (application) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}>${ssrInterpolate(application.user.user_detail.lastname)}, ${ssrInterpolate(application.user.user_detail.firstname)}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}>${ssrInterpolate(application.job_listing.title)}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([{
                "bg-yellow-100 text-yellow-800": application.status === "pending",
                "bg-green-100 text-green-800": application.status === "accepted",
                "bg-red-100 text-red-800": application.status === "rejected"
              }, "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(application.status)}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId}>${ssrInterpolate(new Date(
                application.created_at
              ).toLocaleDateString())}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "HR Dashboard" }),
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
                            createVNode("i", { class: "fas fa-chart-line text-green-600" })
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
                      createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, " Recent Job Listings "),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.recentJobs, (job) => {
                          return openBlock(), createBlock("div", {
                            key: job.id,
                            class: "p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          }, [
                            createVNode("div", { class: "flex justify-between items-start" }, [
                              createVNode("div", null, [
                                createVNode("h4", { class: "font-medium text-gray-900" }, toDisplayString(job.title), 1),
                                createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(job.category.name), 1)
                              ]),
                              createVNode("span", {
                                class: [
                                  "px-3 py-1 text-xs font-medium rounded-full",
                                  job.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                ]
                              }, toDisplayString(job.status), 3)
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
                                createVNode("h4", { class: "font-medium text-gray-900" }, toDisplayString(interview.schedule.title), 1),
                                createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(interview.schedule.description), 1)
                              ]),
                              createVNode("span", { class: "text-sm text-gray-600" }, toDisplayString(new Date(
                                interview.schedule.schedule_date
                              ).toLocaleDateString()), 1)
                            ])
                          ]);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", {
                      class: "bg-white rounded-lg shadow-md p-6 lg:col-span-2",
                      "data-aos": "fade-up"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, " Recent Applications "),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full" }, [
                          createVNode("thead", null, [
                            createVNode("tr", { class: "bg-gray-50" }, [
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Applicant "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Position "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Date ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.recentApplications, (application) => {
                              return openBlock(), createBlock("tr", {
                                key: application.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, toDisplayString(application.user.user_detail.lastname) + ", " + toDisplayString(application.user.user_detail.firstname), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, toDisplayString(application.job_listing.title), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("span", {
                                    class: ["px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                      "bg-yellow-100 text-yellow-800": application.status === "pending",
                                      "bg-green-100 text-green-800": application.status === "accepted",
                                      "bg-red-100 text-red-800": application.status === "rejected"
                                    }]
                                  }, toDisplayString(application.status), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(new Date(
                                  application.created_at
                                ).toLocaleDateString()), 1)
                              ]);
                            }), 128))
                          ])
                        ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/HR/HRDashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
