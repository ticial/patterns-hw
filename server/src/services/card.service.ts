import { Card } from "../data/models/card";
import { List } from "../data/models/list";
import * as R from "ramda";

const removeCard = (lists: List[], cardId: string) => {
  return lists.map((list) => {
    const cardIndex = list.cards.findIndex((card) => card.id === cardId);
    if (cardIndex !== -1) {
      list.setCards(R.remove(cardIndex, 1, list.cards));
    }
    return list;
  });
};

const updateCard = (
  lists: List[],
  cardId: string,
  update: (card: Card) => Card | undefined
) => {
  return lists.map((list) => {
    const card = list.cards.find((c) => c.id === cardId);
    if (card) {
      const updatedCard = update(card);
      if (updatedCard) {
        list.setCards(
          list.cards.map((c) => (c.id === card.id ? updatedCard : c))
        );
      }
    }
    return list;
  });
};

const forEachCard = (
  lists: List[],
  callbackStop: (card: Card, list: List) => boolean | void
) => {
  for (const list of lists) {
    for (const card of list.cards) {
      if (callbackStop(card, list)) {
        return;
      }
    }
  }
};

export { removeCard, updateCard, forEachCard };
