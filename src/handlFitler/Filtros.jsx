import { ApiContext } from "../Service/GetApi";
import { useContext, useEffect, useState, useMemo } from "react";
export default function Filtros() {
  const { data, setFilter } = useContext(ApiContext);
  const [estadoFiltro, setEstadoFiltro] = useState("todos");
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const [fechaFiltro, setFechaFiltro] = useState(""); // Add fechaFiltro state

  const filteredData = useMemo(() => {
    return data.filter((value) => {
      const estadoMatch =
        estadoFiltro === "todos" || value.data.estadoCp === estadoFiltro;
      const tipoMatch = tipoFiltro === "todos" || value.codComp === tipoFiltro;
      console.log(data);
      if (fechaFiltro !== "") {
        const fechaFiltroFormatted = fechaFiltro.split("/").reverse().join("-");
        const fechaValueFormatted = value.fechaEmision
          .split("/")
          .reverse()
          .join("-");
        return (
          estadoMatch &&
          tipoMatch &&
          fechaValueFormatted === fechaFiltroFormatted
        );
      }

      return estadoMatch && tipoMatch;
    });
  }, [data, estadoFiltro, tipoFiltro, fechaFiltro]);

  useEffect(() => {
    setFilter(filteredData);
  }, [filteredData]);

  const handleEstadoFilter = (e) => {
    setEstadoFiltro(e.target.value);
  };

  const handleTipoFilter = (e) => {
    setTipoFiltro(e.target.value);
  };

  const handleFechaFilter = (e) => {
    setFechaFiltro(e.target.value);
  }; // Add handleFechaFilter

  return (
    <div className="w-full">
      <p className="text-center font-bold absolute left-0 -top-8 right-0">FILTROS</p>
      <div className="flex justify-around gap-4">
        <span className="flex items-center">
          <p>ESTADO: </p>
          <select
            id="filtros"
            onChange={handleEstadoFilter}
            className="px-2 py-2 cursor-pointer border text-center"
          >
            <option value="todos">Todos</option>
            <option value="0">No existe</option>
            <option value="1">Aceptado</option>
            <option value="2">Anulado</option>
            <option value="3">Autorizado</option>
            <option value="4">No autorizado</option>
          </select>
        </span>
        <span className="flex items-center">
          <p>COMPROBANTE: </p>
          <select
            id="filtrosComprobante"
            onChange={handleTipoFilter}
            className="px-2 py-2 cursor-pointer border text-center"
          >
            <option value="todos">Todos</option>
            <option value="01">Factura</option>
            <option value="03">Boleta</option>
            <option value="04">Liquidacion de compra</option>
            <option value="07">Nota de Credito</option>
            <option value="08">Nota de Debito</option>
            <option value="R1">Recibo por honorarios</option>
            <option value="R7">Nota de credito de recibos</option>
          </select>
        </span>
        <span className="flex items-center">
          <p>FECHA:</p> {/* Add filter by fecha */}
          <input
            type="date"
            onChange={handleFechaFilter}
            className="px-2 py-2 cursor-pointer border text-center"
          />
        </span>
      </div>
    </div>
  );
}
