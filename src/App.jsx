import "./App.css";
import { useContext } from "react";
import ShowHeaders from "./Headers/ShowHeaders";
import RazonSocial from "./ShowDatos/Mains/RazonSocial";
import Main from "./ShowDatos/Main";
import { ApiContext } from "./Service/GetApi";
function App() {
  const {
    data,
    setData,
    fetchData,
    loading,
    setLoading,
    error,
    setError,
    datosRuc,
    filterDatos,
    setFilter,
  } = useContext(ApiContext);
  return (
    <>
      <ShowHeaders
        setLoading={setLoading}
        loading={loading}
        fetchData={fetchData}
        data={data}
      />
      <hr />
      {data && data.length > 0 && <RazonSocial />}
      <Main />
    </>
  );
}

export default App;
