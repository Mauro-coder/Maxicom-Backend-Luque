import usersManager from "../data/mongo/users.mongo.js";

const register = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await usersManager.create(data);
    res.status(201).json({
      response,
      method: req.method,
      url: req.url,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await usersManager.login(email, password);
    if (!response) {
      const error = new Error("User not found or invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    req.session.user_id = response._id;
    req.session.email = email;
    req.session.role = response.role;
    res.status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

const online = async (req, res, next) => {
  try {
    if (req.session.user_id) {
      res.status(200).json({
        user_id: req.session.user_id,
        user_role: req.session.role,
        method: req.method,
        url: req.originalUrl,
      });
    } else {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const signout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.status(200).json({
      message: "Signed out",
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
export { register, login, online, signout, };
