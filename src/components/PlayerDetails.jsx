import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PlayerDetails() {
  const { name } = useParams();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://fantasybackend-psi.vercel.app/api/player-odds?name=${encodeURIComponent(name)}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setStats(data);
      });
  }, [name]);

  const fantasyRatingPercent = stats ? Math.min((stats.fantasyPoints / 100) * 100, 100) : 0;

  return (
    <div className="app-container">
      <h2 className="title">📊 Player Stats</h2>
      {error && <p className="error">{error}</p>}
      {stats && (
        <div className="card">
          <div className="player-header">
            <img src={stats.photo} alt={stats.name} className="player-photo" />
            <div>
              <p><strong>Name:</strong> {stats.name}</p>
              <p><strong>Team:</strong> {stats.team}</p>
              <p><strong>Position:</strong> {stats.position}</p>
              <p><strong>Country:</strong> {stats.country}</p>
              <p><strong>Number:</strong> {stats.number}</p>
            </div>
          </div>
          <p><strong>Goals/Game:</strong> {stats.odds}</p>
          <p><strong>Goals:</strong> {stats.goals}</p>
          <p><strong>Assists:</strong> {stats.assists}</p>
          <p><strong>Fantasy Points:</strong> {stats.fantasyPoints}</p>
          <div className="meter-container">
            <label>Fantasy Investment Meter</label>
            <div className="meter-bar-background">
              <div className="meter-bar-fill" style={{ width: `${fantasyRatingPercent}%` }} />
            </div>
            <p className="meter-text">
              {fantasyRatingPercent >= 80 ? "Excellent investment" :
               fantasyRatingPercent >= 50 ? "Good investment" : "Consider other options"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerDetails;