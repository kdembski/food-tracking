<script lang="ts">
import CListWithFilters from "@/components/data-display/list-with-filters/index.vue";
import CButton from "@/components/controls/button/index.vue";
import CHorizontalTabs from "@/components/navigation/horizontal-tabs/index.vue";
import RecipesListItemHeader from "./list-item/header/index.vue";
import RecipesListItemBody from "./list-item/body/index.vue";
import AddToCalendarModal from "@/views/calendar/add-to-calendar-modal/index.vue";

export default {
  name: "RecipesListView",
  components: {
    CListWithFilters,
    CButton,
    CHorizontalTabs,
    RecipesListItemHeader,
    RecipesListItemBody,
    AddToCalendarModal,
  },
};
</script>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { Recipe } from "@/types/recipes/recipe";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();

const recipesListDefaultFilters = {
  currentPage: 1,
  pageSize: 20,
  searchPhrase: "",
  sortAttribute: "cookedDate",
  sortDirection: "desc",
  tags: "",
};

const recipeListSortOptions = ref([
  {
    value: {
      sortAttribute: "recipeName",
      sortDirection: "asc",
    },
    label: "Nazwa przepisu - rosnąco",
    icon: "arrow-down-a-z",
  },
  {
    value: {
      sortAttribute: "recipeName",
      sortDirection: "desc",
    },
    label: "Nazwa przepisu - malejąco",
    icon: "arrow-up-a-z",
  },
  {
    value: {
      sortAttribute: "preparationTime",
      sortDirection: "asc",
    },
    label: "Czas przygotowania - rosnąco",
    icon: "arrow-down-1-9",
  },
  {
    value: {
      sortAttribute: "preparationTime",
      sortDirection: "desc",
    },
    label: "Czas przygotowania - malejąco",
    icon: "arrow-up-1-9",
  },
  {
    value: {
      sortAttribute: "cookedDate",
      sortDirection: "asc",
    },
    label: "Data gotowania - rosnąco",
    icon: "arrow-down-short-wide",
  },
  {
    value: {
      sortAttribute: "cookedDate",
      sortDirection: "desc",
    },
    label: "Data gotowania - malejąco",
    icon: "arrow-up-short-wide",
  },
]);

const tabs = ref([
  { code: "ALL", label: "Wszystkie", count: 0 },
  { code: "NOT_COMPLETED", label: "Nieuzupełnione" },
  { code: "NEW", label: "Nowe" },
]);
const selectedTab = ref("ALL");

const setRecipesListCount = async () => {
  tabs.value[0].count = await store.dispatch("recipe/getRecipesListCount");
};

const isAddToCalendarModalOpen = ref(false);
const recipeAddedToCalendar = ref({});

const openAddToCalendarModal = (recipe: Recipe) => {
  recipeAddedToCalendar.value = recipe;
  isAddToCalendarModalOpen.value = true;
};

const goToNewRecipeView = () => {
  router.push("/recipes/new");
};

onMounted(() => {
  setRecipesListCount();
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
