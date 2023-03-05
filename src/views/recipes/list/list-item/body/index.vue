<script lang="ts">
import CDisplayTags from "@/components/data-display/display-tags/index.vue";
import CMonthPreview from "@/components/data-display/month-preview/index.vue";
import CYearPreview from "@/components/data-display/year-preview/index.vue";

export default {
  name: "RecipesListItemBody",
  components: {
    CDisplayTags,
    CMonthPreview,
    CYearPreview,
  },
};
</script>

<script setup lang="ts">
import { useWindowSize } from "@/composables/window-size";
import { useRecipeHelpers } from "@/views/recipes/composables/helpers";

const { isMobile } = useWindowSize();
const { isPlanned, getFormattedCookedDate, getPreparationTime, getKcal } =
  useRecipeHelpers();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  addTagToSelected: {
    type: Function,
    default: () => false,
  },
});

const getCookedDateTooltipText = () => {
  if (isPlanned.value) {
    return "Zaplanowane";
  }

  return (
    "Ostatnio gotowane " +
    getFormattedCookedDate(props.item.cookedDate).toLowerCase()
  );
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
