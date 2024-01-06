import * as XLSX from "xlsx";

function crearExportacion(data, fileName) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Escribe el archivo
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}

export default function ExportarExcel({ filterGa, getRuc, data }) {
  console.log(data);
  const estado = (value) => {
    const validarEstado = {
      0: "No existe",
      1: "Aceptado",
      2: "Anulado",
      3: "Autorizado",
      4: "No autorizado",
    };
    return validarEstado[value];
  };
  const myData = (filterGa ? filterGa : data).map((item, index) => ({
    "N°": index + 1,
    "Tipo de Comprobante": item.codComp,
    "Serie del Comprobante": item.numeroSerie,
    "Numero del Comprobante": item.numero,
    "Fecha de Emision": item.fechaEmision,
    Monto: item.monto,
    Estado: estado(item.data.estadoCp),
  }));
  const handleExport = () => {
    crearExportacion(myData, `Comprobantes-${getRuc}`);
  };

  return (
    <div>
      <button onClick={handleExport} className=" bg-green-500 px-4 py-2">Exportar a Excel</button>
      {/* ... resto de tu componente */}
    </div>
  );
}
