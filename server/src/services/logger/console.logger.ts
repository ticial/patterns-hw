import { LogLevel } from "../../common/enums/log-level.enum";
import { LogObserver } from "../../common/types/observer.interface";
import { ValueOf } from "../../common/types/value-of.type";

const LogLevelFunctions = {
  [LogLevel.DEBUG]: console.debug,
  [LogLevel.LOG]: console.log,
  [LogLevel.INFO]: console.info,
  [LogLevel.WARN]: console.warn,
  [LogLevel.ERROR]: console.error,
};

// PATTERN:Observer
class ConsoleLogger implements LogObserver {
  public update(logLevel: ValueOf<typeof LogLevel>, message: string): void {
    LogLevelFunctions[logLevel](message);
  }
}

export { ConsoleLogger };
