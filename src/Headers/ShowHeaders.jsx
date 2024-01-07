import Princhard from '../Imgs/princhard.jpg'
import FileUploader from '../ShowDatos/DatosPost'
import ShowFilters from '../FiltrosShow/ShowFilters'

function ShowHeaders({ setLoading, loading, fetchData, data}) {
  return (
    <div className="px-8 flex flex-col py-4">
      <img
        src={Princhard}
        alt=""
        className="absolute right-5 w-[60px] z-10 rounded-full"
      />
      <h1 className="font-bold text-lg text-center">
        VALIDACION DE COMPROBANTES
      </h1>
      <FileUploader
        setLoading={setLoading}
        loading={loading}
        fetchData={fetchData}
      />
      {data && data.length > 0 && <ShowFilters />}
    </div>
  );
}

export default ShowHeaders;
