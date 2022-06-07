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
    type: String,
    default: "",
  },
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
