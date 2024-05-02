import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Reset from './Pages/Home/Reset'
import Dashboard from './Pages/Dashboard/Dashboard'
import Profile from './Pages/Dashboard/Profile'
import { useState, useEffect } from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import { auth } from './db/firebase'
import { onAuthStateChanged } from 'firebase/auth'

function App() {

  const [user, setUser] = useState(null);
  const [isFetch, setIsFetch] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setIsFetch(false)
        return;
      }
      setUser(null)
      setIsFetch(false)
    });
    return () => unsubscribe();
  }, [])

  if (isFetch) {
    return <h2>En cours de connexion</h2>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/reset" element={<Reset user={user} />} />
        <Route path="/dashboard" element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute user={user}><Profile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
