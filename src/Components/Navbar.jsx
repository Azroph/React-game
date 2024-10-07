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
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">MonApp</Link>
      </div>
      <div className="flex-none">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>
            <button onClick={handleLogout} className="btn btn-ghost">Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">Connexion</Link>
            <Link to="/register" className="btn btn-ghost">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;