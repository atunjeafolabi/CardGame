import Card from "./Card";
import Player from "./Player";
import OutputPrinter from "./OutputPrinter";

class Game {
  private round = 1;
  private tieRound = 0;
  private winner!: Player;
  private tiedCards: Card[][];
  private firstPlayer: Player;
  private secondPlayer: Player;
  private outputPrinter: OutputPrinter;

  constructor(
    firstPlayer: Player,
    secondPlayer: Player,
    outputPrinter: OutputPrinter
  ) {
    this.tiedCards = [];
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.outputPrinter = outputPrinter;
  }

  private playTurn() {
    const card1 = this.firstPlayer.drawCard();
    const card2 = this.secondPlayer.drawCard();

    this.outputPrinter.writeRoundText(this.round);

    this.outputPrinter.writePlayerLabel(
      this.firstPlayer.getId(),
      this.firstPlayer.sizeOfDrawPile(),
      card1.value
    );
    this.outputPrinter.writePlayerLabel(
      this.secondPlayer.getId(),
      this.secondPlayer.sizeOfDrawPile(),
      card2.value
    );

    if (card1.value > card2.value) {
      this.firstPlayer.addToDiscardPile([card1, card2]);
      this.firstPlayer.addToDiscardPreviouslyTied(this.tiedCards);
      this.flushTiedCards();
      this.outputPrinter.writeRoundWinnerText(this.firstPlayer.getId());
    } else if (card1.value < card2.value) {
      this.secondPlayer.addToDiscardPile([card1, card2]);
      this.secondPlayer.addToDiscardPreviouslyTied(this.tiedCards);
      this.flushTiedCards();
      this.outputPrinter.writeRoundWinnerText(this.secondPlayer.getId());
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
    while (this.firstPlayer.hasCards() && this.secondPlayer.hasCards()) {
      this.playTurn();
      this.round++;
    }

    if (this.firstPlayer.hasCards() && !this.secondPlayer.hasCards()) {
      this.winner = this.firstPlayer;
      this.outputPrinter.writeWinnerText(this.firstPlayer.getId());
    } else {
      this.winner = this.secondPlayer;
      this.outputPrinter.writeWinnerText(this.secondPlayer.getId());
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
