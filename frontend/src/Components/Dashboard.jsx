import React from 'react';

const Dashboard = () => {
  const handleCreateGame = () => {
    // Logique pour créer une partie
    console.log("Créer une partie");
  };

  const handleJoinGame = () => {
    // Logique pour rejoindre une partie
    console.log("Rejoindre une partie");
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Tableau de bord</h1>
      
      <div className="flex space-x-4">
        <button
          onClick={handleCreateGame}
          className="btn btn-primary text-white py-3 px-6 rounded-lg"
        >
          Créer une partie
        </button>

        <button
          onClick={handleJoinGame}
          className="btn btn-secondary text-white py-3 px-6 rounded-lg"
        >
          Rejoindre une partie
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
