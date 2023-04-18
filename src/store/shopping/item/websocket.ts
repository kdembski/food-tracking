import { MutationTree, ActionTree } from "vuex";
import { ShoppingItem, ShoppingItemState } from "@/types/shopping/item";

const actions: ActionTree<ShoppingItemState, any> = {
  initWebSocket({ dispatch, commit, state }) {
    const url =
      process.env.VUE_APP_SERVICE_URL?.replace("http", "ws") +
      "/shopping/items";

    const ws = new WebSocket(url);
    commit("setWebSocket", ws);

    ws.addEventListener("message", (event: MessageEvent<string>) => {
      if (!event.data) {
        return;
      }

      const { listId, items }: { listId: string; items: ShoppingItem[] } =
        JSON.parse(event.data);

      if (parseInt(listId) !== state.currentListId) {
        return;
      }

      commit("setCollection", items);
      dispatch(
        "shopping/list/updateCount",
        {
          listId: state.currentListId,
          amount: items.length,
        },
        { root: true }
      );
    });
  },

  sendWebSocketMessage({ state }, returnToSameClient = true) {
    if (!state.currentListId) {
      return;
    }

    const message = { listId: state.currentListId, returnToSameClient };
    state.webSocket?.send(JSON.stringify(message));
  },
};

const mutations: MutationTree<ShoppingItemState> = {
  setWebSocket(state, webSocket: WebSocket) {
    state.webSocket = webSocket;
  },

  closeWebSocket(state) {
    state.webSocket?.close();
    state.webSocket = null;
  },
};

export default {
  actions,
  mutations,
};
