import { describe, expect, test } from "vitest";

import Deck from "../Deck";

const deck = new Deck();
const shuffledDeck = deck.shuffle();

describe("deck", () => {
  test("cards in a deck should be 40", () => {
    expect(deck.getCards()).toHaveLength(40);
  });

  test("shuffled decks should not be equal", () => {
    expect(deck.getCards()).not.toEqual(shuffledDeck);
  });
});
