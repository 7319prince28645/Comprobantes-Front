import * as XLSX from "xlsx";
import { TiposCP } from "../CasosManual/TiposCP";
  function crearExportacion(data, fileName) {
    const filename =typeof fileName === "string" ? fileName : JSON.stringify(fileName);
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Escribe el archivo
    XLSX.writeFile(wb, `${filename}.xlsx`);
  }

export default function ExportarExcel({ filterGa, getRuc, data, datosRuc }) {
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
    "Tipo de Comprobante": TiposCP(item.codComp),
    "Serie del Comprobante": item.numeroSerie,
    "Numero del Comprobante": item.numero,
    "Fecha de Emision": item.fechaEmision,
    Monto: parseInt(item.monto),
    Estado: estado(item.data.estadoCp),
  }));

  // Calcular la suma total de los montos
  const totalMonto = myData.reduce(
    (sum, item) => sum + parseFloat(item.Monto),
    0
  );

  // Agregar el total al final de myData
  myData.push({
    "N°": "",
    "Tipo de Comprobante": "",
    "Serie del Comprobante": "",
    "Numero del Comprobante": "",
    "Fecha de Emision": "Total",
    Monto: totalMonto.toFixed(2), // Asumiendo que quieres dos decimales
    Estado: "",
  });

  const handleExport = () => {
    crearExportacion(myData, datosRuc);
  };

  return (
    <div>
      <button onClick={handleExport} className=" bg-green-500 px-4 py-2">
        Exportar a Excel
      </button>
      {/* ... resto de tu componente */}
    </div>
  );
}
