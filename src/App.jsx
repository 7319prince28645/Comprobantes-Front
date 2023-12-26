 import "./App.css";
import axios from "axios";
import FileUploader from "./DatosPost";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const estado = (value) => {
    const validarEstado = {
      0: "Rechazado",
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://nodejs-gvel.onrender.com/validar-comprobante"
        );
        const getdata = response.data;
        console.log(getdata);
        setData(
          getdata.resultadoValidacion.map((value, index) => {
            return {
              ...value,
              ...getdata.archivo[index],
            };
          })
        );
      } catch (error) {
        console.error("Error al obtener datos:", error);
        // Considera establecer un estado de error aquí para mostrar en la UI
      }
      setLoading(true);
    };

    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="">
      <p className="absolute right-0 font-bold">PRINCHARD</p>
      <h1 className="text-center font-bold text-lg">Peticiones de sunat</h1>
      <FileUploader />
      {loading ? (
        data.map((value, index) => {
          return (
            <div key={index} className="relative flex justify-between border">
              <p>
                Numero de serie: <b>{value.numeroSerie}</b>
              </p>{" "}
              <p>
                Numero: <b>{value.numero}</b>
              </p>
              <p>{value.monto}</p>
              <b className={colores(value.data.estadoCp)}>
                {estado(value.data.estadoCp)}
              </b>
            </div>
          );
        })
      ) : (
        <p className="spinner"></p>
      )}
    </div>
  );
}

export default App;
