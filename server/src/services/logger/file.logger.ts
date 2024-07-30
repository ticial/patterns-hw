import * as fs from "fs";
import * as path from "path";
import { LogObserver } from "../../common/types/observer.interface";
import { ValueOf } from "../../common/types/types";
import { LogLevel } from "../../common/enums/enums";

// PATTERN:Observer
class FileLogger implements LogObserver {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  public update(logLevel: ValueOf<typeof LogLevel>, message: string): void {
    fs.appendFile(this.filePath, message, (err) => {
      if (err) console.error("Failed to write to log file", err);
    });
  }
}

export { FileLogger };
