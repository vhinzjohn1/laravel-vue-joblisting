import { ref, onMounted, withCtx, createTextVNode, unref, createVNode, withModifiers, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./InputLabel-9qluswvY.js";
import { P as PrimaryButton } from "./PrimaryButton-CZbnR4E4.js";
import { _ as _sfc_main$1 } from "./Modal-Dr2ADp7V.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "WorkExperienceForm",
  __ssrInlineRender: true,
  emits: ["step-completed"],
  setup(__props, { emit: __emit }) {
    const experiences = ref([]);
    const showModal = ref(false);
    const form = useForm({
      position: "",
      company_name: "",
      start_date: "",
      end_date: "",
      is_current_job: false,
      responsibilities: ""
    });
    const emit = __emit;
    const fetchExperiences = async () => {
      const response = await axios.get(
        route("profile-details.index", "experience")
      );
      experiences.value = response.data;
    };
    const addExperience = async () => {
      try {
        const response = await axios.post(
          route("profile-details.store", "experience"),
          form.data(),
          {
            preserveScroll: true
          }
        );
        experiences.value.push(response.data);
        form.reset();
        showModal.value = false;
        showSuccessAlert("add");
        if (experiences.value.length > 0) {
          emit("step-completed");
        }
      } catch (error) {
        console.error(error.response.data);
      }
    };
    const showSuccessAlert = (action) => {
      let title;
      switch (action) {
        case "add":
          title = "Experience Added Successfully!";
          break;
        case "update":
          title = "Experience Updated Successfully!";
          break;
        case "delete":
          title = "Experience Deleted Successfully!";
          break;
        default:
          title = "Action Completed!";
          text = "The operation was successful.";
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title,
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
    onMounted(() => {
      fetchExperiences().then(() => {
        if (experiences.value.length > 0) {
          emit("step-completed");
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(PrimaryButton, {
        onClick: ($event) => showModal.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Add Experience`);
          } else {
            return [
              createTextVNode("Add Experience")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Add Experience",
        show: showModal.value,
        onClose: ($event) => showModal.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="space-y-6 px-10 py-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "position",
              value: "Position"
            }, null, _parent2, _scopeId));
            _push2(`<input id="position" type="text"${ssrRenderAttr("value", unref(form).position)} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.position
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "company_name",
              value: "Company Name"
            }, null, _parent2, _scopeId));
            _push2(`<input id="company_name" type="text"${ssrRenderAttr("value", unref(form).company_name)} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.company_name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "start_date",
              value: "Start Date"
            }, null, _parent2, _scopeId));
            _push2(`<input id="start_date" type="date"${ssrRenderAttr("value", unref(form).start_date)} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.start_date
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "end_date",
              value: "End Date"
            }, null, _parent2, _scopeId));
            _push2(`<input id="end_date" type="date"${ssrRenderAttr("value", unref(form).end_date)}${ssrIncludeBooleanAttr(unref(form).is_current_job) ? " disabled" : ""} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"${ssrIncludeBooleanAttr(!unref(form).is_current_job) ? " required" : ""}${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.end_date
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex items-center"${_scopeId}><input id="is_current_job" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_current_job) ? ssrLooseContain(unref(form).is_current_job, null) : unref(form).is_current_job) ? " checked" : ""} class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"${_scopeId}><label for="is_current_job" class="ml-2 text-sm text-gray-600"${_scopeId}>This is my current job</label></div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "responsibilities",
              value: "Responsibilities"
            }, null, _parent2, _scopeId));
            _push2(`<textarea id="responsibilities" rows="4" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required${_scopeId}>${ssrInterpolate(unref(form).responsibilities)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.responsibilities
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Save`);
                } else {
                  return [
                    createTextVNode("Save")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(addExperience, ["prevent"]),
                class: "space-y-6 px-10 py-4"
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "position",
                    value: "Position"
                  }),
                  withDirectives(createVNode("input", {
                    id: "position",
                    type: "text",
                    "onUpdate:modelValue": ($event) => unref(form).position = $event,
                    class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm",
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).position]
                  ]),
                  createVNode(_sfc_main$3, {
                    message: unref(form).errors.position
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "company_name",
                    value: "Company Name"
                  }),
                  withDirectives(createVNode("input", {
                    id: "company_name",
                    type: "text",
                    "onUpdate:modelValue": ($event) => unref(form).company_name = $event,
                    class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm",
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).company_name]
                  ]),
                  createVNode(_sfc_main$3, {
                    message: unref(form).errors.company_name
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode("div", null, [
                    createVNode(_sfc_main$2, {
                      for: "start_date",
                      value: "Start Date"
                    }),
                    withDirectives(createVNode("input", {
                      id: "start_date",
                      type: "date",
                      "onUpdate:modelValue": ($event) => unref(form).start_date = $event,
                      class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).start_date]
                    ]),
                    createVNode(_sfc_main$3, {
                      message: unref(form).errors.start_date
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$2, {
                      for: "end_date",
                      value: "End Date"
                    }),
                    withDirectives(createVNode("input", {
                      id: "end_date",
                      type: "date",
                      "onUpdate:modelValue": ($event) => unref(form).end_date = $event,
                      disabled: unref(form).is_current_job,
                      class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm",
                      required: !unref(form).is_current_job
                    }, null, 8, ["onUpdate:modelValue", "disabled", "required"]), [
                      [vModelText, unref(form).end_date]
                    ]),
                    createVNode(_sfc_main$3, {
                      message: unref(form).errors.end_date
                    }, null, 8, ["message"])
                  ])
                ]),
                createVNode("div", { class: "flex items-center" }, [
                  withDirectives(createVNode("input", {
                    id: "is_current_job",
                    type: "checkbox",
                    "onUpdate:modelValue": ($event) => unref(form).is_current_job = $event,
                    class: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelCheckbox, unref(form).is_current_job]
                  ]),
                  createVNode("label", {
                    for: "is_current_job",
                    class: "ml-2 text-sm text-gray-600"
                  }, "This is my current job")
                ]),
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "responsibilities",
                    value: "Responsibilities"
                  }),
                  withDirectives(createVNode("textarea", {
                    id: "responsibilities",
                    "onUpdate:modelValue": ($event) => unref(form).responsibilities = $event,
                    rows: "4",
                    class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm",
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).responsibilities]
                  ]),
                  createVNode(_sfc_main$3, {
                    message: unref(form).errors.responsibilities
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode(PrimaryButton, {
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Save")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-6"><h3 class="text-lg font-medium text-gray-900"> Existing Work Experience </h3><div class="mt-4 space-y-4"><!--[-->`);
      ssrRenderList(experiences.value, (experience) => {
        _push(`<div class="bg-white p-4 rounded-lg shadow"><div class="flex justify-between items-start"><div><h4 class="font-medium">${ssrInterpolate(experience.position)}</h4><p class="text-sm text-gray-600">${ssrInterpolate(experience.company_name)}</p><p class="text-sm text-gray-500">${ssrInterpolate(new Date(
          experience.start_date
        ).toLocaleDateString())} - ${ssrInterpolate(experience.is_current_job ? "Present" : new Date(
          experience.end_date
        ).toLocaleDateString())}</p><p class="text-sm text-gray-600 mt-2">${ssrInterpolate(experience.responsibilities)}</p></div><button class="text-red-600 hover:text-red-800"> Delete </button></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/WorkExperienceForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
