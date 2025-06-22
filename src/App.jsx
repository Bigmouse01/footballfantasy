import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerList from './components/PlayerList';
import PlayerDetails from './components/PlayerDetails';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayerList />} />
        <Route path="/player/:name" element={<PlayerDetails />} />
      </Routes>
    </Router>
  );
}
