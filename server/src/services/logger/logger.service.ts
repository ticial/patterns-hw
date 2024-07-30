import { LogLevel } from "../../common/enums/enums";
import { LogObserver, LogPublisher, ValueOf } from "../../common/types/types";

// PATTERN:Singleton
// PATTERN:Observer
class LoggerService implements LogPublisher {
  private static instance: LoggerService | null = null;

  private constructor() {}

  public static get Instance(): LoggerService {
    if (!this.instance) {
      this.instance = new LoggerService();
    }

    return this.instance;
  }

  private observers: LogObserver[] = [];
  addObserver(observer: LogObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: LogObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(logLevel: ValueOf<typeof LogLevel>, message: string): void {
    const logEntry = `[${logLevel.toUpperCase()}] ${new Date().toISOString()}: ${message}\n`;
    this.observers.forEach((obs) => obs.update(logLevel, logEntry));
  }

  public log(message: string): void {
    this.notifyObservers(LogLevel.LOG, message);
  }

  public debug(message: string): void {
    this.notifyObservers(LogLevel.DEBUG, message);
  }

  public info(message: string): void {
    this.notifyObservers(LogLevel.INFO, message);
  }

  public error(message: string): void {
    this.notifyObservers(LogLevel.ERROR, message);
  }

  public warn(message: string): void {
    this.notifyObservers(LogLevel.WARN, message);
  }
}

export { LoggerService };
