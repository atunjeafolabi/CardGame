import { describe, expect, test } from "vitest";

import Player from "../player";
import Card from "../card";
import Game from "../game";
import OutputPrinter from "../OutputPrinter";

describe("comparing cards", () => {
  const player1 = new Player(1, [new Card(1)]);
  const player2 = new Player(2, [new Card(6)]);

  const game = new Game(player1, player2, new OutputPrinter());

  game.play();

  test("When comparing two cards, the higher card should win", () => {
    expect(game.getWinner()).toBe(player2);
  });
});

describe("comparing cards", () => {
  const player1 = new Player(1, [new Card(3), new Card(1)]);
  const player2 = new Player(2, [new Card(4), new Card(1)]);
  const totalCards = 4;

  const game = new Game(player1, player2, new OutputPrinter());
  game.play();

  const winner: Player = game.getWinner();

  test("When comparing two cards of the same value, the winner of the next round should win 4 cards", () => {
    expect(winner.discardPile.length).toBe(totalCards);
  });
});
