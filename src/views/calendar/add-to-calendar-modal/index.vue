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

const { getFormattedDate } = useDateHelpers();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  addedItem: {
    type: Object as () => Recipe | OrderedFood,
    required: true,
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
  portions.value = dates.map((_, index) => portions.value[index] || 2);
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
