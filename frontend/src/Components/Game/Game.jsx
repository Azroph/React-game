import React, { useState } from 'react';

// Constantes du jeu
const ROWS = 6;
const COLUMNS = 7;

function Puissance4() {
  // États du jeu
  const [board, setBoard] = useState(
    Array(ROWS).fill(null).map(() => Array(COLUMNS).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState('rouge');
  const [scores, setScores] = useState({ rouge: 0, jaune: 0 });
  const [gameStatus, setGameStatus] = useState('en_cours');
  const [winner, setWinner] = useState(null);

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
          setScores(prev => ({
            ...prev,
            [currentPlayer]: prev[currentPlayer] + 1
          }));
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden">
        {/* En-tête du jeu */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white drop-shadow-md">Puissance 4</h1>
        </div>

        {/* Conteneur principal */}
        <div className="p-6">
          {/* Tableau de scores */}
          <div className="flex justify-between mb-6">
            <div 
              className={`p-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform ${
                currentPlayer === 'rouge' 
                  ? 'bg-red-500 text-white scale-105 shadow-lg' 
                  : 'bg-red-100 text-red-800'
              }`}
            >
              🔴 Rouge: {scores.rouge}
            </div>
            <div 
              className={`p-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform ${
                currentPlayer === 'jaune' 
                  ? 'bg-yellow-500 text-white scale-105 shadow-lg' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              🟡 Jaune: {scores.jaune}
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
    </div>
  );
}

export default Puissance4;