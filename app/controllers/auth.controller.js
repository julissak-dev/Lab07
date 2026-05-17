import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import authConfig from "../config/auth.config.js";

const User = db.user;
const Role = db.role;

export const signup = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({ message: "Todos los campos son obligatorios" });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).send({ message: "El nombre de usuario ya está en uso" });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).send({ message: "El email ya está registrado" });
    }

    const user = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 8)
    });

    const roleNames = roles ? (Array.isArray(roles) ? roles : [roles]) : [];
    if (roleNames.length > 0) {
      const roleRecords = await Role.findAll({ where: { name: roleNames } });
      await user.setRoles(roleRecords);
    } else {
      const defaultRole = await Role.findOne({ where: { name: "user" } });
      await user.setRoles([defaultRole]);
    }

    res.send({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error en el registro" });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ message: "Usuario y contraseña son requeridos" });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Contraseña inválida" });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.jwtExpiration
    });

    const roles = await user.getRoles();
    const authorities = roles.map(role => role.name);

    res.send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      role: authorities[0] || "user",
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error en el inicio de sesión" });
  }
};