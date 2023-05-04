<script lang="ts">
import SelectTheme from "./select-theme/index.vue";
import SelectPrimaryColor from "./select-primary-color/index.vue";

export default {
  name: "SettingsView",
  components: { SelectTheme, SelectPrimaryColor },
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
