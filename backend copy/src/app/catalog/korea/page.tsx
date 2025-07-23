"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AvtoDTOKorea } from "@/app/lib/api/dto/avto/avto.dto";
import { getCarInJapan, getCarInKorea } from "@/app/lib/api/car/car.api";
import CardAvto from "@/app/components/ui/card/avto/index";

export default function JapanStatPage() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<AvtoDTOKorea[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    brand: searchParams.get("brand") || "",
    model: searchParams.get("model") || "",
    yearFrom: searchParams.get("yearFrom") || "",
    yearTo: searchParams.get("yearTo") || "",
    priceFrom: searchParams.get("priceFrom") || "",
    priceTo: searchParams.get("priceTo") || "",
    id: searchParams.get("id") || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setCurrentPage(1);
  };

  const fetchCars = async () => {
    setLoading(true);
    setCars([]);
    try {
      const response = await getCarInKorea(currentPage, filters.brand);
      setCars(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке авто:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [filters, currentPage]);

  // ------- JSX -------
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gray-500 border-1 border-white/10 rounded-[15px] p-4 mb-6">
        <h2 className="text-lg text-white font-semibold mb-2">
          Мы собрали для вас каталог авто из Кореи
        </h2>
        <p className="text-sm text-gray-200">
          Вы можете использовать фильтры для поиска авто по марке, модели, году
          выпуска, кузову, трансмиссии и цене.
        </p>
      </div>
      <section
        className="
    bg-[#101010]  rounded-[15px] p-4 md:p-8 mb-6
    flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-4 items-end
  "
      >
        {/* Используем одну колонку на мобилках, строку на md+ */}
        <div className="w-full md:w-auto">
          <label className="block mb-1 text-sm text-gray-300">Марка</label>
          <select
            name="brand"
            className="w-full md:min-w-[140px] px-4 py-2 rounded bg-[#2a2a2a] text-white"
            value={filters.brand}
            onChange={handleChange}
          >
            <option value="">Все</option>
            <option value="TOYOTA">Toyota</option>
            <option value="HONDA">Honda</option>
            <option value="NISSAN">Nissan</option>
          </select>
        </div>
        <div className="w-full md:w-auto">
          <label className="block mb-1 text-sm text-gray-300">Модель</label>
          <select
            name="model"
            className="w-full md:min-w-[140px] px-4 py-2 rounded bg-[#2a2a2a] text-white"
            value={filters.model}
            onChange={handleChange}
          >
            <option value="">Все</option>
            <option value="NOAH">Noah</option>
            <option value="FREED">Freed</option>
            <option value="NOTE">Note</option>
          </select>
        </div>
        {/* ... остальные фильтры так же */}
        <div className="w-full md:w-auto">
          <label className="block mb-1 text-sm text-gray-300">Год от</label>
          <select
            name="yearFrom"
            className="w-full md:min-w-[100px] px-4 py-2 rounded bg-[#2a2a2a] text-white"
            value={filters.yearFrom}
            onChange={handleChange}
          >
            <option value="">От</option>
            {Array.from({ length: 23 }, (_, i) => 2003 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {/* ... остальные фильтры */}
        <button
          className="
      w-full md:w-auto bg-[#e01a31] cursor-pointer hover:bg-[#e01a31]/80 
      text-white px-6 py-2 rounded-full font-semibold
    "
          onClick={fetchCars}
        >
          Показать
        </button>
        <button
          className="
      w-full md:w-auto bg-transparent border border-white/30 hover:bg-white/10 
      text-white px-6 py-2 rounded-full
    "
          onClick={() => {
            setFilters({
              brand: "",
              model: "",
              yearFrom: "",
              yearTo: "",
              id: "",
              priceFrom: "",
              priceTo: "",
            });
            setCurrentPage(1);
          }}
        >
          Сбросить
        </button>
      </section>
      {/* КАРТОЧКИ */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-white">
          Авто из Кореи
          {/* ... */}
        </h2>
        {loading ? (
          <div className="text-gray-400">Загрузка автомобилей...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {cars.map((car, idx) => (
              <CardAvto avto={car} key={idx} />
            ))}
          </div>
        )}

        {/* ПАГИНАЦИЯ */}
        <div className="mt-6 flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-4 py-2 rounded 
          ${
            currentPage === num
              ? "bg-red-600 text-white"
              : "bg-[#2a2a2a] text-white"
          }
        `}
            >
              {num}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
