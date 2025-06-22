import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PlayerDetails() {
  const { name } = useParams();
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    fetch(`https://fantasybackend-psi.vercel.app/player?name=${encodeURIComponent(name)}`)
      .then(res => {
        if (!res.ok) throw new Error('Player not found');
        return res.json();
      })
      .then(data => setPlayer(data))
      .catch(err => setError(err.message));
  }, [name]);

  useEffect(() => {
    if (!name) return;
    fetch(`https://fantasybackend-psi.vercel.app/player-photo?name=${encodeURIComponent(name)}`)
      .then(res => res.json())
      .then(data => setPhoto(data.photo || ''))
      .catch(err => console.error('Image fetch error:', err));
  }, [name]);

  const getInvestmentVerdict = (points) => {
    if (points >= 150) return { label: '🔥 Must Have', color: 'text-green-400', bar: 'fantasy-excellent' };
    if (points >= 100) return { label: '✅ Good Pick', color: 'text-blue-400', bar: 'fantasy-good' };
    if (points >= 60) return { label: '🤔 Average', color: 'text-yellow-400', bar: 'fantasy-mid' };
    return { label: '❌ Avoid', color: 'text-red-400', bar: 'fantasy-low' };
  };

  if (error) return <div className="p-4 text-red-500 text-center">Error: {error}</div>;
  if (!player) return <div className="p-4 text-white text-center">Loading...</div>;

  const verdict = getInvestmentVerdict(player.fantasyPoints);
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.Player)}&background=0D8ABC&color=fff&size=110`;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-[#1e1e1e] rounded-xl shadow-lg text-center text-white">
      <Link to="/" className="text-blue-400 hover:underline mb-4 inline-block">&larr; Back</Link>
      <div className="flex flex-col items-center mt-4">
        <img
          src={photo || fallback}
          onError={(e) => { e.target.onerror = null; e.target.src = fallback; }}
          alt={player.Player}
          className="w-32 h-40 object-cover rounded-lg border mb-4"
        />
        <h2 className="text-3xl font-bold mb-1">{player.Player}</h2>
        <p className="text-gray-400 mb-2"><strong>Team:</strong> {player.Team || 'N/A'}</p>
        <div className="grid grid-cols-2 gap-4 mt-4 text-lg">
          <p><strong>Goals:</strong> {player.Gls}</p>
          <p><strong>Assists:</strong> {player.Ast}</p>
          <p><strong>Yellow Cards:</strong> {player.CrdY}</p>
          <p><strong>Red Cards:</strong> {player.CrdR}</p>
        </div>
        <div className="mt-6 w-full">
          <p className="text-xl"><strong>Fantasy Points:</strong> <span className="font-bold">{player.fantasyPoints}</span></p>
          <div className="fantasy-meter">
            <div
              className={`fantasy-meter-bar ${verdict.bar}`}
              style={{ width: `${Math.min(player.fantasyPoints / 2, 100)}%` }}
            ></div>
          </div>
          <p className={`mt-2 font-bold ${verdict.color}`}>{verdict.label}</p>
        </div>
      </div>
    </div>
  );
}
