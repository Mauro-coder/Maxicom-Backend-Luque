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
import passport from "../../middlewares/passport.mid.js";

const productsRouter = Router();

productsRouter.get("/", readProducts);
productsRouter.post(
  "/",
  passport.authenticate("admin", {
    session: false,
    failureRedirect: "/api/auth/bad-auth",
  }),
  isValidProduct,
  createProduct
);
productsRouter.get("/pages", paginate);
productsRouter.get("/:pid", readOneProduct);
productsRouter.put(
  "/:pid",
  passport.authenticate("admin", {
    session: false,
    failureRedirect: "/api/auth/bad-auth",
  }),
  updateProduct
);
productsRouter.delete(
  "/:pid",
  passport.authenticate("admin", {
    session: false,
    failureRedirect: "/api/auth/bad-auth",
  }),
  destroyProduct
);

export default productsRouter;
