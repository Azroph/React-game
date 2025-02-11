import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="hero min-h-screen bg-base-200 dark:bg-gray-900 transition-colors duration-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold dark:text-white">Bienvenue sur ShrekGame</h1>
          <p className="py-6 dark:text-gray-300">
            Connectez-vous pour accéder à votre tableau de bord et profiter de toutes nos fonctionnalités.
          </p>
          <Link 
            to="/login" 
            className="btn btn-primary dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
          >
            Commencer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;