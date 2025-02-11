import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StartGame = () => {
    const [gameId, setGameId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const createNewGame = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            const response = await fetch('http://localhost:3000/game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId })
            });

            const data = await response.json();
            
            if (data.error) {
                setError(data.error);
            } else {
                navigate('/game', { state: { gameId: data.gameId, isCreator: true } });
            }
        } catch (error) {
            setError('Erreur lors de la création de la partie');
        }
    };

    const joinGame = async () => {
        if (!gameId.trim()) {
            setError('Veuillez entrer un ID de partie');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            const response = await fetch(`http://localhost:3000/game/join/${gameId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId, action: 'join' })
            });

            const data = await response.json();
            
            if (data.error) {
                setError(data.error);
            } else {
                navigate('/game', { state: { gameId: gameId, isCreator: false } });
            }
        } catch (error) {
            setError('Erreur lors de la tentative de rejoindre la partie');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
                    Commencer une partie
                </h2>

                <div className="space-y-6">
                    <div>
                        <button
                            onClick={createNewGame}
                            className="w-full flex justify-center py-3 px-4 border border-transparent 
                                     rounded-md shadow-sm text-lg font-medium text-white 
                                     bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                     transition-colors duration-200"
                        >
                            Créer une nouvelle partie
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Ou</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="gameId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                ID de la partie
                            </label>
                            <input
                                type="text"
                                id="gameId"
                                value={gameId}
                                onChange={(e) => setGameId(e.target.value)}
                                placeholder="Entrez l'ID de la partie"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                                         placeholder-gray-400 dark:placeholder-gray-500
                                         rounded-md shadow-sm focus:outline-none 
                                         focus:ring-blue-500 focus:border-blue-500 
                                         dark:focus:ring-blue-400 dark:focus:border-blue-400
                                         bg-white dark:bg-gray-700 
                                         text-gray-900 dark:text-white"
                            />
                        </div>
                        <button
                            onClick={joinGame}
                            className="w-full flex justify-center py-3 px-4 border border-transparent 
                                     rounded-md shadow-sm text-lg font-medium text-white 
                                     bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 
                                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                                     transition-colors duration-200"
                        >
                            Rejoindre une partie
                        </button>
                    </div>

                    {error && (
                        <div className="mt-4 text-center text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 
                                      py-2 px-4 rounded-md">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StartGame;