<script lang="ts">
import CFieldTemplate from "@/components/utils/field-template/index.vue";
import CDropdown from "@/components/utils/dropdown/index.vue";

export default {
  name: "CAutocomplete",
  components: { CFieldTemplate, CDropdown },
};
</script>

<script setup lang="ts">
import { DropdownOption } from "@/components/utils/dropdown/types/option";
import { computed, ref, watch } from "vue";
import { useFieldProps } from "@/components/utils/field-template/composables/field-props";
import { useOptionHover } from "./composables/option-hover";
import { useEvents } from "./composables/events";
import { useValues } from "./composables/values";

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
  shootingMode: {
    type: Boolean,
    default: false,
  },
  isLoadingOptions: {
    type: Boolean,
    default: false,
  },
  onlyInputValue: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits<{
  (event: "update:modelValue", value: string | number | null): void;
  (event: "update:inputValue", value: string): void;
  (event: "dropdownOpen"): void;
  (event: "enter"): void;
  (event: "blur"): void;
  (event: "focus"): void;
}>();

const hasFocus = ref(false);
const input = ref<HTMLInputElement>();

const filteredOptions = computed(() => {
  return props.options?.filter((option: DropdownOption) => {
    return option.label.simplify().includes(_inputValue.value.simplify());
  });
});

const _isLoading = computed(() => {
  return props.isLoading;
});

const _shootingMode = computed(() => {
  return props.shootingMode;
});

watch(_isLoading, (value) => {
  if (value || !props.shootingMode) {
    return;
  }
  clearSelectedAndInputValue();
});

const selectOption = (option: DropdownOption) => {
  selectedValue.value = option.value;
  _inputValue.value = option.label;
};

const { selectedValue, _inputValue, clearSelectedAndInputValue } = useValues(
  props,
  emits,
  filteredOptions,
  selectOption,
  input,
  _isLoading
);

const getSelectedClass = () => {
  if (selectedValue.value || props.onlyInputValue) {
    return "autocomplete__input--option-selected";
  }
  return "";
};

const isDropdownOpen = computed(() => {
  return hasFocus.value;
});

watch(isDropdownOpen, (value) => {
  if (!value) {
    return;
  }
  emits("dropdownOpen");
});

const {
  getHoveredOptionClass,
  setHoveredOptionIndex,
  getHoveredOptionIndex,
  incrementHoveredOptionIndex,
  decrementHoveredOptionIndex,
} = useOptionHover(filteredOptions);

const {
  onEnter,
  onArrowUp,
  onArrowDown,
  onInput,
  onInputClick,
  onBlur,
  onFocus,
} = useEvents(
  getHoveredOptionIndex,
  setHoveredOptionIndex,
  decrementHoveredOptionIndex,
  incrementHoveredOptionIndex,
  filteredOptions,
  selectOption,
  input,
  _inputValue,
  _shootingMode,
  _isLoading,
  hasFocus,
  emits
);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
