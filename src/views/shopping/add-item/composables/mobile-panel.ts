import { ref } from "vue";

export function useMobileAddShoppingItemPanel() {
  const isMobilePanelOpen = ref(false);

  const onMobileButtonClick = () => {
    isMobilePanelOpen.value = !isMobilePanelOpen.value;
  };

  return {
    isMobilePanelOpen,
    onMobileButtonClick,
  };
}
