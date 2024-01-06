import { GoAlert } from "react-icons/go";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import NombreArchivo from "../Imgs/1-NombreArchivo.png";
import NombreArchivoMOdificado from "../Imgs/1-NombreArchivoModificado.png";
import Propiedad from "../Imgs/propiedad.png";
import ExcellSinModificar from "../Imgs/ExcellSinModificar.png";
import ExcellModificado from "../Imgs/ExcellModificado.png";
import tipodeComprobante from '../Imgs/tiposdefactura.png'
function Instruccion() {
  return (
    <div className="relative">
      <span className="flex justify-center items-center gap-2 font-extrabold">
        <p className="absolute left-0 text-red-500">SOLO HASTA 4000 COMPROBANTES</p>
        <GoAlert className="text-3xl" />
        <p className="text-2xl font-inter">IMPORTANTE</p>
      </span>

      <p className="font-semibold py-2">
        Antes de comenzar a validar los comprobantes debe asegurarse que el
        excell tenga ciertos parametros, para ello se mostrará un ejemplo de como
        debe estar el excell:
      </p>
      <span className="">
        <p>1. El nombre del archivo debe no debe tener espacios:</p>
        <span className="flex">
          <AiOutlineCloseCircle className="text-red-500 text-2xl" />
          <img src={NombreArchivo} alt="" className="w-[400px] h-[30px]" />
        </span>
        <span className="flex">
          <AiOutlineCheckCircle className="text-green-500 text-2xl" />
          <img
            src={NombreArchivoMOdificado}
            alt=""
            className="w-[400px] h-[30px]"
          />
        </span>
      </span>
      <span>
        <p>
          2. Debes filtrar o eliminar las columnas de los datos que no se usaran
          y cambiar el nombre en el orden del cuadro que se encuentra en el lado
          derecho:
        </p>
        <span className="flex gap-4">
          <span className="">
            <AiOutlineCloseCircle className="text-red-500 text-3xl" />
            <img src={ExcellSinModificar} alt="" className="w-[850px] h-[400px]" />
          </span>
          <span className="py-4 ">
            <AiOutlineCheckCircle className="text-green-500 text-3xl" />
            <img src={ExcellModificado} alt="" className="h-[390px]" />
          </span>
        </span>
      </span>

      {/* CUADRO  */}
      <img
        src={Propiedad}
        alt=""
        className="absolute right-8 -top-16 w-[210px]"
      />
      <img
        src={tipodeComprobante}
        alt=""
        className="absolute right-8 top-32 w-[210px]"
      />
    </div>
  );
}

export default Instruccion;
