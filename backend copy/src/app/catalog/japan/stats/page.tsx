"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { AvtoDTOJapan } from "@/app/lib/api/dto/avto/avto.dto";
import { getBodies, getBrands, getCarInJapan, getModels } from "@/app/lib/api/car/car.api";
import CardAvto from "@/app/components/ui/card/avto/index";
import Pagination from "@/app/components/ui/pagination";
import CarFilterPanel from "@/app/components/ui/filter";

type Filters = {
  brand: string;
  model: string;
  body: string;
  transmission: string; // string!
  yearFrom: string;
  yearTo: string;
  priceFrom: string;
  priceTo: string;
  mileageFrom: string;
  mileageTo: string;
  engineFrom: string;
  engineTo: string;
  grade: string;
  lot: string;
  auction: string;
};

const TRANSMISSIONS = [
  { label: "Все", value: "" },
  { label: "Автомат", value: "auto" },
  { label: "Механика", value: "manual" },
];

export default function JapanStatPage() {
  const searchParams = useSearchParams();

  const initialFilters: Filters = {
    brand: searchParams.get("brand") || "all",
    model: searchParams.get("model") || "all",
    body: searchParams.get("body") || "",
    transmission: searchParams.get("transmission") || "",
    yearFrom: searchParams.get("yearFrom") || "",
    yearTo: searchParams.get("yearTo") || "",
    priceFrom: searchParams.get("priceFrom") || "",
    priceTo: searchParams.get("priceTo") || "",
    mileageFrom: searchParams.get("mileageFrom") || "",
    mileageTo: searchParams.get("mileageTo") || "",
    engineFrom: searchParams.get("engineFrom") || "",
    engineTo: searchParams.get("engineTo") || "",
    grade: searchParams.get("grade") || "",
    lot: searchParams.get("lot") || "",
    auction: searchParams.get("auction") || "",
  };

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(initialFilters);
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [bodies, setBodies] = useState<string[]>([]);
  const [cars, setCars] = useState<AvtoDTOJapan[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingBodies, setLoadingBodies] = useState(false);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  // Получить бренды (один раз)
  useEffect(() => {
    let cancelled = false;
    setLoadingBrands(true);
    getBrands()
      .then((resp) => {
        if (!cancelled) setBrands(resp.data || []);
      })
      .finally(() => {
        if (!cancelled) setLoadingBrands(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Получить кузова при изменении бренда/модели
  useEffect(() => {
    let cancelled = false;
    setLoadingBodies(true);
    getBodies(filters.brand, filters.model)
      .then((resp) => {
        if (!cancelled) setBodies(resp.data || []);
      })
      .finally(() => {
        if (!cancelled) setLoadingBodies(false);
      });
    return () => {
      cancelled = true;
    };
  }, [filters.brand, filters.model]);

  // Получить модели при изменении бренда
  useEffect(() => {
    let cancelled = false;
    if (filters.brand) {
      setLoadingModels(true);
      getModels(filters.brand)
        .then((resp) => {
          if (!cancelled) setModels(resp.data || []);
        })
        .finally(() => {
          if (!cancelled) setLoadingModels(false);
        });
    } else {
      setModels([]);
    }
    return () => {
      cancelled = true;
    };
  }, [filters.brand]);
  
  // Получить список машин при изменении применённых фильтров или страницы
  const fetchCars = useCallback(async () => {
    setLoading(true);
    setCars([]);
    try {
      const response = await getCarInJapan(
        currentPage,
        appliedFilters.brand,
        appliedFilters.model,
        appliedFilters.body,
        appliedFilters.yearFrom,
        appliedFilters.yearTo,
        appliedFilters.transmission, // <--- добавь если API поддерживает!
        
      );
      setCars(response.data || []);
      setMaxPage(response.maxPage || 1);
    } catch (error) {
      console.error("Ошибка при загрузке авто:", error);
    } finally {
      setLoading(false);
    }
  }, [appliedFilters, currentPage]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  // --- Изменения формы ---
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) =>
      name === "brand"
        ? { ...prev, brand: value, model: "all" }
        : { ...prev, [name]: value }
    );
  };

  const handleShow = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
    setCurrentPage(1);
  };

  return (
    <main className="max-w-7xl mx-auto px-8 py-8">
      <div className="bg-[#2d3141] border-1 border-white/10 rounded-[15px] p-4 mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg text-white font-semibold mb-2">
            Мы собрали для вас статистику продаж авто из 🇯🇵 Японии по всем аукционам
          </h2>
          <p className="text-sm text-gray-200">
            Вы можете использовать фильтры для поиска авто по марке, модели,
            году выпуска, кузову, трансмиссии и цене.
          </p>
        </div>
        <img
          src="/images/catalog/car-japan.png"
          alt="Машина"
          className="hidden md:block w-[120px] h-auto object-contain"
          draggable={false}
        />
      </div>

      <CarFilterPanel
        filters={filters}
        brands={brands}
        models={models}
        bodies={bodies}
        transmissions={TRANSMISSIONS}
        grades={[
          "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
          "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
        ]}
        auctions={["All", "Auction", "Private sale", "Other"]}
        onChange={handleChange}
        onShow={handleShow}
        onReset={handleReset}
        loadingBodies={loadingBodies}
        loadingBrands={loadingBrands}
        loadingModels={loadingModels}
        disabled={loading}
      />

      <section>
        <h2 className="text-xl font-bold mb-4 text-white">
          Статистика продаж авто из Японии
        </h2>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 20 }).map((_, idx) => (
              <div key={idx} className="animate-pulse bg-zinc-800 rounded-lg h-36" />
            ))}
          </div>
        ) : cars.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {cars.map((car, idx) => (
              <CardAvto avto={car} key={idx} />
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center">Нет результатов</div>
        )}
      </section>

      <Pagination current={currentPage} total={maxPage} onPageChange={setCurrentPage} />
    </main>
  );
}
