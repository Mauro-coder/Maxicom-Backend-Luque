//import productsManager from "../data/fs/products.fs.js";
import { Types } from "mongoose";
import productsManager from "../data/mongo/products.mongo.js";

const createProduct = async (req, res) => {
  const data = req.body;
  const response = await productsManager.create(data);
  res.json201(response);
};
const readProducts = async (req, res) => {
  const filter = req.query;
  const response = await productsManager.readAll(filter);
  if (response.length === 0) {
    res.json404();
  }
  res.json200(response);
};
const readOneProduct = async (req, res) => {
  const { pid } = req.params;
  const response = await productsManager.readById(pid);
  if (!response) {
    res.json404();
  }
  res.json200(response);
};
const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const data = req.body;
  const response = await productsManager.readById(pid);
  if (!response) {
    res.json404();
  }
  await productsManager.updateById(pid, data);
  res.json200(response);
};
const destroyProduct = async (req, res) => {
  const { pid } = req.params;
  const response = await productsManager.destroyById(pid);
  if (!response) {
    res.json404();
  }
  await productsManager.destroyById(pid);
  res.json200(response);
};
const paginate = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const { docs, prevPage, nextPage } = await productsManager.paginate(
    page,
    limit
  );
  return res.status(200).json({ response: { docs, prevPage, nextPage } });
};
const pidParam = async (req, res, next, pid) => {
  const isObjectId = Types.ObjectId.isValid(pid);
  if (isObjectId) return next();
  const error = new Error("Invalid ID");
  error.statusCode = 400;
  throw error;
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
