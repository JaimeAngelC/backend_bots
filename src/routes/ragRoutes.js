import express from "express";
import multer from "multer";

import { procesarPDF }
  from "../services/pdfService.js";

import { guardarChunks }
  from "../services/ragService.js";

import { generarEmbedding }
  from "../services/embeddingService.js";

import { buscarSimilares }
  from "../services/vectorService.js";

import { generarRespuesta }
  from "../services/chatService.js";

const router = express.Router();

const upload = multer({
  dest: "src/uploads/"
});


// =========================
// SUBIR PDF
// =========================

router.post(
  "/upload-pdf",
  upload.single("pdf"),

  async (req, res) => {

    try {

      const chunks =
        await procesarPDF(req.file.path);

      await guardarChunks(chunks);

      res.json({
        message:
          "PDF procesado correctamente",

        totalChunks:
          chunks.length
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });
    }
  }
);


// =========================
// PREGUNTAR
// =========================

router.post(
  "/preguntar",

  async (req, res) => {

    try {

      const { pregunta } = req.body;

      // embedding pregunta
      const embedding =
        await generarEmbedding(
          pregunta
        );

      // buscar similares
      const resultados = await buscarSimilares(embedding);

      console.log("resultado "+resultados[0].similarity);

      if (
        resultados.length === 0 ||
        resultados[0].similarity < 0.55
      ) {

        return res.json({
          pregunta,
          respuesta:
            "No encontré información relacionada en el documento.",
          contexto: []
        });
      }

      // unir contexto
      const contexto =
        resultados
          .map(r => r.content)
          .join("\n\n")
          .slice(0, 800);

      // generar respuesta IA
      const respuesta =
        await generarRespuesta(
          pregunta,
          contexto
        );

      res.json({
        pregunta,
        respuesta,
        contexto: resultados
      });

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