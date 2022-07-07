import { ref, computed } from "vue";

const windowHeight = ref(window.innerHeight);
const windowWidth = ref(window.innerWidth);
const isMobile = computed(() => {
  return windowWidth.value <= 768;
});
const isMobileKeyboardOpen = computed(() => {
  return windowHeight.value <= 600;
});

export function useWindowSize() {
  windowHeight.value = window.innerHeight;
  windowWidth.value = window.innerWidth;

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

  return {
    windowHeight,
    windowWidth,
    isMobile,
    isMobileKeyboardOpen,
    addResizeListener,
    removeResizeListener,
  };
}
