import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const teams = ['Sentinels', 'Fnatic', 'Paper Rex', 'LOUD', 'Optic Gaming', 'Team Liquid', 'DRX'];

export default function Landing() {
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const navigate = useNavigate();

  // Filter available teams for Team B based on Team A's selection
  const availableTeams = teams.filter((team) => team !== teamA);

  const handleStart = () => {
    if (teamA && teamB) {
      navigate('/veto', { state: { teamA, teamB } });
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Valorant Map Veto</h1>

      <div className="mb-4 w-full max-w-md">
        <label className="block mb-2 text-lg font-semibold">Select Team A:</label>
        <select
          value={teamA}
          onChange={(e) => setTeamA(e.target.value)}
          className="w-full p-3 rounded bg-white text-black border border-gray-700 focus:outline-none focus:border-blue-500"
        >
          <option value="">-- Select Team A --</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 w-full max-w-md">
        <label className="block mb-2 text-lg font-semibold">Select Team B:</label>
        <select
          value={teamB}
          onChange={(e) => setTeamB(e.target.value)}
          className="w-full p-3 rounded bg-white text-black border border-gray-700 focus:outline-none focus:border-blue-500"
        >
          <option value="">-- Select Team B --</option>
          {availableTeams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleStart}
        disabled={!teamA || !teamB}
        className={`px-6 py-3 rounded text-lg font-medium ${
          !teamA || !teamB ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-800'
        }`}
      >
        Start Veto
      </button>
    </div>
  );
}
