// === frontend/src/PlayerDetail.js ===
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function PlayerDetail() {
  const { name } = useParams();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://fantasybackend-psi.vercel.app/api/player-odds?name=${encodeURIComponent(name)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setStats(data);
      });
  }, [name]);

  const fantasyPercent = stats ? Math.min((stats.fantasyPoints / 100) * 100, 100) : 0;

  return (
    <div className="app-container">
      <Link to="/" className="back-btn">← Back</Link>
      {error && <p className="error">{error}</p>}
      {stats && (
        <div className="card">
          <div className="player-header">
            <img src={stats.photo} alt={stats.name} className="player-photo" />
            <div>
              <p><strong>👤 Name:</strong> {stats.name}</p>
              <p><strong>🏟️ Club:</strong> {stats.team}</p>
              <p><strong>📍 Position:</strong> {stats.position}</p>
              <p><strong>🌍 Country:</strong> {stats.country}</p>
              <p><strong>🔢 Number:</strong> {stats.number}</p>
            </div>
          </div>
          <p><strong>⚽ Goals:</strong> {stats.goals}</p>
          <p><strong>🎯 Assists:</strong> {stats.assists}</p>
          <p><strong>⭐ Fantasy Points:</strong> {stats.fantasyPoints}</p>

          <div className="meter-container">
            <label>Fantasy Investment Meter</label>
            <div className="meter-bar-bg">
              <div className="meter-bar-fill" style={{ width: `${fantasyPercent}%` }} />
            </div>
            <p className="meter-text">
              {fantasyPercent >= 80
                ? "Top pick"
                : fantasyPercent >= 50
                ? "Good option"
                : "Consider others"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerDetail;
