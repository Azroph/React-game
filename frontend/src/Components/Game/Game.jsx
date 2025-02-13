import React, { useState, useEffect } from 'react';

// Constantes du jeu
const ROWS = 6;
const COLUMNS = 7;

function Puissance4() {
  // États du jeu
  const [board, setBoard] = useState(
    Array(ROWS).fill(null).map(() => Array(COLUMNS).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState('rouge');
  const [gameStatus, setGameStatus] = useState('en_cours');
  const [winner, setWinner] = useState(null);
  
  // État et chargement des scores historiques
  const [scoreHistory, setScoreHistory] = useState(() => {
    const savedScores = localStorage.getItem('puissance4Scores');
    return savedScores ? JSON.parse(savedScores) : [];
  });
  const [currentScores, setCurrentScores] = useState({ rouge: 0, jaune: 0 });

  // Effet pour sauvegarder les scores à chaque modification
  useEffect(() => {
    localStorage.setItem('puissance4Scores', JSON.stringify(scoreHistory));
  }, [scoreHistory]);

  // Réinitialisation du jeu
  const resetGame = () => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLUMNS).fill(null)));
    setCurrentPlayer('rouge');
    setGameStatus('en_cours');
    setWinner(null);
  };

  // Vérification des victoires
  const checkVictory = (newBoard, player) => {
    // Vérification horizontale
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col <= COLUMNS - 4; col++) {
        if (
          newBoard[row][col] === player &&
          newBoard[row][col + 1] === player &&
          newBoard[row][col + 2] === player &&
          newBoard[row][col + 3] === player
        ) {
          return true;
        }
      }
    }

    // Vérification verticale
    for (let row = 0; row <= ROWS - 4; row++) {
      for (let col = 0; col < COLUMNS; col++) {
        if (
          newBoard[row][col] === player &&
          newBoard[row + 1][col] === player &&
          newBoard[row + 2][col] === player &&
          newBoard[row + 3][col] === player
        ) {
          return true;
        }
      }
    }

    // Vérification diagonale (montante)
    for (let row = 3; row < ROWS; row++) {
      for (let col = 0; col <= COLUMNS - 4; col++) {
        if (
          newBoard[row][col] === player &&
          newBoard[row - 1][col + 1] === player &&
          newBoard[row - 2][col + 2] === player &&
          newBoard[row - 3][col + 3] === player
        ) {
          return true;
        }
      }
    }

    // Vérification diagonale (descendante)
    for (let row = 0; row <= ROWS - 4; row++) {
      for (let col = 0; col <= COLUMNS - 4; col++) {
        if (
          newBoard[row][col] === player &&
          newBoard[row + 1][col + 1] === player &&
          newBoard[row + 2][col + 2] === player &&
          newBoard[row + 3][col + 3] === player
        ) {
          return true;
        }
      }
    }

    return false;
  };

  // Vérification match nul
  const checkDraw = (newBoard) => {
    return newBoard.every(row => row.every(cell => cell !== null));
  };

  // Jouer un coup
  const playMove = (col) => {
    if (gameStatus !== 'en_cours') return;

    // Copie du plateau pour éviter la mutation directe
    const newBoard = [...board.map(row => [...row])];

    // Trouver la première ligne libre dans la colonne
    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][col] === null) {
        newBoard[row][col] = currentPlayer;

        // Vérifier la victoire
        if (checkVictory(newBoard, currentPlayer)) {
          setBoard(newBoard);
          setGameStatus('gagne');
          setWinner(currentPlayer);
          
          // Mise à jour des scores
          const newScores = {
            ...currentScores,
            [currentPlayer]: currentScores[currentPlayer] + 1
          };
          setCurrentScores(newScores);
          
          // Ajout à l'historique des scores
          const newScoreEntry = {
            date: new Date().toLocaleString(),
            scores: newScores,
            winner: currentPlayer
          };
          setScoreHistory(prev => [newScoreEntry, ...prev]);
          
          return;
        }

        // Vérifier match nul
        if (checkDraw(newBoard)) {
          setBoard(newBoard);
          setGameStatus('egalite');
          return;
        }

        // Mettre à jour le plateau et changer de joueur
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'rouge' ? 'jaune' : 'rouge');
        return;
      }
    }
  };

  // Réinitialiser tous les scores
  const clearScoreHistory = () => {
    setScoreHistory([]);
    localStorage.removeItem('puissance4Scores');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="flex gap-6 max-w-5xl w-full">
        {/* Conteneur du jeu */}
        <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden">
          {/* En-tête du jeu */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white drop-shadow-md">Puissance 4</h1>
          </div>

          {/* Conteneur principal */}
          <div className="p-6">
            {/* Tableau de scores actuels */}
            <div className="flex justify-between mb-6">
              <div 
                className={`p-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform ${
                  currentPlayer === 'rouge' 
                    ? 'bg-red-500 text-white scale-105 shadow-lg' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                🔴 Rouge: {currentScores.rouge}
              </div>
              <div 
                className={`p-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform ${
                  currentPlayer === 'jaune' 
                    ? 'bg-yellow-500 text-white scale-105 shadow-lg' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                🟡 Jaune: {currentScores.jaune}
              </div>
            </div>

            {/* Plateau de jeu */}
            <div className="bg-blue-600 p-3 rounded-xl shadow-inner">
              <div className="grid grid-cols-7 gap-2">
                {board.map((row, rowIndex) => 
                  row.map((cell, colIndex) => (
                    <div 
                      key={`${rowIndex}-${colIndex}`}
                      className={`w-12 h-12 rounded-full transition-all duration-300 ease-in-out cursor-pointer 
                        ${cell === null ? 'bg-white/30 hover:bg-white/50' : ''}
                      `}
                      style={{
                        backgroundColor: 
                          cell === 'rouge' ? 'rgb(220, 38, 38)' : 
                          cell === 'jaune' ? 'rgb(234, 179, 8)' : 
                          'rgba(255,255,255,0.3)'
                      }}
                      onClick={() => playMove(colIndex)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Messages de statut */}
            {(gameStatus === 'gagne' || gameStatus === 'egalite') && (
              <div className="mt-6 text-center">
                {gameStatus === 'gagne' && (
                  <div className="text-2xl font-bold animate-pulse">
                    {winner === 'rouge' ? '🔴 Rouge' : '🟡 Jaune'} a gagné !
                  </div>
                )}
                {gameStatus === 'egalite' && (
                  <div className="text-2xl font-bold">
                    Égalité !
                  </div>
                )}
              </div>
            )}

            {/* Bouton Nouvelle Partie */}
            <div className="flex justify-center mt-6">
              <button 
                onClick={resetGame} 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 
                           text-white font-bold py-3 px-6 rounded-full 
                           hover:from-blue-600 hover:to-indigo-700 
                           transition-all duration-300 
                           transform hover:scale-105 
                           shadow-md hover:shadow-xl"
              >
                Nouvelle Partie
              </button>
            </div>
          </div>
        </div>

        {/* Tableau des scores historiques */}
        <div className="w-96 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-center">
            <h2 className="text-xl font-bold text-white">Historique des Scores</h2>
          </div>
          
          <div className="p-4">
            {scoreHistory.length === 0 ? (
              <p className="text-center text-gray-500">Aucun score enregistré</p>
            ) : (
              <>
                <div className="max-h-[500px] overflow-y-auto">
                  {scoreHistory.map((entry, index) => (
                    <div 
                      key={index} 
                      className="mb-2 p-3 bg-gray-100 rounded-lg shadow-sm"
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">{entry.date}</span>
                        <span className={`font-bold ${entry.winner === 'rouge' ? 'text-red-600' : 'text-yellow-600'}`}>
                          🏆 {entry.winner === 'rouge' ? 'Rouge' : 'Jaune'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <div>🔴 Rouge: {entry.scores.rouge}</div>
                        <div>🟡 Jaune: {entry.scores.jaune}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <button 
                    onClick={clearScoreHistory}
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    Effacer l'historique
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Puissance4;