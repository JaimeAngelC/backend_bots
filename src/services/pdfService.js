import { PDFLoader }
from "@langchain/community/document_loaders/fs/pdf";

import { RecursiveCharacterTextSplitter }
from "@langchain/textsplitters";

export async function procesarPDF(path) {

  const loader =
    new PDFLoader(path);

  const docs =
    await loader.load();

  const splitter =
    new RecursiveCharacterTextSplitter({

      chunkSize: 450,

      chunkOverlap: 50,

      separators: [
        "\n\n",
        "\n",
        ". ",
        ";",
        ":",
        " "
      ]
    });

  const chunks =
    await splitter.splitDocuments(docs);

  return chunks.map(chunk => ({

    contenido: chunk.pageContent
      .replace(/\r/g, "")
      .replace(/\s+/g, " ")
      .trim()

  }));

}