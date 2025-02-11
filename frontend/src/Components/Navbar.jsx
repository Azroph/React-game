import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/Shrek.png';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar bg-base-100 dark:bg-gray-800 shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl dark:text-white">
          <img src={logo} alt="Logo" className="h-full w-full object-contain" />
        </Link>
      </div>
      <div className="flex-none">
        <Link to="/game" className="btn btn-ghost btn-sm rounded-btn dark:text-gray-200">Game</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="btn btn-ghost btn-sm rounded-btn dark:text-gray-200">Dashboard</Link>
            <button onClick={handleLogout} className="btn btn-ghost btn-sm rounded-btn dark:text-gray-200">Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary btn-sm rounded-btn mr-2 dark:bg-gray-700 dark:text-white">Connexion</Link>
            <Link to="/register" className="btn btn-secondary btn-sm rounded-btn dark:bg-gray-600 dark:text-white">Inscription</Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
