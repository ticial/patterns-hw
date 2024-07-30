import type { Socket } from "socket.io";

import { ListEvent } from "../common/enums/enums";
import { List } from "../data/models/list";
import { SocketHandler } from "./socket.handler";
import {
  ReorderServiceWithLogger,
  SocketWithLogger,
} from "../services/services";

class ListHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    const socketWithLogger = new SocketWithLogger("ListHandler", socket);
    socketWithLogger
      .on(ListEvent.CREATE, this.createList.bind(this))
      .on(ListEvent.GET, this.getLists.bind(this))
      .on(ListEvent.REORDER, this.reorderLists.bind(this))
      .on(ListEvent.DELETE, this.deleteList.bind(this))
      .on(ListEvent.RENAME, this.renameList.bind(this));
  }

  private getLists(callback: (cards: List[]) => void): void {
    callback(this.db.getData());
  }

  private reorderLists(sourceIndex: number, destinationIndex: number): void {
    const lists = this.db.getData();
    const reorderedLists = ReorderServiceWithLogger.reorderLists(
      lists,
      sourceIndex,
      destinationIndex
    );
    this.db.setData(reorderedLists);
    this.updateLists();
  }

  private createList(name: string): void {
    const lists = this.db.getData();
    const newList = new List(name);
    this.db.setData(lists.concat(newList));
    this.updateLists();
  }

  private deleteList(id: string): void {
    const lists = this.db.getData();
    this.db.setData(lists.filter((list) => list.id !== id));
    this.updateLists();
  }

  private renameList(id: string, name: string): void {
    const lists = this.db.getData();
    const newList = lists.map((list) => {
      if (list.id === id) {
        list.name = name;
      }
      return list;
    });
    this.db.setData(newList);
    this.updateLists();
  }
}

export { ListHandler };
