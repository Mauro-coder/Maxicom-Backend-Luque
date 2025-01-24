import { Router } from "express";
import {
  createUser,
  readUsers,
  readOneUser,
  updateUser,
  destroyUser,
} from "../../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.post("/", createUser);
usersRouter.get("/", readUsers);
usersRouter.get("/:uid", readOneUser);
usersRouter.put("/:uid", updateUser);
usersRouter.delete("/:uid", destroyUser);

export default usersRouter;