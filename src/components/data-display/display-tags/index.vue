<script lang="ts">
import CTags from "@/components/utils/tags/index.vue";
export default {
  name: "CDisplayTags",
  components: { CTags },
};
</script>

<script setup lang="ts">
const props = defineProps({
  tags: {
    type: [String, Array],
    default: "",
  },
  size: {
    type: String,
    default: "medium",
    validator: (value: string) => {
      return ["small", "medium", "large"].indexOf(value) !== -1;
    },
  },
  backgroundColor: {
    type: String,
    default: "secondary",
    validator: (value: string) => {
      return ["primary", "secondary"].indexOf(value) !== -1;
    },
  },
  onClick: {
    type: Function,
    default: null,
  },
});

const emit = defineEmits<{
  (e: "click", name: string): void;
}>();

const onClick = (name: string) => {
  props.onClick?.(name);
};

const getTagClasses = () => {
  return [getWithHoverClass()];
};

const getWithHoverClass = () => {
  if (props.onClick) {
    return "tag--with-hover";
  }
  return "";
};

const getContainerClasses = () => {
  return [getSizeClass()];
};

const getSizeClass = () => {
  return "tags--" + props.size;
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
