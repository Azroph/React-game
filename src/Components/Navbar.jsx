import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">MonApp</Link>
      </div>
      <div className="flex-none">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="btn btn-ghost btn-sm rounded-btn">Dashboard</Link>
            <button onClick={handleLogout} className="btn btn-ghost btn-sm rounded-btn">Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary btn-sm rounded-btn mr-2">Connexion</Link>
            <Link to="/register" className="btn btn-secondary btn-sm rounded-btn">Inscription</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;