import { useState } from 'react';
import axios from 'axios';

function FileUploader() {
  const [file, setFile] = useState('');
  const [ruc , setRuc] = useState('');
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

  };
  const handleChange = (e) => {
    setRuc(e.target.value);
  }

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('ruc', ruc);

    try {
      const response = await axios.post('http://localhost:5000/recibir-datos', formData, {
        headers: {  
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
    }
  };

  return (
    <div className='mb-4'>
      <input type="text" onChange={handleChange} placeholder='Numero de ruc' className='border mr-4'/>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload} className='bg-green-500 text-white px-4 py-2'>Subir Archivo</button>
    </div>
  );
}

export default FileUploader;