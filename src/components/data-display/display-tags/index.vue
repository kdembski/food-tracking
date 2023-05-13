<script lang="ts">
export default {
  name: "CDisplayTags",
};
</script>

<script setup lang="ts">
import { computed, nextTick, ref, Ref, watch } from "vue";
import { useWindowSize } from "@/composables/window-size";

const props = defineProps({
  tags: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "medium",
    validator: (value: string) => {
      return ["small", "medium", "large"].indexOf(value) !== -1;
    },
  },
  backgroundColor: {
    type: String,
    default: "secondary",
    validator: (value: string) => {
      return ["primary", "secondary"].indexOf(value) !== -1;
    },
  },
  onClick: {
    type: Function,
    default: null,
  },
});

const { windowWidth } = useWindowSize();
const tagRefs: Ref<HTMLElement[] | undefined> = ref();

const tags = computed(() =>
  props.tags.split(",").map((tag) => ({
    name: tag,
  }))
);

const emit = defineEmits<{
  (e: "click", name: string): void;
}>();

const onClick = (name: string) => {
  props.onClick?.(name);
};

const getContainerClasses = () => {
  return [getSizeClass()];
};

const getSizeClass = () => {
  return "display-tags--" + props.size;
};

const getItemClasses = () => {
  return [getWithHoverClass()];
};

const getWithHoverClass = () => {
  if (props.onClick) {
    return "tag--with-hover";
  }
  return "";
};

const addLastInRowClass = (tagElements: HTMLElement[] | undefined) => {
  let previousElement: HTMLElement;
  tagElements?.forEach((element, index) => {
    if (index === 0) {
      previousElement = element;
      return;
    }

    if (previousElement.offsetTop === element.offsetTop) {
      previousElement.classList.remove("tag--last-in-row");
      previousElement = element;
      return;
    }

    previousElement.classList.add("tag--last-in-row");
    previousElement = element;
  });
};

watch(
  windowWidth,
  async () => {
    await nextTick();
    addLastInRowClass(tagRefs.value);
  },
  { immediate: true }
);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
