import { Socket } from "socket.io";
import { logger } from "..";

//PATTERN: Proxy
class SocketWithLogger {
  public constructor(
    protected handlerName: string,
    protected socket: Socket,
  ) {}

  private onEvent(eventName: string, callback: (...args: unknown[]) => void) {
    //PATTERN: Carrying
    return (...args: unknown[]) => {
      logger.info(`${this.handlerName}:${eventName}(${JSON.stringify(args)})`);
      callback(...args);
    };
  }

  public on(eventName: string, callback: (...args: unknown[]) => void) {
    this.socket.on(eventName, this.onEvent(eventName, callback));
    //PATTERN: Builder
    return this;
  }
}

export { SocketWithLogger };
