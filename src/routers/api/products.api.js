import { Router } from "express";
import {
  readOneProduct,
  readProducts,
  createProduct,
  updateProduct,
  destroyProduct,
} from "../../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get("/:pid", readOneProduct);
productsRouter.get("", readProducts);
productsRouter.post("", createProduct);
productsRouter.put("/:pid", updateProduct);
productsRouter.delete("/:pid", destroyProduct);

export default productsRouter;