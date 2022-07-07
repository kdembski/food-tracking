<script lang="ts">
import CFieldTemplate from "@/components/utils/field-template/index.vue";
import CDropdown from "@/components/utils/dropdown/index.vue";

export default {
  name: "CAutocomplete",
  components: { CFieldTemplate, CDropdown },
};
</script>

<script setup lang="ts">
import { SelectOption } from "../select/types/select";
import { computed, ref, watch } from "vue";
import { useFieldProps } from "@/components/utils/field-template/composables/field-props";
import { useOptionHover } from "./composables/option-hover";
import { useAutocompleteEvents } from "./composables/autocomplete-events";

const { getFieldTemplateProps } = useFieldProps();

const props = defineProps({
  ...useFieldProps().fieldProps,
  options: {
    type: Array as () => Array<SelectOption>,
    default: () => [],
  },
  disabledOptions: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  shootingMode: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits<{
  (event: "update:modelValue", value: string | number | null): void;
}>();

const hasFocus = ref(false);
const input = ref<HTMLInputElement>();
const selectedValue = computed({
  get(): string | number | null {
    return props.modelValue;
  },
  set(value: string | number | null) {
    emits("update:modelValue", value);
  },
});
const inputValue = ref("");

const getOptionLabelByValue = (value: string | number | null) => {
  if (!value) {
    return "";
  }
  return props.options.find((option) => option.value === value)?.label;
};

watch(
  () => props.modelValue,
  () => {
    if (props.shootingMode) {
      return;
    }
    inputValue.value = getOptionLabelByValue(props.modelValue) || "";
  },
  { immediate: true }
);

const filteredOptions = computed(() => {
  return props.options.filter((option: SelectOption) => {
    return option.label
      .toLowerCase()
      .removeDiacritics()
      .includes(inputValue.value.toLowerCase().removeDiacritics());
  });
});

const selectOption = (option: SelectOption) => {
  selectedValue.value = option.value;
  inputValue.value = option.label;
};

const clearSelectedAndInputValue = () => {
  selectedValue.value = null;
  inputValue.value = "";
};

const getSelectedClass = () => {
  if (selectedValue.value) {
    return "autocomplete__input--option-selected";
  }
  return "";
};

const isDropdownOpen = computed(() => {
  return hasFocus.value;
});

watch(
  () => props.isLoading,
  (value) => {
    if (value || !props.shootingMode) {
      return;
    }
    clearSelectedAndInputValue();
  }
);

const {
  getHoveredOptionClass,
  setHoveredOptionIndex,
  getHoveredOptionIndex,
  incrementHoveredOptionIndex,
  decrementHoveredOptionIndex,
} = useOptionHover(filteredOptions.value.length);

const { onEnter, onArrowUp, onArrowDown, onInput, onInputClick, onBlur } =
  useAutocompleteEvents(
    getHoveredOptionIndex,
    setHoveredOptionIndex,
    decrementHoveredOptionIndex,
    incrementHoveredOptionIndex,
    filteredOptions,
    selectOption,
    input,
    inputValue,
    selectedValue,
    props.shootingMode,
    props.isLoading,
    hasFocus
  );
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
