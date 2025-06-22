import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://fantasybackend-psi.vercel.app/api/players")
      .then(res => res.json())
      .then(data => setPlayers(data))
      .catch(() => setError("Failed to load players"));
  }, []);

  return (
    <div className="app-container">
      <h1 className="title">⚽ Premier League Players 2023</h1>
      {error && <p className="error">{error}</p>}
      <table className="player-table">
        <thead>
          <tr>
            <th>#</th><th>Name</th><th>Club</th><th>Position</th><th>Country</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td><Link to={`/player/${encodeURIComponent(p.name)}`}>{p.name}</Link></td>
              <td>{p.club}</td>
              <td>{p.position}</td>
              <td>{p.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerList;
