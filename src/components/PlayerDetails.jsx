import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFplImages } from '../hooks/useFplImages';

export default function PlayerDetails() {
  const { name } = useParams();
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);
  const imageMap = useFplImages();

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
    if (points >= 150) return { label: '🔥 Must Have', color: 'text-green-600', bar: 'fantasy-excellent' };
    if (points >= 100) return { label: '✅ Good Pick', color: 'text-blue-500', bar: 'fantasy-good' };
    if (points >= 60) return { label: '🤔 Average', color: 'text-yellow-500', bar: 'fantasy-mid' };
    return { label: '❌ Avoid', color: 'text-red-500', bar: 'fantasy-low' };
  };

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!player) return <div className="p-4">Loading...</div>;

  const verdict = getInvestmentVerdict(player.fantasyPoints);
  const photo = imageMap[player.Player?.toLowerCase()] || `https://ui-avatars.com/api/?name=${encodeURIComponent(player.Player)}&background=0D8ABC&color=fff&size=110`;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white bg-opacity-5 shadow-md rounded">
      <Link to="/" className="text-blue-500 hover:underline">&larr; Back</Link>
      <div className="flex items-center space-x-6 mt-6">
        <img
          src={photo}
          alt={player.Player}
          className="w-28 h-36 object-cover rounded border"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">{player.Player}</h2>
          <p className="text-gray-400"><strong>Team:</strong> {player.Team || 'N/A'}</p>
          <p><strong>Goals:</strong> {player.Gls}</p>
          <p><strong>Assists:</strong> {player.Ast}</p>
          <p><strong>Yellow Cards:</strong> {player.CrdY}</p>
          <p><strong>Red Cards:</strong> {player.CrdR}</p>
        </div>
      </div>
      <div className="mt-6 text-xl">
        <p><strong>Fantasy Points:</strong> <span className="font-semibold">{player.fantasyPoints}</span></p>
        <div className="fantasy-meter">
          <div
            className={`fantasy-meter-bar ${verdict.bar}`}
            style={{ width: `${Math.min(player.fantasyPoints / 2, 100)}%` }}
          ></div>
        </div>
        <p className={`mt-2 font-bold ${verdict.color}`}>{verdict.label}</p>
      </div>
    </div>
  );
}
