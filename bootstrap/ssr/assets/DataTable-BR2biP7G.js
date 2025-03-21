import { ref, computed, watch, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./TextInput-DJ5KC4cX.js";
const _sfc_main = {
  __name: "DataTable",
  __ssrInlineRender: true,
  props: {
    data: { type: Array, required: true },
    pageSize: { type: Number, default: 10 },
    columns: { type: Array, default: () => [] },
    pageSizeOptions: { type: Array, default: () => [10, 20, 50, 100] },
    enableRowCheckbox: { type: Boolean, default: false },
    sortable: { type: Boolean, default: true },
    // conditionalColumns: an object where keys are column names and values are mappings of cell value to CSS class
    conditionalColumns: { type: Object, default: () => ({}) }
  },
  emits: ["edit", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const searchQuery = ref("");
    const currentPage = ref(1);
    const currentPageSize = ref(props.pageSize);
    const selectedItems = ref([]);
    const currentSortKey = ref(null);
    const sortDirection = ref("asc");
    const flattenItemCache = /* @__PURE__ */ new WeakMap();
    const flattenItem = (item) => {
      if (flattenItemCache.has(item)) {
        return flattenItemCache.get(item);
      }
      const values = [];
      const recurse = (obj) => {
        if (obj && typeof obj === "object") {
          Object.values(obj).forEach((val) => recurse(val));
        } else if (obj !== void 0 && obj !== null) {
          values.push(String(obj).toLowerCase());
        }
      };
      recurse(item);
      flattenItemCache.set(item, values);
      return values;
    };
    const pathCache = /* @__PURE__ */ new Map();
    const getNestedValue = (obj, path) => {
      if (!obj) return void 0;
      if (typeof path !== "string") {
        path = path.key || path;
      }
      let parts = pathCache.get(path);
      if (!parts) {
        parts = path.split(".");
        pathCache.set(path, parts);
      }
      return parts.reduce((acc, part) => acc && acc[part], obj);
    };
    const headerCache = /* @__PURE__ */ new Map();
    const formatHeader = (key) => {
      if (headerCache.has(key)) {
        return headerCache.get(key);
      }
      const formatted = key.split(".").pop().replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
      headerCache.set(key, formatted);
      return formatted;
    };
    const filteredItems = computed(() => {
      if (!searchQuery.value.trim()) return props.data;
      const query = searchQuery.value.toLowerCase();
      return props.data.filter((item) => {
        const flatValues = flattenItem(item);
        return flatValues.some((val) => val.includes(query));
      });
    });
    const totalPages = computed(
      () => Math.ceil(filteredItems.value.length / currentPageSize.value)
    );
    const sortedItems = computed(() => {
      if (!currentSortKey.value) return filteredItems.value;
      return [...filteredItems.value].sort((a, b) => {
        const aValue = getNestedValue(a, currentSortKey.value);
        const bValue = getNestedValue(b, currentSortKey.value);
        if (aValue === void 0 || aValue === null) return sortDirection.value === "asc" ? 1 : -1;
        if (bValue === void 0 || bValue === null) return sortDirection.value === "asc" ? -1 : 1;
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection.value === "asc" ? aValue - bValue : bValue - aValue;
        }
        const aString = String(aValue).toLowerCase();
        const bString = String(bValue).toLowerCase();
        return sortDirection.value === "asc" ? aString.localeCompare(bString) : bString.localeCompare(aString);
      });
    });
    const paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * currentPageSize.value;
      return sortedItems.value.slice(start, start + currentPageSize.value);
    });
    const visiblePages = computed(() => {
      const total = totalPages.value;
      const current = currentPage.value;
      const delta = 2;
      let range = [];
      if (total <= 7) {
        range = Array.from({ length: total }, (_, i) => i + 1);
      } else {
        range.push(1);
        let start = Math.max(2, current - delta);
        let end = Math.min(total - 1, current + delta);
        if (start > 2) {
          range.push("...");
        }
        for (let i = start; i <= end; i++) {
          range.push(i);
        }
        if (end < total - 1) {
          range.push("...");
        }
        range.push(total);
      }
      return range;
    });
    const columnConfigs = computed(() => {
      if (!props.data.length) return [];
      return props.columns.map((col) => {
        if (typeof col === "string") {
          return { key: col, title: formatHeader(col) };
        }
        return {
          key: col.key,
          title: col.title || formatHeader(col.key),
          currency: col.currency
        };
      });
    });
    const showColumns = computed(() => {
      return columnConfigs.value.map((col) => col.key);
    });
    const errorMessage = computed(() => {
      if (props.columns && props.columns.length && props.data.length) {
        const firstItem = props.data[0];
        const missing = props.columns.filter(
          (col) => getNestedValue(firstItem, col) === void 0
        );
        if (missing.length) {
          return `Error: Column(s) ${missing.join(", ")} do not exist in the data.`;
        }
      }
      return null;
    });
    watch(searchQuery, () => {
      currentPage.value = 1;
    });
    const allSelected = computed(() => {
      return paginatedItems.value.length > 0 && paginatedItems.value.every(
        (item) => selectedItems.value.includes(item.id)
      );
    });
    const formatCurrency = (value, currency = "") => {
      if (!value) return "";
      const numValue = Number(value);
      if (isNaN(numValue)) return value;
      return `${currency}${numValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    };
    const classCache = /* @__PURE__ */ new Map();
    const getConditionalClass = (column, value) => {
      const cacheKey = `${column}:${value}`;
      if (classCache.has(cacheKey)) {
        return classCache.get(cacheKey);
      }
      let result = "";
      if (props.conditionalColumns[column] && props.conditionalColumns[column][value]) {
        result = props.conditionalColumns[column][value];
      }
      classCache.set(cacheKey, result);
      return result;
    };
    watch(() => props.data, () => {
      flattenItemCache.clear && flattenItemCache.clear();
      classCache.clear();
    }, { deep: false });
    onMounted(() => {
      if (props.sortable && props.columns && props.columns.length > 0) {
        currentSortKey.value = props.columns[0];
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4" }, _attrs))}><div class="mb-4 flex items-center space-x-2"><label for="pageSize" class="font-medium">Items per page:</label><select class="appearance-none border rounded px-2 py-1 pr-10 w-20 focus:outline-none focus:ring-2 focus:ring-blue-400"><!--[-->`);
      ssrRenderList(__props.pageSizeOptions, (option) => {
        _push(`<option${ssrRenderAttr("value", option)}${ssrIncludeBooleanAttr(Array.isArray(currentPageSize.value) ? ssrLooseContain(currentPageSize.value, option) : ssrLooseEqual(currentPageSize.value, option)) ? " selected" : ""}>${ssrInterpolate(option)}</option>`);
      });
      _push(`<!--]--></select></div><div class="mb-4">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        type: "text",
        modelValue: searchQuery.value,
        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
        placeholder: "Search..."
      }, null, _parent));
      _push(`</div>`);
      if (errorMessage.value) {
        _push(`<div class="mb-4 text-red-600 text-center font-medium">${ssrInterpolate(errorMessage.value)}</div>`);
      } else {
        _push(`<div class="overflow-x-auto" style="${ssrRenderStyle({ "max-height": "calc(60vh)" })}"><table class="min-w-full border-collapse border border-gray-200"><thead class="bg-gray-100 sticky top-0 z-10"><tr>`);
        if (__props.enableRowCheckbox) {
          _push(`<th class="px-4 py-2 border border-gray-200 text-center"><input type="checkbox"${ssrIncludeBooleanAttr(allSelected.value) ? " checked" : ""} class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"></th>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(columnConfigs.value, (col) => {
          _push(`<th class="px-4 py-2 border border-gray-200 cursor-pointer select-none"><div class="flex items-center space-x-1"><span>${ssrInterpolate(col.title)}</span>`);
          if (__props.sortable && currentSortKey.value === col.key) {
            _push(`<span></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></th>`);
        });
        _push(`<!--]--><th class="px-4 py-2 border border-gray-200"> Actions </th></tr></thead><tbody><!--[-->`);
        ssrRenderList(paginatedItems.value, (item) => {
          _push(`<tr>`);
          if (__props.enableRowCheckbox) {
            _push(`<td class="px-4 py-2 border border-gray-200 text-center"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(selectedItems.value) ? ssrLooseContain(selectedItems.value, item.id) : selectedItems.value) ? " checked" : ""}${ssrRenderAttr("value", item.id)} class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"></td>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(columnConfigs.value, (col) => {
            _push(`<td class="px-4 py-2 border border-gray-200 text-center">`);
            if (__props.conditionalColumns[col.key]) {
              _push(`<span class="${ssrRenderClass(getConditionalClass(col.key, getNestedValue(item, col.key)))}">${ssrInterpolate(col.currency ? formatCurrency(getNestedValue(item, col.key), col.currency) : getNestedValue(item, col.key))}</span>`);
            } else {
              _push(`<!--[-->${ssrInterpolate(col.currency ? formatCurrency(getNestedValue(item, col.key), col.currency) : getNestedValue(item, col.key))}<!--]-->`);
            }
            _push(`</td>`);
          });
          _push(`<!--]--><td class="px-4 py-2 border border-gray-200"><button class="px-2 py-1 bg-green-800 text-white rounded hover:bg-green-600 mr-2 transition-colors"> Edit </button><button class="px-2 py-1 bg-red-700 text-white rounded hover:bg-red-600 transition-colors"> Delete </button></td></tr>`);
        });
        _push(`<!--]-->`);
        if (paginatedItems.value.length === 0) {
          _push(`<tr><td${ssrRenderAttr(
            "colspan",
            __props.enableRowCheckbox ? showColumns.value.length + 2 : showColumns.value.length + 1
          )} class="text-center py-4"> No matching records found. </td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tbody></table></div>`);
      }
      if (!errorMessage.value) {
        _push(`<div class="flex items-center justify-center space-x-2 mt-4"><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"> Prev </button><!--[-->`);
        ssrRenderList(visiblePages.value, (page, index) => {
          _push(`<!--[-->`);
          if (page !== "...") {
            _push(`<button class="${ssrRenderClass([
              "px-3 py-1 rounded",
              currentPage.value === page ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            ])}">${ssrInterpolate(page)}</button>`);
          } else {
            _push(`<span class="px-3 py-1">...</span>`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"> Next </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DataTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
