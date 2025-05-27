// import productsManager from "../data/fs/products.fs.js";
import { productsManager, usersManager, cartsManager } from "../data/dao.factory.js";

import mongoose from "mongoose";

const indexView = async (req, res) => {
    const all = await productsManager.readAll();
    const groupedProducts = all.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});
    const data = {
      title: "Home",
      groupedProducts,
    };
    return res.status(200).render("index", data);
};
const productView = async (req, res) => {
    const { pid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(pid)) {
      return res.status(400).render("product", { title: "Invalid Product ID" });
    }
    const one = await productsManager.readOne(pid);
    if (!one) {
      return res.status(404).render("product", { title: "Product Not Found" });
    }
    const data = {
      title: "Product Detail",
      product: one,
    };
    return res.status(200).render("product", data);
};
const cartView = async (req, res) => {
  try {
    const { user_id } = req.params;
    const carts = await cartsManager.readProductsFromUser(user_id);
    const total = await cartsManager.totalToPay(user_id);
    return res
      .status(200)
      .render("cart", { title: "CART", carts, total: total[0].total });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
};
const registerView = (req, res) => {
    const data = {
      title: "Real Register",
    };
    return res.status(200).render("realRegister", data);

};
const registerUser = (req, res) => {
  try {
    res.status(200).render("userRegister", { title: "REGISTER FORM" });
  } catch (error) {
    console.log(error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).render("error");
  }
};
const loginView = (req, res) => {
  try {
    res.status(200).render("login", { title: "LOGIN FORM" });
  } catch (error) {
    console.log(error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).render("error");
  }
};
const profileView = async (req, res) => {
  try {
    const { user_id } = req.params;
    const profile = await usersManager.readById(user_id);
    return res.status(200).render("profile", { title: "PROFILE", profile });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
};
const verifyView = (req, res) => {
  try {
    res.status(200).render("verify", { title: "VERIFY YOUR ACCOUNT" });
  } catch (error) {
    console.log(error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).render("error");
  }
};

export {
  indexView,
  productView,
  cartView,
  registerView,
  registerUser,
  loginView,
  profileView,
  verifyView,
};
