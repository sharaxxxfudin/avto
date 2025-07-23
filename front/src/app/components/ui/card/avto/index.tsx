import Link from "next/link";
import { AvtoDTOKorea, AvtoDTOJapan } from "@/app/lib/api/dto/avto/avto.dto";
import { normalizeAvtoDTO } from "@/app/lib/api/dto/avto/normalize.dto";
import Image from "next/image";

interface CardAvtoProps {
  avto: AvtoDTOKorea | AvtoDTOJapan;
}
function decodeHtmlEntities(str: string): string {
  return str.replace(/&#(\d+);/g, (_, dec) =>
    String.fromCharCode(parseInt(dec, 10))
  );
}
function formatPrice(price: string): string {
  const num = price.match(/[\d,.]+/);
  if (!num) return price;
  const int = num[0].replace(/,/g, "").split(".")[0];
  const formatted = Number(int).toLocaleString("ru-RU");

  if (/(₽|RUB)/i.test(price)) return `${formatted} ₽`;
  if (/(₩|WON)/i.test(price)) return `${formatted} ₩`;
  return formatted;
}
export default function CardAvto({ avto }: CardAvtoProps) {
  const data = normalizeAvtoDTO(avto);

  return (
    <Link
      href={data.link}
      target="_blank"
      className="
      flex flex-col
      bg-transparent
      rounded-[15px]
      shadow-sm
      hover:shadow-lg
      transition
      duration-200
      w-full
      min-w-[0]
      max-w-full
      mx-auto
    "
    >
      <div className="w-full h-[140px] sm:h-[170px] md:h-[180px] rounded-[15px] overflow-hidden">
        <img
           width={320}
           height={180}
          src={data.image}
          alt={`${data.brand} ${data.model}`}
          className="w-full hover:scale-105 transition-all duration-300 h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-1 mt-3 text-white px-2 pb-3">
        <h3 className="text-base font-semibold truncate">
          {data.brand} {data.model} {data.year}
        </h3>
        <p className="text-sm text-gray-400 leading-tight">
          {data.trim ? `${decodeHtmlEntities(data.trim)} • ` : ""}
          {data.engine}
          {data.fuel ? ` • ${data.fuel}` : ""}
          {data.transmission ? ` • ${data.transmission}` : ""}
          <br />
          {data.mileage}
        </p>
        <p className="text-white mt-2 text-lg font-bold">
          {formatPrice(data.price)}
        </p>
      </div>
    </Link>
  );
}
