import express from "express";
import multer from "multer";

import { procesarPDF }
from "../services/pdfService.js";

import { guardarChunks }
from "../services/ragServicePdf.js";

import { buscarSimilares }
from "../services/searchServicePdf.js";

import { generarRespuesta }
from "../services/chatServicePdf.js";

const router = express.Router();

const upload = multer({
  dest: "src/uploads/"
});

/**
 * SUBIR PDF
 */
router.post(
  "/upload-pdf",
  upload.single("pdf"),
  async (req, res) => {

    try {

      if (!req.file) {

        return res.status(400).json({
          error: "Debe enviar un PDF"
        });

      }

      const chunks =
        await procesarPDF(
          req.file.path
        );

      await guardarChunks(
        chunks
      );

      res.json({

        message:
          "PDF procesado correctamente",

        totalChunks:
          chunks.length

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
          error.message

      });

    }

  }
);

/**
 * PREGUNTAR AL CHATBOT
 */
router.post(
  "/preguntar",
  async (req, res) => {

    try {

      const { pregunta } =
        req.body;

      if (!pregunta) {

        return res.status(400).json({
          error: "Debe enviar una pregunta"
        });

      }

      const resultados =
        await buscarSimilares(
          pregunta
        );

      if (
        !resultados ||
        resultados.length === 0
      ) {

        return res.json({

          pregunta,

          respuesta:
            "No encontré información relacionada.",

          contexto: []

        });

      }

      const contexto =
        resultados
        .map(r => r.contenido)
        .join("\n\n");

      const respuesta =
        await generarRespuesta(
          pregunta,
          contexto
        );

      res.json({

        pregunta,

        respuesta,

        contexto:
          resultados

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
          error.message

      });

    }

  }
);

export default router;