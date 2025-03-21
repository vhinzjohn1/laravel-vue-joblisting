import { ref, onMounted, withCtx, createTextVNode, unref, createVNode, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./InputLabel-9qluswvY.js";
import { P as PrimaryButton } from "./PrimaryButton-CZbnR4E4.js";
import { _ as _sfc_main$1 } from "./Modal-Dr2ADp7V.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "TrainingCertificationsForm",
  __ssrInlineRender: true,
  emits: ["step-completed"],
  setup(__props, { emit: __emit }) {
    const trainings = ref([]);
    const showModal = ref(false);
    const form = useForm({
      title: "",
      institution: "",
      duration_hours: "",
      certificate_url: null
    });
    const emit = __emit;
    const fetchTrainings = async () => {
      const response = await axios.get(
        route("profile-details.index", "training")
      );
      trainings.value = response.data;
    };
    const addTraining = async () => {
      try {
        const response = await axios.post(
          route("profile-details.store", "training"),
          form.data(),
          {
            preserveScroll: true
          }
        );
        trainings.value.push(response.data);
        form.reset();
        showModal.value = false;
        showSuccessAlert("add");
        if (trainings.value.length > 0) {
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
          title = "Training Added Successfully!";
          break;
        case "update":
          title = "Training Updated Successfully!";
          break;
        case "delete":
          title = "Training Deleted Successfully!";
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
      fetchTrainings().then(() => {
        if (trainings.value.length > 0) {
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
            _push2(`Add Training`);
          } else {
            return [
              createTextVNode("Add Training")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Add Training",
        show: showModal.value,
        onClose: ($event) => showModal.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="space-y-6 px-10 py-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "title",
              value: "Training Title"
            }, null, _parent2, _scopeId));
            _push2(`<input id="title" type="text"${ssrRenderAttr("value", unref(form).title)} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.title
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "institution",
              value: "Institution"
            }, null, _parent2, _scopeId));
            _push2(`<input id="institution" type="text"${ssrRenderAttr("value", unref(form).institution)} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.institution
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "duration_hours",
              value: "Duration (Hours)"
            }, null, _parent2, _scopeId));
            _push2(`<input id="duration_hours" type="number"${ssrRenderAttr("value", unref(form).duration_hours)} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.duration_hours
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "certificate",
              value: "Certificate (Optional)"
            }, null, _parent2, _scopeId));
            _push2(`<input type="file" class="mt-1 block w-full" accept=".pdf,.jpg,.jpeg,.png"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.certificate_url
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
                onSubmit: withModifiers(addTraining, ["prevent"]),
                class: "space-y-6 px-10 py-4"
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "title",
                    value: "Training Title"
                  }),
                  withDirectives(createVNode("input", {
                    id: "title",
                    type: "text",
                    "onUpdate:modelValue": ($event) => unref(form).title = $event,
                    class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm",
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).title]
                  ]),
                  createVNode(_sfc_main$3, {
                    message: unref(form).errors.title
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "institution",
                    value: "Institution"
                  }),
                  withDirectives(createVNode("input", {
                    id: "institution",
                    type: "text",
                    "onUpdate:modelValue": ($event) => unref(form).institution = $event,
                    class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm",
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).institution]
                  ]),
                  createVNode(_sfc_main$3, {
                    message: unref(form).errors.institution
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "duration_hours",
                    value: "Duration (Hours)"
                  }),
                  withDirectives(createVNode("input", {
                    id: "duration_hours",
                    type: "number",
                    "onUpdate:modelValue": ($event) => unref(form).duration_hours = $event,
                    class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm",
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).duration_hours]
                  ]),
                  createVNode(_sfc_main$3, {
                    message: unref(form).errors.duration_hours
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "certificate",
                    value: "Certificate (Optional)"
                  }),
                  createVNode("input", {
                    type: "file",
                    onInput: ($event) => unref(form).certificate_url = $event.target.files[0],
                    class: "mt-1 block w-full",
                    accept: ".pdf,.jpg,.jpeg,.png"
                  }, null, 40, ["onInput"]),
                  createVNode(_sfc_main$3, {
                    message: unref(form).errors.certificate_url
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
      _push(`<div class="mt-6"><h3 class="text-lg font-medium text-gray-900"> Existing Trainings </h3><div class="mt-4 space-y-4"><!--[-->`);
      ssrRenderList(trainings.value, (training) => {
        _push(`<div class="bg-white p-4 rounded-lg shadow"><div class="flex justify-between items-start"><div><h4 class="font-medium">${ssrInterpolate(training.title)}</h4><p class="text-sm text-gray-600">${ssrInterpolate(training.institution)}</p><p class="text-sm text-gray-500"> Duration: ${ssrInterpolate(training.duration_hours)} hours </p></div><button class="text-red-600 hover:text-red-800"> Delete </button></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/TrainingCertificationsForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
