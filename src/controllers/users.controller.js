//import usersManager from "../data/fs/users.fs.js";
import usersManager from "../data/mongo/users.mongo.js";

const createUser = async (req, res) => {
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
    const response = await usersManager.createOne(data);
    res.status(201).json({
      response,
      method: req.method,
      url: req.url,
    });
};

const readUsers = async (req, res) => {
    const filter = req.query;
    const response = await usersManager.readAll(filter);
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
};

const readById = async (req, res) => {
    const { uid } = req.params;
    const response = await usersManager.readById(uid);
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
};

const updateById = async (req, res) => {
    const { uid } = req.params;
    const data = req.body;
    const response = await usersManager.readById(uid);
    if (!response) {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
    await usersManager.updateById(uid, data);
    res.status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
};

const destroyById = async (req, res) => {
    const { uid } = req.params;
    const response = await usersManager.destroyById(uid);
    if (!response) {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
    await usersManager.destroyById(uid);
    res.status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
};


export { 
  createUser,
  readUsers,
  readById,
  updateById,
  destroyById,
};