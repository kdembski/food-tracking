<script lang="ts">
export default { name: "ThemeSvg" };
</script>

<script setup lang="ts">
const props = defineProps({
  theme: {
    type: String,
    default: "light",
    validator: (value: string) => {
      return ["dark", "light"].indexOf(value) !== -1;
    },
  },
  primaryColor: {
    type: String,
    default: "orange",
    validator: (value: string) => {
      return ["orange"].indexOf(value) !== -1;
    },
  },
});

const getSvgClasses = () => {
  return [getThemeClass(), getPrimaryColorClass()];
};

const getThemeClass = () => {
  return "theme-svg--" + props.theme;
};

const getPrimaryColorClass = () => {
  return "theme-svg--" + props.primaryColor;
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
