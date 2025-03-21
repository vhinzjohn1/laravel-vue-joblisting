import { unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { A as ApplicantLayout } from "./ApplicantLayout-C8saV4-b.js";
import { _ as _sfc_main$2 } from "./Header-VZTQj6rE.js";
import { _ as _sfc_main$1 } from "./Breadcrumbs-BdN6WHN9.js";
import axios from "axios";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./NotificationBell-DssmmqXB.js";
const _sfc_main = {
  __name: "ScheduleDetail",
  __ssrInlineRender: true,
  props: {
    schedule: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString();
    };
    const getStatusClass = (status) => {
      switch (status) {
        case "Scheduled":
          return "bg-blue-100 text-blue-800";
        case "Completed":
          return "bg-green-100 text-green-800";
        case "Cancelled":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
    const getParticipantStatusClass = (status) => {
      switch (status) {
        case "Pending":
          return "bg-yellow-100 text-yellow-800";
        case "Confirmed":
          return "bg-green-100 text-green-800";
        case "Declined":
          return "bg-red-100 text-red-800";
        case "Attended":
          return "bg-blue-100 text-blue-800";
        case "Cancelled":
          return "bg-gray-100 text-gray-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
    const updateStatus = (status) => {
      axios.post(route("my-schedules.update-status", props.schedule.schedule_id), {
        status
      }).then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Status Updated",
          showConfirmButton: false,
          timer: 3e3,
          iconColor: "#ffffff",
          toast: true,
          color: "#ffffff",
          background: "#22c55e"
        });
        router.reload();
      }).catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to Update Status",
          text: "There was a problem updating your status",
          showConfirmButton: false,
          timer: 3e3,
          iconColor: "#ffffff",
          toast: true,
          color: "#ffffff",
          background: "#ef4444"
        });
        console.error("Error updating status:", error);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Schedule Details" }, null, _parent));
      _push(ssrRenderComponent(ApplicantLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { title: "Interview Schedule Details" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { title: "Interview Schedule Details" })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-5"${_scopeId}><div class="container-fluid px-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              items: [
                { name: "Home", href: _ctx.route("applicant.index") },
                {
                  name: "My Schedules",
                  href: _ctx.route("my-schedules.index")
                },
                {
                  name: "Schedule Details",
                  href: _ctx.route(
                    "my-schedules.show",
                    __props.schedule.schedule_id
                  ),
                  active: true
                }
              ]
            }, null, _parent2, _scopeId));
            _push2(`<div class="card shadow-sm rounded-lg overflow-hidden bg-white mb-6"${_scopeId}><div class="card-header bg-white py-4 px-4 border-b"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><h2 class="text-xl font-semibold"${_scopeId}>${ssrInterpolate(__props.schedule.title)}</h2><div class="${ssrRenderClass([getStatusClass(__props.schedule.status), "px-3 py-1 inline-flex text-sm rounded-full"])}"${_scopeId}>${ssrInterpolate(__props.schedule.status)}</div></div></div><div class="p-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div class="md:col-span-2"${_scopeId}><div class="prose max-w-none"${_scopeId}><h3 class="text-lg font-semibold mb-3"${_scopeId}> Interview Details </h3><div class="bg-gray-50 p-4 rounded-lg mb-6"${_scopeId}><div class="mb-4"${_scopeId}><h4 class="text-sm font-medium text-gray-500"${_scopeId}> Date &amp; Time </h4><p class="text-gray-800"${_scopeId}>${ssrInterpolate(formatDate(
              __props.schedule.schedule_date
            ))}</p></div><div class="mb-4"${_scopeId}><h4 class="text-sm font-medium text-gray-500"${_scopeId}> Location </h4><p class="text-gray-800"${_scopeId}>${ssrInterpolate(__props.schedule.location)}</p></div><div class="mb-4"${_scopeId}><h4 class="text-sm font-medium text-gray-500"${_scopeId}> Description </h4><p class="text-gray-800"${_scopeId}>${ssrInterpolate(__props.schedule.description)}</p></div><div${_scopeId}><h4 class="text-sm font-medium text-gray-500"${_scopeId}> Additional Notes </h4><p class="text-gray-800"${_scopeId}>${ssrInterpolate(__props.schedule.notes || "No additional notes")}</p></div></div><h3 class="text-lg font-semibold mb-3"${_scopeId}> Job Application </h3><div class="bg-gray-50 p-4 rounded-lg"${_scopeId}>`);
            if (__props.schedule.participants[0].application) {
              _push2(`<div${_scopeId}><div class="mb-4"${_scopeId}><h4 class="text-sm font-medium text-gray-500"${_scopeId}> Position </h4><p class="text-gray-800"${_scopeId}>${ssrInterpolate(__props.schedule.participants[0].application.job_listing.position.position_name)}</p></div><div${_scopeId}><h4 class="text-sm font-medium text-gray-500"${_scopeId}> Job Title </h4><p class="text-gray-800"${_scopeId}>${ssrInterpolate(__props.schedule.participants[0].application.job_listing.title)}</p></div></div>`);
            } else {
              _push2(`<div${_scopeId}><p class="text-gray-600"${_scopeId}> No application data available. </p></div>`);
            }
            _push2(`</div></div></div><div${_scopeId}><div class="border rounded-lg p-4 mb-6"${_scopeId}><h3 class="text-lg font-semibold mb-4"${_scopeId}> Your Status </h3><div class="mb-4"${_scopeId}><div class="${ssrRenderClass([
              getParticipantStatusClass(
                __props.schedule.participants[0].status
              ),
              "text-center px-3 py-2 rounded-lg font-semibold text-sm mb-4"
            ])}"${_scopeId}>${ssrInterpolate(__props.schedule.participants[0].status)}</div>`);
            if (__props.schedule.status === "Scheduled" && __props.schedule.participants[0].status === "Pending") {
              _push2(`<div${_scopeId}><p class="text-gray-600 mb-4 text-sm"${_scopeId}> Please confirm your attendance for this interview. </p><div class="space-y-2"${_scopeId}><button class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"${_scopeId}> Confirm Attendance </button><button class="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"${_scopeId}> Decline </button></div></div>`);
            } else if (__props.schedule.status === "Completed") {
              _push2(`<div${_scopeId}><p class="text-gray-600 text-sm"${_scopeId}> This interview has been completed. </p></div>`);
            } else if (__props.schedule.status === "Cancelled") {
              _push2(`<div${_scopeId}><p class="text-gray-600 text-sm"${_scopeId}> This interview has been cancelled. </p></div>`);
            } else if (__props.schedule.participants[0].status === "Confirmed") {
              _push2(`<div${_scopeId}><p class="text-gray-600 text-sm"${_scopeId}> You have confirmed your attendance. </p></div>`);
            } else if (__props.schedule.participants[0].status === "Declined") {
              _push2(`<div${_scopeId}><p class="text-gray-600 text-sm"${_scopeId}> You have declined this interview. </p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="border rounded-lg p-4"${_scopeId}><h3 class="text-lg font-semibold mb-4"${_scopeId}> Schedule Created By </h3>`);
            if (__props.schedule.creator) {
              _push2(`<div${_scopeId}><p class="font-medium"${_scopeId}>${ssrInterpolate(__props.schedule.creator.userDetail ? `${__props.schedule.creator.userDetail.firstname} ${__props.schedule.creator.userDetail.lastname}` : __props.schedule.creator.username)}</p><p class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(__props.schedule.creator.email)}</p></div>`);
            } else {
              _push2(`<div${_scopeId}><p class="text-gray-600"${_scopeId}> Creator information not available. </p></div>`);
            }
            _push2(`</div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-5" }, [
                createVNode("div", { class: "container-fluid px-4" }, [
                  createVNode(_sfc_main$1, {
                    items: [
                      { name: "Home", href: _ctx.route("applicant.index") },
                      {
                        name: "My Schedules",
                        href: _ctx.route("my-schedules.index")
                      },
                      {
                        name: "Schedule Details",
                        href: _ctx.route(
                          "my-schedules.show",
                          __props.schedule.schedule_id
                        ),
                        active: true
                      }
                    ]
                  }, null, 8, ["items"]),
                  createVNode("div", { class: "card shadow-sm rounded-lg overflow-hidden bg-white mb-6" }, [
                    createVNode("div", { class: "card-header bg-white py-4 px-4 border-b" }, [
                      createVNode("div", { class: "flex justify-between items-center" }, [
                        createVNode("h2", { class: "text-xl font-semibold" }, toDisplayString(__props.schedule.title), 1),
                        createVNode("div", {
                          class: ["px-3 py-1 inline-flex text-sm rounded-full", getStatusClass(__props.schedule.status)]
                        }, toDisplayString(__props.schedule.status), 3)
                      ])
                    ]),
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                        createVNode("div", { class: "md:col-span-2" }, [
                          createVNode("div", { class: "prose max-w-none" }, [
                            createVNode("h3", { class: "text-lg font-semibold mb-3" }, " Interview Details "),
                            createVNode("div", { class: "bg-gray-50 p-4 rounded-lg mb-6" }, [
                              createVNode("div", { class: "mb-4" }, [
                                createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Date & Time "),
                                createVNode("p", { class: "text-gray-800" }, toDisplayString(formatDate(
                                  __props.schedule.schedule_date
                                )), 1)
                              ]),
                              createVNode("div", { class: "mb-4" }, [
                                createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Location "),
                                createVNode("p", { class: "text-gray-800" }, toDisplayString(__props.schedule.location), 1)
                              ]),
                              createVNode("div", { class: "mb-4" }, [
                                createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Description "),
                                createVNode("p", { class: "text-gray-800" }, toDisplayString(__props.schedule.description), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Additional Notes "),
                                createVNode("p", { class: "text-gray-800" }, toDisplayString(__props.schedule.notes || "No additional notes"), 1)
                              ])
                            ]),
                            createVNode("h3", { class: "text-lg font-semibold mb-3" }, " Job Application "),
                            createVNode("div", { class: "bg-gray-50 p-4 rounded-lg" }, [
                              __props.schedule.participants[0].application ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("div", { class: "mb-4" }, [
                                  createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Position "),
                                  createVNode("p", { class: "text-gray-800" }, toDisplayString(__props.schedule.participants[0].application.job_listing.position.position_name), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Job Title "),
                                  createVNode("p", { class: "text-gray-800" }, toDisplayString(__props.schedule.participants[0].application.job_listing.title), 1)
                                ])
                              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                createVNode("p", { class: "text-gray-600" }, " No application data available. ")
                              ]))
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "border rounded-lg p-4 mb-6" }, [
                            createVNode("h3", { class: "text-lg font-semibold mb-4" }, " Your Status "),
                            createVNode("div", { class: "mb-4" }, [
                              createVNode("div", {
                                class: [
                                  "text-center px-3 py-2 rounded-lg font-semibold text-sm mb-4",
                                  getParticipantStatusClass(
                                    __props.schedule.participants[0].status
                                  )
                                ]
                              }, toDisplayString(__props.schedule.participants[0].status), 3),
                              __props.schedule.status === "Scheduled" && __props.schedule.participants[0].status === "Pending" ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("p", { class: "text-gray-600 mb-4 text-sm" }, " Please confirm your attendance for this interview. "),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode("button", {
                                    onClick: ($event) => updateStatus(
                                      "Confirmed"
                                    ),
                                    class: "w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                  }, " Confirm Attendance ", 8, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => updateStatus("Declined"),
                                    class: "w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                  }, " Decline ", 8, ["onClick"])
                                ])
                              ])) : __props.schedule.status === "Completed" ? (openBlock(), createBlock("div", { key: 1 }, [
                                createVNode("p", { class: "text-gray-600 text-sm" }, " This interview has been completed. ")
                              ])) : __props.schedule.status === "Cancelled" ? (openBlock(), createBlock("div", { key: 2 }, [
                                createVNode("p", { class: "text-gray-600 text-sm" }, " This interview has been cancelled. ")
                              ])) : __props.schedule.participants[0].status === "Confirmed" ? (openBlock(), createBlock("div", { key: 3 }, [
                                createVNode("p", { class: "text-gray-600 text-sm" }, " You have confirmed your attendance. ")
                              ])) : __props.schedule.participants[0].status === "Declined" ? (openBlock(), createBlock("div", { key: 4 }, [
                                createVNode("p", { class: "text-gray-600 text-sm" }, " You have declined this interview. ")
                              ])) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "border rounded-lg p-4" }, [
                            createVNode("h3", { class: "text-lg font-semibold mb-4" }, " Schedule Created By "),
                            __props.schedule.creator ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("p", { class: "font-medium" }, toDisplayString(__props.schedule.creator.userDetail ? `${__props.schedule.creator.userDetail.firstname} ${__props.schedule.creator.userDetail.lastname}` : __props.schedule.creator.username), 1),
                              createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(__props.schedule.creator.email), 1)
                            ])) : (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("p", { class: "text-gray-600" }, " Creator information not available. ")
                            ]))
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
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Applicant/Schedule/ScheduleDetail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
