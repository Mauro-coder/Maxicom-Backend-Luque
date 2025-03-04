//import productsManager from "../data/fs/products.fs.js";
import productsManager from "../data/mongo/products.mongo.js";

const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await productsManager.create(data);
    return res.status(201).json({ response: one });
  } catch (error) {
    next(error);
  }
};

const readProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    const all = await productsManager.readAll(category);
    if (all.length > 0) {
      return res.status(200).json({ response: all });
    }
    const error = new Error("Not found");
    error.statusCode = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};

const readOneProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.readById(pid);
    if (one) {
      return res.status(200).json({ response: one });
    }
    const error = new Error("Not found");
    error.statusCode = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await productsManager.updateById(pid, data);
    return res.status(200).json({ response: one });
  } catch (error) {
    next(error);
  }
};

const destroyProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.destroyById(pid);
    return res.status(200).json({ response: one });
  } catch (error) {
    next(error);
  }
};

const paginate = async (req, res, next) => {
  try {
    const { page = 1, limit= 5 } = req.query
    const {docs, prevPage, nextPage} = await productsManager.paginate(page, limit)
    return res.status(200).json({ response: {docs, prevPage, nextPage} });
  } catch (error) {
    next(error)
  }
}

export {
  createProduct,
  readProducts,
  readOneProduct,
  updateProduct,
  destroyProduct,
  paginate,
};