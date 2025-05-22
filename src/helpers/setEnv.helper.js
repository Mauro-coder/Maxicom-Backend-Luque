import { config } from "dotenv";
import args from "./setArgs.helper.js";

const { mode } = args;
const path = ".env" + (mode && "." + mode);

config({ path });

const SERVER_PORT = process.env.SERVER_PORT;
const MONGO_URL = process.env.MONGO_URL;

const COOKIE_KEY = process.env.COOKIE_KEY;
const SESSION_KEY = process.env.SESSION_KEY;
const SECRET = process.env.SECRET;

const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;

const env = {
  SERVER_PORT,
  MONGO_URL,
  COOKIE_KEY,
  SESSION_KEY,
  SECRET,
  GOOGLE_ID,
  GOOGLE_SECRET,
};

export default env;
