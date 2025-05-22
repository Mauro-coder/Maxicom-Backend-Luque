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
    this.read("/",["PUBLIC","USER","ADMIN"], indexView);
    this.read("/register", ["ADMIN"], registerView);
    this.read("/registeruser", ["PUBLIC"], registerUser);
    this.read("/login", ["PUBLIC"], loginView);
    this.read("/profile/:user_id", ["USER"], profileView);
    this.read("/product/:pid", ["PUBLIC"], productView);
    this.read("/cart/:user_id", ["USER"], cartView);
  };
}


const viewsRouter = new ViewsRouter()
export default viewsRouter.getRouter();