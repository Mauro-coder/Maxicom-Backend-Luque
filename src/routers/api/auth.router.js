import { Router } from "express";
import { login, register, online, signout, badAuth } from "../../controllers/auth.controller.js";
import passport from "../../middlewares/passport.mid.js";

const authRouter = Router();


authRouter.post("/register", passport.authenticate("register", { session: false, failureRedirect: "/api/auth/bad-auth" }), register);
authRouter.post("/login",passport.authenticate("login", { session: false, failureRedirect: "/api/auth/bad-auth" }) ,login);
authRouter.post("/online", online);
authRouter.post("/signout", signout);
authRouter.get("/bad-auth", badAuth);
export default authRouter;
