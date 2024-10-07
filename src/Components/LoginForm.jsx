import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous devriez implémenter la vérification réelle des identifiants
    if (email && password) {
      login();
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Connexion</h2>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="card-actions justify-end">
            <button className="btn btn-primary" type="submit">Se connecter</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;