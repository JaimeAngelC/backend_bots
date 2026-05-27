import { supabase }
from "../config/supabase.js";

import { generarEmbedding }
from "./embeddingService.js";

export async function guardarChunks(
  chunks
) {

  console.log(
    "TOTAL CHUNKS:",
    chunks.length
  );

  for (const chunk of chunks) {

    try {

      const texto = chunk.pageContent?.trim();

      console.log(
        "CHUNK:",
        texto
      );

      if (!texto) {

        console.log(
          "VACÍO"
        );

        continue;
      }

      console.log(
        "Generando embedding..."
      );

      const embedding =
        await generarEmbedding(
          texto
        );

      console.log(
        "Embedding generado:",
        embedding?.length
      );

      const { data, error } =
        await supabase
          .from("documents")
          .insert({
            content: texto,
            embedding
          });

      console.log(
        "INSERT:",
        data
      );

      if (error) {
        console.log(error);
      }

    } catch (error) {

      console.log(error);
    }
  }
}