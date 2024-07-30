import { Card } from "../data/models/card";
import { List } from "../data/models/list";
import * as R from "ramda";

type ReorderCardsParams = {
  lists: List[];
  sourceIndex: number;
  destinationIndex: number;
  sourceListId: string;
  destinationListId: string;
};

class ReorderService {
  public static reorderLists<T>(
    items: T[],
    startIndex: number,
    endIndex: number
  ): T[] {
    const removedItem = items[startIndex];
    const withoutItem = R.remove(startIndex, 1, items);
    return R.insert(endIndex, removedItem, withoutItem);
  }

  public static reorderCards({
    lists,
    sourceIndex,
    destinationIndex,
    sourceListId,
    destinationListId,
  }: ReorderCardsParams): List[] {
    const target: Card = lists.find((list) => list.id === sourceListId)
      ?.cards?.[sourceIndex];

    if (!target) {
      return lists;
    }

    const newLists = lists.map((list) => {
      if (list.id === sourceListId) {
        list.setCards(R.remove(sourceIndex, 1, list.cards));
      }

      if (list.id === destinationListId) {
        list.setCards(R.insert(destinationIndex, target, list.cards));
      }

      return list;
    });

    return newLists;
  }
}

export { ReorderService, ReorderCardsParams };
