<script lang="ts">
import CDisplayTags from "@/components/data-display/display-tags/index.vue";
import CButton from "@/components/controls/button/index.vue";
import CLink from "@/components/utils/link/index.vue";
import CButtonWithDropdown from "@/components/controls/button-with-dropdown/index.vue";

export default {
  name: "OrderedFoodListView",
  components: {
    CDisplayTags,
    CButton,
    CLink,
    CButtonWithDropdown,
  },
};
</script>

<script setup lang="ts">
import { useStore } from "vuex";
import { OrderedFood } from "@/types/ordered-food/ordered-food";
import { useWindowSize } from "@/composables/window-size";

const { isMobile } = useWindowSize();
const store = useStore();

const props = defineProps({
  item: {
    type: Object as () => OrderedFood,
    required: true,
  },
});

const emits = defineEmits<{
  (e: "edit", id: number): void;
}>();

const edit = () => {
  emits("edit", props.item.id);
};

const openAddToCalendarModal = () => {
  store.commit("calendar/setAddedOrderedFood", props.item);
  store.commit("calendar/setIsAddToCalendarModalOpen", true);
};

const mobileDropdownOptions = [
  {
    value: "",
    label: "Dodaj do kalendarza",
    action: openAddToCalendarModal,
    icon: ["far", "calendar"],
  },
  {
    value: "",
    label: "Edytuj",
    action: edit,
    icon: "pen-to-square",
  },
];
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
