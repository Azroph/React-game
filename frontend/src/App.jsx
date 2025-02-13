import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';
import Navbar from './Components/Navbar';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import PrivateRoute from './Components/PrivateRoute';
import Home from './Components/Home';
import Game from './Components/Game/Game';
import LobbyPage from './Components/Game/Lobby';

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
              <Route path="/game" element={<LobbyPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;