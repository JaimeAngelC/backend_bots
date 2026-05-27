export async function generarEmbedding(texto) {

  const response = await fetch(
    "http://localhost:11434/api/embeddings",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        model: "nomic-embed-text",
        prompt: texto
      })
    }
  );

  const data = await response.json();

  return data.embedding;
}