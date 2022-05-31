<template src="./template.html"></template>

<script lang="ts">
import { defineComponent, defineProps } from "vue";
import CFieldTemplate from "@/components/utils/field-template/index.vue";
import { useFieldProps } from "@/components/utils/field-template/composables/field-props";
const { fieldProps, getFieldTemplateProps } = useFieldProps();

export default defineComponent({
  name: "CInput",
  components: { CFieldTemplate },
});
</script>

<script setup lang="ts">
const props = defineProps({
  ...fieldProps,
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
