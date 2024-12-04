"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addMovie } from "../services/movieApi.service";
import { GrAddCircle } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { PiPaperclipLight, PiPlus } from "react-icons/pi";
import Header from "./Header";
import { Logo } from "./Logo";

const AddMovieModal = () => {
  const [newMovie, setNewMovie] = useState({
    title: "",
    vote_average: "",
    release_date: "",
    backdrop_path: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const queryClient = useQueryClient();

  const mutationAddMovie = useMutation(addMovie, {
    onSuccess: () => {
      setSuccessMessage(true);
      setUploadError(false);
      queryClient.invalidateQueries("myMovies");
    },
    onError: () => {
      setUploadError(true);
      setSuccessMessage(false);
    },
  });

  const validateImage = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    return validTypes.includes(file.type);
  };

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newMovie.title &&
      newMovie.vote_average &&
      newMovie.release_date &&
      newMovie.backdrop_path
    ) {
      setUploading(true);
      mutationAddMovie.mutate(newMovie);
    }
  };

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent
  ) => {
    let file: File | null = null;
  
    if (e.target && "files" in e.target) {
      file = (e.target as HTMLInputElement).files?.[0] || null;
    } else if ("dataTransfer" in e && e.dataTransfer?.files) {
      file = e.dataTransfer.files[0];
    }
  
    if (file && validateImage(file)) {
      setUploading(true);
      setUploadProgress(0);
      setUploadFile(file);
      uploadImage(file);
    } else {
      alert("Por favor, sube una imagen válida.");
    }
  
    if ("preventDefault" in e) {
      e.preventDefault();
    }
  };  

  const resetForm = () => {
    setNewMovie({
      title: "",
      backdrop_path: "",
      vote_average: "",
      release_date: "",
    });
    setShowModal(false);
    setUploadProgress(0);
    setUploading(false);
    setUploadError(false);
  };

  const retryUpload = () => {
    if (uploadFile) {
      setUploadError(false);
      setUploading(true);
      setUploadProgress(0);
      uploadImage(uploadFile);
    }
  };

  const cancelUpload = () => {
    setUploadError(false);
    setUploading(false);
    setUploadProgress(0);
  };

  const closeModal = () => {
    setShowModal(false);
    setSuccessMessage(false);
    setUploadError(false);
    resetForm();
  };

  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const isFormValid =
    newMovie.title &&
    newMovie.vote_average &&
    newMovie.release_date &&
    newMovie.backdrop_path &&
    uploadProgress === 100;

    const uploadImage = async (file: File) => {
      try {
        const formData = new FormData();
        formData.append("image", file);
    
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/movies/upload", {
          method: "POST",
          body: formData,
        });
    
        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.url;
    
          setNewMovie((prevMovie) => ({
            ...prevMovie,
            backdrop_path: imageUrl,
          }));
    
          setUploadProgress(100);
          setUploadError(false);
        } else {
          throw new Error("Error al subir la imagen");
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        setUploadError(true);
        setUploading(false);
      }
    };

  return (
    <>
      {/* Botón para abrir el formulario */}
      <div className="flex justify-center lg:ml-10">
        <button
          className="flex items-center justify-center text-white font-medium hover:underline focus:outline-none uppercase"
          onClick={() => setShowModal(true)}
        >
          <div className="hidden lg:flex items-center">
            <PiPlus className="mr-2" /> Agregar Película
          </div>
          <GrAddCircle size={32} className="flex lg:hidden" />
        </button>
      </div>

      {/* Modal del formulario */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={closeModal}
          ></div>
          <div className="fixed inset-0 flex justify-center items-center z-20">
            <div className="text-white bg-[#242424] p-6 rounded-lg w-full h-full lg:h-3/5 relative lg:w-3/5 z-20">
              {/* Botón de cerrar modal */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-2xl text-white z-30 hidden lg:flex"
              >
                <AiOutlineClose />
              </button>

              {!successMessage && (
                <>
                  <Header isModalOpen={true}/>
                  <form
                    onSubmit={handleAddMovie}
                    className="flex flex-col items-center justify-around space-y-4 w-full h-full text-center"
                  >
                    <h2 className="text-xl font-semibold text-accent mt-16 lg:my-0">
                      Agregar Película
                    </h2>

                    {/* Barra de progreso */}
                    {uploading && (
                      <div className="w-full">
                        {/* Mensaje de error */}
                        {uploadError && (
                          <div className="text-red-500 mb-2 text-start">
                            <strong>
                              ¡ERROR! No se pudo cargar la película
                            </strong>
                          </div>
                        )}

                        {/* Mensaje de éxito */}
                        {uploadProgress === 100 &&
                          !uploadError &&
                          !successMessage && (
                            <div className="text-white mb-2 text-start">
                              <strong>¡100% Cargado!</strong>
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
                          {uploading &&
                            !uploadError &&
                            uploadProgress < 100 && (
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
                          {uploadProgress === 100 &&
                            !uploadError &&
                            !successMessage && (
                              <span className="text-sm text-green-500 font-semibold">
                                ¡Listo!
                              </span>
                            )}
                        </div>
                      </div>
                    )}

                    {/* Subir imagen (con drag and drop y click) */}
                    {!uploading && !uploadError && (
                      <div
                        className="w-full p-8 border-2 border-dashed rounded-lg text-center bg-[#242424] cursor-pointer relative"
                        onDragOver={(e) => {
                          e.preventDefault();
                        }}
                        onDrop={handleFile}
                      >
                        <label
                          htmlFor="backdrop_path"
                          className="flex flex-row items-center justify-center text-sm font-bold"
                        >
                          <PiPaperclipLight size={20} className="mr-2" /> Agrega
                          un archivo{" "}
                          <span className="font-normal hidden lg:inline-flex ml-2">
                            o arrastralo y soltalo aqui
                          </span>
                        </label>
                        <input
                          type="file"
                          id="backdrop_path"
                          onChange={handleFile}
                          className="w-full h-full opacity-0 absolute top-0 left-0 z-20 cursor-pointer"
                          required
                        />
                      </div>
                    )}

                    {/* Formulario */}
                    <div className="flex flex-col items-center w-full space-y-8">
                      <input
                        type="text"
                        placeholder="Titulo"
                        className="w-60 border-0 bg-transparent text-center text-white border-b-2 py-2 px-3 outline-none tracking-wider border-gray-500 placeholder:text-white uppercase"
                        value={newMovie.title}
                        onChange={(e) =>
                          setNewMovie({ ...newMovie, title: e.target.value })
                        }
                      />
                      <input
                        type="number"
                        placeholder="Calificacion"
                        className="w-60 border-0 bg-transparent text-center text-white border-b-2 py-2 px-3 outline-none tracking-wider border-gray-500 placeholder:text-white uppercase"
                        value={newMovie.vote_average}
                        max="10"
                        min="1"
                        onChange={(e) =>
                          setNewMovie({
                            ...newMovie,
                            vote_average: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        placeholder="Lanzamiento"
                        className="w-60 border-0 bg-transparent text-center text-white border-b-2 py-2 px-3 outline-none tracking-wider border-gray-500 placeholder:text-white uppercase"
                        value={newMovie.release_date}
                        onChange={(e) =>
                          setNewMovie({
                            ...newMovie,
                            release_date: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Botonera */}
                    <div className="space-y-4">
                      <button
                        type="submit"
                        className="btn btn-secondary"
                        disabled={!isFormValid}
                      >
                        Subir Pelicula
                      </button>
                      <button
                        onClick={closeModal}
                        className="btn btn-outlined lg:hidden"
                      >
                        Salir
                      </button>
                    </div>
                  </form>
                </>
              )}
              {/* Mensaje de éxito */}
              {successMessage && (
                <div className="text-center flex flex-col items-center justify-around h-full">
                  <Logo />
                  <div>
                    <h2 className="text-white text-xl py-3 px-6 mb-4">
                      ¡Felicitaciones!
                    </h2>
                    <p className="text-white text-lg mb-4">
                      {newMovie.title} fue correctamente subida.
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="btn btn-secondary transition-all"
                  >
                    Ir a Home
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddMovieModal;
