<script lang="ts">
import CModal from "@/components/surfaces/modal/index.vue";
import CDatePicker from "@/components/controls/date-picker/index.vue";
import CSetPortions from "@/components/controls/set-portions/index.vue";

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
import { useAddToCalendar } from "./composables/add-to-calendar";

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
  defaultPortions: {
    type: Number,
    default: 2,
  },
});

const emits = defineEmits<{
  (event: "update:isOpen", value: boolean): void;
}>();

const { getFormattedDate } = useDateHelpers();
const selectedDates: Ref<Date[]> = ref([]);
const portions: Ref<number[]> = ref([]);

const _isOpen = computed({
  get(): boolean {
    return props.isOpen;
  },
  set(value: boolean) {
    emits("update:isOpen", value);
  },
});

watch(_isOpen, () => {
  selectedDates.value = [];
});

watch(selectedDates, (dates) => {
  dates.sort((a, b) => a.getTime() - b.getTime());
  portions.value = dates.map(
    (_, index) => portions.value[index] || props.defaultPortions
  );
});

const isSelectedDatesEmpty = () => {
  return selectedDates.value.length === 0;
};

const { addSelectedDatesToCalendar, isAddingToCalendar } = useAddToCalendar(
  selectedDates,
  portions,
  _isOpen,
  computed(() => props.addedRecipe),
  computed(() => props.addedOrderedFood)
);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
