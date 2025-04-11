// import productsManager from "../data/fs/products.fs.js";
import productsManager from "../data/mongo/products.mongo.js";
import usersManager from "../data/mongo/users.mongo.js";
import cartsManager from "../data/mongo/carts.mongo.js";
import mongoose from "mongoose";

const indexView = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const productView = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
const cartView = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const carts = (await cartsManager.readProductsFromUser(user_id)) || [];
    const total = await cartsManager.totalToPay(user_id);

    const totalAmount = total && total.length > 0 ? total[0].total : 0;

    return res
      .status(200)
      .render("cart", { title: "CART", carts, total: totalAmount });
  } catch (error) {
    next(error);
  }
};

const registerView = (req, res, next) => {
  try {
    const data = {
      title: "Real Register",
    };
    return res.status(200).render("realRegister", data);
  } catch (error) {
    next(error);
  }
};

const registerUser = (req, res, next) => {
  try {
    const data = {
      title: "User Register",
    };
    return res.status(200).render("userRegister", data);
  } catch (error) {
    next(error);
  }
};

const loginView = (req, res, next) => {
  try {
    const data = {
      title: "Login Form",
    };
    return res.status(200).render("login", data);
  } catch (error) {
    next(error);
  }
};

const profileView = (req, res) => {
  try {
    res.status(200).render("profile");
  } catch (error) {
    res.status(500).render("error");
  }
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
