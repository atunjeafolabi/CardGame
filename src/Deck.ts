import Card from "./Card";

class Deck {
  private cards: Card[];

  constructor() {
    this.cards = [];
    this.load();
    this.shuffle();
  }

  /**
   * Load deck with 40 cards
   */
  private load() {
    for (let i = 1; i <= 10; i++) {
      for (let j = 0; j < 4; j++) {
        this.add(new Card(i));
      }
    }
  }

  getCards() {
    return this.cards;
  }

  add(card: Card) {
    this.cards.push(card);
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

  deal(): Card[] {
    return this.cards.splice(0, 20);
  }

  size() {
    return this.cards.length;
  }
}

export default Deck;
