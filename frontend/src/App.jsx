import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';
import Navbar from './Components/Navbar';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import Dashboard from './Components/Dashboard';
import PrivateRoute from './Components/PrivateRoute';
import Home from './Components/Home';
import Game from './Components/Game/Game';
import StartGame from './Components/Game/StartGame'; // Nouveau composant à créer

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/start-game" element={<StartGame />} />
              <Route path="/game" element={<Game />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;