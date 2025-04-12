import usersManager from "../data/mongo/users.mongo.js";

const register = async (req, res) => {
  const response = req.user;
  res.json201(response, "Registered");
};
const login = async (req, res) => {
  const response = req.user;
  const token = req.token;
  const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true };
  res.cookie("token", token, opts).json200(response, "Logged in");
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
  res.clearCookie("token").json200(null, "Signed out");
};
const badAuth = async (req, res) => {
  res.json401("Bad auth from redirect");
};
const google = async (req, res) => {
  const response = req.user;
  res.json200(response);
};

export { register, login, online, signout, badAuth, google };
