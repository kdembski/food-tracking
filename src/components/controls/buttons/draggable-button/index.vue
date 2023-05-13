<script lang="ts">
export default {
  name: "CDraggableButton",
};
</script>

<script setup lang="ts">
import { useWindowSize } from "@/composables/window-size";
import { computed, onBeforeMount, ref, useAttrs, watch } from "vue";
import StorageService from "@/services/storage.service";

const props = defineProps<{
  icon: string;
}>();

const { windowHeight, isMobile } = useWindowSize();
const attrs = useAttrs();
const maxPositionY = windowHeight.value - 70;
const positionY = ref(maxPositionY);
const currentPageY = ref(0);
const button = ref<HTMLButtonElement>();

defineExpose({
  button,
});

const onTouchMove = (e: TouchEvent) => {
  const pageY = e.changedTouches[0].pageY;
  const touchMoveDifference = currentPageY.value - pageY;
  currentPageY.value = pageY;

  const newPositionY = positionY.value - touchMoveDifference;
  if (newPositionY > maxPositionY || newPositionY < 5) {
    return;
  }

  positionY.value = newPositionY;
};

const onTouchStart = (e: TouchEvent) => {
  currentPageY.value = e.changedTouches[0].pageY;
};

const style = computed(() => {
  return "transform: translateY(" + positionY.value + "px)";
});

watch(positionY, () => {
  setPositionToStorage();
});

const setPositionToStorage = () => {
  if (!attrs.id) {
    return;
  }
  StorageService.setItem(attrs.id + "-position", positionY.value.toString());
};

const setPositionFromStorage = () => {
  const position = parseInt(StorageService.getItem(attrs.id + "-position"));
  if (!position) {
    return;
  }

  positionY.value = position;
};

onBeforeMount(() => {
  setPositionFromStorage();
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
