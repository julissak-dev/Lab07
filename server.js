import express from "express";
import cors from "cors";

import db from "./app/models/index.js";

import authRoutes from "./app/routes/auth.routes.js";
import testRoutes from "./app/routes/test.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

// Ruta principal
app.get("/", (req, res) => {
  res.json({
    message: "Servidor funcionando correctamente"
  });
});

// Crear roles iniciales
const initialRoles = async () => {
  const roles = ["user", "moderador", "admin"];

  for (const name of roles) {
    await db.role.findOrCreate({
      where: { name }
    });
  }

  console.log("Roles verificados");
};

const PORT = process.env.PORT || 3000;

// Conexión DB
db.sequelize
  .sync()
  .then(async () => {

    console.log("Base de datos sincronizada");

    await initialRoles();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });

  })
  .catch((err) => {
    console.error("Error al sincronizar la base de datos:", err);
  });