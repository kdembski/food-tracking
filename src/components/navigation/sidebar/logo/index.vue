<script lang="ts">
export default { name: "CLogo" };
</script>

<script setup lang="ts">
const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
});

const sharedTextProps = {
  "alignment-baseline": "before-edge",
  "dominant-baseline": "text-before-edge",
  "font-style": "normal",
  "letter-spacing": "3",
  style: "line-height: 100%",
  "xml:space": "preserve",
  "font-weight": "500",
  "font-size": "130",
  fill: "#ff9100",
  class: "logo__item",
};

const getLogoCollapsedClass = () => {
  if (props.isCollapsed) {
    return "logo--collapsed";
  }
  return "";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
