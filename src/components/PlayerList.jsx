
// === frontend/src/PlayerList.js ===
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    fetch(`https://fantasybackend-psi.vercel.app/api/players?page=${page}&search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.players);
        setTotalPages(data.totalPages);
      });
  }, [page, search]);

  return (
    <div className="app-container">
      <h1 className="title">⚽ Premier League Players 2023</h1>
      <input
        type="text"
        placeholder="Search player..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="player-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Club</th>
            <th>Position</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, i) => (
            <tr key={i}>
              <td>{(page - 1) * 10 + i + 1}</td>
              <td><Link to={`/player/${encodeURIComponent(p.name)}`}>{p.name}</Link></td>
              <td>{p.club}</td>
              <td>{p.position}</td>
              <td>{p.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default PlayerList;