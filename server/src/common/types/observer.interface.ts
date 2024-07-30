import { LogLevel } from "../enums/enums";
import { ValueOf } from "./types";

interface LogObserver {
  update(logLevel: ValueOf<typeof LogLevel>, message: string): void;
}

interface LogPublisher {
  addObserver(observer: LogObserver): void;
  removeObserver(observer: LogObserver): void;
  notifyObservers(logLevel: ValueOf<typeof LogLevel>, message: string): void;
}

export { LogObserver, LogPublisher };
