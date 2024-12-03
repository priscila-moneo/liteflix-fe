"use client";

import { useState, useEffect } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FiBell } from "react-icons/fi";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import AddMovieModal from "./AddMovieModal";
import Image from "next/image";

const SCROLL_THRESHOLD = 10;

interface HeaderProps {
  isModalOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isModalOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full p-4 transition-all duration-300 ease-in-out z-50 ${
        isScrolled
          ? "bg-gradient-to-b from-[#242424] to-transparent"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center mx-auto px-4 lg:px-20">
        {/* Logo desktop */}
        <Logo className="hidden lg:flex" />

        {/* Contenido central */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            {!isModalOpen && <AddMovieModal />}
          </div>

          {/* Logo mobile */}
          <Logo className="flex lg:hidden" />

          {/* Íconos y perfil */}
          <div className="flex items-center space-x-6">
            {/* Menú */}
            <button
              className="hidden lg:flex"
              aria-label="Abrir menú de navegación"
            >
              <HiOutlineMenuAlt3 size={32} />
            </button>

            {/* Notificaciones */}
            <div className="relative hidden lg:flex">
              <button aria-label="Ver notificaciones">
                <FiBell size={32} />
              </button>
              {/* Indicador de notificación */}
              <motion.div
                className="absolute top-0 right-0 bg-green-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            </div>

            {/* Imagen de perfil */}
            <button aria-label="Ver perfil de usuario">
              <Image
                src="/assets/images/user.png"
                alt="Perfil de Usuario"
                width={32}
                height={32}
                className="rounded-full"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
