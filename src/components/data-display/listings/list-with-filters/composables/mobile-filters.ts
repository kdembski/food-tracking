import { ref, Ref } from "vue";

export function useMobileFilters(isMobile: Ref<boolean>) {
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
    childTransitionClassTimeout = window.setTimeout(() => {
      container?.classList.remove("list-with-filters--child-transition");
    }, 400);
  };

  return {
    areMobileFiltersOpen,
    toggleFiltersOnMobile,
  };
}
