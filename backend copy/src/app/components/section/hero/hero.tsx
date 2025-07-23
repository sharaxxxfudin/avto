"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const countries = [
  { name: "КОРЕИ", emoji: "🇰🇷" },
  { name: "ЯПОНИИ", emoji: "🇯🇵" },
  { name: "КИТАЯ", emoji: "🇨🇳" },
];

export default function Hero() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    country: countries[0].name,
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert(`Заявка отправлена:\n${JSON.stringify(formData, null, 2)}`);
  }

  return (
    <section
      id="hero"
      className="relative -mt-20 pt-16 min-h-[900px] flex items-center justify-center px-2 sm:px-4 py-8 sm:py-10 overflow-hidden"
    >
      {/* Фон */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/image copy 2.png"
          alt="Фон"
          width={1000}
          height={500}
          quality={100}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/90" />
      </div>

      <div
        className="
          max-w-7xl mx-auto w-full relative z-10
          flex flex-col md:flex-row gap-8 md:gap-20
          items-center md:items-start justify-center
        "
      >
        {/* Текст — по центру всегда на мобилке */}
        <div
          className="
            flex-1 max-w-xl text-white drop-shadow mb-8 md:mb-0
            text-center md:text-left
          "
        >
          <h1
            className="
              font-druk-sans 
              text-3xl 
              xs:text-4xl 
              sm:text-5xl 
              md:text-6xl 
              font-bold 
              mb-6 
              leading-tight
            "
          >
            <span className="block">Доставляем</span>
            <span className="block relative">автомобили</span>
            <span className="block mt-3">
              из <span className="text">Японии, Кореи, Китая</span>
            </span>
          </h1>
          <div className="flex justify-center md:justify-start gap-4">
            <Link href="/#catalogs">
              <button className="bg-[#e01a31] text-white px-6 py-3 text-base rounded-full hover:bg-red-400 hover:text-white transition cursor-pointer mt-2 md:mt-6">
                Перейти в каталог
              </button>
            </Link>
            <Link href="/#catalogs">
              <button className="bg-[#151515] text-white px-6 py-3 text-base rounded-full hover:bg-white/30 hover:text-white cursor-pointer mt-2 md:mt-6">
                Рассчитать стоимость
              </button> 
            </Link>
          </div>
        </div>

        {/* Форма — только на md+ (десктоп/планшет) */}
        
      </div>

      {/* КНОПКА "Оставить заявку" — только на мобилке */}
      <div className="fixed left-0 bottom-0 w-full px-3 pb-4 z-40 flex md:hidden justify-center pointer-events-none">
        <button
          className="pointer-events-auto bg-white  text-black border-1 border-white/5 w-full max-w-xs mx-auto py-4  cursor-pointer rounded-full text-lg  shadow-xl hover:bg-white/80 transition"
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        >
          Оставить заявку
        </button>
      </div>
    </section>
  );
}
