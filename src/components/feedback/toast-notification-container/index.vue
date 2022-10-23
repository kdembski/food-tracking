<script lang="ts">
import CToastNotification from "@/components/feedback/toast-notification/index.vue";
import CTransition from "@/components/utils/transition/index.vue";

export default {
  name: "CToastNotificationContainer",
  components: { CToastNotification, CTransition },
};
</script>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const toastNotifications = computed(() => {
  return store.state.toastNotifications;
});

const isEmpty = () => {
  return toastNotifications.value.length === 0;
};

const getTransitionListProps = () => {
  return {
    isGroup: true,
    enterActiveClass:
      "toast-notification-container__list-transition-enter-active",
    leaveActiveClass:
      "toast-notification-container__list-transition-leave-active",
    enterFromClass: "toast-notification-container__list-transition-enter-from",
    leaveToClass: "toast-notification-container__list-transition-leave-to",
  };
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
