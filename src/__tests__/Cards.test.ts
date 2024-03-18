import { describe, expect, test } from "vitest";

import Player from "../Player";
import Card from "../Card";

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

describe("a player with an empty draw pile tries to draw a card", () => {
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
