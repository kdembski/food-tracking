import ApiService from "@/services/api.service";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosError, AxiosResponse } from "axios";
import {
  ShoppingList,
  ShoppingListErrors,
  ShoppingListState,
} from "@/types/shopping/list";
import webSocket from "./websocket";

const state: () => ShoppingListState = () => ({
  single: null,
  isLoading: false,
  isSubmitting: false,

  all: null,
  isLoadingAll: false,
  isDeletingItems: false,

  webSocket: null,
  errors: null,
});

const getters: GetterTree<ShoppingListState, any> = {
  getById: (state) => (id: number) => {
    return state.all?.find((list) => list.id === id);
  },
  errors: (state) => state.errors,
};

const actions: ActionTree<ShoppingListState, any> = {
  loadAll({ commit, dispatch, state }, forceReload: boolean) {
    if (state.all && !forceReload) {
      return;
    }

    return new Promise<void>((resolve) => {
      commit("setIsLoadingAll", true);

      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/shopping/lists")
        .then((response: AxiosResponse<ShoppingList[]>) => {
          commit("setAll", response.data);
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsLoadingAll", false);
        });
    });
  },

  load({ commit, dispatch }, id: number) {
    return new Promise<void>((resolve) => {
      commit("setIsLoading", true);

      ApiService.get(process.env.VUE_APP_SERVICE_URL + "/shopping/lists/" + id)
        .then((response: AxiosResponse<ShoppingList>) => {
          commit("setSingle", response.data);
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
          dispatch("sendWebSocketMessage");
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch(
            "handleComplexError",
            { error, module: "shopping/list" },
            { root: true }
          );
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
          dispatch("sendWebSocketMessage");
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch(
            "handleComplexError",
            { error, module: "shopping/list" },
            { root: true }
          );
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

  removeItems({ commit, dispatch, rootState }, listId: number) {
    commit("shopping/item/setCollectionToRestore", true, { root: true });

    return new Promise<void>((resolve) => {
      commit("setIsDeletingItems", true);

      ApiService.delete(
        process.env.VUE_APP_SERVICE_URL + "/shopping/lists/" + listId + "/items"
      )
        .then(() => {
          dispatch("sendWebSocketMessage");
          dispatch(
            "shopping/item/sendWebSocketMessage",
            { returnToSender: true, listId },
            { root: true }
          );

          rootState.toastNotification.success(
            "Wyczyszczono listę zakupów.",
            () =>
              dispatch("shopping/item/restoreCollection", true, { root: true }),
            "Cofnij"
          );
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        })
        .finally(() => {
          commit("setIsDeletingItems", false);
        });
    });
  },

  ...webSocket.actions,
};

const mutations: MutationTree<ShoppingListState> = {
  setAll(state, all: ShoppingList[]) {
    state.all = all;
  },

  setSingle(state, single: ShoppingList) {
    state.single = single;
  },

  setIsLoading(state, value) {
    state.isLoading = value;
  },

  setIsLoadingAll(state, value) {
    state.isLoadingAll = value;
  },

  setIsSubmitting(state, value) {
    state.isSubmitting = value;
  },

  setIsDeletingItems(state, value) {
    state.isDeletingItems = value;
  },

  setErrors(state, value: ShoppingListErrors) {
    state.errors = value;
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
