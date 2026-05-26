import express from "express";
import multer from "multer";
import { procesarPDF } from "../services/pdfService.js";
import { guardarChunks } from "../services/ragService.js";
import { buscarSimilares } from "../services/searchService.js";
/*import {guardarDocumento,buscarSimilares} from "../services/ragService.js";*/

const router = express.Router();

const upload = multer({
  dest: "src/uploads/"
});



router.post(
  "/upload-pdf",
  upload.single("pdf"),
  async (req, res) => {

    try {

      const chunks = await procesarPDF(
        req.file.path
      );

      await guardarChunks(chunks);

      res.json({
        message: "PDF procesado correctamente",
        totalChunks: chunks.length
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });
    }
  }
);

router.post(
  "/preguntar",
  async (req, res) => {

    try {

      const { pregunta } = req.body;

      const resultados =
        await buscarSimilares(pregunta);

      res.json(resultados);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });
    }
  }
);

export default router;

/*


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

*/