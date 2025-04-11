import { Router } from "express";
import productsRouter from "./api/products.router.js";
import usersRouter from "./api/users.router.js";
import cartsRouter from "./api/carts.router.js";
import cookiesRouter from "./api/cookies.router.js";
import sessionsRouter from "./api/sessions.router.js";
import authRouter from "./api/auth.router.js";

const apiRouter = Router();

apiRouter.use("/cookies", cookiesRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/carts", cartsRouter);

export default apiRouter;