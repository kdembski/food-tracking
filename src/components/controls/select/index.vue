<script lang="ts">
import CFieldTemplate from "@/components/utils/field-template/index.vue";

export default {
  name: "CSelect",
  components: { CFieldTemplate },
};
</script>

<script setup lang="ts">
import { SelectOption } from "./types/select";
import { computed, ref } from "vue";
import { useFieldProps } from "@/components/utils/field-template/composables/field-props";
import { useOptionHover } from "./composables/option-hover";
import { useSelectEvents } from "./composables/select-events";

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

const filteredOptions = computed(() => {
  return props.options.filter((option: SelectOption) => {
    return option.label.toLowerCase().includes(inputValue.value.toLowerCase());
  });
});

const selectOption = (option: SelectOption) => {
  selectedValue.value = option.value;
  inputValue.value = option.label;

  if (props.shootingMode) {
    afterOptionSelectWithShootingMode();
  }
};

const clearSelectedAndInputValue = () => {
  selectedValue.value = null;
  inputValue.value = "";
};

const getSelectedClass = () => {
  if (selectedValue.value) {
    return "select__input--selected";
  }
  return "";
};

const isAfterSuccessfulShot = ref(false);
const afterOptionSelectWithShootingMode = () => {
  isAfterSuccessfulShot.value = true;
  clearSelectedAndInputValue();

  setTimeout(() => {
    isAfterSuccessfulShot.value = false;
  }, 500);
};

const {
  getHoveredOptionClass,
  setHoveredOptionIndex,
  getHoveredOptionIndex,
  incrementHoveredOptionIndex,
  decrementHoveredOptionIndex,
} = useOptionHover(filteredOptions.value.length);

const { onEnter, onArrowUp, onArrowDown, onInput, onInputClick, onBlur } =
  useSelectEvents(
    getHoveredOptionIndex,
    setHoveredOptionIndex,
    decrementHoveredOptionIndex,
    incrementHoveredOptionIndex,
    filteredOptions,
    selectOption,
    afterOptionSelectWithShootingMode,
    input,
    inputValue,
    selectedValue,
    props.shootingMode,
    hasFocus
  );
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
