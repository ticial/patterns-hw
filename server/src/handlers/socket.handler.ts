import { Server, Socket } from "socket.io";

import { ListEvent } from "../common/enums/enums";
import { Database } from "../data/database";

abstract class SocketHandler {
  protected db: Database;

  protected io: Server;

  public constructor(io: Server, db: Database) {
    this.io = io;
    this.db = db;
  }

  public abstract handleConnection(socket: Socket): void;

  protected updateLists(): void {
    this.io.emit(ListEvent.UPDATE, this.db.getData());
  }
}

export { SocketHandler };
