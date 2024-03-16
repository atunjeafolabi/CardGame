import Game from "./game";
import Deck from "./deck";
import Player from "./player";
import OutputFormatter from "./OutputPrinter";

// Distribute cards to players
const deck = new Deck();
const player1DrawPile = deck.deal();
const player2DrawPile = deck.deal();
const player1 = new Player(1, player1DrawPile);
const player2 = new Player(2, player2DrawPile);

//Game start
const game = new Game(player1, player2, new OutputFormatter());
game.play();
game.printOutput();
