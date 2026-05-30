import dotenv
from "dotenv";

dotenv.config();

import OpenAI
from "openai";

const client =
  new OpenAI({

    apiKey:
      process.env.GROQ_API_KEY,

    baseURL:
      "https://api.groq.com/openai/v1"

  });

export async function generarRespuesta(
  pregunta,
  contexto
) {
    
  const completion =
    await client.chat.completions.create({

      model:
        "llama-3.3-70b-versatile",

      temperature: 0,

      messages: [

        {
          role: "system",

          content: `
Eres un asistente virtual del SENAVEX.

Responde únicamente usando el contexto.

Si el contexto no contiene la respuesta:

"No encontré información relacionada."

No inventes información, tampoco mensiones segun el contexto mas al punto.
`
        },

        {
          role: "user",

          content: `
CONTEXTO:

${contexto}

PREGUNTA:

${pregunta}
`
        }

      ]

    });

  return completion
    .choices[0]
    .message.content;

}