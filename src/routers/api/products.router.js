import { Router } from "express";
import {
  readOneProduct,
  readProducts,
  createProduct,
  updateProduct,
  destroyProduct,
  paginate,
} from "../../controllers/products.controller.js";
import isValidProduct from "../../middlewares/isValidProduct.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";

const productsRouter = Router();


productsRouter.get("/", readProducts);
productsRouter.post("/", isAdmin, isValidProduct, createProduct);
productsRouter.get("/pages", paginate);
productsRouter.get("/:pid", readOneProduct);
productsRouter.put("/:pid", updateProduct);
productsRouter.delete("/:pid", isAdmin, destroyProduct);

export default productsRouter;