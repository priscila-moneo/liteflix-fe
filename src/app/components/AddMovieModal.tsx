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
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "No se pudo cargar la película";
      setUploadError(errorMessage);
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
    newMovie.title.trim() !== "" &&
    newMovie.vote_average &&
    newMovie.release_date &&
    newMovie.backdrop_path &&
    uploadProgress === 100;

  const uploadImage = async (file: File) => {
    setUploadError(false);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      let simulatedProgress = 0;
      const interval = setInterval(() => {
        simulatedProgress = Math.min(simulatedProgress + 10, 90);
        setUploadProgress(simulatedProgress);
      }, 200);

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/movies/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        clearInterval(interval);
        const data = await response.json();
        const imageUrl = data.url;

        setNewMovie((prevMovie) => ({
          ...prevMovie,
          backdrop_path: imageUrl,
        }));

        setUploadProgress(100);
      } else {
        throw new Error("Error al subir la imagen");
      }
    } catch (error) {
      setUploadError(true);
      setUploading(false);
      setUploadProgress(0);
      console.error(error);
    }
  };

  return (
    <>
      {/* Botón para abrir el formulario */}
      <div className="flex justify-center lg:ml-10">
        <button
          className="flex items-center justify-center font-medium uppercase text-white hover:underline focus:outline-none"
          onClick={() => setShowModal(true)}
          aria-label="Agregar Película"
        >
          <div className="hidden items-center lg:flex">
            <PiPlus className="mr-2" /> Agregar Película
          </div>
          <GrAddCircle
            size={32}
            className="flex lg:hidden"
            aria-label="Agregar Película"
          />
        </button>
      </div>

      {/* Modal del formulario */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 z-10 bg-black/50"
            onClick={closeModal}
          ></div>
          <div className="fixed inset-0 z-20 flex items-center justify-center">
            <div className="relative z-20 size-full rounded-lg bg-[#242424] p-6 text-white lg:size-3/5">
              {/* Botón de cerrar modal */}
              <button
                onClick={closeModal}
                className="absolute right-2 top-2 z-30 hidden text-2xl text-white lg:flex"
              >
                <AiOutlineClose />
              </button>

              {!successMessage && (
                <>
                  <Header isModalOpen={true} />
                  <form
                    onSubmit={handleAddMovie}
                    className="flex size-full flex-col items-center justify-around space-y-4 text-center"
                  >
                    <h2 className="text-accent mt-16 text-xl font-semibold lg:my-0">
                      Agregar Película
                    </h2>

                    {/* Barra de progreso */}
                    {uploading && (
                      <div className="w-full">
                        {/* Mensaje de error */}
                        {uploadError && (
                          <div className="mb-2 text-start text-red-500">
                            <strong>¡ERROR! {uploadError}</strong>
                          </div>
                        )}

                        {/* Mensaje de éxito */}
                        {uploadProgress === 100 &&
                          !uploadError &&
                          !successMessage && (
                            <div className="mb-2 text-start text-white">
                              <strong>¡100% CARGADO!</strong>
                            </div>
                          )}

                        {uploadProgress !== 100 &&
                        uploadProgress !== 0 &&
                          !uploadError &&
                          !successMessage && (
                            <div className="mb-2 text-start text-white">
                              <strong>CARGANDO {uploadProgress}%</strong>
                            </div>
                          )}

                        <div className="h-2 w-full rounded-lg bg-gray-700">
                          <div
                            className={`h-full rounded-lg ${
                              uploadError ? "bg-red-500" : "bg-green-400"
                            }`}
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <div className="mt-2 flex justify-between">
                          {uploading && (
                              <button
                                type="button"
                                onClick={cancelUpload}
                                className="text-sm text-red-500"
                              >
                                CANCELAR
                              </button>
                            )}
                          {uploadError && (
                            <button
                              type="button"
                              onClick={retryUpload}
                              className="text-sm text-yellow-500"
                            >
                              REINTENTAR
                            </button>
                          )}
                          {/* Mensaje de éxito cuando la carga ha finalizado */}
                          {uploadProgress === 100 &&
                            !uploadError &&
                            !successMessage && (
                              <span className="text-sm font-semibold text-green-500">
                                ¡LISTO!
                              </span>
                            )}
                        </div>
                      </div>
                    )}

                    {/* Subir imagen (con drag and drop y click) */}
                    {!uploading && !uploadError && (
                      <div
                        className="relative w-full cursor-pointer rounded-lg border-2 border-dashed bg-[#242424] p-8 text-center"
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
                          <span className="ml-2 hidden font-normal lg:inline-flex">
                            o arrastralo y soltalo aquí
                          </span>
                        </label>
                        <input
                          type="file"
                          id="backdrop_path"
                          onChange={handleFile}
                          className="absolute left-0 top-0 z-20 size-full cursor-pointer opacity-0"
                          required
                        />
                      </div>
                    )}

                    {/* Formulario */}
                    <div className="flex w-full flex-col items-center space-y-8">
                      <input
                        type="text"
                        placeholder="Título"
                        className="w-60 border-0 border-b-2 border-gray-500 bg-transparent px-3 py-2 text-center uppercase tracking-wider text-white outline-none placeholder:text-white"
                        value={newMovie.title}
                        onChange={(e) =>
                          setNewMovie({ ...newMovie, title: e.target.value })
                        }
                        required
                      />
                      <input
                        type="number"
                        placeholder="Calificación"
                        className="w-60 border-0 border-b-2 border-gray-500 bg-transparent px-3 py-2 text-center uppercase tracking-wider text-white outline-none placeholder:text-white"
                        value={newMovie.vote_average}
                        min="1"
                        max="10"
                        onChange={(e) =>
                          setNewMovie({
                            ...newMovie,
                            vote_average: e.target.value,
                          })
                        }
                        required
                      />
                      <input
                        type="number"
                        placeholder="Lanzamiento"
                        className="w-60 border-0 border-b-2 border-gray-500 bg-transparent px-3 py-2 text-center uppercase tracking-wider text-white outline-none placeholder:text-white"
                        value={newMovie.release_date}
                        min="1900"
                        max={new Date().getFullYear()}
                        onChange={(e) =>
                          setNewMovie({
                            ...newMovie,
                            release_date: e.target.value,
                          })
                        }
                        required
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
                <div className="flex h-full flex-col items-center justify-around text-center">
                  <Logo />
                  <div>
                    <h2 className="mb-4 px-6 py-3 text-xl text-white">
                      ¡Felicitaciones!
                    </h2>
                    <p className="mb-4 text-lg text-white">
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
