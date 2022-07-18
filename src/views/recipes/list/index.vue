<script lang="ts">
import CListWithFilters from "@/components/data-display/list-with-filters/index.vue";
import CDisplayTags from "@/components/data-display/display-tags/index.vue";
import CButton from "@/components/controls/button/index.vue";
import CLink from "@/components/utils/link/index.vue";
import CHorizontalTabs from "@/components/navigation/horizontal-tabs/index.vue";
import InlineSvg from "vue-inline-svg";

export default {
  name: "RecipesListView",
  components: {
    CListWithFilters,
    CDisplayTags,
    CButton,
    InlineSvg,
    CLink,
    CHorizontalTabs,
  },
};
</script>

<script setup lang="ts">
import { ref } from "vue";

const recipesListDefaultFilters = {
  currentPage: 1,
  pageSize: 20,
  searchPhrase: "",
  sortAttribute: "recipeName",
  sortDirection: "asc",
  tags: "",
};

const tabs = [
  { code: "ALL", label: "Wszystkie" },
  { code: "NEW", label: "Nowe" },
  { code: "NOT_COMPLETED", label: "Nieuzupełnione" },
];

const selectedTab = ref("ALL");
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
