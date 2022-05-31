<template src="./template.html"></template>

<script lang="ts">
import { defineComponent, defineProps } from "vue";
import { useFieldProps } from "./composables/field-props";
import CTransition from "@/components/utils/transition/index.vue";
const { fieldProps } = useFieldProps();

export default defineComponent({
  name: "CFieldTemplate",
  components: { CTransition },
});
</script>

<script setup lang="ts">
const props = defineProps({
  ...fieldProps,
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
