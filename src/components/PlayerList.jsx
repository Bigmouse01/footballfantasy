import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://fantasybackend-psi.vercel.app/api/players?page=${page}`);
        const data = await res.json();
        setPlayers(data.players);
        setFiltered(data.players);
      } catch (err) {
        console.error("Player list fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, [page]);

  useEffect(() => {
    const filteredList = players.filter((player) =>
      player.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredList);
  }, [search, players]);

  return (
    <div className="app-container">
      <h1 className="title">Premier League Fantasy Players</h1>

      <input
        type="text"
        placeholder="Search player..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading players...</p>
      ) : (
        <table className="player-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Club</th>
              <th>Position</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((player, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/player/${encodeURIComponent(player.name)}`}>
                    {player.name}
                  </Link>
                </td>
                <td>{player.club}</td>
                <td>{player.position}</td>
                <td>{player.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default PlayerList;
