import { extractPdfText } from "./services/pdfService.js";
import { splitText } from "./services/chunkService.js";
import { createEmbedding } from "./services/embeddingService.js";
import { pool } from "./db.js";

async function uploadPdf() {
  const text = await extractPdfText("./normativa.pdf");

  const chunks = splitText(text);

  for (const chunk of chunks) {
    const embedding = await createEmbedding(chunk);

    await pool.query(
      `INSERT INTO documents(content, embedding)
       VALUES($1, $2)` ,
      [chunk, JSON.stringify(embedding)]
    );

    console.log("Chunk guardado");
  }

  console.log("PDF procesado correctamente");
}

uploadPdf();