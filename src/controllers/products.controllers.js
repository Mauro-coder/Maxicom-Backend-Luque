import productsManager from "../data/fs/products.fs.js";

const readOneProduct = async (req, res) => {
  const { pid } = req.params;
  const one = await productsManager.readOne(pid);
  if (one) {
    return res.status(200).json({ response: one });
  }
  return res.status(404).json({ response: "Not found!" });
};

const readProducts = async (req, res) => {
  const { category } = req.query;
  const all = await productsManager.readAll(category);
  if (all.length > 0) {
    return res.status(200).json({ response: all });
  }
  return res.status(404).json({ response: "Not found!" });
};

const createProduct = async (req, res) => {
  const data = req.body;
  const one = await productsManager.create(data);
  return res.status(201).json({ response: one });
};

const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await productsManager.updateOne(pid, data);
    return res.status(200).json({ response: one });
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || "API ERROR";
    return res.status(status).json({ error: message });
  }
};

const destroyProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.destroyOne(pid);
    return res.status(200).json({ response: one });
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || "API ERROR";
    return res.status(status).json({ error: message });
  }
};

export {
  readOneProduct,
  readProducts,
  createProduct,
  updateProduct,
  destroyProduct,
};