<script lang="ts">
import CModal from "@/components/surfaces/modal/index.vue";
import CDatePicker from "@/components/controls/date-picker/index.vue";
import CSelectMembers from "@/components/controls/custom/select-members/index.vue";

export default {
  name: "AddToCalendarModal",
  components: { CModal, CDatePicker, CSelectMembers },
};
</script>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, ref, watch, ComputedRef } from "vue";
import { Recipe } from "@/types/recipes/recipe";
import { OrderedFood } from "@/types/ordered-food/ordered-food";
import { useDateHelpers } from "@/composables/date-helpers";
import { useAddToCalendar } from "./composables/add-to-calendar";

const store = useStore();

const emits = defineEmits<{
  (event: "update:isOpen", value: boolean): void;
}>();

const { getFormattedDate } = useDateHelpers();
const selectedDates = ref<Date[]>([]);
const members = ref<number[][]>([]);
const defaultMembers = ref([1, 2]);

const addedRecipe: ComputedRef<Recipe> = computed(
  () => store.state.calendar.addedRecipe
);
const addedOrderedFood: ComputedRef<OrderedFood> = computed(
  () => store.state.calendar.addedOrderedFood
);

const _isOpen = computed({
  get(): boolean {
    return store.state.calendar.isAddToCalendarModalOpen;
  },
  set(value: boolean) {
    store.commit("calendar/setIsAddToCalendarModalOpen", value);
  },
});

watch(_isOpen, (value) => {
  if (!value) {
    store.commit("calendar/setAddedRecipe", null);
    store.commit("calendar/setAddedOrderedFood", null);
  }
  selectedDates.value = [];
});

watch(selectedDates, (dates) => {
  dates.sort((a, b) => a.getTime() - b.getTime());
  members.value = dates.map(
    (_, index) => members.value[index] || defaultMembers.value
  );
});

const isSelectedDatesEmpty = () => {
  return selectedDates.value.length === 0;
};

const { addSelectedDatesToCalendar, isAddingToCalendar } = useAddToCalendar(
  selectedDates,
  members,
  _isOpen,
  addedRecipe,
  addedOrderedFood
);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
