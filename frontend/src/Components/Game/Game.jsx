import React, { useState } from 'react';
import Table from './Table';
import PlayerHand from './PlayerHand';
import Deck from './Deck';

const Game = () => {
  const [deck, setDeck] = useState(new Deck());
  const [player1Hand, setPlayer1Hand] = useState(deck.deal(2));
  const [player2Hand, setPlayer2Hand] = useState(deck.deal(2));
  const [communityCards, setCommunityCards] = useState(deck.deal(5));
  const [stage, setStage] = useState(0); // 0: Preflop, 3: Flop, 4: Turn, 5: River
  const [gameOver, setGameOver] = useState(false);

  const nextStage = () => {
    if (stage < 5) {
      setStage(stage + 1);
    } else {
      setGameOver(true);
    }
  };

  const dealNewHand = () => {
    const newDeck = new Deck();
    setDeck(newDeck);
    setPlayer1Hand(newDeck.deal(2));
    setPlayer2Hand(newDeck.deal(2));
    setCommunityCards(newDeck.deal(5));
    setStage(0);
    setGameOver(false);
  };

  return (
    <div className="game">
      <h1>Texas Hold'em Poker</h1>
      <Table communityCards={communityCards} stage={stage} />
      <PlayerHand player="Player 1" cards={player1Hand} />
      <PlayerHand player="Player 2" cards={player2Hand} />
      <button onClick={nextStage} disabled={gameOver}>
        {stage === 0 ? 'Reveal Flop' : stage === 3 ? 'Reveal Turn' : stage === 4 ? 'Reveal River' : 'End Game'}
      </button>
      <button onClick={dealNewHand}>Nouvelle main</button>
    </div>
  );
};

export default Game;
