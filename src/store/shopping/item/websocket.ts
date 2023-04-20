import { MutationTree, ActionTree } from "vuex";
import { ShoppingItem, ShoppingItemState } from "@/types/shopping/item";
import { useWebSocketHelper } from "@/utils/websocket-helper";

const actions: ActionTree<ShoppingItemState, any> = {
  initWebSocket({ commit, state }) {
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
    });
  },

  sendWebSocketMessage(
    { dispatch, state },
    { returnToSameClient, listId } = { returnToSameClient: true }
  ) {
    const targetedListId = listId || state.currentListId;
    if (!targetedListId) {
      return;
    }

    const { isWebSocketClosed } = useWebSocketHelper();
    if (isWebSocketClosed(state.webSocket)) {
      dispatch("initWebSocket");
    }

    const message = { listId: targetedListId, returnToSameClient };
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
