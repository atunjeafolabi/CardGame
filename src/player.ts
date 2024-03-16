import Card from "./card";

class Player {
  id: number;
  drawPile: Card[];
  discardPile: Card[];

  constructor(id: number, drawPile: Card[]) {
    this.id = id;
    this.discardPile = [];
    this.drawPile = drawPile;
  }

  drawCard(): Card {
    if (this.drawPile.length === 0) {
      this.shuffleDiscardPile();
    }
    return this.drawPile.pop()!;
  }

  getCurrentCardValue(): Card {
    if (this.drawPile.length === 0) {
      this.shuffleDiscardPile();
    }

    return this.drawPile[this.drawPile.length - 1];
  }

  shuffleDiscardPile(): void {
    if (this.discardPile.length > 0) {
      this.drawPile = this.discardPile;
      this.shuffle();
      this.discardPile = [];
    }
  }

  /**
   * Randomizes elements in cards using the Fischer-Yates algorithm
   */
  shuffle() {
    for (let i = this.drawPile.length - 1; i > 0; i--) {
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
    return this.drawPile.length > 0 || this.discardPile.length > 0;
  }

  getId() {
    return this.id;
  }
}

export default Player;
