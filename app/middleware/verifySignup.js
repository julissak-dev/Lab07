import db from "../models/index.js";

const User = db.user;
const Role = db.role;

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const userByUsername = await User.findOne({ where: { username: req.body.username } });
    if (userByUsername) {
      return res.status(400).send({ message: "El nombre de usuario ya está en uso" });
    }

    const userByEmail = await User.findOne({ where: { email: req.body.email } });
    if (userByEmail) {
      return res.status(400).send({ message: "El email ya está registrado" });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: error.message || "Error en la validación" });
  }
};

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    const roles = Array.isArray(req.body.roles) ? req.body.roles : [req.body.roles];
    for (let i = 0; i < roles.length; i++) {
      if (!db.ROLES.includes(roles[i])) {
        return res.status(400).send({
          message: `Rol no existe: ${roles[i]}`
        });
      }
    }
  }

  next();
};
