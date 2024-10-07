import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous devriez implémenter l'enregistrement réel de l'utilisateur
    if (email && password && password === confirmPassword) {
      console.log('Utilisateur enregistré');
      navigate('/login');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Inscription</h2>
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
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            className="input input-bordered w-full max-w-xs"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="card-actions justify-end">
            <button className="btn btn-primary" type="submit">S'inscrire</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;