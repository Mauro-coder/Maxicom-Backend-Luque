import CustomRouter from "../custom.router.js";
import {
  addProductToCart,
  readProductsFromUser,
  updateQuantity,
  removeProductFromCart,
  totalToPay,
} from "../../controllers/carts.controller.js";

class CartsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", addProductToCart);
    this.read("/users/:user_id", readProductsFromUser);
    this.update("/:cart_id", updateQuantity);
    this.destroy("/:cart_id", removeProductFromCart);
    this.read("/total/:user_id", totalToPay);
    this.router.param("id", (req, res, next, id) => {
      try {
        if (!Types.ObjectId.isValid(id)) {
          const error = new Error("Invalid ID");
          error.statusCode = 400;
          throw error;
        }
        next();
      } catch (error) {
        next(error);
      }
    });
  };
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();
