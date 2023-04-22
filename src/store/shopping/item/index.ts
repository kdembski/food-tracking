import ApiService from "@/services/api.service";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosError, AxiosResponse } from "axios";
import { ShoppingItem, ShoppingItemState } from "@/types/shopping/item";
import webSocket from "./websocket";

const state: () => ShoppingItemState = () => ({
  collection: null,
  currentListId: null,
  isLoadingCollection: false,
  isSubmitting: false,
  isDeleting: false,
  webSocket: null,
  itemToMove: null,
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
          commit("setCurrentListId", shoppingListId);
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
          dispatch("sendWebSocketMessage");
          dispatch("shopping/list/sendWebSocketMessage", true, { root: true });

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

  update({ commit, dispatch }, item: ShoppingItem) {
    return new Promise<void>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.put(
        process.env.VUE_APP_SERVICE_URL + "/shopping/items/" + item.id,
        item
      )
        .then(() => {
          dispatch("sendWebSocketMessage");
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

  delete({ commit, dispatch }, itemId: number) {
    return new Promise<void>((resolve) => {
      commit("setIsDeleting", true);

      ApiService.delete(
        process.env.VUE_APP_SERVICE_URL + "/shopping/items/" + itemId
      )
        .then(() => {
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsDeleting", false);
        });
    });
  },

  deleteByRecipeId({ dispatch }, recipeId: number) {
    return new Promise<void>((resolve) => {
      ApiService.delete(
        process.env.VUE_APP_SERVICE_URL + "/shopping/items/recipes/" + recipeId
      )
        .then(() => {
          dispatch("sendWebSocketMessage");
          dispatch("shopping/list/sendWebSocketMessage", true, { root: true });
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        });
    });
  },

  ...webSocket.actions,
};

const mutations: MutationTree<ShoppingItemState> = {
  setCollection(state, collection: ShoppingItem[]) {
    state.collection = collection;
  },

  setCurrentListId(state, id: number) {
    state.currentListId = id;
  },

  setIsLoadingCollection(state, value) {
    state.isLoadingCollection = value;
  },

  setIsSubmitting(state, value) {
    state.isSubmitting = value;
  },

  setIsDeleting(state, value) {
    state.isDeleting = value;
  },

  setItemToMove(state, itemToMove: ShoppingItem | null) {
    state.itemToMove = itemToMove;
  },

  ...webSocket.mutations,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
