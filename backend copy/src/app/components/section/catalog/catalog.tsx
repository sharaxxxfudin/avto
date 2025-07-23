"use client";

import {
  faCircle,
  faCar,
  faFilter,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const features = [
  { icon: faCar, text: "10 000+ авто" },
  { icon: faFilter, text: "10+ фильтров" },
  { icon: faCalculator, text: "Удобная калькуляция" },
];

const cards = [
  {
    title: "Япония",
    img: "https://triplook.me/media/countries/photo/c/d/c7.jpg",
    href: "/catalog/japan/stats",
    description:
      "Импорт автомобилей из Японии — выгодная возможность приобрести качественный автомобиль по цене ниже рыночной.",
    flag: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 900 600"
        className="w-6 h-4"
      >
        <rect fill="#fff" height="600" width="900" />
        <circle fill="#bc002d" cx="450" cy="300" r="180" />
      </svg>
    ),
    stat: "ТОП 1 по качеству",
    badge: "Хит",
  },
  {
    title: "Корея",
    img: "https://toping.uz/storage/articles/42/CwpIM1w283tItdOJssnBy51cbRO9g3ut.webp",
    href: "/catalog/korea",
    description:
      "Импорт авто из Кореи — это сочетание цены, технологий и надёжности. Современное оснащение, адаптация под рынок.",
    flag: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-36 -24 72 48"
        className="w-6 h-4"
      >
        <path fill="#fff" d="M-36-24h72v48h-72z" />
        <g transform="rotate(-56.31)">
          <g id="b">
            <path d="M-6-25H6m-12 3H6m-12 3H6" stroke="#000" strokeWidth="2" />
            <use href="#a" y="44" />
          </g>
          <path stroke="#fff" d="M0 17v10" />
          <circle fill="#cd2e3a" r="12" />
          <path
            fill="#0047a0"
            d="M0-12A6 6 0 000 0a6 6 0 010 12 12 12 0 010-24z"
          />
        </g>
      </svg>
    ),
    stat: "ТОП по технологиям",
    badge: "NEW",
  },
  {
    title: "Китай",
    img: "https://legalinsight.ru/wp-content/uploads/2024/09/snimok-ekrana-2024-09-02-v-23.19.02.png",
    href: "/catalogs/china",
    description:
      "Импорт автомобилей из Китая — это доступные цены, современное оснащение и растущее качество.",
    flag: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 80"
        className="w-6 h-4"
      >
        <rect width="120" height="80" fill="#de2910" rx="8" />
        <polygon points="15,10 21,30 6,18 24,18 9,30" fill="#ffde00" />
        <polygon points="30,10 33,18 27,14 33,14 27,18" fill="#ffde00" />
        <polygon points="36,24 39,32 33,28 39,28 33,32" fill="#ffde00" />
        <polygon points="36,48 39,56 33,52 39,52 33,56" fill="#ffde00" />
        <polygon points="30,60 33,68 27,64 33,64 27,68" fill="#ffde00" />
      </svg>
    ),
    stat: "Быстрый рост",
    badge: "Тренд",
  },
];

export default function Catalog() {
  return (
    <section id="catalogs" className="bg-[#050505] py-20 text-white relative">
      <div className="absolute top-0 right-0 opacity-20 pointer-events-none blur-xl z-0 w-2/3 h-2/3 rounded-full" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Заголовки */}
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2">
            <h5 className="text-lg font-bold mb-5 flex items-center gap-2">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-rose-600 animate-pulse"
              />
              Каталоги
            </h5>
            <p className="mb-4">
              На нашем сайте вы можете ознакомиться с базой авто из Японии,
              Кореи и Китая
            </p>
            <ul className="flex flex-wrap gap-4 mt-2">
              {features.map((f) => (
                <li
                  key={f.text}
                  className="flex items-center gap-2 bg-zinc-700 rounded-full px-4 py-1 text-xs shadow"
                >
                  <FontAwesomeIcon icon={f.icon} />
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Карточки */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((item, i) => (
            <Link href={item.href} key={i} className="group">
              <div
                className="relative bg-[#101010] bg-black/60 cursor-pointer rounded-[15px] pt-24 pb-8 px-7 flex flex-col overflow-visible transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl group"
                style={{
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#101010",
                }}
              >
                <div className="absolute inset-0 rounded-[15px] bg-black/70 z-0 pointer-events-none" />

                {/* Контент */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2 mt-2">
                    <h5 className="text-xl font-semibold">{item.title}</h5>
                    <span className="ml-1">{item.flag}</span>
                  </div>
                  <p className="text-zinc-200 text-sm mb-4">
                    {item.description}
                  </p>
                  <div className="mb-6 flex items-center gap-2 text-xs text-rose-400 font-semibold">
                    <FontAwesomeIcon icon={faCar} />
                    {item.stat}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
