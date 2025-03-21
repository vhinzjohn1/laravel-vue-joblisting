import { ref, computed, watch, onMounted, onUnmounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderTeleport, ssrRenderStyle, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./TextInput-DJ5KC4cX.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "CustomSelect",
  __ssrInlineRender: true,
  props: {
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: String,
      default: "Select an option"
    },
    displayFormat: {
      type: [String, Function],
      default: null
    },
    valueKey: {
      type: String,
      default: null
    },
    optionsHeight: {
      type: String,
      default: "15rem"
    },
    searchable: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:modelValue", "select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isOpen = ref(false);
    const search = ref("");
    const selectedOption = ref(null);
    const searchInputRef = ref(null);
    const dropdownStyles = ref({});
    const selectRef = ref(null);
    const dropdownRef = ref(null);
    const computedOptions = computed(() => {
      const allOption = props.valueKey ? { [props.valueKey]: "", isAll: true } : { value: "", isAll: true };
      return [allOption, ...props.options];
    });
    const filteredOptions = computed(() => {
      if (!search.value || !props.searchable) return computedOptions.value;
      const searchTerm = search.value.toLowerCase();
      return computedOptions.value.filter((option) => {
        const displayText = getDisplayText(option).toLowerCase();
        return displayText.includes(searchTerm);
      });
    });
    const getDisplayText = (option) => {
      if (!option) return "";
      if (option.isAll) return props.placeholder;
      if (props.displayFormat) {
        if (typeof props.displayFormat === "function") {
          return props.displayFormat(option);
        }
        return props.displayFormat.replace(
          /\{([^}]+)\}/g,
          (_, key) => key.split(".").reduce((obj, k) => obj == null ? void 0 : obj[k], option) ?? ""
        );
      }
      return typeof option === "object" ? JSON.stringify(option) : String(option);
    };
    const getValue = (option) => {
      if (!option) return "";
      if (option.isAll) return "";
      return props.valueKey ? option[props.valueKey] : option;
    };
    const displayValue = computed(() => {
      return selectedOption.value ? getDisplayText(selectedOption.value) : "";
    });
    const updateDropdownPosition = () => {
      if (selectRef.value) {
        const rect = selectRef.value.getBoundingClientRect();
        dropdownStyles.value = {
          position: "absolute",
          top: `${rect.bottom + window.scrollY}px`,
          left: `${rect.left + window.scrollX}px`,
          width: `${rect.width}px`
        };
      }
    };
    const handleClickOutside = (event) => {
      if (selectRef.value && !selectRef.value.contains(event.target) && dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isOpen.value = false;
        search.value = "";
      }
    };
    watch(
      () => props.modelValue,
      (newValue) => {
        selectedOption.value = computedOptions.value.find(
          (option) => String(getValue(option)) === String(newValue)
        ) ?? null;
      },
      { immediate: true }
    );
    onMounted(() => {
      document.addEventListener("pointerdown", handleClickOutside);
      window.addEventListener("resize", updateDropdownPosition);
      window.addEventListener("scroll", updateDropdownPosition, true);
    });
    onUnmounted(() => {
      document.removeEventListener("pointerdown", handleClickOutside);
      window.removeEventListener("resize", updateDropdownPosition);
      window.removeEventListener("scroll", updateDropdownPosition, true);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "selectRef",
        ref: selectRef,
        class: "relative"
      }, _attrs))} data-v-6d375b36><div tabindex="0" class="${ssrRenderClass([{ "ring-2 ring-indigo-500 border-indigo-500": isOpen.value }, "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full cursor-pointer bg-white flex items-center justify-between transition-all duration-200 p-2"])}" data-v-6d375b36>`);
      if (selectedOption.value) {
        _push(`<span class="text-gray-900 truncate" data-v-6d375b36>${ssrInterpolate(displayValue.value)}</span>`);
      } else {
        _push(`<span class="text-gray-500" data-v-6d375b36>${ssrInterpolate(__props.placeholder)}</span>`);
      }
      _push(`<svg class="${ssrRenderClass([{ "rotate-180": isOpen.value }, "w-5 h-5 text-gray-400 flex-shrink-0 ml-2"])}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-v-6d375b36><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" data-v-6d375b36></path></svg></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (isOpen.value) {
          _push2(`<div style="${ssrRenderStyle(dropdownStyles.value)}" class="absolute z-50 border bg-white border-gray-300 rounded-md shadow-lg" data-v-6d375b36>`);
          if (__props.searchable) {
            _push2(`<div class="p-2 border-b" data-v-6d375b36>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: search.value,
              "onUpdate:modelValue": ($event) => search.value = $event,
              ref_key: "searchInputRef",
              ref: searchInputRef,
              placeholder: "Search...",
              class: "w-full"
            }, null, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="overflow-y-auto" style="${ssrRenderStyle({ maxHeight: props.optionsHeight })}" data-v-6d375b36>`);
          if (filteredOptions.value.length) {
            _push2(`<!--[-->`);
            ssrRenderList(filteredOptions.value, (option, index) => {
              _push2(`<div class="${ssrRenderClass([{
                "bg-indigo-50 text-indigo-700": selectedOption.value && String(getValue(option)) === String(getValue(selectedOption.value))
              }, "px-4 py-2 cursor-pointer hover:bg-indigo-50 text-sm"])}" data-v-6d375b36>${ssrInterpolate(getDisplayText(option))}</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            _push2(`<div class="px-4 py-2 text-sm text-gray-500" data-v-6d375b36> No results found </div>`);
          }
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CustomSelect.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CustomSelect = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6d375b36"]]);
export {
  CustomSelect as C
};
