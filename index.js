import "dotenv/config.js";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import __dirname from "./utils.js";
import connectMongo from "./src/helpers/mongo.helper.js";
import router from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import socketHelper from "./src/helpers/socket.helper.js";

/* express server settings */
const server = express();
const port = process.env.SERVER_PORT;
const ready = async () => {
  console.log("server ready on port " + port);
  await connectMongo(process.env.MONGO_URL);
};
const httpServer = createServer(server);
httpServer.listen(port, ready);

/* socket server settings */
const socketServer = new SocketServer(httpServer);
socketServer.on("connection", socketHelper);
export { socketServer };

/* template engine */
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

/* middlewares */
server.use(morgan("dev"));
server.use(express.static("public"));
server.use("/assets", express.static("assets"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser(process.env.COOKIE_KEY));

/* router */
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
