import { AvtoDTOJapan, AvtoDTOKorea } from "./avto.dto";

type AvtoDTO = AvtoDTOJapan | AvtoDTOKorea;

interface NormalizedAvtoCardData {
  link: string;
  image: string;
  brand: string;
  model: string;
  year: number;
  trim?: string;
  engine: string;
  fuel?: string;
  transmission?: string;
  mileage: string;
  price: string;
}

export function normalizeAvtoDTO(avto: AvtoDTO): NormalizedAvtoCardData {
  // Если есть поле link — это Корея
  if ("link" in avto && "price_won" in avto) {
    return {
      link: avto.link,
      image: avto.image,
      brand: avto.brand,
      model: avto.model,
      year: avto.year,
      trim: avto.trim,
      engine: avto.engine,
      fuel: avto.fuel,
      transmission: avto.transmission,
      mileage: `${avto.mileage.toLocaleString()} км`,
      price: `${avto.price_won.toLocaleString()} ₩`, // Только воны
    };
  }
  // Япония
  return {
    link: `/сatalog/japan/${avto.brand}`,
    image: avto.image,
    brand: avto.brand,
    model: avto.model,
    year: avto.year,
    trim: avto.trim,
    engine: avto.engine + " см³",
    mileage: `${avto.mileage.toLocaleString()} км`,
    price: `${avto.price.toLocaleString()} ${avto.currency}`,
  };
}