import { supabase } from "../config/supabase.js";

import { generarEmbedding }
from "./embeddingService.js";

export async function buscarSimilares(
  pregunta
) {

  const embedding =
    await generarEmbedding(
      pregunta
    );

  const { data, error } =
    await supabase.rpc(
      "match_documentspdf",
      {

        query_embedding:
          embedding,

        match_threshold:
          0.55,

        match_count:
          20

      }
    );

  if (error)
    throw error;

  console.log(
    "\nRESULTADOS:"
  );

  data.forEach(r => {

    console.log(
      r.similarity
    );

  });

  return data;

}