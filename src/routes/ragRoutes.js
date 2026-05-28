import express from "express";

import multer from "multer";

import { leerExcel }
from "../services/excelService.js";

import { generarEmbedding }
from "../services/embeddingService.js";

import { generarRespuesta }
from "../services/chatService.js";

import { buscarSimilares }
from "../services/vectorService.js";

import { supabase }
from "../config/supabase.js";

const router = express.Router();

const upload = multer({
  dest: "src/uploads/"
});

router.post("/upload-excel",upload.single("excel"), async (req, res) => {
    try {

      const filas =
        leerExcel(req.file.path);

      for (const fila of filas) {

        const texto = `

Categoria:
${fila.CATEGORIA}

Seccion:
${fila.SECCION}

Titulo:
${fila.TITULO}

Contenido:
${fila.CONTENIDO}

`;

        const embedding =
          await generarEmbedding(texto);

        await supabase
          .from("documentos")
          .insert({

            categoria:
              fila.CATEGORIA,

            seccion:
              fila.SECCION,

            titulo:
              fila.TITULO,

            contenido:
              fila.CONTENIDO,

            embedding

          });
      }

      res.json({
        message:
          "Excel procesado"
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

      const embedding = await generarEmbedding(pregunta);

      const resultados = await buscarSimilares(embedding);

      /*if (resultados.length === 0) {
        return res.json({
          respuesta:
            "No encontré información relacionada."
        });
      }*/

      const contexto =
        resultados
          .map(r =>
            r.contenido
          )
          .join("\n\n");

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