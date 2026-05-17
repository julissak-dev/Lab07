import express from "express";
import { verifyToken, isAdmin, isModerator } from "../middleware/authJwt.js";

const router = express.Router();

router.get("/all", (req, res) => {
  res.send("Contenido público");
});

router.get("/user", verifyToken, (req, res) => {
  res.send("Acceso autorizado para usuario autenticado");
});

router.get("/admin", [verifyToken, isAdmin], (req, res) => {
  res.send("Acceso autorizado para administrador");
});

router.get("/moderator", [verifyToken, isModerator], (req, res) => {
  res.send("Acceso autorizado para moderador");
});

export default router;