<script lang="ts">
export default { name: "CCard" };
</script>

<script setup lang="ts">
import { ref, Ref, defineExpose } from "vue";
const props = defineProps({
  as: {
    type: String,
    default: "div",
    validator: (value: string) => {
      return ["div", "form"].indexOf(value) !== -1;
    },
  },
});

const wrapper: Ref<HTMLElement | undefined> = ref();
defineExpose({ wrapper });
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
