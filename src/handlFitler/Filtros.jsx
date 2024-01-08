import { ApiContext } from "../Service/GetApi";
import { useContext, useEffect, useState, useMemo } from "react";
export default function Filtros() {
  const { data, setFilter } = useContext(ApiContext);
  const [estadoFiltro, setEstadoFiltro] = useState("todos");
  const [tipoFiltro, setTipoFiltro] = useState("todos");

  const filteredData = useMemo(() => {
    return data.filter((value) => {
      const estadoMatch =
        estadoFiltro === "todos" || value.data.estadoCp === estadoFiltro;
      const tipoMatch = tipoFiltro === "todos" || value.codComp === tipoFiltro;
      return estadoMatch && tipoMatch;
    });
  }, [data, estadoFiltro, tipoFiltro]);

  useEffect(() => {
    setFilter(filteredData);
  }, [filteredData]);

  const handleEstadoFilter = (e) => {
    setEstadoFiltro(e.target.value);
  };

  const handleTipoFilter = (e) => {
    setTipoFiltro(e.target.value);
  };
  
  return (
    <>
      <p className="">Filtrar por Estado: </p>
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
      <p>Filtrar por Comprobante:</p>
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
    </>
  );
}
