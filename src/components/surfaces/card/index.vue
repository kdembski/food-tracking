<script lang="ts">
export default { name: "CCard" };
</script>

<script setup lang="ts">
const props = defineProps({
  as: {
    type: String,
    default: "div",
    validator: (value: string) => {
      return ["div", "form"].indexOf(value) !== -1;
    },
  },
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
