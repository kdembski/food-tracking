import ApiService from "@/services/api.service";
import { ApiError } from "@/types/api";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AxiosError, AxiosResponse } from "axios";
import { ShoppingItem, ShoppingItemState } from "@/types/shopping/item";
import { ShoppingList } from "@/types/shopping/list";

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

  create(
    { commit, dispatch, state, rootState, rootGetters },
    item: ShoppingItem
  ) {
    return new Promise<void>((resolve) => {
      commit("setIsSubmitting", true);

      ApiService.post(process.env.VUE_APP_SERVICE_URL + "/shopping/items", item)
        .then(() => {
          rootState.toastNotification.success("Dodano do listy zakupów.");
          const list: ShoppingList = rootGetters["shopping/list/getById"](
            state.currentListId
          );
          list.count++;

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

  update({ commit, dispatch, rootState }, item: ShoppingItem) {
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
          dispatch("sendWebSocketMessage");
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
          dispatch("sendWebSocketMessage");
          resolve();
        })
        .catch((error: AxiosError<ApiError>) => {
          dispatch("handleDefaultError", error, { root: true });
        });
    });
  },

  delete({ commit, dispatch, state, rootGetters }, itemId: number) {
    return new Promise<void>((resolve) => {
      commit("setIsDeleting", true);

      ApiService.delete(
        process.env.VUE_APP_SERVICE_URL + "/shopping/items/" + itemId
      )
        .then(() => {
          const list: ShoppingList = rootGetters["shopping/list/getById"](
            state.currentListId
          );
          list.count--;

          dispatch("sendWebSocketMessage");
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

  initWebSocket({ commit, state }) {
    const url =
      process.env.VUE_APP_SERVICE_URL?.replace("http", "ws") +
      "/shopping/items";
    const ws = new WebSocket(url);
    commit("setWebSocket", ws);

    ws.addEventListener("message", (event) => {
      const { listId, items }: { listId: string; items: ShoppingItem[] } =
        JSON.parse(event.data.toString());

      if (parseInt(listId) !== state.currentListId) {
        return;
      }
      commit("setCollection", items);
    });
  },

  sendWebSocketMessage({ state }) {
    if (!state.currentListId) {
      return;
    }
    state.webSocket?.send(state.currentListId.toString());
  },
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

  setWebSocket(state, webSocket: WebSocket) {
    state.webSocket = webSocket;
  },

  setItemToMove(state, itemToMove: ShoppingItem | null) {
    state.itemToMove = itemToMove;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
