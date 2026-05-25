import { pool } from "../db.js";
import { createEmbedding, openai } from "./embeddingService.js";

export async function askQuestion(question) {
  const questionEmbedding = await createEmbedding(question);

  const result = await pool.query(
    `SELECT * FROM match_documents($1::vector, $2)` ,
    [JSON.stringify(questionEmbedding), 5]
  );

  const context = result.rows
    .map(row => row.content)
    .join("\n\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: `
Eres un asistente oficial de SENAVEX.

Responde SOLO usando la información proporcionada.

Si no encuentras información responde:
"No encontré información en la normativa".
        `,
      },
      {
        role: "user",
        content: `
Contexto:
${context}

Pregunta:
${question}
        `,
      },
    ],
  });

  return completion.choices[0].message.content;
}