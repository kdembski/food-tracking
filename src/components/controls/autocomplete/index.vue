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
import { computed, ref } from "vue";
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
    return "autocomplete__input--option-selected";
  }
  return "";
};

const isAfterSuccessfulShot = ref(false);
const afterOptionSelectWithShootingMode = () => {
  isAfterSuccessfulShot.value = true;

  setTimeout(() => {
    clearSelectedAndInputValue();
  }, 200);

  setTimeout(() => {
    isAfterSuccessfulShot.value = false;
  }, 800);
};

const isDropdownOpen = computed(() => {
  if (props.shootingMode) {
    return hasFocus.value;
  }
  return hasFocus.value && filteredOptions.value.length > 1;
});

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
