import { ref, withCtx, unref, createVNode, withModifiers, withDirectives, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import axios from "axios";
import { A as AdminLayout } from "./AdminLayout-BD39AHzM.js";
import { _ as _sfc_main$4 } from "./Header-VZTQj6rE.js";
import { _ as _sfc_main$1 } from "./DataTable-BR2biP7G.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./Modal-Dr2ADp7V.js";
import { _ as _sfc_main$3 } from "./TextInput-DJ5KC4cX.js";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./NotificationBell-DssmmqXB.js";
const _sfc_main = {
  __name: "AdminDashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref(usePage().props.users);
    const form = useForm({
      username: "",
      password: "",
      email: "",
      role_name: "",
      user_id: ""
    });
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const closeAddModal = () => {
      showAddModal.value = false;
      form.reset();
    };
    const showToast = (action, isSuccess = true, message = "") => {
      let title, icon, background, toastOptions;
      switch (action) {
        case "add":
          title = isSuccess ? "User Added Successfully!" : "Failed to Add User.";
          break;
        case "edit":
          title = isSuccess ? "User Updated Successfully!" : "Failed to Update User.";
          break;
        case "delete":
          title = isSuccess ? "User Deleted Successfully!" : "Failed to Delete User.";
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
    const showEdit = (item) => {
      form.username = item.username;
      form.email = item.email;
      form.password = item.password || "";
      form.role_name = item.role_name;
      form.user_id = item.user_id;
      showEditModal.value = true;
    };
    const closeEditModal = () => {
      showEditModal.value = false;
      form.reset();
    };
    const saveChanges = () => {
      axios.post("admin", form).then((response) => {
        data.value = response.data;
        closeAddModal();
        showToast("add");
      }).catch((error) => {
        showToast("add", false, error.response.data.error);
      });
    };
    const editUser = () => {
      axios.put(`admin/${form.user_id}`, form).then((response) => {
        data.value = response.data;
        console.log(response.data);
        closeEditModal();
        showToast("edit");
      }).catch((error) => {
        showToast("edit", false, error.response.data.error);
      });
    };
    const deleteItem = (item) => {
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
          axios.delete(`admin/${item.user_id}`).then(() => {
            data.value = data.value.filter(
              (user) => user.user_id !== item.user_id
            );
            showToast("delete");
          }).catch((error) => {
            showToast("delete", false, error.response.data.error);
          });
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, { title: "Admin Dashboard" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4, { title: "Admin Dashboard" })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Admin Dashboard" }, null, _parent2, _scopeId));
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white rounded-lg shadow overflow-hidden"${_scopeId}><button class="btn btn-success float-right m-3"${_scopeId}> Add </button>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              data: data.value,
              pageSize: 10,
              columns: ["user_id", "username", "email", "role_name"],
              onEdit: showEdit,
              onDelete: deleteItem
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: showAddModal.value,
              onClose: closeAddModal,
              maxWidth: "2xl",
              title: "Add User"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6"${_scopeId2}><form class="space-y-4"${_scopeId2}><div class="form-group"${_scopeId2}><label for="exampleInputUsername"${_scopeId2}>Username</label>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    type: "text",
                    class: "form-control w-full",
                    id: "exampleInputUsername",
                    modelValue: unref(form).username,
                    "onUpdate:modelValue": ($event) => unref(form).username = $event,
                    required: "",
                    autocomplete: "username",
                    autofocus: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label for="exampleInputEmail"${_scopeId2}>Email</label>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    type: "email",
                    class: "form-control w-full",
                    id: "exampleInputEmail",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autocomplete: "email"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label for="exampleInputPassword"${_scopeId2}>Password</label>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    type: "password",
                    class: "form-control w-full",
                    id: "exampleInputPassword",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label for="exampleInputRole"${_scopeId2}>Role</label><select class="form-control" id="exampleInputRole" required${_scopeId2}><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(unref(form).role_name) ? ssrLooseContain(unref(form).role_name, "admin") : ssrLooseEqual(unref(form).role_name, "admin")) ? " selected" : ""}${_scopeId2}>Admin</option><option value="hr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).role_name) ? ssrLooseContain(unref(form).role_name, "hr") : ssrLooseEqual(unref(form).role_name, "hr")) ? " selected" : ""}${_scopeId2}>HR Personnel</option><option value="applicant"${ssrIncludeBooleanAttr(Array.isArray(unref(form).role_name) ? ssrLooseContain(unref(form).role_name, "applicant") : ssrLooseEqual(unref(form).role_name, "applicant")) ? " selected" : ""}${_scopeId2}>Applicant</option></select></div><div class="modal-footer"${_scopeId2}><button type="button" class="btn bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-200"${_scopeId2}> Close </button><button type="submit" class="btn bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"${_scopeId2}> Save changes </button></div></form></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(saveChanges, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "form-group" }, [
                          createVNode("label", { for: "exampleInputUsername" }, "Username"),
                          createVNode(_sfc_main$3, {
                            type: "text",
                            class: "form-control w-full",
                            id: "exampleInputUsername",
                            modelValue: unref(form).username,
                            "onUpdate:modelValue": ($event) => unref(form).username = $event,
                            required: "",
                            autocomplete: "username",
                            autofocus: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "form-group" }, [
                          createVNode("label", { for: "exampleInputEmail" }, "Email"),
                          createVNode(_sfc_main$3, {
                            type: "email",
                            class: "form-control w-full",
                            id: "exampleInputEmail",
                            modelValue: unref(form).email,
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            required: "",
                            autocomplete: "email"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "form-group" }, [
                          createVNode("label", { for: "exampleInputPassword" }, "Password"),
                          createVNode(_sfc_main$3, {
                            type: "password",
                            class: "form-control w-full",
                            id: "exampleInputPassword",
                            modelValue: unref(form).password,
                            "onUpdate:modelValue": ($event) => unref(form).password = $event,
                            required: "",
                            autocomplete: "new-password"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "form-group" }, [
                          createVNode("label", { for: "exampleInputRole" }, "Role"),
                          withDirectives(createVNode("select", {
                            class: "form-control",
                            id: "exampleInputRole",
                            "onUpdate:modelValue": ($event) => unref(form).role_name = $event,
                            required: ""
                          }, [
                            createVNode("option", { value: "admin" }, "Admin"),
                            createVNode("option", { value: "hr" }, "HR Personnel"),
                            createVNode("option", { value: "applicant" }, "Applicant")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).role_name]
                          ])
                        ]),
                        createVNode("div", { class: "modal-footer" }, [
                          createVNode("button", {
                            type: "button",
                            class: "btn bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-200",
                            onClick: closeAddModal
                          }, " Close "),
                          createVNode("button", {
                            type: "submit",
                            class: "btn bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
                          }, " Save changes ")
                        ])
                      ], 32)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: showEditModal.value,
              onClose: closeEditModal,
              maxWidth: "2xl",
              title: "Edit User"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6"${_scopeId2}><form class="space-y-4"${_scopeId2}><div class="form-group"${_scopeId2}><label for="editUserName"${_scopeId2}>Username</label>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    type: "text",
                    class: "form-control w-full",
                    id: "editUserName",
                    modelValue: unref(form).username,
                    "onUpdate:modelValue": ($event) => unref(form).username = $event,
                    required: "",
                    autocomplete: "username",
                    autofocus: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label for="editEmail"${_scopeId2}>Email</label>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    type: "email",
                    class: "form-control w-full",
                    id: "editEmail",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label for="editPassword"${_scopeId2}>Password</label>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    type: "password",
                    class: "form-control w-full",
                    id: "editPassword",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="form-group"${_scopeId2}><label for="editRole"${_scopeId2}>Role</label><select class="form-control" id="editRole" required${_scopeId2}><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(unref(form).role_name) ? ssrLooseContain(unref(form).role_name, "admin") : ssrLooseEqual(unref(form).role_name, "admin")) ? " selected" : ""}${_scopeId2}>Admin</option><option value="hr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).role_name) ? ssrLooseContain(unref(form).role_name, "hr") : ssrLooseEqual(unref(form).role_name, "hr")) ? " selected" : ""}${_scopeId2}>HR Personnel</option><option value="applicant"${ssrIncludeBooleanAttr(Array.isArray(unref(form).role_name) ? ssrLooseContain(unref(form).role_name, "applicant") : ssrLooseEqual(unref(form).role_name, "applicant")) ? " selected" : ""}${_scopeId2}>Applicant</option></select></div><div class="modal-footer"${_scopeId2}><button type="button" class="btn bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-200"${_scopeId2}> Close </button><button type="submit" class="btn bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"${_scopeId2}> Save changes </button></div></form></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(editUser, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "form-group" }, [
                          createVNode("label", { for: "editUserName" }, "Username"),
                          createVNode(_sfc_main$3, {
                            type: "text",
                            class: "form-control w-full",
                            id: "editUserName",
                            modelValue: unref(form).username,
                            "onUpdate:modelValue": ($event) => unref(form).username = $event,
                            required: "",
                            autocomplete: "username",
                            autofocus: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "form-group" }, [
                          createVNode("label", { for: "editEmail" }, "Email"),
                          createVNode(_sfc_main$3, {
                            type: "email",
                            class: "form-control w-full",
                            id: "editEmail",
                            modelValue: unref(form).email,
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "form-group" }, [
                          createVNode("label", { for: "editPassword" }, "Password"),
                          createVNode(_sfc_main$3, {
                            type: "password",
                            class: "form-control w-full",
                            id: "editPassword",
                            modelValue: unref(form).password,
                            "onUpdate:modelValue": ($event) => unref(form).password = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "form-group" }, [
                          createVNode("label", { for: "editRole" }, "Role"),
                          withDirectives(createVNode("select", {
                            class: "form-control",
                            id: "editRole",
                            "onUpdate:modelValue": ($event) => unref(form).role_name = $event,
                            required: ""
                          }, [
                            createVNode("option", { value: "admin" }, "Admin"),
                            createVNode("option", { value: "hr" }, "HR Personnel"),
                            createVNode("option", { value: "applicant" }, "Applicant")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).role_name]
                          ])
                        ]),
                        createVNode("div", { class: "modal-footer" }, [
                          createVNode("button", {
                            type: "button",
                            class: "btn bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-200",
                            onClick: closeEditModal
                          }, " Close "),
                          createVNode("button", {
                            type: "submit",
                            class: "btn bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
                          }, " Save changes ")
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
              createVNode(unref(Head), { title: "Admin Dashboard" }),
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow overflow-hidden" }, [
                    createVNode("button", {
                      class: "btn btn-success float-right m-3",
                      onClick: ($event) => showAddModal.value = true
                    }, " Add ", 8, ["onClick"]),
                    createVNode(_sfc_main$1, {
                      data: data.value,
                      pageSize: 10,
                      columns: ["user_id", "username", "email", "role_name"],
                      onEdit: showEdit,
                      onDelete: deleteItem
                    }, null, 8, ["data"])
                  ])
                ])
              ]),
              createVNode(_sfc_main$2, {
                show: showAddModal.value,
                onClose: closeAddModal,
                maxWidth: "2xl",
                title: "Add User"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-6" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(saveChanges, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", { for: "exampleInputUsername" }, "Username"),
                        createVNode(_sfc_main$3, {
                          type: "text",
                          class: "form-control w-full",
                          id: "exampleInputUsername",
                          modelValue: unref(form).username,
                          "onUpdate:modelValue": ($event) => unref(form).username = $event,
                          required: "",
                          autocomplete: "username",
                          autofocus: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", { for: "exampleInputEmail" }, "Email"),
                        createVNode(_sfc_main$3, {
                          type: "email",
                          class: "form-control w-full",
                          id: "exampleInputEmail",
                          modelValue: unref(form).email,
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          required: "",
                          autocomplete: "email"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", { for: "exampleInputPassword" }, "Password"),
                        createVNode(_sfc_main$3, {
                          type: "password",
                          class: "form-control w-full",
                          id: "exampleInputPassword",
                          modelValue: unref(form).password,
                          "onUpdate:modelValue": ($event) => unref(form).password = $event,
                          required: "",
                          autocomplete: "new-password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", { for: "exampleInputRole" }, "Role"),
                        withDirectives(createVNode("select", {
                          class: "form-control",
                          id: "exampleInputRole",
                          "onUpdate:modelValue": ($event) => unref(form).role_name = $event,
                          required: ""
                        }, [
                          createVNode("option", { value: "admin" }, "Admin"),
                          createVNode("option", { value: "hr" }, "HR Personnel"),
                          createVNode("option", { value: "applicant" }, "Applicant")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).role_name]
                        ])
                      ]),
                      createVNode("div", { class: "modal-footer" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-200",
                          onClick: closeAddModal
                        }, " Close "),
                        createVNode("button", {
                          type: "submit",
                          class: "btn bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
                        }, " Save changes ")
                      ])
                    ], 32)
                  ])
                ]),
                _: 1
              }, 8, ["show"]),
              createVNode(_sfc_main$2, {
                show: showEditModal.value,
                onClose: closeEditModal,
                maxWidth: "2xl",
                title: "Edit User"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-6" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(editUser, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", { for: "editUserName" }, "Username"),
                        createVNode(_sfc_main$3, {
                          type: "text",
                          class: "form-control w-full",
                          id: "editUserName",
                          modelValue: unref(form).username,
                          "onUpdate:modelValue": ($event) => unref(form).username = $event,
                          required: "",
                          autocomplete: "username",
                          autofocus: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", { for: "editEmail" }, "Email"),
                        createVNode(_sfc_main$3, {
                          type: "email",
                          class: "form-control w-full",
                          id: "editEmail",
                          modelValue: unref(form).email,
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", { for: "editPassword" }, "Password"),
                        createVNode(_sfc_main$3, {
                          type: "password",
                          class: "form-control w-full",
                          id: "editPassword",
                          modelValue: unref(form).password,
                          "onUpdate:modelValue": ($event) => unref(form).password = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", { for: "editRole" }, "Role"),
                        withDirectives(createVNode("select", {
                          class: "form-control",
                          id: "editRole",
                          "onUpdate:modelValue": ($event) => unref(form).role_name = $event,
                          required: ""
                        }, [
                          createVNode("option", { value: "admin" }, "Admin"),
                          createVNode("option", { value: "hr" }, "HR Personnel"),
                          createVNode("option", { value: "applicant" }, "Applicant")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).role_name]
                        ])
                      ]),
                      createVNode("div", { class: "modal-footer" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-200",
                          onClick: closeEditModal
                        }, " Close "),
                        createVNode("button", {
                          type: "submit",
                          class: "btn bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
                        }, " Save changes ")
                      ])
                    ], 32)
                  ])
                ]),
                _: 1
              }, 8, ["show"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminDashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
