import item from "./item";
import list from "./list";
import customItem from "./custom-item";
import { ShoppingState } from "@/types/shopping";
import { MutationTree } from "vuex";

const state: () => ShoppingState = () => ({
  isAddRecipeModalOpen: false,
  addedRecipeId: null,
});

const mutations: MutationTree<ShoppingState> = {
  setIsAddRecipeModalOpen(state, value: boolean) {
    state.isAddRecipeModalOpen = value;
  },

  setAddedRecipeId(state, value: number) {
    state.addedRecipeId = value;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  modules: { item, list, customItem },
};
