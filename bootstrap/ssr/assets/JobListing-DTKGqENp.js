import { mergeModels, useModel, ref, onMounted, nextTick, mergeProps, useSSRContext, computed, withCtx, unref, createVNode, withModifiers, createTextVNode, createBlock, openBlock, Fragment, renderList, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
import axios from "axios";
import { H as HRLayout } from "./HRLayout-Deg3lApQ.js";
import { _ as _sfc_main$4 } from "./Header-VZTQj6rE.js";
import { usePage, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./TextInput-DJ5KC4cX.js";
import { C as CustomSelect } from "./CustomSelect-wXlHRS75.js";
import { _ as _sfc_main$3 } from "./Modal-Dr2ADp7V.js";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./NotificationBell-DssmmqXB.js";
const _sfc_main$1 = {
  __name: "TextArea",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    rows: {
      type: [Number, String],
      default: 4
    },
    placeholder: {
      type: String,
      default: ""
    }
  }, {
    "modelValue": {
      type: String,
      required: true
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const model = useModel(__props, "modelValue");
    const textarea = ref(null);
    onMounted(async () => {
      var _a;
      await nextTick();
      if ((_a = textarea.value) == null ? void 0 : _a.hasAttribute("autofocus")) {
        textarea.value.focus();
      }
    });
    __expose({ focus: () => textarea.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<textarea${ssrRenderAttrs(mergeProps({
        class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full",
        ref_key: "textarea",
        ref: textarea,
        rows: __props.rows,
        placeholder: __props.placeholder
      }, _attrs), "textarea")}>${ssrInterpolate(model.value)}</textarea>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TextArea.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "JobListing",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref(usePage().props.jobListings);
    const positions = ref(usePage().props.positions);
    const categories = ref(usePage().props.categories);
    const salaryGrades = ref(usePage().props.salaryGrades);
    console.log(positions.value);
    const jobs = ref(data.value);
    const searchQuery = ref("");
    const filteredJobs = computed(() => {
      if (!searchQuery.value) return jobs.value;
      const query = searchQuery.value.toLowerCase();
      return jobs.value.filter(
        (job) => job.title.toLowerCase().includes(query) || job.description.toLowerCase().includes(query) || job.position.position_name.toLowerCase().includes(query)
      );
    });
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const selectedPosition = ref(null);
    const handlePositionSelect = (positionId) => {
      selectedPosition.value = positions.value.find(
        (p) => p.position_id === positionId
      );
      const salaryGrade = salaryGrades.value.find(
        (sg) => sg.salary_grade_id === selectedPosition.value.salary_grade_id
      );
      selectedPosition.value = {
        ...selectedPosition.value,
        salary_grade: salaryGrade
      };
    };
    const newJob = ref({
      position_id: null,
      title: "",
      description: "",
      closing_date: "",
      status: "Active",
      applicant_limit: 1,
      minimum_requirements: [],
      category_id: null
    });
    const editingJob = ref({
      job_listing_id: null,
      position_id: null,
      title: "",
      description: "",
      closing_date: "",
      status: "Active",
      applicant_limit: 1,
      category_id: null
    });
    const editJob = (job) => {
      editingJob.value = { ...job };
      editingJob.value.closing_date = job.closing_date.split("T")[0];
      showEditModal.value = true;
    };
    const updateJob = () => {
      console.log("this is hte editingjob : ", editingJob.value);
      axios.put(
        `/job-listing/${editingJob.value.job_listing_id}`,
        editingJob.value
      ).then((response) => {
        const index = jobs.value.findIndex(
          (job) => job.job_listing_id === editingJob.value.job_listing_id
        );
        if (index !== -1) {
          jobs.value[index] = response.data;
        }
        showEditModal.value = false;
        editingJob.value = {
          job_listing_id: null,
          position_id: null,
          title: "",
          description: "",
          status: "Active",
          applicant_limit: 1,
          category_id: null
        };
        showSuccessAlert("update");
      }).catch((error) => {
        console.error("Error updating job listing:", error);
      });
    };
    const saveJob = () => {
      const jobToAdd = {
        position_id: newJob.value.position_id,
        title: newJob.value.title,
        description: newJob.value.description,
        closing_date: newJob.value.closing_date,
        status: newJob.value.status,
        category_id: newJob.value.category_id,
        applicant_limit: newJob.value.applicant_limit,
        created_by: usePage().props.auth.user.id
        // Assuming you have auth user info
      };
      axios.post("job-listing", jobToAdd).then((response) => {
        console.log("Response from API: ", response.data);
        jobs.value = response.data;
        resetForm();
        showAddModal.value = false;
        showSuccessAlert("add");
      }).catch((error) => {
        console.error("Error creating job listing:", error.response.data);
      });
    };
    const resetForm = () => {
      newJob.value = {
        position_id: null,
        title: "",
        description: "",
        closing_date: "",
        status: "Active",
        applicant_limit: 1,
        minimum_requirements: []
      };
    };
    const showSuccessAlert = (action) => {
      let title;
      switch (action) {
        case "add":
          title = "Job Listing Added Successfully!";
          break;
        case "update":
          title = "Job Listing Updated Successfully!";
          break;
        case "delete":
          title = "Job Listing Deleted Successfully!";
          break;
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
    const deleteJob = (jobId) => {
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
          axios.delete(`job-listing/${jobId}`).then(() => {
            jobs.value = jobs.value.filter(
              (job) => job.job_listing_id !== jobId
            );
            showSuccessAlert("delete");
          }).catch((error) => {
            console.error("Error deleting job listing:", error);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Error!",
              text: "Failed to delete job listing.",
              showConfirmButton: false,
              timer: 3e3,
              toast: true,
              customClass: {
                popup: "bg-red-500 text-white"
              }
            });
          });
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(HRLayout, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, { title: "Job Listings" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4, { title: "Job Listings" })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Job Listings" }, null, _parent2, _scopeId));
            _push2(`<div class="py-5"${_scopeId}><div class="container-fluid px-4"${_scopeId}><div class="card shadow-sm rounded-lg overflow-hidden bg-white mb-6"${_scopeId}><div class="card-header bg-white py-4 px-4 border-b"${_scopeId}><div class="flex flex-col md:flex-row justify-center items-center gap-3"${_scopeId}><div class="relative w-full md:w-1/2 max-w-xl"${_scopeId}><div class="flex"${_scopeId}><div class="relative w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: searchQuery.value,
              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
              class: "w-full rounded-r-none",
              placeholder: "Search job listings..."
            }, null, _parent2, _scopeId));
            _push2(`</div><button class="px-4 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"${_scopeId}><i class="fas fa-search"${_scopeId}></i></button></div></div><button class="btn px-2 bg-green-800 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center"${_scopeId}><i class="fas fa-plus mr-2"${_scopeId}></i> Add Job Listing </button></div></div><div class="card-body p-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"${_scopeId}><!--[-->`);
            ssrRenderList(filteredJobs.value, (job, index) => {
              _push2(`<div class="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full"${_scopeId}><div class="p-6 flex flex-col h-full"${_scopeId}><div class="flex items-start gap-4 mb-5"${_scopeId}><div class="flex-shrink-0 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300" style="${ssrRenderStyle({ "width": "56px", "height": "56px" })}"${_scopeId}><span class="text-green-600 font-semibold text-lg"${_scopeId}>${ssrInterpolate(job.position.position_name.substring(
                0,
                2
              ))}</span></div><div class="flex-1"${_scopeId}><h5 class="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-800 transition-colors"${_scopeId}>${ssrInterpolate(job.title)}</h5><div class="flex items-center gap-2 text-sm"${_scopeId}><span class="text-gray-600"${_scopeId}>${ssrInterpolate(job.position.position_name)}</span><span class="text-gray-300"${_scopeId}>•</span><span class="inline-flex items-center gap-1.5"${_scopeId}><span class="${ssrRenderClass([{
                "bg-green-500": job.status === "Active",
                "bg-yellow-500": job.status === "Draft",
                "bg-red-500": job.status === "Closed"
              }, "inline-block w-2.5 h-2.5 rounded-full"])}"${_scopeId}></span><span class="${ssrRenderClass({
                "text-green-600": job.status === "Active",
                "text-yellow-600": job.status === "Draft",
                "text-red-600": job.status === "Closed"
              })}"${_scopeId}>${ssrInterpolate(job.status)}</span></span></div></div></div><div class="flex-grow"${_scopeId}><div class="flex flex-wrap gap-2 mb-4"${_scopeId}><span class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-900 group-hover:bg-green-100 transition-colors"${_scopeId}> ₱${ssrInterpolate(job.position.salary_grade.amount.toLocaleString())}</span><span class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 group-hover:bg-gray-100 transition-colors"${_scopeId}>${ssrInterpolate(job.position.salary_grade.years_experience)}+ years </span></div><p class="text-gray-600 text-sm leading-relaxed line-clamp-3"${_scopeId}>${ssrInterpolate(job.description)}</p></div><div class="mt-6 pt-4 border-t border-gray-50"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><button class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"${_scopeId}><i class="fas fa-edit mr-2"${_scopeId}></i> Edit </button><button class="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200"${_scopeId}><i class="fas fa-trash-alt mr-2"${_scopeId}></i> Delete </button></div></div></div></div>`);
            });
            _push2(`<!--]--></div></div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: showAddModal.value,
              onClose: ($event) => showAddModal.value = false,
              title: "Create New Job Listing",
              "max-width": "6xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d, _e, _f;
                if (_push3) {
                  _push3(`<form${_scopeId2}><div class="p-5"${_scopeId2}><div class="mb-6"${_scopeId2}><h6 class="font-semibold text-gray-800 mb-4 pb-2 border-b"${_scopeId2}> Basic Information </h6><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId2}><div class="form-group"${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1" for="jobTitle"${_scopeId2}> Job Title * </label>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    id: "jobTitle",
                    modelValue: newJob.value.title,
                    "onUpdate:modelValue": ($event) => newJob.value.title = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1" for="position"${_scopeId2}> Position * </label>`);
                  _push3(ssrRenderComponent(CustomSelect, {
                    options: positions.value,
                    modelValue: newJob.value.position_id,
                    "onUpdate:modelValue": [($event) => newJob.value.position_id = $event, handlePositionSelect],
                    placeholder: "Select a position",
                    "value-key": "position_id",
                    "display-format": (position) => `${position.position_name} (${position.item_number})`,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"${_scopeId2}><div class="grid grid-cols-2 gap-2"${_scopeId2}><div class="form-group"${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}> Salary Grade </label>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    value: ((_b = (_a = selectedPosition.value) == null ? void 0 : _a.salary_grade) == null ? void 0 : _b.amount) ? `₱${selectedPosition.value.salary_grade.amount.toLocaleString()}` : "",
                    disabled: "",
                    class: "bg-gray-50"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}> Item Number </label>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    value: ((_c = selectedPosition.value) == null ? void 0 : _c.item_number) || "",
                    disabled: "",
                    class: "bg-gray-50"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="form-group"${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1" for="category"${_scopeId2}> Category * </label>`);
                  _push3(ssrRenderComponent(CustomSelect, {
                    options: categories.value,
                    modelValue: newJob.value.category_id,
                    "onUpdate:modelValue": ($event) => newJob.value.category_id = $event,
                    placeholder: "Select a category",
                    "value-key": "category_id",
                    "display-format": (category) => category.name,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"${_scopeId2}><div class="form-group"${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}> Closing Date * </label>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    type: "date",
                    modelValue: newJob.value.closing_date,
                    "onUpdate:modelValue": ($event) => newJob.value.closing_date = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}> Applicant Limit * </label>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    type: "number",
                    modelValue: newJob.value.applicant_limit,
                    "onUpdate:modelValue": ($event) => newJob.value.applicant_limit = $event,
                    min: "1",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"${_scopeId2}><div class="form-group"${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}> Status * </label>`);
                  _push3(ssrRenderComponent(CustomSelect, {
                    options: [{ value: "Active" }, { value: "Draft" }, { value: "Closed" }],
                    modelValue: newJob.value.status,
                    "onUpdate:modelValue": ($event) => newJob.value.status = $event,
                    "value-key": "value",
                    "display-format": (option) => option.value,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div></div><div class="mb-4"${_scopeId2}><h6 class="font-semibold text-gray-800 mb-4 pb-2 border-b"${_scopeId2}> Job Description </h6><div class="form-group"${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}> Description * </label>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    modelValue: newJob.value.description,
                    "onUpdate:modelValue": ($event) => newJob.value.description = $event,
                    rows: "4",
                    placeholder: "Enter job description",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div></div><div class="border-t p-4 flex gap-2 justify-end"${_scopeId2}><button type="button" class="btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"${_scopeId2}> Cancel </button><button type="submit" class="btn px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors"${_scopeId2}> Save Job Listing </button></div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(saveJob, ["prevent"])
                    }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "mb-6" }, [
                          createVNode("h6", { class: "font-semibold text-gray-800 mb-4 pb-2 border-b" }, " Basic Information "),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", {
                                class: "block text-sm font-medium text-gray-700 mb-1",
                                for: "jobTitle"
                              }, " Job Title * "),
                              createVNode(_sfc_main$2, {
                                id: "jobTitle",
                                modelValue: newJob.value.title,
                                "onUpdate:modelValue": ($event) => newJob.value.title = $event,
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", {
                                class: "block text-sm font-medium text-gray-700 mb-1",
                                for: "position"
                              }, " Position * "),
                              createVNode(CustomSelect, {
                                options: positions.value,
                                modelValue: newJob.value.position_id,
                                "onUpdate:modelValue": [($event) => newJob.value.position_id = $event, handlePositionSelect],
                                placeholder: "Select a position",
                                "value-key": "position_id",
                                "display-format": (position) => `${position.position_name} (${position.item_number})`,
                                required: ""
                              }, null, 8, ["options", "modelValue", "onUpdate:modelValue", "display-format"])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" }, [
                            createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                              createVNode("div", { class: "form-group" }, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Salary Grade "),
                                createVNode(_sfc_main$2, {
                                  value: ((_e = (_d = selectedPosition.value) == null ? void 0 : _d.salary_grade) == null ? void 0 : _e.amount) ? `₱${selectedPosition.value.salary_grade.amount.toLocaleString()}` : "",
                                  disabled: "",
                                  class: "bg-gray-50"
                                }, null, 8, ["value"])
                              ]),
                              createVNode("div", { class: "form-group" }, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Item Number "),
                                createVNode(_sfc_main$2, {
                                  value: ((_f = selectedPosition.value) == null ? void 0 : _f.item_number) || "",
                                  disabled: "",
                                  class: "bg-gray-50"
                                }, null, 8, ["value"])
                              ])
                            ]),
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", {
                                class: "block text-sm font-medium text-gray-700 mb-1",
                                for: "category"
                              }, " Category * "),
                              createVNode(CustomSelect, {
                                options: categories.value,
                                modelValue: newJob.value.category_id,
                                "onUpdate:modelValue": ($event) => newJob.value.category_id = $event,
                                placeholder: "Select a category",
                                "value-key": "category_id",
                                "display-format": (category) => category.name,
                                required: ""
                              }, null, 8, ["options", "modelValue", "onUpdate:modelValue", "display-format"])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" }, [
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Closing Date * "),
                              createVNode(_sfc_main$2, {
                                type: "date",
                                modelValue: newJob.value.closing_date,
                                "onUpdate:modelValue": ($event) => newJob.value.closing_date = $event,
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Applicant Limit * "),
                              createVNode(_sfc_main$2, {
                                type: "number",
                                modelValue: newJob.value.applicant_limit,
                                "onUpdate:modelValue": ($event) => newJob.value.applicant_limit = $event,
                                min: "1",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" }, [
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Status * "),
                              createVNode(CustomSelect, {
                                options: [{ value: "Active" }, { value: "Draft" }, { value: "Closed" }],
                                modelValue: newJob.value.status,
                                "onUpdate:modelValue": ($event) => newJob.value.status = $event,
                                "value-key": "value",
                                "display-format": (option) => option.value,
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "display-format"])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "mb-4" }, [
                          createVNode("h6", { class: "font-semibold text-gray-800 mb-4 pb-2 border-b" }, " Job Description "),
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Description * "),
                            createVNode(_sfc_main$1, {
                              modelValue: newJob.value.description,
                              "onUpdate:modelValue": ($event) => newJob.value.description = $event,
                              rows: "4",
                              placeholder: "Enter job description",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "border-t p-4 flex gap-2 justify-end" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors",
                          onClick: ($event) => showAddModal.value = false
                        }, " Cancel ", 8, ["onClick"]),
                        createVNode("button", {
                          type: "submit",
                          class: "btn px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors"
                        }, " Save Job Listing ")
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: showEditModal.value,
              onClose: ($event) => showEditModal.value = false,
              title: "Edit Job Listing",
              "max-width": "6xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form${_scopeId2}><div class="p-5"${_scopeId2}><div class="mb-6"${_scopeId2}><h6 class="font-semibold text-gray-800 mb-4 pb-2 border-b"${_scopeId2}> Basic Information </h6><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId2}><div class="form-group"${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1" for="editPosition"${_scopeId2}> Position </label>`);
                  _push3(ssrRenderComponent(CustomSelect, {
                    options: positions.value,
                    modelValue: editingJob.value.position_id,
                    "onUpdate:modelValue": ($event) => editingJob.value.position_id = $event,
                    placeholder: "Select a position",
                    "value-key": "position_id",
                    "display-format": (position) => `${position.position_name} (${position.item_number})`
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1" for="editJobTitle"${_scopeId2}> Job Title </label>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    id: "editJobTitle",
                    modelValue: editingJob.value.title,
                    "onUpdate:modelValue": ($event) => editingJob.value.title = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"${_scopeId2}><div class="form-group"${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}> Closing Date </label>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    type: "date",
                    modelValue: editingJob.value.closing_date,
                    "onUpdate:modelValue": ($event) => editingJob.value.closing_date = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}> Applicant Limit </label>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    type: "number",
                    modelValue: editingJob.value.applicant_limit,
                    "onUpdate:modelValue": ($event) => editingJob.value.applicant_limit = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}> Status </label>`);
                  _push3(ssrRenderComponent(CustomSelect, {
                    options: ["Active", "Draft", "Closed"],
                    modelValue: editingJob.value.status,
                    "onUpdate:modelValue": ($event) => editingJob.value.status = $event,
                    placeholder: "Select a status",
                    "display-format": (status) => status
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div></div></div><div class="border-t p-4 flex gap-2 justify-end"${_scopeId2}><button type="button" class="btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"${_scopeId2}> Cancel </button><button type="submit" class="btn px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors"${_scopeId2}> Update Job Listing </button></div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(updateJob, ["prevent"])
                    }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "mb-6" }, [
                          createVNode("h6", { class: "font-semibold text-gray-800 mb-4 pb-2 border-b" }, " Basic Information "),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", {
                                class: "block text-sm font-medium text-gray-700 mb-1",
                                for: "editPosition"
                              }, " Position "),
                              createVNode(CustomSelect, {
                                options: positions.value,
                                modelValue: editingJob.value.position_id,
                                "onUpdate:modelValue": ($event) => editingJob.value.position_id = $event,
                                placeholder: "Select a position",
                                "value-key": "position_id",
                                "display-format": (position) => `${position.position_name} (${position.item_number})`
                              }, null, 8, ["options", "modelValue", "onUpdate:modelValue", "display-format"])
                            ]),
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", {
                                class: "block text-sm font-medium text-gray-700 mb-1",
                                for: "editJobTitle"
                              }, " Job Title "),
                              createVNode(_sfc_main$2, {
                                id: "editJobTitle",
                                modelValue: editingJob.value.title,
                                "onUpdate:modelValue": ($event) => editingJob.value.title = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" }, [
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Closing Date "),
                              createVNode(_sfc_main$2, {
                                type: "date",
                                modelValue: editingJob.value.closing_date,
                                "onUpdate:modelValue": ($event) => editingJob.value.closing_date = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Applicant Limit "),
                              createVNode(_sfc_main$2, {
                                type: "number",
                                modelValue: editingJob.value.applicant_limit,
                                "onUpdate:modelValue": ($event) => editingJob.value.applicant_limit = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Status "),
                              createVNode(CustomSelect, {
                                options: ["Active", "Draft", "Closed"],
                                modelValue: editingJob.value.status,
                                "onUpdate:modelValue": ($event) => editingJob.value.status = $event,
                                placeholder: "Select a status",
                                "display-format": (status) => status
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "display-format"])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "border-t p-4 flex gap-2 justify-end" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors",
                          onClick: ($event) => showEditModal.value = false
                        }, " Cancel ", 8, ["onClick"]),
                        createVNode("button", {
                          type: "submit",
                          class: "btn px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors"
                        }, " Update Job Listing ")
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Job Listings" }),
              createVNode("div", { class: "py-5" }, [
                createVNode("div", { class: "container-fluid px-4" }, [
                  createVNode("div", { class: "card shadow-sm rounded-lg overflow-hidden bg-white mb-6" }, [
                    createVNode("div", { class: "card-header bg-white py-4 px-4 border-b" }, [
                      createVNode("div", { class: "flex flex-col md:flex-row justify-center items-center gap-3" }, [
                        createVNode("div", { class: "relative w-full md:w-1/2 max-w-xl" }, [
                          createVNode("div", { class: "flex" }, [
                            createVNode("div", { class: "relative w-full" }, [
                              createVNode(_sfc_main$2, {
                                modelValue: searchQuery.value,
                                "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                                class: "w-full rounded-r-none",
                                placeholder: "Search job listings..."
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("button", { class: "px-4 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors" }, [
                              createVNode("i", { class: "fas fa-search" })
                            ])
                          ])
                        ]),
                        createVNode("button", {
                          class: "btn px-2 bg-green-800 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center",
                          onClick: ($event) => showAddModal.value = true
                        }, [
                          createVNode("i", { class: "fas fa-plus mr-2" }),
                          createTextVNode(" Add Job Listing ")
                        ], 8, ["onClick"])
                      ])
                    ]),
                    createVNode("div", { class: "card-body p-4" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredJobs.value, (job, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full"
                          }, [
                            createVNode("div", { class: "p-6 flex flex-col h-full" }, [
                              createVNode("div", { class: "flex items-start gap-4 mb-5" }, [
                                createVNode("div", {
                                  class: "flex-shrink-0 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300",
                                  style: { "width": "56px", "height": "56px" }
                                }, [
                                  createVNode("span", { class: "text-green-600 font-semibold text-lg" }, toDisplayString(job.position.position_name.substring(
                                    0,
                                    2
                                  )), 1)
                                ]),
                                createVNode("div", { class: "flex-1" }, [
                                  createVNode("h5", { class: "font-bold text-gray-900 text-lg mb-2 group-hover:text-green-800 transition-colors" }, toDisplayString(job.title), 1),
                                  createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                                    createVNode("span", { class: "text-gray-600" }, toDisplayString(job.position.position_name), 1),
                                    createVNode("span", { class: "text-gray-300" }, "•"),
                                    createVNode("span", { class: "inline-flex items-center gap-1.5" }, [
                                      createVNode("span", {
                                        class: ["inline-block w-2.5 h-2.5 rounded-full", {
                                          "bg-green-500": job.status === "Active",
                                          "bg-yellow-500": job.status === "Draft",
                                          "bg-red-500": job.status === "Closed"
                                        }]
                                      }, null, 2),
                                      createVNode("span", {
                                        class: {
                                          "text-green-600": job.status === "Active",
                                          "text-yellow-600": job.status === "Draft",
                                          "text-red-600": job.status === "Closed"
                                        }
                                      }, toDisplayString(job.status), 3)
                                    ])
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "flex-grow" }, [
                                createVNode("div", { class: "flex flex-wrap gap-2 mb-4" }, [
                                  createVNode("span", { class: "inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-900 group-hover:bg-green-100 transition-colors" }, " ₱" + toDisplayString(job.position.salary_grade.amount.toLocaleString()), 1),
                                  createVNode("span", { class: "inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 group-hover:bg-gray-100 transition-colors" }, toDisplayString(job.position.salary_grade.years_experience) + "+ years ", 1)
                                ]),
                                createVNode("p", { class: "text-gray-600 text-sm leading-relaxed line-clamp-3" }, toDisplayString(job.description), 1)
                              ]),
                              createVNode("div", { class: "mt-6 pt-4 border-t border-gray-50" }, [
                                createVNode("div", { class: "flex items-center justify-between" }, [
                                  createVNode("button", {
                                    class: "inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200",
                                    onClick: ($event) => editJob(job)
                                  }, [
                                    createVNode("i", { class: "fas fa-edit mr-2" }),
                                    createTextVNode(" Edit ")
                                  ], 8, ["onClick"]),
                                  createVNode("button", {
                                    class: "inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200",
                                    onClick: ($event) => deleteJob(
                                      job.job_listing_id
                                    )
                                  }, [
                                    createVNode("i", { class: "fas fa-trash-alt mr-2" }),
                                    createTextVNode(" Delete ")
                                  ], 8, ["onClick"])
                                ])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$3, {
                show: showAddModal.value,
                onClose: ($event) => showAddModal.value = false,
                title: "Create New Job Listing",
                "max-width": "6xl"
              }, {
                default: withCtx(() => {
                  var _a, _b, _c;
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(saveJob, ["prevent"])
                    }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "mb-6" }, [
                          createVNode("h6", { class: "font-semibold text-gray-800 mb-4 pb-2 border-b" }, " Basic Information "),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", {
                                class: "block text-sm font-medium text-gray-700 mb-1",
                                for: "jobTitle"
                              }, " Job Title * "),
                              createVNode(_sfc_main$2, {
                                id: "jobTitle",
                                modelValue: newJob.value.title,
                                "onUpdate:modelValue": ($event) => newJob.value.title = $event,
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", {
                                class: "block text-sm font-medium text-gray-700 mb-1",
                                for: "position"
                              }, " Position * "),
                              createVNode(CustomSelect, {
                                options: positions.value,
                                modelValue: newJob.value.position_id,
                                "onUpdate:modelValue": [($event) => newJob.value.position_id = $event, handlePositionSelect],
                                placeholder: "Select a position",
                                "value-key": "position_id",
                                "display-format": (position) => `${position.position_name} (${position.item_number})`,
                                required: ""
                              }, null, 8, ["options", "modelValue", "onUpdate:modelValue", "display-format"])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" }, [
                            createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                              createVNode("div", { class: "form-group" }, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Salary Grade "),
                                createVNode(_sfc_main$2, {
                                  value: ((_b = (_a = selectedPosition.value) == null ? void 0 : _a.salary_grade) == null ? void 0 : _b.amount) ? `₱${selectedPosition.value.salary_grade.amount.toLocaleString()}` : "",
                                  disabled: "",
                                  class: "bg-gray-50"
                                }, null, 8, ["value"])
                              ]),
                              createVNode("div", { class: "form-group" }, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Item Number "),
                                createVNode(_sfc_main$2, {
                                  value: ((_c = selectedPosition.value) == null ? void 0 : _c.item_number) || "",
                                  disabled: "",
                                  class: "bg-gray-50"
                                }, null, 8, ["value"])
                              ])
                            ]),
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", {
                                class: "block text-sm font-medium text-gray-700 mb-1",
                                for: "category"
                              }, " Category * "),
                              createVNode(CustomSelect, {
                                options: categories.value,
                                modelValue: newJob.value.category_id,
                                "onUpdate:modelValue": ($event) => newJob.value.category_id = $event,
                                placeholder: "Select a category",
                                "value-key": "category_id",
                                "display-format": (category) => category.name,
                                required: ""
                              }, null, 8, ["options", "modelValue", "onUpdate:modelValue", "display-format"])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" }, [
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Closing Date * "),
                              createVNode(_sfc_main$2, {
                                type: "date",
                                modelValue: newJob.value.closing_date,
                                "onUpdate:modelValue": ($event) => newJob.value.closing_date = $event,
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Applicant Limit * "),
                              createVNode(_sfc_main$2, {
                                type: "number",
                                modelValue: newJob.value.applicant_limit,
                                "onUpdate:modelValue": ($event) => newJob.value.applicant_limit = $event,
                                min: "1",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" }, [
                            createVNode("div", { class: "form-group" }, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Status * "),
                              createVNode(CustomSelect, {
                                options: [{ value: "Active" }, { value: "Draft" }, { value: "Closed" }],
                                modelValue: newJob.value.status,
                                "onUpdate:modelValue": ($event) => newJob.value.status = $event,
                                "value-key": "value",
                                "display-format": (option) => option.value,
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "display-format"])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "mb-4" }, [
                          createVNode("h6", { class: "font-semibold text-gray-800 mb-4 pb-2 border-b" }, " Job Description "),
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Description * "),
                            createVNode(_sfc_main$1, {
                              modelValue: newJob.value.description,
                              "onUpdate:modelValue": ($event) => newJob.value.description = $event,
                              rows: "4",
                              placeholder: "Enter job description",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "border-t p-4 flex gap-2 justify-end" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors",
                          onClick: ($event) => showAddModal.value = false
                        }, " Cancel ", 8, ["onClick"]),
                        createVNode("button", {
                          type: "submit",
                          class: "btn px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors"
                        }, " Save Job Listing ")
                      ])
                    ], 32)
                  ];
                }),
                _: 2
              }, 1032, ["show", "onClose"]),
              createVNode(_sfc_main$3, {
                show: showEditModal.value,
                onClose: ($event) => showEditModal.value = false,
                title: "Edit Job Listing",
                "max-width": "6xl"
              }, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(updateJob, ["prevent"])
                  }, [
                    createVNode("div", { class: "p-5" }, [
                      createVNode("div", { class: "mb-6" }, [
                        createVNode("h6", { class: "font-semibold text-gray-800 mb-4 pb-2 border-b" }, " Basic Information "),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", {
                              class: "block text-sm font-medium text-gray-700 mb-1",
                              for: "editPosition"
                            }, " Position "),
                            createVNode(CustomSelect, {
                              options: positions.value,
                              modelValue: editingJob.value.position_id,
                              "onUpdate:modelValue": ($event) => editingJob.value.position_id = $event,
                              placeholder: "Select a position",
                              "value-key": "position_id",
                              "display-format": (position) => `${position.position_name} (${position.item_number})`
                            }, null, 8, ["options", "modelValue", "onUpdate:modelValue", "display-format"])
                          ]),
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", {
                              class: "block text-sm font-medium text-gray-700 mb-1",
                              for: "editJobTitle"
                            }, " Job Title "),
                            createVNode(_sfc_main$2, {
                              id: "editJobTitle",
                              modelValue: editingJob.value.title,
                              "onUpdate:modelValue": ($event) => editingJob.value.title = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" }, [
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Closing Date "),
                            createVNode(_sfc_main$2, {
                              type: "date",
                              modelValue: editingJob.value.closing_date,
                              "onUpdate:modelValue": ($event) => editingJob.value.closing_date = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Applicant Limit "),
                            createVNode(_sfc_main$2, {
                              type: "number",
                              modelValue: editingJob.value.applicant_limit,
                              "onUpdate:modelValue": ($event) => editingJob.value.applicant_limit = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Status "),
                            createVNode(CustomSelect, {
                              options: ["Active", "Draft", "Closed"],
                              modelValue: editingJob.value.status,
                              "onUpdate:modelValue": ($event) => editingJob.value.status = $event,
                              placeholder: "Select a status",
                              "display-format": (status) => status
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "display-format"])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "border-t p-4 flex gap-2 justify-end" }, [
                      createVNode("button", {
                        type: "button",
                        class: "btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors",
                        onClick: ($event) => showEditModal.value = false
                      }, " Cancel ", 8, ["onClick"]),
                      createVNode("button", {
                        type: "submit",
                        class: "btn px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors"
                      }, " Update Job Listing ")
                    ])
                  ], 32)
                ]),
                _: 1
              }, 8, ["show", "onClose"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/HR/ManageJobListing/JobListing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
