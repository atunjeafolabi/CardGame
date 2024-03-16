class OutputPrinter {
  output: string = "";

  addRoundText(round: number) {
    this.output = this.output + `Round ${round}\n`;
  }

  addPlayerLabel(playerId: number, cardsRemaining: number, cardValue: number) {
    this.output += `Player ${playerId} (${cardsRemaining} cards): ${cardValue}\n`;
  }

  addRoundWinnerText(id: number) {
    this.output += `Player ${id} wins this round.\n\n`;
  }

  addWinnerText(id: number) {
    this.output += `Player ${id} wins the game!\n\n`;
  }

  addNoWinnerText() {
    this.output += "No winner in this round\n\n";
  }

  getOutput() {
    return this.output;
  }

  print() {
    console.log(this.output);
  }
}

export default OutputPrinter;
