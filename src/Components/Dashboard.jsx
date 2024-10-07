import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Statistiques</h2>
            <p>Visualisez vos statistiques ici.</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Messages</h2>
            <p>Consultez vos messages récents.</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Tâches</h2>
            <p>Gérez vos tâches en cours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;