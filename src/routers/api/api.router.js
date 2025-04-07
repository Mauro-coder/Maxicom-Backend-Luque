import { Router } from "express";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import cartsRouter from "./carts.router.js";
import cookiesRouter from "./cookies.router.js";
import sessionsRouter from "./sessions.router.js";
import authRouter from "./auth.router.js";

const apiRouter = Router();

apiRouter.use("/cookies", cookiesRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/carts", cartsRouter);

export default apiRouter;