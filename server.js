import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import authRoutes from "./app/routes/auth.routes.js";
import testRoutes from "./app/routes/test.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

const initialRoles = async () => {
  const roles = ["user", "moderador", "admin"];

  for (const name of roles) {
    await db.role.findOrCreate({ where: { name } });
  }
};

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(async () => {
  console.log("Base de datos sincronizada");
  await initialRoles();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}).catch(err => {
  console.error("Error al sincronizar la base de datos:", err);
});