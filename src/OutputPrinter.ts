class OutputPrinter {
  output: string = "";

  writeRoundText(round: number) {
    this.output = this.output + `Round ${round}\n`;
  }

  writePlayerLabel(
    playerId: number,
    cardsRemaining: number,
    cardValue: number
  ) {
    this.output += `Player ${playerId} (${cardsRemaining} cards): ${cardValue}\n`;
  }

  writeRoundWinnerText(id: number) {
    this.output += `Player ${id} wins this round.\n\n`;
  }

  writeWinnerText(id: number) {
    this.output += `Player ${id} wins the game!\n\n`;
  }

  writeNoWinnerText() {
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
