import { ref, Ref } from "vue";

export function useMobileFilters(isMobile: Ref<boolean>) {
  const areMobileFiltersOpen = ref(false);
  const toggleFiltersOnMobile = () => {
    if (!isMobile.value) {
      return;
    }
    areMobileFiltersOpen.value = !areMobileFiltersOpen.value;
  };

  const getMobileContainerClasses = () => {
    const classes = [];

    if (isMobile.value) {
      classes.push("list-with-filters--mobile");
    }

    return classes;
  };

  return {
    areMobileFiltersOpen,
    toggleFiltersOnMobile,
    getMobileContainerClasses,
  };
}
