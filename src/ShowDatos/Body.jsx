import { ApiContext } from "../Service/GetApi";
import { useContext } from "react";
import {TiposCP} from "../CasosManual/TiposCP";
import { Estado } from "../CasosManual/Estado";
import {Colores} from "../CasosManual/Colores";
function Body() {
  const { data, filterDatos } = useContext(ApiContext);
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {(filterDatos !== null ? filterDatos : data).map((value, index) => (
        <tr key={index} className="">
          <td className="px-6 py-4 whitespace-nowrap">{index + 2}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            {TiposCP(value.codComp)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">{value.numeroSerie}</td>
          <td className="px-6 py-4 whitespace-nowrap">{value.numero}</td>
          <td className="px-6 py-4 whitespace-nowrap">{value.fechaEmision}</td>
          <td className="px-6 py-4 whitespace-nowrap">{value.monto}</td>
          <td className={Colores(value.data.estadoCp)}>
            {Estado(value.data.estadoCp)}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default Body;
