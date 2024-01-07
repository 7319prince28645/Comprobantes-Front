import "./App.css";
import axios from "axios";
import FileUploader from "./DatosPost";
import { useState, useEffect } from "react";
import Instruccion from "./Instruction/Instruccion";
import { SpinnerComponent } from "./Skeleton";
import ExportarExcel from "./Exportar/ExportarExcel";
import Princhard from "./Imgs/princhard.jpg";
import { ExportarPdf } from "./Exportar/ExportarPdf";
import { TiposCP } from "./CasosManual/TiposCP";
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterDatos, setFilter] = useState(null);
  const [getRuc, setGetRuc] = useState("");
  const [datosRuc, setDatosRuc] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState("todos");
const [tipoFiltro, setTipoFiltro] = useState("todos");
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

  const colores = (value) => {
    const validarEstado = {
      0: "bg-red-500 px-4 py-2",
      1: "bg-green-500 px-4 py-2",
      2: "bg-yellow-500 px-4 py-2",
      3: "bg-blue-500 px-4 py-2",
      4: "bg-gray-500 px-4 py-2",
    };
    return validarEstado[value];
  };
  useEffect(() => {
    setData([]);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://nodejs-gvel.onrender.com/validar-comprobante"
      );

      const getdata = response.data;
      setDatosRuc(getdata.datosDelRuc);
      setData(
        getdata.resultadoValidacion.map((value, index) => {
          return {
            ...value,
            ...getdata.archivo[index],
          };
        })
      );
      setLoading(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        setError(
          "Error al obtener datos, por favor intentelo de nuevo recargando la pagina"
        );
      }
      console.error("Error al obtener datos:", error);
      // Considera establecer un estado de error aquí para mostrar en la UI
    }
  };
  const handleEstadoFilter = (e) => {
    const selectedEstado = e.target.value;
    setEstadoFiltro(selectedEstado);
    applyFilters(selectedEstado, tipoFiltro);
  };
  
  const handleTipoFilter = (e) => {
    const selectedTipo = e.target.value;
    setTipoFiltro(selectedTipo);
    applyFilters(estadoFiltro, selectedTipo);
  };
  
  const applyFilters = (estado, tipo) => {
    const filteredData = data.filter((value) => {
      const estadoMatch = estado === "todos" || value.data.estadoCp === estado;
      const tipoMatch = tipo === "todos" || value.codComp === tipo;
      return estadoMatch && tipoMatch;
    });
    setFilter(filteredData);
  };
  
  useEffect(() => {
    // Aplicar ambos filtros cuando se cargan los datos por primera vez
    applyFilters(estadoFiltro, tipoFiltro);
  }, [data]);
  return (  
    <>
      <div className="px-8 flex flex-col py-4">
        <img src={Princhard} alt="" className="absolute right-5 w-[60px] z-10 rounded-full"/>
        <h1 className="font-bold text-lg text-center">
          VALIDACION DE COMPROBANTES
        </h1>
        <FileUploader
          setLoading={setLoading}
          loading={loading}
          fetchData={fetchData}
          setGetRuc={setGetRuc}
        />
        {data && data.length > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex gap-4 pt-4 items-center">
              <p className="">Filtrar: </p>
              <select id="filtros" onChange={handleEstadoFilter} className="px-2 py-2 cursor-pointer border text-center">
                <option value="todos" >Todos</option>
                <option value="0">No existe</option>
                <option value="1">Aceptado</option>
                <option value="2">Anulado</option>
                <option value="3">Autorizado</option>
                <option value="4">No autorizado</option>
              </select>
              <p>Filtrar por Comprobante:</p>
              <select id="filtrosComprobante" onChange={handleTipoFilter} className="px-2 py-2 cursor-pointer border text-center">
                <option value="todos">Todos</option>
                <option value="01">Factura</option>
                <option value="03">Boleta</option>
                <option value="04">Liquidacion de compra</option>
                <option value="07">Nota de Credito</option>
                <option value="08">Nota de Debito</option>
                <option value="R1">Recibo por honorarios</option>
                <option value="R7">Nota de credito de recibos</option>
              </select>
            </div>
           
            <div className="flex gap-4">
            <ExportarPdf filterGa={filterDatos} getRuc={getRuc} data={data} datosRuc={datosRuc.razonSocial}/>
            <ExportarExcel filterGa={filterDatos} getRuc={getRuc} data={data} datosRuc={datosRuc.razonSocial}/></div>
          </div>
        )}
      </div>
      <hr />
      {data && data.length > 0 && <p className="font-bold font-inter text-xl text-center py-1"> {datosRuc.razonSocial}</p>}
      <div className="px-8">
        {data.length === 0 && loading === false && <Instruccion />}
        {loading ? (
          <SpinnerComponent />
        ) : (
          data &&
          data.length > 0 && (
            <table className=" w-full text-center divide-y divide-gray-200 border">
              <thead className="border">
                <tr className="">
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    N°
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Codigo Comprobante
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    N° Serie
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Numero
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Fecha de Emision
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Monto
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(filterDatos !== null ? filterDatos : data).map((value, index) => (
                  <tr key={index} className="">
                    <td className="px-6 py-4 whitespace-nowrap">{index + 2}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {TiposCP(value.codComp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {value.numeroSerie}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {value.numero}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {value.fechaEmision}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {value.monto}
                    </td>
                    <td className={colores(value.data.estadoCp)}>
                      {estado(value.data.estadoCp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md">{error}</div>
        )}
      </div>
    </>
  );
}

export default App;
