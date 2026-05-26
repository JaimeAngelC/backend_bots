import { PDFLoader }
from "@langchain/community/document_loaders/fs/pdf";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function procesarPDF(path) {

  const loader = new PDFLoader(path);

  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({

  chunkSize: 400,

  chunkOverlap: 80,

  separators: [
    "\n\n", // párrafos
    "\n",   // líneas
    ". ",   // oraciones
    " ",    // palabras
  ]
});

  const chunks =
    await splitter.splitDocuments(docs);

  return chunks;
}