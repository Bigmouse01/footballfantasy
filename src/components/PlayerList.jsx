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

  const filtered = players.filter(p => p.Player?.toLowerCase().includes(search.toLowerCase()));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Premier League Players</h1>
      <input
        type="text"
        placeholder="Search players..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="p-2 border w-full rounded mb-4"
      />
      {loading ? (
        <p>Loading players...</p>
      ) : (
        <>
          <ul className="divide-y">
            {paginated.map(player => (
              <li key={player.Player} className="py-2">
                <Link to={`/player/${encodeURIComponent(player.Player)}`} className="text-blue-600 hover:underline">
                  {player.Player}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="btn">Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="btn">Next</button>
          </div>
        </>
      )}
    </div>
  );
}
