import { ref, computed, onMounted, unref, createVNode, resolveDynamicComponent, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import _sfc_main$1 from "./EducationalBackgroundForm-DenlbHBF.js";
import _sfc_main$3 from "./TrainingCertificationsForm-DlCyNYLq.js";
import _sfc_main$2 from "./WorkExperienceForm-BIbT-4Sj.js";
import { P as PrimaryButton } from "./PrimaryButton-CZbnR4E4.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./InputLabel-9qluswvY.js";
import "./Modal-Dr2ADp7V.js";
const totalSteps = 3;
const _sfc_main = {
  __name: "CompleteProfile",
  __ssrInlineRender: true,
  setup(__props) {
    const user = usePage().props.auth.user;
    const currentStep = ref(1);
    const isLoading = ref(true);
    const showLogoutModal = ref(false);
    const asset = (path) => {
      return `/${path}`;
    };
    const steps = [
      {
        number: 1,
        title: "Educational Background",
        description: "Add your educational qualifications",
        component: _sfc_main$1
      },
      {
        number: 2,
        title: "Work Experience",
        description: "Add your professional work history",
        component: _sfc_main$2
      },
      {
        number: 3,
        title: "Training & Certifications",
        description: "Add your trainings and certifications",
        component: _sfc_main$3
      }
    ];
    const isStepComplete = ref({
      1: false,
      // Educational Background
      2: false,
      // Work Experience
      3: false
      // Training & Certifications
    });
    const markStepAsComplete = (step) => {
      isStepComplete.value[step] = true;
      console.log(isStepComplete.value);
    };
    const currentComponent = computed(() => {
      return steps[currentStep.value - 1].component;
    });
    const completeProfile = () => {
      axios.post(route("profile.mark-complete")).then(() => {
        Swal.fire({
          title: "Profile Completed!",
          text: "Your profile has been successfully completed.",
          icon: "success",
          color: "#000000",
          confirmButtonColor: "#22c55e",
          confirmButtonText: "Go to Job Listings",
          allowOutsideClick: () => false
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = route("job-application.index");
          }
        });
      }).catch((error) => {
        console.error("Error completing profile:", error);
        Swal.fire({
          title: "Error",
          text: "There was an error completing your profile. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444"
        });
      });
    };
    const determineInitialStep = async () => {
      try {
        const [educationResponse, experienceResponse, trainingResponse] = await Promise.all([
          axios.get(route("profile-details.index", "education")),
          axios.get(route("profile-details.index", "experience")),
          axios.get(route("profile-details.index", "training"))
        ]);
        if (educationResponse.data.length === 0) {
          currentStep.value = 1;
        } else if (experienceResponse.data.length === 0) {
          currentStep.value = 2;
          isStepComplete.value[1] = true;
        } else if (trainingResponse.data.length === 0) {
          currentStep.value = 3;
          isStepComplete.value[1] = true;
          isStepComplete.value[2] = true;
        } else {
          currentStep.value = 3;
          isStepComplete.value[1] = true;
          isStepComplete.value[2] = true;
          isStepComplete.value[3] = true;
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        isLoading.value = false;
      }
    };
    onMounted(() => {
      determineInitialStep();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><header class="fixed w-full bg-white shadow-md z-50 mb-10" data-v-99842137><nav class="container mx-auto px-4 sm:px-6 lg:px-8 py-3" data-v-99842137><div class="flex justify-between items-center" data-v-99842137><a href="/" class="flex items-center space-x-3" data-v-99842137><img${ssrRenderAttr("src", asset("img/cmulogo.png"))} alt="CMU Logo" class="w-10 h-10 sm:w-12 sm:h-12" data-v-99842137><span class="font-semibold text-green-800 text-sm sm:text-base lg:text-xl" data-v-99842137> Central Mindanao University </span></a><div data-v-99842137><button class="group rounded-lg p-1.5 text-black transition-colors duration-200" data-v-99842137><span class="text-sm font-medium leading-none text-gray-600" data-v-99842137>${ssrInterpolate(_ctx.$page.props.auth.user.email)}</span><i class="fas fa-sign-out-alt p-1 border rounded-md transition-colors duration-200 group-hover:bg-green-500" data-v-99842137></i></button></div></div></nav></header>`);
      if (showLogoutModal.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity" data-v-99842137><div class="relative w-full max-w-sm rounded-lg bg-white p-6 text-center" data-v-99842137><h3 class="mb-1 text-lg font-semibold text-black" data-v-99842137> Are you sure you want to log out? </h3><p class="mb-4 text-gray-800" data-v-99842137> Log out of <span class="text-black" data-v-99842137>${ssrInterpolate(unref(user).email)}?</span></p><div class="flex flex-col space-y-2" data-v-99842137><button class="w-full rounded-lg logout px-4 py-2 text-sm font-semibold bg-green-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-300" data-v-99842137> Log out </button><button class="w-full rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" data-v-99842137> Cancel </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(`<div class="flex justify-center items-center min-h-screen" data-v-99842137><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700" data-v-99842137></div></div>`);
      } else {
        _push(`<div class="py-12" data-v-99842137><div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-10" data-v-99842137><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6" data-v-99842137><div class="p-4 sm:p-6 md:p-8" data-v-99842137><h3 class="text-xl font-bold text-center mb-6" data-v-99842137> Profile Completion </h3><div class="block sm:hidden text-center" data-v-99842137><p class="text-lg font-medium mb-2" data-v-99842137> Step ${ssrInterpolate(currentStep.value)} of ${ssrInterpolate(totalSteps)}</p><p class="text-sm text-gray-600" data-v-99842137>${ssrInterpolate(steps[currentStep.value - 1].title)}</p></div><div class="hidden sm:flex items-center justify-between max-w-4xl mx-auto" data-v-99842137><!--[-->`);
        ssrRenderList(steps, (step, index) => {
          _push(`<!--[--><div class="flex flex-col items-center" data-v-99842137><div class="${ssrRenderClass([
            "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm cursor-pointer transition-colors",
            currentStep.value > step.number || isStepComplete.value[step.number] ? "bg-green-600 text-white" : currentStep.value === step.number ? "bg-green-100 text-green-800 ring-2 ring-green-600" : "bg-gray-100 text-gray-600"
          ])}" data-v-99842137>`);
          if (currentStep.value > step.number || isStepComplete.value[step.number]) {
            _push(`<span data-v-99842137><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-v-99842137><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" data-v-99842137></path></svg></span>`);
          } else {
            _push(`<span data-v-99842137>${ssrInterpolate(step.number)}</span>`);
          }
          _push(`</div><p class="${ssrRenderClass([
            "mt-2 text-sm font-medium",
            currentStep.value === step.number ? "text-green-800" : "text-gray-600"
          ])}" data-v-99842137>${ssrInterpolate(step.title)}</p></div>`);
          if (index < steps.length - 1) {
            _push(`<div class="flex-1 h-1 mx-2 bg-gray-200" data-v-99842137><div class="${ssrRenderClass([
              "h-full bg-green-600 transition-all duration-500",
              currentStep.value > step.number ? "w-full" : "w-0"
            ])}" data-v-99842137></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div></div></div><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6" data-v-99842137><div class="p-4 sm:p-6 md:p-8" data-v-99842137><h3 class="text-lg font-medium mb-4" data-v-99842137>${ssrInterpolate(steps[currentStep.value - 1].title)}</h3><p class="text-gray-600 mb-6" data-v-99842137>${ssrInterpolate(steps[currentStep.value - 1].description)}</p>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(currentComponent.value), {
          onStepCompleted: ($event) => markStepAsComplete(currentStep.value)
        }, null), _parent);
        _push(`</div></div><div class="flex justify-between items-center mt-8" data-v-99842137>`);
        if (currentStep.value > 1) {
          _push(`<button class="px-6 py-2 border-2 border-gray-300 rounded-lg hover:border-green-700 transition-colors font-medium flex items-center" data-v-99842137><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor" data-v-99842137><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" data-v-99842137></path></svg> Previous </button>`);
        } else {
          _push(`<div class="w-24" data-v-99842137></div>`);
        }
        if (currentStep.value < totalSteps) {
          _push(`<div class="flex space-x-4" data-v-99842137><button class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium" data-v-99842137> Skip for now </button><button class="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium flex items-center" data-v-99842137> Next <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor" data-v-99842137><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-99842137></path></svg></button></div>`);
        } else {
          _push(ssrRenderComponent(PrimaryButton, {
            onClick: completeProfile,
            class: "px-6 py-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Complete Profile `);
              } else {
                return [
                  createTextVNode(" Complete Profile ")
                ];
              }
            }),
            _: 1
          }, _parent));
        }
        _push(`</div></div></div>`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/CompleteProfile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CompleteProfile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-99842137"]]);
export {
  CompleteProfile as default
};
