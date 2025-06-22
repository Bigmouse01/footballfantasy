import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    fetch('https://fantasybackend-psi.vercel.app/players')
      .then(res => res.json())
      .then(data => setPlayers(data));
  }, []);

  const filtered = players.filter(p => p.Name.toLowerCase().includes(search.toLowerCase()));
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
      <ul className="divide-y">
        {paginated.map(player => (
          <li key={player.Name} className="py-2">
            <Link to={`/player/${encodeURIComponent(player.Name)}`} className="text-blue-600 hover:underline">
              {player.Name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="btn">Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="btn">Next</button>
      </div>
    </div>
  );
}