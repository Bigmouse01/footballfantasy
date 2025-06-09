import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const fetchOdds = async () => {
    if (!name.trim()) {
      setError("Please enter a player name");
      setStats(null);
      return;
    }

    try {
      const res = await fetch(`https://fantasybackend-psi.vercel.app/api/player-odds?name=${encodeURIComponent(name)}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setStats(null);
      } else {
        setStats(data);
        setError("");
      }
    } catch (err) {
      setError("Something went wrong");
      setStats(null);
    }
  };

  const fantasyRatingPercent = stats ? Math.min((stats.fantasyPoints / 100) * 100, 100) : 0;

  return (
    <div className="app-container">
      <h1 className="title">⚽ Player Fantasy Points Predictor</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter player name"
        className="input"
      />
      <button onClick={fetchOdds} className="button">
        Get Fantasy Points
      </button>

      {error && <p className="error">{error}</p>}

      {stats && !error && (
        <div className="card">
          <div className="player-header">
            <img src={stats.photo} alt={stats.name} className="player-photo" />
            <div>
              <p><strong>👤 Name:</strong> {stats.name}</p>
              <p><strong>🏟️ Team:</strong> {stats.team}</p>
              <p><strong>📍 Position:</strong> {stats.position}</p>
            </div>
          </div>

          <p><strong>📊 Goals per Game:</strong> {stats.odds}</p>
          <p><strong>⭐ Fantasy Points:</strong> {stats.fantasyPoints}</p>

          <div className="meter-container">
            <label>Fantasy Investment Meter:</label>
            <div className="meter-bar-background">
              <div
                className="meter-bar-fill"
                style={{ width: `${fantasyRatingPercent}%` }}
              />
            </div>
            <p className="meter-text">
              {fantasyRatingPercent >= 80
                ? "Excellent investment"
                : fantasyRatingPercent >= 50
                ? "Good investment"
                : "Consider other options"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

