import Game from "./Game";
import Deck from "./Deck";
import Player from "./Player";
import OutputFormatter from "./Output";

// Distribute cards to players
const deck = new Deck();
const firstPlayerDrawPile = deck.deal();
const secondPlayerDrawPile = deck.deal();
const firstPlayer = new Player(1, firstPlayerDrawPile);
const secondPlayer = new Player(2, secondPlayerDrawPile);

//Game start
const game = new Game(firstPlayer, secondPlayer, new OutputFormatter());
game.play();
game.printOutput();
