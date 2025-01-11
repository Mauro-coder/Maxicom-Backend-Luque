import express from "express";
import productsManager from "./src/data/fs/products.fs.js";
import usersManager from "./src/data/fs/users.fs.js";

/* server settings */
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

/* funcionalidades aplicadas al servidor */
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

/* router */
const indexPoint = "/";
const indexCb = (req, res) => res.status(200).send("WELCOME TO COMMERCE");
server.get(indexPoint, indexCb);

const apiPoint = "/api";
const apiCb = (req, res) => res.status(200).send("WELCOME TO MY API");
server.get(apiPoint, apiCb);

const readOneProduct = async (req, res) => {
  const { pid } = req.params;
  const one = await productsManager.readOne(pid);
  if (one) {
    return res.status(200).json({ response: one });
  }
  return res.status(404).json({ response: "Not found!" });
};
server.get("/api/products/:pid", readOneProduct);

const readProducts = async (req, res) => {
  const { category } = req.query;
  const all = await productsManager.readAll(category);
  if (all.length > 0) {
    return res.status(200).json({ response: all });
  }
  return res.status(404).json({ response: "Not found!" });
};
server.get("/api/products", readProducts);

const createProduct = async (req, res) => {
  const data = req.body;
  const one = await productsManager.create(data);
  return res.status(201).json({ response: one });
};
server.post("/api/products", createProduct);

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
server.put("/api/products/:pid", updateProduct);

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
server.delete("/api/products/:pid", destroyProduct);

const createUser = async (req, res) => {
  try {
    const data = req.body;
    if (!data.email) {
      const error = new Error("Type email!");
      error.statusCode = 400;
      throw error;
    }
    if (!data.password) {
      const error = new Error("Type password!");
      error.statusCode = 400;
      throw error;
    }
    if (!data.age) {
      const error = new Error("Type age!");
      error.statusCode = 400;
      throw error;
    }
    if (data.age < 18) {
      const error = new Error("At least 18!");
      error.statusCode = 400;
      throw error;
    }
    const one = await usersManager.create(data);
    return res.status(201).json({ response: one });
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || "API ERROR";
    return res.status(status).json({ error: message });
  }
};
server.post("/api/users", createUser);

const destroyUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.destroyOne(uid);
    return res.status(200).json({ response: one });
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || "API ERROR";
    return res.status(status).json({ error: message });
  }
};
server.delete("/api/users/:uid", destroyUser);

/* server.get("/api/:name/:age", (req, res) => {
  const { name, age } = req.params;
  const message = `Hola ${name}! Tienes ${age} años!`;
  return res.status(200).send(message);
}); */

/* server.get("/api/welcome", (req, res) => {
  const { name, age } = req.query;
  const message = `Hola ${name || "Coder"}! Tienes ${age || 18} años!`;
  return res.status(200).send(message);
}); */

/* las rutas inexistes SIEMPRE van al final*/
server.get("*", (req, res) => res.status(404).send("NOT FOUND POINT"));