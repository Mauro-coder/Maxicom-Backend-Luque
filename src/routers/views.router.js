import CustomRouter from "./custom.router.js";
import {
  indexView,
  productView,
  cartView,
  registerView,
  registerUser,
  profileView,
  loginView,
} from "../controllers/views.controller.js";

class ViewsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", indexView);
    this.read("/register", registerView);
    this.read("/registeruser", registerUser);
    this.read("/login", loginView);
    this.read("/profile/:user_id", profileView);
    this.read("/product/:pid", productView);
    this.read("/cart/:user_id", cartView);
  };
}


const viewsRouter = new ViewsRouter()
export default viewsRouter.getRouter();