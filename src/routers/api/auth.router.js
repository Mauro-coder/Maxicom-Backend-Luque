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
import isUser from "../../middlewares/isUser.mid.js";

class AuthRouter extends CustomRouter {
  constructor() {
    super()
    this.init()
  }
  init =()=> {
    this.create(
      "/register",
      passportCb("register"),
      register
    );
    this.create(
      "/login",
      passportCb("login"),
      login
    );
    this.create(
      "/online",
      passportCb("current"),
      online
    );
    this.create(
      "/signout",
      passportCb("current"),
      signout
    );
    this.read(
      "/google",
      passport.authenticate("google", {
        scope: ["email", "profile"],
        failureRedirect: "/api/auth/bad-auth",
      })
    );
    this.read(
      "/google/callback",
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/auth/bad-auth",
      }),
      google
    );
    this.read("/profile", isUser, async (req, res, next) => {
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
  }
}


const authRouter = new AuthRouter()
export default authRouter.getRouter();
