import { useCallback, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const validCommands = [
  { command: "Look" },
  { command: "DropBomb" },
  { command: ["SetName", "mrjavascripter"] },
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

  const handleKeyPress = useCallback((event) => {
    if (event.key === "w") {
      sendMessage(JSON.stringify({ command: "MoveNorth" }));
    }
    if (event.key === "s") {
      sendMessage(JSON.stringify({ command: "MoveSouth" }));
    }
    if (event.key === "a") {
      sendMessage(JSON.stringify({ command: "MoveWest" }));
    }
    if (event.key === "d") {
      sendMessage(JSON.stringify({ command: "MoveEast" }));
    }
    if (event.key === "b") {
      sendMessage(JSON.stringify({ command: "DropBomb" }));
    }
    console.log(`Key pressed: ${event.key}`);
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (lastMessage !== null) {
      // setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl("172.16.173.86:8080"),
    []
  );

  const commmands = [
    "Look",
    "DropBomb",
    "MoveNorth",
    "MoveSouth",
    "MoveWest",
    "MoveEast",
  ];

  const createHandler = (command) => {
    return () => sendMessage(JSON.stringify({ command }));
  };

  const handleClickLook = useCallback(
    () => sendMessage(JSON.stringify({ command: "Look" })),
    [sendMessage]
  );

  const handleClickMoveNorth = useCallback(
    () => sendMessage(JSON.stringify({ command: "MoveNorth" })),
    [sendMessage]
  );

  const handleClickMoveSouth = useCallback(
    () => sendMessage(JSON.stringify({ command: "MoveSouth" })),
    [sendMessage]
  );

  const handleClickDropBomb = useCallback(
    () => sendMessage(JSON.stringify({ command: "DropBomb" })),
    [sendMessage]
  );

  const handleClickSetName = useCallback(
    () =>
      sendMessage(JSON.stringify({ command: ["SetName", "mrjavascripter"] })),
    [sendMessage]
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
      {commmands.map((command) => (
        <button onClick={createHandler(command)}>{command}</button>
      ))}
      <button onClick={handleClickSetName}>Set name</button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <code>Last message: {lastMessage.data}</code> : null}
      {/*  of the board */}
      {/* <ul>
        {messageHistory.map((message, idx) => (
          <code key={idx}> {message ? message.data : null}</code>
        ))}
      </ul> */}
      {/* create 10 x 10 grid component */}
      <Grid />
    </div>
  );
};

// 10 x 10 grid component
// 1. create a 10 x 10 grid
const Grid = () => {
  const [grid, setGrid] = useState([]);

  const createGrid = () => {
    const newGrid = [];
    for (let i = 0; i < 10; i++) {
      newGrid.push([]);
      for (let j = 0; j < 10; j++) {
        newGrid[i].push(0);
      }
    }
    setGrid(newGrid);
  };

  useEffect(() => {
    createGrid();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {grid.map((row, i) => (
        <div style={{ width: "16px", height: "16px" }}>
          {row.map((col, j) => (
            <div>
              <code> {col} </code>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
