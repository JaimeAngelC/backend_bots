import { supabase } from "../config/supabase.js";

export async function buscarSimilares(embedding) {

  const { data, error } = await supabase.rpc(
    "match_documents",
    {
      query_embedding: embedding,
      match_threshold: 0.2,
      match_count: 1
    }
  );

  if (error) {
    console.log(error);
    return [];
  }

  return data;
}