import { Router } from "express";
import apiRouter from "./api/index.api.js";

const router = Router();

router.use("/api", apiRouter);
router.get("/api/welcome", (req, res) => {
  //console.log(req.query);
  const { name, age } = req.query;
  const message = `Hola ${name || "Coder"}! Tienes ${age || 18} años!`;
  return res.status(200).send(message);
});

const indexPoint = "/";
const indexCb = (req, res) => res.status(200).send("WELCOME TO COMMERCE");
router.get(indexPoint, indexCb);

const apiPoint = "/api";
const apiCb = (req, res) => res.status(200).send("WELCOME TO MY API");
router.get(apiPoint, apiCb);

export default router;