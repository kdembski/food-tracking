<script lang="ts">
import CModal from "@/components/surfaces/modal/index.vue";
import CSetPortions from "@/components/controls/set-portions/index.vue";

export default {
  name: "WeeklyCalendarDay",
  components: {
    CModal,
    CSetPortions,
  },
};
</script>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useToastNotification } from "@/composables/toast-notification";

const toastNotification = useToastNotification();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
  },
  calendarItem: {
    type: Object,
  },
  updateCalendarItem: {
    type: Function,
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

const closeModal = () => {
  _isOpen.value = false;
};

const isUpdating = ref(false);

const updateCalendarItem = () => {
  isUpdating.value = true;
  props
    .updateCalendarItem(props.calendarItem, props.date)
    .then(() => {
      toastNotification.success("Kalendarz zaktualizowany pomyślnie!");
    })
    .catch(() => {
      toastNotification.error("Nie udało sie zaktualizować kalendarza.");
    })
    .finally(() => {
      isUpdating.value = false;
      closeModal();
    });
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
