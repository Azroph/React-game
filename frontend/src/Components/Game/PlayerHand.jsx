import React from 'react';

const PlayerHand = ({ player, cards }) => {
  return (
    <div className="player-hand">
      <h2>{player}'s Hand</h2>
      <div className="cards">
        {cards.map((card, index) => (
          <span key={index} className="card">
            {card.value} {card.suit}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PlayerHand;
