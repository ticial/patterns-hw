import { logger } from "..";
import { List } from "../data/models/list";
import { ReorderCardsParams, ReorderService } from "./reorder.service";

//PATTERN: Proxy
class ReorderServiceWithLogger {
  public static reorderLists<T>(
    items: T[],
    startIndex: number,
    endIndex: number
  ): T[] {
    logger.info(`reorderLists(${startIndex},${endIndex})`);

    return ReorderService.reorderLists(items, startIndex, endIndex);
  }

  public static reorderCards(params: ReorderCardsParams): List[] {
    logger.info(`reorderCards(${JSON.stringify(params)})`);

    return ReorderService.reorderCards(params);
  }
}

export { ReorderServiceWithLogger };
