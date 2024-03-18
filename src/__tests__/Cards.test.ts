import { describe, expect, test } from "vitest";

import Card from "../Card";
import Game from "../Game";
import Player from "../Player";
import OutputPrinter from "../OutputPrinter";

describe("a player with an empty draw pile tries to draw a card", () => {
  const emptyDrawPile = [];
  const firstPlayer = new Player(1, emptyDrawPile);
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
  firstPlayer.addToDiscardPile(sampleCards);

  firstPlayer.drawCard();

  test("discard pile should now be empty after drawing a card", () => {
    expect(firstPlayer.sizeOfDiscardPile()).toEqual(0);
  });

  test("draw pile should now have a size of (sampleCards - 1) because one card was drawn", () => {
    expect(firstPlayer.sizeOfDrawPile()).toEqual(sampleCards.length - 1);
  });

  test("draw pile should be shuffled and therefore not equal to discard pile", () => {
    expect(firstPlayer.getDrawPile()).not.toEqual(firstPlayer.getDiscardPile());
  });
});

describe("when comparing two cards with different values", () => {
  const firstPlayer = new Player(1, [new Card(1)]);
  const secondPlayer = new Player(2, [new Card(6)]);

  const game = new Game(firstPlayer, secondPlayer, new OutputPrinter());

  game.play();

  test("card with higher value should win", () => {
    expect(game.getWinner()).toBe(secondPlayer);
  });
});

describe("when comparing 4 cards with 1 tie occurence", () => {
  const firstPlayer = new Player(1, [new Card(3), new Card(1)]);
  const secondPlayer = new Player(2, [new Card(4), new Card(1)]);
  const totalCards = 4;

  const game = new Game(firstPlayer, secondPlayer, new OutputPrinter());
  game.play();

  const winner: Player = game.getWinner();

  test("the winner after tie should win all 4 cards", () => {
    expect(winner.sizeOfDiscardPile()).toBe(totalCards);
  });
});

describe("when comparing cards with more than one tie occurence", () => {
  const firstPlayer = new Player(1, [new Card(3), new Card(1), new Card(5)]);
  const secondPlayer = new Player(2, [new Card(4), new Card(1), new Card(5)]);
  const totalCards = 6;

  const game = new Game(firstPlayer, secondPlayer, new OutputPrinter());
  game.play();

  const winner: Player = game.getWinner();

  test("the winner should also win all tied cards", () => {
    expect(winner.sizeOfDiscardPile()).toBe(totalCards);
  });
});
