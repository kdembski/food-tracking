<script lang="ts">
import CFieldTemplate from "@/components/utils/field-template/index.vue";
import CDropdown from "@/components/utils/dropdown/index.vue";

export default {
  name: "CAutocomplete",
  components: { CFieldTemplate, CDropdown },
};
</script>

<script setup lang="ts">
import { DropdownOption } from "@/types/components/utils/dropdown";
import { computed, ref, watch } from "vue";
import { useFieldProps } from "@/components/utils/field-template/composables/field-props";
import { useAutocompleteOptionHover } from "./composables/option-hover";
import { useAutocompleteEvents } from "./composables/events";
import { useAutocompleteValues } from "./composables/values";

const { getFieldTemplateProps } = useFieldProps();

const props = defineProps({
  ...useFieldProps().fieldProps,
  options: {
    type: Array as () => Array<DropdownOption>,
    default: () => [],
  },
  disabledOptions: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Number],
    default: null,
  },
  inputValue: {
    type: String,
    default: "",
  },
  isLoadingOptions: {
    type: Boolean,
    default: false,
  },
  onlyInputValue: {
    type: Boolean,
    default: false,
  },
  enableAddingOption: {
    type: Boolean,
    default: false,
  },
  enableSetSelectedWhenInputMatchAnyOption: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits<{
  (event: "update:modelValue", value: string | number | null): void;
  (event: "update:inputValue", value: string): void;
  (event: "dropdownOpen"): void;
  (event: "enter"): void;
  (event: "blur"): void;
  (event: "focus"): void;
  (event: "addOption", option: DropdownOption): void;
}>();

const hasFocus = ref(false);
const input = ref<HTMLInputElement>();

const _isLoading = computed(() => {
  return props.isLoading;
});

const isDropdownOpen = computed(() => {
  return hasFocus.value;
});

watch(isDropdownOpen, (value) => {
  if (!value) {
    return;
  }
  emits("dropdownOpen");
});

const getSelectedClass = () => {
  if (selectedValue.value || props.onlyInputValue) {
    return "autocomplete__input--option-selected";
  }
  return "";
};

const {
  selectedValue,
  _inputValue,
  filteredOptions,
  selectOption,
  getDropdownOptions,
} = useAutocompleteValues(props, emits, input, _isLoading);

const {
  getHoveredOptionClass,
  setHoveredOptionIndex,
  getHoveredOptionIndex,
  incrementHoveredOptionIndex,
  decrementHoveredOptionIndex,
} = useAutocompleteOptionHover(filteredOptions);

const {
  onEnter,
  onArrowUp,
  onArrowDown,
  onInput,
  onInputClick,
  onBlur,
  onFocus,
} = useAutocompleteEvents(
  getHoveredOptionIndex,
  setHoveredOptionIndex,
  decrementHoveredOptionIndex,
  incrementHoveredOptionIndex,
  getDropdownOptions,
  selectOption,
  input,
  _inputValue,
  _isLoading,
  hasFocus,
  emits
);

defineExpose({
  inputValue: _inputValue,
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
