// import productsManager from "../data/fs/products.fs.js";
import productsManager from "../data/mongo/products.mongo.js";
import mongoose from 'mongoose';


const indexView = async (req, res, next) => {
  try {
    const all = await productsManager.readAll();
    const data = {
      title: "Home",
      products: all,
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
const cartView = (req, res, next) => {
  try {
    const data = {
      title: "Cart",
    };
    return res.status(200).render("cart", data);
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

const profileView = (req, res, next) => {
  try {
    const data = {
      title: "Profile",
    };
    return res.status(200).render("profile", data);
  } catch (error) {
    next(error);
  }
};

export { indexView, productView, cartView, registerView ,profileView };