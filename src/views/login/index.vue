<template src="./template.html"></template>

<script lang="ts">
import { defineComponent } from "vue";
import CInput from "@/components/controls/input/index.vue";

export default defineComponent({
  name: "LoginView",
  components: { CInput },
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
