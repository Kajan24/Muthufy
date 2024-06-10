import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Player from './Pages/Player/player'
import Album from './Pages/Player/album'
import { useState, useEffect } from 'react'

function App() {
  const [isFetch, setIsFetch] = useState(true);

  useEffect(() => {
    // Simulate a fetch call with a timeout
    setTimeout(() => {
      setIsFetch(false); // Set to false after fetching data
    }, 2000); // 2 seconds delay to simulate fetch
  }, []);

  if (isFetch) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-b from-slate-50 to-slate-200">
        <div className="flex items-start justify-start p-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
            En cours de connexion
          </h2>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/album/:id" element={<Album />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
