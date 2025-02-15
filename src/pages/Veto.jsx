import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const maps = ['Abyss', 'Bind', 'Fracture', 'Haven', 'Lotus', 'Pearl', 'Split'];
const mapImages = {
  Abyss: '/images/abyss.jpg',
  Bind: '/images/bind.jpg',
  Fracture: '/images/fracture.jpg',
  Haven: '/images/haven.jpg',
  Lotus: '/images/lotus.jpg',
  Pearl: '/images/pearl.jpg',
  Split: '/images/split.jpg',
};

export default function Veto() {
  const { state } = useLocation();
  const { teamA, teamB } = state || {};
  const navigate = useNavigate();

  const [bannedMaps, setBannedMaps] = useState([]);
  const [pickedMaps, setPickedMaps] = useState([]);
  const [phase, setPhase] = useState('ban');
  const [turn, setTurn] = useState(teamA);
  const [awaitingSide, setAwaitingSide] = useState(false);
  const [currentPick, setCurrentPick] = useState(null);

  const pickOrder = [teamA, teamB, teamA, teamB, teamA];

  const handleBan = (map) => {
    const newBannedMaps = [...bannedMaps, map];
    setBannedMaps(newBannedMaps);
    if (newBannedMaps.length === 2) {
      setPhase('pick');
      setTurn(pickOrder[0]);
    }
  };

  const handlePick = (map) => {
    setCurrentPick({ map, team: turn });
    setAwaitingSide(true);
    setTurn(turn === teamA ? teamB : teamA);
  };

  const handleSideSelection = (side) => {
    const newPickedMaps = [...pickedMaps, { ...currentPick, side }];
    setPickedMaps(newPickedMaps);
    setAwaitingSide(false);
    setCurrentPick(null);
    if (newPickedMaps.length < 5) {
      setTurn(pickOrder[newPickedMaps.length]);
    } else {
      navigate('/results', { state: { teamA, teamB, pickedMaps: newPickedMaps } });
    }
  };

  const availableMaps = maps.filter((map) => !bannedMaps.includes(map) && !pickedMaps.some((pick) => pick.map === map));

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">{phase === 'ban' ? 'Ban Phase (Team A)' : 'Pick Phase'}</h2>
      <p className="mb-6 text-lg">Current Turn: <span className="font-semibold">{turn}</span></p>

      {awaitingSide ? (
        <div className="flex flex-col items-center">
          <p className="mb-4 text-xl">Choose side for {currentPick.map}</p>
          <img src={mapImages[currentPick.map]} alt={currentPick.map} className="w-48 h-48 mb-4 object-cover rounded-lg" />
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-green-500 rounded hover:bg-green-700" onClick={() => handleSideSelection('Attack')}>Attack</button>
            <button className="px-4 py-2 bg-red-500 rounded hover:bg-red-700" onClick={() => handleSideSelection('Defense')}>Defense</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {availableMaps.map((map) => (
            <div key={map} className="flex flex-col items-center bg-white rounded-lg p-2 hover:shadow-lg transition">
              <img src={mapImages[map]} alt={map} className="w-28 h-28 object-cover rounded-lg mb-2" />
              <button onClick={() => (phase === 'ban' ? handleBan(map) : handlePick(map))} className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-800 transition w-full text-sm">{map}</button>
            </div>
          ))}
        </div>
      )}

      {pickedMaps.length === 5 && (
        <button onClick={() => navigate('/results', { state: { teamA, teamB, pickedMaps } })} className="mt-6 px-6 py-2 bg-green-600 rounded hover:bg-green-800 transition">View Results</button>
      )}
    </div>
  );
}
