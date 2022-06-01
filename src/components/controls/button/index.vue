<script lang="ts">
import CLoader from "@/components/feedback/loader/index.vue";

export default {
  name: "CButton",
  components: { CLoader },
};
</script>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: "Button",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "contained",
    validator: (value: string) => {
      return ["contained", "outlined", "text"].indexOf(value) !== -1;
    },
  },
  color: {
    type: String,
    default: "primary",
    validator: (value: string) => {
      return ["primary", "secondary"].indexOf(value) !== -1;
    },
  },
  size: {
    type: String,
    default: "medium",
    validator: (value: string) => {
      return ["small", "medium", "large"].indexOf(value) !== -1;
    },
  },
  icon: {
    type: String,
    default: "",
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});

const getButtonClasses = (): Array<string> => {
  const varaintClass = "button--" + props.variant;
  const colorClass = "button--" + props.color;
  const sizeClass = "button--" + props.size;
  const disabledClass = "button--disabled";
  const fullWidthClass = "button--full-width";

  let classes = [varaintClass, colorClass, sizeClass];

  if (props.isDisabled || props.isLoading) {
    classes.push(disabledClass);
  }

  if (props.fullWidth) {
    classes.push(fullWidthClass);
  }

  return classes;
};

const getButtonContentClasses = (): string => {
  if (props.isLoading) {
    return "button__content--loading";
  }
  return "";
};

const getLoaderSize = (): number => {
  switch (props.size) {
    case "small":
      return 20;
    case "medium":
      return 24;
    case "large":
      return 28;
    default:
      return 24;
  }
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
