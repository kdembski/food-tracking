<script lang="ts">
import CModal from "@/components/surfaces/modal/index.vue";
import CSelectMembers from "@/components/controls/custom/select-members/index.vue";

export default {
  name: "WeeklyCalendarDay",
  components: {
    CModal,
    CSelectMembers,
  },
};
</script>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useToastNotification } from "@/composables/toast-notification";
import { useStore } from "vuex";

const toastNotification = useToastNotification();
const store = useStore();

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

const updateCalendarItemMembers = () => {
  isUpdating.value = true;
  store
    .dispatch("calendar/updateItemMembers", props.calendarItem)
    .then(() => {
      toastNotification.success("Kalendarz zaktualizowany pomyślnie!");
    })
    .catch(() => {
      toastNotification.error("Aktualizacja kalendarza nie powiodła się.");
    })
    .finally(() => {
      isUpdating.value = false;
      closeModal();
    });
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
