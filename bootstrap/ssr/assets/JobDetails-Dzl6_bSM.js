import { computed, mergeProps, withCtx, unref, createVNode, withModifiers, toDisplayString, createBlock, createCommentVNode, createTextVNode, openBlock, withDirectives, vModelText, vModelCheckbox, useSSRContext, ref, Fragment, renderList } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderStyle, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { useForm, usePage, Head } from "@inertiajs/vue3";
import { A as ApplicantLayout } from "./ApplicantLayout-C8saV4-b.js";
import { _ as _sfc_main$4 } from "./Header-VZTQj6rE.js";
import { _ as _sfc_main$3 } from "./Breadcrumbs-BdN6WHN9.js";
import { _ as _sfc_main$2 } from "./Modal-Dr2ADp7V.js";
import { C as CustomSelect } from "./CustomSelect-wXlHRS75.js";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./NotificationBell-DssmmqXB.js";
import "./TextInput-DJ5KC4cX.js";
const _sfc_main$1 = {
  __name: "ApplicationForm",
  __ssrInlineRender: true,
  props: {
    job: {
      type: Object,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    existingEducation: {
      type: Array,
      default: () => []
    },
    existingTrainings: {
      type: Array,
      default: () => []
    },
    existingExperiences: {
      type: Array,
      default: () => []
    }
  },
  emits: ["close", "submitted"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = useForm({
      job_listing_id: props.job.job_listing_id,
      education: [
        {
          education_id: "",
          level: "",
          school_name: "",
          degree_course: "",
          year_graduated: ""
        }
      ],
      trainings: [
        { training_id: "", title: "", institution: "", duration_hours: "" }
      ],
      experiences: [
        {
          experience_id: "",
          position: "",
          company_name: "",
          start_date: "",
          end_date: "",
          is_current_job: false,
          responsibilities: ""
        }
      ],
      application_document: null
    });
    const onEducationSelect = (selected) => {
      const lastIndex = form.education.length - 1;
      form.education[lastIndex] = {
        education_id: selected.education_id,
        level: selected.level,
        school_name: selected.school_name,
        degree_course: selected.degree_course,
        year_graduated: selected.year_graduated
      };
    };
    const onTrainingSelect = (selected) => {
      const lastIndex = form.trainings.length - 1;
      form.trainings[lastIndex] = {
        training_id: selected.training_id,
        title: selected.title,
        institution: selected.institution,
        duration_hours: selected.duration_hours
      };
    };
    const onExperienceSelect = (selected) => {
      const lastIndex = form.experiences.length - 1;
      form.experiences[lastIndex] = {
        experience_id: selected.experience_id,
        position: selected.position,
        company_name: selected.company_name,
        start_date: selected.start_date,
        end_date: selected.end_date,
        is_current_job: selected.is_current_job,
        responsibilities: selected.responsibilities
      };
    };
    const clearEducation = () => {
      form.education[0] = {
        education_id: "",
        level: "",
        school_name: "",
        degree_course: "",
        year_graduated: ""
      };
    };
    const clearTraining = () => {
      form.trainings[0] = {
        training_id: "",
        title: "",
        institution: "",
        duration_hours: ""
      };
    };
    const clearExperience = () => {
      form.experiences[0] = {
        experience_id: "",
        position: "",
        company_name: "",
        start_date: "",
        end_date: "",
        is_current_job: false,
        responsibilities: ""
      };
    };
    const educationOptions = computed(() => props.existingEducation);
    const trainingOptions = computed(() => props.existingTrainings);
    const experienceOptions = computed(() => props.existingExperiences);
    const closeModal = () => {
      emit("close");
    };
    const submitApplication = () => {
      form.post(route("job-application.store"), {
        onSuccess: (response) => {
          emit("submitted", response);
          showToast("Application Submitted Successfully");
        },
        onError: (errors) => {
          console.error("Form submission error: ", errors);
        }
      });
    };
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        form.application_document = file;
      }
    };
    const showToast = (message) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        iconColor: "#ffffff",
        showConfirmButton: false,
        timer: 4e3,
        // Toast will disappear after 4 seconds
        toast: true,
        // Enable toast mode
        color: "#ffffff",
        background: "#22c55e"
      });
      a;
    };
    const formatFileSize = (size) => {
      if (size === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(size) / Math.log(k));
      return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    const removeFile = () => {
      form.application_document = null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        title: __props.job.title,
        show: __props.isOpen,
        onClose: closeModal,
        "max-width": "7xl"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-8 bg-gradient-to-br from-green-50 to-white"${_scopeId}><form${_scopeId}><div class="mb-8 border-l-4 border-green-800 pl-4"${_scopeId}><h3 class="text-xl font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(__props.job.title)} - ${ssrInterpolate(__props.job.position.position_name)}</h3><p class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(__props.job.category.name)} | Closes on ${ssrInterpolate(new Date(__props.job.closing_date).toLocaleDateString())}</p></div><div class="mb-8 bg-white rounded-xl shadow-sm p-6 border border-green-100"${_scopeId}><div class="flex justify-between items-center mb-4"${_scopeId}><h6 class="text-lg font-semibold text-gray-800 flex items-center"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v7"${_scopeId}></path></svg> Educational Background </h6><div class="flex space-x-4"${_scopeId}>`);
            _push2(ssrRenderComponent(CustomSelect, {
              class: "w-64",
              placeholder: "Select from existing education",
              options: educationOptions.value,
              displayFormat: (option) => `${option.degree_course} - ${option.school_name}`,
              valueKey: "education_id",
              onSelect: onEducationSelect
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Education Level</label><input type="text"${ssrRenderAttr("value", unref(form).education[0].level)}${ssrIncludeBooleanAttr(!!unref(form).education[0].education_id) ? " disabled" : ""} class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>School/University</label><input type="text"${ssrRenderAttr("value", unref(form).education[0].school_name)}${ssrIncludeBooleanAttr(!!unref(form).education[0].education_id) ? " disabled" : ""} class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Degree/Course</label><input type="text"${ssrRenderAttr("value", unref(form).education[0].degree_course)}${ssrIncludeBooleanAttr(!!unref(form).education[0].education_id) ? " disabled" : ""} class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Year Graduated</label><input type="text"${ssrRenderAttr("value", unref(form).education[0].year_graduated)}${ssrIncludeBooleanAttr(!!unref(form).education[0].education_id) ? " disabled" : ""} class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"${_scopeId}></div></div>`);
            if (unref(form).education[0].education_id) {
              _push2(`<div class="mt-3 flex justify-end"${_scopeId}><button type="button" class="text-xs text-gray-600 hover:text-gray-800 flex items-center"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg> Clear selection </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-8 bg-white rounded-xl shadow-sm p-6 border border-green-100"${_scopeId}><div class="flex justify-between items-center mb-4"${_scopeId}><h6 class="text-lg font-semibold text-gray-800 flex items-center"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"${_scopeId}></path></svg> Training &amp; Certifications </h6><div class="flex space-x-4"${_scopeId}>`);
            _push2(ssrRenderComponent(CustomSelect, {
              class: "w-64",
              placeholder: "Select from existing training",
              options: trainingOptions.value,
              displayFormat: (option) => `${option.title} - ${option.institution}`,
              valueKey: "training_id",
              onSelect: onTrainingSelect
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Training Title</label><input type="text"${ssrRenderAttr("value", unref(form).trainings[0].title)}${ssrIncludeBooleanAttr(!!unref(form).trainings[0].training_id) ? " disabled" : ""} class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Institution/Provider</label><input type="text"${ssrRenderAttr("value", unref(form).trainings[0].institution)}${ssrIncludeBooleanAttr(!!unref(form).trainings[0].training_id) ? " disabled" : ""} class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Duration (Hours)</label><input type="number"${ssrRenderAttr("value", unref(form).trainings[0].duration_hours)}${ssrIncludeBooleanAttr(!!unref(form).trainings[0].training_id) ? " disabled" : ""} class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"${_scopeId}></div></div>`);
            if (unref(form).trainings[0].training_id) {
              _push2(`<div class="mt-3 flex justify-end"${_scopeId}><button type="button" class="text-xs text-gray-600 hover:text-gray-800 flex items-center"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg> Clear selection </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-8 bg-white rounded-xl shadow-sm p-6 border border-green-100"${_scopeId}><div class="flex justify-between items-center mb-4"${_scopeId}><h6 class="text-lg font-semibold text-gray-800 flex items-center"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg> Work Experience </h6><div class="flex space-x-4"${_scopeId}>`);
            _push2(ssrRenderComponent(CustomSelect, {
              class: "w-64",
              placeholder: "Select from existing experience",
              options: experienceOptions.value,
              displayFormat: (option) => `${option.position} at ${option.company_name}`,
              valueKey: "experience_id",
              onSelect: onExperienceSelect
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Position</label><input type="text"${ssrRenderAttr("value", unref(form).experiences[0].position)}${ssrIncludeBooleanAttr(!!unref(form).experiences[0].experience_id) ? " disabled" : ""} class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Company</label><input type="text"${ssrRenderAttr("value", unref(form).experiences[0].company_name)}${ssrIncludeBooleanAttr(!!unref(form).experiences[0].experience_id) ? " disabled" : ""} class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Start Date</label><input type="date"${ssrRenderAttr("value", unref(form).experiences[0].start_date)}${ssrIncludeBooleanAttr(!!unref(form).experiences[0].experience_id) ? " disabled" : ""} class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>End Date</label><input type="date"${ssrRenderAttr("value", unref(form).experiences[0].end_date)}${ssrIncludeBooleanAttr(
              !!unref(form).experiences[0].experience_id || unref(form).experiences[0].is_current_job
            ) ? " disabled" : ""} class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"${_scopeId}></div><div${_scopeId}><label class="flex items-center space-x-2 mt-2"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).experiences[0].is_current_job) ? ssrLooseContain(unref(form).experiences[0].is_current_job, null) : unref(form).experiences[0].is_current_job) ? " checked" : ""}${ssrIncludeBooleanAttr(
              !!unref(form).experiences[0].experience_id
            ) ? " disabled" : ""} class="rounded-sm text-green-600 focus:ring-green-500"${_scopeId}><span class="text-sm text-gray-700"${_scopeId}>Current Job</span></label></div></div><div class="mt-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Responsibilities</label><textarea${ssrIncludeBooleanAttr(!!unref(form).experiences[0].experience_id) ? " disabled" : ""} rows="3" class="w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"${_scopeId}>${ssrInterpolate(unref(form).experiences[0].responsibilities)}</textarea></div>`);
            if (unref(form).experiences[0].experience_id) {
              _push2(`<div class="mt-3 flex justify-end"${_scopeId}><button type="button" class="text-xs text-gray-600 hover:text-gray-800 flex items-center"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg> Clear selection </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-white rounded-xl shadow-sm p-6 mb-8 border border-green-100"${_scopeId}><h6 class="text-lg font-semibold text-gray-800 flex items-center mb-4"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg> Supporting Documents </h6><div class="border-2 border-dashed border-green-200 rounded-lg p-6 bg-green-50 transition duration-300 hover:bg-green-100"${_scopeId}><input type="file" class="hidden" id="file-upload" accept=".pdf,.doc,.docx"${_scopeId}>`);
            if (!unref(form).application_document) {
              _push2(`<label for="file-upload" class="cursor-pointer text-center block"${_scopeId}><svg class="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"${_scopeId}></path></svg><span class="mt-2 block text-sm font-medium text-gray-700"${_scopeId}> Drop your resume here or click to upload </span><span class="mt-1 text-xs text-gray-600"${_scopeId}> Supported formats: PDF, DOC, DOCX </span></label>`);
            } else {
              _push2(`<div class="flex items-center justify-between"${_scopeId}><div class="flex items-center space-x-3"${_scopeId}><svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg><div class="flex flex-col"${_scopeId}><span class="text-sm font-medium text-gray-800"${_scopeId}>${ssrInterpolate(unref(form).application_document.name)}</span><span class="text-xs text-gray-600"${_scopeId}>${ssrInterpolate(formatFileSize(
                unref(form).application_document.size
              ))}</span></div></div><button type="button" class="text-green-500 hover:text-green-700 transition-colors"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div>`);
            }
            _push2(`</div></div><div class="flex justify-end space-x-4"${_scopeId}><button type="button" class="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition font-medium"${_scopeId}> Cancel </button><button type="submit" class="px-6 py-2.5 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium shadow-sm"${_scopeId}> Submit Application </button></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "p-8 bg-gradient-to-br from-green-50 to-white" }, [
                createVNode("form", {
                  onSubmit: withModifiers(submitApplication, ["prevent"])
                }, [
                  createVNode("div", { class: "mb-8 border-l-4 border-green-800 pl-4" }, [
                    createVNode("h3", { class: "text-xl font-semibold text-gray-800" }, toDisplayString(__props.job.title) + " - " + toDisplayString(__props.job.position.position_name), 1),
                    createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(__props.job.category.name) + " | Closes on " + toDisplayString(new Date(__props.job.closing_date).toLocaleDateString()), 1)
                  ]),
                  createVNode("div", { class: "mb-8 bg-white rounded-xl shadow-sm p-6 border border-green-100" }, [
                    createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                      createVNode("h6", { class: "text-lg font-semibold text-gray-800 flex items-center" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-5 w-5 mr-2 text-green-700",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 14l9-5-9-5-9 5 9 5z"
                          }),
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 14l9-5-9-5-9 5 9 5z"
                          }),
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 14v7"
                          })
                        ])),
                        createTextVNode(" Educational Background ")
                      ]),
                      createVNode("div", { class: "flex space-x-4" }, [
                        createVNode(CustomSelect, {
                          class: "w-64",
                          placeholder: "Select from existing education",
                          options: educationOptions.value,
                          displayFormat: (option) => `${option.degree_course} - ${option.school_name}`,
                          valueKey: "education_id",
                          onSelect: onEducationSelect
                        }, null, 8, ["options", "displayFormat"])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Education Level"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).education[0].level = $event,
                          disabled: !!unref(form).education[0].education_id,
                          class: "w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                        }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelText, unref(form).education[0].level]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "School/University"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).education[0].school_name = $event,
                          disabled: !!unref(form).education[0].education_id,
                          class: "w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                        }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelText, unref(form).education[0].school_name]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Degree/Course"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).education[0].degree_course = $event,
                          disabled: !!unref(form).education[0].education_id,
                          class: "w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                        }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelText, unref(form).education[0].degree_course]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Year Graduated"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).education[0].year_graduated = $event,
                          disabled: !!unref(form).education[0].education_id,
                          class: "w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                        }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelText, unref(form).education[0].year_graduated]
                        ])
                      ])
                    ]),
                    unref(form).education[0].education_id ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-3 flex justify-end"
                    }, [
                      createVNode("button", {
                        onClick: clearEducation,
                        type: "button",
                        class: "text-xs text-gray-600 hover:text-gray-800 flex items-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-4 w-4 mr-1",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M6 18L18 6M6 6l12 12"
                          })
                        ])),
                        createTextVNode(" Clear selection ")
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "mb-8 bg-white rounded-xl shadow-sm p-6 border border-green-100" }, [
                    createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                      createVNode("h6", { class: "text-lg font-semibold text-gray-800 flex items-center" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-5 w-5 mr-2 text-green-700",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          })
                        ])),
                        createTextVNode(" Training & Certifications ")
                      ]),
                      createVNode("div", { class: "flex space-x-4" }, [
                        createVNode(CustomSelect, {
                          class: "w-64",
                          placeholder: "Select from existing training",
                          options: trainingOptions.value,
                          displayFormat: (option) => `${option.title} - ${option.institution}`,
                          valueKey: "training_id",
                          onSelect: onTrainingSelect
                        }, null, 8, ["options", "displayFormat"])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Training Title"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).trainings[0].title = $event,
                          disabled: !!unref(form).trainings[0].training_id,
                          class: "w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                        }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelText, unref(form).trainings[0].title]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Institution/Provider"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).trainings[0].institution = $event,
                          disabled: !!unref(form).trainings[0].training_id,
                          class: "w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                        }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelText, unref(form).trainings[0].institution]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Duration (Hours)"),
                        withDirectives(createVNode("input", {
                          type: "number",
                          "onUpdate:modelValue": ($event) => unref(form).trainings[0].duration_hours = $event,
                          disabled: !!unref(form).trainings[0].training_id,
                          class: "w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                        }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelText, unref(form).trainings[0].duration_hours]
                        ])
                      ])
                    ]),
                    unref(form).trainings[0].training_id ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-3 flex justify-end"
                    }, [
                      createVNode("button", {
                        onClick: clearTraining,
                        type: "button",
                        class: "text-xs text-gray-600 hover:text-gray-800 flex items-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-4 w-4 mr-1",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M6 18L18 6M6 6l12 12"
                          })
                        ])),
                        createTextVNode(" Clear selection ")
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "mb-8 bg-white rounded-xl shadow-sm p-6 border border-green-100" }, [
                    createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                      createVNode("h6", { class: "text-lg font-semibold text-gray-800 flex items-center" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-5 w-5 mr-2 text-green-700",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          })
                        ])),
                        createTextVNode(" Work Experience ")
                      ]),
                      createVNode("div", { class: "flex space-x-4" }, [
                        createVNode(CustomSelect, {
                          class: "w-64",
                          placeholder: "Select from existing experience",
                          options: experienceOptions.value,
                          displayFormat: (option) => `${option.position} at ${option.company_name}`,
                          valueKey: "experience_id",
                          onSelect: onExperienceSelect
                        }, null, 8, ["options", "displayFormat"])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Position"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).experiences[0].position = $event,
                          disabled: !!unref(form).experiences[0].experience_id,
                          class: "w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                        }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelText, unref(form).experiences[0].position]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Company"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).experiences[0].company_name = $event,
                          disabled: !!unref(form).experiences[0].experience_id,
                          class: "w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                        }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelText, unref(form).experiences[0].company_name]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Start Date"),
                        withDirectives(createVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": ($event) => unref(form).experiences[0].start_date = $event,
                          disabled: !!unref(form).experiences[0].experience_id,
                          class: "w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                        }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelText, unref(form).experiences[0].start_date]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "End Date"),
                        withDirectives(createVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": ($event) => unref(form).experiences[0].end_date = $event,
                          disabled: !!unref(form).experiences[0].experience_id || unref(form).experiences[0].is_current_job,
                          class: "w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                        }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelText, unref(form).experiences[0].end_date]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "flex items-center space-x-2 mt-2" }, [
                          withDirectives(createVNode("input", {
                            type: "checkbox",
                            "onUpdate:modelValue": ($event) => unref(form).experiences[0].is_current_job = $event,
                            disabled: !!unref(form).experiences[0].experience_id,
                            class: "rounded-sm text-green-600 focus:ring-green-500"
                          }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                            [vModelCheckbox, unref(form).experiences[0].is_current_job]
                          ]),
                          createVNode("span", { class: "text-sm text-gray-700" }, "Current Job")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "mt-4" }, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Responsibilities"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).experiences[0].responsibilities = $event,
                        disabled: !!unref(form).experiences[0].experience_id,
                        rows: "3",
                        class: "w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 disabled:bg-green-50 disabled:text-gray-800"
                      }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                        [vModelText, unref(form).experiences[0].responsibilities]
                      ])
                    ]),
                    unref(form).experiences[0].experience_id ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-3 flex justify-end"
                    }, [
                      createVNode("button", {
                        onClick: clearExperience,
                        type: "button",
                        class: "text-xs text-gray-600 hover:text-gray-800 flex items-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-4 w-4 mr-1",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M6 18L18 6M6 6l12 12"
                          })
                        ])),
                        createTextVNode(" Clear selection ")
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "bg-white rounded-xl shadow-sm p-6 mb-8 border border-green-100" }, [
                    createVNode("h6", { class: "text-lg font-semibold text-gray-800 flex items-center mb-4" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-5 w-5 mr-2 text-green-700",
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
                      ])),
                      createTextVNode(" Supporting Documents ")
                    ]),
                    createVNode("div", { class: "border-2 border-dashed border-green-200 rounded-lg p-6 bg-green-50 transition duration-300 hover:bg-green-100" }, [
                      createVNode("input", {
                        type: "file",
                        onChange: handleFileUpload,
                        class: "hidden",
                        id: "file-upload",
                        accept: ".pdf,.doc,.docx"
                      }, null, 32),
                      !unref(form).application_document ? (openBlock(), createBlock("label", {
                        key: 0,
                        for: "file-upload",
                        class: "cursor-pointer text-center block"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "mx-auto h-12 w-12 text-green-500",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          })
                        ])),
                        createVNode("span", { class: "mt-2 block text-sm font-medium text-gray-700" }, " Drop your resume here or click to upload "),
                        createVNode("span", { class: "mt-1 text-xs text-gray-600" }, " Supported formats: PDF, DOC, DOCX ")
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center justify-between"
                      }, [
                        createVNode("div", { class: "flex items-center space-x-3" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-8 h-8 text-green-600",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            })
                          ])),
                          createVNode("div", { class: "flex flex-col" }, [
                            createVNode("span", { class: "text-sm font-medium text-gray-800" }, toDisplayString(unref(form).application_document.name), 1),
                            createVNode("span", { class: "text-xs text-gray-600" }, toDisplayString(formatFileSize(
                              unref(form).application_document.size
                            )), 1)
                          ])
                        ]),
                        createVNode("button", {
                          type: "button",
                          onClick: removeFile,
                          class: "text-green-500 hover:text-green-700 transition-colors"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-5 h-5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M6 18L18 6M6 6l12 12"
                            })
                          ]))
                        ])
                      ]))
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-end space-x-4" }, [
                    createVNode("button", {
                      type: "button",
                      onClick: closeModal,
                      class: "px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition font-medium"
                    }, " Cancel "),
                    createVNode("button", {
                      type: "submit",
                      class: "px-6 py-2.5 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium shadow-sm"
                    }, " Submit Application ")
                  ])
                ], 32)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/JobApplication/ApplicationForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "JobDetails",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const job = ref(page.props.job);
    ref(page.props.applications || []);
    const hasApplied = computed(() => {
      return job.value.applications.some(
        (app) => app.job_listing_id === job.value.job_listing_id
      );
    });
    const showApplicationModal = ref(false);
    const openApplicationModal = () => {
      if (hasApplied.value) {
        return;
      }
      showApplicationModal.value = true;
    };
    const closeApplicationModal = () => {
      showApplicationModal.value = false;
    };
    const handleApplicationSubmitted = (responseData) => {
      closeApplicationModal();
      job.value = responseData.props.job;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(ApplicantLayout, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, {
              title: job.value.title
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4, {
                title: job.value.title
              }, null, 8, ["title"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: job.value.title
            }, null, _parent2, _scopeId));
            _push2(`<div class="py-5"${_scopeId}><div class="container-fluid px-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              items: [
                { name: "Home", href: _ctx.route("job-application.index") },
                {
                  name: "Job Listings",
                  href: _ctx.route("job-application.index")
                },
                {
                  name: job.value.title,
                  href: _ctx.route(
                    "job-application.show",
                    job.value.job_listing_id
                  ),
                  active: true
                }
              ]
            }, null, _parent2, _scopeId));
            if (_ctx.$page.props.flash && _ctx.$page.props.flash.success) {
              _push2(`<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"${_scopeId}><span class="block sm:inline"${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.success)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="card shadow-sm rounded-lg overflow-hidden bg-white mb-6 flex flex-col"${_scopeId}><div class="p-4 border-b flex items-center"${_scopeId}><div class="flex items-center"${_scopeId}><button class="flex items-center text-gray-600 hover:text-gray-900"${_scopeId}><i class="fas fa-arrow-left mr-2"${_scopeId}></i> Back to Listings </button></div>`);
            if (hasApplied.value) {
              _push2(`<div class="flex-1 ml-4 text-center"${_scopeId}><div class="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-center"${_scopeId}><i class="fas fa-info-circle text-green-500 mr-2"${_scopeId}></i><h6 class="font-semibold text-green-900 mr-2"${_scopeId}> Application Status </h6><p class="text-green-800"${_scopeId}> You have already applied for this position. </p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="p-6"${_scopeId}><div class="flex items-start gap-4 mb-6"${_scopeId}><div class="flex-shrink-0 bg-green-50 rounded-lg p-4 flex items-center justify-center" style="${ssrRenderStyle({ "width": "64px", "height": "64px" })}"${_scopeId}><span class="text-green-600 font-medium text-xl"${_scopeId}>${ssrInterpolate(job.value.position.position_name.substring(
              0,
              2
            ))}</span></div><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900 mb-2"${_scopeId}>${ssrInterpolate(job.value.title)}</h1><div class="flex items-center gap-3 text-gray-600"${_scopeId}><span${_scopeId}>${ssrInterpolate(job.value.position.position_name)}</span><span class="text-gray-400"${_scopeId}>•</span><span class="inline-flex items-center"${_scopeId}><span class="${ssrRenderClass([{
              "bg-green-500": job.value.status === "Active",
              "bg-yellow-500": job.value.status === "Draft",
              "bg-red-500": job.value.status === "Closed"
            }, "inline-block w-2 h-2 rounded-full mr-1"])}"${_scopeId}></span> ${ssrInterpolate(job.value.status)}</span></div></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div class="md:col-span-2"${_scopeId}><div class="mb-6"${_scopeId}><h2 class="text-lg font-semibold mb-3"${_scopeId}> Job Description </h2><p class="text-gray-600 whitespace-pre-line"${_scopeId}>${ssrInterpolate(job.value.description)}</p></div>`);
            if ((_a = job.value.minimumRequirements) == null ? void 0 : _a.length) {
              _push2(`<div class="mb-6"${_scopeId}><h2 class="text-lg font-semibold mb-3"${_scopeId}> Minimum Requirements </h2><ul class="list-disc list-inside text-gray-600"${_scopeId}><!--[-->`);
              ssrRenderList(job.value.minimumRequirements, (req) => {
                _push2(`<li${_scopeId}>${ssrInterpolate(req.title)}</li>`);
              });
              _push2(`<!--]--></ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-6"${_scopeId}><div class="bg-gray-50 rounded-lg p-4"${_scopeId}><h3 class="font-semibold mb-4"${_scopeId}> Job Information </h3><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="text-sm text-gray-500"${_scopeId}>Salary</label><p class="font-medium"${_scopeId}> $${ssrInterpolate(job.value.position.salary_grade.amount.toLocaleString())}</p></div><div${_scopeId}><label class="text-sm text-gray-500"${_scopeId}>Experience Required</label><p class="font-medium"${_scopeId}>${ssrInterpolate(job.value.position.salary_grade.years_experience)}+ years </p></div><div${_scopeId}><label class="text-sm text-gray-500"${_scopeId}>Closing Date</label><p class="font-medium"${_scopeId}>${ssrInterpolate(new Date(
              job.value.closing_date
            ).toLocaleDateString())}</p></div><div${_scopeId}><label class="text-sm text-gray-500"${_scopeId}>Category</label><p class="font-medium"${_scopeId}>${ssrInterpolate(((_b = job.value.category) == null ? void 0 : _b.name) || "N/A")}</p></div></div></div><button${ssrIncludeBooleanAttr(hasApplied.value) ? " disabled" : ""} class="${ssrRenderClass([
              "w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-center",
              hasApplied.value ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
            ])}"${_scopeId}><i class="far fa-paper-plane mr-2"${_scopeId}></i> ${ssrInterpolate(hasApplied.value ? "Already Applied" : "Apply Now")}</button></div></div></div></div>`);
            if (!hasApplied.value) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                job: job.value,
                "is-open": showApplicationModal.value,
                "existing-education": ((_c = unref(page).props.userData) == null ? void 0 : _c.education) || [],
                "existing-trainings": ((_d = unref(page).props.userData) == null ? void 0 : _d.trainings) || [],
                "existing-experiences": ((_e = unref(page).props.userData) == null ? void 0 : _e.experiences) || [],
                onClose: closeApplicationModal,
                onSubmitted: handleApplicationSubmitted
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: job.value.title
              }, null, 8, ["title"]),
              createVNode("div", { class: "py-5" }, [
                createVNode("div", { class: "container-fluid px-4" }, [
                  createVNode(_sfc_main$3, {
                    items: [
                      { name: "Home", href: _ctx.route("job-application.index") },
                      {
                        name: "Job Listings",
                        href: _ctx.route("job-application.index")
                      },
                      {
                        name: job.value.title,
                        href: _ctx.route(
                          "job-application.show",
                          job.value.job_listing_id
                        ),
                        active: true
                      }
                    ]
                  }, null, 8, ["items"]),
                  _ctx.$page.props.flash && _ctx.$page.props.flash.success ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                  }, [
                    createVNode("span", { class: "block sm:inline" }, toDisplayString(_ctx.$page.props.flash.success), 1)
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "card shadow-sm rounded-lg overflow-hidden bg-white mb-6 flex flex-col" }, [
                    createVNode("div", { class: "p-4 border-b flex items-center" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("button", {
                          onClick: ($event) => _ctx.$inertia.get(_ctx.route("job-application.index")),
                          class: "flex items-center text-gray-600 hover:text-gray-900"
                        }, [
                          createVNode("i", { class: "fas fa-arrow-left mr-2" }),
                          createTextVNode(" Back to Listings ")
                        ], 8, ["onClick"])
                      ]),
                      hasApplied.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex-1 ml-4 text-center"
                      }, [
                        createVNode("div", { class: "bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-center" }, [
                          createVNode("i", { class: "fas fa-info-circle text-green-500 mr-2" }),
                          createVNode("h6", { class: "font-semibold text-green-900 mr-2" }, " Application Status "),
                          createVNode("p", { class: "text-green-800" }, " You have already applied for this position. ")
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "flex items-start gap-4 mb-6" }, [
                        createVNode("div", {
                          class: "flex-shrink-0 bg-green-50 rounded-lg p-4 flex items-center justify-center",
                          style: { "width": "64px", "height": "64px" }
                        }, [
                          createVNode("span", { class: "text-green-600 font-medium text-xl" }, toDisplayString(job.value.position.position_name.substring(
                            0,
                            2
                          )), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("h1", { class: "text-2xl font-bold text-gray-900 mb-2" }, toDisplayString(job.value.title), 1),
                          createVNode("div", { class: "flex items-center gap-3 text-gray-600" }, [
                            createVNode("span", null, toDisplayString(job.value.position.position_name), 1),
                            createVNode("span", { class: "text-gray-400" }, "•"),
                            createVNode("span", { class: "inline-flex items-center" }, [
                              createVNode("span", {
                                class: ["inline-block w-2 h-2 rounded-full mr-1", {
                                  "bg-green-500": job.value.status === "Active",
                                  "bg-yellow-500": job.value.status === "Draft",
                                  "bg-red-500": job.value.status === "Closed"
                                }]
                              }, null, 2),
                              createTextVNode(" " + toDisplayString(job.value.status), 1)
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                        createVNode("div", { class: "md:col-span-2" }, [
                          createVNode("div", { class: "mb-6" }, [
                            createVNode("h2", { class: "text-lg font-semibold mb-3" }, " Job Description "),
                            createVNode("p", { class: "text-gray-600 whitespace-pre-line" }, toDisplayString(job.value.description), 1)
                          ]),
                          ((_f = job.value.minimumRequirements) == null ? void 0 : _f.length) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mb-6"
                          }, [
                            createVNode("h2", { class: "text-lg font-semibold mb-3" }, " Minimum Requirements "),
                            createVNode("ul", { class: "list-disc list-inside text-gray-600" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(job.value.minimumRequirements, (req) => {
                                return openBlock(), createBlock("li", {
                                  key: req.requirement_id
                                }, toDisplayString(req.title), 1);
                              }), 128))
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-6" }, [
                          createVNode("div", { class: "bg-gray-50 rounded-lg p-4" }, [
                            createVNode("h3", { class: "font-semibold mb-4" }, " Job Information "),
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "text-sm text-gray-500" }, "Salary"),
                                createVNode("p", { class: "font-medium" }, " $" + toDisplayString(job.value.position.salary_grade.amount.toLocaleString()), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "text-sm text-gray-500" }, "Experience Required"),
                                createVNode("p", { class: "font-medium" }, toDisplayString(job.value.position.salary_grade.years_experience) + "+ years ", 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "text-sm text-gray-500" }, "Closing Date"),
                                createVNode("p", { class: "font-medium" }, toDisplayString(new Date(
                                  job.value.closing_date
                                ).toLocaleDateString()), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "text-sm text-gray-500" }, "Category"),
                                createVNode("p", { class: "font-medium" }, toDisplayString(((_g = job.value.category) == null ? void 0 : _g.name) || "N/A"), 1)
                              ])
                            ])
                          ]),
                          createVNode("button", {
                            onClick: openApplicationModal,
                            disabled: hasApplied.value,
                            class: [
                              "w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-center",
                              hasApplied.value ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
                            ]
                          }, [
                            createVNode("i", { class: "far fa-paper-plane mr-2" }),
                            createTextVNode(" " + toDisplayString(hasApplied.value ? "Already Applied" : "Apply Now"), 1)
                          ], 10, ["disabled"])
                        ])
                      ])
                    ])
                  ]),
                  !hasApplied.value ? (openBlock(), createBlock(_sfc_main$1, {
                    key: 1,
                    job: job.value,
                    "is-open": showApplicationModal.value,
                    "existing-education": ((_h = unref(page).props.userData) == null ? void 0 : _h.education) || [],
                    "existing-trainings": ((_i = unref(page).props.userData) == null ? void 0 : _i.trainings) || [],
                    "existing-experiences": ((_j = unref(page).props.userData) == null ? void 0 : _j.experiences) || [],
                    onClose: closeApplicationModal,
                    onSubmitted: handleApplicationSubmitted
                  }, null, 8, ["job", "is-open", "existing-education", "existing-trainings", "existing-experiences"])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Applicant/ViewJobs/JobDetails.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
