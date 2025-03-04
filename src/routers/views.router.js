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
viewsRouter.get("/product/:pid", productView);
viewsRouter.get("/profile/:user_id", profileView);
viewsRouter.get("/cart/:user_id", cartView);

export default viewsRouter;