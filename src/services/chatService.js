import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function generarRespuesta(
  pregunta,
  contexto
) {

  const completion =
    await client.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
Eres un asistente virtual del SENAVEX.

Responde SOLO usando el contexto.
Si no existe información:
"No encontré información relacionada."
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

  return completion.choices[0]
    .message.content;
}




/*import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI }
from "@google/generative-ai";

console.log('el api es -------------'+process.env.GEMINI_API_KEY);

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const model =
  genAI.getGenerativeModel({
    model: "gemini-2.0-flash"
  });

export async function generarRespuesta(
  pregunta,
  contexto
) {

  const prompt = `

Eres un asistente del SENAVEX.

Responde SOLO usando el contexto.

Si no existe información:
"No encontré información relacionada."

CONTEXTO:
${contexto}

PREGUNTA:
${pregunta}

`;

  const result =
    await model.generateContent(prompt);

  return result.response.text();
}
*/


/*
export async function generarRespuesta(pregunta,contexto) {

  console.log("Consultando a la ia la respuesta estructurada...");
  

const prompt = `

Eres un asistente virtual del SENAVEX.

Debes responder únicamente usando la información del CONTEXTO.

Si el contexto tiene información relacionada:
- responde normalmente
- resume claramente
- usa listas si hay requisitos

Si el contexto NO contiene información:
responde EXACTAMENTE:

No encontré información relacionada.

CONTEXTO:
${contexto}

PREGUNTA:
${pregunta}

RESPUESTA:

`;

console.log("\nCONTEXTO:");
console.log(contexto);

  const response =
    await fetch(
      "http://localhost:11434/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          /*model: "qwen2.5:1.5b",*/
          /*model: "gemma3:1b",*/
          /*model: "gemma3:4b",*/
          /*model: "llama3:8b",

          prompt,

          stream: false
        })
      }
    );

  const data =
    await response.json();

  return data.response
  .replace(/\\n/g, "\n")
  .replace(/\n{3,}/g, "\n\n")
  .trim();
}

*/