export function useWebSocketHelper() {
  const isClosed = (ws: WebSocket) => {
    return (
      ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING
    );
  };

  const isConnecting = (ws: WebSocket) => {
    return ws.readyState === WebSocket.CONNECTING;
  };

  const sendMessage = async (
    ws: WebSocket | null,
    message: unknown,
    initWebSocket?: any
  ) => {
    ws = await ws;

    if (!ws || isClosed(ws)) {
      setTimeout(() => {
        const ws = initWebSocket?.();
        sendMessage(ws, message);
      }, 5);

      return;
    }

    if (isConnecting(ws)) {
      setTimeout(() => {
        sendMessage(ws, message);
      }, 5);

      return;
    }

    ws.send(JSON.stringify(message));
  };

  return { sendMessage };
}
