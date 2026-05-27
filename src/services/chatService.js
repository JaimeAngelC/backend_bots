export async function generarRespuesta(
  pregunta,
  contexto
) {

  console.log(
    "Consultando gemma..."
  );

  const prompt = `
Eres un asistente virtual profesional del SENAVEX.

Tu trabajo es responder de manera:
- natural
- amigable
- clara
- como ChatGPT

Debes explicar la respuesta usando SOLO la información del contexto.

NO copies literalmente el texto.
NO respondas solo con listas.
NO inventes información.

Si la información existe:
- explica primero en una oración
- luego muestra los requisitos organizados

Si no existe:
responde:
"No encontré esa información en el documento."

CONTEXTO:
${contexto}

PREGUNTA:
${pregunta}

RESPUESTA:
`;

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

          model: "gemma3:4b",

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