import Header from './pages/Header';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Veto from './pages/Veto';
import Results from './pages/Results';

export default function App() {
  return (
    <>
      <Header />
      <div className="pt-20"> {/* Adds padding so content doesn't overlap with the navbar */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/veto" element={<Veto />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </>
  );
}
