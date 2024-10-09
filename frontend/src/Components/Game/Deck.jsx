class Deck {
  constructor() {
    this.deck = this.generateDeck();
    this.shuffle();
  }

  generateDeck() {
    const suits = ['♠', '♣', '♥', '♦'];
    const values = [
      '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
    ];
    const deck = [];

    suits.forEach(suit => {
      values.forEach(value => {
        deck.push({ value, suit });
      });
    });

    return deck;
  }

  shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  deal(num) {
    return this.deck.splice(0, num);
  }
}

export default Deck;
