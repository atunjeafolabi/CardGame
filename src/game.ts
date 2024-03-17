import Card from "./card";
import Player from "./player";
import OutputPrinter from "./OutputPrinter";

class Game {
  player1: Player;
  player2: Player;
  winner!: Player;

  round = 1;
  tieRound = 0;
  tiedCards: Card[][];
  outputPrinter: OutputPrinter;

  constructor(player1: Player, player2: Player, outputPrinter: OutputPrinter) {
    this.tiedCards = [];
    this.player1 = player1;
    this.player2 = player2;
    this.outputPrinter = outputPrinter;
  }

  playTurn() {
    const card1 = this.player1.drawCard();
    const card2 = this.player2.drawCard();

    this.outputPrinter.addRoundText(this.round);

    this.outputPrinter.addPlayerLabel(
      this.player1.getId(),
      this.player1.sizeOfDrawPile(),
      card1.value
    );
    this.outputPrinter.addPlayerLabel(
      this.player2.getId(),
      this.player2.sizeOfDrawPile(),
      card2.value
    );

    if (card1.value > card2.value) {
      this.player1.addToDiscard([card1, card2]);
      this.player1.addToDiscardPreviouslyTied(this.tiedCards);
      this.flushTiedCards();
      this.outputPrinter.addRoundWinnerText(this.player1.getId());
    } else if (card1.value < card2.value) {
      this.player2.addToDiscard([card1, card2]);
      this.player2.addToDiscardPreviouslyTied(this.tiedCards);
      this.flushTiedCards();
      this.outputPrinter.addRoundWinnerText(this.player2.getId());
    } else {
      this.addToTiedCards(card1, card2);
      this.outputPrinter.addNoWinnerText();
      this.tieRound++;
    }
  }

  addToTiedCards(card1: Card, card2: Card) {
    this.tiedCards[this.tieRound] = [card1, card2];
  }

  play() {
    while (this.player1.hasCards() && this.player2.hasCards()) {
      this.playTurn();
      this.round++;
    }

    if (this.player1.hasCards() && !this.player2.hasCards()) {
      this.winner = this.player1;
      this.outputPrinter.addWinnerText(this.player1.getId());
    } else {
      this.winner = this.player2;
      this.outputPrinter.addWinnerText(this.player2.getId());
    }
  }

  getWinner() {
    return this.winner;
  }

  printOutput() {
    this.outputPrinter.print();
  }

  flushTiedCards() {
    this.tiedCards = [];
  }
}

export default Game;
