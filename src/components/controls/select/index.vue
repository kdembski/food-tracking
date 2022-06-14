<script lang="ts">
import CFieldTemplate from "@/components/utils/field-template/index.vue";

export default {
  name: "CSelect",
  components: { CFieldTemplate },
};
</script>

<script setup lang="ts">
import { computed, ref, Ref, nextTick } from "vue";
import { useFieldProps } from "@/components/utils/field-template/composables/field-props";
import { useOptionHover } from "./composables/option-hover";

interface SelectOption {
  value: string | number;
  label: string;
}

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
  closeOnEnter: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits<{
  (event: "update:modelValue", value: string | number): void;
}>();

const hasFocus = ref(false);
const input = ref<HTMLInputElement>();

const selectedValue = computed({
  get(): string | number {
    return props.modelValue;
  },
  set(value: string | number) {
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
};

const onEnter = () => {
  const hoveredOptionIndex = getHoveredOptionIndex();
  if (hoveredOptionIndex === null) {
    return;
  }
  selectOption(filteredOptions.value[hoveredOptionIndex]);
  setHoveredOptionIndex(null);
  afterOptionSelectOnEnter();
};

const afterOptionSelectOnEnter = () => {
  if (!props.closeOnEnter) {
    inputValue.value = "";
    selectedValue.value = "";
    return;
  }

  if (!input.value) {
    return;
  }
  console.log(input.value.tabIndex);
  input.value.blur();
};

const onArrowUp = (e: KeyboardEvent) => {
  e.preventDefault();
  decrementHoveredOptionIndex();
};

const onArrowDown = (e: KeyboardEvent) => {
  e.preventDefault();
  incrementHoveredOptionIndex();
};

const onBlur = () => {
  hasFocus.value = false;
};

const onInputClick = () => {
  if (!input.value) {
    return;
  }
  input.value.select();
};

const {
  getHoveredOptionClass,
  setHoveredOptionIndex,
  getHoveredOptionIndex,
  incrementHoveredOptionIndex,
  decrementHoveredOptionIndex,
} = useOptionHover(filteredOptions.value.length);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
