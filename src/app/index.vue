<script lang="ts">
import PlainLayout from "@/layouts/plain/index.vue";
import DefaultLayout from "@/layouts/default/index.vue";
import CToastNotificationContainer from "@/components/feedback/toast-notification-container/index.vue";
import CTooltip from "@/components/feedback/tooltip/index.vue";

export default {
  name: "App",
  components: {
    PlainLayout,
    DefaultLayout,
    CToastNotificationContainer,
    CTooltip,
  },
};
</script>

<script setup lang="ts">
import ApiService from "@/services/api.service";
import { computed, onBeforeMount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useToastNotification } from "@/composables/toast-notification";

const store = useStore();
const toastNotification = useToastNotification();
const router = useRouter();

store.state.toastNotification = toastNotification;
store.state.router = router;

const theme = computed(() => store.state.theme);
watch(
  theme,
  (value) => {
    document.documentElement.setAttribute("data-theme", value);
  },
  { immediate: true }
);

const primaryColor = computed(() => store.state.primaryColor);
watch(
  primaryColor,
  (value) => {
    document.documentElement.setAttribute("data-primary-color", value);
  },
  { immediate: true }
);

const layoutComponentName = computed(() => {
  const layoutType = useRoute().meta.layout;
  return (layoutType || "default") + "-layout";
});

onBeforeMount(() => {
  ApiService.setHeader();
  store.dispatch("member/loadAll");
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss"></style>
