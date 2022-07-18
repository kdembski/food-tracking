import { ref, Ref, computed } from "vue";

export function useMobileFilters(
  isMobile: Ref<boolean>,
  windowHeight: Ref<number>
) {
  const areMobileFiltersOpen = ref(false);
  const mainScrollContainer = document.querySelector("#main-scroll-container");

  const toggleFiltersOnMobile = () => {
    if (!isMobile.value) {
      return;
    }
    mainScrollContainer?.scrollTo(0, 0);
    areMobileFiltersOpen.value = !areMobileFiltersOpen.value;
  };

  const maxPositionY = windowHeight.value - 122;
  const mobileBtnPositionY = ref(maxPositionY - 5);
  const currentPageY = ref(0);

  const onMobileBtnTouchMove = (e: TouchEvent) => {
    const pageY = e.changedTouches[0].pageY;
    const touchMoveDifference = currentPageY.value - pageY;
    currentPageY.value = pageY;

    const newPositionY = mobileBtnPositionY.value - touchMoveDifference;
    if (newPositionY > maxPositionY || newPositionY < 5) {
      return;
    }

    mobileBtnPositionY.value = newPositionY;
  };

  const onMobileBtnTouchStart = (e: TouchEvent) => {
    currentPageY.value = e.changedTouches[0].pageY;
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