import usersManager from "../data/mongo/users.mongo.js";

const register = async (req, res, next) => {
  try {
    const userCreated = req.user;
    res.status(201).json({
      response: userCreated,
      method: req.method,
      url: req.url,
    });
  } catch (error) {
    next(error);
  }
};


const login = async (req, res, next) => {
  try {
    const user = req.user;
    const token = req.token;
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};


const online = async (req, res, next) => {
  try {
    if (req.user_id) {
      res.status(200).json({
        user_id: req.user_id,
        user_role: req.role,
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
    res.status(200).json({
      message: "Signed out",
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

const badAuth = async (req, res, next) => {
  try {
    const error = new Error("Bad auth from redirect");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    next(error);
  }
};
const google = async (req, res, next)=>{
  try {
    const response = req.user;
    res.status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error)
  }
}

export { register, login, online, signout, badAuth, google};
