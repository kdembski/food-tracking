<script lang="ts">
export default { name: "ThemeSvg" };
</script>

<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: "",
  },
});

const getCodeClass = () => {
  if (!props.code) {
    return;
  }
  return "theme-svg--" + props.code;
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
