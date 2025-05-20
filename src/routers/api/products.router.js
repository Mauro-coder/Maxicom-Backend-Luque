import CustomRouter from "../custom.router.js";
import {
  readOneProduct,
  readProducts,
  createProduct,
  updateProduct,
  destroyProduct,
  paginate,
  pidParam,
} from "../../controllers/products.controller.js";
import isValidProduct from "../../middlewares/isValidProduct.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class ProductsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], isValidProduct, createProduct);
    this.read("/", ["PUBLIC"], readProducts);
    this.read("/pages", ["PUBLIC"], paginate);
    this.read("/:pid", ["PUBLIC"], readOneProduct);
    this.update("/:pid", ["ADMIN"], updateProduct);
    this.destroy("/:pid", ["ADMIN"], destroyProduct);
    this.router.param("pid", pidParam);
  };
}

let productsRouter = new ProductsRouter();
productsRouter = productsRouter.getRouter();
export default productsRouter;
