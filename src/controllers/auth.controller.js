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
    const response = req.user;
    const token = req.token;
    const opts = { maxAge: 60*60*24*7, httpOnly: true }
    res.cookie("token", token, opts).status(200).json({
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
    const user = req.user;
    if (user?._id) {
      res.status(200).json({
        user_id: user._id,
        user_role: user.role,
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
    res.clearCookie("token").status(200).json({
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
