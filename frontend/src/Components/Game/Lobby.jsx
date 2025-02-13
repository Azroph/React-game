import React, { useState } from 'react';
import Puissance4 from './Puissance4';

function App() {
  const [isInGame, setIsInGame] = useState(false);

  const startGame = () => {
    setIsInGame(true);
  };

  const returnToLobby = () => {
    setIsInGame(false);
  };

  return isInGame ? (
    <Puissance4 onBackToLobby={returnToLobby} />
  ) : (
    <Lobby onStartGame={startGame} />
  );
}

function Lobby({ onStartGame }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="text-center bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-12 max-w-xl w-full">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Puissance 4
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Affrontez votre adversaire dans ce classique jeu de stratégie !
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center items-center space-x-4">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-3xl">
              🔴
            </div>
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white text-3xl">
              🟡
            </div>
          </div>

          <button 
            onClick={onStartGame}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 
                       text-white font-bold py-4 px-8 rounded-full 
                       hover:from-blue-600 hover:to-indigo-700 
                       transition-all duration-300 
                       transform hover:scale-105 
                       shadow-lg hover:shadow-xl text-xl"
          >
            Commencer la Partie
          </button>

          <div className="text-sm text-gray-600">
            <p>Règles : Alignez 4 jetons de votre couleur pour gagner !</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;