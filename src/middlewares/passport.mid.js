import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import usersManager from "../data/mongo/users.mongo.js";
import { createHash, verifyHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";
const {
  SECRET,
  GOOGLE_ID: clientID,
  GOGGLE_SECRET: clientSecret,
} = process.env;
const callbackURL = "http://localhost:8080/api/auth/google/callback";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const data = req.body;
        if (!data.city) {
          //const error = new Error("Invalid data");
          //error.statusCode = 400;
          //throw error;
          return done(null, null, { message: "Invalid data", statusCode: 400 });
        }
        const user = await usersManager.readOne({ email });
        if (user) {
          // const error = new Error("Invalid credentials");
          // error.statusCode = 401;
          // throw error;
          return done(null, null, {
            message: "Invalid credentials",
            statusCode: 401,
          });
        }
        data.password = createHash(password);
        const response = await usersManager.create(data);
        done(null, response);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const response = await usersManager.readOne({ email });
        if (!response) {
          return done(null, null, {
            message: "Invalid credentials",
            statusCode: 401,
          });
        }
        const verify = verifyHash(password, response.password);
        if (!verify) {
          return done(null, null, {
            message: "Invalid credentials",
            statusCode: 401,
          });
        }
        const data = {
          user_id: response._id,
          email: response.email,
          role: response.role,
        };
        const token = createToken(data);
        req.token = token;
        done(null, response);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "google",
  new GoogleStrategy(
    { clientID, clientSecret, callbackURL },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.id;
        let user = await usersManager.readOne({ email });
        if (!user) {
          user = {
            name: profile.name.givenName,
            avatar: profile.picture,
            email: profile.id,
            password: createHash(profile.id),
            city: "rafaela",
          };
          user = await usersManager.create(user);
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "current",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: SECRET,
    },
    async (data, done) => {
      try {
        const { user_id } = data;
        const user = await usersManager.readById(user_id);
        if (!user) {
          return done(null, null, {
            message: "Bad auth",
            statusCode: 401,
          });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "admin",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: SECRET,
    },
    async (data, done) => {
      try {
        const { user_id } = data;
        const user = await usersManager.readById(user_id);
        if (!user) {
          return done(null, null, {
            message: "Bad auth",
            statusCode: 401,
          });
        }
        if (user.role !== "admin") {
          return done(null, null, {
            message: "Forbidden",
            statusCode: 403,
          });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
export default passport;
