import { MutationTree, ActionTree } from "vuex";
import { ShoppingList, ShoppingListState } from "@/types/shopping/list";

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

  sendWebSocketMessage({ state }) {
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
