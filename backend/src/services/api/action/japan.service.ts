import axios from "axios";
import * as cheerio from "cheerio";
import { AvtoDTOJapan } from "../../../dto/avto.dto";

const BASE_URL = "https://japantransit.ru/";

interface BuildUrlParams {
  page?: number;
  brand?: string;
  model?: string;
  body?: string;
  transmission?: string;
  id?: string;
  yearFrom?: string | number;
  yearTo?: string | number;
  priceFrom?: string | number;
  priceTo?: string | number;
  // Можно добавить ещё фильтры
}

function buildURL(params: BuildUrlParams) {
  const {
    page,
    brand = "ALL",
    model = "ALL",
    body = "ALL",
    transmission = "ALL",
    id,
    yearFrom,
    yearTo,
    priceFrom,
    priceTo,
    // + другие фильтры по мере необходимости
  } = params;

  const searchParams = new URLSearchParams();
  searchParams.set("vendor", brand.toUpperCase());
  searchParams.set("model", model.toUpperCase());
  if (transmission !== "ALL") searchParams.set("transmission_type", transmission.toUpperCase());
  if (body !== "ALL") searchParams.set("Carcass", body.toUpperCase());

  if (yearFrom) searchParams.set("Year_from", String(yearFrom));
  if (yearTo) searchParams.set("Year_to", String(yearTo));
  if (priceFrom) searchParams.set("Finish_from", String(priceFrom));
  if (priceTo) searchParams.set("Finish_to", String(priceTo));

  if (id && id.trim()) {
    searchParams.set("id", id.trim());
  } else if (page && page > 0) {
    searchParams.set("page", page.toString());
  } else {
    throw new Error("Either 'id' or 'page' must be provided.");
  }

  return `${BASE_URL}stat/?${searchParams.toString()}`;
}

const commonHeaders = {
  "User-Agent": "Mozilla/5.0",
  Accept: "application/json, text/html",
};

export const japanService = {
  async getBrands(): Promise<string[]> {
    const url = `${BASE_URL}api/vehicles/stats/brands/all`;
    const { data } = await axios.get(url, { headers: { ...commonHeaders, Accept: "application/json" } });

    if (Array.isArray(data)) {
      return data.map(([brand]) => brand);
    }
    throw new Error("Brands list not found");
  },

  async getModels(brand: string): Promise<string[]> {
    const url = `${BASE_URL}api/vehicles/stats/brands/${brand}/models/`;
    const response = await axios.get(url, { headers: { ...commonHeaders, Accept: "application/json" } });

    return response.data;
  },
  async getbodies(brand: string, model: string): Promise<string[]> {
    const url = `${BASE_URL}api/vehicles/stats/brands/${brand}/models/${model}/bodies/`;
    const response = await axios.get(url, { headers: { ...commonHeaders, Accept: "application/json" } });
    return response.data;
  },

  async getAvto(params: BuildUrlParams): Promise<{ cars: AvtoDTOJapan[]; maxPage: number }> {
    const url = buildURL(params);
    const { data: html } = await axios.get(url, {
      headers: {
        ...commonHeaders,
        Accept: "text/html",
      },
    });
    const $ = cheerio.load(html);
    const cars: AvtoDTOJapan[] = [];

    $("div.swiper-slide").each((_, el) => {
      const scriptTag = $(el).parent().find('script[type="application/ld+json"]').html();
      if (!scriptTag) return;

      try {
        const json = JSON.parse(scriptTag);
        if (json["@type"] !== "Car") return;

        const grade = $(el)
          .find('span[class*="bg-red"], span[class*="bg-yellow"], span[class*="bg-green"]')
          .text()
          .replace("Оценка", "")
          .trim() || null;

        const offersUrl = json.offers?.url || "";
        const parsedUrl = new URL(offersUrl, BASE_URL);
        const id = parsedUrl.searchParams.get("id") ?? "";
        const lot = parsedUrl.searchParams.get("lot") ?? "";
        const auction = parsedUrl.searchParams.get("auction") ?? "";

        cars.push({
          brand: json.brand || "",
          model: json.model || "",
          trim: json.name?.split(" ").slice(2).join(" ") || "",
          year: json.modelDate || 0,
          mileage: json.mileageFromOdometer?.value || 0,
          engine: json.vehicleEngine?.engineDisplacement?.value || 0,
          price: json.offers?.price || 0,
          currency: json.offers?.priceCurrency || "RUB",
          image: json.image || "",
          link: offersUrl,
          grade: grade || "",
          id,
          lot,
          auction,
        });
      } catch {
        // Пропускаем ошибочный JSON
      }
    });

    // Пагинация
    let maxPage = 1;
    $("nav.pagination a").each((_, el) => {
      const href = $(el).attr("href");
      const match = href?.match(/page=(\d+)/);
      if (match) {
        const pageNum = parseInt(match[1]);
        if (pageNum > maxPage) maxPage = pageNum;
      }
    });

    console.log(url);

    return { cars, maxPage };
  },

  async getTotalPages(params: BuildUrlParams): Promise<number> {
    const url = buildURL({ ...params, page: 1 });
    const { data: html } = await axios.get(url, {
      headers: {
        ...commonHeaders,
        Accept: "text/html",
      },
    });
    const $ = cheerio.load(html);
    let maxPage = 1;
    $("nav.pagination a").each((_, el) => {
      const href = $(el).attr("href");
      const match = href?.match(/page=(\d+)/);
      if (match) {
        const pageNum = parseInt(match[1]);
        if (pageNum > maxPage) maxPage = pageNum;
      }
    });
    return maxPage;
  },

  async getAvtoDetail(brand: string, model: string, id: string): Promise<void> {
    const url = buildURL({ page: 1, brand, model, id });
    await axios.get(url, {
      headers: {
        ...commonHeaders,
        Accept: "text/html",
      },
    });
    // todo: можно реализовать детальное парсирование машины
  },
};
