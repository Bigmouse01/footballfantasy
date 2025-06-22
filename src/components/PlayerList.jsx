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

  const tableData = [
    ['Manchester City', 38, 91],
    ['Arsenal', 38, 89],
    ['Liverpool', 38, 82],
    ['Aston Villa', 38, 72],
    ['Tottenham Hotspur', 38, 66],
    ['Chelsea', 38, 63],
    ['Newcastle United', 38, 60],
    ['Manchester United', 38, 58],
    ['West Ham United', 38, 52],
    ['Crystal Palace', 38, 49],
    ['Brighton & Hove Albion', 38, 48],
    ['Bournemouth', 38, 48],
    ['Fulham', 38, 47],
    ['Wolverhampton Wanderers', 38, 46],
    ['Everton', 38, 44],
    ['Brentford', 38, 42],
    ['Nottingham Forest', 38, 37],
    ['Luton Town', 38, 33],
    ['Burnley', 38, 24],
    ['Sheffield United', 38, 16]
  ];

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
    <div className="min-h-screen bg-[#1e1e2f] text-white font-premier p-6 relative">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg"
        alt="Premier League Watermark"
        className="absolute opacity-10 w-[70%] h-auto top-[20%] left-[15%] z-0"
      />

      <h1 className="text-4xl font-bold text-center text-purple-500 mb-8 relative z-10">
        Premier League Fantasy Tracker
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        {/* Left: Full 2023 Season Table */}
        <div className="md:col-span-2 bg-[#37003c] rounded-2xl p-4 shadow-lg overflow-auto">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">2023 Season Table</h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-purple-400 border-b border-purple-700">
                <th className="py-2">Team</th>
                <th className="py-2">P</th>
                <th className="py-2">Pts</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(([team, played, points]) => (
                <tr key={team} className="border-b border-purple-800">
                  <td className="py-1 pr-2 text-white">{team}</td>
                  <td className="py-1 pr-2 text-white">{played}</td>
                  <td className="py-1 text-white">{points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Center: Player List */}
        <div className="md:col-span-6 bg-[#2a2a40] rounded-2xl p-6 shadow-lg">
          <input
            type="text"
            placeholder="Search players..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="p-3 w-full mb-6 text-lg bg-white text-[#37003c] border border-[#5e275f] rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#d0108a]"
          />

          {loading ? (
            <p className="text-center text-white mt-6">Loading players...</p>
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
                <span className="text-white text-lg font-medium">
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

        {/* Right: YouTube Videos */}
        <div className="md:col-span-4 bg-[#2a2a40] rounded-2xl p-4 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">Highlights & Best Moments</h2>
          <div className="grid grid-cols-1 gap-4">
            <iframe className="rounded-xl" width="100%" height="200" src="https://www.youtube.com/embed/QFchGo1JLzU" title="EPL Highlight 1" allowFullScreen></iframe>
            <iframe className="rounded-xl" width="100%" height="200" src="https://www.youtube.com/embed/HeO1rTZiYrs" title="EPL Highlight 2" allowFullScreen></iframe>
            <iframe className="rounded-xl" width="100%" height="200" src="https://www.youtube.com/embed/0pv3rtRqR0k" title="EPL Highlight 3" allowFullScreen></iframe>
            <iframe className="rounded-xl" width="100%" height="200" src="https://www.youtube.com/embed/uxOuOqByfNw" title="EPL Highlight 4" allowFullScreen></iframe>
            <iframe className="rounded-xl" width="100%" height="200" src="https://www.youtube.com/embed/QzP71At9oJ8" title="EPL Highlight 5" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

