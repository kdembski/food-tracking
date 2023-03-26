import ApiService from "@/services/api.service";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosError, AxiosResponse } from "axios";
import { ShoppingItem, ShoppingItemState } from "@/types/shopping/item";

const state: () => ShoppingItemState = () => ({
  collection: null,
  isLoadingCollection: false,
  isSubmitting: false,
});

const getters: GetterTree<ShoppingItemState, any> = {};

const actions: ActionTree<ShoppingItemState, any> = {
  loadCollection({ commit, dispatch }, shoppingListId) {
    return new Promise<void>((resolve) => {
      commit("setIsLoadingCollection", true);

      ApiService.get(
        process.env.VUE_APP_SERVICE_URL +
          "/shopping/lists/" +
          shoppingListId +
          "/items"
      )
        .then((response: AxiosResponse<ShoppingItem[]>) => {
          commit("setCollection", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsLoadingCollection", false);
        });
    });
  },

  create({ commit, dispatch, rootState }, item: ShoppingItem) {
    return new Promise<void>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.post(process.env.VUE_APP_SERVICE_URL + "/shopping/items", item)
        .then(() => {
          rootState.toastNotification.success("Dodano do listy zakupów.");
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

  update({ commit, dispatch, rootState }, item: ShoppingItem) {
    return new Promise<void>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/shopping/items/" + item.id,
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

  updateIsChecked({ dispatch }, item: ShoppingItem) {
    return new Promise<void>((resolve) => {
      ApiService.put(
        process.env.VUE_APP_SERVICE_URL +
          "/shopping/items/" +
          item.id +
          "/set-checked",
        { isChecked: item.isChecked }
      )
        .then(() => {
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        });
    });
  },

  updateIsRemoved({ dispatch }, item: ShoppingItem) {
    return new Promise<void>((resolve) => {
      ApiService.put(
        process.env.VUE_APP_SERVICE_URL +
          "/shopping/items/" +
          item.id +
          "/set-removed",
        { isRemoved: item.isRemoved }
      )
        .then(() => {
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        });
    });
  },

  delete({ commit, dispatch, rootState }, itemId: number) {
    return new Promise<void>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.delete(
        process.env.VUE_APP_SERVICE_URL + "/shopping/items/" + itemId
      )
        .then(() => {
          rootState.toastNotification.success("Usunięto z listy zakupów.");
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

const mutations: MutationTree<ShoppingItemState> = {
  setCollection(state, collection: ShoppingItem[]) {
    state.collection = collection;
  },

  setIsLoadingCollection(state, value) {
    state.isLoadingCollection = value;
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
