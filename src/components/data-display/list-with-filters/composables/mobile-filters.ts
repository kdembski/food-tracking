import { ref, Ref } from "vue";
import { useStore } from "vuex";

export function useMobileFilters(
  isMobile: Ref<boolean>,
  contentRef: Ref<{ wrapper: HTMLElement } | undefined>
) {
  const store = useStore();

  const areMobileFiltersOpen = ref(false);
  const toggleFiltersOnMobile = () => {
    if (!isMobile.value) {
      return;
    }
    areMobileFiltersOpen.value = !areMobileFiltersOpen.value;
    store.commit(
      "setDefaultLayoutContentScrollable",
      !areMobileFiltersOpen.value
    );
  };

  const getMobileContainerClasses = () => {
    const classes = [];

    if (isMobile.value) {
      classes.push("list-with-filters--mobile");
    }
    if (areMobileFiltersOpen.value) {
      classes.push("list-with-filters--mobile-tags-open");
    }

    return classes;
  };

  const getMobileFiltersPositionTop = () => {
    if (!contentRef.value || !isMobile.value) {
      return "";
    }
    console.log(contentRef.value?.wrapper.offsetTop);
    return "top: " + contentRef.value?.wrapper.offsetTop + "px";
  };

  return {
    toggleFiltersOnMobile,
    getMobileContainerClasses,
    getMobileFiltersPositionTop,
  };
}
