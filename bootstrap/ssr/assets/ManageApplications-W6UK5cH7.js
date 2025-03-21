import { ref, computed, unref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, withModifiers, createCommentVNode, withDirectives, vModelSelect, vModelText, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { H as HRLayout } from "./HRLayout-Deg3lApQ.js";
import { _ as _sfc_main$3 } from "./Header-VZTQj6rE.js";
import { _ as _sfc_main$1 } from "./Breadcrumbs-BdN6WHN9.js";
import { C as CustomSelect } from "./CustomSelect-wXlHRS75.js";
import { _ as _sfc_main$4 } from "./Modal-Dr2ADp7V.js";
import { _ as _sfc_main$2 } from "./TextInput-DJ5KC4cX.js";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./NotificationBell-DssmmqXB.js";
const _sfc_main = {
  __name: "ManageApplications",
  __ssrInlineRender: true,
  props: {
    applications: {
      type: Array,
      required: true
    },
    statuses: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const applications = ref(props.applications);
    const searchQuery = ref("");
    const statusFilter = ref("");
    const jobTitleFilter = ref("");
    const statuses = ref(props.statuses);
    const jobListings = ref(props.applications.map((app) => app.job_listing));
    const showDetailsModal = ref(false);
    const selectedApplication = ref(null);
    const showDocumentModal = ref(false);
    const currentDocument = ref(null);
    const documentUrl = ref(null);
    const form = useForm({
      status: "",
      remarks: ""
    });
    const viewDetails = (applicationId) => {
      selectedApplication.value = applications.value.find(
        (app) => app.application_id === applicationId
      );
      form.status = selectedApplication.value.status;
      form.remarks = "";
      showDetailsModal.value = true;
    };
    const closeDetailsModal = () => {
      showDetailsModal.value = false;
      setTimeout(() => {
        selectedApplication.value = null;
        form.reset();
      }, 300);
    };
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
    const updateStatus = () => {
      if (form.status === selectedApplication.value.status) {
        showToast({
          icon: "warning",
          title: "No changes made",
          text: "The selected status is the same as the current status"
        });
        return;
      }
      axios.put(
        route(
          "applications.update",
          selectedApplication.value.application_id
        ),
        {
          status: form.status,
          remarks: form.remarks
        }
      ).then((response) => {
        applications.value = response.data.applications;
        selectedApplication.value = response.data.applications.find(
          (app) => app.application_id === selectedApplication.value.application_id
        );
        statuses.value = response.data.statuses;
        form.remarks = "";
        closeDetailsModal();
        showToast({
          icon: "success",
          title: "Status updated successfully",
          success: true
        });
      }).catch((error) => {
        var _a, _b;
        console.error("Error updating status:", error);
        showToast({
          icon: "error",
          title: "Failed to update status",
          text: ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "An error occurred",
          success: false
        });
      });
    };
    const showToast = (config) => {
      Swal.fire({
        position: "top-end",
        showConfirmButton: false,
        timer: 3e3,
        toast: true,
        ...config,
        background: config.success ? "#22c55e" : "#ef4444",
        color: "#ffffff",
        iconColor: "#ffffff"
      });
    };
    const getStatusColor = (status) => {
      const colors = {
        Pending: "bg-yellow-100 text-yellow-800",
        Approved: "bg-green-100 text-green-800",
        Rejected: "bg-red-100 text-red-800",
        Shortlisted: "bg-blue-100 text-blue-800",
        Interview: "bg-purple-100 text-purple-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    const filteredApplications = computed(() => {
      let filtered = applications.value;
      if (statusFilter.value) {
        filtered = filtered.filter((app) => app.status === statusFilter.value);
      }
      if (jobTitleFilter.value) {
        filtered = filtered.filter(
          (app) => {
            var _a;
            return ((_a = app.job_listing) == null ? void 0 : _a.job_listing_id) === jobTitleFilter.value;
          }
        );
      }
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter((application) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          const jobTitle = ((_a = application.job_listing) == null ? void 0 : _a.title) || "";
          const positionName = ((_c = (_b = application.job_listing) == null ? void 0 : _b.position) == null ? void 0 : _c.position_name) || "";
          const userEmail = ((_d = application.user) == null ? void 0 : _d.email) || "";
          const status = application.status || "";
          const firstName = ((_f = (_e = application.user) == null ? void 0 : _e.user_detail) == null ? void 0 : _f.firstname) || "";
          const lastName = ((_h = (_g = application.user) == null ? void 0 : _g.user_detail) == null ? void 0 : _h.lastname) || "";
          return jobTitle.toLowerCase().includes(query) || positionName.toLowerCase().includes(query) || userEmail.toLowerCase().includes(query) || status.toLowerCase().includes(query) || firstName.toLowerCase().includes(query) || lastName.toLowerCase().includes(query) || `${firstName} ${lastName}`.toLowerCase().includes(query);
        });
      }
      return filtered;
    });
    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(void 0, options);
    };
    const formatDateTime = (dateString) => {
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
      _push(ssrRenderComponent(unref(Head), { title: "Manage Applications" }, null, _parent));
      _push(ssrRenderComponent(HRLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Manage Applications" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3, { title: "Manage Applications" })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-5"${_scopeId}><div class="container-fluid px-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              items: [
                { name: "Home", href: _ctx.route("applications.index") },
                {
                  name: "Manage Applications",
                  href: _ctx.route("applications.index"),
                  active: true
                }
              ]
            }, null, _parent2, _scopeId));
            _push2(`<div class="card shadow-sm rounded-lg overflow-hidden bg-white mb-6"${_scopeId}><div class="card-header bg-white py-4 px-4 border-b"${_scopeId}><div class="flex flex-col md:flex-row justify-center items-center gap-3"${_scopeId}><div class="relative w-full md:w-1/2 max-w-xl"${_scopeId}><div class="flex"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              type: "text",
              class: "w-full rounded-r-none",
              placeholder: "Search applications...",
              modelValue: searchQuery.value,
              "onUpdate:modelValue": ($event) => searchQuery.value = $event
            }, null, _parent2, _scopeId));
            _push2(`<button class="px-4 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"${_scopeId}><i class="fas fa-search"${_scopeId}></i></button></div></div><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(CustomSelect, {
              modelValue: statusFilter.value,
              "onUpdate:modelValue": ($event) => statusFilter.value = $event,
              options: statuses.value,
              displayFormat: (option) => option,
              placeholder: "All Statuses",
              class: "w-72"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(CustomSelect, {
              modelValue: jobTitleFilter.value,
              "onUpdate:modelValue": ($event) => jobTitleFilter.value = $event,
              options: jobListings.value,
              displayFormat: (option) => option.job_listing_id === "" ? option.title : option.title,
              valueKey: "job_listing_id",
              placeholder: "All Job Titles",
              class: "w-72"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="card-body p-4"${_scopeId}>`);
            if (applications.value.length === 0) {
              _push2(`<div class="text-center py-8"${_scopeId}><div class="text-gray-400 mb-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg></div><h3 class="text-lg font-medium text-gray-900"${_scopeId}> No applications found </h3><p class="text-gray-500 mt-1"${_scopeId}> There are no job applications in the system yet. </p></div>`);
            } else {
              _push2(`<div${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Applicant </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Job Title </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Position </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Applied Date </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(filteredApplications.value, (application) => {
                _push2(`<tr class="hover:bg-gray-50 cursor-pointer"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center"${_scopeId}><span class="text-sm font-medium text-gray-600"${_scopeId}>${ssrInterpolate(application.user.user_detail.firstname.charAt(0))}</span></div><div class="ml-4"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(`${application.user.user_detail.firstname} ${application.user.user_detail.lastname}`)}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(application.user.email)}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(application.job_listing.title)}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(application.job_listing.position.position_name)}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(
                  application.created_at
                ))}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([{
                  "bg-yellow-100 text-yellow-800": application.status === "Pending",
                  "bg-green-100 text-green-800": application.status === "Qualified",
                  "bg-red-100 text-red-800": application.status === "Rejected",
                  "bg-blue-100 text-blue-800": application.status === "Competency Exam",
                  "bg-purple-100 text-purple-800": application.status === "Interview",
                  "bg-gray-100 text-gray-800": ![
                    "Pending",
                    "Qualified",
                    "Rejected",
                    "Competency Exam",
                    "Interview"
                  ].includes(
                    application.status
                  )
                }, "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(application.status)}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium"${_scopeId}><button class="text-green-800 hover:text-green-900"${_scopeId}> View Details </button></td></tr>`);
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
                      { name: "Home", href: _ctx.route("applications.index") },
                      {
                        name: "Manage Applications",
                        href: _ctx.route("applications.index"),
                        active: true
                      }
                    ]
                  }, null, 8, ["items"]),
                  createVNode("div", { class: "card shadow-sm rounded-lg overflow-hidden bg-white mb-6" }, [
                    createVNode("div", { class: "card-header bg-white py-4 px-4 border-b" }, [
                      createVNode("div", { class: "flex flex-col md:flex-row justify-center items-center gap-3" }, [
                        createVNode("div", { class: "relative w-full md:w-1/2 max-w-xl" }, [
                          createVNode("div", { class: "flex" }, [
                            createVNode(_sfc_main$2, {
                              type: "text",
                              class: "w-full rounded-r-none",
                              placeholder: "Search applications...",
                              modelValue: searchQuery.value,
                              "onUpdate:modelValue": ($event) => searchQuery.value = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("button", { class: "px-4 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors" }, [
                              createVNode("i", { class: "fas fa-search" })
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode(CustomSelect, {
                            modelValue: statusFilter.value,
                            "onUpdate:modelValue": ($event) => statusFilter.value = $event,
                            options: statuses.value,
                            displayFormat: (option) => option,
                            placeholder: "All Statuses",
                            class: "w-72"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "displayFormat"]),
                          createVNode(CustomSelect, {
                            modelValue: jobTitleFilter.value,
                            "onUpdate:modelValue": ($event) => jobTitleFilter.value = $event,
                            options: jobListings.value,
                            displayFormat: (option) => option.job_listing_id === "" ? option.title : option.title,
                            valueKey: "job_listing_id",
                            placeholder: "All Job Titles",
                            class: "w-72"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "displayFormat"])
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
                        createVNode("p", { class: "text-gray-500 mt-1" }, " There are no job applications in the system yet. ")
                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("div", { class: "overflow-x-auto" }, [
                          createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                            createVNode("thead", { class: "bg-gray-50" }, [
                              createVNode("tr", null, [
                                createVNode("th", {
                                  scope: "col",
                                  class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                }, " Applicant "),
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
                                  class: "hover:bg-gray-50 cursor-pointer",
                                  onClick: ($event) => viewDetails(
                                    application.application_id
                                  )
                                }, [
                                  createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                    createVNode("div", { class: "flex items-center" }, [
                                      createVNode("div", { class: "flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center" }, [
                                        createVNode("span", { class: "text-sm font-medium text-gray-600" }, toDisplayString(application.user.user_detail.firstname.charAt(0)), 1)
                                      ]),
                                      createVNode("div", { class: "ml-4" }, [
                                        createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(`${application.user.user_detail.firstname} ${application.user.user_detail.lastname}`), 1),
                                        createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(application.user.email), 1)
                                      ])
                                    ])
                                  ]),
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
                                        "bg-green-100 text-green-800": application.status === "Qualified",
                                        "bg-red-100 text-red-800": application.status === "Rejected",
                                        "bg-blue-100 text-blue-800": application.status === "Competency Exam",
                                        "bg-purple-100 text-purple-800": application.status === "Interview",
                                        "bg-gray-100 text-gray-800": ![
                                          "Pending",
                                          "Qualified",
                                          "Rejected",
                                          "Competency Exam",
                                          "Interview"
                                        ].includes(
                                          application.status
                                        )
                                      }]
                                    }, toDisplayString(application.status), 3)
                                  ]),
                                  createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium" }, [
                                    createVNode("button", {
                                      onClick: withModifiers(($event) => viewDetails(
                                        application.application_id
                                      ), ["stop"]),
                                      class: "text-green-800 hover:text-green-900"
                                    }, " View Details ", 8, ["onClick"])
                                  ])
                                ], 8, ["onClick"]);
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
      _push(ssrRenderComponent(_sfc_main$4, {
        show: showDetailsModal.value,
        onClose: closeDetailsModal,
        "max-width": "7xl",
        title: "Application Details"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4"${_scopeId}>`);
            if (selectedApplication.value) {
              _push2(`<div class="mt-2"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><h1 class="text-xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(selectedApplication.value.job_listing.title)}</h1><span class="${ssrRenderClass([getStatusColor(selectedApplication.value.status), "px-3 py-1 text-sm font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(selectedApplication.value.status)}</span></div><div class="grid grid-cols-1 md:grid-cols-12 gap-4"${_scopeId}><div class="md:col-span-7 space-y-4"${_scopeId}><div class="bg-white p-4 rounded-lg border"${_scopeId}><h2 class="text-base font-semibold mb-3"${_scopeId}> Applicant Information </h2><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-500"${_scopeId}>Name</label><p class="mt-1"${_scopeId}>${ssrInterpolate(`${selectedApplication.value.user.user_detail.firstname} ${selectedApplication.value.user.user_detail.middle_initial}. ${selectedApplication.value.user.user_detail.lastname}`)}</p></div><div${_scopeId}><label class="block text-sm font-medium text-gray-500"${_scopeId}>Email</label><p class="mt-1"${_scopeId}>${ssrInterpolate(selectedApplication.value.user.email)}</p></div><div${_scopeId}><label class="block text-sm font-medium text-gray-500"${_scopeId}>Phone Number</label><p class="mt-1"${_scopeId}>${ssrInterpolate(selectedApplication.value.user.user_detail.phone_number)}</p></div></div></div><div class="bg-white p-4 rounded-lg border"${_scopeId}><h2 class="text-base font-semibold mb-3"${_scopeId}> Job Details </h2><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-500"${_scopeId}>Position</label><p class="mt-1"${_scopeId}>${ssrInterpolate(selectedApplication.value.job_listing.position.position_name)}</p></div><div${_scopeId}><label class="block text-sm font-medium text-gray-500"${_scopeId}>Description</label><p class="mt-1 text-sm"${_scopeId}>${ssrInterpolate(selectedApplication.value.job_listing.description)}</p></div></div></div><div class="bg-white p-4 rounded-lg border"${_scopeId}><h2 class="text-base font-semibold mb-3"${_scopeId}> Documents </h2>`);
              if (selectedApplication.value.documents && selectedApplication.value.documents.length > 0) {
                _push2(`<div${_scopeId}><!--[-->`);
                ssrRenderList(selectedApplication.value.documents, (doc) => {
                  _push2(`<div class="flex justify-between items-center py-1.5"${_scopeId}><span class="text-gray-700 text-sm"${_scopeId}>${ssrInterpolate(doc.document_type)}</span><button class="text-green-800 hover:text-green-900 text-sm"${_scopeId}> View </button></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="text-gray-500 text-sm"${_scopeId}> No documents attached </div>`);
              }
              _push2(`</div></div><div class="md:col-span-5 space-y-4"${_scopeId}><div class="bg-white p-4 rounded-lg border"${_scopeId}><h2 class="text-base font-semibold mb-3"${_scopeId}> Update Status </h2><form${_scopeId}><div class="mb-3"${_scopeId}><label for="status" class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Status</label><select id="status" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"${_scopeId}><!--[-->`);
              ssrRenderList(statuses.value, (status) => {
                _push2(`<option${ssrRenderAttr("value", status)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, status) : ssrLooseEqual(unref(form).status, status)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(status)}</option>`);
              });
              _push2(`<!--]--></select></div><div class="mb-3"${_scopeId}><label for="remarks" class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Remarks</label><textarea id="remarks" rows="2" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Add any notes about this status change"${_scopeId}>${ssrInterpolate(unref(form).remarks)}</textarea></div><button type="submit" class="w-full bg-green-800 text-white py-1.5 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"${_scopeId}> Update Status </button></form></div><div class="bg-white p-4 rounded-lg border"${_scopeId}><h2 class="text-base font-semibold mb-3"${_scopeId}> Status History </h2>`);
              if (selectedApplication.value.status_history && selectedApplication.value.status_history.length > 0) {
                _push2(`<div class="space-y-3 max-h-[320px] overflow-y-auto pr-2"${_scopeId}><!--[-->`);
                ssrRenderList([
                  ...selectedApplication.value.status_history
                ].reverse(), (history, index) => {
                  _push2(`<div class="border-l-2 border-gray-200 pl-3 pb-3 text-sm"${_scopeId}><div class="text-xs text-gray-600"${_scopeId}>${ssrInterpolate(formatDateTime(history.created_at))}</div><p class="mt-1"${_scopeId}> Status changed from <span class="font-semibold"${_scopeId}>${ssrInterpolate(history.previous_status || "New")}</span> to <span class="font-semibold"${_scopeId}>${ssrInterpolate(history.new_status)}</span></p>`);
                  if (history.remarks) {
                    _push2(`<p class="mt-1 text-gray-600 text-xs"${_scopeId}>${ssrInterpolate(history.remarks)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="text-gray-500 text-sm"${_scopeId}> No status history available </div>`);
              }
              _push2(`</div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-4" }, [
                selectedApplication.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-2"
                }, [
                  createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                    createVNode("h1", { class: "text-xl font-bold text-gray-900" }, toDisplayString(selectedApplication.value.job_listing.title), 1),
                    createVNode("span", {
                      class: ["px-3 py-1 text-sm font-semibold rounded-full", getStatusColor(selectedApplication.value.status)]
                    }, toDisplayString(selectedApplication.value.status), 3)
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-12 gap-4" }, [
                    createVNode("div", { class: "md:col-span-7 space-y-4" }, [
                      createVNode("div", { class: "bg-white p-4 rounded-lg border" }, [
                        createVNode("h2", { class: "text-base font-semibold mb-3" }, " Applicant Information "),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-500" }, "Name"),
                            createVNode("p", { class: "mt-1" }, toDisplayString(`${selectedApplication.value.user.user_detail.firstname} ${selectedApplication.value.user.user_detail.middle_initial}. ${selectedApplication.value.user.user_detail.lastname}`), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-500" }, "Email"),
                            createVNode("p", { class: "mt-1" }, toDisplayString(selectedApplication.value.user.email), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-500" }, "Phone Number"),
                            createVNode("p", { class: "mt-1" }, toDisplayString(selectedApplication.value.user.user_detail.phone_number), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-white p-4 rounded-lg border" }, [
                        createVNode("h2", { class: "text-base font-semibold mb-3" }, " Job Details "),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-500" }, "Position"),
                            createVNode("p", { class: "mt-1" }, toDisplayString(selectedApplication.value.job_listing.position.position_name), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-500" }, "Description"),
                            createVNode("p", { class: "mt-1 text-sm" }, toDisplayString(selectedApplication.value.job_listing.description), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-white p-4 rounded-lg border" }, [
                        createVNode("h2", { class: "text-base font-semibold mb-3" }, " Documents "),
                        selectedApplication.value.documents && selectedApplication.value.documents.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(selectedApplication.value.documents, (doc) => {
                            return openBlock(), createBlock("div", {
                              key: doc.document_id,
                              class: "flex justify-between items-center py-1.5"
                            }, [
                              createVNode("span", { class: "text-gray-700 text-sm" }, toDisplayString(doc.document_type), 1),
                              createVNode("button", {
                                onClick: ($event) => openDocumentModal(doc),
                                class: "text-green-800 hover:text-green-900 text-sm"
                              }, " View ", 8, ["onClick"])
                            ]);
                          }), 128))
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-gray-500 text-sm"
                        }, " No documents attached "))
                      ])
                    ]),
                    createVNode("div", { class: "md:col-span-5 space-y-4" }, [
                      createVNode("div", { class: "bg-white p-4 rounded-lg border" }, [
                        createVNode("h2", { class: "text-base font-semibold mb-3" }, " Update Status "),
                        createVNode("form", {
                          onSubmit: withModifiers(updateStatus, ["prevent"])
                        }, [
                          createVNode("div", { class: "mb-3" }, [
                            createVNode("label", {
                              for: "status",
                              class: "block text-sm font-medium text-gray-700 mb-1"
                            }, "Status"),
                            withDirectives(createVNode("select", {
                              id: "status",
                              "onUpdate:modelValue": ($event) => unref(form).status = $event,
                              class: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(statuses.value, (status) => {
                                return openBlock(), createBlock("option", {
                                  key: status,
                                  value: status
                                }, toDisplayString(status), 9, ["value"]);
                              }), 128))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).status]
                            ])
                          ]),
                          createVNode("div", { class: "mb-3" }, [
                            createVNode("label", {
                              for: "remarks",
                              class: "block text-sm font-medium text-gray-700 mb-1"
                            }, "Remarks"),
                            withDirectives(createVNode("textarea", {
                              id: "remarks",
                              "onUpdate:modelValue": ($event) => unref(form).remarks = $event,
                              rows: "2",
                              class: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
                              placeholder: "Add any notes about this status change"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).remarks]
                            ])
                          ]),
                          createVNode("button", {
                            type: "submit",
                            class: "w-full bg-green-800 text-white py-1.5 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          }, " Update Status ")
                        ], 32)
                      ]),
                      createVNode("div", { class: "bg-white p-4 rounded-lg border" }, [
                        createVNode("h2", { class: "text-base font-semibold mb-3" }, " Status History "),
                        selectedApplication.value.status_history && selectedApplication.value.status_history.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-3 max-h-[320px] overflow-y-auto pr-2"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList([
                            ...selectedApplication.value.status_history
                          ].reverse(), (history, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "border-l-2 border-gray-200 pl-3 pb-3 text-sm"
                            }, [
                              createVNode("div", { class: "text-xs text-gray-600" }, toDisplayString(formatDateTime(history.created_at)), 1),
                              createVNode("p", { class: "mt-1" }, [
                                createTextVNode(" Status changed from "),
                                createVNode("span", { class: "font-semibold" }, toDisplayString(history.previous_status || "New"), 1),
                                createTextVNode(" to "),
                                createVNode("span", { class: "font-semibold" }, toDisplayString(history.new_status), 1)
                              ]),
                              history.remarks ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "mt-1 text-gray-600 text-xs"
                              }, toDisplayString(history.remarks), 1)) : createCommentVNode("", true)
                            ]);
                          }), 128))
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-gray-500 text-sm"
                        }, " No status history available "))
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        show: showDocumentModal.value,
        onClose: closeDocumentModal,
        "max-width": "4xl",
        title: "View Document"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4"${_scopeId}><div class="mt-2 h-[80vh]"${_scopeId}>`);
            if (documentUrl.value) {
              _push2(`<iframe${ssrRenderAttr("src", documentUrl.value)} class="w-full h-full border-0" title="Document Viewer"${_scopeId}></iframe>`);
            } else {
              _push2(`<div class="flex items-center justify-center h-full"${_scopeId}><p class="text-gray-500"${_scopeId}>Loading document...</p></div>`);
            }
            _push2(`</div><div class="mt-3 flex justify-end space-x-2"${_scopeId}><button type="button" class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-3 py-1.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"${_scopeId}> Close </button>`);
            if (documentUrl.value) {
              _push2(`<a${ssrRenderAttr("href", documentUrl.value)} target="_blank" class="inline-flex items-center justify-center rounded-md border border-transparent shadow-sm px-3 py-1.5 bg-green-800 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"${_scopeId}> Open in new tab </a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4" }, [
                createVNode("div", {
                  class: "mt-2 h-[80vh]",
                  ref: "documentContainer"
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
                    createVNode("p", { class: "text-gray-500" }, "Loading document...")
                  ]))
                ], 512),
                createVNode("div", { class: "mt-3 flex justify-end space-x-2" }, [
                  createVNode("button", {
                    type: "button",
                    class: "inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-3 py-1.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm",
                    onClick: closeDocumentModal
                  }, " Close "),
                  documentUrl.value ? (openBlock(), createBlock("a", {
                    key: 0,
                    href: documentUrl.value,
                    target: "_blank",
                    class: "inline-flex items-center justify-center rounded-md border border-transparent shadow-sm px-3 py-1.5 bg-green-800 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  }, " Open in new tab ", 8, ["href"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/HR/ManageApplication/ManageApplications.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
