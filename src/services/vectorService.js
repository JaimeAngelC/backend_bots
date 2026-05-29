import { supabase }
from "../config/supabase.js";

export async function buscarSimilares(embedding,categoria = null) {

  let query =
    supabase.rpc(
      "buscar_documentos",
      {
        query_embedding: embedding,
        match_threshold: 0.55,
        match_count: 3
      }
    );

  if (categoria) {

    query =
      query.eq(
        "categoria",
        categoria
      );
  }

  const { data, error } =
  await query;

if (error)
  throw error;

console.log("\nRESULTADOS:");

data.forEach((item) => {

  console.log(
    item.titulo,
    "=>",
    item.similarity
  );

});

return data;
}