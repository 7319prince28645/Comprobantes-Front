import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function FileUploader({ setLoading, fetchData, loading }) {
  const [file, setFile] = useState("");
  const [ruc, setRuc] = useState("");
  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    Swal.fire({
      title: "¡Archivo Seleccionado!",
      text: "¡Haz clic en el botón Subir Archivo!",
      icon: "success",
    });
  };
  const handleChange = (e) => {
    setRuc(e.target.value);
   
  };

  const handleFileUpload = async () => {
    Swal.fire({
      title: "¡Success!",
      text: "¡Espere por favor!",
      icon: "success",
    });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("ruc", ruc);
   
    try {
      const response = await axios.post(
        'https://nodejs-gvel.onrender.com/recibir-datos',
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Respuesta del servidor:", response.data);
      setLoading(!loading);
      fetchData();
    } catch (error) {
      console.error("Error al cargar el archivo:", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        onChange={handleChange}
        value={ruc}
        placeholder="Numero de ruc"
        className="border p-2 "
      />
      <label htmlFor="File" className="px-2 py-2 cursor-pointer bg-blue-500 hover:bg-blue-700">Seleccionar Archivo</label>
      <input id="File" type="file" onChange={handleFileChange} className="hidden"/>
      <button
        onClick={handleFileUpload}
        className="bg-green-500 text-white px-4 py-2"
      >
        Subir Archivo
      </button>
    </div>
  );
}

export default FileUploader;
