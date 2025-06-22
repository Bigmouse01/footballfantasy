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
      <h1 className="text-4xl font-bold mb-6 text-white">Premier League Fantasy Tracker</h1>

      <input
        type="text"
        placeholder="Search players..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="p-3 w-full max-w-xl mx-auto mb-6 text-lg bg-gray-800 text-white border border-gray-600 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading ? (
        <p className="text-white mt-6">Loading players...</p>
      ) : (
        <>
          <ul className="rounded-xl overflow-hidden shadow-xl divide-y divide-gray-700 bg-[#1e1e1e] max-w-xl mx-auto">
            {paginated.map(player => (
              <li key={player.Player} className="py-4 px-6 hover:bg-gray-700 transition-all">
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
              className="bg-gradient-to-r from-gray-600 to-gray-800 px-5 py-2 rounded-lg text-white font-semibold shadow hover:scale-105 transition disabled:opacity-50"
            >
              ⬅ Previous
            </button>
            <span className="text-white text-lg">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="bg-gradient-to-r from-blue-600 to-blue-800 px-5 py-2 rounded-lg text-white font-semibold shadow hover:scale-105 transition disabled:opacity-50"
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
}
