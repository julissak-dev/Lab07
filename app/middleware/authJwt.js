import jwt from "jsonwebtoken";
import db from "../models/index.js";
import authConfig from "../config/auth.config.js";

const User = db.user;

export const verifyToken = (req, res, next) => {
  let authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).send({ message: "No token provided!" });
  }

  let token = authHeader.split(" ")[1];

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    req.userId = decoded.id;
    next();
  });
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).send({ message: "Usuario no encontrado" });

    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({ message: "Requiere rol de administrador!" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error de autorización" });
  }
};

export const isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).send({ message: "Usuario no encontrado" });

    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderador") {
        return next();
      }
    }

    return res.status(403).send({ message: "Requiere rol de moderador!" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error de autorización" });
  }
};