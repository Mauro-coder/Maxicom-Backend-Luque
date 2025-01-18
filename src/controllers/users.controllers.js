import usersManager from "../data/fs/users.fs.js";

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

const readUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const all = await usersManager.readAll(role);
    if (all.length > 0) {
      return res.status(200).json({ response: all });
    }
    return res.status(404).json({ response: "Not found!" });
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || "API ERROR";
    return res.status(status).json({ error: message });
  }
};

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

export { createUser, readUsers, destroyUser }