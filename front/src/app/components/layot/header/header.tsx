"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const headerHeight = "h-20"; // Измени при необходимости

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black backdrop-blur shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between ${headerHeight}`}>
          {/* Логотип */}
          <div className="text-xl font-bold text-white">
            <Link href="/">AVTO STATUS</Link>
          </div>

          {/* Центр — навигация */}
          <nav className="hidden md:flex space-x-6 text-base text-white">
            <Link href="/" className="hover:text-gray-300">
              Главная
            </Link>
            <Link href="/#catalogs" className="hover:text-gray-300">
              Каталог
            </Link>
            <Link href="/#about" className="hover:text-gray-300">
              О нас
            </Link>
            <Link href="/#services" className="hover:text-gray-300">
              Услуги
            </Link>
            <Link href="/#contact" className="hover:text-gray-300">
              Контакты
            </Link>
          </nav>

          {/* Правая часть — кнопка */}
          <div className="hidden md:flex">
            <Link href="#contact">
              <button
                className={`font-medium text-white px-8 py-2 cursor-pointer rounded-full transition-all ${
                  scrolled
                    ? "bg-[#e01a31] border-red-400 hover:bg-red-500 "
                    : "border border-white hover:bg-gray-100 hover:text-black"
                }`}
              >
                ОСТАВИТЬ ЗАЯВКУ
              </button>
            </Link>
          </div>

          {/* Кнопка-бургер для мобилки */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <span className="text-2xl">&times;</span>
            ) : (
              <span className="text-2xl">&#9776;</span>
            )}
          </button>
        </div>

        {/* Мобильное меню */}
        {menuOpen && (
          <nav className="md:hidden mt-2 flex flex-col space-y-2 text-white text-sm bg-black/80 rounded-xl p-4">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Главная
            </Link>
            <Link href="#pricing" onClick={() => setMenuOpen(false)}>
              Каталог
            </Link>
            <Link href="#about" onClick={() => setMenuOpen(false)}>
              О нас
            </Link>
            <Link href="#services" onClick={() => setMenuOpen(false)}>
              Услуги
            </Link>
            <Link href="#contact" onClick={() => setMenuOpen(false)}>
              Контакты
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
