import { InputRange } from "../inputranger";

type CarFilterPanelProps = {
  filters: {
    brand: string;
    model: string;
    body: string;
    transmission: string; 
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

  onChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  onShow: () => void;
  onReset: () => void;
  brands: string[];
  models: string[];
  bodies: string[];
  transmissions: { label: string; value: string }[]; // ✅ отдельным пропсом
  grades: string[];
  auctions: string[];
  disabled?: boolean;
  loadingBodies?: boolean;
  loadingBrands?: boolean;
  loadingModels?: boolean;
};

export default function CarFilterPanel({
  filters,
  onChange,
  onShow,
  onReset,
  brands,
  models,
  bodies,
  transmissions, // ✅ тут массив опций
  grades,
  auctions,
  disabled = false,
  loadingBrands = false,
  loadingModels = false,
  loadingBodies = false,
}: CarFilterPanelProps) {
  const baseControl =
    "w-full px-4 py-2 rounded-xl bg-[#23252e] text-white border border-[#37394a] focus:ring-2 focus:ring-red-600 outline-none transition text-base appearance-none";

  return (
    <section
      className="
        bg-[#181922] rounded-2xl p-4 md:p-8 mb-6
        shadow-xl shadow-[#0e0e17]/20
        flex flex-col gap-5 items-stretch w-full
      "
    >
      {/* 1. Марка-Модель-Кузов-Трансмиссия */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <div>
          <label className="block mb-2 text-xs text-gray-400">Марка</label>
          <select
            name="brand"
            className={baseControl}
            value={filters.brand}
            onChange={onChange}
            disabled={disabled || loadingBrands}
          >
            <option value="">{loadingBrands ? "Загрузка..." : "Все"}</option>
            {!loadingBrands &&
              brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-xs text-gray-400">Модель</label>
          <select
            name="model"
            className={baseControl}
            value={filters.model}
            onChange={onChange}
            disabled={disabled || !filters.brand || loadingModels}
          >
            <option value="">{loadingModels ? "Загрузка..." : "Все"}</option>
            {!loadingModels &&
              models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-xs text-gray-400">Кузов</label>
          <select
            name="body"
            className={baseControl}
            value={filters.body}
            onChange={onChange}
            disabled={disabled || !filters.model || loadingBodies}
          >
            <option value="">{loadingBodies ? "Загрузка..." : "Все"}</option>
            {!loadingBodies &&
              bodies.map((body) => (
                <option key={body} value={body}>
                  {body}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-xs text-gray-400">Трансмиссия</label>
          <select
            name="transmission"
            className={baseControl}
            value={filters.transmission}
            onChange={onChange}
            disabled={disabled}
          >
            {transmissions.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Год-Цена-Пробег-Объем */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        {/* Год производства */}
        <div>
          <div className="flex gap-2">
            <InputRange
              label="Год производства"
              fromName="yearFrom"
              toName="yearTo"
              fromValue={filters.yearFrom}
              toValue={filters.yearTo}
              onChange={onChange}
              options={Array.from(
                { length: 2025 - 2003 + 1 },
                (_, i) => 2003 + i
              )}
              placeholderFrom="от"
              placeholderTo="до"
              disabled={disabled}
            />
          </div>
        </div>
        {/* Цена */}
        <div>
          <div className="flex gap-2">
            <InputRange
              label="Стоимость, ₽"
              fromName="priceFrom"
              toName="priceTo"
              fromValue={filters.priceFrom}
              toValue={filters.priceTo}
              onChange={onChange}
              type="number"
              min={0}
              placeholderFrom="от"
              placeholderTo="до"
              disabled={disabled}
            />
          </div>
        </div>
        {/* Пробег */}
        <div>
          <div className="flex gap-2">
            <InputRange
              label="Пробег, км"
              fromName="mileageFrom"
              toName="mileageTo"
              fromValue={filters.mileageFrom}
              toValue={filters.mileageTo}
              onChange={onChange}
              type="number"
              min={0}
              placeholderFrom="от"
              placeholderTo="до"
              disabled={disabled}
            />
          </div>
        </div>
        {/* Объем */}
        <div>
          <div className="flex gap-2">
            <InputRange
              label="Объём, л"
              fromName="engineFrom"
              toName="engineTo"
              fromValue={filters.engineFrom}
              toValue={filters.engineTo}
              onChange={onChange}
              type="number"
              min={0}
              step={0.1}
            />
          </div>
        </div>
      </div>

      {/* 3. Оценка-Лот-Аукцион */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div>
          <label className="block mb-2 text-xs text-gray-400">Оценка</label>
          <select
            name="grade"
            className={baseControl}
            value={filters.grade}
            onChange={onChange}
            disabled={disabled}
          >
            <option value="">Все</option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-xs text-gray-400">Номер лота</label>
          <input
            name="lot"
            className={baseControl}
            placeholder="Номер лота"
            value={filters.lot}
            onChange={onChange}
            disabled={disabled}
          />
        </div>
        <div>
          <label className="block mb-2 text-xs text-gray-400">Аукцион</label>
          <select
            name="auction"
            className={baseControl}
            value={filters.auction}
            onChange={onChange}
            disabled={disabled}
          >
            <option value="">Все</option>
            {auctions.map((auction) => (
              <option key={auction} value={auction}>
                {auction}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Кнопки */}
      <div className="flex flex-col md:flex-row gap-3 mt-4">
        <button
          className="w-full md:w-auto bg-[#e01a31] hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition shadow-md"
          onClick={onShow}
          disabled={disabled}
        >
          НАЙТИ
        </button>
        <button
          className="w-full md:w-auto bg-transparent border border-white/20 hover:bg-white/10 text-white px-8 py-3 rounded-full transition"
          onClick={onReset}
          disabled={disabled}
        >
          Сбросить
        </button>
      </div>
    </section>
  );
}
