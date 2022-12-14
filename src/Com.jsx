import { useCallback, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const validCommands = [
  { command: "Look" },
  { command: "DropBomb" },
  { command: ["SetName", "<name>"] },
  { command: "MoveNorth" },
  { command: "MoveSouth" },
  { command: "MoveEast" },
  { command: "MoveWest" },
];

export const WebSocketDemo = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState("ws://172.16.173.86:8080");
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      // setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl("172.16.173.86:8080"),
    []
  );

  const handleClickSendMessage = useCallback(
    () => sendMessage(JSON.stringify({ command: "Look" })),
    []
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      <button onClick={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </button>
      <button
        onClick={handleClickSendMessage}
        // disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <code>Last message: {lastMessage.data}</code> : null}
      {/*  of the board */}
      <ul>
        {messageHistory.map((message, idx) => (
          <code key={idx}> {message ? message.data : null}</code>
        ))}
      </ul>
    </div>
  );
};
