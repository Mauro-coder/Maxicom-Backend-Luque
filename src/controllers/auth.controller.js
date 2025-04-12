import usersManager from "../data/mongo/users.mongo.js";

const register = async (req, res) => {
    const userCreated = req.user;
    res.status(201).json({
      response: userCreated,
      method: req.method,
      url: req.url,
    });
};
const login = async (req, res) => {
    const response = req.user;
    const token = req.token;
    const opts = { maxAge: 60*60*24*7, httpOnly: true }
    res.cookie("token", token, opts).status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
};
const online = async (req, res) => {
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
};
const signout = async (req, res) => {
    res.clearCookie("token").status(200).json({
      message: "Signed out",
      method: req.method,
      url: req.originalUrl,
    });
};
const badAuth = async (req, res) => {
    const error = new Error("Bad auth from redirect");
    error.statusCode = 401;
    throw error;
};
const google = async (req, res)=>{
    const response = req.user;
    res.status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
}

export { register, login, online, signout, badAuth, google};
