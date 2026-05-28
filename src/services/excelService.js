import XLSX from "xlsx";

export function leerExcel(path) {

  const workbook =
    XLSX.readFile(path);

  const sheet =
    workbook.Sheets[
      workbook.SheetNames[0]
    ];

  return XLSX.utils
    .sheet_to_json(sheet);
}