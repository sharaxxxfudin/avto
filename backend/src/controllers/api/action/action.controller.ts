import { Request, Response } from "express";
import { japanService } from "../../../services/api/action/japan.service";
import { koreaService } from "../../../services/api/action/korea.service";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 0 }); // кеш на 60 сек

export const actionController = {
  // Япония: бренды (кешируем)
  async getJapanBrands(req: Request, res: Response) {
    const cacheKey = "japanBrands";
    if (cache.has(cacheKey)) {
      return res.json({ data: cache.get(cacheKey) });
    }
    try {
      const data = await japanService.getBrands();
      cache.set(cacheKey, data);
      res.json({ data });
    } catch (err) {
      res.status(500).json({ error: "Ошибка при получении брендов" });
    }
  },

  // Япония: модели (кешируем по бренду)
  async getJapanModels(req: Request, res: Response) {
    const brand = req.query.brand as string | undefined;
    if (!brand) {
      return res.status(400).json({ error: "Brand is required" });
    }
    const cacheKey = `japanModels:${brand}`;
    if (cache.has(cacheKey)) {
      return res.json({ data: cache.get(cacheKey) });
    }
    try {
      const data = await japanService.getModels(brand);
      cache.set(cacheKey, data);
      res.json({ data });
    } catch (err) {
      res.status(500).json({ error: "Ошибка при получении моделей" });
    }
  },

  async getJapanBodies(req: Request, res: Response) {
    const brand = req.query.brand as string | undefined;
    const model = req.query.model as string | undefined;
    if (!brand || !model) {
      return res.status(400).json({ error: "Brand and model are required" });
    }
    const cacheKey = `japanBodies:${brand}:${model}`;
    if (cache.has(cacheKey)) {
      return res.json({ data: cache.get(cacheKey) });
    }
    try {
      const data = await japanService.getbodies(brand, model);
      res.json({ data });
    } catch (err) {
      res.status(500).json({ error: "Ошибка при получении кузовов" });
    }
  },
  // Япония: авто (основной контроллер, параметры фильтров)
  async getAvtoJapan(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const brand = (req.query.brand as string) || "ALL";
    const model = (req.query.model as string) || "ALL";
    const transmission = (req.query.transmission as string) || "ALL";
    const body = (req.query.body as string) || "ALL";
    const yearFrom = req.query.yearFrom as string | undefined;
    const yearTo = req.query.yearTo as string | undefined;
    const priceFrom = req.query.priceFrom as string | undefined;
    const priceTo = req.query.priceTo as string | undefined;
    // + любые другие фильтры

    try {
      const data = await japanService.getAvto({
        page,
        brand,
        model,
        transmission,
        body,
        yearFrom,
        yearTo,
        priceFrom,
        priceTo,
        // добавь другие параметры если есть
      });
      res.json({
        length: data.cars.length,
        data: data.cars,
        maxPage: data.maxPage,
      });
    } catch (err) {
      console.error("Error in getAvtoJapan:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Корея: авто (обработка любых фильтров)
  async getAvtoKorea(req: Request, res: Response) {
    const filters = { ...req.query };
    const page = filters.page ? parseInt(filters.page as string, 10) : 1;
    const brand = filters.brand as string | undefined;
    const model = filters.model as string | undefined;

    // убираем из filters
    delete filters.page;
    delete filters.brand;
    delete filters.model;

    try {
      const data = await koreaService.getAvto(brand, model, page, filters);
      res.json({ data });
    } catch (err) {
      console.error("Error in getAvtoKorea:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
