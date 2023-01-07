<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CInput from "@/components/controls/input/index.vue";
import CSelectTags from "@/components/controls/select-tags/index.vue";
import CModal from "@/components/surfaces/modal/index.vue";

export default {
  name: "EditOrderedFoodModal",
  components: { CButton, CInput, CSelectTags, CModal },
};
</script>

<script setup lang="ts">
import { useWindowSize } from "@/composables/window-size";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useStore } from "vuex";
import { cloneDeep } from "lodash";

const store = useStore();
const { isMobile } = useWindowSize();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  orderedFoodId: {
    type: Number,
    default: null,
  },
});

const emits = defineEmits<{
  (event: "update:isOpen", value: boolean): void;
}>();

const _isOpen = computed({
  get(): boolean {
    return props.isOpen;
  },
  set(value: boolean) {
    emits("update:isOpen", value);
  },
});

const emptyOrderedFood = {
  foodName: "",
  placeName: "",
  placeLink: "",
  tags: "",
};
const orderedFood = ref();
const orderedFoodTags = ref();
const isAddingNewFood = computed(() => !props.orderedFoodId);
const isSubmitting = computed(() => {
  return store.state.orderedFood.isSubmitting;
});
const isLoadingOrderedFood = computed(() => store.state.orderedFood.isLoading);
const isLoadingTags = computed(() => store.state.orderedFood.isLoadingTags);

onBeforeMount(() => {
  setOrderedFoodTags();
});

watch(_isOpen, (value) => {
  orderedFood.value = cloneDeep(emptyOrderedFood);

  if (!value) {
    return;
  }

  if (!isAddingNewFood.value) {
    setOrderedFood();
  }
});

const setOrderedFood = async () => {
  await store.dispatch("orderedFood/load", props.orderedFoodId);
  orderedFood.value = store.state.orderedFood.single;
};

const setOrderedFoodTags = async () => {
  orderedFoodTags.value = await store.dispatch("orderedFood/loadTags");
};

const updateOrderedFood = () => {
  return store.dispatch("orderedFood/update", orderedFood.value);
};

const createOrderedFood = () => {
  return store.dispatch("orderedFood/create", orderedFood.value);
};

const submit = async () => {
  if (isAddingNewFood.value) {
    await createOrderedFood();
    _isOpen.value = false;
    return;
  }
  await updateOrderedFood();
  _isOpen.value = false;
};

const getTitle = () => {
  if (isAddingNewFood.value) {
    return "Dodaj zamawiane jedzenie";
  }
  return "Edytuj zamawiane jedzenie";
};

const getSubmitButtonLabel = () => {
  if (isAddingNewFood.value) {
    return "Dodaj";
  }
  return "Zapisz";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
