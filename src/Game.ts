import Card from "./Card";
import Player from "./Player";
import Output from "./Output";

class Game {
  private round = 1;
  private tieRound = 0;
  private winner!: Player;
  private tiedCards: Card[][];
  private firstPlayer: Player;
  private secondPlayer: Player;
  private output: Output;

  constructor(firstPlayer: Player, secondPlayer: Player, output: Output) {
    this.tiedCards = [];
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.output = output;
  }

  private playTurn() {
    const card1 = this.firstPlayer.drawCard();
    const card2 = this.secondPlayer.drawCard();

    this.output.writeRoundText(this.round);

    this.output.writePlayerLabel(
      this.firstPlayer.getId(),
      this.firstPlayer.sizeOfDrawPile(),
      card1.value
    );
    this.output.writePlayerLabel(
      this.secondPlayer.getId(),
      this.secondPlayer.sizeOfDrawPile(),
      card2.value
    );

    if (card1.value > card2.value) {
      this.firstPlayer.addToDiscardPile([card1, card2]);
      this.firstPlayer.addToDiscardPreviouslyTied(this.tiedCards);
      this.flushTiedCards();
      this.output.writeRoundWinnerText(this.firstPlayer.getId());
    } else if (card1.value < card2.value) {
      this.secondPlayer.addToDiscardPile([card1, card2]);
      this.secondPlayer.addToDiscardPreviouslyTied(this.tiedCards);
      this.flushTiedCards();
      this.output.writeRoundWinnerText(this.secondPlayer.getId());
    } else {
      this.addToTiedCards(card1, card2);
      this.output.writeNoWinnerText();
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
      this.output.writeWinnerText(this.firstPlayer.getId());
    } else {
      this.winner = this.secondPlayer;
      this.output.writeWinnerText(this.secondPlayer.getId());
    }
  }

  getWinner() {
    return this.winner;
  }

  printOutput() {
    this.output.print();
  }

  private flushTiedCards() {
    this.tiedCards = [];
  }
}

export default Game;
