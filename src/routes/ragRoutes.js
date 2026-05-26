import express from "express";
import {
  guardarDocumento,
  buscarSimilares
} from "../services/ragService.js";

const router = express.Router();

router.post("/guardar", async (req, res) => {
  try {
    const { texto } = req.body;

    const data = await guardarDocumento(texto);

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
});

router.post("/buscar", async (req, res) => {
  try {
    const { texto } = req.body;

    const data = await buscarSimilares(texto);

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
});

export default router;