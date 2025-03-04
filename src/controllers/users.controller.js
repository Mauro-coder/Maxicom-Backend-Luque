//import usersManager from "../data/fs/users.fs.js";
import usersManager from "../data/mongo/users.mongo.js";

const createUser = async (req, res, next) => {
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
    next(error);
  }
};

const readUsers = async (req, res, next) => {
  try {
    const { role } = req.query;
    const all = await usersManager.readAll(role);
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

const readById = async (req, res, next) => {
  try{
    const { uid } = req.params;
    const one = await usersManager.readById(uid);
    if (one) {
      return res.status(200).json({ response: one });
    }
    const error = new Error("Not Found");
    error.statusCode = 404;
    throw error;
  } catch (error) {
    next(error);
  }
}

const updateById = async (req, res, next) =>{
  try {
    const { uid } = req.params;
    const data = req.body;
    const one = await usersManager.updateById(uid, data);
    return res.status(200).json({response: one})
  } catch (error) {
    next(error);
  }
}

const destroyById = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.destroyById(uid);
    return res.status(200).json({ response: one });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const one = await usersManager.login(email, password);
    if (one) {
      return res.status(200).json({
        method: req.method,
        url: req.url,
        response: {
          user_id: one._id,
          role: one.role, // Devolver el rol del usuario
        },
      });
    }
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    next(error);
  }
};


export { 
  createUser,
  readUsers,
  readById,
  updateById,
  destroyById,
  login,
};