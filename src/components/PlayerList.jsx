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
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-950 text-white font-sans">
      <div className="text-center py-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg"
          alt="Premier League Logo"
          className="w-24 mx-auto mb-4"
        />
        <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
          Premier League Fantasy Tracker
        </h1>
        <p className="text-purple-300 mt-2 text-lg font-medium">Track and search your favorite players</p>
      </div>

      <div className="max-w-xl mx-auto px-4">
        <input
          type="text"
          placeholder="Search players..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="p-3 w-full mb-6 text-lg bg-purple-950 text-white border border-purple-700 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        {loading ? (
          <p className="text-center text-white mt-6">Loading players...</p>
        ) : (
          <>
            <ul className="rounded-xl overflow-hidden shadow-2xl divide-y divide-purple-700 bg-purple-900">
              {paginated.map(player => (
                <li key={player.Player} className="py-4 px-6 hover:bg-purple-800 transition-all">
                  <Link
                    to={`/player/${encodeURIComponent(player.Player)}`}
                    className="text-lg font-semibold text-pink-400 hover:text-pink-200 transition-all duration-200"
                  >
                    {player.Player}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex justify-center items-center gap-6 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="bg-purple-700 hover:bg-purple-600 px-5 py-2 rounded-lg text-white font-semibold shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ⬅ Previous
              </button>
              <span className="text-white text-lg font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="bg-pink-600 hover:bg-pink-500 px-5 py-2 rounded-lg text-white font-semibold shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next ➡
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

