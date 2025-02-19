import { Router } from "express";
import {
  createUser,
  readUsers,
  readById,
  updateById,
  destroyById,
} from "../../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.post("/", createUser);
usersRouter.get("/", readUsers);
usersRouter.get("/:uid", readById);
usersRouter.put("/:uid", updateById);
usersRouter.delete("/:uid", destroyById);

export default usersRouter;
