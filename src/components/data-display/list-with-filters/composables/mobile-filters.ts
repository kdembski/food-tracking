import { ref, Ref, computed } from "vue";

export function useMobileFilters(
  isMobile: Ref<boolean>,
  windowHeight: Ref<number>
) {
  const areMobileFiltersOpen = ref(false);
  const defaultLayoutWrapper = document.querySelector(
    ".layout-content__wrapper"
  );

  const toggleFiltersOnMobile = () => {
    if (!isMobile.value) {
      return;
    }
    defaultLayoutWrapper?.scrollTo(0, 0);
    areMobileFiltersOpen.value = !areMobileFiltersOpen.value;
  };

  const maxPositionY = windowHeight.value - 117;
  const mobileBtnPositionY = ref(maxPositionY - 60);
  const previousPageY = ref(mobileBtnPositionY.value);

  const onMobileBtnTouchMove = (e: TouchEvent) => {
    const pageY = e.changedTouches[0].pageY;
    const touchMoveDifference = previousPageY.value - pageY;
    previousPageY.value = pageY;

    const newPositionY = mobileBtnPositionY.value - touchMoveDifference;
    if (newPositionY > maxPositionY || newPositionY < 5) {
      return;
    }

    mobileBtnPositionY.value = newPositionY;
  };

  const onMobileBtnTouchStart = (e: TouchEvent) => {
    previousPageY.value = e.changedTouches[0].pageY;
  };

  const mobileBtnStyle = computed(() => {
    return "transform: translateY(" + mobileBtnPositionY.value + "px)";
  });

  return {
    areMobileFiltersOpen,
    toggleFiltersOnMobile,
    onMobileBtnTouchMove,
    onMobileBtnTouchStart,
    mobileBtnStyle,
  };
}
