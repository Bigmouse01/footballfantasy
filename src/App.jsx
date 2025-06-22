import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayerList from "./components/PlayerList";
import PlayerDetails from "./components/PlayerDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayerList />} />
        <Route path="/player/:name" element={<PlayerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;


