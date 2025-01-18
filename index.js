import express from "express";
import router from "./src/routers/index.router.js";

/* server settings */
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

/* funcionalidades aplicadas al servidor */
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

/* router */
server.use("/", router);
server.get("*", (req, res) => res.status(404).send("NOT FOUND POINT"));