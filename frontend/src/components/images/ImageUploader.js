import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ImageUploader({ 
  uploadUrl = 'http://localhost/basecambios/upload_foto.php', 
  onUpload = ruta => {}, 
  maxSizeMB = 5 
}) {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validaciones
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`El archivo supera ${maxSizeMB} MB.`);
      return;
    }
    const tiposValidos = ['image/jpeg','image/png','image/gif'];
    if (!tiposValidos.includes(file.type)) {
      toast.error('Formato inválido. Usa JPG, PNG o GIF.');
      return;
    }

    // Mostrar preview inmediato
    setPreview(URL.createObjectURL(file));

    // Subida
    const formData = new FormData();
    formData.append('foto', file);

    try {
      setUploading(true);
      const res = await axios.post(uploadUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        toast.success('Foto subida correctamente');
        // Devuelve la ruta relativa (por ejemplo "images/foto_abc123.jpg")
        onUpload(res.data.ruta);
      } else {
        throw new Error(res.data.error || 'Error desconocido');
      }
    } catch (err) {
      console.error(err);
      toast.error('No se pudo subir la foto');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-uploader">
      <label className="upload-button">
        { uploading ? 'Subiendo...' : 'Seleccionar foto' }
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          disabled={uploading}
        />
      </label>

      {preview && (
        <div className="preview-container">
          <img 
            src={preview} 
            alt="Vista previa" 
            className="preview-img" 
          />
        </div>
      )}
    </div>
  );
}
