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
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useWindowSize } from "@/components/utils/composables/window-size";
const store = useStore();
const { isMobile } = useWindowSize();

const recipesListDefaultFilters = {
  currentPage: 1,
  pageSize: 20,
  searchPhrase: "",
  sortAttribute: "recipeName",
  sortDirection: "asc",
  tags: "",
};

const tabs = ref([
  { code: "ALL", label: "Wszystkie", count: 0 },
  { code: "NOT_COMPLETED", label: "Nieuzupełnione" },
  { code: "NEW", label: "Nowe" },
]);
const selectedTab = ref("ALL");

const setRecipesListCount = async () => {
  tabs.value[0].count = await store.dispatch("recipe/getRecipesListCount");
};

onMounted(() => {
  setRecipesListCount();
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
