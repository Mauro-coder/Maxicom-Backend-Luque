import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import usersManager from "../data/mongo/users.mongo.js";
import { createHash, verifyHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";
const clientID = process.env.GOOGLE_ID;
const clientSecret = process.env.GOOGLE_SECRET;
const callbackURL = "http://localhost:8080/api/auth/google/callback";

passport.use(
  "register",
  new LocalStrategy(
    /* objeto de configuración de la estrategia */
    { passReqToCallback: true, usernameField: "email" },
    /* callback de la estrategia (lógica de autenticación/autorizacion) */
    async (req, email, password, done) => {
      try {
        /* la lógica del register está actualmente en la ruta del register */
        /* para mayor ordenamiento de la autenticación */
        /* esa lógica se viene para la estrategia */
        const data = req.body;
        /* validar propiedades obligatorias */
        if (!data.city) {
          const error = new Error("Invalid data");
          error.statusCode = 400;
          throw error;
        }
        /* validar el no re-registro del usuario */
        const user = await usersManager.readOne({ email });
        if (user) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        /* proteger la contraseña */
        data.password = createHash(password);
        /* crear al usuario */
        const response = await usersManager.create(data);
        /* el segundo parametro del done agrega al objeto de requerimientos */
        /* una propiedad user con los datos del usuario */
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
    /* objeto de configuración de la estrategia */
    { passReqToCallback: true, usernameField: "email" },
    /* callback de la estrategia (lógica de autenticación/autorizacion) */
    async (req, email, password, done) => {
      try {
        /* la lógica del login está actualmente en la ruta del register */
        /* para mayor ordenamiento de la autenticación */
        /* esa lógica se viene para la estrategia */
        /* validar si el usuario existe en la base de datos */
        const response = await usersManager.readOne({ email });
        if (!response) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        /* validar la contraseña */
        const verify = verifyHash(password, response.password);
        if (!verify) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        const data = {
          user_id: response._id,
          email: response.email,
          role: response.role,
        };
        const token = createToken(data)
        req.token = token;
        /* el segundo parametro del done agrega al objeto de requerimientos */
        /* una propiedad user con los datos del usuario */
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
            city: "rafaela"
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
export default passport;
