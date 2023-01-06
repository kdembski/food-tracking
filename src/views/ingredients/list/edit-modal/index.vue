<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CInput from "@/components/controls/input/index.vue";
import CSelectTags from "@/components/controls/select-tags/index.vue";
import CModal from "@/components/surfaces/modal/index.vue";

export default {
  name: "EditIngredientModal",
  components: { CButton, CInput, CSelectTags, CModal },
};
</script>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { cloneDeep } from "lodash";

const store = useStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  ingredientId: {
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

const emptyIngredient = {
  name: "",
  categoryId: "",
  unitIds: [],
};
const ingredient = ref();
const isAddingNewIngredient = computed(() => !props.ingredientId);

const isSubmitting = computed(() => {
  return store.state.ingredient.isSubmittingIngredient;
});
const isLoadingIngredient = computed(
  () => store.state.ingredient.isLoadingIngredient
);

watch(_isOpen, (value) => {
  if (!value) {
    return;
  }

  if (!isAddingNewIngredient.value) {
    setIngredient();
    return;
  }
  ingredient.value = cloneDeep(emptyIngredient);
});

const setIngredient = async () => {
  await store.dispatch("ingredient/loadIngredient", props.ingredientId);
  ingredient.value = store.state.ingredient.ingredient;
};

const updateIngredient = () => {
  return store.dispatch("ingredient/updateIngredient", ingredient.value);
};

const createIngredient = () => {
  return store.dispatch("ingredient/createIngredient", ingredient.value);
};

const submit = async () => {
  if (isAddingNewIngredient.value) {
    await createIngredient();
    _isOpen.value = false;
    return;
  }

  await updateIngredient();
  _isOpen.value = false;
};

const getTitle = () => {
  if (isAddingNewIngredient.value) {
    return "Dodaj składnik";
  }
  return "Edytuj składnik";
};

const getSubmitButtonLabel = () => {
  if (isAddingNewIngredient.value) {
    return "Dodaj";
  }
  return "Zapisz";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
