import Card from "./card";

class Deck {
  cards: Card[];

  constructor() {
    this.cards = [];
    this.load();
    this.shuffle();
  }

  load() {
    for (let i = 1; i <= 10; i++) {
      for (let j = 0; j < 4; j++) {
        this.cards.push(new Card(i));
      }
    }
  }

  /**
   * Randomizes elements in cards
   * using the Fischer-Yates algorithm
   */
  shuffle(): void {
    for (let i = this.size() - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  /**
   * Get the first 20 elements in cards
   */
  deal(): Card[] {
    return this.cards.splice(0, 20);
  }

  size() {
    return this.cards.length;
  }
}

export default Deck;
