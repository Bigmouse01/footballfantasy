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

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!player) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link to="/" className="text-blue-500 hover:underline">&larr; Back</Link>
      <h2 className="text-2xl font-bold mt-4 mb-2">{player.Player}</h2>
      <p><strong>Goals:</strong> {player.Gls}</p>
      <p><strong>Assists:</strong> {player.Ast}</p>
      <p><strong>Yellow Cards:</strong> {player.CrdY}</p>
      <p><strong>Red Cards:</strong> {player.CrdR}</p>
      <p className="text-xl mt-4 font-semibold">Fantasy Points: {player.fantasyPoints}</p>
    </div>
  );
}
