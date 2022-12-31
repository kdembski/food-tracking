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
    toggleChildTransitionClassOnListContainer();
    areMobileFiltersOpen.value = !areMobileFiltersOpen.value;
  };

  let childTransitionClassTimeout = 0;
  const toggleChildTransitionClassOnListContainer = () => {
    const container = document.querySelector(".list-with-filters");
    container?.classList.add("list-with-filters--child-transition");

    clearTimeout(childTransitionClassTimeout);
    childTransitionClassTimeout = setTimeout(() => {
      container?.classList.remove("list-with-filters--child-transition");
    }, 400);
  };

  const maxPositionY = windowHeight.value - 124;
  const mobileBtnPositionY = ref(maxPositionY);
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
