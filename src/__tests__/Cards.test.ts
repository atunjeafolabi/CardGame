import { describe, expect, test } from "vitest";

import Card from "../Card";
import Game from "../Game";
import Player from "../Player";
import OutputPrinter from "../OutputPrinter";

describe("a player with an empty draw pile tries to draw a card", () => {
  const emptyDrawPile = [];
  const player1 = new Player(1, emptyDrawPile);
  /**
   * Let's have something in the
   * discard pile to begin with.
   */
  const sampleCards = [
    new Card(1),
    new Card(2),
    new Card(3),
    new Card(4),
    new Card(5),
  ];
  player1.addToDiscardPile(sampleCards);

  player1.drawCard();

  test("discard pile should now be empty after drawing a card", () => {
    expect(player1.sizeOfDiscardPile()).toEqual(0);
  });

  test("draw pile should now have a size of (sampleCards - 1) because one card was drawn", () => {
    expect(player1.sizeOfDrawPile()).toEqual(sampleCards.length - 1);
  });

  test("draw pile should be shuffled and therefore not equal to discard pile", () => {
    expect(player1.getDrawPile()).not.toEqual(player1.getDiscardPile());
  });
});

describe("when comparing two cards with different values", () => {
  const player1 = new Player(1, [new Card(1)]);
  const player2 = new Player(2, [new Card(6)]);

  const game = new Game(player1, player2, new OutputPrinter());

  game.play();

  test("card with higher value should win", () => {
    expect(game.getWinner()).toBe(player2);
  });
});

describe("when comparing 4 cards with 1 tie occurence", () => {
  const player1 = new Player(1, [new Card(3), new Card(1)]);
  const player2 = new Player(2, [new Card(4), new Card(1)]);
  const totalCards = 4;

  const game = new Game(player1, player2, new OutputPrinter());
  game.play();

  const winner: Player = game.getWinner();

  test("the winner should win all 4 cards", () => {
    expect(winner.sizeOfDiscardPile()).toBe(totalCards);
  });
});

describe("when comparing cards with more than one tie occurence", () => {
  const player1 = new Player(1, [new Card(3), new Card(1), new Card(5)]);
  const player2 = new Player(2, [new Card(4), new Card(1), new Card(5)]);
  const totalCards = 6;

  const game = new Game(player1, player2, new OutputPrinter());
  game.play();

  const winner: Player = game.getWinner();

  test("the winner should win all cards", () => {
    expect(winner.sizeOfDiscardPile()).toBe(totalCards);
  });
});
