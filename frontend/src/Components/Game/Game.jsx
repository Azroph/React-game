import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Game = () => {
    const [socket, setSocket] = useState(null);
    const [gameState, setGameState] = useState({
        gameId: null,
        isCreator: false,
        currentTurn: false,
        status: 'disconnected' // 'disconnected', 'waiting', 'playing'
    });

    useEffect(() => {
        // Récupérer l'ID utilisateur du localStorage
        const userId = localStorage.getItem('userId');
        
        // Créer la connexion WebSocket
        const socket = io('http://localhost:3000', {
            path: '/ws/game'
        });

        // Gestionnaire de connexion
        socket.on('connect', () => {
            console.log('Connecté au serveur WebSocket');
            setGameState(prev => ({ ...prev, status: 'connected' }));
        });

        // Écouter les événements du jeu
        socket.on('gameCreated', ({ gameId }) => {
            setGameState(prev => ({
                ...prev,
                gameId,
                isCreator: true,
                status: 'waiting'
            }));
        });

        socket.on('playerJoined', ({ userId }) => {
            setGameState(prev => ({
                ...prev,
                status: 'playing',
                currentTurn: prev.isCreator // Le créateur commence
            }));
        });

        socket.on('gameJoined', ({ gameId }) => {
            setGameState(prev => ({
                ...prev,
                gameId,
                status: 'playing',
                currentTurn: false // Le joueur 2 attend son tour
            }));
        });

        socket.on('opponentAction', ({ action }) => {
            // Gérer l'action de l'adversaire ici
            setGameState(prev => ({
                ...prev,
                currentTurn: true
            }));
        });

        socket.on('actionConfirmed', ({ nextTurn }) => {
            setGameState(prev => ({
                ...prev,
                currentTurn: false
            }));
        });

        socket.on('error', ({ message }) => {
            console.error('Erreur WebSocket:', message);
        });

        setSocket(socket);

        // Nettoyage à la déconnexion
        return () => {
            socket.disconnect();
        };
    }, []);

    // Fonction pour créer une nouvelle partie
    const createGame = () => {
        const userId = localStorage.getItem('userId');
        socket.emit('createGame', userId);
    };

    // Fonction pour rejoindre une partie
    const joinGame = (gameId) => {
        const userId = localStorage.getItem('userId');
        socket.emit('joinGame', { gameId, userId });
    };

    // Fonction pour effectuer une action
    const performAction = (action) => {
        if (!gameState.currentTurn) return;
        
        socket.emit('gameAction', {
            gameId: gameState.gameId,
            userId: localStorage.getItem('userId'),
            action
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h1 className="text-2xl font-bold mb-4">Partie de jeu</h1>
                    
                    {gameState.status === 'connected' && !gameState.gameId && (
                        <div className="space-y-4">
                            <button 
                                onClick={createGame}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Créer une nouvelle partie
                            </button>
                            
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="ID de la partie à rejoindre"
                                    className="border p-2 rounded mr-2"
                                    onChange={(e) => setGameId(e.target.value)}
                                />
                                <button 
                                    onClick={() => joinGame(gameId)}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Rejoindre
                                </button>
                            </div>
                        </div>
                    )}

                    {gameState.status === 'waiting' && (
                        <div className="text-center">
                            <p className="text-lg mb-4">En attente d'un autre joueur...</p>
                            <p className="text-gray-600">ID de la partie: {gameState.gameId}</p>
                        </div>
                    )}

                    {gameState.status === 'playing' && (
                        <div>
                            <p className="text-lg mb-4">
                                {gameState.currentTurn ? "C'est votre tour!" : "Tour de l'adversaire..."}
                            </p>
                            {/* Ajouter ici les contrôles de jeu spécifiques */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Game;