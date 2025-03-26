import { ref, computed, unref, withCtx, createBlock, createCommentVNode, openBlock, createVNode, toDisplayString, Fragment, renderList, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { A as ApplicantLayout } from "./ApplicantLayout-C8saV4-b.js";
import { _ as _sfc_main$3 } from "./Header-VZTQj6rE.js";
import { _ as _sfc_main$1 } from "./Breadcrumbs-BdN6WHN9.js";
import { _ as _sfc_main$2 } from "./Modal-Dr2ADp7V.js";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./NotificationBell-DssmmqXB.js";
const _sfc_main = {
  __name: "ScheduleCalendar",
  __ssrInlineRender: true,
  props: {
    schedules: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const showModal = ref(false);
    const selectedSchedule = ref(null);
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString();
    };
    const showDetails = (schedule) => {
      selectedSchedule.value = schedule;
      console.log(selectedSchedule);
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
      setTimeout(() => {
        selectedSchedule.value = null;
      }, 200);
    };
    const calendarOptions = computed(() => ({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay"
      },
      events: props.schedules.map((schedule) => ({
        id: schedule.schedule_id,
        title: schedule.title,
        start: schedule.schedule_date,
        extendedProps: {
          location: schedule.location,
          description: schedule.description,
          status: schedule.status
        },
        backgroundColor: getStatusColor(schedule.status),
        borderColor: getStatusColor(schedule.status),
        textColor: "#ffffff"
      })),
      eventClick: (info) => {
        const schedule = props.schedules.find(
          (s) => s.schedule_id.toString() === info.event.id
        );
        if (schedule) {
          showDetails(schedule);
        }
      }
    }));
    const getStatusColor = (status) => {
      switch (status) {
        case "Scheduled":
          return "#3788d8";
        case "Completed":
          return "#28a745";
        case "Cancelled":
          return "#dc3545";
        default:
          return "#6c757d";
      }
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "My Schedules" }, null, _parent));
      _push(ssrRenderComponent(ApplicantLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, { title: "My Interview Schedules" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3, { title: "My Interview Schedules" })
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
                  href: _ctx.route("my-schedules.index"),
                  active: true
                }
              ]
            }, null, _parent2, _scopeId));
            _push2(`<div class="card shadow-sm rounded-lg overflow-hidden bg-white mb-6"${_scopeId}><div class="card-header bg-white py-4 px-4 border-b"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><h2 class="text-xl font-semibold"${_scopeId}> My Interview Schedules </h2></div></div><div class="p-4"${_scopeId}><div class="mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FullCalendar), { options: calendarOptions.value }, null, _parent2, _scopeId));
            _push2(`</div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId}> Title </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId}> Date &amp; Time </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId}> Location </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId}> Status </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.schedules, (schedule) => {
              _push2(`<tr${_scopeId}><td class="px-6 py-4"${_scopeId}>${ssrInterpolate(schedule.title)}</td><td class="px-6 py-4"${_scopeId}>${ssrInterpolate(formatDate(
                schedule.schedule_date
              ))}</td><td class="px-6 py-4"${_scopeId}>${ssrInterpolate(schedule.location)}</td><td class="px-6 py-4"${_scopeId}><span class="${ssrRenderClass([
                getStatusClass(
                  schedule.status
                ),
                "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              ])}"${_scopeId}>${ssrInterpolate(schedule.status)}</span></td><td class="px-6 py-4"${_scopeId}><button class="text-blue-600 hover:text-blue-900 mr-2"${_scopeId}><i class="fas fa-eye"${_scopeId}></i> View Details </button></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.schedules.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="px-6 py-4 text-center text-gray-500"${_scopeId}> No schedules found </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: showModal.value,
              title: selectedSchedule.value ? selectedSchedule.value.title : "",
              onClose: closeModal,
              maxWidth: "6xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (selectedSchedule.value) {
                    _push3(`<div class="p-6"${_scopeId2}><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId2}><div class="md:col-span-2"${_scopeId2}><div class="prose max-w-none"${_scopeId2}><h3 class="text-lg font-semibold mb-3"${_scopeId2}> Interview Details </h3><div class="bg-gray-50 p-4 rounded-lg mb-6"${_scopeId2}><div class="mb-4"${_scopeId2}><h4 class="text-sm font-medium text-gray-500"${_scopeId2}> Date &amp; Time </h4><p class="text-gray-800"${_scopeId2}>${ssrInterpolate(formatDate(
                      selectedSchedule.value.schedule_date
                    ))}</p></div><div class="mb-4"${_scopeId2}><h4 class="text-sm font-medium text-gray-500"${_scopeId2}> Location </h4><p class="text-gray-800"${_scopeId2}>${ssrInterpolate(selectedSchedule.value.location)}</p></div><div class="mb-4"${_scopeId2}><h4 class="text-sm font-medium text-gray-500"${_scopeId2}> Description </h4><p class="text-gray-800"${_scopeId2}>${ssrInterpolate(selectedSchedule.value.description)}</p></div><div${_scopeId2}><h4 class="text-sm font-medium text-gray-500"${_scopeId2}> Additional Notes </h4><p class="text-gray-800"${_scopeId2}>${ssrInterpolate(selectedSchedule.value.notes || "No additional notes")}</p></div></div><h3 class="text-lg font-semibold mb-3"${_scopeId2}> Job Application </h3><div class="bg-gray-50 p-4 rounded-lg"${_scopeId2}>`);
                    if (selectedSchedule.value.participants[0].application) {
                      _push3(`<div${_scopeId2}><div class="mb-4"${_scopeId2}><h4 class="text-sm font-medium text-gray-500"${_scopeId2}> Position </h4><p class="text-gray-800"${_scopeId2}>${ssrInterpolate(selectedSchedule.value.participants[0].application.job_listing.position.position_name)}</p></div><div${_scopeId2}><h4 class="text-sm font-medium text-gray-500"${_scopeId2}> Job Title </h4><p class="text-gray-800"${_scopeId2}>${ssrInterpolate(selectedSchedule.value.participants[0].application.job_listing.title)}</p></div></div>`);
                    } else {
                      _push3(`<div${_scopeId2}><p class="text-gray-600"${_scopeId2}> No application data available. </p></div>`);
                    }
                    _push3(`</div></div></div><div${_scopeId2}><div class="border rounded-lg p-4 mb-6"${_scopeId2}><div class="mb-4"${_scopeId2}><div class="${ssrRenderClass([
                      getParticipantStatusClass(
                        selectedSchedule.value.status
                      ),
                      "text-center px-3 py-2 rounded-lg font-semibold text-sm mb-4"
                    ])}"${_scopeId2}>${ssrInterpolate(selectedSchedule.value.status)}</div><p class="text-gray-600 text-sm mb-4"${_scopeId2}> Your attendance at this interview is required. Please make sure to attend at the scheduled date and time. </p>`);
                    if (selectedSchedule.value.status === "Cancelled") {
                      _push3(`<div${_scopeId2}><p class="text-gray-600 text-sm font-medium"${_scopeId2}> This interview has been cancelled. </p></div>`);
                    } else if (selectedSchedule.value.status === "Completed") {
                      _push3(`<div${_scopeId2}><p class="text-gray-600 text-sm font-medium"${_scopeId2}> This interview has been completed. </p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div><div class="border rounded-lg p-4"${_scopeId2}><h3 class="text-lg font-semibold mb-4"${_scopeId2}> Schedule Created By </h3>`);
                    if (selectedSchedule.value.creator) {
                      _push3(`<div${_scopeId2}><p class="font-medium"${_scopeId2}>${ssrInterpolate(selectedSchedule.value.creator.userDetail ? `${selectedSchedule.value.creator.userDetail.firstname} ${selectedSchedule.value.creator.userDetail.lastname}` : selectedSchedule.value.creator.username)}</p><p class="text-sm text-gray-600"${_scopeId2}>${ssrInterpolate(selectedSchedule.value.creator.email)}</p></div>`);
                    } else {
                      _push3(`<div${_scopeId2}><p class="text-gray-600"${_scopeId2}> Creator information not available. </p></div>`);
                    }
                    _push3(`</div></div></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    selectedSchedule.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-6"
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                        createVNode("div", { class: "md:col-span-2" }, [
                          createVNode("div", { class: "prose max-w-none" }, [
                            createVNode("h3", { class: "text-lg font-semibold mb-3" }, " Interview Details "),
                            createVNode("div", { class: "bg-gray-50 p-4 rounded-lg mb-6" }, [
                              createVNode("div", { class: "mb-4" }, [
                                createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Date & Time "),
                                createVNode("p", { class: "text-gray-800" }, toDisplayString(formatDate(
                                  selectedSchedule.value.schedule_date
                                )), 1)
                              ]),
                              createVNode("div", { class: "mb-4" }, [
                                createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Location "),
                                createVNode("p", { class: "text-gray-800" }, toDisplayString(selectedSchedule.value.location), 1)
                              ]),
                              createVNode("div", { class: "mb-4" }, [
                                createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Description "),
                                createVNode("p", { class: "text-gray-800" }, toDisplayString(selectedSchedule.value.description), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Additional Notes "),
                                createVNode("p", { class: "text-gray-800" }, toDisplayString(selectedSchedule.value.notes || "No additional notes"), 1)
                              ])
                            ]),
                            createVNode("h3", { class: "text-lg font-semibold mb-3" }, " Job Application "),
                            createVNode("div", { class: "bg-gray-50 p-4 rounded-lg" }, [
                              selectedSchedule.value.participants[0].application ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("div", { class: "mb-4" }, [
                                  createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Position "),
                                  createVNode("p", { class: "text-gray-800" }, toDisplayString(selectedSchedule.value.participants[0].application.job_listing.position.position_name), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Job Title "),
                                  createVNode("p", { class: "text-gray-800" }, toDisplayString(selectedSchedule.value.participants[0].application.job_listing.title), 1)
                                ])
                              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                createVNode("p", { class: "text-gray-600" }, " No application data available. ")
                              ]))
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "border rounded-lg p-4 mb-6" }, [
                            createVNode("div", { class: "mb-4" }, [
                              createVNode("div", {
                                class: [
                                  "text-center px-3 py-2 rounded-lg font-semibold text-sm mb-4",
                                  getParticipantStatusClass(
                                    selectedSchedule.value.status
                                  )
                                ]
                              }, toDisplayString(selectedSchedule.value.status), 3),
                              createVNode("p", { class: "text-gray-600 text-sm mb-4" }, " Your attendance at this interview is required. Please make sure to attend at the scheduled date and time. "),
                              selectedSchedule.value.status === "Cancelled" ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("p", { class: "text-gray-600 text-sm font-medium" }, " This interview has been cancelled. ")
                              ])) : selectedSchedule.value.status === "Completed" ? (openBlock(), createBlock("div", { key: 1 }, [
                                createVNode("p", { class: "text-gray-600 text-sm font-medium" }, " This interview has been completed. ")
                              ])) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "border rounded-lg p-4" }, [
                            createVNode("h3", { class: "text-lg font-semibold mb-4" }, " Schedule Created By "),
                            selectedSchedule.value.creator ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("p", { class: "font-medium" }, toDisplayString(selectedSchedule.value.creator.userDetail ? `${selectedSchedule.value.creator.userDetail.firstname} ${selectedSchedule.value.creator.userDetail.lastname}` : selectedSchedule.value.creator.username), 1),
                              createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(selectedSchedule.value.creator.email), 1)
                            ])) : (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("p", { class: "text-gray-600" }, " Creator information not available. ")
                            ]))
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "py-5" }, [
                createVNode("div", { class: "container-fluid px-4" }, [
                  createVNode(_sfc_main$1, {
                    items: [
                      { name: "Home", href: _ctx.route("applicant.index") },
                      {
                        name: "My Schedules",
                        href: _ctx.route("my-schedules.index"),
                        active: true
                      }
                    ]
                  }, null, 8, ["items"]),
                  createVNode("div", { class: "card shadow-sm rounded-lg overflow-hidden bg-white mb-6" }, [
                    createVNode("div", { class: "card-header bg-white py-4 px-4 border-b" }, [
                      createVNode("div", { class: "flex justify-between items-center" }, [
                        createVNode("h2", { class: "text-xl font-semibold" }, " My Interview Schedules ")
                      ])
                    ]),
                    createVNode("div", { class: "p-4" }, [
                      createVNode("div", { class: "mb-6" }, [
                        createVNode(unref(FullCalendar), { options: calendarOptions.value }, null, 8, ["options"])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                              }, " Title "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                              }, " Date & Time "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                              }, " Location "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                              }, " Status "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                              }, " Actions ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.schedules, (schedule) => {
                              return openBlock(), createBlock("tr", {
                                key: schedule.schedule_id
                              }, [
                                createVNode("td", { class: "px-6 py-4" }, toDisplayString(schedule.title), 1),
                                createVNode("td", { class: "px-6 py-4" }, toDisplayString(formatDate(
                                  schedule.schedule_date
                                )), 1),
                                createVNode("td", { class: "px-6 py-4" }, toDisplayString(schedule.location), 1),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("span", {
                                    class: [
                                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                      getStatusClass(
                                        schedule.status
                                      )
                                    ]
                                  }, toDisplayString(schedule.status), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("button", {
                                    onClick: ($event) => showDetails(schedule),
                                    class: "text-blue-600 hover:text-blue-900 mr-2"
                                  }, [
                                    createVNode("i", { class: "fas fa-eye" }),
                                    createTextVNode(" View Details ")
                                  ], 8, ["onClick"])
                                ])
                              ]);
                            }), 128)),
                            __props.schedules.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "6",
                                class: "px-6 py-4 text-center text-gray-500"
                              }, " No schedules found ")
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$2, {
                show: showModal.value,
                title: selectedSchedule.value ? selectedSchedule.value.title : "",
                onClose: closeModal,
                maxWidth: "6xl"
              }, {
                default: withCtx(() => [
                  selectedSchedule.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                      createVNode("div", { class: "md:col-span-2" }, [
                        createVNode("div", { class: "prose max-w-none" }, [
                          createVNode("h3", { class: "text-lg font-semibold mb-3" }, " Interview Details "),
                          createVNode("div", { class: "bg-gray-50 p-4 rounded-lg mb-6" }, [
                            createVNode("div", { class: "mb-4" }, [
                              createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Date & Time "),
                              createVNode("p", { class: "text-gray-800" }, toDisplayString(formatDate(
                                selectedSchedule.value.schedule_date
                              )), 1)
                            ]),
                            createVNode("div", { class: "mb-4" }, [
                              createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Location "),
                              createVNode("p", { class: "text-gray-800" }, toDisplayString(selectedSchedule.value.location), 1)
                            ]),
                            createVNode("div", { class: "mb-4" }, [
                              createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Description "),
                              createVNode("p", { class: "text-gray-800" }, toDisplayString(selectedSchedule.value.description), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Additional Notes "),
                              createVNode("p", { class: "text-gray-800" }, toDisplayString(selectedSchedule.value.notes || "No additional notes"), 1)
                            ])
                          ]),
                          createVNode("h3", { class: "text-lg font-semibold mb-3" }, " Job Application "),
                          createVNode("div", { class: "bg-gray-50 p-4 rounded-lg" }, [
                            selectedSchedule.value.participants[0].application ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("div", { class: "mb-4" }, [
                                createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Position "),
                                createVNode("p", { class: "text-gray-800" }, toDisplayString(selectedSchedule.value.participants[0].application.job_listing.position.position_name), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Job Title "),
                                createVNode("p", { class: "text-gray-800" }, toDisplayString(selectedSchedule.value.participants[0].application.job_listing.title), 1)
                              ])
                            ])) : (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("p", { class: "text-gray-600" }, " No application data available. ")
                            ]))
                          ])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "border rounded-lg p-4 mb-6" }, [
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("div", {
                              class: [
                                "text-center px-3 py-2 rounded-lg font-semibold text-sm mb-4",
                                getParticipantStatusClass(
                                  selectedSchedule.value.status
                                )
                              ]
                            }, toDisplayString(selectedSchedule.value.status), 3),
                            createVNode("p", { class: "text-gray-600 text-sm mb-4" }, " Your attendance at this interview is required. Please make sure to attend at the scheduled date and time. "),
                            selectedSchedule.value.status === "Cancelled" ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("p", { class: "text-gray-600 text-sm font-medium" }, " This interview has been cancelled. ")
                            ])) : selectedSchedule.value.status === "Completed" ? (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("p", { class: "text-gray-600 text-sm font-medium" }, " This interview has been completed. ")
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "border rounded-lg p-4" }, [
                          createVNode("h3", { class: "text-lg font-semibold mb-4" }, " Schedule Created By "),
                          selectedSchedule.value.creator ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("p", { class: "font-medium" }, toDisplayString(selectedSchedule.value.creator.userDetail ? `${selectedSchedule.value.creator.userDetail.firstname} ${selectedSchedule.value.creator.userDetail.lastname}` : selectedSchedule.value.creator.username), 1),
                            createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(selectedSchedule.value.creator.email), 1)
                          ])) : (openBlock(), createBlock("div", { key: 1 }, [
                            createVNode("p", { class: "text-gray-600" }, " Creator information not available. ")
                          ]))
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["show", "title"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Applicant/Schedule/ScheduleCalendar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
