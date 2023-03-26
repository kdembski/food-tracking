import ApiService from "@/services/api.service";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosError, AxiosResponse } from "axios";
import { ShoppingList, ShoppingListState } from "@/types/shopping/list";

const state: () => ShoppingListState = () => ({
  all: null,
  isLoading: false,
  isSubmitting: false,
});

const getters: GetterTree<ShoppingListState, any> = {};

const actions: ActionTree<ShoppingListState, any> = {
  loadAll({ commit, dispatch }) {
    return new Promise<void>((resolve) => {
      commit("setIsLoading", true);

      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/shopping/lists")
        .then((response: AxiosResponse<ShoppingList[]>) => {
          commit("setAll", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsLoading", false);
        });
    });
  },

  create({ commit, dispatch, rootState }, item: ShoppingList) {
    return new Promise<void>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.post(process.env.VUE_APP_SERVICE_URL + "/shopping/lists", item)
        .then(() => {
          rootState.toastNotification.success("Dodano listę zakupów.");
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsSubmitting", false);
        });
    });
  },

  update({ commit, dispatch, rootState }, item: ShoppingList) {
    return new Promise<void>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/shopping/lists/" + item.id,
        item
      )
        .then(() => {
          rootState.toastNotification.success("Zedytowano listę zakupów.");
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsSubmitting", false);
        });
    });
  },

  delete({ commit, dispatch, rootState }, itemId: number) {
    return new Promise<void>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.delete(
        process.env.VUE_APP_SERVICE_URL + "/shopping/lists/" + itemId
      )
        .then(() => {
          rootState.toastNotification.success("Usunięto listę zakupów.");
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsSubmitting", false);
        });
    });
  },
};

const mutations: MutationTree<ShoppingListState> = {
  setAll(state, all: ShoppingList[]) {
    state.all = all;
  },

  setIsLoading(state, value) {
    state.isLoading = value;
  },

  setIsSubmitting(state, value) {
    state.isSubmitting = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
