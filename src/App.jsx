import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';
import Navbar from './Components/Navbar';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<h1 className="text-2xl font-bold text-center mt-10">Bienvenue sur MonApp</h1>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;