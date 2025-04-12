import CustomRouter from "../custom.router.js";
import {
  createUser,
  readUsers,
  readById,
  updateById,
  destroyById,
} from "../../controllers/users.controller.js";

class UsersRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", createUser);
    this.read("/", readUsers);
    this.read("/:uid", readById);
    this.update("/:uid", updateById);
    this.destroy("/:uid", destroyById);
  };
}

const usersRouter = new UsersRouter()
export default usersRouter.getRouter();
