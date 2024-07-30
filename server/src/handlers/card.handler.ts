import type { Socket } from "socket.io";

import { CardEvent } from "../common/enums/enums";
import { Card } from "../data/models/card";
import { SocketHandler } from "./socket.handler";
import {
  forEachCard,
  removeCard,
  ReorderServiceWithLogger,
  SocketWithLogger,
} from "../services/services";

class CardHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    const socketWithLogger = new SocketWithLogger("CardHandler", socket);
    socketWithLogger
      .on(CardEvent.CREATE, this.createCard.bind(this))
      .on(CardEvent.REORDER, this.reorderCards.bind(this))
      .on(CardEvent.DELETE, this.deleteCard.bind(this))
      .on(CardEvent.RENAME, this.renameCard.bind(this))
      .on(CardEvent.CHANGE_DESCRIPTION, this.changeCardDescription.bind(this))
      .on(CardEvent.COPY, this.copyCard.bind(this));
  }

  public createCard(listId: string, cardName: string): void {
    const newCard = new Card(cardName, "");
    const lists = this.db.getData();

    const updatedLists = lists.map((list) =>
      list.id === listId ? list.setCards(list.cards.concat(newCard)) : list
    );

    this.db.setData(updatedLists);
    this.updateLists();
  }

  private reorderCards({
    sourceIndex,
    destinationIndex,
    sourceListId,
    destinationListId,
  }: {
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): void {
    const lists = this.db.getData();
    const reordered = ReorderServiceWithLogger.reorderCards({
      lists,
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId,
    });
    this.db.setData(reordered);
    this.updateLists();
  }

  private deleteCard(cardId: string): void {
    const lists = this.db.getData();
    const updatedLists = removeCard(lists, cardId);
    this.db.setData(updatedLists);
    this.updateLists();
  }

  private renameCard(cardId: string, name: string): void {
    const lists = this.db.getData();
    forEachCard(lists, (card) => {
      if (card.id === cardId) {
        card.name = name;
        return true;
      }
    });
    this.db.setData(lists);
    this.updateLists();
  }

  private changeCardDescription(cardId: string, description: string): void {
    const lists = this.db.getData();
    forEachCard(lists, (card) => {
      if (card.id === cardId) {
        card.description = description;
        return true;
      }
    });
    this.db.setData(lists);
    this.updateLists();
  }

  private copyCard(cardId: string): void {
    const lists = this.db.getData();
    forEachCard(lists, (card, list) => {
      if (card.id === cardId) {
        // PATTERN:Prototype
        const newCard = card.clone();
        list.setCards(list.cards.concat(newCard));
        return true;
      }
    });
    this.db.setData(lists);
    this.updateLists();
  }
}

export { CardHandler };
