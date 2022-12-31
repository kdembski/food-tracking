import { ref, Ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";

export function useStickyPagination(
  paginationRef: Ref<HTMLElement | undefined>
) {
  const store = useStore();
  const paginationInitialOffsetTop = ref(0);
  const paginationCurrentOffsetTop = ref(0);

  const getPaginationOffsetTop = () => {
    return paginationRef.value?.offsetTop;
  };

  const mainContainerScrollValue = computed(() => {
    return store.state.mainContainerScrollValue;
  });

  watch(
    mainContainerScrollValue,
    () => {
      paginationCurrentOffsetTop.value = getPaginationOffsetTop() || 0;
    },
    { immediate: true }
  );

  onMounted(() => {
    paginationInitialOffsetTop.value = getPaginationOffsetTop() || 0;
  });

  const paginationStickyClass = computed(() => {
    if (
      paginationCurrentOffsetTop.value >
      paginationInitialOffsetTop.value + 5
    ) {
      return "list-with-filters__pagination-top--sticky";
    }
    return "";
  });

  return {
    paginationStickyClass,
  };
}
