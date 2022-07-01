<script lang="ts">
export default { name: "CLink" };
</script>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: "Link",
  },
  href: {
    type: String,
    default: "",
  },
  external: {
    type: Boolean,
    default: false,
  },
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
