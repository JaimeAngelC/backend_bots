import supabase from "../config/supabase.js";
import { generarEmbedding } from "./ollamaService.js";

export async function guardarChunks(chunks) {

  for (const chunk of chunks) {

    const texto = chunk.pageContent;

    const embedding = await generarEmbedding(texto);

    const { error } = await supabase
      .from("documents")
      .insert({
        content: texto,
        embedding
      });

    if (error) {
      console.log(error);
    }
  }
}

export async function buscarSimilares(texto) {
  const embedding = await generarEmbedding(texto);

  const { data, error } = await supabase.rpc(
    "match_documents",
    {
      query_embedding: embedding,
      match_threshold: 0.5,
      match_count: 5
    }
  );

  if (error) {
    throw error;
  }

  return data;
}