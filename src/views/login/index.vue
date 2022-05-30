<template src="./template.html"></template>

<script lang="ts">
import { defineComponent } from "vue";
import CButton from "@/components/controls/button/index.vue";

export default defineComponent({
  name: "LoginView",
  components: { CButton },
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
