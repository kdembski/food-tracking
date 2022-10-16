<script lang="ts">
import CLoader from "@/components/feedback/loader/index.vue";

export default {
  name: "CButton",
  components: { CLoader },
};
</script>

<script setup lang="ts">
import { useWindowSize } from "@/composables/window-size";
import { useButtonProps } from "./composables/props";

const props = defineProps(useButtonProps().buttonProps);

const { windowWidth } = useWindowSize();

const getButtonClasses = (): Array<string> => {
  const varaintClass = "button--" + props.variant;
  const colorClass = "button--" + props.color;
  const sizeClass = "button--" + handleSizeOnMobile(props.size);
  const disabledClass = "button--disabled";
  const loadingClass = "button--loading";
  const fullWidthClass = "button--full-width";
  const onlyIconClass = "button--only-icon";

  let classes = [varaintClass, colorClass, sizeClass];

  if (props.isDisabled || props.isLoading) {
    classes.push(disabledClass);
  }

  if (props.isLoading) {
    classes.push(loadingClass);
  }

  if (props.fullWidth) {
    classes.push(fullWidthClass);
  }

  if (!props.label) {
    classes.push(onlyIconClass);
  }

  return classes;
};

const handleSizeOnMobile = (size: string): string => {
  if (windowWidth.value > 1024) {
    return size;
  }

  if (size === "large") {
    return "medium";
  }

  if (size === "medium") {
    return "small";
  }

  return size;
};

const getLoaderSize = (): number => {
  switch (handleSizeOnMobile(props.size)) {
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
