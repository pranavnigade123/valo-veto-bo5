import { useLocation, useNavigate } from 'react-router-dom';

const mapImages = {
  Abyss: '/images/abyss.jpg',
  Bind: '/images/bind.jpg',
  Fracture: '/images/fracture.jpg',
  Haven: '/images/haven.jpg',
  Lotus: '/images/lotus.jpg',
  Pearl: '/images/pearl.jpg',
  Split: '/images/split.jpg',
};

export default function Results() {
  const { state } = useLocation();
  const { teamA, teamB, pickedMaps } = state || {};
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  text-black flex flex-col items-center p-6">
      <h1 className="text-3xl text-white font-bold mb-6">Final Veto Results</h1>

      <div className="w-full max-w-2xl grid grid-cols-2 gap-4">
        {pickedMaps.map((pick, index) => (
          <div key={index} className="flex items-center bg-white rounded-lg p-3 shadow-md">
            <img src={mapImages[pick.map]} alt={pick.map} className="w-20 h-20 object-cover rounded mr-4" />
            <div>
              <span className="text-lg font-semibold">{pick.map}</span>
              <p className="text-sm text-black">Picked by {pick.team}</p>
              <p className="text-sm text-black">
                {pick.side === 'Attack' ? `${pick.team} will Attack` : `${pick.team === teamA ? teamB : teamA} will Attack`}
              </p>
              <p className="text-sm text-black">
                {pick.side === 'Defense' ? `${pick.team} will Defend` : `${pick.team === teamA ? teamB : teamA} will Defend`}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-800 rounded transition"
      >
        Start New Veto
      </button>
    </div>
  );
}
