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

    console.log(
      "CHUNK:",
      chunk.contenido.substring(
        0,
        100
      )
    );

    const embedding =
      await generarEmbedding(
        chunk.contenido
      );

    const { error } =
      await supabase
      .from("documentospdf")
      .insert({

        contenido:
          chunk.contenido,

        embedding

      });

    if (error) {

      console.log(
        "Error guardando chunk:",
        error
      );

    }

  }

}