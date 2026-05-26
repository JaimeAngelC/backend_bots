import supabase from "../config/supabase.js";

import { generarEmbedding }
from "./ollamaService.js";

export async function buscarSimilares(
  pregunta
) {

  const embedding =
    await generarEmbedding(pregunta);

  const { data, error } = await supabase
    .rpc("match_documents", {
      query_embedding: embedding,
      match_count: 5
    });

  if (error) {
    console.log(error);
    return [];
  }

  return data;
}