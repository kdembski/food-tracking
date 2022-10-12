<script lang="ts">
import CModal from "@/components/surfaces/modal/index.vue";
import CDatePicker from "@/components/controls/date-picker/index.vue";
import CSetPortions from "@/components/controls/set-portions/index.vue";
import { useStore } from "vuex";

export default {
  name: "AddToCalendarModal",
  components: { CModal, CDatePicker, CSetPortions },
};
</script>

<script setup lang="ts">
import { computed, ref, watch, Ref } from "vue";
import { Recipe } from "@/types/recipe";
import { OrderedFood } from "@/types/ordered-food";
import { useDateHelpers } from "@/composables/date-helpers";

const { getFormattedDate } = useDateHelpers();
const store = useStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  addedRecipe: {
    type: Object as () => Recipe,
  },
  addedOrderedFood: {
    type: Object as () => OrderedFood,
  },
});

const emits = defineEmits<{
  (event: "update:isOpen", value: boolean): void;
}>();

const _isOpen = computed({
  get(): boolean {
    return props.isOpen;
  },
  set(value: boolean) {
    emits("update:isOpen", value);
  },
});

const selectedDates = ref([]);

const isSelectedDatesEmpty = () => {
  return selectedDates.value.length === 0;
};

const portions: Ref<number[]> = ref([]);

watch(selectedDates, (dates) => {
  portions.value = dates
    .sort((a, b) => a - b)
    .map((_, index) => portions.value[index] || 2);
});

const isAddingToCalendar = ref(false);

const addAllSelectedDatesToCalendar = () => {
  isAddingToCalendar.value = true;

  const promises = selectedDates.value.map((date, index) => {
    return store.dispatch("calendar/addDateToCalendar", {
      date,
      recipeId: props.addedRecipe?.id,
      orderedFoodId: props.addedOrderedFood?.id,
      portions: portions.value[index],
    });
  });

  Promise.all(promises).then(() => {
    isAddingToCalendar.value = false;
    _isOpen.value = false;
  });
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
