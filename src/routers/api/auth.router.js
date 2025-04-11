import { Router } from "express";
import {
  login,
  register,
  online,
  signout,
  badAuth,
  google,
} from "../../controllers/auth.controller.js";
import passport from "../../middlewares/passport.mid.js";
import isUser from "../../middlewares/isUser.mid.js";

const authRouter = Router();

authRouter.post(
  "/register",
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/auth/bad-auth",
  }),
  register
);
authRouter.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/auth/bad-auth",
  }),
  login
);
authRouter.post("/online", isUser, online);
authRouter.post("/signout", isUser, signout);
authRouter.get("/bad-auth", badAuth);
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    failureRedirect: "/api/auth/bad-auth",
  })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auth/bad-auth",
  }),
  google
);
authRouter.get("/profile", isUser, async (req, res, next) => {
  try {
    const { user } = req;
    const profile = {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
    return res.status(200).json({ response: profile });
  } catch (error) {
    next(error);
  }
});

export default authRouter;
