import http from "http";
import router from "./router.js";

const server = http.createServer(router);
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);