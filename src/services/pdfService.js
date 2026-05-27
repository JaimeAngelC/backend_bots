import { PDFLoader }
from "@langchain/community/document_loaders/fs/pdf";

export async function procesarPDF(
  path
) {

  const loader =
    new PDFLoader(path);

  const docs =
    await loader.load();

  return docs;
}