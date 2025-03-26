import { computed, ref, unref, createVNode, resolveDynamicComponent, withCtx, withModifiers, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderVNode } from "vue/server-renderer";
import { H as HRLayout } from "./HRLayout-Deg3lApQ.js";
import { A as AdminLayout } from "./AdminLayout-BD39AHzM.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$4 } from "./Header-VZTQj6rE.js";
import { _ as _sfc_main$1 } from "./DataTable-BR2biP7G.js";
import { _ as _sfc_main$2 } from "./Modal-Dr2ADp7V.js";
import { _ as _sfc_main$3 } from "./TextInput-DJ5KC4cX.js";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./NotificationBell-DssmmqXB.js";
const _sfc_main = {
  __name: "JobPositionDetails",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const userRole = computed(() => page.props.auth.user.role_name);
    const layouts = {
      admin: AdminLayout,
      hr: HRLayout
    };
    const form = useForm({
      position_name: "",
      item_number: "",
      years_experience: "",
      amount: "",
      position_id: "",
      salary_grade_id: ""
    });
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const localJobPosition = ref(page.props.positions || "");
    console.log(page.props.positions);
    const saveJobPosition = () => {
      axios.post(route("job-position.store"), form).then((response) => {
        showAddModal.value = false;
        form.reset();
        localJobPosition.value = response.data.data;
        showToast("add", true);
      }).catch((error) => {
        console.error(error);
        showToast("add", false, error.response.data.message);
      });
    };
    const showEdit = (item) => {
      form.position_name = item.position_name;
      form.item_number = item.item_number;
      form.years_experience = item.salary_grade.years_experience;
      form.amount = item.salary_grade.amount;
      form.position_id = item.position_id;
      form.salary_grade_id = item.salary_grade_id;
      showEditModal.value = true;
    };
    const editJobPosition = () => {
      axios.put(route("job-position.update", form.position_id), form).then((response) => {
        showEditModal.value = false;
        form.reset();
        localJobPosition.value = response.data.data;
        showToast("edit", true);
      }).catch((error) => {
        console.error(error);
        showToast("edit", false, error.response.data.message);
      });
    };
    const deleteJobPosition = (jobPosition) => {
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
          axios.delete(`job-position/${jobPosition.position_id}`).then((response) => {
            localJobPosition.value = response.data.data;
            showToast("delete", true);
          }).catch((error) => {
            console.error(error.message);
            showToast("delete", false);
          });
        }
      });
    };
    const closeModal = (action) => {
      if (action === "add") {
        showAddModal.value = false;
      } else if (action === "edit") {
        showEditModal.value = false;
        form.reset();
      }
    };
    const showToast = (action, isSuccess = true, message = "") => {
      let title, icon, background, toastOptions;
      switch (action) {
        case "add":
          title = isSuccess ? "Job Position Added Successfully!" : "Failed to Add Job Position.";
          break;
        case "edit":
          title = isSuccess ? "Job Position Updated Successfully!" : "Failed to Update Job Position.";
          break;
        case "delete":
          title = isSuccess ? "Job Position Deleted Successfully!" : "Failed to Delete Job Position.";
          break;
        default:
          title = isSuccess ? "Action Completed!" : "Action Failed!";
          break;
      }
      icon = isSuccess ? "success" : "error";
      background = isSuccess ? "#22c55e" : "#ef4444";
      toastOptions = {
        position: "top-end",
        icon,
        title,
        iconColor: "#ffffff",
        showConfirmButton: false,
        timer: 3e3,
        // Toast will disappear after 3 seconds
        toast: true,
        // Enable toast mode
        color: "#ffffff",
        background
      };
      if (message) {
        toastOptions.text = message;
      }
      Swal.fire(toastOptions);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Job Position Details" }, null, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(layouts[userRole.value]), null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, { title: "Job Position Details" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4, { title: "Job Position Details" })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 text-gray-900"${_scopeId}><div class="flex justify-between items-center mb-4"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}> Job Position </h3><button class="px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200"${_scopeId}> Add Job Position </button></div>`);
            if (localJobPosition.value.length === 0) {
              _push2(`<div class="text-center py-8 text-gray-500"${_scopeId}> No job positions found, please add one to proceed </div>`);
            } else {
              _push2(`<div class="space-y-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                data: localJobPosition.value,
                columns: [
                  { key: "position_id", title: "Position ID" },
                  { key: "position_name", title: "Position Name" },
                  { key: "item_number", title: "Item Number" },
                  { key: "salary_grade.years_experience", title: "Year Experience" },
                  { key: "salary_grade.amount", title: "Salary Grade", currency: "₱" }
                ],
                onEdit: showEdit,
                onDelete: deleteJobPosition
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div></div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: showAddModal.value,
              onClose: ($event) => closeModal("add"),
              maxWidth: "xl",
              title: "Add Job Position"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form${_scopeId2}><div class="p-5"${_scopeId2}><div class="flex flex-col item-center justify-center"${_scopeId2}><div class="form-group"${_scopeId2}><label for="name" class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}>Position Name</label>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    id: "name",
                    modelValue: unref(form).position_name,
                    "onUpdate:modelValue": ($event) => unref(form).position_name = $event,
                    required: "",
                    autofocus: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label for="item_number" class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}>Item Number</label>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    id: "item_number",
                    modelValue: unref(form).item_number,
                    "onUpdate:modelValue": ($event) => unref(form).item_number = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label for="years_experience" class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}>Year Experience</label>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    id: "years_experience",
                    modelValue: unref(form).years_experience,
                    "onUpdate:modelValue": ($event) => unref(form).years_experience = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label for="amount" class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}>Salary Grade</label>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    id: "amount",
                    modelValue: unref(form).amount,
                    "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex justify-end gap-5"${_scopeId2}><button type="button" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"${_scopeId2}>Cancel</button><button type="submit" class="px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200"${_scopeId2}>Save</button></div></div></div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(saveJobPosition, ["prevent"])
                    }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex flex-col item-center justify-center" }, [
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", {
                              for: "name",
                              class: "block text-sm font-medium text-gray-700 mb-1"
                            }, "Position Name"),
                            createVNode(_sfc_main$3, {
                              id: "name",
                              modelValue: unref(form).position_name,
                              "onUpdate:modelValue": ($event) => unref(form).position_name = $event,
                              required: "",
                              autofocus: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", {
                              for: "item_number",
                              class: "block text-sm font-medium text-gray-700 mb-1"
                            }, "Item Number"),
                            createVNode(_sfc_main$3, {
                              id: "item_number",
                              modelValue: unref(form).item_number,
                              "onUpdate:modelValue": ($event) => unref(form).item_number = $event,
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", {
                              for: "years_experience",
                              class: "block text-sm font-medium text-gray-700 mb-1"
                            }, "Year Experience"),
                            createVNode(_sfc_main$3, {
                              id: "years_experience",
                              modelValue: unref(form).years_experience,
                              "onUpdate:modelValue": ($event) => unref(form).years_experience = $event,
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", {
                              for: "amount",
                              class: "block text-sm font-medium text-gray-700 mb-1"
                            }, "Salary Grade"),
                            createVNode(_sfc_main$3, {
                              id: "amount",
                              modelValue: unref(form).amount,
                              "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "flex justify-end gap-5" }, [
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => closeModal("add"),
                              class: "px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                            }, "Cancel", 8, ["onClick"]),
                            createVNode("button", {
                              type: "submit",
                              class: "px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200"
                            }, "Save")
                          ])
                        ])
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: showEditModal.value,
              onClose: ($event) => closeModal("edit"),
              maxWidth: "xl",
              title: "Edit Job Position"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form${_scopeId2}><div class="p-5"${_scopeId2}><div class="flex flex-col item-center justify-center"${_scopeId2}><div class="form-group"${_scopeId2}><label for="name" class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}>Position Name</label>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    id: "name",
                    modelValue: unref(form).position_name,
                    "onUpdate:modelValue": ($event) => unref(form).position_name = $event,
                    required: "",
                    autofocus: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label for="item_number" class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}>Item Number</label>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    id: "item_number",
                    modelValue: unref(form).item_number,
                    "onUpdate:modelValue": ($event) => unref(form).item_number = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label for="years_experience" class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}>Year Experience</label>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    id: "years_experience",
                    modelValue: unref(form).years_experience,
                    "onUpdate:modelValue": ($event) => unref(form).years_experience = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label for="amount" class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}>Salary Grade</label>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    id: "amount",
                    modelValue: unref(form).amount,
                    "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex justify-end gap-5"${_scopeId2}><button type="button" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"${_scopeId2}>Cancel</button><button type="submit" class="px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200"${_scopeId2}>Save</button></div></div></div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(editJobPosition, ["prevent"])
                    }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex flex-col item-center justify-center" }, [
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", {
                              for: "name",
                              class: "block text-sm font-medium text-gray-700 mb-1"
                            }, "Position Name"),
                            createVNode(_sfc_main$3, {
                              id: "name",
                              modelValue: unref(form).position_name,
                              "onUpdate:modelValue": ($event) => unref(form).position_name = $event,
                              required: "",
                              autofocus: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", {
                              for: "item_number",
                              class: "block text-sm font-medium text-gray-700 mb-1"
                            }, "Item Number"),
                            createVNode(_sfc_main$3, {
                              id: "item_number",
                              modelValue: unref(form).item_number,
                              "onUpdate:modelValue": ($event) => unref(form).item_number = $event,
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", {
                              for: "years_experience",
                              class: "block text-sm font-medium text-gray-700 mb-1"
                            }, "Year Experience"),
                            createVNode(_sfc_main$3, {
                              id: "years_experience",
                              modelValue: unref(form).years_experience,
                              "onUpdate:modelValue": ($event) => unref(form).years_experience = $event,
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", {
                              for: "amount",
                              class: "block text-sm font-medium text-gray-700 mb-1"
                            }, "Salary Grade"),
                            createVNode(_sfc_main$3, {
                              id: "amount",
                              modelValue: unref(form).amount,
                              "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "flex justify-end gap-5" }, [
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => closeModal("edit"),
                              class: "px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                            }, "Cancel", 8, ["onClick"]),
                            createVNode("button", {
                              type: "submit",
                              class: "px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200"
                            }, "Save")
                          ])
                        ])
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "py-12" }, [
                  createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                      createVNode("div", { class: "p-6 text-gray-900" }, [
                        createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                          createVNode("h3", { class: "text-lg font-semibold" }, " Job Position "),
                          createVNode("button", {
                            onClick: ($event) => showAddModal.value = true,
                            class: "px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200"
                          }, " Add Job Position ", 8, ["onClick"])
                        ]),
                        localJobPosition.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center py-8 text-gray-500"
                        }, " No job positions found, please add one to proceed ")) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-4"
                        }, [
                          createVNode(_sfc_main$1, {
                            data: localJobPosition.value,
                            columns: [
                              { key: "position_id", title: "Position ID" },
                              { key: "position_name", title: "Position Name" },
                              { key: "item_number", title: "Item Number" },
                              { key: "salary_grade.years_experience", title: "Year Experience" },
                              { key: "salary_grade.amount", title: "Salary Grade", currency: "₱" }
                            ],
                            onEdit: showEdit,
                            onDelete: deleteJobPosition
                          }, null, 8, ["data"])
                        ]))
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$2, {
                show: showAddModal.value,
                onClose: ($event) => closeModal("add"),
                maxWidth: "xl",
                title: "Add Job Position"
              }, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(saveJobPosition, ["prevent"])
                  }, [
                    createVNode("div", { class: "p-5" }, [
                      createVNode("div", { class: "flex flex-col item-center justify-center" }, [
                        createVNode("div", { class: "form-group" }, [
                          createVNode("label", {
                            for: "name",
                            class: "block text-sm font-medium text-gray-700 mb-1"
                          }, "Position Name"),
                          createVNode(_sfc_main$3, {
                            id: "name",
                            modelValue: unref(form).position_name,
                            "onUpdate:modelValue": ($event) => unref(form).position_name = $event,
                            required: "",
                            autofocus: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "form-group" }, [
                          createVNode("label", {
                            for: "item_number",
                            class: "block text-sm font-medium text-gray-700 mb-1"
                          }, "Item Number"),
                          createVNode(_sfc_main$3, {
                            id: "item_number",
                            modelValue: unref(form).item_number,
                            "onUpdate:modelValue": ($event) => unref(form).item_number = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "form-group" }, [
                          createVNode("label", {
                            for: "years_experience",
                            class: "block text-sm font-medium text-gray-700 mb-1"
                          }, "Year Experience"),
                          createVNode(_sfc_main$3, {
                            id: "years_experience",
                            modelValue: unref(form).years_experience,
                            "onUpdate:modelValue": ($event) => unref(form).years_experience = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "form-group" }, [
                          createVNode("label", {
                            for: "amount",
                            class: "block text-sm font-medium text-gray-700 mb-1"
                          }, "Salary Grade"),
                          createVNode(_sfc_main$3, {
                            id: "amount",
                            modelValue: unref(form).amount,
                            "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "flex justify-end gap-5" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => closeModal("add"),
                            class: "px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                          }, "Cancel", 8, ["onClick"]),
                          createVNode("button", {
                            type: "submit",
                            class: "px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200"
                          }, "Save")
                        ])
                      ])
                    ])
                  ], 32)
                ]),
                _: 1
              }, 8, ["show", "onClose"]),
              createVNode(_sfc_main$2, {
                show: showEditModal.value,
                onClose: ($event) => closeModal("edit"),
                maxWidth: "xl",
                title: "Edit Job Position"
              }, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(editJobPosition, ["prevent"])
                  }, [
                    createVNode("div", { class: "p-5" }, [
                      createVNode("div", { class: "flex flex-col item-center justify-center" }, [
                        createVNode("div", { class: "form-group" }, [
                          createVNode("label", {
                            for: "name",
                            class: "block text-sm font-medium text-gray-700 mb-1"
                          }, "Position Name"),
                          createVNode(_sfc_main$3, {
                            id: "name",
                            modelValue: unref(form).position_name,
                            "onUpdate:modelValue": ($event) => unref(form).position_name = $event,
                            required: "",
                            autofocus: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "form-group" }, [
                          createVNode("label", {
                            for: "item_number",
                            class: "block text-sm font-medium text-gray-700 mb-1"
                          }, "Item Number"),
                          createVNode(_sfc_main$3, {
                            id: "item_number",
                            modelValue: unref(form).item_number,
                            "onUpdate:modelValue": ($event) => unref(form).item_number = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "form-group" }, [
                          createVNode("label", {
                            for: "years_experience",
                            class: "block text-sm font-medium text-gray-700 mb-1"
                          }, "Year Experience"),
                          createVNode(_sfc_main$3, {
                            id: "years_experience",
                            modelValue: unref(form).years_experience,
                            "onUpdate:modelValue": ($event) => unref(form).years_experience = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "form-group" }, [
                          createVNode("label", {
                            for: "amount",
                            class: "block text-sm font-medium text-gray-700 mb-1"
                          }, "Salary Grade"),
                          createVNode(_sfc_main$3, {
                            id: "amount",
                            modelValue: unref(form).amount,
                            "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "flex justify-end gap-5" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => closeModal("edit"),
                            class: "px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                          }, "Cancel", 8, ["onClick"]),
                          createVNode("button", {
                            type: "submit",
                            class: "px-4 py-2 bg-[#012f12] text-white rounded-lg hover:bg-[#034b1c] transition-colors duration-200"
                          }, "Save")
                        ])
                      ])
                    ])
                  ], 32)
                ]),
                _: 1
              }, 8, ["show", "onClose"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/HR/ManageJobDetails/JobPositionDetails.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
