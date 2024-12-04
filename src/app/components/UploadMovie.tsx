import React, { useState } from "react";
import { PiPaperclipLight } from "react-icons/pi";

interface UploadMovieProps {
  onUploadMovie: (file: File) => void;
  uploading: boolean;
  uploadProgress: number;
  uploadError: boolean;
  cancelUpload: () => void;
  retryUpload: () => void;
}

const UploadMovie: React.FC<UploadMovieProps> = ({
  onUploadMovie,
  uploading,
  uploadProgress,
  uploadError,
  cancelUpload,
  retryUpload,
}) => {
  const validateImage = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    return validTypes.includes(file.type);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent
  ) => {
    let file: File | null = null;

    if (e.target && "files" in e.target) {
      file = (e.target as HTMLInputElement).files?.[0] || null;
    } else if ("dataTransfer" in e && e.dataTransfer?.files) {
      file = e.dataTransfer.files[0];
    }

    if (file && validateImage(file)) {
      onUploadMovie(file);
    } else {
      alert("Por favor, sube una imagen válida.");
    }

    if ("preventDefault" in e) {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full p-8 border-2 border-dashed rounded-lg text-center bg-[#242424] cursor-pointer relative">
      <label
        htmlFor="backdrop_path"
        className="flex flex-row items-center justify-center text-sm font-bold"
      >
        <PiPaperclipLight size={20} className="mr-2" /> Agrega un archivo{" "}
        <span className="font-normal hidden lg:inline-flex">
          o arrástralo y soltalo aquí
        </span>
      </label>
      <input
        type="file"
        id="backdrop_path"
        onChange={handleFileChange}
        className="w-full h-full opacity-0 absolute top-0 left-0 z-20 cursor-pointer"
      />

      {uploading && (
        <div className="w-full">
          {/* Mensaje de error */}
          {uploadError && (
            <div className="text-red-500 mb-2 text-start">
              <strong>¡ERROR! No se pudo cargar la imagen</strong>
            </div>
          )}

          <div className="bg-gray-700 w-full rounded-lg h-2">
            <div
              className={`h-full rounded-lg ${
                uploadError ? "bg-red-500" : "bg-green-400"
              }`}
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>

          <div className="flex justify-between mt-2">
            <div></div>
            {uploading && !uploadError && uploadProgress < 100 && (
              <button
                type="button"
                onClick={cancelUpload}
                className="text-sm text-red-500"
              >
                Cancelar
              </button>
            )}
            {uploadError && (
              <button
                type="button"
                onClick={retryUpload}
                className="text-sm text-yellow-500"
              >
                Reintentar
              </button>
            )}
            {/* Mensaje de éxito cuando la carga ha finalizado */}
            {uploadProgress === 100 && !uploadError && (
              <span className="text-sm text-green-500 font-semibold">¡Listo!</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadMovie;