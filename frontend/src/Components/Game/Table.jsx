import React from 'react';

const Table = ({ communityCards, stage }) => {
  const cardsToShow = communityCards.slice(0, stage);

  return (
    <div className="table">
      <h2>Community Cards</h2>
      <div className="cards">
        {cardsToShow.map((card, index) => (
          <span key={index} className="card">
            {card.value} {card.suit}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Table;
