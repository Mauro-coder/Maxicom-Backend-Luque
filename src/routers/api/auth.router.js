import CustomRouter from "../custom.router.js";
import {
  login,
  register,
  online,
  signout,
  badAuth,
  google,
} from "../../controllers/auth.controller.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class AuthRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.create("/online", ["USER", "ADMIN"], online);
    this.create("/signout", ["USER", "ADMIN"], signout);
    this.read("/bad-auth", ["PUBLIC"], badAuth);
    this.read(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", {
        scope: ["email", "profile"],
        failureRedirect: "/api/auth/bad-auth",
      })
    );
    this.read(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/auth/bad-auth",
      }),
      google
    );

  };
}

const authRouter = new AuthRouter();
export default authRouter.getRouter();
