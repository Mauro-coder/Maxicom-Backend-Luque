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
    this.create("/", passportCb("admin"), isValidProduct, createProduct);
    this.read("/", readProducts);
    this.read("/pages", paginate);
    this.read("/:pid", readOneProduct);
    this.update("/:pid", passportCb("admin"), updateProduct);
    this.destroy("/:pid", passportCb("admin"), destroyProduct);
    this.router.param("pid", pidParam);
  };
}

let productsRouter = new ProductsRouter();
productsRouter = productsRouter.getRouter();
export default productsRouter;
