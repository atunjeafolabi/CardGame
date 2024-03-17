import Card from "./card";

class Player {
  private id: number;
  private drawPile: Card[];
  private discardPile: Card[];

  constructor(id: number, drawPile: Card[]) {
    this.id = id;
    this.discardPile = [];
    this.drawPile = drawPile;
  }

  drawCard(): Card {
    if (this.sizeOfDrawPile() === 0) {
      this.shuffleDiscardPile();
    }
    return this.drawPile.pop()!;
  }

  getCurrentCardValue(): Card {
    if (this.sizeOfDrawPile() === 0) {
      this.shuffleDiscardPile();
    }

    return this.drawPile[this.sizeOfDrawPile() - 1];
  }

  shuffleDiscardPile(): void {
    if (this.sizeOfDiscardPile() > 0) {
      this.drawPile = this.discardPile;
      this.shuffle();
      this.discardPile = [];
    }
  }

  /**
   * Randomizes elements in cards
   * using the Fischer-Yates algorithm
   */
  private shuffle() {
    for (let i = this.sizeOfDrawPile() - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.drawPile[i], this.drawPile[j]] = [
        this.drawPile[j],
        this.drawPile[i],
      ];
    }
  }

  addToDiscard(cards: Card[]) {
    this.discardPile.push(...cards);
  }

  addToDiscardPreviouslyTied(tiedCards: Card[][]) {
    tiedCards.forEach((tiedCardPair) => {
      this.addToDiscard(tiedCardPair);
    });
  }

  hasCards(): boolean {
    return this.sizeOfDrawPile() > 0 || this.sizeOfDiscardPile() > 0;
  }

  sizeOfDrawPile() {
    return this.drawPile.length;
  }

  sizeOfDiscardPile() {
    return this.discardPile.length;
  }

  getId() {
    return this.id;
  }

  setDrawPile(cards: Card[]) {
    this.drawPile = cards;
  }

  getDrawPile() {
    return this.drawPile;
  }

  setDiscardPile(cards: Card[]) {
    this.discardPile = cards;
  }

  getDiscardPile() {
    return this.discardPile;
  }
}

export default Player;
