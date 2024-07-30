import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { lists } from "./assets/mock-data";
import { Database } from "./data/database";
import { CardHandler, ListHandler } from "./handlers/handlers";
import { ConsoleLogger, FileLogger, LoggerService } from "./services/services";

const PORT = 3005;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const db = Database.Instance;

const logger = LoggerService.Instance;
logger.addObserver(new FileLogger("logs/server.log"));
logger.addObserver(new ConsoleLogger());

if (process.env.NODE_ENV !== "production") {
  db.setData(lists);
}

const onConnection = (socket: Socket): void => {
  new ListHandler(io, db).handleConnection(socket);
  new CardHandler(io, db).handleConnection(socket);
};

io.on("connection", onConnection);

httpServer.listen(PORT, () => logger.log(`Listening on port: ${PORT}`));

export { httpServer, logger };
