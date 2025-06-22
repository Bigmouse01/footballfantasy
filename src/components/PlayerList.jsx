import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 20;

  const teamBadges = {
    Arsenal: 'https://a.espncdn.com/i/teamlogos/soccer/500/359.png',
    'Aston Villa': 'https://a.espncdn.com/i/teamlogos/soccer/500/362.png',
    Bournemouth: 'https://a.espncdn.com/i/teamlogos/soccer/500/349.png',
    Brentford: 'https://a.espncdn.com/i/teamlogos/soccer/500/11420.png',
    Brighton: 'https://a.espncdn.com/i/teamlogos/soccer/500/331.png',
    Burnley: 'https://a.espncdn.com/i/teamlogos/soccer/500/379.png',
    Chelsea: 'https://a.espncdn.com/i/teamlogos/soccer/500/363.png',
    'Crystal Palace': 'https://a.espncdn.com/i/teamlogos/soccer/500/384.png',
    Everton: 'https://a.espncdn.com/i/teamlogos/soccer/500/368.png',
    Fulham: 'https://a.espncdn.com/i/teamlogos/soccer/500/370.png',
    Liverpool: 'https://a.espncdn.com/i/teamlogos/soccer/500/364.png',
    'Luton Town': 'https://a.espncdn.com/i/teamlogos/soccer/500/301.png',
    'Manchester City': 'https://a.espncdn.com/i/teamlogos/soccer/500/382.png',
    'Manchester United': 'https://a.espncdn.com/i/teamlogos/soccer/500/360.png',
    Newcastle: 'https://a.espncdn.com/i/teamlogos/soccer/500/361.png',
    'Nottingham Forest': 'https://a.espncdn.com/i/teamlogos/soccer/500/393.png',
    Sheffield: 'https://a.espncdn.com/i/teamlogos/soccer/500/351.png',
    Tottenham: 'https://a.espncdn.com/i/teamlogos/soccer/500/367.png',
    'West Ham': 'https://a.espncdn.com/i/teamlogos/soccer/500/371.png',
    Wolverhampton: 'https://a.espncdn.com/i/teamlogos/soccer/500/380.png'
  };

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
    <div className="min-h-screen bg-white text-[#37003c] font-sans">
      <div className="text-center py-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg"
          alt="Premier League Logo"
          className="w-24 mx-auto mb-4"
        />
        <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-lg">
          Premier League Fantasy Tracker
        </h1>
        <p className="text-[#5e275f] mt-2 text-lg font-medium">
          Track and search your favorite players
        </p>
      </div>

      <div className="max-w-xl mx-auto px-4">
        <input
          type="text"
          placeholder="Search players..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="p-3 w-full mb-6 text-lg bg-white text-[#37003c] border border-[#5e275f] rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#d0108a]"
        />

        {loading ? (
          <p className="text-center text-[#37003c] mt-6">Loading players...</p>
        ) : (
          <>
            <ul className="rounded-xl overflow-hidden shadow-2xl divide-y divide-purple-700 bg-[#37003c] text-white">
              {paginated.map(player => {
                const badgeUrl = teamBadges[player.Team] || null;
                return (
                  <li
                    key={player.Player}
                    className="py-4 px-6 flex items-center hover:bg-[#5e275f] transition-all"
                  >
                    {badgeUrl && (
                      <img
                        src={badgeUrl}
                        alt={`${player.Team} badge`}
                        className="w-8 h-8 mr-3 rounded-full bg-white p-1"
                      />
                    )}
                    <Link
                      to={`/player/${encodeURIComponent(player.Player)}`}
                      className="text-lg font-semibold text-pink-300 hover:text-pink-100 transition-all duration-200"
                    >
                      {player.Player}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex justify-center items-center gap-6 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="bg-[#5e275f] hover:bg-[#37003c] px-5 py-2 rounded-lg text-white font-semibold shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ⬅ Previous
              </button>
              <span className="text-[#37003c] text-lg font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="bg-[#d0108a] hover:bg-[#b90e79] px-5 py-2 rounded-lg text-white font-semibold shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
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

