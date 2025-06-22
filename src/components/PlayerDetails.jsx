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
      .then(data => {
        if (data.photo) {
          setPhoto(data.photo);
        }
      })
      .catch(err => console.error('Image fetch error:', err));
  }, [name]);

  const getInvestmentVerdict = (points) => {
    if (points >= 150) return { label: '🔥 Must Have', color: 'text-green-400', bar: 'fantasy-excellent', bg: 'bg-green-900' };
    if (points >= 100) return { label: '✅ Good Pick', color: 'text-cyan-400', bar: 'fantasy-good', bg: 'bg-cyan-900' };
    if (points >= 60) return { label: '🤔 Average', color: 'text-yellow-400', bar: 'fantasy-mid', bg: 'bg-yellow-900' };
    return { label: '❌ Avoid', color: 'text-red-500', bar: 'fantasy-low', bg: 'bg-red-900' };
  };

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!player) return <div className="p-4 text-white">Loading...</div>;

  const verdict = getInvestmentVerdict(player.fantasyPoints);
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.Player)}&background=0D8ABC&color=fff&size=110`;

  return (
    <div className={`p-6 max-w-3xl mx-auto shadow-lg rounded-xl text-white transition-colors duration-500 ${verdict.bg}`}>
      <Link to="/" className="text-blue-400 hover:underline">&larr; Back</Link>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-6">
        <img
          src={photo || fallback}
          onError={(e) => { e.target.onerror = null; e.target.src = fallback; }}
          alt={player.Player}
          className="w-32 h-40 object-cover rounded-lg border border-gray-600"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2">{player.Player}</h2>
          <p className="text-gray-400"><strong>Team:</strong> {player.Team || 'N/A'}</p>
          <p><strong>Goals:</strong> {player.Gls}</p>
          <p><strong>Assists:</strong> {player.Ast}</p>
          <p><strong>Yellow Cards:</strong> {player.CrdY}</p>
          <p><strong>Red Cards:</strong> {player.CrdR}</p>
        </div>
      </div>
      <div className="mt-6 text-xl group">
        <p><strong>Fantasy Points:</strong> <span className="font-semibold">{player.fantasyPoints}</span></p>
        <div className="fantasy-meter overflow-hidden relative">
          <div
            className={`fantasy-meter-bar ${verdict.bar}`}
            style={{
              width: `${Math.min(player.fantasyPoints / 2, 100)}%`,
              transition: 'width 1s ease-out'
            }}
          ></div>
        </div>
        <p className={`mt-2 font-bold ${verdict.color} group-hover:scale-105 transition-transform duration-300`}>{verdict.label}</p>
      </div>
    </div>
  );
}
