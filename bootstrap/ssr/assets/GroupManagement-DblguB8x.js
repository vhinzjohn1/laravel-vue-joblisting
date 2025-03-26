import { ref, unref, withCtx, createVNode, withModifiers, withDirectives, vModelText, createBlock, openBlock, Fragment, renderList, toDisplayString, vModelSelect, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Head, router } from "@inertiajs/vue3";
import { H as HRLayout } from "./HRLayout-Deg3lApQ.js";
import { _ as _sfc_main$2 } from "./Header-VZTQj6rE.js";
import { _ as _sfc_main$1 } from "./Modal-Dr2ADp7V.js";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./NotificationBell-DssmmqXB.js";
const _sfc_main = {
  __name: "GroupManagement",
  __ssrInlineRender: true,
  props: {
    groups: Array,
    jobListings: Array
  },
  setup(__props) {
    const showModal = ref(false);
    const editingGroup = ref(null);
    const processing = ref(false);
    const form = useForm({
      name: "",
      job_listing_id: "",
      notes: ""
    });
    const closeModal = () => {
      showModal.value = false;
      editingGroup.value = null;
      form.reset();
    };
    const createGroup = () => {
      if (editingGroup.value) {
        form.put(route("groups.update", editingGroup.value.group_id), {
          onSuccess: () => {
            closeModal();
            showSuccessAlert("update");
          }
        });
      } else {
        form.post(route("groups.store"), {
          onSuccess: () => {
            closeModal();
            showSuccessAlert("add");
          },
          onError: () => {
            console.error("Error creating group:", form.errors);
          }
        });
      }
    };
    const showSuccessAlert = (action) => {
      let title, text;
      switch (action) {
        case "add":
          title = "Added Successfully!";
          text = "Information has been updated.";
          break;
        case "update":
          title = "Updated Successfully!";
          text = "Information has been updated.";
          break;
        case "delete":
          title = "Deleted Successfully!";
          text = "Information has been updated.";
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
        iconColor: "#ffffffff",
        showConfirmButton: false,
        timer: 3e3,
        // Toast will disappear after 3 seconds
        toast: true,
        // Enable toast mode
        color: "#ffffff",
        background: "#22c55e"
      });
    };
    const addMembers = (group, applicationIds) => {
      router.put(route("groups.update", group.group_id), {
        action: "addMembers",
        application_ids: applicationIds
      });
    };
    const getScheduleStatus = (group) => {
      if (!group.schedule) return "Not Scheduled";
      return group.schedule.status;
    };
    const getScheduleStatusClass = (group) => {
      const status = getScheduleStatus(group);
      return {
        "bg-yellow-100 text-yellow-800": status === "Not Scheduled",
        "bg-green-100 text-green-800": status === "Scheduled",
        "bg-blue-100 text-blue-800": status === "Completed"
      };
    };
    const createSchedule = (group) => {
      router.visit(route("schedules.create", { group: group.group_id }));
    };
    const viewGroup = (group) => {
      router.visit(route("groups.show", group.group_id));
    };
    const editGroup = (group) => {
      editingGroup.value = group;
      form.name = group.name;
      form.job_listing_id = group.job_listing_id;
      form.notes = group.notes;
      showModal.value = true;
    };
    const deleteGroup = (group) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          router.delete(route("groups.destroy", group.group_id), {
            onSuccess: () => {
              showSuccessAlert("delete");
            }
          });
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Application Groups" }, null, _parent));
      _push(ssrRenderComponent(HRLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { title: "Application Groups" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { title: "Application Groups" })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-5"${_scopeId}><div class="container-fluid px-4"${_scopeId}><div class="card shadow-sm rounded-lg overflow-hidden bg-white"${_scopeId}><div class="card-header bg-white py-4 px-4 border-b"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><h2 class="text-xl font-semibold"${_scopeId}>Application Groups</h2><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"${_scopeId}><i class="fas fa-plus mr-2"${_scopeId}></i> Create Group </button></div></div><div class="p-4"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId}> Group Name </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId}> Job Position </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId}> Members Count </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId}> Schedule Status </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.groups, (group) => {
              var _a;
              _push2(`<tr${_scopeId}><td class="px-6 py-4"${_scopeId}>${ssrInterpolate(group.name)}</td><td class="px-6 py-4"${_scopeId}>${ssrInterpolate(group.job_listing.position.position_name)}</td><td class="px-6 py-4"${_scopeId}>${ssrInterpolate(((_a = group.applications) == null ? void 0 : _a.length) || 0)} members </td><td class="px-6 py-4"${_scopeId}><span class="${ssrRenderClass([getScheduleStatusClass(group), "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getScheduleStatus(group))}</span></td><td class="px-6 py-4"${_scopeId}><button class="text-indigo-600 hover:text-indigo-900 mr-2" title="Add Members"${_scopeId}><i class="fas fa-user-plus"${_scopeId}></i></button><button class="text-blue-600 hover:text-blue-900 mr-2"${_scopeId}><i class="fas fa-eye"${_scopeId}></i></button><button class="text-green-600 hover:text-green-900 mr-2"${ssrIncludeBooleanAttr(!!group.schedule) ? " disabled" : ""}${_scopeId}><i class="fas fa-calendar-plus"${_scopeId}></i></button><button class="text-blue-600 hover:text-blue-900 mr-2"${_scopeId}><i class="fas fa-edit"${_scopeId}></i></button><button class="text-red-600 hover:text-red-900"${_scopeId}><i class="fas fa-trash"${_scopeId}></i></button></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              show: showModal.value,
              onClose: closeModal,
              title: editingGroup.value ? "Edit Group" : "Create New Group"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="py-4 px-10"${_scopeId2}><form class="space-y-4"${_scopeId2}><div class="space-y-4"${_scopeId2}><div${_scopeId2}><label class="block text-sm font-medium text-gray-700"${_scopeId2}> Group Name </label><input type="text"${ssrRenderAttr("value", unref(form).name)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required${_scopeId2}></div><div${_scopeId2}><label class="block text-sm font-medium text-gray-700"${_scopeId2}> Job Listing </label><select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required${_scopeId2}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).job_listing_id) ? ssrLooseContain(unref(form).job_listing_id, "") : ssrLooseEqual(unref(form).job_listing_id, "")) ? " selected" : ""}${_scopeId2}>Select Job Listing</option><!--[-->`);
                  ssrRenderList(__props.jobListings, (job) => {
                    _push3(`<option${ssrRenderAttr("value", job.job_listing_id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).job_listing_id) ? ssrLooseContain(unref(form).job_listing_id, job.job_listing_id) : ssrLooseEqual(unref(form).job_listing_id, job.job_listing_id)) ? " selected" : ""}${_scopeId2}>${ssrInterpolate(job.position.position_name)} - ${ssrInterpolate(job.title)}</option>`);
                  });
                  _push3(`<!--]--></select></div><div${_scopeId2}><label class="block text-sm font-medium text-gray-700"${_scopeId2}> Notes </label><textarea rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId2}>${ssrInterpolate(unref(form).notes)}</textarea></div></div><div class="mt-6 flex justify-end space-x-3"${_scopeId2}><button type="button" class="px-4 py-2 border rounded-md hover:bg-gray-50"${_scopeId2}> Cancel </button><button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""}${_scopeId2}>${ssrInterpolate(editingGroup.value ? "Update Group" : "Create Group")}</button></div></form></div>`);
                } else {
                  return [
                    createVNode("div", { class: "py-4 px-10" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(createGroup, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700" }, " Group Name "),
                            withDirectives(createVNode("input", {
                              type: "text",
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).name]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700" }, " Job Listing "),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(form).job_listing_id = $event,
                              class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                              required: ""
                            }, [
                              createVNode("option", { value: "" }, "Select Job Listing"),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.jobListings, (job) => {
                                return openBlock(), createBlock("option", {
                                  key: job.job_listing_id,
                                  value: job.job_listing_id
                                }, toDisplayString(job.position.position_name) + " - " + toDisplayString(job.title), 9, ["value"]);
                              }), 128))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).job_listing_id]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700" }, " Notes "),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                              rows: "3",
                              class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).notes]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "mt-6 flex justify-end space-x-3" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: closeModal,
                            class: "px-4 py-2 border rounded-md hover:bg-gray-50"
                          }, " Cancel "),
                          createVNode("button", {
                            type: "submit",
                            class: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
                            disabled: processing.value
                          }, toDisplayString(editingGroup.value ? "Update Group" : "Create Group"), 9, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "py-5" }, [
                createVNode("div", { class: "container-fluid px-4" }, [
                  createVNode("div", { class: "card shadow-sm rounded-lg overflow-hidden bg-white" }, [
                    createVNode("div", { class: "card-header bg-white py-4 px-4 border-b" }, [
                      createVNode("div", { class: "flex justify-between items-center" }, [
                        createVNode("h2", { class: "text-xl font-semibold" }, "Application Groups"),
                        createVNode("button", {
                          onClick: ($event) => showModal.value = true,
                          class: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        }, [
                          createVNode("i", { class: "fas fa-plus mr-2" }),
                          createTextVNode(" Create Group ")
                        ], 8, ["onClick"])
                      ])
                    ]),
                    createVNode("div", { class: "p-4" }, [
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, " Group Name "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, " Job Position "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, " Members Count "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, " Schedule Status "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, " Actions ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.groups, (group) => {
                              var _a;
                              return openBlock(), createBlock("tr", {
                                key: group.group_id
                              }, [
                                createVNode("td", { class: "px-6 py-4" }, toDisplayString(group.name), 1),
                                createVNode("td", { class: "px-6 py-4" }, toDisplayString(group.job_listing.position.position_name), 1),
                                createVNode("td", { class: "px-6 py-4" }, toDisplayString(((_a = group.applications) == null ? void 0 : _a.length) || 0) + " members ", 1),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("span", {
                                    class: ["px-2 inline-flex text-xs leading-5 font-semibold rounded-full", getScheduleStatusClass(group)]
                                  }, toDisplayString(getScheduleStatus(group)), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("button", {
                                    onClick: ($event) => addMembers(group),
                                    class: "text-indigo-600 hover:text-indigo-900 mr-2",
                                    title: "Add Members"
                                  }, [
                                    createVNode("i", { class: "fas fa-user-plus" })
                                  ], 8, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => viewGroup(group),
                                    class: "text-blue-600 hover:text-blue-900 mr-2"
                                  }, [
                                    createVNode("i", { class: "fas fa-eye" })
                                  ], 8, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => createSchedule(group),
                                    class: "text-green-600 hover:text-green-900 mr-2",
                                    disabled: !!group.schedule
                                  }, [
                                    createVNode("i", { class: "fas fa-calendar-plus" })
                                  ], 8, ["onClick", "disabled"]),
                                  createVNode("button", {
                                    onClick: ($event) => editGroup(group),
                                    class: "text-blue-600 hover:text-blue-900 mr-2"
                                  }, [
                                    createVNode("i", { class: "fas fa-edit" })
                                  ], 8, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => deleteGroup(group),
                                    class: "text-red-600 hover:text-red-900"
                                  }, [
                                    createVNode("i", { class: "fas fa-trash" })
                                  ], 8, ["onClick"])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$1, {
                show: showModal.value,
                onClose: closeModal,
                title: editingGroup.value ? "Edit Group" : "Create New Group"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "py-4 px-10" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(createGroup, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700" }, " Group Name "),
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).name]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700" }, " Job Listing "),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).job_listing_id = $event,
                            class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                            required: ""
                          }, [
                            createVNode("option", { value: "" }, "Select Job Listing"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.jobListings, (job) => {
                              return openBlock(), createBlock("option", {
                                key: job.job_listing_id,
                                value: job.job_listing_id
                              }, toDisplayString(job.position.position_name) + " - " + toDisplayString(job.title), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).job_listing_id]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700" }, " Notes "),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                            rows: "3",
                            class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).notes]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mt-6 flex justify-end space-x-3" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: closeModal,
                          class: "px-4 py-2 border rounded-md hover:bg-gray-50"
                        }, " Cancel "),
                        createVNode("button", {
                          type: "submit",
                          class: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
                          disabled: processing.value
                        }, toDisplayString(editingGroup.value ? "Update Group" : "Create Group"), 9, ["disabled"])
                      ])
                    ], 32)
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/HR/ApplicationGroup/GroupManagement.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
