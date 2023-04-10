import { ShoppingItem } from "@/types/shopping/item";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useShoppingItemDraggableConfigOnDrop } from "./draggable-config/on-drop";
import { useShoppingItemDraggableConfigOnDrag } from "./draggable-config/on-drag";

export function useShoppingItemDraggableConfig() {
  const store = useStore();

  const isDragging = computed({
    get(): boolean {
      return store.state.shopping.item.isDragging;
    },
    set(value: boolean) {
      store.commit("shopping/item/setIsDragging", value);
    },
  });

  const { onDrop } = useShoppingItemDraggableConfigOnDrop();
  const { onDragStart, onDragEnd, onDrag } =
    useShoppingItemDraggableConfigOnDrag(isDragging);

  const config = (item: ShoppingItem) => ({
    draggable: true,
    ondragstart: (e: any) => onDragStart(e, item),
    ondragend: onDragEnd,
    ondrag: onDrag,
  });

  return {
    config,
    isDragging,
    onDrop,
  };
}
