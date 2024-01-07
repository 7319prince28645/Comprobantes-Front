import axios from "axios";
import { createContext, useState, useEffect } from 'react';

export const ApiContext = createContext();
export default function GetApi({ children } ) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [datosRuc, setDatosRuc] = useState([]);
  const [filterDatos, setFilter] = useState(null);

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
  useEffect(() => {
    setData([]);
  }, []);

  return (
    <ApiContext.Provider value={{ data, setData, fetchData, loading, setLoading, error, setError, datosRuc, filterDatos, setFilter }}>
      {children}
    </ApiContext.Provider>
  )
}

