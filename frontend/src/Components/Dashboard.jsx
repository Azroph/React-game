import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [socket, setSocket] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:3000');
    
    newSocket.onopen = () => {
      console.log('WebSocket connection established');
      setSocket(newSocket);
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleSocketMessage(data);
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);

  const handleSocketMessage = (data) => {
    switch (data.type) {
      case 'gameStart':
        setCurrentPlayer(data.currentPlayer);
        setMessage('La partie commence!');
        break;
      case 'turnPlayed':
        setMessage(`Le joueur ${data.player} a joué: ${data.move}`);
        break;
      case 'nextTurn':
        setCurrentPlayer(data.currentPlayer);
        break;
      case 'playerDisconnected':
        setMessage(`Le joueur ${data.player} s'est déconnecté. La partie est terminée.`);
        break;
      default:
        console.log('Unknown message type:', data.type);
    }
  };

  const sendSocketMessage = (type, payload) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type, ...payload }));
    }
  };

  const handleCreateGame = () => {
    sendSocketMessage('createGame');
  };

  const handleJoinGame = () => {
    const gameIdToJoin = prompt("Entrez l'ID de la partie à rejoindre:");
    if (gameIdToJoin) {
      sendSocketMessage('joinGame', { gameId: gameIdToJoin });
    }
  };

  const handlePlayTurn = () => {
    const move = prompt("Entrez votre coup:");
    if (move && gameId) {
      sendSocketMessage('playTurn', { gameId, move });
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Tableau de bord</h1>
      
      <div className="flex space-x-4 mb-4">
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

      {gameId && (
        <button
          onClick={handlePlayTurn}
          className="btn btn-success text-white py-3 px-6 rounded-lg mb-4"
        >
          Jouer un coup
        </button>
      )}

      <div className="mt-4 text-lg">
        {message}
      </div>

      {currentPlayer && (
        <div className="mt-4 text-lg">
          Joueur actuel: {currentPlayer === socket?.url ? 'Vous' : 'Adversaire'}
        </div>
      )}
    </div>
  );
};

export default Dashboard;