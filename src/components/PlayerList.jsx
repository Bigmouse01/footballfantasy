import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 20;

  useEffect(() => {
    setLoading(true);
    fetch('https://fantasybackend-psi.vercel.app/players')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setPlayers(data))
      .catch(err => console.error('Failed to load players:', err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = players.filter(p =>
    p.Player?.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="container text-center">
      <h1 className="text-4xl font-bold mb-6 text-white flex items-center justify-center gap-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/852/852318.png"
          alt="Football"
          className="w-10 h-10"
        />
        Premier League Fantasy Tracker
      </h1>

      <input
        type="text"
        placeholder="Search players..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="text-white mt-6">Loading players...</p>
      ) : (
        <>
          <ul className="shadow mb-4">
            {paginated.map(player => (
              <li key={player.Player}>
                <Link
                  to={`/player/${encodeURIComponent(player.Player)}`}
                  className="text-lg font-semibold text-blue-400 hover:text-cyan-300 transition-all duration-200"
                >
                  {player.Player}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="btn"
            >
              ⬅ Previous
            </button>
            <span className="text-white text-lg">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="btn"
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
}
