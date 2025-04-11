import { Router } from "express";
import {
  indexView,
  productView,
  cartView,
  registerView,
  registerUser,
  profileView,
  loginView,
} from "../controllers/views.controller.js";

const viewsRouter = Router();

viewsRouter.get("/", indexView);
viewsRouter.get("/register", registerView);
viewsRouter.get("/registeruser", registerUser);
viewsRouter.get("/login", loginView);
viewsRouter.get("/profile", profileView);
viewsRouter.get("/product/:pid", productView);
viewsRouter.get("/cart/:user_id", cartView);

export default viewsRouter;