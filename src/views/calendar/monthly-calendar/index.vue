<script lang="ts">
export default {
  name: "MonthlyCalendar",
};
</script>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  allDatesInMonth: {
    type: Array,
    required: true,
  },
});

const store = useStore();
const calendar = ref();

onMounted(async () => {
  calendar.value = await getMonthlyCalendar();
});

const getMonthlyCalendar = () => {
  const datesRange = {
    fromDate: props.allDatesInMonth[0],
    toDate: props.allDatesInMonth[props.allDatesInMonth.length - 1],
  };
  return store.dispatch("calendar/getCalendar", datesRange);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
