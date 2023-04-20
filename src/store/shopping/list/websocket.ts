import { MutationTree, ActionTree } from "vuex";
import { ShoppingList, ShoppingListState } from "@/types/shopping/list";
import { WebSocketStates } from "@/types/api";
import { useWebSocketHelper } from "@/utils/websocket-helper";

const actions: ActionTree<ShoppingListState, any> = {
  initWebSocket({ commit, state }) {
    if (state.webSocket) {
      return;
    }
    const url =
      process.env.VUE_APP_SERVICE_URL?.replace("http", "ws") +
      "/shopping/lists";

    const ws = new WebSocket(url);
    commit("setWebSocket", ws);

    ws.addEventListener("message", (event: MessageEvent<string>) => {
      if (!event.data) {
        return;
      }

      const { lists }: { lists: ShoppingList[] } = JSON.parse(event.data);
      commit("setAll", lists);
    });
  },

  sendWebSocketMessage({ dispatch, state }) {
    const { isWebSocketClosed } = useWebSocketHelper();
    if (isWebSocketClosed(state.webSocket)) {
      dispatch("initWebSocket");
    }

    state.webSocket?.send("");
  },
};

const mutations: MutationTree<ShoppingListState> = {
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
