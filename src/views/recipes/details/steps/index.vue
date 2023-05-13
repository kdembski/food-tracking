<script lang="ts">
import CButton from "@/components/controls/buttons/button/index.vue";
import CLoader from "@/components/feedback/loader/index.vue";

export default {
  name: "RecipeDetailsSteps",
  components: {
    CButton,
    CLoader,
  },
};
</script>

<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
