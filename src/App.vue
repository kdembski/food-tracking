<template>
  <component :is="layoutComponentName">
    <router-view />
  </component>
  <CToastNotificationContainer />
  <CTooltip />
</template>

<script lang="ts">
import PlainLayout from "@/layouts/plain/index.vue";
import DefaultLayout from "@/layouts/default/index.vue";
import CToastNotificationContainer from "@/components/feedback/toast-notification-container/index.vue";
import CTooltip from "@/components/feedback/tooltip/index.vue";
import { useToastNotification } from "@/composables/toast-notification";

export default {
  components: {
    PlainLayout,
    DefaultLayout,
  },
};
</script>

<script setup lang="ts">
import { computed, onBeforeMount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ApiService from "./services/api.service";
import { useStore } from "vuex";

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

<style lang="scss">
*,
*:before,
*:after {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  background-color: var(--surface-primary);
  color: var(--text-primary);
}

.grabbing * {
  cursor: grab;
}

a {
  all: unset;
}

.delete-modal {
  strong {
    color: color-mix(in srgb, var(--primary) 60%, $white);
  }
}

@media screen and (min-width: $screen-md) {
  * {
    &::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 100px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--text-tetriary);
      border-radius: 100px;
      border: 4px transparent solid;
      background-clip: padding-box;
    }
  }
}
</style>
