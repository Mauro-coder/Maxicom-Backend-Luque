//import productsManager from "../data/fs/products.fs.js";
import { Types } from "mongoose";
import productsManager from "../data/mongo/products.mongo.js";

const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await productsManager.create(data);
    res.status(201).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
const readProducts = async (req, res, next) => {
  try {
    const filter = req.query;
    const response = await productsManager.readAll(filter);
    if (response.length === 0) {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
const readOneProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await productsManager.readById(pid);
    if (!response) {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const response = await productsManager.readById(pid);
    if (!response) {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
    await productsManager.updateById(pid, data);
    res.status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
const destroyProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await productsManager.destroyById(pid);
    if (!response) {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
    await productsManager.destroyById(pid);
    res.status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
const paginate = async (req, res, next) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const { docs, prevPage, nextPage } = await productsManager.paginate(
      page,
      limit
    );
    return res.status(200).json({ response: { docs, prevPage, nextPage } });
  } catch (error) {
    next(error);
  }
};
const pidParam = async (req, res, next, pid) => {
  try {
    const isObjectId = Types.ObjectId.isValid(pid);
    if (isObjectId) return next();
    const error = new Error("Invalid ID");
    error.statusCode = 400;
    throw error;
  } catch (error) {
    next(error);
  }
};
export {
  createProduct,
  readProducts,
  readOneProduct,
  updateProduct,
  destroyProduct,
  paginate,
  pidParam,
};
