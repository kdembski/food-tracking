import { WebSocketStates } from "@/types/api";

export function useWebSocketHelper() {
  const isWebSocketClosed = (ws?: WebSocket | null) => {
    return (
      ws?.readyState === WebSocketStates.CLOSED ||
      ws?.readyState === WebSocketStates.CLOSING
    );
  };

  return {
    isWebSocketClosed,
  };
}
