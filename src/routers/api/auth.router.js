import { Router } from "express";
import { login, register, online, signout } from "../../controllers/auth.controller.js";

const authRouter = Router();


authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/online", online);
authRouter.post("/signout", signout);
export default authRouter;
