import { ref, computed } from "vue";

const windowHeight = ref(window.innerHeight);
const windowWidth = ref(window.innerWidth);

const isMobile = computed(() => {
  return windowWidth.value <= 768;
});

const onResize = () => {
  windowHeight.value = window.innerHeight;
  windowWidth.value = window.innerWidth;
};

const addResizeListener = () => {
  window.addEventListener("resize", onResize);
};

const removeResizeListener = () => {
  window.removeEventListener("resize", onResize);
};

export function useWindowSize() {
  return {
    windowHeight,
    windowWidth,
    isMobile,
    addResizeListener,
    removeResizeListener,
  };
}
