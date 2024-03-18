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
    if (this.isEmptyDrawPile()) {
      this.loadDrawPile();
    }
    return this.drawPile.pop()!;
  }

  private isEmptyDrawPile() {
    return this.sizeOfDrawPile() === 0;
  }

  getCurrentCardValue(): Card {
    if (this.sizeOfDrawPile() === 0) {
      this.loadDrawPile();
    }

    return this.drawPile[this.sizeOfDrawPile() - 1];
  }

  loadDrawPile(): void {
    if (!this.isEmptyDiscardPile()) {
      this.shuffleDiscardPile();
      this.copyDiscardPileToDrawPile();
      this.flushDiscardPile();
    }
  }

  private flushDiscardPile() {
    this.discardPile = [];
  }

  private copyDiscardPileToDrawPile() {
    this.drawPile = this.discardPile;
  }

  private isEmptyDiscardPile() {
    return this.sizeOfDiscardPile() === 0;
  }

  /**
   * Randomizes elements in discard pile
   * using the Fischer-Yates algorithm
   */
  private shuffleDiscardPile() {
    if (this.isEmptyDiscardPile()) {
      return;
    }

    for (let i = this.sizeOfDiscardPile() - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.discardPile[i], this.discardPile[j]] = [
        this.discardPile[j],
        this.discardPile[i],
      ];
    }
  }

  addToDiscardPile(cards: Card[]) {
    this.discardPile.push(...cards);
  }

  addToDiscardPreviouslyTied(tiedCards: Card[][]) {
    tiedCards.forEach((tiedCardPair) => {
      this.addToDiscardPile(tiedCardPair);
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

  getDiscardPile() {
    return this.discardPile;
  }
}

export default Player;
