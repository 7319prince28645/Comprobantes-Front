import { ApiContext } from "../Service/GetApi";
import {ExportarPdf} from "../Exportar/ExportarPdf";
import ExportarExcel from "../Exportar/ExportarExcel";
import { useContext } from "react";
import Filtros from "../handlFitler/Filtros";
function ShowFilters() {
  const { filterDatos, getRuc, data, datosRuc } = useContext(ApiContext);
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 pt-4 items-center">
       <Filtros/>
      </div>

      <div className="flex gap-4">
        <ExportarPdf
          filterGa={filterDatos}
          getRuc={getRuc}
          data={data}
          datosRuc={datosRuc.razonSocial}
        />
        <ExportarExcel
          filterGa={filterDatos}
          getRuc={getRuc}
          data={data}
          datosRuc={datosRuc.razonSocial}
        />
      </div>
    </div>
  );
}

export default ShowFilters;
