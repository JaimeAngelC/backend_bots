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
          model: "gemma3:1b",
          /*model: "gemma3:4b",*/
          /*model: "llama3:8b",*/

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