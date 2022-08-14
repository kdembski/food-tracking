<script lang="ts">
export default { name: "TSuccessIcon" };
</script>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: "success",
    validator: (value: string) => {
      return ["success", "error"].indexOf(value) !== -1;
    },
  },
  size: {
    type: String,
    default: "medium",
    validator: (value: string) => {
      return ["small", "medium", "large"].indexOf(value) !== -1;
    },
  },
});

const getIconTypeClass = () => {
  return "icon--" + props.type;
};

const getIconSizeClass = () => {
  return "icon--" + props.size;
};

const getIconBasedOnType = (type: string) => {
  switch (type) {
    case "success":
      return "check";
    case "error":
      return "exclamation";
    default:
      return "";
  }
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
