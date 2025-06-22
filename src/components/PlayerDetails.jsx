import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PlayerDetails() {
  const { name } = useParams();
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fantasybackend-psi.vercel.app/player?name=${encodeURIComponent(name)}`)
      .then(res => {
        if (!res.ok) throw new Error('Player not found');
        return res.json();
      })
      .then(data => setPlayer(data))
      .catch(err => setError(err.message));
  }, [name]);

  const getInvestmentVerdict = (points) => {
    if (points >= 150) return { label: '🔥 Must Have', color: 'text-green-400', bar: 'fantasy-excellent', bg: 'bg-green-900' };
    if (points >= 100) return { label: '✅ Good Pick', color: 'text-cyan-400', bar: 'fantasy-good', bg: 'bg-cyan-900' };
    if (points >= 60) return { label: '🤔 Average', color: 'text-yellow-400', bar: 'fantasy-mid', bg: 'bg-yellow-900' };
    return { label: '❌ Avoid', color: 'text-red-500', bar: 'fantasy-low', bg: 'bg-red-900' };
  };

  if (error) return <div className="p-4 text-red-500 text-center">Error: {error}</div>;
  if (!player) return <div className="p-4 text-white text-center">Loading...</div>;

  const verdict = getInvestmentVerdict(player.fantasyPoints);
  const wikiLink = `https://en.wikipedia.org/wiki/${encodeURIComponent(player.Player.replaceAll(' ', '_'))}`;

  return (
    <div className={`p-6 max-w-3xl mx-auto shadow-xl rounded-xl text-white transition-colors duration-500 ${verdict.bg}`}>
      <div className="w-full flex justify-center mb-6">
        <Link
          to="/"
          className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow hover:scale-105 transition-all"
        >
          ⬅ Back to Player List
        </Link>
      </div>

      <div className="text-center space-y-4 animate-fadeIn">
        <h2 className="text-5xl font-extrabold tracking-tight text-white">{player.Player}</h2>
        <a
          href={wikiLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base text-blue-300 hover:underline"
        >
          📖 View on Wikipedia
        </a>

        <div className="mt-8 space-y-3 text-lg">
          <p><span className="text-gray-300 font-semibold">🏷️ Team:</span> {player.Team || 'N/A'}</p>
          <p><span className="text-gray-300 font-semibold">⚽ Goals:</span> {player.Gls}</p>
          <p><span className="text-gray-300 font-semibold">🎯 Assists:</span> {player.Ast}</p>
          <p><span className="text-gray-300 font-semibold">🟨 Yellow Cards:</span> {player.CrdY}</p>
          <p><span className="text-gray-300 font-semibold">🟥 Red Cards:</span> {player.CrdR}</p>
        </div>
        <div className="mt-6 px-4 py-3 bg-black/30 rounded-lg shadow-inner border border-gray-700 text-left text-sm sm:text-base">
  <h3 className="font-semibold text-white text-lg mb-2">📊 Player Insight</h3>
  <p className="text-gray-300">
    {player.Player} has had a {player.fantasyPoints > 100 ? 'strong' : player.fantasyPoints > 60 ? 'moderate' : 'challenging'} season in the Premier League, contributing with {player.Gls} goal{player.Gls !== 1 ? 's' : ''} and {player.Ast} assist{player.Ast !== 1 ? 's' : ''}.
    {player.CrdY > 0 || player.CrdR > 0 ? ` However, the player has also received ${player.CrdY} yellow and ${player.CrdR} red card${(player.CrdY + player.CrdR) > 1 ? 's' : ''}, which may affect consistency.` : ` Impressively, ${player.Player} maintained discipline throughout the season with no cards.`}
    Overall, {player.Player.split(' ')[0]} could be {verdict.label === '❌ Avoid' ? 'a risky pick' : verdict.label === '🤔 Average' ? 'a decent rotation option' : 'a valuable fantasy asset'}.
  </p>
</div>

        <div className="mt-10">
          <p className="text-xl font-medium">Fantasy Points: <span className="font-semibold">{player.fantasyPoints}</span></p>
          <div className="fantasy-meter overflow-hidden relative mt-2">
            <div
              className={`fantasy-meter-bar ${verdict.bar}`}
              style={{
                width: `${Math.min(player.fantasyPoints / 2, 100)}%`,
                transition: 'width 1s ease-out'
              }}
            ></div>
          </div>
          <p className={`mt-2 font-bold ${verdict.color} transition-transform duration-300`}>{verdict.label}</p>
        </div>
      </div>
    </div>
  );
}
