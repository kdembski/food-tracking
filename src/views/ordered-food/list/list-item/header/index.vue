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
import { OrderedFood } from "@/types/ordered-food";
import { useWindowSize } from "@/composables/window-size";

const { isMobile } = useWindowSize();

const props = defineProps({
  item: {
    type: Object as () => OrderedFood,
    required: true,
  },
});

const emits = defineEmits<{
  (e: "addToCalendar", orderedFood: OrderedFood): void;
  (e: "edit", id: number): void;
}>();

const addToCalendar = () => {
  emits("addToCalendar", props.item);
};

const edit = () => {
  emits("edit", props.item.id);
};

const mobileDropdownOptions = [
  {
    value: "",
    label: "Dodaj do kalendarza",
    action: addToCalendar,
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
