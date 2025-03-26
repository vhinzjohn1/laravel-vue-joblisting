import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "JobDetails",
  __ssrInlineRender: true,
  setup(__props) {
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (_ctx.selectedApplicant) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "applicant-details" }, _attrs))}><div class="mb-6"><h3 class="text-xl font-semibold mb-4">Educational Background</h3><!--[-->`);
        ssrRenderList(_ctx.selectedApplicant.educational_backgrounds, (edu) => {
          _push(`<div class="mb-4 p-4 border rounded"><div class="grid grid-cols-2 gap-4"><div><span class="font-medium">Level:</span> ${ssrInterpolate(edu.level)}</div><div><span class="font-medium">School:</span> ${ssrInterpolate(edu.school_name)}</div><div><span class="font-medium">Course:</span> ${ssrInterpolate(edu.degree_course)}</div><div><span class="font-medium">Graduated:</span> ${ssrInterpolate(edu.year_graduated)}</div></div></div>`);
        });
        _push(`<!--]--></div><div class="mb-6"><h3 class="text-xl font-semibold mb-4">Training &amp; Certifications</h3><!--[-->`);
        ssrRenderList(_ctx.selectedApplicant.trainings, (training) => {
          _push(`<div class="mb-4 p-4 border rounded"><div class="grid grid-cols-2 gap-4"><div><span class="font-medium">Title:</span> ${ssrInterpolate(training.title)}</div><div><span class="font-medium">Institution:</span> ${ssrInterpolate(training.institution)}</div><div><span class="font-medium">Duration:</span> ${ssrInterpolate(training.duration_hours)} hours </div></div></div>`);
        });
        _push(`<!--]--></div><div class="mb-6"><h3 class="text-xl font-semibold mb-4">Work Experience</h3><!--[-->`);
        ssrRenderList(_ctx.selectedApplicant.work_experiences, (exp) => {
          _push(`<div class="mb-4 p-4 border rounded"><div class="grid grid-cols-2 gap-4"><div><span class="font-medium">Position:</span> ${ssrInterpolate(exp.position)}</div><div><span class="font-medium">Company:</span> ${ssrInterpolate(exp.company_name)}</div><div><span class="font-medium">Duration:</span> ${ssrInterpolate(formatDate(exp.start_date))} - ${ssrInterpolate(exp.is_current_job ? "Present" : formatDate(exp.end_date))}</div><div class="col-span-2"><span class="font-medium">Responsibilities:</span><p class="mt-1">${ssrInterpolate(exp.responsibilities)}</p></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/HR/ManageJobListing/JobDetails.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
