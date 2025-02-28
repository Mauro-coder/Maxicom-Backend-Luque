import bcrypt from "bcryptjs";
import User from "../data/mongo/models/users.model.js";


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    req.session.user = { id: user._id, email: user.email };

    res.status(200).json({ message: "Login exitoso", user });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export { login };
