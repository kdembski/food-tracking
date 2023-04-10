import { ShoppingItem } from "@/types/shopping/item";
import { WritableComputedRef, ref } from "vue";

export function useShoppingItemDraggableConfigOnDrag(
  isDragging: WritableComputedRef<boolean>
) {
  const dragClone = ref<HTMLElement>();

  const onDragStart = (e: any, item: ShoppingItem) => {
    isDragging.value = true;

    setDragClone(e.target);
    hideDragImg(e);

    document.body.style.overflow = "hidden";
    e.target.classList.add("shopping-list__ghost");
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  const hideDragImg = (e: DragEvent) => {
    const img = new Image();
    e.dataTransfer?.setDragImage(img, 0, 0);
  };

  const setDragClone = (item: HTMLElement) => {
    dragClone.value = item.cloneNode(true) as HTMLElement;
    if (!dragClone.value) {
      return;
    }

    dragClone.value.classList.add("shopping-list__drag-clone");
    const list = document.querySelector(".shopping-list");
    list?.appendChild(dragClone.value);
  };

  const onDragEnd = (e: any) => {
    isDragging.value = false;

    document.body.style.removeProperty("overflow");
    e.target.classList.remove("shopping-list__ghost");

    removeDragClone();
  };

  const removeDragClone = () => {
    dragClone.value?.remove();
    dragClone.value = undefined;
  };

  const onDrag = (e: any) => {
    if (!dragClone.value || !e.x || !e.y) {
      return;
    }

    const cloneWidth = dragClone.value.clientWidth;
    const cloneHeight = dragClone.value.clientHeight;
    const top = e.y - cloneHeight / 2;
    const left = e.x - cloneWidth / 2;

    dragClone.value.style.transform = `translate(${left}px, ${top}px)`;
    dragClone.value.style.opacity = "1";
  };

  return {
    onDragStart,
    onDragEnd,
    onDrag,
  };
}
