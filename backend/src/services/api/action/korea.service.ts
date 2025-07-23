// lib/koreaService.ts
import axios from "axios";
import * as cheerio from "cheerio";
import { AvtoDTOKorea } from "../../../dto/avto.dto";
import iconv from "iconv-lite";


// lib/drom-url.ts
const BASE_URL = "https://www.drom.ru/world/korea";

interface DromQueryParams {
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  minMileage?: number;
  maxMileage?: number;
  transmission?: number[]; // пример: [2,5]
  [key: string]: any; // для расширяемости!
}

export function getDromUrl(
  brand?: string,
  model?: string,
  page?: number,
  query?: DromQueryParams
) {
  let url = BASE_URL;
  if (brand) url += `/${brand}`;
  if (model) url += `/${model}`;
  if (page && page > 1) url += `/page${page}`;
  url += "/";

  if (query) {
    const searchParams = new URLSearchParams();
    for (const key in query) {
      if (Array.isArray(query[key])) {
        query[key].forEach((val: any, i: number) =>
          searchParams.append(`${key}[${i}]`, String(val))
        );
      } else if (query[key] !== undefined) {
        searchParams.set(key, String(query[key]));
      }
    }
    const queryString = searchParams.toString();
    if (queryString) url += `?${queryString}`;
  }

  return url;
}

export const koreaService = {
  async getAvto(
    brand?: string,
    model?: string,
    page?: number,
    filters?: Record<string, any>
  ): Promise<AvtoDTOKorea[]> {
    const url = getDromUrl(brand, model, page, filters);
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const $ = cheerio.load(iconv.decode(response.data, "windows-1251"));

    const cars: AvtoDTOKorea[] = [];
    $(".css-hdkpem").each((_, elem) => {
      const image = $(elem).find("img").attr("src") || "";
      const titleA = $(elem).find("h3 a[data-ftid='bull_title']");
      const fullTitle = titleA.text().trim();
      const link = "https://www.drom.ru" + (titleA.attr("href") || "");
      const [brand, ...rest] = fullTitle.split(" ");
      const model = rest.slice(0, -1).join(" ");
      const year = parseInt(rest.slice(-1)[0] || "0", 10);

      const desc = $(elem)
        .find("[data-ftid='component_inline-bull-description'] span")
        .map((_, el) =>
          $(el)
            .text()
            .replace(/\u00a0/g, " ")
            .trim()
        )
        .get();

      const [engine, fuel, transmission, mileageText] = desc;
      const mileage = parseInt((mileageText || "0").replace(/[^\d]/g, ""), 10);

      const priceWonText = $(elem)
        .find(".css-46itwz")
        .text()
        .replace(/\u00a0/g, "");
      const price_won = parseInt(priceWonText.replace(/[^\d]/g, ""), 10);

      const priceRubText = $(elem)
        .find(".css-6y7gbh")
        .text()
        .replace(/[^\d]/g, "");
      const price_rub = parseInt(priceRubText, 10);

      cars.push({
        brand,
        model,
        year,
        link,
        image,
        engine,
        fuel,
        transmission,
        mileage,
        price_won,
        price_rub,
      });
    });

    return cars;
  },
};
