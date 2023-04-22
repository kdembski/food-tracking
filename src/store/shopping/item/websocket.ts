import { MutationTree, ActionTree } from "vuex";
import { ShoppingItem, ShoppingItemState } from "@/types/shopping/item";
import { useWebSocketHelper } from "@/utils/websocket-helper";

const actions: ActionTree<ShoppingItemState, any> = {
  initWebSocket({ commit, state }) {
    if (state.webSocket?.readyState === WebSocket.OPEN) {
      return;
    }

    const url =
      process.env.VUE_APP_SERVICE_URL?.replace("http", "ws") +
      "/shopping/items";

    const ws = new WebSocket(url);
    commit("setWebSocket", ws);

    ws.onmessage = (event: MessageEvent<string>) => {
      if (!event.data) {
        return;
      }

      const { listId, items }: { listId: string; items: ShoppingItem[] } =
        JSON.parse(event.data);

      if (parseInt(listId) !== state.currentListId) {
        return;
      }

      commit("setCollection", items);
    };

    return ws;
  },

  async sendWebSocketMessage(
    { dispatch, state },
    { returnToSender, listId } = { returnToSender: true }
  ) {
    const targetedListId = listId || state.currentListId;
    if (!targetedListId) {
      return;
    }

    const message = { listId: targetedListId, returnToSender };
    const { sendMessage } = useWebSocketHelper();
    sendMessage(state.webSocket, message, () => dispatch("initWebSocket"));
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
