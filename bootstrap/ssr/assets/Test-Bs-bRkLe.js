import { ref, unref, withCtx, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from "vue/server-renderer";
import { A as AdminLayout } from "./AdminLayout-BD39AHzM.js";
import { Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./Header-VZTQj6rE.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-Ds5KDWV0.js";
import "./NotificationBell-DssmmqXB.js";
const _sfc_main = {
  __name: "Test",
  __ssrInlineRender: true,
  props: {
    storageQuota: {
      type: Object,
      required: true,
      default: () => ({
        limit: "Unknown",
        usage: "Unknown",
        usageInDrive: "Unknown",
        percentage: 0
      })
    }
  },
  setup(__props) {
    const file = ref(null);
    const responseData = ref({});
    const isUploading = ref(false);
    const error = ref(null);
    const uploadProgress = ref(0);
    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
      error.value = null;
      responseData.value = {};
    };
    const clearFile = () => {
      file.value = null;
      error.value = null;
      responseData.value = {};
    };
    const submitFile = async () => {
      var _a, _b;
      if (!file.value) {
        error.value = "Please select a file first.";
        return;
      }
      const formData = new FormData();
      formData.append("file", file.value);
      isUploading.value = true;
      error.value = null;
      responseData.value = {};
      uploadProgress.value = 0;
      try {
        uploadProgress.value = 10;
        const response = await axios.post("/test", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.loaded === progressEvent.total) {
              uploadProgress.value = 20;
              setTimeout(() => {
                uploadProgress.value = 50;
                setTimeout(() => {
                  uploadProgress.value = 75;
                  setTimeout(() => {
                    uploadProgress.value = 100;
                  }, 500);
                }, 500);
              }, 500);
            }
          }
        });
        await new Promise((resolve) => {
          const checkProgress = setInterval(() => {
            if (uploadProgress.value === 100) {
              clearInterval(checkProgress);
              resolve();
            }
          }, 100);
        });
        responseData.value = response.data;
      } catch (err) {
        error.value = ((_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "An error occurred while uploading the file.";
      } finally {
        if (!error.value) {
          setTimeout(() => {
            isUploading.value = false;
            uploadProgress.value = 0;
          }, 1e3);
        } else {
          isUploading.value = false;
          uploadProgress.value = 0;
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Test Upload" }, null, _parent));
      _push(ssrRenderComponent(AdminLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, { title: "Test Google Drive Upload" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, { title: "Test Google Drive Upload" })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-2xl mx-auto mb-6" data-v-166e6a7c${_scopeId}><div class="bg-white rounded-lg shadow-md p-6" data-v-166e6a7c${_scopeId}><h2 class="text-lg font-semibold mb-4" data-v-166e6a7c${_scopeId}>Google Drive Storage</h2><div class="mb-6" data-v-166e6a7c${_scopeId}><div class="flex justify-between mb-1" data-v-166e6a7c${_scopeId}><span class="text-sm font-medium text-gray-700" data-v-166e6a7c${_scopeId}>Storage Used</span><span class="text-sm font-medium text-gray-700" data-v-166e6a7c${_scopeId}>${ssrInterpolate(__props.storageQuota.percentage)}% </span></div><div class="w-full bg-gray-200 rounded-full h-2.5" data-v-166e6a7c${_scopeId}><div style="${ssrRenderStyle({ width: `${__props.storageQuota.percentage}%` })}" class="${ssrRenderClass([{
              "bg-yellow-500": __props.storageQuota.percentage > 70,
              "bg-red-500": __props.storageQuota.percentage > 90
            }, "bg-blue-600 h-2.5 rounded-full transition-all duration-300"])}" data-v-166e6a7c${_scopeId}></div></div></div><div class="grid grid-cols-2 gap-4" data-v-166e6a7c${_scopeId}><div class="bg-gray-50 p-4 rounded-lg" data-v-166e6a7c${_scopeId}><div class="text-sm text-gray-500" data-v-166e6a7c${_scopeId}>Total Storage</div><div class="text-lg font-semibold text-gray-900" data-v-166e6a7c${_scopeId}>${ssrInterpolate(__props.storageQuota.total.formatted)}</div></div><div class="bg-gray-50 p-4 rounded-lg" data-v-166e6a7c${_scopeId}><div class="text-sm text-gray-500" data-v-166e6a7c${_scopeId}> Available Storage </div><div class="text-lg font-semibold text-gray-900" data-v-166e6a7c${_scopeId}>${ssrInterpolate(__props.storageQuota.available.formatted)}</div></div><div class="bg-gray-50 p-4 rounded-lg" data-v-166e6a7c${_scopeId}><div class="text-sm text-gray-500" data-v-166e6a7c${_scopeId}>Used Storage</div><div class="text-lg font-semibold text-gray-900" data-v-166e6a7c${_scopeId}>${ssrInterpolate(__props.storageQuota.used.formatted)}</div></div><div class="bg-gray-50 p-4 rounded-lg" data-v-166e6a7c${_scopeId}><div class="text-sm text-gray-500" data-v-166e6a7c${_scopeId}>Drive Usage</div><div class="text-lg font-semibold text-gray-900" data-v-166e6a7c${_scopeId}>${ssrInterpolate(__props.storageQuota.usageInDrive.formatted)}</div></div></div></div></div><div class="max-w-2xl mx-auto p-6" data-v-166e6a7c${_scopeId}><div class="bg-white rounded-lg shadow-md p-6" data-v-166e6a7c${_scopeId}><div class="space-y-4" data-v-166e6a7c${_scopeId}><div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center" data-v-166e6a7c${_scopeId}><input type="file" class="hidden" id="fileInput" data-v-166e6a7c${_scopeId}><label for="fileInput" class="cursor-pointer flex flex-col items-center justify-center" data-v-166e6a7c${_scopeId}><svg class="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-166e6a7c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" data-v-166e6a7c${_scopeId}></path></svg><span class="text-gray-600" data-v-166e6a7c${_scopeId}>Click to select a file or drag and drop</span><span class="text-sm text-gray-500 mt-1" data-v-166e6a7c${_scopeId}>Maximum file size: 20MB</span></label></div>`);
            if (file.value) {
              _push2(`<div class="flex items-center justify-between bg-gray-50 p-3 rounded" data-v-166e6a7c${_scopeId}><div class="flex items-center" data-v-166e6a7c${_scopeId}><svg class="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-166e6a7c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-166e6a7c${_scopeId}></path></svg><span class="text-sm text-gray-600" data-v-166e6a7c${_scopeId}>${ssrInterpolate(file.value.name)}</span></div><button class="text-red-500 hover:text-red-700" data-v-166e6a7c${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-166e6a7c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-166e6a7c${_scopeId}></path></svg></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button${ssrIncludeBooleanAttr(!file.value || isUploading.value) ? " disabled" : ""} class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200" data-v-166e6a7c${_scopeId}>`);
            if (!isUploading.value) {
              _push2(`<span data-v-166e6a7c${_scopeId}>Upload File</span>`);
            } else {
              _push2(`<span class="flex items-center justify-center" data-v-166e6a7c${_scopeId}><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" data-v-166e6a7c${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-166e6a7c${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-166e6a7c${_scopeId}></path></svg> Uploading... </span>`);
            }
            _push2(`</button></div>`);
            if (isUploading.value) {
              _push2(`<div class="mt-4" data-v-166e6a7c${_scopeId}><div class="flex justify-between mb-1" data-v-166e6a7c${_scopeId}><span class="text-sm font-medium text-blue-700" data-v-166e6a7c${_scopeId}>Uploading...</span><span class="text-sm font-medium text-blue-700" data-v-166e6a7c${_scopeId}>${ssrInterpolate(uploadProgress.value)}%</span></div><div class="w-full bg-gray-200 rounded-full h-2.5" data-v-166e6a7c${_scopeId}><div class="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${uploadProgress.value}%` })}" data-v-166e6a7c${_scopeId}></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (responseData.value.message || error.value) {
              _push2(`<div class="mt-6" data-v-166e6a7c${_scopeId}>`);
              if (responseData.value.message) {
                _push2(`<div class="bg-green-50 border-l-4 border-green-400 p-4" data-v-166e6a7c${_scopeId}><div class="flex" data-v-166e6a7c${_scopeId}><div class="flex-shrink-0" data-v-166e6a7c${_scopeId}><svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-166e6a7c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-166e6a7c${_scopeId}></path></svg></div><div class="ml-3" data-v-166e6a7c${_scopeId}><p class="text-sm text-green-700" data-v-166e6a7c${_scopeId}>${ssrInterpolate(responseData.value.message)}</p>`);
                if (responseData.value.file_url) {
                  _push2(`<p class="text-sm text-green-600 mt-2" data-v-166e6a7c${_scopeId}> File URL: <a${ssrRenderAttr("href", responseData.value.file_url)} target="_blank" class="underline" data-v-166e6a7c${_scopeId}>View File</a></p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (error.value) {
                _push2(`<div class="bg-red-50 border-l-4 border-red-400 p-4" data-v-166e6a7c${_scopeId}><div class="flex" data-v-166e6a7c${_scopeId}><div class="flex-shrink-0" data-v-166e6a7c${_scopeId}><svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-166e6a7c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-166e6a7c${_scopeId}></path></svg></div><div class="ml-3" data-v-166e6a7c${_scopeId}><p class="text-sm text-red-700" data-v-166e6a7c${_scopeId}>${ssrInterpolate(error.value)}</p></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-2xl mx-auto mb-6" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-md p-6" }, [
                  createVNode("h2", { class: "text-lg font-semibold mb-4" }, "Google Drive Storage"),
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("div", { class: "flex justify-between mb-1" }, [
                      createVNode("span", { class: "text-sm font-medium text-gray-700" }, "Storage Used"),
                      createVNode("span", { class: "text-sm font-medium text-gray-700" }, toDisplayString(__props.storageQuota.percentage) + "% ", 1)
                    ]),
                    createVNode("div", { class: "w-full bg-gray-200 rounded-full h-2.5" }, [
                      createVNode("div", {
                        class: ["bg-blue-600 h-2.5 rounded-full transition-all duration-300", {
                          "bg-yellow-500": __props.storageQuota.percentage > 70,
                          "bg-red-500": __props.storageQuota.percentage > 90
                        }],
                        style: { width: `${__props.storageQuota.percentage}%` }
                      }, null, 6)
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", { class: "bg-gray-50 p-4 rounded-lg" }, [
                      createVNode("div", { class: "text-sm text-gray-500" }, "Total Storage"),
                      createVNode("div", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(__props.storageQuota.total.formatted), 1)
                    ]),
                    createVNode("div", { class: "bg-gray-50 p-4 rounded-lg" }, [
                      createVNode("div", { class: "text-sm text-gray-500" }, " Available Storage "),
                      createVNode("div", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(__props.storageQuota.available.formatted), 1)
                    ]),
                    createVNode("div", { class: "bg-gray-50 p-4 rounded-lg" }, [
                      createVNode("div", { class: "text-sm text-gray-500" }, "Used Storage"),
                      createVNode("div", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(__props.storageQuota.used.formatted), 1)
                    ]),
                    createVNode("div", { class: "bg-gray-50 p-4 rounded-lg" }, [
                      createVNode("div", { class: "text-sm text-gray-500" }, "Drive Usage"),
                      createVNode("div", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(__props.storageQuota.usageInDrive.formatted), 1)
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "max-w-2xl mx-auto p-6" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-md p-6" }, [
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("div", { class: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center" }, [
                      createVNode("input", {
                        type: "file",
                        onChange: handleFileUpload,
                        ref: "fileInput",
                        class: "hidden",
                        id: "fileInput"
                      }, null, 544),
                      createVNode("label", {
                        for: "fileInput",
                        class: "cursor-pointer flex flex-col items-center justify-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-12 h-12 text-gray-400 mb-3",
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
                        createVNode("span", { class: "text-gray-600" }, "Click to select a file or drag and drop"),
                        createVNode("span", { class: "text-sm text-gray-500 mt-1" }, "Maximum file size: 20MB")
                      ])
                    ]),
                    file.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center justify-between bg-gray-50 p-3 rounded"
                    }, [
                      createVNode("div", { class: "flex items-center" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-gray-400 mr-2",
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
                        createVNode("span", { class: "text-sm text-gray-600" }, toDisplayString(file.value.name), 1)
                      ]),
                      createVNode("button", {
                        onClick: clearFile,
                        class: "text-red-500 hover:text-red-700"
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
                    ])) : createCommentVNode("", true),
                    createVNode("button", {
                      onClick: submitFile,
                      disabled: !file.value || isUploading.value,
                      class: "w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
                    }, [
                      !isUploading.value ? (openBlock(), createBlock("span", { key: 0 }, "Upload File")) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "flex items-center justify-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
                          fill: "none",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("circle", {
                            class: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            "stroke-width": "4"
                          }),
                          createVNode("path", {
                            class: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          })
                        ])),
                        createTextVNode(" Uploading... ")
                      ]))
                    ], 8, ["disabled"])
                  ]),
                  isUploading.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-4"
                  }, [
                    createVNode("div", { class: "flex justify-between mb-1" }, [
                      createVNode("span", { class: "text-sm font-medium text-blue-700" }, "Uploading..."),
                      createVNode("span", { class: "text-sm font-medium text-blue-700" }, toDisplayString(uploadProgress.value) + "%", 1)
                    ]),
                    createVNode("div", { class: "w-full bg-gray-200 rounded-full h-2.5" }, [
                      createVNode("div", {
                        class: "bg-blue-600 h-2.5 rounded-full transition-all duration-300",
                        style: { width: `${uploadProgress.value}%` }
                      }, null, 4)
                    ])
                  ])) : createCommentVNode("", true),
                  responseData.value.message || error.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mt-6"
                  }, [
                    responseData.value.message ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-green-50 border-l-4 border-green-400 p-4"
                    }, [
                      createVNode("div", { class: "flex" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-5 w-5 text-green-400",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M5 13l4 4L19 7"
                            })
                          ]))
                        ]),
                        createVNode("div", { class: "ml-3" }, [
                          createVNode("p", { class: "text-sm text-green-700" }, toDisplayString(responseData.value.message), 1),
                          responseData.value.file_url ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-green-600 mt-2"
                          }, [
                            createTextVNode(" File URL: "),
                            createVNode("a", {
                              href: responseData.value.file_url,
                              target: "_blank",
                              class: "underline"
                            }, "View File", 8, ["href"])
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    error.value ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "bg-red-50 border-l-4 border-red-400 p-4"
                    }, [
                      createVNode("div", { class: "flex" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-5 w-5 text-red-400",
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
                        ]),
                        createVNode("div", { class: "ml-3" }, [
                          createVNode("p", { class: "text-sm text-red-700" }, toDisplayString(error.value), 1)
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/TestUpload/Test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Test = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-166e6a7c"]]);
export {
  Test as default
};
