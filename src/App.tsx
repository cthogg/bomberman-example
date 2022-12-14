import './App.css';
import { WebSocketDemo } from './Com';
import logo from './logo.svg';


// 172.16.173.86:8080

function App() {
  return (
    <div className="App">
      <WebSocketDemo/>
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
