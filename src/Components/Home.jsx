import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Bienvenue sur MonApp</h1>
          <p className="py-6">Connectez-vous pour accéder à votre tableau de bord et profiter de toutes nos fonctionnalités.</p>
          <Link to="/login" className="btn btn-primary">Commencer</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;