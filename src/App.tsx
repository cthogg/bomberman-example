import { useCallback, useEffect } from "react";
import "./App.css";
import { WebSocketDemo } from "./Com";

// 172.16.173.86:8080

function App() {
  const handleKeyPress = useCallback((event: any) => {
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
  return (
    <div className="App">
      <WebSocketDemo />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
