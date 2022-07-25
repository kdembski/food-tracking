<script lang="ts">
export default { name: "ThemeSvg" };
</script>

<script setup lang="ts">
const props = defineProps({
  theme: {
    type: String,
    default: "",
    validator: (value: string) => {
      return ["", "dark", "light"].indexOf(value) !== -1;
    },
  },
  primaryColor: {
    type: String,
    default: "",
    validator: (value: string) => {
      return ["", "orange"].indexOf(value) !== -1;
    },
  },
});

const getSvgClasses = () => {
  return [getThemeClass(), getPrimaryColorClass()];
};

const getThemeClass = () => {
  if (!props.theme) {
    return "";
  }
  return "theme-svg--" + props.theme;
};

const getPrimaryColorClass = () => {
  if (!props.primaryColor) {
    return "";
  }
  return "theme-svg--" + props.primaryColor;
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
