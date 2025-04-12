// import productsManager from "../data/fs/products.fs.js";
import productsManager from "../data/mongo/products.mongo.js";
import usersManager from "../data/mongo/users.mongo.js";
import cartsManager from "../data/mongo/carts.mongo.js";
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
    const { user_id } = req.params;
    const carts = (await cartsManager.readProductsFromUser(user_id)) || [];
    const total = await cartsManager.totalToPay(user_id);
    const totalAmount = total && total.length > 0 ? total[0].total : 0;
    return res
      .status(200)
      .render("cart", { title: "CART", carts, total: totalAmount });
};

const registerView = (req, res) => {
    const data = {
      title: "Real Register",
    };
    return res.status(200).render("realRegister", data);

};

const registerUser = (req, res) => {
    const data = {
      title: "User Register",
    };
    return res.status(200).render("userRegister", data);

};

const loginView = (req, res) => {
    const data = {
      title: "Login Form",
    };
    return res.status(200).render("login", data);
};

const profileView = (req, res) => {
    res.status(200).render("profile");
}

export {
  indexView,
  productView,
  cartView,
  registerView,
  registerUser,
  loginView,
  profileView,
};
