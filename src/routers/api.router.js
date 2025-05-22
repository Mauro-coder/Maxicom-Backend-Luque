import { fork } from "child_process";
import CustomRouter from "./custom.router.js";
import productsRouter from "./api/products.router.js";
import usersRouter from "./api/users.router.js";
import cartsRouter from "./api/carts.router.js";
import cookiesRouter from "./api/cookies.router.js";
import sessionsRouter from "./api/sessions.router.js";
import authRouter from "./api/auth.router.js";
import sum from "../helpers/sum.helper.js";

const sumCb = (req, res) => {
  const result = sum();
  return res.json200(result);
};

const sumProcessCb = (req, res) => {
  const childProcess = fork("./src/helpers/sumProcess.helper.js");
  childProcess.send("start");
  childProcess.on("message", result => {
    return res.json200(result);
  });
};

class ApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/cookies", cookiesRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/products", productsRouter);
    this.use("/users", usersRouter);
    this.use("/auth", authRouter);
    this.use("/carts", cartsRouter);
    this.read("/sum", ["PUBLIC"], sumCb);
    this.read("/sumProcess", ["PUBLIC"], sumProcessCb);
  };
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
