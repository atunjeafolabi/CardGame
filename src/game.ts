import Card from "./Card";
import Player from "./Player";
import OutputPrinter from "./OutputPrinter";

class Game {
  private round = 1;
  private tieRound = 0;
  private player1: Player;
  private player2: Player;
  private winner!: Player;
  private tiedCards: Card[][];
  private outputPrinter: OutputPrinter;

  constructor(player1: Player, player2: Player, outputPrinter: OutputPrinter) {
    this.tiedCards = [];
    this.player1 = player1;
    this.player2 = player2;
    this.outputPrinter = outputPrinter;
  }

  private playTurn() {
    const card1 = this.player1.drawCard();
    const card2 = this.player2.drawCard();

    this.outputPrinter.writeRoundText(this.round);

    this.outputPrinter.writePlayerLabel(
      this.player1.getId(),
      this.player1.sizeOfDrawPile(),
      card1.value
    );
    this.outputPrinter.writePlayerLabel(
      this.player2.getId(),
      this.player2.sizeOfDrawPile(),
      card2.value
    );

    if (card1.value > card2.value) {
      this.player1.addToDiscardPile([card1, card2]);
      this.player1.addToDiscardPreviouslyTied(this.tiedCards);
      this.flushTiedCards();
      this.outputPrinter.writeRoundWinnerText(this.player1.getId());
    } else if (card1.value < card2.value) {
      this.player2.addToDiscardPile([card1, card2]);
      this.player2.addToDiscardPreviouslyTied(this.tiedCards);
      this.flushTiedCards();
      this.outputPrinter.writeRoundWinnerText(this.player2.getId());
    } else {
      this.addToTiedCards(card1, card2);
      this.outputPrinter.writeNoWinnerText();
      this.tieRound++;
    }
  }

  private addToTiedCards(card1: Card, card2: Card) {
    this.tiedCards[this.tieRound] = [card1, card2];
  }

  play() {
    while (this.player1.hasCards() && this.player2.hasCards()) {
      this.playTurn();
      this.round++;
    }

    if (this.player1.hasCards() && !this.player2.hasCards()) {
      this.winner = this.player1;
      this.outputPrinter.writeWinnerText(this.player1.getId());
    } else {
      this.winner = this.player2;
      this.outputPrinter.writeWinnerText(this.player2.getId());
    }
  }

  getWinner() {
    return this.winner;
  }

  printOutput() {
    this.outputPrinter.print();
  }

  private flushTiedCards() {
    this.tiedCards = [];
  }
}

export default Game;
