import { ref, onMounted, withCtx, createTextVNode, unref, createVNode, withModifiers, withDirectives, vModelSelect, vModelText, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./InputLabel-9qluswvY.js";
import { P as PrimaryButton } from "./PrimaryButton-CZbnR4E4.js";
import { _ as _sfc_main$1 } from "./Modal-Dr2ADp7V.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "EducationalBackgroundForm",
  __ssrInlineRender: true,
  emits: ["step-completed"],
  setup(__props, { emit: __emit }) {
    const educations = ref([]);
    const showModal = ref(false);
    const form = useForm({
      level: "",
      school_name: "",
      degree_course: "",
      year_graduated: "",
      honors_received: ""
    });
    const emit = __emit;
    const fetchEducations = async () => {
      const response = await axios.get(
        route("profile-details.index", "education")
      );
      educations.value = response.data;
    };
    const addEducation = async () => {
      try {
        const response = await axios.post(
          route("profile-details.store", "education"),
          form.data(),
          {
            preserveScroll: true
          }
        );
        educations.value.push(response.data);
        form.reset();
        showModal.value = false;
        showSuccessAlert("add");
        if (educations.value.length > 0) {
          emit("step-completed");
          emit("next-step");
        }
      } catch (error) {
        console.error(error.response.data);
      }
    };
    const showSuccessAlert = (action) => {
      let title;
      switch (action) {
        case "add":
          title = "Educational Background Added Successfully!";
          break;
        case "update":
          title = "Profile Updated Successfully!";
          break;
        case "delete":
          title = "Education Deleted Successfully!";
        default:
          title = "Action Completed!";
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
      fetchEducations().then(() => {
        if (educations.value.length > 0) {
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
            _push2(`Add Education`);
          } else {
            return [
              createTextVNode("Add Education")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Add Education",
        show: showModal.value,
        onClose: ($event) => showModal.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="space-y-6 px-10 py-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "level",
              value: "Level"
            }, null, _parent2, _scopeId));
            _push2(`<select id="level" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).level) ? ssrLooseContain(unref(form).level, "") : ssrLooseEqual(unref(form).level, "")) ? " selected" : ""}${_scopeId}>Select Level</option><option value="Elementary"${ssrIncludeBooleanAttr(Array.isArray(unref(form).level) ? ssrLooseContain(unref(form).level, "Elementary") : ssrLooseEqual(unref(form).level, "Elementary")) ? " selected" : ""}${_scopeId}>Elementary</option><option value="High School"${ssrIncludeBooleanAttr(Array.isArray(unref(form).level) ? ssrLooseContain(unref(form).level, "High School") : ssrLooseEqual(unref(form).level, "High School")) ? " selected" : ""}${_scopeId}>High School</option><option value="College"${ssrIncludeBooleanAttr(Array.isArray(unref(form).level) ? ssrLooseContain(unref(form).level, "College") : ssrLooseEqual(unref(form).level, "College")) ? " selected" : ""}${_scopeId}>College</option><option value="Graduate"${ssrIncludeBooleanAttr(Array.isArray(unref(form).level) ? ssrLooseContain(unref(form).level, "Graduate") : ssrLooseEqual(unref(form).level, "Graduate")) ? " selected" : ""}${_scopeId}>Graduate</option></select>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.level
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "school_name",
              value: "School Name"
            }, null, _parent2, _scopeId));
            _push2(`<input id="school_name" type="text"${ssrRenderAttr("value", unref(form).school_name)} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.school_name
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "degree_course",
              value: "Degree/Course"
            }, null, _parent2, _scopeId));
            _push2(`<input id="degree_course" type="text"${ssrRenderAttr("value", unref(form).degree_course)} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.degree_course
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "year_graduated",
              value: "Year Graduated"
            }, null, _parent2, _scopeId));
            _push2(`<input id="year_graduated" type="number"${ssrRenderAttr("value", unref(form).year_graduated)} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.year_graduated
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "honors_received",
              value: "Honors Received"
            }, null, _parent2, _scopeId));
            _push2(`<input id="honors_received" type="text"${ssrRenderAttr("value", unref(form).honors_received)} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.honors_received
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
                onSubmit: withModifiers(addEducation, ["prevent"]),
                class: "space-y-6 px-10 py-4"
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "level",
                    value: "Level"
                  }),
                  withDirectives(createVNode("select", {
                    id: "level",
                    "onUpdate:modelValue": ($event) => unref(form).level = $event,
                    class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm",
                    required: ""
                  }, [
                    createVNode("option", { value: "" }, "Select Level"),
                    createVNode("option", { value: "Elementary" }, "Elementary"),
                    createVNode("option", { value: "High School" }, "High School"),
                    createVNode("option", { value: "College" }, "College"),
                    createVNode("option", { value: "Graduate" }, "Graduate")
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(form).level]
                  ]),
                  createVNode(_sfc_main$3, {
                    message: unref(form).errors.level
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "school_name",
                    value: "School Name"
                  }),
                  withDirectives(createVNode("input", {
                    id: "school_name",
                    type: "text",
                    "onUpdate:modelValue": ($event) => unref(form).school_name = $event,
                    class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm",
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).school_name]
                  ]),
                  createVNode(_sfc_main$3, {
                    message: unref(form).errors.school_name
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "degree_course",
                    value: "Degree/Course"
                  }),
                  withDirectives(createVNode("input", {
                    id: "degree_course",
                    type: "text",
                    "onUpdate:modelValue": ($event) => unref(form).degree_course = $event,
                    class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm",
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).degree_course]
                  ]),
                  createVNode(_sfc_main$3, {
                    message: unref(form).errors.degree_course
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "year_graduated",
                    value: "Year Graduated"
                  }),
                  withDirectives(createVNode("input", {
                    id: "year_graduated",
                    type: "number",
                    "onUpdate:modelValue": ($event) => unref(form).year_graduated = $event,
                    class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm",
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).year_graduated]
                  ]),
                  createVNode(_sfc_main$3, {
                    message: unref(form).errors.year_graduated
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "honors_received",
                    value: "Honors Received"
                  }),
                  withDirectives(createVNode("input", {
                    id: "honors_received",
                    type: "text",
                    "onUpdate:modelValue": ($event) => unref(form).honors_received = $event,
                    class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).honors_received]
                  ]),
                  createVNode(_sfc_main$3, {
                    message: unref(form).errors.honors_received
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
      _push(`<div class="mt-6"><h3 class="text-lg font-medium text-gray-900"> Existing Education </h3><div class="mt-4 space-y-4"><!--[-->`);
      ssrRenderList(educations.value, (education) => {
        _push(`<div class="bg-white p-4 rounded-lg shadow"><div class="flex justify-between items-start"><div><h4 class="font-medium">${ssrInterpolate(education.degree_course)}</h4><p class="text-sm text-gray-600">${ssrInterpolate(education.school_name)}</p><p class="text-sm text-gray-500"> Level: ${ssrInterpolate(education.level)} | Graduated: ${ssrInterpolate(education.year_graduated)}</p>`);
        if (education.honors_received) {
          _push(`<p class="text-sm text-gray-500"> Honors: ${ssrInterpolate(education.honors_received)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button class="text-red-600 hover:text-red-800"> Delete </button></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/EducationalBackgroundForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
