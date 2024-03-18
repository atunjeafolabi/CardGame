import { describe, expect, test } from "vitest";

import Player from "../Player";
import Card from "../Card";

const emptyDrawPile = [];
const player1 = new Player(1, emptyDrawPile);

player1.addToDiscardPile([
  new Card(1),
  new Card(2),
  new Card(3),
  new Card(4),
  new Card(5),
]);

describe("a player with an empty draw pile tries to draw a card", () => {
  player1.drawCard();

  test("discard pile should have a length of 0", () => {
    expect(player1.sizeOfDiscardPile()).toEqual(0);
  });

  test("draw pile should have a length of 4", () => {
    expect(player1.sizeOfDrawPile()).toEqual(4);
  });

  test("draw pile should been shuffled or not equal to discard pile", () => {
    expect(player1.getDrawPile()).not.toEqual(player1.getDiscardPile());
  });
});
