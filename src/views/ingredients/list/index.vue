<script lang="ts">
import CTable from "@/components/data-display/table/index.vue";

export default {
  name: "IngredientsListView",
  components: { CTable },
};
</script>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const store = useStore();
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
