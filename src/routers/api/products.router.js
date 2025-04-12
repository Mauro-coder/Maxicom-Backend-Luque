import { Router } from "express";
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

const productsRouter = Router();

productsRouter.param("pid", pidParam)
productsRouter.get("/", readProducts);
productsRouter.post("/", passportCb("admin"), isValidProduct, createProduct);
productsRouter.get("/pages", paginate);
productsRouter.get("/:pid", readOneProduct);
productsRouter.put("/:pid", passportCb("admin"), updateProduct);
productsRouter.delete("/:pid", passportCb("admin"), destroyProduct);

export default productsRouter;
