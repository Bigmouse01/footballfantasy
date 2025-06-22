// === frontend/src/index.js ===
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);


// === frontend/src/App.js ===
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayerList from "./PlayerList";
import PlayerDetail from "./PlayerDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayerList />} />
        <Route path="/player/:name" element={<PlayerDetail />} />
      </Routes>
    </Router>
  );
}

export default App;