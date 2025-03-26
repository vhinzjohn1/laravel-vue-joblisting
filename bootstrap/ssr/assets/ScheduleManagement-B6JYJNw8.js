import { ref, computed, unref, withCtx, createVNode, withModifiers, createBlock, createCommentVNode, withDirectives, vModelText, openBlock, vModelSelect, Fragment, renderList, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { H as HRLayout } from "./HRLayout-Deg3lApQ.js";
import { _ as _sfc_main$2 } from "./Header-VZTQj6rE.js";
import { _ as _sfc_main$1 } from "./Modal-Dr2ADp7V.js";
import { C as CustomSelect } from "./CustomSelect-wXlHRS75.js";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./NotificationBell-DssmmqXB.js";
import "./TextInput-DJ5KC4cX.js";
const _sfc_main = {
  __name: "ScheduleManagement",
  __ssrInlineRender: true,
  props: {
    schedules: {
      type: Array,
      required: true
    },
    applications: {
      type: Array,
      required: true
    },
    jobListings: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const showCreateModal = ref(false);
    const showParticipantsModal = ref(false);
    const editingSchedule = ref(null);
    const selectedSchedule = ref(null);
    const processing = ref(false);
    const selectedJobListing = ref("");
    const schedules = ref(props.schedules);
    console.log(schedules);
    const form = ref({
      title: "",
      description: "",
      schedule_date: "",
      location: "",
      status: "Scheduled",
      notes: "",
      participants: [{ application_id: "" }]
    });
    const calendarOptions = computed(() => ({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay"
      },
      timeZone: "local",
      events: schedules.value.map((schedule) => {
        const scheduleDate = new Date(schedule.schedule_date);
        return {
          id: schedule.schedule_id,
          title: schedule.title,
          start: scheduleDate,
          allDay: false,
          extendedProps: {
            location: schedule.location,
            description: schedule.description,
            status: schedule.status
          },
          backgroundColor: getStatusColor(schedule.status),
          borderColor: getStatusColor(schedule.status),
          textColor: "#ffffff"
        };
      }),
      eventTimeFormat: {
        hour: "2-digit",
        minute: "2-digit",
        meridiem: "short"
      },
      eventClick: (info) => {
        const schedule = schedules.value.find(
          (s) => s.schedule_id === parseInt(info.event.id)
        );
        if (schedule) {
          editSchedule(schedule);
        }
      }
    }));
    const getStatusColor = (status) => {
      switch (status) {
        case "Scheduled":
          return "#3788d8";
        case "Completed":
          return "#28a745";
        case "Cancelled":
          return "#dc3545";
        default:
          return "#6c757d";
      }
    };
    const formatDate = (date) => {
      if (!date) return "N/A";
      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short"
        // Add timezone information
      });
      return formattedDate;
    };
    const formatDateForInput = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    const prepareFormData = () => {
      const formData = { ...form.value };
      if (formData.schedule_date) {
        const date = new Date(formData.schedule_date);
        formData.schedule_date = date.toISOString();
      }
      return formData;
    };
    const getStatusClass = (status) => {
      const classes = {
        Scheduled: "bg-blue-100 text-blue-800",
        Completed: "bg-green-100 text-green-800",
        Cancelled: "bg-red-100 text-red-800",
        Pending: "bg-yellow-100 text-yellow-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const filteredApplications = computed(() => {
      const jobListing = props.jobListings.find(
        (job) => job.job_listing_id === selectedJobListing.value
      );
      return jobListing ? jobListing.applications : [];
    });
    const handleJobListingChange = () => {
      form.value.participants = [{ application_id: "" }];
    };
    const closeModal = () => {
      showCreateModal.value = false;
      editingSchedule.value = null;
      selectedJobListing.value = "";
      form.value = {
        title: "",
        description: "",
        schedule_date: "",
        location: "",
        status: "Scheduled",
        notes: "",
        participants: [{ application_id: "" }]
      };
    };
    const addParticipant = () => {
      form.value.participants.push({ application_id: "" });
    };
    const removeParticipant = (index) => {
      form.value.participants.splice(index, 1);
    };
    const handleSubmit = () => {
      processing.value = true;
      const options = {
        onSuccess: (response) => {
          schedules.value = response.props.schedules;
          closeModal();
          processing.value = false;
          showToast("add");
        },
        onError: (error) => {
          showToast("add", false);
          processing.value = false;
        },
        preserveScroll: true
        // Preserve scroll position
      };
      if (editingSchedule.value) {
        router.put(
          route("schedules.update", editingSchedule.value.schedule_id),
          prepareFormData(),
          options
        );
      } else {
        router.post(route("schedules.store"), prepareFormData(), options);
      }
    };
    const editSchedule = (schedule) => {
      editingSchedule.value = schedule;
      if (schedule.participants.length > 0) {
        selectedJobListing.value = schedule.participants[0].application.job_listing_id;
      }
      form.value = {
        title: schedule.title,
        description: schedule.description,
        schedule_date: formatDateForInput(schedule.schedule_date),
        location: schedule.location,
        status: schedule.status,
        notes: schedule.notes,
        participants: schedule.participants.map((participant) => ({
          application_id: participant.application_id
        }))
      };
      showCreateModal.value = true;
    };
    const viewParticipants = (schedule) => {
      selectedSchedule.value = schedule;
      showParticipantsModal.value = true;
    };
    const showToast = (action, isSuccess = true) => {
      let title;
      let icon = isSuccess ? "success" : "error";
      let background = isSuccess ? "#22c55e" : "#ef4444";
      switch (action) {
        case "add":
          title = isSuccess ? "Schedule Added Successfully!" : "Failed to Add Schedule.";
          break;
        case "update":
          title = isSuccess ? "Schedule Updated Successfully!" : "Failed to Update Schedule.";
          break;
        case "delete":
          title = isSuccess ? "Schedule Deleted Successfully!" : "Failed to Delete Schedule.";
          break;
        default:
          title = isSuccess ? "Action Completed!" : "Action Failed!";
      }
      Swal.fire({
        position: "top-end",
        icon,
        title,
        iconColor: "#ffffff",
        showConfirmButton: false,
        timer: 3e3,
        toast: true,
        color: "#ffffff",
        background
      });
    };
    const deleteSchedule = (schedule) => {
      Swal.fire({
        title: "Are you sure?",
        text: `You are about to delete the schedule "${schedule.title}"`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          router.delete(route("schedules.destroy", schedule.schedule_id), {
            onSuccess: (response) => {
              schedules.value = response.props.schedules;
              showToast("delete");
            },
            onError: () => {
              showToast("delete", false);
            },
            preserveScroll: true
          });
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Schedule Management" }, null, _parent));
      _push(ssrRenderComponent(HRLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { title: "Schedule Management" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { title: "Schedule Management" })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-5" data-v-79792cfd${_scopeId}><div class="container-fluid px-4" data-v-79792cfd${_scopeId}><div class="card shadow-sm rounded-lg overflow-hidden bg-white mb-6" data-v-79792cfd${_scopeId}><div class="card-header bg-white py-4 px-4 border-b" data-v-79792cfd${_scopeId}><div class="flex justify-between items-center" data-v-79792cfd${_scopeId}><h2 class="text-xl font-semibold" data-v-79792cfd${_scopeId}>Schedules</h2><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-79792cfd${_scopeId}><i class="fas fa-plus mr-2" data-v-79792cfd${_scopeId}></i> Create Schedule </button></div></div><div class="p-4" data-v-79792cfd${_scopeId}><div class="mb-6" data-v-79792cfd${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FullCalendar), { options: calendarOptions.value }, null, _parent2, _scopeId));
            _push2(`</div><div class="overflow-x-auto" data-v-79792cfd${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-79792cfd${_scopeId}><thead class="bg-gray-50" data-v-79792cfd${_scopeId}><tr data-v-79792cfd${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" data-v-79792cfd${_scopeId}> Title </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" data-v-79792cfd${_scopeId}> Date </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" data-v-79792cfd${_scopeId}> Location </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" data-v-79792cfd${_scopeId}> Status </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" data-v-79792cfd${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-79792cfd${_scopeId}><!--[-->`);
            ssrRenderList(schedules.value, (schedule) => {
              _push2(`<tr data-v-79792cfd${_scopeId}><td class="px-6 py-4" data-v-79792cfd${_scopeId}>${ssrInterpolate(schedule.title)}</td><td class="px-6 py-4" data-v-79792cfd${_scopeId}>${ssrInterpolate(formatDate(
                schedule.schedule_date
              ))}</td><td class="px-6 py-4" data-v-79792cfd${_scopeId}>${ssrInterpolate(schedule.location)}</td><td class="px-6 py-4" data-v-79792cfd${_scopeId}><span class="${ssrRenderClass([
                getStatusClass(
                  schedule.status
                ),
                "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              ])}" data-v-79792cfd${_scopeId}>${ssrInterpolate(schedule.status)}</span></td><td class="px-6 py-4" data-v-79792cfd${_scopeId}><button class="text-blue-600 hover:text-blue-900 mr-2" data-v-79792cfd${_scopeId}><i class="fas fa-users" data-v-79792cfd${_scopeId}></i></button><button class="text-blue-600 hover:text-blue-900 mr-2" data-v-79792cfd${_scopeId}><i class="fas fa-edit" data-v-79792cfd${_scopeId}></i></button><button class="text-red-600 hover:text-red-900" data-v-79792cfd${_scopeId}><i class="fas fa-trash" data-v-79792cfd${_scopeId}></i></button></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              title: editingSchedule.value ? "Edit Schedule" : "Create New Schedule",
              show: showCreateModal.value,
              onClose: closeModal,
              maxWidth: "2xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6" data-v-79792cfd${_scopeId2}><form class="space-y-4" data-v-79792cfd${_scopeId2}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-79792cfd${_scopeId2}><div data-v-79792cfd${_scopeId2}><label class="block text-sm font-medium text-gray-700" data-v-79792cfd${_scopeId2}>Title</label><input type="text"${ssrRenderAttr("value", form.value.title)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required data-v-79792cfd${_scopeId2}></div><div data-v-79792cfd${_scopeId2}><label class="block text-sm font-medium text-gray-700" data-v-79792cfd${_scopeId2}>Location</label><input type="text"${ssrRenderAttr("value", form.value.location)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required data-v-79792cfd${_scopeId2}></div><div data-v-79792cfd${_scopeId2}><label class="block text-sm font-medium text-gray-700" data-v-79792cfd${_scopeId2}>Date &amp; Time</label><input type="datetime-local"${ssrRenderAttr("value", form.value.schedule_date)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required data-v-79792cfd${_scopeId2}><p class="mt-1 text-xs text-gray-500" data-v-79792cfd${_scopeId2}> Make sure your local timezone is correct. The system will handle timezone conversion. </p></div>`);
                  if (editingSchedule.value) {
                    _push3(`<div data-v-79792cfd${_scopeId2}><label class="block text-sm font-medium text-gray-700" data-v-79792cfd${_scopeId2}>Status</label><select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" data-v-79792cfd${_scopeId2}><option value="Scheduled" data-v-79792cfd${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "Scheduled") : ssrLooseEqual(form.value.status, "Scheduled")) ? " selected" : ""}${_scopeId2}>Scheduled</option><option value="Completed" data-v-79792cfd${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "Completed") : ssrLooseEqual(form.value.status, "Completed")) ? " selected" : ""}${_scopeId2}>Completed</option><option value="Cancelled" data-v-79792cfd${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "Cancelled") : ssrLooseEqual(form.value.status, "Cancelled")) ? " selected" : ""}${_scopeId2}>Cancelled</option></select></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div data-v-79792cfd${_scopeId2}><label class="block text-sm font-medium text-gray-700" data-v-79792cfd${_scopeId2}>Description</label><textarea rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required data-v-79792cfd${_scopeId2}>${ssrInterpolate(form.value.description)}</textarea></div><div data-v-79792cfd${_scopeId2}><label class="block text-sm font-medium text-gray-700" data-v-79792cfd${_scopeId2}>Notes</label><textarea rows="2" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" data-v-79792cfd${_scopeId2}>${ssrInterpolate(form.value.notes)}</textarea></div>`);
                  if (!editingSchedule.value) {
                    _push3(`<div data-v-79792cfd${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-79792cfd${_scopeId2}>Participants</label><div class="mb-4" data-v-79792cfd${_scopeId2}><label class="block text-sm font-medium text-gray-700" data-v-79792cfd${_scopeId2}>Select Job Listing</label>`);
                    _push3(ssrRenderComponent(CustomSelect, {
                      modelValue: selectedJobListing.value,
                      "onUpdate:modelValue": ($event) => selectedJobListing.value = $event,
                      options: __props.jobListings,
                      displayFormat: (option) => `${option.position.position_name} - ${option.title}`,
                      valueKey: "job_listing_id",
                      placeholder: "Select Job Listing",
                      onSelect: handleJobListingChange
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="space-y-2" data-v-79792cfd${_scopeId2}><!--[-->`);
                    ssrRenderList(form.value.participants, (participant, index) => {
                      _push3(`<div class="flex items-center gap-2" data-v-79792cfd${_scopeId2}><div class="flex-1" data-v-79792cfd${_scopeId2}>`);
                      _push3(ssrRenderComponent(CustomSelect, {
                        modelValue: participant.application_id,
                        "onUpdate:modelValue": ($event) => participant.application_id = $event,
                        options: filteredApplications.value,
                        displayFormat: (option) => {
                          return `${option.user.user_detail.firstname} ${option.user.user_detail.lastname} - ${option.user.email} (${option.status})`;
                        },
                        valueKey: "application_id",
                        placeholder: "Select Applicant",
                        required: ""
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><button type="button" class="text-red-600 hover:text-red-800" data-v-79792cfd${_scopeId2}><i class="fas fa-times" data-v-79792cfd${_scopeId2}></i></button></div>`);
                    });
                    _push3(`<!--]--></div><button type="button" class="mt-2 text-sm text-blue-600 hover:text-blue-800" data-v-79792cfd${_scopeId2}><i class="fas fa-plus mr-1" data-v-79792cfd${_scopeId2}></i> Add Participant </button></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="flex justify-end space-x-3 mt-6" data-v-79792cfd${_scopeId2}><button type="button" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50" data-v-79792cfd${_scopeId2}> Cancel </button><button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} data-v-79792cfd${_scopeId2}>${ssrInterpolate(editingSchedule.value ? "Update Schedule" : "Create Schedule")}</button></div></form></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(handleSubmit, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Title"),
                            withDirectives(createVNode("input", {
                              type: "text",
                              "onUpdate:modelValue": ($event) => form.value.title = $event,
                              class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, form.value.title]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Location"),
                            withDirectives(createVNode("input", {
                              type: "text",
                              "onUpdate:modelValue": ($event) => form.value.location = $event,
                              class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, form.value.location]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Date & Time"),
                            withDirectives(createVNode("input", {
                              type: "datetime-local",
                              "onUpdate:modelValue": ($event) => form.value.schedule_date = $event,
                              class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, form.value.schedule_date]
                            ]),
                            createVNode("p", { class: "mt-1 text-xs text-gray-500" }, " Make sure your local timezone is correct. The system will handle timezone conversion. ")
                          ]),
                          editingSchedule.value ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Status"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => form.value.status = $event,
                              class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            }, [
                              createVNode("option", { value: "Scheduled" }, "Scheduled"),
                              createVNode("option", { value: "Completed" }, "Completed"),
                              createVNode("option", { value: "Cancelled" }, "Cancelled")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, form.value.status]
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Description"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => form.value.description = $event,
                            rows: "3",
                            class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, form.value.description]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Notes"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => form.value.notes = $event,
                            rows: "2",
                            class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, form.value.notes]
                          ])
                        ]),
                        !editingSchedule.value ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Participants"),
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Select Job Listing"),
                            createVNode(CustomSelect, {
                              modelValue: selectedJobListing.value,
                              "onUpdate:modelValue": ($event) => selectedJobListing.value = $event,
                              options: __props.jobListings,
                              displayFormat: (option) => `${option.position.position_name} - ${option.title}`,
                              valueKey: "job_listing_id",
                              placeholder: "Select Job Listing",
                              onSelect: handleJobListingChange
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "displayFormat"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(form.value.participants, (participant, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "flex items-center gap-2"
                              }, [
                                createVNode("div", { class: "flex-1" }, [
                                  createVNode(CustomSelect, {
                                    modelValue: participant.application_id,
                                    "onUpdate:modelValue": ($event) => participant.application_id = $event,
                                    options: filteredApplications.value,
                                    displayFormat: (option) => {
                                      return `${option.user.user_detail.firstname} ${option.user.user_detail.lastname} - ${option.user.email} (${option.status})`;
                                    },
                                    valueKey: "application_id",
                                    placeholder: "Select Applicant",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "displayFormat"])
                                ]),
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeParticipant(index),
                                  class: "text-red-600 hover:text-red-800"
                                }, [
                                  createVNode("i", { class: "fas fa-times" })
                                ], 8, ["onClick"])
                              ]);
                            }), 128))
                          ]),
                          createVNode("button", {
                            type: "button",
                            onClick: addParticipant,
                            class: "mt-2 text-sm text-blue-600 hover:text-blue-800"
                          }, [
                            createVNode("i", { class: "fas fa-plus mr-1" }),
                            createTextVNode(" Add Participant ")
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex justify-end space-x-3 mt-6" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: closeModal,
                            class: "px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                          }, " Cancel "),
                          createVNode("button", {
                            type: "submit",
                            class: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
                            disabled: processing.value
                          }, toDisplayString(editingSchedule.value ? "Update Schedule" : "Create Schedule"), 9, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              show: showParticipantsModal.value,
              title: selectedSchedule.value ? selectedSchedule.value.title : "",
              onClose: ($event) => showParticipantsModal.value = false,
              maxWidth: "6xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (selectedSchedule.value) {
                    _push3(`<div class="p-6" data-v-79792cfd${_scopeId2}><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-79792cfd${_scopeId2}><div class="md:col-span-2" data-v-79792cfd${_scopeId2}><div class="prose max-w-none" data-v-79792cfd${_scopeId2}><h3 class="text-lg font-semibold mb-3" data-v-79792cfd${_scopeId2}> Interview Details </h3><div class="bg-gray-50 p-4 rounded-lg mb-6" data-v-79792cfd${_scopeId2}><div class="mb-4" data-v-79792cfd${_scopeId2}><h4 class="text-sm font-medium text-gray-500" data-v-79792cfd${_scopeId2}> Date &amp; Time </h4><p class="text-gray-800" data-v-79792cfd${_scopeId2}>${ssrInterpolate(formatDate(
                      selectedSchedule.value.schedule_date
                    ))}</p></div><div class="mb-4" data-v-79792cfd${_scopeId2}><h4 class="text-sm font-medium text-gray-500" data-v-79792cfd${_scopeId2}> Location </h4><p class="text-gray-800" data-v-79792cfd${_scopeId2}>${ssrInterpolate(selectedSchedule.value.location)}</p></div><div class="mb-4" data-v-79792cfd${_scopeId2}><h4 class="text-sm font-medium text-gray-500" data-v-79792cfd${_scopeId2}> Description </h4><p class="text-gray-800" data-v-79792cfd${_scopeId2}>${ssrInterpolate(selectedSchedule.value.description)}</p></div><div data-v-79792cfd${_scopeId2}><h4 class="text-sm font-medium text-gray-500" data-v-79792cfd${_scopeId2}> Additional Notes </h4><p class="text-gray-800" data-v-79792cfd${_scopeId2}>${ssrInterpolate(selectedSchedule.value.notes || "No additional notes")}</p></div></div></div></div><div class="md:col-span-1" data-v-79792cfd${_scopeId2}><div class="bg-gray-50 p-4 rounded-lg mb-6" data-v-79792cfd${_scopeId2}><h3 class="text-lg font-semibold mb-3" data-v-79792cfd${_scopeId2}> Admin Actions </h3><div class="space-y-2" data-v-79792cfd${_scopeId2}><button class="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center" data-v-79792cfd${_scopeId2}><i class="fas fa-edit mr-2" data-v-79792cfd${_scopeId2}></i> Edit Schedule </button><button class="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center" data-v-79792cfd${_scopeId2}><i class="fas fa-trash mr-2" data-v-79792cfd${_scopeId2}></i> Delete Schedule </button></div></div></div></div><h3 class="text-lg font-semibold mb-4 mt-6" data-v-79792cfd${_scopeId2}> Schedule Participants </h3><div class="space-y-4" data-v-79792cfd${_scopeId2}><!--[-->`);
                    ssrRenderList(selectedSchedule.value.participants, (participant) => {
                      var _a;
                      _push3(`<div class="border rounded-lg p-4" data-v-79792cfd${_scopeId2}><div class="flex justify-between items-start" data-v-79792cfd${_scopeId2}><div data-v-79792cfd${_scopeId2}><h3 class="font-medium" data-v-79792cfd${_scopeId2}>${ssrInterpolate(participant.user.name)}</h3><p class="text-sm text-gray-600" data-v-79792cfd${_scopeId2}>${ssrInterpolate(participant.application.jobListing.position.position_name)} - ${ssrInterpolate(participant.application.jobListing.title)}</p><div class="mt-2 text-sm text-gray-500" data-v-79792cfd${_scopeId2}><p data-v-79792cfd${_scopeId2}>Email: ${ssrInterpolate(participant.user.email)}</p><p data-v-79792cfd${_scopeId2}> Contact: ${ssrInterpolate(((_a = participant.user.userDetail) == null ? void 0 : _a.contact_number) || "N/A")}</p><p data-v-79792cfd${_scopeId2}> Application Status: ${ssrInterpolate(participant.application.status)}</p></div></div><span class="${ssrRenderClass([getStatusClass(participant.status), "px-2 py-1 rounded-full text-xs"])}" data-v-79792cfd${_scopeId2}>${ssrInterpolate(participant.status)}</span></div></div>`);
                    });
                    _push3(`<!--]--></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    selectedSchedule.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-6"
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                        createVNode("div", { class: "md:col-span-2" }, [
                          createVNode("div", { class: "prose max-w-none" }, [
                            createVNode("h3", { class: "text-lg font-semibold mb-3" }, " Interview Details "),
                            createVNode("div", { class: "bg-gray-50 p-4 rounded-lg mb-6" }, [
                              createVNode("div", { class: "mb-4" }, [
                                createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Date & Time "),
                                createVNode("p", { class: "text-gray-800" }, toDisplayString(formatDate(
                                  selectedSchedule.value.schedule_date
                                )), 1)
                              ]),
                              createVNode("div", { class: "mb-4" }, [
                                createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Location "),
                                createVNode("p", { class: "text-gray-800" }, toDisplayString(selectedSchedule.value.location), 1)
                              ]),
                              createVNode("div", { class: "mb-4" }, [
                                createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Description "),
                                createVNode("p", { class: "text-gray-800" }, toDisplayString(selectedSchedule.value.description), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Additional Notes "),
                                createVNode("p", { class: "text-gray-800" }, toDisplayString(selectedSchedule.value.notes || "No additional notes"), 1)
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "md:col-span-1" }, [
                          createVNode("div", { class: "bg-gray-50 p-4 rounded-lg mb-6" }, [
                            createVNode("h3", { class: "text-lg font-semibold mb-3" }, " Admin Actions "),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("button", {
                                onClick: ($event) => editSchedule(selectedSchedule.value),
                                class: "w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                              }, [
                                createVNode("i", { class: "fas fa-edit mr-2" }),
                                createTextVNode(" Edit Schedule ")
                              ], 8, ["onClick"]),
                              createVNode("button", {
                                onClick: ($event) => deleteSchedule(selectedSchedule.value),
                                class: "w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                              }, [
                                createVNode("i", { class: "fas fa-trash mr-2" }),
                                createTextVNode(" Delete Schedule ")
                              ], 8, ["onClick"])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("h3", { class: "text-lg font-semibold mb-4 mt-6" }, " Schedule Participants "),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(selectedSchedule.value.participants, (participant) => {
                          var _a;
                          return openBlock(), createBlock("div", {
                            key: participant.participant_id,
                            class: "border rounded-lg p-4"
                          }, [
                            createVNode("div", { class: "flex justify-between items-start" }, [
                              createVNode("div", null, [
                                createVNode("h3", { class: "font-medium" }, toDisplayString(participant.user.name), 1),
                                createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(participant.application.jobListing.position.position_name) + " - " + toDisplayString(participant.application.jobListing.title), 1),
                                createVNode("div", { class: "mt-2 text-sm text-gray-500" }, [
                                  createVNode("p", null, "Email: " + toDisplayString(participant.user.email), 1),
                                  createVNode("p", null, " Contact: " + toDisplayString(((_a = participant.user.userDetail) == null ? void 0 : _a.contact_number) || "N/A"), 1),
                                  createVNode("p", null, " Application Status: " + toDisplayString(participant.application.status), 1)
                                ])
                              ]),
                              createVNode("span", {
                                class: [getStatusClass(participant.status), "px-2 py-1 rounded-full text-xs"]
                              }, toDisplayString(participant.status), 3)
                            ])
                          ]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "py-5" }, [
                createVNode("div", { class: "container-fluid px-4" }, [
                  createVNode("div", { class: "card shadow-sm rounded-lg overflow-hidden bg-white mb-6" }, [
                    createVNode("div", { class: "card-header bg-white py-4 px-4 border-b" }, [
                      createVNode("div", { class: "flex justify-between items-center" }, [
                        createVNode("h2", { class: "text-xl font-semibold" }, "Schedules"),
                        createVNode("button", {
                          onClick: ($event) => showCreateModal.value = true,
                          class: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        }, [
                          createVNode("i", { class: "fas fa-plus mr-2" }),
                          createTextVNode(" Create Schedule ")
                        ], 8, ["onClick"])
                      ])
                    ]),
                    createVNode("div", { class: "p-4" }, [
                      createVNode("div", { class: "mb-6" }, [
                        createVNode(unref(FullCalendar), { options: calendarOptions.value }, null, 8, ["options"])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                              }, " Title "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                              }, " Date "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                              }, " Location "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                              }, " Status "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                              }, " Actions ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(schedules.value, (schedule) => {
                              return openBlock(), createBlock("tr", {
                                key: schedule.schedule_id
                              }, [
                                createVNode("td", { class: "px-6 py-4" }, toDisplayString(schedule.title), 1),
                                createVNode("td", { class: "px-6 py-4" }, toDisplayString(formatDate(
                                  schedule.schedule_date
                                )), 1),
                                createVNode("td", { class: "px-6 py-4" }, toDisplayString(schedule.location), 1),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("span", {
                                    class: [
                                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                      getStatusClass(
                                        schedule.status
                                      )
                                    ]
                                  }, toDisplayString(schedule.status), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("button", {
                                    onClick: ($event) => viewParticipants(schedule),
                                    class: "text-blue-600 hover:text-blue-900 mr-2"
                                  }, [
                                    createVNode("i", { class: "fas fa-users" })
                                  ], 8, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => editSchedule(schedule),
                                    class: "text-blue-600 hover:text-blue-900 mr-2"
                                  }, [
                                    createVNode("i", { class: "fas fa-edit" })
                                  ], 8, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => deleteSchedule(schedule),
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
                title: editingSchedule.value ? "Edit Schedule" : "Create New Schedule",
                show: showCreateModal.value,
                onClose: closeModal,
                maxWidth: "2xl"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-6" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(handleSubmit, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Title"),
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => form.value.title = $event,
                            class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, form.value.title]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Location"),
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => form.value.location = $event,
                            class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, form.value.location]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Date & Time"),
                          withDirectives(createVNode("input", {
                            type: "datetime-local",
                            "onUpdate:modelValue": ($event) => form.value.schedule_date = $event,
                            class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, form.value.schedule_date]
                          ]),
                          createVNode("p", { class: "mt-1 text-xs text-gray-500" }, " Make sure your local timezone is correct. The system will handle timezone conversion. ")
                        ]),
                        editingSchedule.value ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Status"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => form.value.status = $event,
                            class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          }, [
                            createVNode("option", { value: "Scheduled" }, "Scheduled"),
                            createVNode("option", { value: "Completed" }, "Completed"),
                            createVNode("option", { value: "Cancelled" }, "Cancelled")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, form.value.status]
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Description"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => form.value.description = $event,
                          rows: "3",
                          class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, form.value.description]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Notes"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => form.value.notes = $event,
                          rows: "2",
                          class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, form.value.notes]
                        ])
                      ]),
                      !editingSchedule.value ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Participants"),
                        createVNode("div", { class: "mb-4" }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Select Job Listing"),
                          createVNode(CustomSelect, {
                            modelValue: selectedJobListing.value,
                            "onUpdate:modelValue": ($event) => selectedJobListing.value = $event,
                            options: __props.jobListings,
                            displayFormat: (option) => `${option.position.position_name} - ${option.title}`,
                            valueKey: "job_listing_id",
                            placeholder: "Select Job Listing",
                            onSelect: handleJobListingChange
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "displayFormat"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(form.value.participants, (participant, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "flex items-center gap-2"
                            }, [
                              createVNode("div", { class: "flex-1" }, [
                                createVNode(CustomSelect, {
                                  modelValue: participant.application_id,
                                  "onUpdate:modelValue": ($event) => participant.application_id = $event,
                                  options: filteredApplications.value,
                                  displayFormat: (option) => {
                                    return `${option.user.user_detail.firstname} ${option.user.user_detail.lastname} - ${option.user.email} (${option.status})`;
                                  },
                                  valueKey: "application_id",
                                  placeholder: "Select Applicant",
                                  required: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "displayFormat"])
                              ]),
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => removeParticipant(index),
                                class: "text-red-600 hover:text-red-800"
                              }, [
                                createVNode("i", { class: "fas fa-times" })
                              ], 8, ["onClick"])
                            ]);
                          }), 128))
                        ]),
                        createVNode("button", {
                          type: "button",
                          onClick: addParticipant,
                          class: "mt-2 text-sm text-blue-600 hover:text-blue-800"
                        }, [
                          createVNode("i", { class: "fas fa-plus mr-1" }),
                          createTextVNode(" Add Participant ")
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex justify-end space-x-3 mt-6" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: closeModal,
                          class: "px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        }, " Cancel "),
                        createVNode("button", {
                          type: "submit",
                          class: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
                          disabled: processing.value
                        }, toDisplayString(editingSchedule.value ? "Update Schedule" : "Create Schedule"), 9, ["disabled"])
                      ])
                    ], 32)
                  ])
                ]),
                _: 1
              }, 8, ["title", "show"]),
              createVNode(_sfc_main$1, {
                show: showParticipantsModal.value,
                title: selectedSchedule.value ? selectedSchedule.value.title : "",
                onClose: ($event) => showParticipantsModal.value = false,
                maxWidth: "6xl"
              }, {
                default: withCtx(() => [
                  selectedSchedule.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                      createVNode("div", { class: "md:col-span-2" }, [
                        createVNode("div", { class: "prose max-w-none" }, [
                          createVNode("h3", { class: "text-lg font-semibold mb-3" }, " Interview Details "),
                          createVNode("div", { class: "bg-gray-50 p-4 rounded-lg mb-6" }, [
                            createVNode("div", { class: "mb-4" }, [
                              createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Date & Time "),
                              createVNode("p", { class: "text-gray-800" }, toDisplayString(formatDate(
                                selectedSchedule.value.schedule_date
                              )), 1)
                            ]),
                            createVNode("div", { class: "mb-4" }, [
                              createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Location "),
                              createVNode("p", { class: "text-gray-800" }, toDisplayString(selectedSchedule.value.location), 1)
                            ]),
                            createVNode("div", { class: "mb-4" }, [
                              createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Description "),
                              createVNode("p", { class: "text-gray-800" }, toDisplayString(selectedSchedule.value.description), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", { class: "text-sm font-medium text-gray-500" }, " Additional Notes "),
                              createVNode("p", { class: "text-gray-800" }, toDisplayString(selectedSchedule.value.notes || "No additional notes"), 1)
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "md:col-span-1" }, [
                        createVNode("div", { class: "bg-gray-50 p-4 rounded-lg mb-6" }, [
                          createVNode("h3", { class: "text-lg font-semibold mb-3" }, " Admin Actions "),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("button", {
                              onClick: ($event) => editSchedule(selectedSchedule.value),
                              class: "w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                            }, [
                              createVNode("i", { class: "fas fa-edit mr-2" }),
                              createTextVNode(" Edit Schedule ")
                            ], 8, ["onClick"]),
                            createVNode("button", {
                              onClick: ($event) => deleteSchedule(selectedSchedule.value),
                              class: "w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                            }, [
                              createVNode("i", { class: "fas fa-trash mr-2" }),
                              createTextVNode(" Delete Schedule ")
                            ], 8, ["onClick"])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("h3", { class: "text-lg font-semibold mb-4 mt-6" }, " Schedule Participants "),
                    createVNode("div", { class: "space-y-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(selectedSchedule.value.participants, (participant) => {
                        var _a;
                        return openBlock(), createBlock("div", {
                          key: participant.participant_id,
                          class: "border rounded-lg p-4"
                        }, [
                          createVNode("div", { class: "flex justify-between items-start" }, [
                            createVNode("div", null, [
                              createVNode("h3", { class: "font-medium" }, toDisplayString(participant.user.name), 1),
                              createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(participant.application.jobListing.position.position_name) + " - " + toDisplayString(participant.application.jobListing.title), 1),
                              createVNode("div", { class: "mt-2 text-sm text-gray-500" }, [
                                createVNode("p", null, "Email: " + toDisplayString(participant.user.email), 1),
                                createVNode("p", null, " Contact: " + toDisplayString(((_a = participant.user.userDetail) == null ? void 0 : _a.contact_number) || "N/A"), 1),
                                createVNode("p", null, " Application Status: " + toDisplayString(participant.application.status), 1)
                              ])
                            ]),
                            createVNode("span", {
                              class: [getStatusClass(participant.status), "px-2 py-1 rounded-full text-xs"]
                            }, toDisplayString(participant.status), 3)
                          ])
                        ]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["show", "title", "onClose"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/HR/Schedule/ScheduleManagement.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ScheduleManagement = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-79792cfd"]]);
export {
  ScheduleManagement as default
};
